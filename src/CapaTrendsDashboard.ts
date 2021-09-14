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

    interface CurrentStateData {
        currentState: string;
        currentStateSetDate: string;
    }

    class CapaTrendsDashboardControl extends BaseControl {

        currentCat: string = "";
        labelHistoryData: XRLabelEntry[] = [];
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        DeptWiseoverviewChart: c3.ChartAPI;
        CatWiseoverviewChart: c3.ChartAPI;
        StatusTimeSeriesChart: c3.ChartAPI;
        StatusDateFilterChart: c3.ChartAPI;

        currentTimeRangeSelected: string = "week";

        currentWeekCategoryData: any[] = [];
        currentMonthCategoryData: any = {};
        threeMonthsCategoryData: any[] = [];
        sixMonthsCategoryData: any[] = [];
        twelveMonthsCategoryData: any[] = [];
        ytdCategoryData: any[] = [];
        moreThanYearCategoryData: any[] = [];

        currentWeekColumnsData: any[] = [];
        currentMonthColumnsData: any[] = [];
        threeMonthsColumnsData: any[] = [];
        sixMonthsColumnsData: any[] = [];
        twelveMonthsColumnsData: any[] = [];
        ytdColumnsData: any[] = [];
        moreThanYearColumnsData: any[] = [];

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


            $("#dateRangeFilter").hide();

            //Initiating date range selection section
            let fromDate = $("#fromdate", that._root);
            let toDate = $("#todate", that._root);
            let goButton = $("#gobutton", that._root);

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



            $('#gobutton').click(function () {

                let fromDateSelected = fromDate.data("DateTimePicker").date();
                let toDateSelected = toDate.data("DateTimePicker").date();

                //that.renderDataByDateRanges(fromDateSelected, toDateSelected);

                let dateFilterChartCategoryData = ['OPEN','WAIT','CHECKED','CLOSED'];
                let dateFilterChartColumnsData =  [
                    ['From:1/7/2021', 30, 10,20,90],
                    ['To:8/7/2021', 20, 30,10,70]
                ];

                that.prepareStatusDateFilterChart(dateFilterChartCategoryData,dateFilterChartColumnsData);

            });


            $('#weekRange').click(function () {

                $("#dateRangeFilter").hide();
                if (that.currentTimeRangeSelected !== "week") {
                    $('#weekRange').removeClass("timerangenormal");
                    $('#weekRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "week";
                    //that.renderStatusTimeSeriesChart(that.currentWeekColumnsData, that.currentWeekCategoryData);

                    let currentWeekColumnsData =  [
                        ['Open', 30, 20, 10, 0, 0, 0, 0],
                        ['Wait', 10, 20, 10, 0, 0, 0,0],
                        ['Checked', 30, 34, 20, 0, 0, 0,0],
                        ['Closed', 30, 34, 20, 0, 0, 0,0]
                    ];
                    let currentWeekCategoryData =  ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'];
                    that.renderStatusTimeSeriesChart(currentWeekColumnsData, currentWeekCategoryData);
                }

            });

            $('#monthRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "month") {
                    $('#monthRange').removeClass("timerangenormal");
                    $('#monthRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "month";
                    //that.renderStatusTimeSeriesChart(that.currentMonthColumnsData, that.currentMonthCategoryData.categories);

                    let currentMonthColumnsData =  [
                        ['Open', 30, 20, 10, 30, 0],
                        ['Wait', 10, 20, 10, 20, 0],
                        ['Checked', 30, 34, 20, 40, 0],
                        ['Closed', 30, 34, 20, 10, 0]
                    ];
                    let currentMonthCategoryData =  ["Week1('2021-04-01' to '2021-04-04')", "Week2('2021-04-05' to '2021-04-11')", "Week3('2021-04-12' to '2021-04-18')", "Week4('2021-04-19' to '2021-04-25')", "Week5('2021-04-26' to '2021-04-30')"];
                    that.renderStatusTimeSeriesChart(currentMonthColumnsData, currentMonthCategoryData);
                }

            });

            $('#threeMonthsRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "threeMonths") {
                    $('#threeMonthsRange').removeClass("timerangenormal");
                    $('#threeMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "threeMonths";
                    //that.renderStatusTimeSeriesChart(that.threeMonthsColumnsData, that.threeMonthsCategoryData);

                    let threeMonthsColumnsData =  [
                        ['Open', 30, 20, 10],
                        ['Wait', 10, 20, 10],
                        ['Checked', 30, 34, 20],
                        ['Closed', 30, 34, 20]
                    ];
                    let threeMonthsCategoryData = ["Feb 2021", "March 2021", "April 2021"];
                    that.renderStatusTimeSeriesChart(threeMonthsColumnsData, threeMonthsCategoryData);
                }

            });

            
            $('#sixMonthsRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "sixMonths") {
                    $('#sixMonthsRange').removeClass("timerangenormal");
                    $('#sixMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "sixMonths";
                    //that.renderStatusTimeSeriesChart(that.sixMonthsColumnsData, that.sixMonthsCategoryData);

                    let sixMonthsColumnsData =  [
                        ['Open', 30, 20, 10, 30, 20, 40],
                        ['Wait', 10, 20, 10, 50, 40, 50],
                        ['Checked', 30, 34, 20, 40, 60],
                        ['Closed', 30, 34, 20, 40, 50, 30]
                    ];
                    let sixMonthsCategoryData = ["Nov 2020","Dec 2020","Jan 2021","Feb 2021", "March 2021", "April 2021"];
                    that.renderStatusTimeSeriesChart(sixMonthsColumnsData, sixMonthsCategoryData);
                }

            });


            $('#twelveMonthsRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "twelveMonths") {
                    $('#twelveMonthsRange').removeClass("timerangenormal");
                    $('#twelveMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "twelveMonths";
                    //that.renderStatusTimeSeriesChart(that.twelveMonthsColumnsData, that.twelveMonthsCategoryData);

                    let twelveMonthsColumnsData =  [
                        ['Open', 30, 20, 10, 30],
                        ['Wait', 10, 20, 10, 50],
                        ['Checked', 30, 34, 20],
                        ['Closed', 30, 34, 20, 40]
                    ];
                    let twelveMonthsCategoryData = ["Jan 2021","Feb 2021", "March 2021", "April 2021"];
                    that.renderStatusTimeSeriesChart(twelveMonthsColumnsData, twelveMonthsCategoryData);
                }

            });


            $('#ytdRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "ytd") {
                    $('#ytdRange').removeClass("timerangenormal");
                    $('#ytdRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "ytd";
                    //that.renderStatusTimeSeriesChart(that.ytdColumnsData, that.ytdCategoryData);

                    let ytdColumnsData =  [
                        ['Open', 30, 20, 10, 30],
                        ['Wait', 10, 20, 10, 50],
                        ['Checked', 30, 34, 20],
                        ['Closed', 30, 34, 20, 40]
                    ];
                    let ytdCategoryData = ["Jan 2021","Feb 2021", "March 2021", "April 2021"];
                    that.renderStatusTimeSeriesChart(ytdColumnsData, ytdCategoryData);
                }

            });

            $('#moreThanYearRange').click(function () {

                $("#dateRangeFilter").hide();

                if (that.currentTimeRangeSelected !== "moreThanYear") {
                    $('#moreThanYearRange').removeClass("timerangenormal");
                    $('#moreThanYearRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "moreThanYear";
                    //that.renderStatusTimeSeriesChart(that.moreThanYearColumnsData, that.moreThanYearCategoryData);

                    let moreThanYearColumnsData = [
                        ['Open', 130, 120, 110, 130],
                        ['Wait', 110, 120, 110,150],
                        ['Checked', 130, 134, 120],
                        ['Closed', 130, 134, 120, 140]
                    ]; 
                    let moreThanYearCategoryData = ["2018","2019", "2020", "2021"];
                    that.renderStatusTimeSeriesChart(moreThanYearColumnsData, moreThanYearCategoryData);
                }

            });

            $('#datefilterRange').click(function () {

                $("#dateRangeFilter").show();

                if (that.currentTimeRangeSelected !== "datefilter") {
                    $('#datefilterRange').removeClass("timerangenormal");
                    $('#datefilterRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "datefilter";
                    //that.renderStatusTimeSeriesChart(that.moreThanYearColumnsData, that.moreThanYearCategoryData);
                }

            });


            setTimeout(o => that.installCopyButtons("CAPA Trends Overview"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                $(".spinningWait", that._root).hide();
                //$("#MCSONoItems", that._root).hide();
                this.labelHistoryData = result;
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

           
            ml.UI.copyBuffer($("#CapaTimeSeriesChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CapaStatusTimeSeriesChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#CapaTimeSeriesChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
                $(".hidden", copied).remove();
                $("#dateRangeFilter", copied).remove();
                $("#timeSeriesChartRangeFilter", copied).remove();
    
            },"",()=>{
                savedWidth = $("#CapaStatusTimeSeriesChart svg",this._root).width();
                that.StatusTimeSeriesChart.resize({width:590});
            },()=>{
                that.StatusTimeSeriesChart.resize({width:savedWidth})
            });


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

            ml.UI.copyBuffer($("#CTOTableHeader",this._root), "copy list to clipboard", $("#currentStatusList",this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();
    
                var filter = $("#CTOInputFilter",this._root).val();
               
                $(".hidden",copied).remove();
           
                $("#id", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
    
                $("#CTOInputFilter",copied).remove();
    
                $("#CTOTitleForCopy", copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });

        }

        highlighWeekRangeOption() {
            if (this.currentTimeRangeSelected !== "week") {
                $('#weekRange').removeClass("timerangenormal");
                $('#weekRange').addClass("timerangeselected");

                $('#' + this.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                $('#' + this.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                this.currentTimeRangeSelected = "week";
            }
        }



        renderCharts(){     
            this.renderByDeptChart();
            this.renderByCatChart();
            let currentWeekColumnsData =  [
                ['Open', 30, 20, 10, 0, 0, 0, 0],
                ['Wait', 10, 20, 10, 0, 0, 0,0],
                ['Checked', 30, 34, 20, 0, 0, 0,0],
                ['Closed', 30, 34, 20, 0, 0, 0,0]
            ];
            let currentWeekCategoryData =  ['2021-04-19', '2021-04-20', '2021-04-21', '2021-04-22', '2021-04-23', '2021-04-24', '2021-04-25'];
            this.renderStatusTimeSeriesChart(currentWeekColumnsData, currentWeekCategoryData);     
        }

        renderByDeptChart(){
            //prepare template
            let byDeptChartparams: c3.ChartConfiguration = {
               bindto: '#DeptWiseoverviewGraph',
               data: {
                   x : 'x',
                   columns: [
                       ['x', 'ST','PROD','QC','D&D','QA','MICRO','PUR','PROD','SC'],
                       ['CAPA count by department', 30, 20, 10, 40,30, 20, 10, 40,50]
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
           $("#DeptWiseoverviewChart div").remove();

           $("#DeptWiseoverviewChart").append("<div id='DeptWiseoverviewGraph'>");

           this.DeptWiseoverviewChart = c3.generate(byDeptChartparams);
           //this.charts.push(renderedChart);
        }

        renderByCatChart(){
           //prepare template
           let byCatChartparams: c3.ChartConfiguration = {
              bindto: '#CatWiseoverviewGraph',
              data: {
               x : 'x',
               columns: [
                   ['x', 'Internal Audit','Process/ Product','Complaint','External Audit'],
                   ['CAPA count by category', 30, 20, 10, 40]
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
          $("#CatWiseoverviewChart div").remove();

          $("#CatWiseoverviewChart").append("<div id='CatWiseoverviewGraph'>");

          this.CatWiseoverviewChart = c3.generate(byCatChartparams);
          //this.charts.push(renderedChart);
        }

        private renderStatusTimeSeriesChart(chartColumnsData, chartCategoryData) {

            //prepare template
            let timeSeriesChartparams: c3.ChartConfiguration = {
                bindto: '#stateTimeSeriesGraph',
                size: {
                    width: 500,
                },
                data: {
                    columns: chartColumnsData,
                    type: 'bar',
                    groups: [
                        ['OPEN', 'WAIT', 'CHECKED', 'CLOSED']
                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: chartCategoryData

                    },
                    y: {
                        show: false
                    }
                },
                color: {
                    pattern: ['#d62728', '#ff7f0e', '#1f77b4', '#2ca02c']
                }
            };

            //prepare chart config and render
            $("#CapaStatusTimeSeriesChart div").remove();

            $("#CapaStatusTimeSeriesChart").append("<div id='stateTimeSeriesGraph'>");

            this.StatusTimeSeriesChart = c3.generate(timeSeriesChartparams);
            //this.charts.push(renderedChart);

        }


        private prepareStatusDateFilterChart(dateFilterChartCategoryData,dateFilterChartColumnsData){

            let StatusDateFilterChartParams: c3.ChartConfiguration = {
                bindto: '#stateTimeSeriesGraph',
                size: {
                    width: 500,
                },
                data: {
                    columns: dateFilterChartColumnsData,
                    type: 'bar'
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: dateFilterChartCategoryData

                    },
                    y: {
                        show: false
                    }
                },
                color: {
                    pattern: ['#17becf', '#9467bd']
                }
            };

             //prepare chart config and render
             $("#CapaStatusTimeSeriesChart div").remove();

             $("#CapaStatusTimeSeriesChart").append("<div id='stateTimeSeriesGraph'>");
 
             this.StatusDateFilterChart = c3.generate(StatusDateFilterChartParams);
             //this.charts.push(renderedChart);
        }

        renderDataByDateRanges(fromDateVal: any, toDateVal: any) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let formattedFromDate = new Date(fromDate.setDate(fromDate.getDate() + 1)).toISOString().slice(0, 10);
            let formattedToDate = new Date(toDate.setDate(toDate.getDate() + 1)).toISOString().slice(0, 10);

            let dateFilterChartCategoryData = ['OPEN','WAIT','CHECKED','CLOSED'];
            let dateFilterChartColumnsData : any = [
                ['From:'+formattedFromDate, 0, 0,0,0],
                ['To:'+formattedToDate, 0, 0,0,0]
            ];

            this.labelHistoryData.forEach(
                (labelHistoryRecord) => {
                    let itemCategory = labelHistoryRecord.itemRef.substring(0, labelHistoryRecord.itemRef.indexOf('-'));
                    if(itemCategory == this.currentCat){
                        let labelHistoryData_ = { ...labelHistoryRecord };
                        let fromDateLabels: any[] = [];
                        let toDateLabels: any[] = [];

                        labelHistoryData_.labels.forEach(
                            (labelStatusHistoryrecord) => {
                                let fromDateLabelStatusData = {...labelStatusHistoryrecord};
                                let toDateLabelStatusData = {...labelStatusHistoryrecord};

                                fromDateLabelStatusData.set = [];
                                fromDateLabelStatusData.reset = [];

                                toDateLabelStatusData.set = [];
                                toDateLabelStatusData.reset = [];

                                labelStatusHistoryrecord.set.forEach(
                                    (setDateRecord)=>{
                                        let dateRecord = new Date(new Date(setDateRecord.dateUser).toISOString().slice(0, 10));

                                        if(dateRecord <= fromDate){
                                            fromDateLabelStatusData.set.push(setDateRecord);
                                        }

                                        if(dateRecord <= toDate){
                                            toDateLabelStatusData.set.push(setDateRecord);
                                        }
                                    }
                                );
                                
                                labelStatusHistoryrecord.reset.forEach(
                                    (resetDateRecord)=>{
                                        let dateRecord = new Date(new Date(resetDateRecord.dateUser).toISOString().slice(0, 10));

                                        if(dateRecord <= fromDate){
                                            fromDateLabelStatusData.reset.push(resetDateRecord);
                                        }

                                        if(dateRecord <= toDate){
                                            toDateLabelStatusData.reset.push(resetDateRecord);
                                        }
                                    }
                                );

                                if(fromDateLabelStatusData.set.length > 0 || fromDateLabelStatusData.reset.length > 0){
                                    fromDateLabels.push(fromDateLabelStatusData);
                                }

                                if(toDateLabelStatusData.set.length > 0 || toDateLabelStatusData.reset.length > 0){
                                    toDateLabels.push(toDateLabelStatusData);
                                }

                            }
                        );

                        let statusColumnIndex;

                        if(fromDateLabels.length > 0){
                            let fromDateLabelsCurrentSate: CurrentStateData = this.getItemCurrentState(fromDateLabels);
                            statusColumnIndex = dateFilterChartCategoryData.findIndex(column => column === fromDateLabelsCurrentSate.currentState);
                            dateFilterChartColumnsData[0][statusColumnIndex + 1] += 1;
                        }
                        
                        if(toDateLabels.length > 0){
                            let toDateLabelsCurrentSate: CurrentStateData = this.getItemCurrentState(toDateLabels);
                            statusColumnIndex = dateFilterChartCategoryData.findIndex(column => column === toDateLabelsCurrentSate.currentState);
                            dateFilterChartColumnsData[1][statusColumnIndex + 1] += 1;
                        }
                   }
                }
            );


            this.prepareStatusDateFilterChart(dateFilterChartCategoryData,dateFilterChartColumnsData);
        }

        renderTable() {

            let itemCurrentStateDetails: ItemCurrentStateData[] = [
                {
                    id: "CA-1",
                    department: 'ST',
                    category: 'Internal Audit',
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021'
                },
                {
                    id: "CA-2",
                    department: 'PROD',
                    category: 'Process/ Product',
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021'
                },
                {
                    id: "CA-3",
                    department: 'QC',
                    category: 'Complaint',
                    currentState: 'CLOSED',
                    currentStateSetDate: '02-07-2021'
                }
            ];

            let table = $("#CTOTable");
            $(".addedItem", table).remove();

            itemCurrentStateDetails.forEach(
                (itemData) => {
                    let clonedTemplate = $("#ctoRow", this._root).clone();
                    let stateClass = itemData.currentState;
                    clonedTemplate.removeClass("hidden");
                    let classAttr = "addedItem" + " " + stateClass;
                    clonedTemplate.attr("class", classAttr);
                    $("#title", clonedTemplate).text(itemData.id + "!");
                    $("#title", clonedTemplate).data("ref", itemData.id + "!");
                    $("#department", clonedTemplate).text(itemData.department);
                    $("#category", clonedTemplate).text(itemData.category);
                    $("#currentstate", clonedTemplate).text(itemData.currentState);
                    clonedTemplate.appendTo($("#CTOTable tbody", this._root));
                }
            );


            $("table#CTOTable").highlightReferences();
            $("table#CTOTable").tablesorter();

            //this.filterByLabel({ type: "" });

        }

        private prepareCurrentMonthCategories(month, year, _start) {
            let weeks = [],
                categories = [],
                firstDate = new Date(year, month, 1),
                lastDate = new Date(year, month + 1, 0),
                numDays = lastDate.getDate();
            let c = Date()
            let start = 1;
            let weekIndex = 1;
            let end = 7 - firstDate.getDay();
            if (_start == 'monday') {
                if (firstDate.getDay() === 0) {
                    end = 1;
                } else {
                    end = 7 - firstDate.getDay() + 1;
                }
            }

            while (start <= numDays) {

                let _s = new Date(year, month, start + 1).toJSON().slice(0, 10);
                let _e = new Date(year, month, end + 1).toJSON().slice(0, 10);

                weeks.push({ start: _s, end: _e });
                categories.push("Week" + weekIndex + "(" + _s + " to " + _e + ")");
                weekIndex += 1;
                start = end + 1;
                end = end + 7;
                end = start === 1 && end === 8 ? 1 : end;
                if (end > numDays) {
                    end = numDays;
                }
            }

            let currentMonthCategoryData = {
                categories: categories,
                weeks: weeks
            };

            return currentMonthCategoryData;
        }

        private prepareCurrentWeekCategories() {
            let currentDate = new Date();
            let currentWeek = [];
            let dateOfWeekDay, formattedDate;

            if (currentDate.getDay() == 0) {
                dateOfWeekDay = currentDate.getDate() - 7;
            } else {
                dateOfWeekDay = currentDate.getDate() - currentDate.getDay();
            }

            let startDate = new Date(currentDate.setDate(dateOfWeekDay));

            for (let i = 1; i <= 7; i++) {
                let formattedDate = new Date(startDate.setDate(startDate.getDate() + 1)).toISOString().slice(0, 10);
                currentWeek.push(formattedDate);
            }

            return currentWeek;
        }

        private getMonthNames() {
            const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
                "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            return monthNames;
        }

        private prepareMonthWiseCategories(previousMonths) {

            let monthNames = this.getMonthNames();

            let previousMonthsCategoryData = [];

            for (let i = previousMonths - 1; i >= 0; i--) {
                let currentDate = new Date();
                let currentMonth = currentDate.getMonth();
                currentDate.setMonth(currentMonth - i);
                previousMonthsCategoryData.push(monthNames[currentDate.getMonth()] + " " + currentDate.getFullYear())
            }

            return previousMonthsCategoryData;
        }

        private prepareYtdCategories(month, year) {

            let monthNames = this.getMonthNames();
            let ytdCategoryData = [];

            for (let i = 0; i <= month; i++) {
                ytdCategoryData.push(monthNames[i] + " " + year);
            }

            return ytdCategoryData;
        }

        private prepareMoreThanYearCategories(year, leastStatusSetDate) {
            let leastStatusSetYear = new Date(leastStatusSetDate).getFullYear();
            let moreThanYearCategoryData = [];

            while (leastStatusSetYear !== year) {
                moreThanYearCategoryData.push(leastStatusSetYear);
                leastStatusSetYear += 1;
            }

            moreThanYearCategoryData.push(year);

            return moreThanYearCategoryData;

        }

        private prepareInitialColumns(categoiesLength) {

            let emptyInitials = Array(categoiesLength).fill(0);

            let initialColumns = [
                ['OPEN', ...emptyInitials],
                ['WAIT', ...emptyInitials],
                ['CHECKED', ...emptyInitials],
                ['CLOSED', ...emptyInitials]
            ];

            return initialColumns;

        }

        private prepareCurrentWeekColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.forEach((categoryData, index) => {
                if ((currentStatusSetDate <= new Date(categoryData)) && (new Date(categoryData) <= new Date())) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        private prepareCurrentMonthColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.weeks.forEach((categoryData, index) => {
                if ((currentStatusSetDate <= new Date(categoryData.start) || currentStatusSetDate <= new Date(categoryData.end))
                    && (new Date(categoryData.start) <= new Date())) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        private prepareMonthWiseColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {
            let monthNames = this.getMonthNames();
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(monthNames[currentStatusSetDate.getMonth()] + " " + currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData, index) => {
                if (formattedCurrentStatusSetDate <= new Date(categoryData)) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }

        private prepareMoreThanYearColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData, index) => {
                if (formattedCurrentStatusSetDate <= new Date(categoryData)) {
                    columnsData[statusColumnIndex][index + 1] += 1;
                }
            });
        }


        private prepareStatusTimeSeriesChart(itemCurrentStateDetails: ItemCurrentStateData[], leastStatusSetDate: string) {

            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();

            this.currentWeekCategoryData = [];
            this.currentMonthCategoryData = {};
            this.threeMonthsCategoryData = [];
            this.sixMonthsCategoryData = [];
            this.twelveMonthsCategoryData = [];
            this.ytdCategoryData = [];
            this.moreThanYearCategoryData = [];

            this.currentWeekColumnsData = [];
            this.currentMonthColumnsData = [];
            this.threeMonthsColumnsData = [];
            this.sixMonthsColumnsData = [];
            this.twelveMonthsColumnsData = [];
            this.ytdColumnsData = [];
            this.moreThanYearColumnsData = [];

            //prepare current week categories
            this.currentWeekCategoryData = this.prepareCurrentWeekCategories();

            //prepare current month categories
            this.currentMonthCategoryData = this.prepareCurrentMonthCategories(currentMonth, currentYear, 'monday');

            //prepare 3 month categories
            this.threeMonthsCategoryData = this.prepareMonthWiseCategories(3);

            //prepare 6 month categories
            this.sixMonthsCategoryData = this.prepareMonthWiseCategories(6);

            //prepare 12 month categories
            this.twelveMonthsCategoryData = this.prepareMonthWiseCategories(12);

            //prepare YTD categories
            this.ytdCategoryData = this.prepareYtdCategories(currentMonth, currentYear);

            //prepare >year categories
            this.moreThanYearCategoryData = this.prepareMoreThanYearCategories(currentYear, leastStatusSetDate);

            //prepare intial current week columns
            this.currentWeekColumnsData = this.prepareInitialColumns(this.currentWeekCategoryData.length);
            //prepare intial current month columns
            this.currentMonthColumnsData = this.prepareInitialColumns(this.currentMonthCategoryData.categories.length);
            //prepare intial 3 month columns
            this.threeMonthsColumnsData = this.prepareInitialColumns(this.threeMonthsCategoryData.length);
            //prepare intial 6 month columns
            this.sixMonthsColumnsData = this.prepareInitialColumns(this.sixMonthsCategoryData.length);
            //prepare intial 12 month columns
            this.twelveMonthsColumnsData = this.prepareInitialColumns(this.twelveMonthsCategoryData.length);
            //prepare intial YTD columns
            this.ytdColumnsData = this.prepareInitialColumns(this.ytdCategoryData.length);
            //prepare intial >year columns
            this.moreThanYearColumnsData = this.prepareInitialColumns(this.moreThanYearCategoryData.length);

            itemCurrentStateDetails.forEach(
                (ItemCurrentStateData) => {
                    //prepare current week columns
                    this.prepareCurrentWeekColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.currentWeekCategoryData,
                        this.currentWeekColumnsData);

                    //prepare current month columns    
                    this.prepareCurrentMonthColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.currentMonthCategoryData,
                        this.currentMonthColumnsData);

                    //prepare three month columns    
                    this.prepareMonthWiseColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.threeMonthsCategoryData,
                        this.threeMonthsColumnsData);

                    //prepare six month columns    
                    this.prepareMonthWiseColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.sixMonthsCategoryData,
                        this.sixMonthsColumnsData);

                    //prepare twelve month columns    
                    this.prepareMonthWiseColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.twelveMonthsCategoryData,
                        this.twelveMonthsColumnsData);    

                    //prepare ytd columns    
                    this.prepareMonthWiseColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.ytdCategoryData,
                        this.ytdColumnsData);

                    //prepare intial >year columns 
                    this.prepareMoreThanYearColumnData(ItemCurrentStateData.currentState,
                        ItemCurrentStateData.currentStateSetDate,
                        this.moreThanYearCategoryData,
                        this.moreThanYearColumnsData);
                });

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

            $("#dateRangeFilter").hide();
            this.highlighWeekRangeOption();

        }

        getStateData(labels: XRLabelChange[], state: string): XRLabelChange {

            let stateData: XRLabelChange = labels.find(({ label }) => label === state);

            return stateData;
        }

        isItemCurrentState(stateData: XRLabelChange): boolean {
            //if length of set and reset arrays are same its not current state else its current state  
            if (stateData && stateData.set && stateData.reset) {
                return stateData.set.length != stateData.reset.length;
            } else {
                return false;
            }
        }

        getCurrentStateSetDate(labelData: XRLabelChange): string {
            //sorting label set array in descending order based on version 
            labelData.set.sort((a, b) => b.version - a.version);
            let currentStateSetDate = new Date(labelData.set[0].dateUser).toISOString().slice(0, 10);
            return currentStateSetDate;
        }

        getItemCurrentState(labels: XRLabelChange[]): CurrentStateData {

            let stateData: XRLabelChange;
            let currentState: string;
            let currentStateData: CurrentStateData = {
                currentState: "",
                currentStateSetDate: ""
            };

            //get closed state data
            currentState = "CLOSED"
            stateData = this.getStateData(labels, currentState);

            if (this.isItemCurrentState(stateData)) {

                currentStateData.currentState = currentState;
                currentStateData.currentStateSetDate = this.getCurrentStateSetDate(stateData);
                return currentStateData;
            }

            //get checked state data
            currentState = "CHECKED"
            stateData = this.getStateData(labels, currentState);

            if (this.isItemCurrentState(stateData)) {
                currentStateData.currentState = currentState;
                currentStateData.currentStateSetDate = this.getCurrentStateSetDate(stateData);
                return currentStateData;
            }

            //get wait state data
            currentState = "WAIT"
            stateData = this.getStateData(labels, currentState);

            if (this.isItemCurrentState(stateData)) {
                currentStateData.currentState = currentState;
                currentStateData.currentStateSetDate = this.getCurrentStateSetDate(stateData);
                return currentStateData;
            }

            //get open state data
            currentState = "OPEN"
            stateData = this.getStateData(labels, currentState);

            if (this.isItemCurrentState(stateData)) {
                currentStateData.currentState = currentState;
                currentStateData.currentStateSetDate = this.getCurrentStateSetDate(stateData);
                return currentStateData;
            }
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
                            <div class="bigChart">
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
                                <div id="CapaStatusTimeSeriesChart"></div>
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