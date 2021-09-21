/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace MCapaStatusDashboard {
    export class MCapaStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {

            if (!IC.getSettingJSON( "MSCO")) return [];
        
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "MCSO",
                title: "CAPA Status Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-chart-bar",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new MCapaStatusDashboardControl(options.control);
                    control.initPage();
                },
            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return "CAPA Status Overview";
        }

        getPluginVersion(): string {
            return "1.2.0";
        }
    }

    interface ItemStateDaysCount {
        state: string;
        days: number;
    }

    interface ItemCurrentStateData {
        id: string;
        department: string;
        category: string;
        currentState: string;
        currentStateSetDate: string;
        itemStateDaysCountData: ItemStateDaysCount[];
        openToCloseDays: number;
        InitiatedDate: string;
        ClosedDate: string;
    }

    interface ByCategoryLabelData {
        category: string;
        departments: any[];
        displayDepartments: any[];
        categories: any[];
        displayCategories: any[];
        stateCodes: any[];
        stateDesc: any[];
        trackerStates: any[];
        deptWiseData: any[];
        categoryWiseData: any[];
        statusWiseData: any[];
        statusWiseLegendColors: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        stateTrackerData: any[];
        stateTrackerLegendColors: any[];
        closedItemsData: any[];
        closureTimeData: any[];
        intialState: string;
        closedState: string;
        itemCurrentStateDetails: ItemCurrentStateData[];
    }

   
    class MCapaStatusDashboardControl extends BaseControl {

        currentCat: string = "";
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        DeptWiseoverviewChart: c3.ChartAPI;
        CatWiseoverviewChart: c3.ChartAPI;
        StatusWiseoverviewChart: c3.ChartAPI;
        AvgTimeWiseoverviewChart: c3.ChartAPI;
        ClosureTimeoverviewChart: c3.ChartAPI;
        CapaTrackerChart: c3.ChartAPI;


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


            setTimeout(o => that.installCopyButtons("CAPA Status Overview"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                $(".spinningWait", that._root).hide();
                //$("#MCSONoItems", that._root).hide();
                that.processLabelsData(result);
                that.renderCategoryWiseData("");
            }).then(() => {
                //Let's remove the spinning wait
                $(".spinningWait",that._root).hide();
                //$("#MCSONoItems", that._root).show();
            });
        }

        installCopyButtons(title: string) {
            let that = this;
            
            let savedWidth = 0;
    
            ml.UI.copyBuffer($("#DeptWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#DeptWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#DeptWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#DeptWiseoverviewChart svg",this._root).width();
                that.DeptWiseoverviewChart.resize({width:590});
            },()=>{
                that.DeptWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#CatWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CatWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#CatWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CatWiseoverviewChart svg",this._root).width();
                that.CatWiseoverviewChart.resize({width:590});
            },()=>{
                that.CatWiseoverviewChart.resize({width:savedWidth})
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

            ml.UI.copyBuffer($("#ClosureTimeChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#ClosureTimeoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#ClosureTimeChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#ClosureTimeoverviewChart svg",this._root).width();
                that.ClosureTimeoverviewChart.resize({width:590});
            },()=>{
                that.ClosureTimeoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#CapaTrackerChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CapaTrackerChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#CapaTrackerChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CapaTrackerChart svg",this._root).width();
                that.CapaTrackerChart.resize({width:590});
            },()=>{
                that.CapaTrackerChart.resize({width:savedWidth})
            });

            ml.UI.copyBuffer($("#MCSOTableHeader",this._root), "copy list to clipboard", $("#currentStatusList",this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();
    
                var filter = $("#MCSOInputFilter",this._root).val();
               
                $(".hidden",copied).remove();
           
                $("#id", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
    
                $("#MCSOInputFilter",copied).remove();
    
                $("#MCSOTitleForCopy", copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });

        }

        renderByDeptChart(departments,deptWiseData){
            let that = this;
             //prepare template
             let byDeptChartparams: c3.ChartConfiguration = {
                bindto: '#DeptWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', ...departments],
                        deptWiseData
                    ],
                    type: 'bar',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                axis: {
                    x: {
                        type: 'category'
                    }
                }
            };

            //prepare chart config and render
            $("#DeptWiseoverviewChart div").remove();

            $("#DeptWiseoverviewChart").append("<div id='DeptWiseoverviewGraph'>");

            this.DeptWiseoverviewChart = c3.generate(byDeptChartparams);
            //this.charts.push(renderedChart);

            $("#DeptWiseoverviewChart svg").click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderByCatChart(categories,categoryWiseData){
            let that = this;
            //prepare template
            let byCatChartparams: c3.ChartConfiguration = {
               bindto: '#CatWiseoverviewGraph',
               data: {
                    x : 'x',
                    columns: [
                        ['x', ...categories],
                        categoryWiseData
                    ],
                    type: 'bar',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                axis: {
                    x: {
                        type: 'category'
                    }
                }
           };

           //prepare chart config and render
           $("#CatWiseoverviewChart div").remove();

           $("#CatWiseoverviewChart").append("<div id='CatWiseoverviewGraph'>");

           this.CatWiseoverviewChart = c3.generate(byCatChartparams);
           //this.charts.push(renderedChart);

           $("#CatWiseoverviewChart svg").click(function () {
                that.filterByLabel({ type: "" })
           });
       }

       renderByStatusChart(statusWiseData,legendColors){
            let that = this;
            //prepare template
            let byStatusChartparams: c3.ChartConfiguration = {
                bindto: '#StatusWiseoverviewGraph',
                data: {
                    columns: statusWiseData,
                    type : 'pie',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                color: {
                    pattern: legendColors
                },
                pie: {
                    label: {
                        format: function (value: any, ratio: any, id: any) {
                            return (value);
                        }
                    }
                },
                tooltip: {
                    format: {
                        value: function (value : any, ratio: any, id: any, index: any) { return value; }
                    }
                }
            };

            //prepare chart config and render
            $("#StatusWiseoverviewChart div").remove();

            $("#StatusWiseoverviewChart").append("<div id='StatusWiseoverviewGraph'>");

            this.StatusWiseoverviewChart = c3.generate(byStatusChartparams);
            //this.charts.push(renderedChart);

            $("#StatusWiseoverviewChart svg").click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderByAvgTimeChart(states,statusWiseAvgData){
            //prepare template
            let byAvgTimeChartparams: c3.ChartConfiguration = {
                bindto: '#AvgTimeWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', ...states],
                        statusWiseAvgData
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

        renderClosureTimeChart(closedItemsData,closureTimeData){
            let that = this;
            //prepare template
            let closureTimeChartparams: c3.ChartConfiguration = {
               bindto: '#ClosureTimeoverviewGraph',
               data: {
                   x : 'x',
                   columns: [
                    ['x', ...closedItemsData],
                    closureTimeData
                   ],
                   type: 'bar',
                   onclick: function (d, i) {
                       setTimeout(() => {
                           that.filterByLabel({ type: d.id });
                       }, 100);
                   }
               },
               axis: {
                   x: {
                       type: 'category'
                   }
               }
           };

           //prepare chart config and render
           $("#ClosureTimeoverviewChart div").remove();

           $("#ClosureTimeoverviewChart").append("<div id='ClosureTimeoverviewGraph'>");

           this.ClosureTimeoverviewChart = c3.generate(closureTimeChartparams);
           //this.charts.push(renderedChart);

           $("#ClosureTimeoverviewChart svg").click(function () {
                that.filterByLabel({ type: "" })
           });
       }

        renderTrackerChart(trackerStates,stateTrackerData,legendColors){
            //prepare template
            let trackerChartparams: c3.ChartConfiguration = {
                bindto: '#CapaTrackerGraph',
                size: {
                    height: 900
                },
                data: {
                    x : 'x',
                    columns: stateTrackerData,
                    type: 'bar',
                    groups: [
                              trackerStates
                            ],
                    order: null
                },
                color: {
                    pattern: legendColors
                },
                axis: {
                    x: {
                        type: 'category'
                    },
                    rotated: true
                }
            };

            //prepare chart config and render
            $("#CapaTrackerChart div").remove();

            $("#CapaTrackerChart").append("<div id='CapaTrackerGraph'>");

            this.CapaTrackerChart = c3.generate(trackerChartparams);
            //this.charts.push(renderedChart);
        }

        private currentFilter = "";
        filterByLabel(filter: any) {
            this.currentFilter = filter.type;
            let filterDataClass = "";
            if (filter.type == "") {
                //Show all
                $("#itemCapaStatusDashboardList tbody tr").show();
            }
            else {
                filterDataClass = filter.type;
                $("#itemCapaStatusDashboardList tbody tr").hide();
                $("#itemCapaStatusDashboardList tbody tr." + filterDataClass).show();
            }
        }

        renderTable(itemCurrentStateDetails: ItemCurrentStateData[]){

            let table = $("#MCSOtable");
            $(".addedItem", table).remove();

            itemCurrentStateDetails.forEach(
                (itemData) => {
                    let clonedTemplate = $("#csoRow", this._root).clone();
                    //let stateClass = itemData.currentState;
                    clonedTemplate.removeClass("hidden");
                    let classAttr = "addedItem" 
                                    + " " + itemData.id 
                                    + " " + itemData.department 
                                    + " " + itemData.category 
                                    + " " + itemData.currentState;
                    clonedTemplate.attr("class", classAttr);
                    $("#title", clonedTemplate).text(itemData.id + "!");
                    $("#title", clonedTemplate).data("ref", itemData.id + "!");
                    $("#department", clonedTemplate).text(itemData.department);
                    $("#category", clonedTemplate).text(itemData.category);
                    $("#currentstate", clonedTemplate).text(itemData.currentState);
                    $("##closureTime", clonedTemplate).text(itemData.openToCloseDays);
                    clonedTemplate.appendTo($("#MCSOtable tbody", this._root));
                }
            );


            $("table#MCSOtable").highlightReferences();
            $("table#MCSOtable").tablesorter();

            this.filterByLabel({ type: "" });
        }
       
        renderHTML() {

            let that = this;

            //Load the template
            that._root.html(that.ExampleHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("CAPA Status Overview").prependTo(that._root);

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
                 let displayDepartments: any[] = [];
                 let categories: any[] = [];
                 let displayCategories: any[] = [];
                 let stateCodes: any[] = [];
                 let stateDesc: any[];
                 let trackerStates: any[];
                 let deptWiseInitials: any[] = [];
                 let catWiseInitials: any[] = [];
                 let SateWiseAvgInitials: any[] = [];
                 let statusWiseData: any[] = [];
                 let statusWiseLegendColors: any[];
                 let stateTrackerData: any[] = [];
                 let stateTrackerLegendColors: any[];
                 let statusWiseTotalDaysData: any[] = [];
                 let closedItemsData: any[] = [];
                 let itemCurrentStateDetails: ItemCurrentStateData[] = [];
                 let intialState;
                 let closedState;
                 
                // let departments_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;
                departments = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;
                categories = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "CAPA Category")[0].labels;
    
                departments.forEach(dept => {
                    let deptDispName = new LabelTools().getDisplayName(dept);
                    displayDepartments.push(deptDispName);
                });

                categories.forEach(cat => {
                    let catDispName = new LabelTools().getDisplayName(cat);
                    displayCategories.push(catDispName);
                });

                deptWiseInitials = Array(departments.length).fill(0);
                catWiseInitials = Array(categories.length).fill(0);

                let states_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == cat)[0].labels;

                if(cat === "CA"){

                    stateCodes = states_.sort();
                    stateDesc =  ['Initiated','Approved','RC Approved', 'WFEC','Closed'];
                    trackerStates = ['Initiated','Approved','RC Approved', 'WFEC'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0],[0,0]];
                    intialState = "AN1";
                    closedState = "AN5";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['WFEC', 0],
                        ['Closed', 0]
                    ];

                    statusWiseLegendColors = ['#d62728', '#ff7f0e', '#9467bd','#1f77b4', '#2ca02c'];


                    stateTrackerData = [
                        ['x'],
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved'],
                        ['WFEC']
                    ];

                    stateTrackerLegendColors = ['#d62728', '#ff7f0e', '#9467bd','#1f77b4'];

                }else{

                    //stateCodes = states_;
                    stateCodes = ["PN1","PN2","PN3","PN4","PAC"];
                    stateDesc =  ['Initiated','Approved','RC Approved', 'WFEC','Closed'];
                    trackerStates = ['Initiated','Approved','RC Approved', 'WFEC'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0],[0,0]];
                    intialState = "PN1";
                    closedState = "PAC";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['WFEC', 0],
                        ['Closed', 0]
                    ];

                    statusWiseLegendColors = ['#d62728', '#ff7f0e', '#9467bd', '#1f77b4', '#2ca02c'];

                    stateTrackerData = [
                        ['x'],
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved'],
                        ['WFEC']
                    ];

                    stateTrackerLegendColors = ['#d62728', '#ff7f0e', '#9467bd', '#1f77b4'];

                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    departments: departments,
                    displayDepartments: displayDepartments,
                    categories: categories,
                    displayCategories: displayCategories,
                    stateCodes: stateCodes,
                    stateDesc: stateDesc,
                    trackerStates: trackerStates,
                    deptWiseData: [cat + ' count by department', ...deptWiseInitials],
                    categoryWiseData: [cat + ' count by category', ...catWiseInitials],
                    statusWiseData: statusWiseData,
                    statusWiseLegendColors: statusWiseLegendColors,
                    statusWiseTotalDaysData: statusWiseTotalDaysData,
                    statusWiseAvgData: [cat + ' average time spent in state', ...SateWiseAvgInitials],
                    stateTrackerData: stateTrackerData,
                    stateTrackerLegendColors: stateTrackerLegendColors,
                    closedItemsData: closedItemsData,
                    closureTimeData: [cat + ' closure time(in days)'],
                    intialState: intialState,
                    closedState: closedState,
                    itemCurrentStateDetails: itemCurrentStateDetails
                };
    
                this.ByCategoryLabelDetails.push(ByCategoryLabelData)

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
             $("#MCSOInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#MCSOTable tbody tr").show();

                $("#MCSOTable tbody tr").each(function (index, elem) {
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

            let ByCategoryLabelData = this.ByCategoryLabelDetails
                .find(({ category }) => category === this.currentCat);

            this.renderByDeptChart(ByCategoryLabelData.displayDepartments,ByCategoryLabelData.deptWiseData);
            this.renderByCatChart(ByCategoryLabelData.displayCategories,ByCategoryLabelData.categoryWiseData);
            this.renderByStatusChart(ByCategoryLabelData.statusWiseData,ByCategoryLabelData.statusWiseLegendColors);
            this.renderByAvgTimeChart(ByCategoryLabelData.stateDesc,ByCategoryLabelData.statusWiseAvgData);
            this.renderTrackerChart(ByCategoryLabelData.trackerStates,ByCategoryLabelData.stateTrackerData,ByCategoryLabelData.stateTrackerLegendColors);
            this.renderClosureTimeChart(ByCategoryLabelData.closedItemsData,ByCategoryLabelData.closureTimeData);

        }

        getCurrentStateSetDate(labelData: XRLabelChange): string {
            //sorting label set array in descending order based on version 
            labelData.set.sort((a, b) => b.version - a.version);
            let currentStateSetDate = new Date(labelData.set[0].dateIso).toISOString().slice(0, 10);
            return currentStateSetDate;
        }

        processLabelsData(labels: XRLabelEntry[]){

            let capaCategories = ['CA','PA'];
            for (const item of labels) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory && (!capaCategories.includes(itemCategory))){
                    continue;
                }

                let ByCategoryLabelData: ByCategoryLabelData;
                let itemIndex = -1;
                let itemCurrentSateIndex = -1;
                let itemCurrentStateDaysCount;

                for (const ByCategoryData of this.ByCategoryLabelDetails) {
                    if (itemCategory == ByCategoryData.category) {
                        ByCategoryLabelData = ByCategoryData;
                        break;
                    }
                }

                //let initialStateTrackerData = {...ByCategoryLabelData.stateTrackerData};
                let initialStateTrackerData = JSON.parse(JSON.stringify(ByCategoryLabelData.stateTrackerData));
                let initialStateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === ByCategoryLabelData.intialState);
                let closedStateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === ByCategoryLabelData.closedState);
                let initalStateData = [];
                let closeStateData = [];

                let itemCurrentStateData : ItemCurrentStateData = {
                    id: item.itemRef,
                    department: "",
                    category: "",
                    currentState: "",
                    currentStateSetDate: "",
                    itemStateDaysCountData: [],
                    openToCloseDays: null,
                    InitiatedDate: "",
                    ClosedDate: ""
                };

                for (const label of item.labels) {
                    //check for item department
                    let deptIndex = ByCategoryLabelData.departments.findIndex(dept => dept === label.label);

                    if(deptIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.deptWiseData[deptIndex + 1] += 1;
                        itemCurrentStateData.department = label.label;
                    }

                    let catIndex = ByCategoryLabelData.categories.findIndex(cat => cat === label.label);

                    if(catIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.categoryWiseData[catIndex + 1] += 1;
                        itemCurrentStateData.category = label.label;
                    }

                    let stateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === label.label);



                    if(stateIndex > -1){
                        //check for current state
                        if((label.reset.length !== label.set.length) && itemCurrentSateIndex < 0){
                            ByCategoryLabelData.statusWiseData[stateIndex][1] += 1;
                            itemCurrentSateIndex = stateIndex;
                            itemCurrentStateData.currentState = ByCategoryLabelData.stateDesc[stateIndex];
                            itemCurrentStateData.currentStateSetDate = this.getCurrentStateSetDate(label);
                        }else if((label.reset.length !== label.set.length) && stateIndex > itemCurrentSateIndex) {
                            ByCategoryLabelData.statusWiseData[itemCurrentSateIndex][1] -= 1;
                            ByCategoryLabelData.statusWiseData[stateIndex][1] += 1;
                            itemCurrentSateIndex = stateIndex;
                            itemCurrentStateData.currentState = ByCategoryLabelData.stateDesc[stateIndex];
                            itemCurrentStateData.currentStateSetDate = this.getCurrentStateSetDate(label);
                        }

                         //get the number of days label state was in
                        label.set.sort((a, b) => a.version - b.version);
                        label.reset.sort((a, b) => a.version - b.version);

                        const labelstateDaysCount = label.set.reduce((accumulator, currentValue, currentIndex, set) => {
                            let stateDays: number;
                            if (label.reset[currentIndex]) {
                                const setDate = new Date(currentValue.dateIso);
                                const resetDate = new Date(label.reset[currentIndex].dateIso);

                                let time_difference = resetDate.getTime() - setDate.getTime();

                                //calculate days difference by dividing total milliseconds in a day  
                                let days_difference = time_difference / (1000 * 60 * 60 * 24);

                                stateDays = Math.floor(days_difference);
                            } else {
                                const setDate = new Date(currentValue.dateIso);
                                const resetDate = new Date();

                                let time_difference = resetDate.getTime() - setDate.getTime();

                                //calculate days difference by dividing total milliseconds in a day  
                                let days_difference = time_difference / (1000 * 60 * 60 * 24);

                                stateDays = Math.floor(days_difference);
                            }

                            return accumulator + stateDays;

                        }, 0);


                        let itemStateDaysCount :ItemStateDaysCount = {
                            state: ByCategoryLabelData.stateDesc[stateIndex],
                            days: labelstateDaysCount
                        };

                        itemCurrentStateData.itemStateDaysCountData.push(itemStateDaysCount);
                        
                        if(label.reset.length == label.set.length){
                            ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][0] += labelstateDaysCount;
                            ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][1] += 1;
                        }else{
                            itemCurrentStateDaysCount = labelstateDaysCount;
                        }

                        if(stateIndex == initialStateIndex){
                            initalStateData.push(label);
                        }

                        if(stateIndex == closedStateIndex){
                            closeStateData.push(label);
                        }

                        //check if state is closed or not  
                        if(stateIndex !== closedStateIndex){ 
                            //update state tracker
                            if(itemIndex > -1){
                                ByCategoryLabelData.stateTrackerData[stateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                            }else{
                                ByCategoryLabelData.stateTrackerData[0].push(item.itemRef);
                                itemIndex = ByCategoryLabelData.stateTrackerData[0].length - 2;
                                for (let i = 0; i <= ByCategoryLabelData.trackerStates.length - 1; i++) {
                                    ByCategoryLabelData.stateTrackerData[i + 1].push(0);
                                }
                                ByCategoryLabelData.stateTrackerData[stateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                            }
                        }   
                    }
                } 

                if(itemCurrentSateIndex == closedStateIndex){

                    ByCategoryLabelData.stateTrackerData = initialStateTrackerData;

                    ByCategoryLabelData.statusWiseTotalDaysData[itemCurrentSateIndex][0] += itemCurrentStateDaysCount;
                    ByCategoryLabelData.statusWiseTotalDaysData[itemCurrentSateIndex][1] += 1;

                    if(initalStateData.length > 0 && closeStateData.length > 0){

                        initalStateData[0].set.sort((a, b) => a.version - b.version);
                        closeStateData[0].set.sort((a, b) => b.version - a.version);

                        const intiatedDate = new Date(initalStateData[0].set[0].dateIso);
                        const colosedDate = new Date(closeStateData[0].set[0].dateIso);

                        itemCurrentStateData.InitiatedDate = new Date(intiatedDate).toISOString().slice(0, 10);
                        itemCurrentStateData.ClosedDate = new Date(colosedDate).toISOString().slice(0, 10);


                        let time_difference = colosedDate.getTime() - intiatedDate.getTime();

                        //calculate days difference by dividing total milliseconds in a day  
                        let days_difference = time_difference / (1000 * 60 * 60 * 24);

                        let daystoCloseItem = Math.floor(days_difference);

                        //console.log("Item:"+item.itemRef+",Days to close:"+daystoCloseItem);

                        itemCurrentStateData.openToCloseDays = daystoCloseItem;

                        ByCategoryLabelData.closedItemsData.push(item.itemRef);
                        ByCategoryLabelData.closureTimeData.push(daystoCloseItem);
                    }
                }

            }

            for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
                ByCategoryLabelData.statusWiseTotalDaysData.forEach((element,index) => {
                    let avgData = 0;
                    if(element[1] !== 0){
                        avgData = element[0]/element[1]
                    }
                    ByCategoryLabelData.statusWiseAvgData[index + 1] = avgData.toFixed(2);
                });
            }

            // for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
            //     console.log("category:"+ByCategoryLabelData.category);
            //     console.log("departments:"+ByCategoryLabelData.departments);
            //     console.log("displayDepartments:"+ByCategoryLabelData.displayDepartments);
            //     console.log("categories:"+ByCategoryLabelData.categories);
            //     console.log("displayCategories:"+ByCategoryLabelData.displayCategories);
            //     console.log("department wise:"+JSON.stringify(ByCategoryLabelData.deptWiseData));
            //     console.log("categorie wise:"+JSON.stringify(ByCategoryLabelData.categoryWiseData));
            //     console.log("state codes:"+JSON.stringify(ByCategoryLabelData.stateCodes));
            //     console.log("state wise:"+JSON.stringify(ByCategoryLabelData.statusWiseData));
            //     console.log("trackerStates:"+JSON.stringify(ByCategoryLabelData.trackerStates));
            //     console.log("state TrackerData:"+JSON.stringify(ByCategoryLabelData.stateTrackerData));
            //     console.log("status Wise TotalDaysData:"+JSON.stringify(ByCategoryLabelData.statusWiseTotalDaysData));
            //     console.log("status Wise AvgData:"+JSON.stringify(ByCategoryLabelData.statusWiseAvgData));
            //     console.log("closed items data:"+JSON.stringify(ByCategoryLabelData.closedItemsData));
            //     console.log("closure time data:"+JSON.stringify(ByCategoryLabelData.closureTimeData));
            // }
        }

        
        // HTML template
        ExampleHTMLDom = `
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
            min-height: 900px;
            cursor:pointer;
        }
        .closureTimeChart{
            width: 90%; 
            min-height: 315px;
            cursor:pointer;
        }
        </style>

        <div  style="margin:10px;">
            <div class="row" id="waiting" class="spinningWait">

            </div>
        </div>

        <div id="MCSOContent" class="" style="margin:10px;" >
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

            <div class="row doNotCopy">
                <div class="col-lg-12"> 
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="ClosureTimeChartTitle">CAPA closure time overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="ClosureTimeoverviewChart" class="closureTimeChart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row doNotCopy">
                <div class="col-lg-12"> 
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CapaTrackerChartTitle">CAPA tracker</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="CapaTrackerChart" class="bigChart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="currentStatusList">
                <div class="row" id="MCSOTitleForCopy"></div> 
                <div class="row doNotCopy MCSOtable">
                    <div class="col-lg-3 ">
                        <h3 id="MCSOTableHeader">CAPA current status list</h3>
                    </div>
                    <div class=" col-lg-7"></div>
                    <div class=" col-lg-2">
                        <input type="text" id="MCSOInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                    </div>
                </div>
                <div class="row MCSOtable">
                    <div class="col-md-12">
                        <div class="table-responsive">
                            <table class="table table-condensed table-borderless table-hover" id="MCSOTable">
                                <thead>
                                    <tr>
                                    <th>Item</th>
                                    <th>Department</th>
                                    <th>Category</th>
                                    <th>Currernt State</th>
                                    <th>Closure Time</th>
                                    </tr>
                                </thead>
                                <tbody id="csoList">
                                    <tr id="csoRow" class="hidden">
                                    <td id="title" ></td>
                                    <td id="department" ></td>
                                    <td id="category" ></td>
                                    <td id="currentstate" ></td>
                                    <td id="closureTime" ></td>
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
    plugins.register(new MCapaStatusDashboard.MCapaStatusDashboard());
});