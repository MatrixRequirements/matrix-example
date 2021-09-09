/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace CapaTrendsDashboard {

    export class CapaTrendsDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "CTO",
                title: "CAPA Trends Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new CapaTrendsDashboardControl(options.control);
                    control.initPage();
                },
            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return "CAPA Trends Overview";
        }

        getPluginVersion(): string {
            return "1.0.0";
        }
    }

   
    interface ItemCurrentStateData {
        id: string;
        department: string;
        category: string;
        currentState: string;
        currentStateSetDate: string;
    }

    interface ByCategoryLabelData {
        category: string;
        departments: any[];
        catagories: any[];
        stateCodes: any[];
        stateDesc: any[];
        deptWiseData: any[];
        categoryWiseData: any[];
        itemCurrentStateDetails: ItemCurrentStateData[];
    }

    class CapaTrendsDashboardControl extends BaseControl {

        currentCat: string = "";
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        StatusWiseoverviewChart: c3.ChartAPI;
        AvgTimeWiseoverviewChart: c3.ChartAPI;

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        // Set up the page, load data and then render the content
        initPage() {
            let that = this;

            that.renderHTML();
            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Please wait...");
            $("#waiting", that._root).append(spinningWait);

            $(".spinningWait", that._root).show();
            //$("#MCSONoItems", that._root).hide();


            setTimeout(o => that.installCopyButtons("CAPA Trends Overview"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                $(".spinningWait", that._root).hide();
                //$("#MCSONoItems", that._root).hide();
                that.processLabelsData(result);
                that.renderCategoryWiseData("");
                that.renderCharts();
                that.renderTable();
            }).then(() => {
                //Let's remove the spinning wait
                $(".spinningWait",that._root).hide();
                //$("#MCSONoItems", that._root).show();
            });
        }

        installCopyButtons(title: string) {
            let that = this;
            
            let savedWidth = 0;

            ml.UI.copyBuffer($("#CCSOTableHeader",this._root), "copy list to clipboard", $("#currentStatusList",this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();
    
                var filter = $("#CCSOInputFilter",this._root).val();
               
                $(".hidden",copied).remove();
           
                $("#id", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
    
                $("#CCSOInputFilter",copied).remove();
    
                $("#CCSOTitleForCopy", copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });


            ml.UI.copyBuffer($("#StatusWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#StatusWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#StatusWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#StatusWiseoverviewChart svg",this._root).width();
                that.StatusWiseoverviewChart.resize({width:590});
            },()=>{
                that.StatusWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#AvgTimeWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#AvgTimeWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#AvgTimeWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#AvgTimeWiseoverviewChart svg",this._root).width();
                that.AvgTimeWiseoverviewChart.resize({width:590});
            },()=>{
                that.AvgTimeWiseoverviewChart.resize({width:savedWidth})
            });

        }

        renderCharts(){     
            this.renderByStatusChart();
            this.renderByAvgTimeChart();     
        }

        renderByStatusChart(){
            //prepare template
            let byStatusChartparams: c3.ChartConfiguration = {
                bindto: '#StatusWiseoverviewGraph',
                data: {
                    columns: [
                        ['Initiated', 38],
                        ['Approved', 8],
                        ['WFEC', 31],
                        ['Closed', 23]
                    ],
                    type : 'donut'
                }
            };

            //prepare chart config and render
            $("#StatusWiseoverviewChart div").remove();

            $("#StatusWiseoverviewChart").append("<div id='StatusWiseoverviewGraph'>");

            this.StatusWiseoverviewChart = c3.generate(byStatusChartparams);
            //this.charts.push(renderedChart);
        }

        renderByAvgTimeChart(){
            //prepare template
            let byAvgTimeChartparams: c3.ChartConfiguration = {
                bindto: '#AvgTimeWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', 'Initiated','Approved','WFEC','Closed'],
                        ['CAPA average time spent in state', 30, 20, 10, 40]
                    ],
                    type: 'bar'
                },
                axis: {
                    x: {
                        type: 'category'
                    }
                }
            };

            //prepare chart config and render
            $("#AvgTimeWiseoverviewChart div").remove();

            $("#AvgTimeWiseoverviewChart").append("<div id='AvgTimeWiseoverviewGraph'>");

            this.AvgTimeWiseoverviewChart = c3.generate(byAvgTimeChartparams);
            //this.charts.push(renderedChart);
        }

        renderTable() {

            let itemCurrentStateDetails: ItemCurrentStateData[] = [
                {
                    id: "CA-1",
                    labels: [
                        {
                            label: 'OPEN',
                            days: 30
                        },
                        {
                            label: 'WAIT',
                            days: 30
                        },
                        {
                            label: 'CHECKED',
                            days: 30
                        },
                        {
                            label: 'CLOSED',
                            days: 30
                        }
                    ],
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021',
                    openToCloseDays: '120'
                },
                {
                    id: "CA-2",
                    labels: [
                        {
                            label: 'OPEN',
                            days: 30
                        },
                        {
                            label: 'WAIT',
                            days: 30
                        },
                        {
                            label: 'CHECKED',
                            days: 30
                        },
                        {
                            label: 'CLOSED',
                            days: 30
                        }
                    ],
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021',
                    openToCloseDays: '120'
                },
                {
                    id: "CA-3",
                    labels: [
                        {
                            label: 'OPEN',
                            days: 30
                        },
                        {
                            label: 'WAIT',
                            days: 30
                        },
                        {
                            label: 'CHECKED',
                            days: 30
                        },
                        {
                            label: 'CLOSED',
                            days: 30
                        }
                    ],
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021',
                    openToCloseDays: '120'
                }
            ];

            let table = $("#CCSOTable");
            $(".addedItem", table).remove();

            itemCurrentStateDetails.forEach(
                (itemData) => {
                    let clonedTemplate = $("#ccsoRow", this._root).clone();
                    let stateClass = itemData.currentState;
                    clonedTemplate.removeClass("hidden");
                    let classAttr = "addedItem" + " " + stateClass;
                    clonedTemplate.attr("class", classAttr);
                    $("#title", clonedTemplate).text(itemData.id + "!");
                    $("#title", clonedTemplate).data("ref", itemData.id + "!");

                    $("#currentstate", clonedTemplate).text(itemData.currentState);
                    $("#opentoclose", clonedTemplate).text(itemData.openToCloseDays);

                    itemData.labels.forEach(
                        (label) => {
                            switch (label.label) {
                                case 'OPEN':
                                    $("#opencontent", clonedTemplate).text(label.days);
                                    break;
                                case 'WAIT':
                                    $("#waitcontent", clonedTemplate).text(label.days);
                                    break;
                                case 'CHECKED':
                                    $("#checkedcontent", clonedTemplate).text(label.days);
                                    break;
                                case 'CLOSED':
                                    $("#closedcontent", clonedTemplate).text(label.days);
                                    break;
                            }
                        }
                    );

                    clonedTemplate.appendTo($("#CCSOTable tbody", this._root));
                }
            );


            $("table#CCSOTable").highlightReferences();
            $("table#CCSOTable").tablesorter();

            //this.filterByLabel({ type: "" });

        }


        renderHTML() {

            let that = this;

            //Load the template
            that._root.html(that.DashboardHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("CAPA Trends Overview").prependTo(that._root);

            let baseControl = $("<div id='itemSelectionLabelDashboard'/>");

            $(".toolbarButtons").append(baseControl);

            let select = $(`<div class="dropdown navbar-right" style="">
                    <button class="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown">
                        <span id="selectedCat" >CAT</span>&nbsp;
                        <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                    </ul>
                    </div>`);


            baseControl.append(select);

            let categories = IC.getCategories();
            let index = 0;

            let capaCategories = categories.filter(cat => cat == "CA" || cat == "PA");

            capaCategories.forEach(cat => {

                let departments: any[] = [];
                let categories: any[] = [];
                let stateCodes: any[] = [];
                let stateDesc: any[];
                let deptWiseInitials: any[] = [];
                let catWiseInitials: any[] = [];
                let itemCurrentStateDetails: ItemCurrentStateData[] = [];

                let departments_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;

                departments_.forEach(dept => {
                    let deptDispName = new LabelTools().getDisplayName(dept);
                    departments.push(deptDispName);
                });
    
                categories = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "CAPA Category")[0].labels;
    
                deptWiseInitials = Array(departments.length).fill(0);
                catWiseInitials = Array(categories.length).fill(0);

                //let states_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == cat)[0].labels.sort();

                if(cat === "CA"){

                    //stateCodes = states_.sort();
                    stateDesc =  ['Initiated','Approved','RC Approved','WFEC','Closed'];

                }else{

                    //stateCodes = states_;
                    stateDesc =  ['Initiated','Approved','RC Approved','WFEC','Closed'];

                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    departments: departments,
                    catagories: categories,
                    stateCodes: stateCodes,
                    stateDesc: stateDesc,
                    deptWiseData: [cat + ' count by department', ...deptWiseInitials],
                    categoryWiseData: [cat, ...catWiseInitials],
                    itemCurrentStateDetails: itemCurrentStateDetails
                };
    
                this.ByCategoryLabelDetails.push(ByCategoryLabelData);

                if (ml.LabelTools.getLabelDefinitions([cat]).length > 0) {
                    let item = $(`<li class="cat" data-cat="${cat}"><a href="javascript:void(0)">${cat}</a></li>`).click(function () {
                        that.renderCategoryWiseData(cat);
                    });
                    $(".dropdown-menu", select).append(item);
                    if (index == 0) {
                        $("#selectedCat").text(cat);
                    }
                    index++;
                }
            });

            //Table filter
            $("#CTOInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#CTOTable tbody tr").show();

                $("#CTOTable tbody tr").each(function (index, elem) {
                    if (($(elem).text().toLowerCase().indexOf(value) == -1)) {
                        $(elem).hide();
                    }
                });
            });

        }

        renderCategoryWiseData(cat: string) {

            if (cat == undefined) {
                return;
            }
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

        }

        processLabelsData(labels: XRLabelEntry[]){

        }

        DashboardHTMLDom = `
        <div class="panel-body-v-scroll fillHeight panel-default ">
        <style>
        .chart {
            width: 90%; 
            min-height: 350px;
            cursor:pointer;
        }
        .bigChart
        {
            width: 90%; 
            min-height: 450px;
            cursor:pointer;
        }
        .timerangenormal{
            background-color: rgb(255, 255, 255); 
            color: rgb(0, 128, 0);
        }
        .timerangeselected{
            background-color: #337ab7;
            color: #f6fbfd;
        }
        .filterDates {
            width: 115px;
            margin: 0 6px;
        }
        
        .date-filter-form-control {
            height: 20px;
            padding: 6px 12px;
            font-size: 14px;
            line-height: 1.42857143;
            color: #555;
            background-color: #fff;
            background-image: none;
            border: 1px solid #ccc;
            border-radius: 4px;
        }
        .date-filter-btn {
            margin-bottom: 0;
            font-weight: 400;
            text-align: center;
            white-space: nowrap;
            vertical-align: middle;
            touch-action: manipulation;
            cursor: pointer;
            background-image: none;
            border: 1px solid transparent;
            padding: 0px 5px;
            font-size: 12px;
            line-height: 1.42857143;
            border-radius: 4px;
        }
        </style>

        <div  style="margin:10px;">
            <div class="row" id="waiting" class="spinningWait"></div>
        </div>

        <div id="CTOContent" class="" style="margin:10px;" >
            
            <div class="row doNotCopy">
                <div class="col-lg-12"> 
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CapaTimeSeriesChartTitle">CAPA TimeSeries Trend</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div>
                                <div id="timeSeriesChartRangeFilter" style="display:flex;margin-left: 40px">
                                    <div class="btn-group labelTools">
                                        <button id="weekRange" class="btn btn-default btn-xs timerangeselected" data-original-title="" title="">Week</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="monthRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">Month</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="threeMonthsRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">3Months</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="sixMonthsRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">6Months</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="twelveMonthsRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">12Months</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="ytdRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">YTD</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="moreThanYearRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">>Year</button>
                                    </div>
                                    <div class="btn-group labelTools">
                                        <button id="datefilterRange" class="btn btn-default btn-xs timerangenormal"  data-original-title="" title="">Date Filter</button>
                                    </div>
                                </div>
                                <div id="dateRangeFilter" class="baseControl" style="display:flex;margin-left: 80px">
                                    <p>
                                        <span class="">From</span>
                                        <input id="fromdate" type='text' class='date-filter-form-control filterDates'>
                                        <span class="">To</span>
                                        <input id="todate" type='text' class='date-filter-form-control filterDates'>
                                        <button id="gobutton" style="margin-left: 12px" type="button" class="date-filter-btn btn-success">Go</button>
                                    </p>
                                </div>
                                <div id="CapaStatusTimeSeriesChart" class="bigChart"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        
            <div class="row doNotCopy"> 
                <div class="col-lg-6 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="DeptWiseChartTitle">Department wise CAPA count overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="DeptWiseoverviewChart" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div  class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CatWiseChartTitle">Category wise CAPA count overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="CatWiseoverviewChart" class="chart" ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="currentStatusList">
                <div class="row" id="CTOTitleForCopy"></div> 
                <div class="row doNotCopy CTOtable">
                    <div class="col-lg-3 ">
                        <h3 id="CTOTableHeader">CAPA current status list</h3>
                    </div>
                    <div class=" col-lg-7"></div>
                    <div class=" col-lg-2">
                        <input type="text" id="CTOInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                    </div>
                </div>
                <div class="row CTOtable">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-condensed table-borderless table-hover" id="CTOTable">
                                <thead>
                                    <tr>
                                    <th>Item</th>
                                    <th>Department</th>
                                    <th>Category</th>
                                    <th>Currernt State</th>
                                    </tr>
                                </thead>
                                <tbody id="ctoList">
                                    <tr id="ctoRow" class="hidden">
                                    <td id="title" ></td>
                                    <td id="department" ></td>
                                    <td id="category" ></td>
                                    <td id="currentstate" ></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </div>

        </div>
        `
    }
}

// Register the plugin
$(function () {
    plugins.register(new CapaTrendsDashboard.CapaTrendsDashboard());
});