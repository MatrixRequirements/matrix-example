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
            return "1.8.0";
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
        currentStateSetDate: Date;
        itemStateDaysCountData: ItemStateDaysCount[];
        openToCloseDays: number;
        InitiatedDate: Date;
        ClosedDate: Date;
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
        statusWiseInitialData: any[];
        statusWiseData: any[];
        statusWiseLegendColors: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        stateTrackerInitialData: any[];
        stateTrackerData: any[];
        stateTrackerLegendColors: any[];
        closedItemsData: any[];
        closureTimeData: any[];
        intialState: string;
        closedState: string;
        rejectedState: string;
        itemCurrentStateDetails: ItemCurrentStateData[];
    }

    // interface StateLabelConfig {
    //     label: string;
    //     order: Number;
    //     isTracked: string;
    //     legendColor: string;
    // }

    // interface CategoryConfig {
    //     id: string;
    //     deptFilterDisplayName: string;
    //     catFilterDisplayName: string;
    //     initialSate: string;
    //     closedState: string;
    //     states : StateLabelConfig[];
    // }

    // interface PluginConfig {
    //     categories: CategoryConfig[];
    // }

   
    class MCapaStatusDashboardControl extends BaseControl {

        currentCat: string = "";
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        DeptWiseoverviewChart: c3.ChartAPI;
        CatWiseoverviewChart: c3.ChartAPI;
        StatusWiseoverviewChart: c3.ChartAPI;
        AvgTimeWiseoverviewChart: c3.ChartAPI;
        ClosureTimeoverviewChart: c3.ChartAPI;
        CapaTrackerChart: c3.ChartAPI;
        enableDeptDateFilter: boolean = false;
        enableCatDateFilter: boolean = false;
        enableStatusDateFilter: boolean = false;
        enableClosureDateFilter: boolean = false;
        enableTrackerDateFilter: boolean = false;
        enableCstDateFilter: boolean = false;

        pluginConfig: any = IC.getSettingJSON("MSCO");

        // pluginConfig: any = {
        //     "categories": [
        //        { 
        //             "id": "CA",
        //             "initialSate": "AN1",
        //             "closedState": "AN5",
        //             "deptFilterDisplayName": "Department",
        //             "catFilterDisplayName": "CAPA Category",
        //             "states" : [
        //                 {
        //                     "label": "AN1",
        //                     "order": 1,
        //                     "isTracked": "Y",
        //                     "legendColor": "#d62728"
        //                 },
        //                 {
        //                     "label": "AN2",
        //                     "order": 2,
        //                     "isTracked": "Y",
        //                     "legendColor": "#ff7f0e"
        //                 },
        //                 {
        //                     "label": "AN3",
        //                     "order": 3,
        //                     "isTracked": "Y",
        //                     "legendColor": "#9467bd"
        //                 },
        //                 {
        //                     "label": "AN4",
        //                     "order": 4,
        //                     "isTracked": "Y",
        //                     "legendColor": "#1f77b4"
        //                 },
        //                 {
        //                     "label": "AN5",
        //                     "order": 5,
        //                     "isTracked": "N",
        //                     "legendColor": "#2ca02c"
        //                 },
        //                 {
        //                     "label": "CAR",
        //                     "order": 6,
        //                     "isTracked": "N",
        //                     "legendColor": "#8c564b"
        //                 }
        //             ]
        //         },
        //         { 
        //             "id": "PA",
        //             "initialSate": "PN1",
        //             "closedState": "PAC",
        //             "deptFilterDisplayName": "Department",
        //             "catFilterDisplayName": "CAPA Category",
        //             "states" : [
        //                 {
        //                     "label": "PN1",
        //                     "order": 1,
        //                     "isTracked": "Y",
        //                     "legendColor": "#d62728"
        //                 },
        //                 {
        //                     "label": "PN2",
        //                     "order": 2,
        //                     "isTracked": "Y",
        //                     "legendColor": "#ff7f0e"
        //                 },
        //                 {
        //                     "label": "PN3",
        //                     "order": 3,
        //                     "isTracked": "Y",
        //                     "legendColor": "#9467bd"
        //                 },
        //                 {
        //                     "label": "PN4",
        //                     "order": 4,
        //                     "isTracked": "Y",
        //                     "legendColor": "#1f77b4"
        //                 },
        //                 {
        //                     "label": "PAC",
        //                     "order": 5,
        //                     "isTracked": "N",
        //                     "legendColor": "#2ca02c"
        //                 },
        //                 {
        //                     "label": "CAR",
        //                     "order": 6,
        //                     "isTracked": "N",
        //                     "legendColor": "#8c564b"
        //                 }
        //             ]
        //         }
        //     ]
           
        // };


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

            that.initiateDateFilter("dept");
            that.initiateDateFilter("cat");
            that.initiateDateFilter("status");
            that.initiateDateFilter("closure");
            that.initiateDateFilter("tracker");
            that.initiateDateFilter("cst");
           

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
                $("#dept-date-filter",copied).remove();
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
                $("#cat-date-filter",copied).remove();
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
                $("#status-date-filter",copied).remove();
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
                $("#closure-date-filter",copied).remove();
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
                $("#tracker-date-filter",copied).remove();

                let title_ = $("#CapaTrackerChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CapaTrackerChart svg",this._root).width();
                that.CapaTrackerChart.resize({width:590});
            },()=>{
                that.CapaTrackerChart.resize({width:savedWidth})
            });

            ml.UI.copyBuffer($("#CSOTableHeader",this._root), "copy list to clipboard", $("#currentStatusList",this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();
    
                var filter = $("#CSOInputFilter",this._root).val();
               
                $(".hidden",copied).remove();
           
                $("#id", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
    
                $("#CSOInputFilter",copied).remove();

                $("#cst-date-filter",copied).remove();

                $("#CSOTitleForCopy", copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });

        }

        initiateDateFilter(dateFilterId){

            let that = this;
            let enableDateFilter;

            $("#"+dateFilterId+"-date-filter").hide();

            $("#"+dateFilterId+"-date-filter-icon").click(function () {

                switch (dateFilterId) {
                    case 'dept':
                        that.enableDeptDateFilter = !that.enableDeptDateFilter;
                        enableDateFilter = that.enableDeptDateFilter;
                        break;
                    case 'cat':
                        that.enableCatDateFilter = !that.enableCatDateFilter;
                        enableDateFilter = that.enableCatDateFilter;
                        break;
                    case 'status':
                        that.enableStatusDateFilter = !that.enableStatusDateFilter;
                        enableDateFilter = that.enableStatusDateFilter;
                        break;
                    case 'closure':
                        that.enableClosureDateFilter = !that.enableClosureDateFilter;
                        enableDateFilter = that.enableClosureDateFilter;
                        break; 
                    case 'tracker':
                        that.enableTrackerDateFilter = !that.enableTrackerDateFilter;
                        enableDateFilter = that.enableTrackerDateFilter;
                        break; 
                    case 'cst':
                        that.enableCstDateFilter = !that.enableCstDateFilter;
                        enableDateFilter = that.enableCstDateFilter;
                        break;        
                };     

                if(enableDateFilter){
                    $("#"+dateFilterId+"-date-filter").show();
                }else{
                    $("#"+dateFilterId+"-date-filter").hide();

                    let byCategoryLabelData = that.ByCategoryLabelDetails
                    .find(({ category }) => category === that.currentCat);

                    switch (dateFilterId) {
                        case 'dept':
                            that.renderByDeptChart(byCategoryLabelData.displayDepartments,byCategoryLabelData.deptWiseData);
                            break;
                        case 'cat':
                            that.renderByCatChart(byCategoryLabelData.displayCategories,byCategoryLabelData.categoryWiseData);
                            break;
                        case 'status':
                            that.renderByStatusChart(byCategoryLabelData.statusWiseData,byCategoryLabelData.statusWiseLegendColors);
                            break;
                        case 'closure':
                            that.renderClosureTimeChart(byCategoryLabelData.closedItemsData,byCategoryLabelData.closureTimeData);
                            break; 
                        case 'tracker':
                            that.renderTrackerChart(byCategoryLabelData.trackerStates,byCategoryLabelData.stateTrackerData,byCategoryLabelData.stateTrackerLegendColors);
                            break; 
                        case 'cst':
                            that.renderTable(byCategoryLabelData.itemCurrentStateDetails, byCategoryLabelData.stateDesc);
                            break;
                   }
                }
            });

            //Initiating date range selection section
            let fromDate = $("#"+dateFilterId+"-fromdate", that._root);
            let toDate = $("#"+dateFilterId+"-todate", that._root);
            let goButton = $("#"+dateFilterId+"-gobutton", that._root);

            //MM/dd/YYYY 
            //ml.UI.DateTime.getSimpleDateTimeFormatMoment()
            fromDate.datetimepicker({
                format: 'MM/DD/YYYY',
                maxDate: 'now'
            });
            toDate.datetimepicker({
                defaultDate: new Date(),
                maxDate: 'now',
                useCurrent: false, //Important! 
                format: 'MM/DD/YYYY'
            });
            ml.UI.setEnabled(goButton, fromDate.data("DateTimePicker").date() && toDate.data("DateTimePicker").date());

            fromDate.on("dp.change", function (e: any) {
                toDate.data("DateTimePicker").minDate(e.date);
                ml.UI.setEnabled(goButton, fromDate.data("DateTimePicker").date() && toDate.data("DateTimePicker").date());
            });
            toDate.on("dp.change", function (e: any) {
                fromDate.data("DateTimePicker").maxDate(e.date);
                ml.UI.setEnabled(goButton, fromDate.data("DateTimePicker").date() && toDate.data("DateTimePicker").date());
            });

            $("#"+dateFilterId+"-gobutton").click(function () {

                let fromDateSelected = fromDate.data("DateTimePicker").date();
                let toDateSelected = toDate.data("DateTimePicker").date();
                
                let byCategoryLabelData = that.ByCategoryLabelDetails
                .find(({ category }) => category === that.currentCat);

                switch (dateFilterId) {
                    case 'dept':
                        that.renderDeptChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;
                    case 'cat':
                        that.renderCatChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;
                    case 'status':
                        that.renderStatusChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;
                    case 'closure':
                        that.renderClosureTimeChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break; 
                    case 'tracker':
                        that.renderTrackerChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break; 
                    case 'cst':
                        that.renderTableByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;           
                };
            });

        }

        renderDeptChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let deptWiseInitials = Array(byCategoryLabelData.departments.length).fill(0);
            let deptWiseData =  [ this.currentCat + ' count by department', ...deptWiseInitials];

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(itemCurrentStateData.InitiatedDate && 
                       (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                        let deptIndex = byCategoryLabelData.displayDepartments.findIndex(dept => dept === itemCurrentStateData.department);
                        deptWiseData[deptIndex + 1] += 1;
                    }
            });

            this.renderByDeptChart(byCategoryLabelData.displayDepartments,deptWiseData);
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
                            that.filterByLabel({ type: departments[d.x] });
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

        renderCatChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let catWiseInitials = Array(byCategoryLabelData.categories.length).fill(0);
            let catWiseData =  [ this.currentCat + ' count by category', ...catWiseInitials];

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(itemCurrentStateData.InitiatedDate && 
                       (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                        let catIndex = byCategoryLabelData.displayCategories.findIndex(cat => cat === itemCurrentStateData.category);
                        catWiseData[catIndex + 1] += 1;
                    }
            });

            this.renderByCatChart(byCategoryLabelData.displayCategories,catWiseData);
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
                            that.filterByLabel({ type: categories[d.x] });
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

       renderStatusChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData) {

           let fromDate = new Date(fromDateVal);
           let toDate = new Date(toDateVal);

            let statusWiseData: any = JSON.parse(JSON.stringify(byCategoryLabelData.statusWiseInitialData));

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(itemCurrentStateData.InitiatedDate && 
                       (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                        let stateIndex = byCategoryLabelData.stateDesc.findIndex(state => state === itemCurrentStateData.currentState);
                        statusWiseData[stateIndex][1] += 1;
                    }
            });

            this.renderByStatusChart(statusWiseData, byCategoryLabelData.statusWiseLegendColors);
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

        renderClosureTimeChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let closedItemsData = [];
            let closureTimeData: any[] = [this.currentCat + ' closure time(in days)'];

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(itemCurrentStateData.ClosedDate && 
                       (itemCurrentStateData.ClosedDate >= fromDate && itemCurrentStateData.ClosedDate <= toDate)){    
                        closedItemsData.push(itemCurrentStateData.id);
                        closureTimeData.push(itemCurrentStateData.openToCloseDays) 
                    }
            });

            this.renderClosureTimeChart(closedItemsData,closureTimeData);
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
                           that.filterByLabel({ type: closedItemsData[d.x] });
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

       renderTrackerChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let stateTrackerData: any = JSON.parse(JSON.stringify(byCategoryLabelData.stateTrackerInitialData));

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(itemCurrentStateData.InitiatedDate && 
                       (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                        stateTrackerData[0].push(itemCurrentStateData.id);

                        byCategoryLabelData.trackerStates.forEach(
                            (trackState, stateIndex) => {

                                let stateDays = 0;

                                for (let i = 0; i <= itemCurrentStateData.itemStateDaysCountData.length - 1; i++) {
                                    if(itemCurrentStateData.itemStateDaysCountData[i].state == trackState){
                                        stateDays = itemCurrentStateData.itemStateDaysCountData[i].days;
                                        break;
                                    }
                                }

                                stateTrackerData[stateIndex +1].push(stateDays);
                        });

                    }
            });

            this.renderTrackerChart(byCategoryLabelData.trackerStates,stateTrackerData,byCategoryLabelData.stateTrackerLegendColors);

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
                $("#CSOTable tbody tr").show();
            }
            else {
                filterDataClass = filter.type.split(' ').join('-').replaceAll('&','-');
                $("#CSOTable tbody tr").hide();
                $("#CSOTable tbody tr." + filterDataClass).show();
            }
        }

        renderTableByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);
            let itemCurrentStateDetailsByDateRange: ItemCurrentStateData[] = [];

            byCategoryLabelData.itemCurrentStateDetails.forEach(
                (itemCurrentStateData) => {

                    if(
                       (itemCurrentStateData.InitiatedDate && 
                       (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate))
                       ||
                       (itemCurrentStateData.ClosedDate && 
                        (itemCurrentStateData.ClosedDate >= fromDate && itemCurrentStateData.ClosedDate <= toDate))
                    )
                    {

                        itemCurrentStateDetailsByDateRange.push(itemCurrentStateData);
                    }
            });

            this.renderTable(itemCurrentStateDetailsByDateRange, byCategoryLabelData.stateDesc);
        }

        renderTable(itemCurrentStateDetails: ItemCurrentStateData[], stateDesc: any[]) {

            let table = $("#CSOTable");
            $(".addedItem", table).remove();
            $(".addedHeader", table).remove();

            let tableHeader = $('<tr />');
            tableHeader.attr("class", "addedHeader");
            tableHeader.append('<th>Item</th>');
            tableHeader.append('<th>Department</th>');
            tableHeader.append('<th>Category</th>');
            tableHeader.append('<th>Currernt State</th>');

            stateDesc.forEach(
                (stateLabel) => {
                    tableHeader.append('<th>' + stateLabel +'</th>');
                }
            );

            tableHeader.append('<th>Closure Time</th>');

            $("#ccsoTableHeader").append(tableHeader);

            itemCurrentStateDetails.forEach(
                (itemData) => {
                    let tableRow = $('<tr id="ccsoRow" />');
                    let classAttr = "addedItem" 
                        + " " + itemData.id.split(' ').join('-').replaceAll('&','-') 
                        + " " + itemData.department.split(' ').join('-').replaceAll('&','-')
                        + " " + itemData.category.split(' ').join('-').replaceAll('&','-')
                        + " " + itemData.currentState.split(' ').join('-').replaceAll('&','-');
                        
                    tableRow.attr("class", classAttr);
                    let titleRowData = $("<td/>");
                    tableRow.append(titleRowData);
                    titleRowData.text(itemData.id + "!");
                    titleRowData.data("ref", itemData.id + "!");

                    let deptRowData = $("<td>"+ itemData.department +"</td>");
                    tableRow.append(deptRowData);

                    let catRowData = $("<td>"+ itemData.category +"</td>");
                    tableRow.append(catRowData);
                    
                    let csRowData = $("<td>"+ itemData.currentState +"</td>");
                    tableRow.append(csRowData);

                    stateDesc.forEach(
                        (stateLabel) => {
                            
                            let stateLabelData = itemData.itemStateDaysCountData.find(stateData => stateData.state == stateLabel);
                            let labelRowData = stateLabelData ? $("<td>"+ stateLabelData.days +"</td>") : $("<td></td>");
                            tableRow.append(labelRowData);
                        }
                    );

                    let closureTimeRowData = itemData.openToCloseDays ? $("<td>"+ itemData.openToCloseDays +"</td>") : $("<td></td>");
                    tableRow.append(closureTimeRowData);
                    $("#ccsoRowList").append(tableRow);
                }
            );

            $("table#CSOTable").highlightReferences();
            $("table#CSOTable").tablesorter();

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
                 let stateDesc: any[] = [];
                 let trackerStates: any[] = [];
                 let deptWiseInitials: any[] = [];
                 let catWiseInitials: any[] = [];
                 let SateWiseAvgInitials: any[] = [];
                 let statusWiseData: any[] = [];
                 let statusWiseLegendColors: any[] = [];
                 let stateTrackerData: any[] = [['x']];
                 let stateTrackerLegendColors: any[] = [];
                 let statusWiseTotalDaysData: any[] = [];
                 let closedItemsData: any[] = [];
                 let itemCurrentStateDetails: ItemCurrentStateData[] = [];
                 let intialState;
                 let closedState;
                 let rejectedState;

                let pluginCategoryConfig: any = this.pluginConfig.categories.find(category => category.id == cat);
                 
                
                departments = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == pluginCategoryConfig.deptFilterDisplayName)[0].labels;
                categories = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == pluginCategoryConfig.catFilterDisplayName)[0].labels;

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

                intialState = pluginCategoryConfig.initialSate;
                closedState = pluginCategoryConfig.closedState;

                rejectedState = pluginCategoryConfig.rejectedState ? pluginCategoryConfig.rejectedState : "";

                SateWiseAvgInitials = Array(pluginCategoryConfig.states.length).fill(0);

                pluginCategoryConfig.states.forEach(sateConfig => {

                    stateCodes.push(sateConfig.label);
                    let labelDesc = new LabelTools().getDisplayName(sateConfig.label);
                    stateDesc.push(labelDesc);

                    if(sateConfig.isTracked == "Y"){
                        trackerStates.push(labelDesc);
                        stateTrackerLegendColors.push(sateConfig.legendColor);
                        stateTrackerData.push([labelDesc]);
                    }

                    statusWiseTotalDaysData.push([0,0]);
                    statusWiseData.push([labelDesc, 0]);

                    statusWiseLegendColors.push(sateConfig.legendColor);
                });

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
                    statusWiseInitialData: statusWiseData,
                    statusWiseData: statusWiseData,
                    statusWiseLegendColors: statusWiseLegendColors,
                    statusWiseTotalDaysData: statusWiseTotalDaysData,
                    statusWiseAvgData: [cat + ' average time spent in state', ...SateWiseAvgInitials],
                    stateTrackerInitialData: stateTrackerData,
                    stateTrackerData: stateTrackerData,
                    stateTrackerLegendColors: stateTrackerLegendColors,
                    closedItemsData: closedItemsData,
                    closureTimeData: [cat + ' closure time(in days)'],
                    intialState: intialState,
                    closedState: closedState,
                    rejectedState: rejectedState,
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
             $("#CSOInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#CSOTable tbody tr").show();

                $("#CSOTable tbody tr").each(function (index, elem) {
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
            this.renderTable(ByCategoryLabelData.itemCurrentStateDetails, ByCategoryLabelData.stateDesc);
        }

        getCurrentStateSetDate(labelData: XRLabelChange): Date {
            //sorting label set array in descending order based on version 
            labelData.set.sort((a, b) => b.version - a.version);
            let currentStateSetDate = new Date(labelData.set[0].dateIso);
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
                let rejectedStateIndex = -1;

                if(ByCategoryLabelData.rejectedState){
                    rejectedStateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === ByCategoryLabelData.rejectedState);
                }

                let itemCurrentStateData : ItemCurrentStateData = {
                    id: item.itemRef,
                    department: "",
                    category: "",
                    currentState: "",
                    currentStateSetDate: null,
                    itemStateDaysCountData: [],
                    openToCloseDays: null,
                    InitiatedDate: null,
                    ClosedDate: null
                };

                for (const label of item.labels) {
                    //check for item department
                    let deptIndex = ByCategoryLabelData.departments.findIndex(dept => dept === label.label);

                    if(deptIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.deptWiseData[deptIndex + 1] += 1;
                        itemCurrentStateData.department = ByCategoryLabelData.displayDepartments[deptIndex];
                    }

                    let catIndex = ByCategoryLabelData.categories.findIndex(cat => cat === label.label);

                    if(catIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.categoryWiseData[catIndex + 1] += 1;
                        itemCurrentStateData.category = ByCategoryLabelData.displayCategories[catIndex];
                    }

                    let stateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === label.label);
                    let stateDesc = ByCategoryLabelData.stateDesc[stateIndex];

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
                            initalStateData[0].set.sort((a, b) => a.version - b.version);
                            let intiatedDate = new Date(initalStateData[0].set[0].dateIso);
                            itemCurrentStateData.InitiatedDate = intiatedDate;
                        }

                        if(stateIndex == closedStateIndex){
                            closeStateData.push(label);
                        }

                        let stateDescIndex = ByCategoryLabelData.trackerStates.findIndex(stateDisp => stateDisp === stateDesc);

                        //check if state is closed or not  
                        //if(stateIndex !== closedStateIndex){ 
                        if(stateDescIndex > -1){     
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

                if(itemCurrentSateIndex == rejectedStateIndex){
                    ByCategoryLabelData.statusWiseTotalDaysData[itemCurrentSateIndex][0] += itemCurrentStateDaysCount;
                    ByCategoryLabelData.statusWiseTotalDaysData[itemCurrentSateIndex][1] += 1;
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

                        itemCurrentStateData.InitiatedDate = intiatedDate;
                        itemCurrentStateData.ClosedDate = colosedDate;


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

                ByCategoryLabelData.itemCurrentStateDetails.push(itemCurrentStateData);

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

        .dateFilter{
            display:flex;
            margin-left: 45px;
        }

        .tableDateFilter{
            display:flex;
            margin-left: 350px;
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
            margin-left: 12px;
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
            <div class="row" id="waiting" class="spinningWait">

            </div>
        </div>

        <div id="MCSOContent" class="" style="margin:10px;" >
            <div class="row doNotCopy"> 
                <div class="col-lg-6 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="DeptWiseChartTitle">
                            Department wise CAPA count overview
                            <i id="dept-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="dept-date-filter" class="baseControl dateFilter">
                                <p>
                                    <span class="">From</span>
                                    <input id="dept-fromdate" type='text' class='date-filter-form-control filterDates'>
                                    <span class="">To</span>
                                    <input id="dept-todate" type='text' class='date-filter-form-control filterDates'>
                                    <button id="dept-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                </p>
                            </div>
                            <div id="DeptWiseoverviewChart" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div  class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CatWiseChartTitle">
                            Category wise CAPA count overview
                            <i id="cat-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="cat-date-filter" class="baseControl dateFilter">
                                <p>
                                    <span class="">From</span>
                                    <input id="cat-fromdate" type='text' class='date-filter-form-control filterDates'>
                                    <span class="">To</span>
                                    <input id="cat-todate" type='text' class='date-filter-form-control filterDates'>
                                    <button id="cat-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                </p>
                            </div>
                            <div id="CatWiseoverviewChart" class="chart" ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row doNotCopy"> 
                <div class="col-lg-6 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="StatusWiseChartTitle">
                            Status wise CAPA count overview
                            <i id="status-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="status-date-filter" class="baseControl dateFilter">
                                <p>
                                    <span class="">From</span>
                                    <input id="status-fromdate" type='text' class='date-filter-form-control filterDates'>
                                    <span class="">To</span>
                                    <input id="status-todate" type='text' class='date-filter-form-control filterDates'>
                                    <button id="status-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                </p>
                            </div>
                            <div id="StatusWiseoverviewChart" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div  class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="AvgTimeWiseChartTitle">
                            Average time state wise overview
                            </h3>
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
                            <h3 class="panel-title" id="ClosureTimeChartTitle">
                            CAPA closure time overview
                            <i id="closure-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="closure-date-filter" class="baseControl dateFilter">
                                <p>
                                    <span class="">From</span>
                                    <input id="closure-fromdate" type='text' class='date-filter-form-control filterDates'>
                                    <span class="">To</span>
                                    <input id="closure-todate" type='text' class='date-filter-form-control filterDates'>
                                    <button id="closure-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                </p>
                            </div>
                            <div id="ClosureTimeoverviewChart" class="closureTimeChart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row doNotCopy">
                <div class="col-lg-12"> 
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CapaTrackerChartTitle">
                            CAPA Tracker
                            <i id="tracker-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                            </h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="tracker-date-filter" class="baseControl dateFilter">
                                <p>
                                    <span class="">From</span>
                                    <input id="tracker-fromdate" type='text' class='date-filter-form-control filterDates'>
                                    <span class="">To</span>
                                    <input id="tracker-todate" type='text' class='date-filter-form-control filterDates'>
                                    <button id="tracker-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                </p>
                            </div>
                            <div id="CapaTrackerChart" class="bigChart"></div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="currentStatusList">
                <div class="row" id="CSOTitleForCopy"></div> 
                <div class="row doNotCopy CSOtable">
                    <div class="col-lg-3 ">
                        <h3 id="CSOTableHeader">
                        CAPA current status list
                        <i id="cst-date-filter-icon" class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" data-original-title="Date Filter"> </i>
                        </h3>
                    </div>
                    <div class=" col-lg-7"></div>
                    <div class=" col-lg-2">
                        <input type="text" id="CSOInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                    </div>
                </div>
                <div class="row CSOtable">
                    <div class="col-md-12">
                        <div id="cst-date-filter" class="baseControl tableDateFilter">
                            <p>
                                <span class="">From</span>
                                <input id="cst-fromdate" type='text' class='date-filter-form-control filterDates'>
                                <span class="">To</span>
                                <input id="cst-todate" type='text' class='date-filter-form-control filterDates'>
                                <button id="cst-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                            </p>
                        </div>
                        <div class="table-responsive">
                            <table class="table table-condensed table-borderless table-hover" id="CSOTable">
                                <thead id="ccsoTableHeader">
                                </thead>
                                <tbody id="ccsoRowList">
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