/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace CapaCurrentStatusDashboard {

    export class CapaCurrentStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "CCSO",
                title: "CAPA Current Status Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new CapaCurrentStatusDashboardControl(options.control);
                    control.initPage();
                },
            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return "CAPA Current Status Overview";
        }

        getPluginVersion(): string {
            return "1.0.0";
        }
    }

    interface ItemStateDaysCount {
        label: string;
        days: number;
    }


    interface ItemCurrentStateData {
        id: string;
        labels: ItemStateDaysCount[];
        currentState: string;
        currentStateSetDate: string;
        openToCloseDays: string;
    }

    interface ByCategoryLabelData {
        category: string;
        stateCodes: any[];
        stateDesc: any[];
        statusWiseData: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        closedState: string;
        itemCurrentStateDetails: ItemCurrentStateData[];
    }

    class CapaCurrentStatusDashboardControl extends BaseControl {

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


            setTimeout(o => that.installCopyButtons("CAPA Current Status Overview"), 10);

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

            let tableHeader = `<tr>
                                <th>Item</th>
                                <th>Open</th>
                                <th>Wait</th>
                                <th>Checked</th>
                                <th>Closed</th>
                                <th>Currernt State</th>
                                <th>Open to Close</th>
                                </tr>`;

            $("#ccsoTableHeader").append(tableHeader);   
            
            //id="ccsoList"

            itemCurrentStateDetails.forEach(
                (itemData) => {
                    let tableRow = $('<tr id="ccsoRow" />');
                    let stateClass = itemData.currentState;
                    let classAttr = "addedItem" + " " + stateClass;
                    tableRow.attr("class", classAttr);
                    let titleRowData = $("<td/>");
                    tableRow.append(titleRowData);
                    titleRowData.text(itemData.id + "!");
                    titleRowData.data("ref", itemData.id + "!");

                    itemData.labels.forEach(
                        (label) => {
                            let labelRowData = $("<td>"+ label.days +"</td>");
                            tableRow.append(labelRowData);
                        }
                    );

                    let csRowData = $("<td>"+ itemData.currentState +"</td>");
                    tableRow.append(csRowData);

                    let ocRowData = $("<td>"+ itemData.openToCloseDays +"</td>");
                    tableRow.append(ocRowData);

                    $("#ccsoList").append(tableRow);
                }
            );
            
            // itemCurrentStateDetails.forEach(
            //     (itemData) => {
            //         //let clonedTemplate = $("#ccsoRow", this._root).clone();

            //         let clonedTemplate = $(`<tr id="ccsoRow" class="hidden">
            //         <td id="title" ></td>
            //         <td id="opencontent" ></td>
            //         <td id="waitcontent" ></td>
            //         <td id="checkedcontent" ></td>
            //         <td id="closedcontent" ></td>
            //         <td id="currentstate" ></td>
            //         <td id="opentoclose" ></td>
            //         </tr>`);

            //         let stateClass = itemData.currentState;
            //         clonedTemplate.removeClass("hidden");
            //         let classAttr = "addedItem" + " " + stateClass;
            //         clonedTemplate.attr("class", classAttr);
            //         $("#title", clonedTemplate).text(itemData.id + "!");
            //         $("#title", clonedTemplate).data("ref", itemData.id + "!");

            //         $("#currentstate", clonedTemplate).text(itemData.currentState);
            //         $("#opentoclose", clonedTemplate).text(itemData.openToCloseDays);

            //         itemData.labels.forEach(
            //             (label) => {
            //                 switch (label.label) {
            //                     case 'OPEN':
            //                         $("#opencontent", clonedTemplate).text(label.days);
            //                         break;
            //                     case 'WAIT':
            //                         $("#waitcontent", clonedTemplate).text(label.days);
            //                         break;
            //                     case 'CHECKED':
            //                         $("#checkedcontent", clonedTemplate).text(label.days);
            //                         break;
            //                     case 'CLOSED':
            //                         $("#closedcontent", clonedTemplate).text(label.days);
            //                         break;
            //                 }
            //             }
            //         );

            //         clonedTemplate.appendTo($("#CCSOTable tbody", this._root));
            //     }
            // );


            $("table#CCSOTable").highlightReferences();
            $("table#CCSOTable").tablesorter();

            //this.filterByLabel({ type: "" });

        }


        renderHTML() {

            let that = this;

            //Load the template
            that._root.html(that.DashboardHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("CAPA Current Status Overview").prependTo(that._root);

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

                
                let stateCodes: any[] = [];
                let stateDesc: any[];
                let SateWiseAvgInitials: any[] = [];
                let statusWiseData: any[] = [];
                let statusWiseTotalDaysData: any[] = [];
                let itemCurrentStateDetails: ItemCurrentStateData[] = [];
                let closedState;

                //let states_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == cat)[0].labels.sort();

                if(cat === "CA"){

                    //stateCodes = states_.sort();
                    stateDesc =  ['Initiated','Approved','RC Approved', 'WFEC','Closed'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0],[0,0]];
                    closedState = "AN5";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['WFEC', 0],
                        ['Closed', 0]
                    ];

                }else{

                    //stateCodes = states_;
                    stateDesc =  ['Initiated','Approved','RC Approved','Closed'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0]];
                    closedState = "PAC";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['Closed', 0]
                    ];

                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    stateCodes: stateCodes,
                    stateDesc: stateDesc,
                    statusWiseData: statusWiseData,
                    statusWiseTotalDaysData: statusWiseTotalDaysData,
                    statusWiseAvgData: [cat, ...SateWiseAvgInitials],
                    closedState: closedState,
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
            $("#CCSOInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#CCSOTable tbody tr").show();

                $("#CCSOTable tbody tr").each(function (index, elem) {
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
        </style>

        <div  style="margin:10px;">
            <div class="row" id="waiting" class="spinningWait"></div>
        </div>

        <div id="CCSOContent" class="" style="margin:10px;" >
            <div class="row doNotCopy"> 
                <div class="col-lg-6 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="StatusWiseChartTitle">Status wise CAPA count overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="StatusWiseoverviewChart" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div  class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="AvgTimeWiseChartTitle">Average time state wise overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="AvgTimeWiseoverviewChart" class="chart" ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="currentStatusList">
                <div class="row" id="CCSOTitleForCopy"></div> 
                <div class="row doNotCopy CCSOtable">
                    <div class="col-lg-3 ">
                        <h3 id="CCSOTableHeader">CAPA current status list</h3>
                    </div>
                    <div class=" col-lg-7"></div>
                    <div class=" col-lg-2">
                        <input type="text" id="CCSOInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                    </div>
                </div>
                <div class="row CCSOtable">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-condensed table-borderless table-hover" id="CCSOTable">
                                <thead id="ccsoTableHeader">
                                </thead>
                                <tbody id="ccsoList">
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
    plugins.register(new CapaCurrentStatusDashboard.CapaCurrentStatusDashboard());
});