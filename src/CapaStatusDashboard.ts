/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace CapaStatusDashboard {
    export class CapaStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "CSD",
                title: "CAPA Status Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new CapaStatusDashboardControl(options.control);
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
            return "0.0.1";
        }
    }

    // Data we will use for display
    interface LabelStateDaysCount {
        label: string;
        days: number;
    }

    
    interface LabelStateDaysCountData {
        id: string;
        labels: LabelStateDaysCount[];
        currentState: string;
        currentStateSetDate: string;
    }

    interface ByCategoryLabelStatesDaysCountData {
        category: string;
        LabelStateDaysCountDetails: LabelStateDaysCountData[];
        itemStateCountChartData: any[];
        leastStatusSetDate: string;
    }

    interface CurrentStateData {
        currentState: string;
        currentStateSetDate: string;
    }



    class CapaStatusDashboardControl extends BaseControl {

        currentCat:string = "";
        ByCategoryLabelStatesDaysCountDetails: ByCategoryLabelStatesDaysCountData[] = [];
        labelHistoryData: XRLabelEntry[] = [];
        labelHistoryDataFilteredByDate: XRLabelEntry[] = [];




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
            let spinningWait = ml.UI.getSpinningWait("Loading");
            $("#waiting", that._root).append(spinningWait);


             //Initiating date range selection section
            // let fromDate = $("#fromdate", that._root);
            // let toDate = $("#todate", that._root);
            // let goButton = $("#gobutton", that._root);
            
            // let dateControl = $('<div class="baseControl">');

            // let bc = $("#datesection").appendTo(dateControl);
            // let p = $("<p>").appendTo(bc);
            // $('<span class="">From </span>').appendTo(p);
            // let fromDate = $("<input type='text' class='form-control redlineDates'>").appendTo(p);
            // $('<span class=""> to </span>').appendTo(p);
            // let toDate = $("<input type='text' class='form-control redlineDates'>").appendTo(p);
            // let goButton = $('<button style="margin-left: 12px" type="button" class="btn btn-success">Compare</button>').appendTo(p);

            // fromDate.datetimepicker({format:ml.UI.DateTime.getSimpleDateTimeFormatMoment()});
            // toDate.datetimepicker({
            //     defaultDate: new Date(),
            //     useCurrent: false, //Important! 
            //     format:ml.UI.DateTime.getSimpleDateTimeFormatMoment()
            // });
            // ml.UI.setEnabled( goButton, fromDate.data("DateTimePicker").date() &&  toDate.data("DateTimePicker").date() );

            // fromDate.on("dp.change", function (e:any) {
            //     toDate.data("DateTimePicker").minDate(e.date);
            //     ml.UI.setEnabled( goButton, fromDate.data("DateTimePicker").date() &&  toDate.data("DateTimePicker").date() );
            // });
            // toDate.on("dp.change", function (e:any) {
            //     fromDate.data("DateTimePicker").maxDate(e.date);
            //     ml.UI.setEnabled( goButton, fromDate.data("DateTimePicker").date() &&  toDate.data("DateTimePicker").date() );
            // });
    
            // goButton.click( function() {
            //     console.log("fromdate:" + fromDate.data("DateTimePicker").date());
            //     console.log("todate:" + toDate.data("DateTimePicker").date());
            // });


            $('#gobutton').click(function(){
        
                // console.log("fromdate:"+$('#fromdate').val());
                // console.log("todate:"+$('#todate').val());

                let fromDateSelected = $('#fromdate').val();
                let toDateSelected = $('#todate').val();

                that.renderDataByDateRanges(fromDateSelected, toDateSelected);
                
            });


            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.labelHistoryData = result;
                this.renderResult(result);
            }).then(() => {
                //Let's remove the spinning wait
                spinningWait.remove();
            });
        }

        renderDataByDateRanges(fromDateVal: any, toDateVal: any){

            const fromDate = new Date(fromDateVal);
            const toDate = new Date(toDateVal);
            let labelHistoryFilteredData : XRLabelEntry[] = [];
            
            this.labelHistoryData.forEach(
                (labelHistoryRecord) => {
                    let labelHistoryData = {...labelHistoryRecord};
                    labelHistoryData.labels.forEach(
                        (labelStatusHistoryrecord) => {
                            //let labelStatusSetData = {...labelStatusHistoryrecord.set};
                            let labelStatusFilteredSetData = labelStatusHistoryrecord.set.filter(statusSetRecord => {
                                let setDate = new Date(statusSetRecord.dateUser);
                                return (fromDate <= setDate && setDate <=toDate);
                            });
                            

                            //let labelStatusReSetData = {...labelStatusHistoryrecord.reset};
                            let labelStatusFilteredReSetData = labelStatusHistoryrecord.reset.filter(statusReSetRecord => {
                                let reSetDate = new Date(statusReSetRecord.dateUser);
                                return (fromDate <= reSetDate && reSetDate <=toDate);
                            });
                            

                            if(labelStatusFilteredReSetData.length > 0 || labelStatusFilteredSetData.length > 0){
                                labelStatusHistoryrecord.set = labelStatusFilteredSetData;
                                labelStatusHistoryrecord.reset = labelStatusFilteredReSetData;
                                labelHistoryFilteredData.push(labelHistoryData);
                            }
                            
                        }
                    );
                }
            );
            
            this.labelHistoryDataFilteredByDate = labelHistoryFilteredData;
            this.renderResult(this.labelHistoryDataFilteredByDate);

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

            let categories =  IC.getCategories();
            let index = 0 ;
    
            categories.forEach(cat => {
                
                if( ml.LabelTools.getLabelDefinitions([cat]).length > 0)
                {
                    let item = $(`<li class="cat" data-cat="${cat}"><a href="javascript:void(0)">${cat}</a></li>`).click(function(){
                        that.renderCategoryWiseData(cat);
                    });
                    $(".dropdown-menu",select).append(item);
                    if( index == 0)
                    {
                      $("#selectedCat").text(cat);
                    }
                    index ++;
    
                }           
             });

            //Table filter
            $("#CapaStatusDashboarInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#itemCapaStatusDashboardList tbody tr").show();
            
                $("#itemCapaStatusDashboardList tbody tr").each(function (index, elem) {
                if(($(elem).text().toLowerCase().indexOf(value) == -1))
                {
                        $(elem).hide();
                }
                });
            });

        }

        public renderCategoryWiseData(cat: string) {

            // console.log("selected cat:"+cat);

            if (cat == undefined) {
                return;
            }
            if( cat =="")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;   
            
            $("#selectedCat", this._root).text(cat);


            // const LabelStateDaysCountDetails: LabelStateDaysCountData[] = []; 
            // for (const ByCategoryData of this.ByCategoryLabelStatesDaysCountDetails ) {
                
            //     if(this.currentCat == ByCategoryData.category){
            //         LabelStateDaysCountDetails = ByCategoryData.LabelStateDaysCountDetails;
            //         break;
            //     }
            // }

            let LabelStateDaysCountDetails = this.ByCategoryLabelStatesDaysCountDetails
                                               .find(({ category }) => category === this.currentCat);
            

            let labelStateDaysDetailsData = JSON.parse(JSON.stringify(LabelStateDaysCountDetails.LabelStateDaysCountDetails));
            let labelStateTotalCountData = JSON.parse(JSON.stringify(LabelStateDaysCountDetails.itemStateCountChartData));                                  
            this.renderTable(labelStateDaysDetailsData);
            this.renderStatusCountChart(labelStateTotalCountData);
            this.renderStatusTimeSeriesChart(labelStateDaysDetailsData,LabelStateDaysCountDetails.leastStatusSetDate);
        }

        private currentFilter = "";
        filterByLabel(filter:any)
        {
            this.currentFilter = filter.type;
            if( filter.type == "")
            {
                //Show all
                $("#itemCapaStatusDashboardList tbody tr").show();
                
            }
            else
            {  
                $("#itemCapaStatusDashboardList tbody tr").hide();
                $("#itemCapaStatusDashboardList tbody tr."+filter.type).show();
            }
        

        }

        private renderTable(LabelStateDaysCountDetails: LabelStateDaysCountData[]){

            var table = $("#itemCapaStatusDashboardList");
            $(".addedItem", table).remove();
                
            LabelStateDaysCountDetails.forEach(
                (labelData) => {
                    let clonedTemplate = $("#itemCapaStatusDashboardList .template", this._root).clone();
                    //Remove the template and hidden classes 
                    clonedTemplate.removeClass("template").removeClass("hidden");
                    let classAttr = "addedItem" + " " + labelData.currentState;
                    clonedTemplate.attr("class", classAttr);
                    // clonedTemplate.attr("class", "addedItem");
                    // clonedTemplate.attr("class", labelData.currentState);
                    $(".title", clonedTemplate).text(labelData.id + "!");

                    $(".currentstate", clonedTemplate).text(labelData.currentState);

                    labelData.labels.forEach(
                        (label) => {
                            switch (label.label) {
                                case 'OPEN':
                                    $(".opencontent", clonedTemplate).text(label.days);
                                    break;
                                case 'WAIT':
                                    $(".waitcontent", clonedTemplate).text(label.days);
                                    break;
                                case 'CHECKED':
                                    $(".checkedcontent", clonedTemplate).text(label.days);
                                    break;
                                case 'CLOSED':
                                    $(".closedcontent", clonedTemplate).text(label.days);
                                    break;
                            }
                        }
                    );

                    clonedTemplate.appendTo($("#itemCapaStatusDashboardList tbody", this._root));
                }
            );


            $("table#itemCapaStatusDashboardList").highlightReferences();
            $("table#itemCapaStatusDashboardList").tablesorter();

            this.filterByLabel({type:""});
               
        }


        private renderStatusCountChart(itemsStateCountChartData: any[]){
            let that = this;
            $("#CapaStatusCountChart div").remove();

            $("#CapaStatusCountChart").append("<div id='statecountgraph'>");

            let params:c3.ChartConfiguration = {
                bindto: '#statecountgraph',
                size: {
                    width: 350,
                },
                data: {
                    columns: itemsStateCountChartData,
                    type :  "donut",
                    onclick: function (d , i) { 
                        setTimeout(()=>{
                          that.filterByLabel({ type: d.id});
                        },100);
                    }
                },
                donut: {
                    label: {
                        format: function (value, ratio, id) {
                            return (value);
                        }
                    },
                },
                legend: {
                
                    position:'inset',
                    inset: {
                        
                        anchor: "top-right" 
                    },
                
                },
                tooltip: {
                    format: {
                        value: function (value:any, ratio:any, id:any, index:any) { return value; }
                    }
                }  
            };

            let renderedChart = c3.generate(params);

            $("#CapaStatusCountChart svg").click(function(){   
                that.filterByLabel({type:""})
            });
            return;
        }


        private prepareCurrentMonthCategories(month, year, _start){
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

                let _s = new Date(year, month, start+1).toJSON().slice(0,10);
                let _e = new Date(year, month, end+1).toJSON().slice(0,10);
                
                weeks.push({start: _s, end: _e});
                categories.push("Week"+ weekIndex + "(" + _s + " to " + _e + ")");
                weekIndex += 1;
                start = end + 1;
                end = end + 7;
                end = start === 1 && end === 8 ? 1 : end;
                if (end > numDays) {
                    end = numDays;
                }
            }
        
            let currentMonthCategoryData = {
                categories : categories,
                weeks : weeks
            };
            
            return currentMonthCategoryData;
        }

        private prepareCurrentWeekCategories(){
            let currentDate = new Date(); 
            let currentWeek = [];

            for (let i = 1; i <= 7; i++) {
                let dateOfWeekDay = currentDate.getDate() - currentDate.getDay() + i ;
                let formattedDate = new Date(currentDate.setDate(dateOfWeekDay)).toISOString().slice(0, 10);
                currentWeek.push(formattedDate);
            }
            return currentWeek;
        }

        private getMonthNames(){
            const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
                                "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

            return monthNames;              
        }

        private prepareThreeMonthCategories(month, year){

            let monthNames = this.getMonthNames();

            let threeMonthsCategoryData = [monthNames[month -2] + " " + year, 
                                           monthNames[month - 1] + " " + year, 
                                           monthNames[month] + " " + year];
            
            return threeMonthsCategoryData;
        }

        private prepareSixMonthCategories(month, year){

            let monthNames = this.getMonthNames();

            let sixMonthsCategoryData = [monthNames[month - 5] + " " + year, 
                                         monthNames[month - 4] + " " + year, 
                                         monthNames[month - 3] + " " + year,
                                         monthNames[month - 2] + " " + year, 
                                         monthNames[month - 1] + " " + year, 
                                         monthNames[month] + " " + year];
            
            return sixMonthsCategoryData;
        }

        private prepareYtdCategories(month, year){

            let monthNames = this.getMonthNames();
            let ytdCategoryData = [];

            for (let i = 0; i <= month; i++) {
                ytdCategoryData.push(monthNames[i] + " " + year);
            }
            
            return ytdCategoryData;
        }

        private prepareMoreThanYearCategories(year,leastStatusSetDate){
            let leastStatusSetYear = new Date(leastStatusSetDate).getFullYear();
            let moreThanYearCategoryData = [];

            while(leastStatusSetYear !== year){
                moreThanYearCategoryData.push(leastStatusSetYear);
                leastStatusSetYear +=1;
            }

            moreThanYearCategoryData.push(year);

            return moreThanYearCategoryData;

        }

        private prepareInitialColumns(categoiesLength){

            let emptyInitials = Array(categoiesLength).fill(0);

            let initialColumns =  [
                ['OPEN', ...emptyInitials],
                ['WAIT', ...emptyInitials],
                ['CHECKED', ...emptyInitials],
                ['CLOSED', ...emptyInitials]
            ];

            return initialColumns;

        }

        private prepareCurrentWeekColumnData(currentStatus,currentStausSetDate,categoriesData,columnsData){
            
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.forEach((categoryData,index)=>{
                if(currentStatusSetDate <= new Date(categoryData)){
                    columnsData[statusColumnIndex][index+1] += 1;
                } 
            });
        }

        private prepareCurrentMonthColumnData(currentStatus,currentStausSetDate,categoriesData,columnsData){
            
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.weeks.forEach((categoryData,index)=>{
                if(currentStatusSetDate <= new Date(categoryData.start) || currentStatusSetDate <= new Date(categoryData.end)){
                    columnsData[statusColumnIndex][index+1] += 1;
                } 
            });
        }

        private prepareMonthWiseColumnData(currentStatus,currentStausSetDate,categoriesData,columnsData){
            let monthNames = this.getMonthNames();
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(monthNames[currentStatusSetDate.getMonth()] + " " + currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData,index)=>{
                if(formattedCurrentStatusSetDate <= new Date(categoryData)){
                    columnsData[statusColumnIndex][index+1] += 1;
                } 
            });
        }

        private prepareMoreThanYearColumnData(currentStatus,currentStausSetDate,categoriesData,columnsData){
            
            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            let formattedCurrentStatusSetDate = new Date(currentStatusSetDate.getFullYear());
            categoriesData.forEach((categoryData,index)=>{
                if(formattedCurrentStatusSetDate <= new Date(categoryData)){
                    columnsData[statusColumnIndex][index+1] += 1;
                } 
            });
        }


        private renderStatusTimeSeriesChart(LabelStateDaysCountDetails: LabelStateDaysCountData[], leastStatusSetDate: string){

            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();


            //prepare current week categories
            let currentWeekCategoryData = this.prepareCurrentWeekCategories();

            //prepare current month categories
            let currentMonthCategoryData = this.prepareCurrentMonthCategories(currentMonth,currentYear,'monday');

            //prepare 3 month categories
            let threeMonthsCategoryData = this.prepareThreeMonthCategories(currentMonth, currentYear);
            
            //prepare 6 month categories
            let sixMonthsCategoryData = this.prepareSixMonthCategories(currentMonth, currentYear);
            
            //prepare YTD categories
            let ytdCategoryData = this.prepareYtdCategories(currentMonth, currentYear);
            
            //prepare >year categories
            let moreThanYearCategoryData = this.prepareMoreThanYearCategories(currentYear, leastStatusSetDate);
            
            //prepare intial current week columns
            let currentWeekColumnsData = this.prepareInitialColumns(currentWeekCategoryData.length);
            //prepare intial current month columns
            let currentMonthColumnsData = this.prepareInitialColumns(currentMonthCategoryData.categories.length);
            //prepare intial 3 month columns
            let threeMonthsColumnsData = this.prepareInitialColumns(threeMonthsCategoryData.length);
            //prepare intial 6 month columns
            let sixMonthsColumnsData = this.prepareInitialColumns(sixMonthsCategoryData.length);
            //prepare intial YTD columns
            let ytdColumnsData = this.prepareInitialColumns(ytdCategoryData.length);
            //prepare intial >year columns
            let moreThanYearColumnsData = this.prepareInitialColumns(moreThanYearCategoryData.length);

            LabelStateDaysCountDetails.forEach(
                (labelHistoryRecord) => {
                   //prepare current week columns
                   this.prepareCurrentWeekColumnData(labelHistoryRecord.currentState,
                                                     labelHistoryRecord.currentStateSetDate,
                                                     currentWeekCategoryData,
                                                     currentWeekColumnsData);
                   
                   //prepare current month columns    
                   this.prepareCurrentMonthColumnData(labelHistoryRecord.currentState,
                    labelHistoryRecord.currentStateSetDate,
                    currentMonthCategoryData,
                    currentMonthColumnsData);

                   //prepare three month columns    
                   this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                    labelHistoryRecord.currentStateSetDate,
                    threeMonthsCategoryData,
                    threeMonthsColumnsData);
                    
                   //prepare six month columns    
                   this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                    labelHistoryRecord.currentStateSetDate,
                    sixMonthsCategoryData,
                    sixMonthsColumnsData);
                    
                   //prepare ytd columns    
                   this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                    labelHistoryRecord.currentStateSetDate,
                    ytdCategoryData,
                    ytdColumnsData);

                   //prepare intial >year columns 
                   this.prepareMoreThanYearColumnData(labelHistoryRecord.currentState,
                    labelHistoryRecord.currentStateSetDate,
                    moreThanYearCategoryData,
                    moreThanYearColumnsData);
            });

            //prepare template
             
            // let timeSeriesChartparams:c3.ChartConfiguration = {
            //     bindto: '#stateTimeSeriesGraph',
            //     size: {
            //         width: 350,
            //     },
            //     data: {
            //         columns: itemsStateCountChartData,
            //         type :  "donut",
            //         onclick: function (d , i) { 
            //             setTimeout(()=>{
            //               that.filterByLabel({ type: d.id});
            //             },100);
            //         }
            //     },
            //     donut: {
            //         label: {
            //             format: function (value, ratio, id) {
            //                 return (value);
            //             }
            //         },
            //     },
            //     legend: {
                
            //         position:'inset',
            //         inset: {
                        
            //             anchor: "top-right" 
            //         },
                
            //     },
            //     tooltip: {
            //         format: {
            //             value: function (value:any, ratio:any, id:any, index:any) { return value; }
            //         }
            //     }  
            // };
           
            let timeSeriesChartparams:c3.ChartConfiguration = {
                bindto: '#stateTimeSeriesGraph',
                size: {
                    width: 500,
                },
                data: {
                    //columns: currentWeekColumnsData,
                    //columns: currentMonthColumnsData,
                    //columns: threeMonthsColumnsData,
                    columns: sixMonthsColumnsData,
                    type: 'bar',
                    groups: [
                        ['OPEN', 'WAIT','CHECKED', 'CLOSED']
                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        //categories: currentWeekCategoryData
                        //categories: currentMonthCategoryData.categories
                        //categories: threeMonthsCategoryData
                        categories: sixMonthsCategoryData
                    },
                    y: {
                        show: false
                    }
                }
            };

            //prepare chart config and render
            $("#CapaStatusTimeSeriesChart div").remove();

            $("#CapaStatusTimeSeriesChart").append("<div id='stateTimeSeriesGraph'>");

            let renderedChart = c3.generate(timeSeriesChartparams);
        }

    
        private renderResult(result: XRLabelEntry[]) {


            this.ByCategoryLabelStatesDaysCountDetails= extractLabelStatusDays(result);

            this.renderCategoryWiseData("");

        }

        // <div class="baseControl">
        // <p>
        // <span class="">From </span>
        // <input id="fromdate" type='text' class='form-control redlineDates'>
        // <span class=""> to </span>
        // <input id="todate" type='text' class='form-control redlineDates'>
        // <button id="gobutton" style="margin-left: 12px" type="button" class="btn btn-success">Go</button>
        // </p>
        // </div>

        // <div id="datesection"></div>

        // HTML template
        ExampleHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        <style>
        .chart {
            min-height: 350px;
            cursor:pointer;
            display: flex;
        }
        .timeserieschart {
            min-height: 350px;
            cursor:pointer;
            display: flex;
        }
        .chartcontainer{
            display: flex;
        }
        </style>
        <div class="row" id="waiting" class=""></div>
            <div class="panel-body" id="CapaStatusDashboardPanel">
                <div id="">   
                    <div class="panel panel-default">
                    <div class="baseControl">
                    <p>
                    <span class="">From </span>
                    <input id="fromdate" type='date' class='form-control redlineDates'>
                    <span class=""> to </span>
                    <input id="todate" type='date' class='form-control redlineDates'>
                    <button id="gobutton" style="margin-left: 12px" type="button" class="btn btn-success">Go</button>
                    </p>
                    </div>
                    <div class="panel-heading">
                        <h3 class="panel-title" id="">Capa Status Overview</h3>
                    </div>
                    <div class="panel-body chartcontainer">
                        <div id="CapaStatusCountChart" class="chart"></div>
                        <div id="CapaStatusTimeSeriesChart" class="chart"></div>
                    </div>
               </div>
            </div>
            <div>
                <div class="row doNotCopy">
                    <div class="col-lg-3 ">
                        <h3 id="LabelDashboardTableHeader">Items list</h3>
                    </div>
                    <div class=" col-lg-7">
                    </div>
                    <div class=" col-lg-2">
                    <input type="text" id="CapaStatusDashboarInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                    </div>
                </div>
                <table id="itemCapaStatusDashboardList" class="table table-condensed table-borderless table-hover">
                <thead>
                    <tr>
                        <th> Item</th>
                        <th> Curernt State</th>
                        <th> Open</th>
                        <th> Wait</th>
                        <th> Checked</th>
                        <th> Closed</th>
                    </tr>
                </thead>
                <tbody>
                        <tr class="template hidden">
                            <td class="title" >MyITEM : my title  </td>
                            <td class="currentstate" ></td>
                            <td class="opencontent" ></td>
                            <td class="waitcontent" ></td>
                            <td class="checkedcontent" ></td>
                            <td class="closedcontent" ></td>
                        </tr>
                    </tbody>
                </table>
         </div>
        </div>
        `
    }

    /**
    * Get the given state data from item data
    * @param labelData Label data to process
    * @param state which sate data to fetch from item data
    * @return state data
    * @private
    */
     function getStateData(labels: XRLabelChange[], state: string): XRLabelChange {

        let stateData: XRLabelChange = labels.find(({ label }) => label === state);

        return stateData;
     }

    /**
    * Check given state is items current state 
    * @param labelData Label data to check
    * @return boolean 
    * @private
    */
    function isItemCurrentState(stateData: XRLabelChange): boolean {
        //if length of set and reset arrays are same its not current state else its current state  
        if(stateData && stateData.set && stateData.reset){
           return stateData.set.length != stateData.reset.length;
        }else{
            return false;
        }
     }

    /**
    * Get the current state set date from item data
    * @param labelData Label data to check
    * @return current state set date string
    * @private
    */
    function getCurrentStateSetDate(labelData: XRLabelChange): string {
       //sorting label set array in descending order based on version 
       labelData.set.sort((a, b) => b.version - a.version);
       return labelData.set[0].dateUser;
     }

    /**
    * Get the current state of an item
    * @param labelData Label data to process
    * @return state of item
    * @private
    */
    function getItemCurrentState(labels: XRLabelChange[]): CurrentStateData {
        
        let stateData : XRLabelChange;
        let currentState : string;
        let currentStateData : CurrentStateData = {
            currentState: "",
            currentStateSetDate: ""
        };

        //get closed state data
        currentState =  "CLOSED"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get checked state data
        currentState =  "CHECKED"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get wait state data
        currentState =  "WAIT"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get open state data
        currentState =  "OPEN"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }
     }


    /**
    * Extract the number of days each label state was in
    * @param labels The labels to process
    * @return A set of items and their labels with number of days each label state was in
    * @private
    */
    function extractLabelStatusDays(labels: XRLabelEntry[]): ByCategoryLabelStatesDaysCountData[] {

        let ByCategoryLabelStatesDaysCountDetails: ByCategoryLabelStatesDaysCountData[] = [];

        let categories =  IC.getCategories();
        let index = 0 ;

        categories.forEach(cat => {
            let ByCategoryLabelStatesDaysCountData: ByCategoryLabelStatesDaysCountData = {
                category: cat,
                LabelStateDaysCountDetails: [],
                itemStateCountChartData: [['OPEN',0],['WAIT',0],['CHECKED',0],['CLOSED',0]],
                leastStatusSetDate: new Date().toISOString().slice(0, 10)
            };
            
            ByCategoryLabelStatesDaysCountDetails.push(ByCategoryLabelStatesDaysCountData)
         });


        //let LabelStateDaysCountDetails: LabelStateDaysCountData[] = [];
        for (const item of labels) {

            let itemCurrentSateData : CurrentStateData = getItemCurrentState(item.labels);

            let LabelStateDaysCountData: LabelStateDaysCountData = {
                id: item.itemRef,
                labels: [],
                currentState: itemCurrentSateData.currentState,
                currentStateSetDate: itemCurrentSateData.currentStateSetDate
            };

            for (const label of item.labels) {

                //sorting set array in ascending order based on version
                label.set.sort((a, b) => a.version - b.version);

                //sorting reset array in ascending order based on version
                label.reset.sort((a, b) => a.version - b.version);

                const labelstateDaysCount = label.set.reduce((accumulator, currentValue, currentIndex, set) => {
                    let stateDays: number;
                    if (label.reset[currentIndex]) {
                        const setDate = new Date(currentValue.dateUser);
                        const resetDate = new Date(label.reset[currentIndex].dateUser);

                        let time_difference = resetDate.getTime() - setDate.getTime();

                        //calculate days difference by dividing total milliseconds in a day  
                        let days_difference = time_difference / (1000 * 60 * 60 * 24);

                        stateDays = Math.floor(days_difference);
                    } else {
                        const setDate = new Date(currentValue.dateUser);
                        const resetDate = new Date();

                        let time_difference = resetDate.getTime() - setDate.getTime();

                        //calculate days difference by dividing total milliseconds in a day  
                        let days_difference = time_difference / (1000 * 60 * 60 * 24);

                        stateDays = Math.floor(days_difference);
                    }

                    return accumulator + stateDays;

                }, 0);

                let LabelStateDays: LabelStateDaysCount = {
                    label: label.label,
                    days: labelstateDaysCount
                }


                LabelStateDaysCountData.labels.push(LabelStateDays);
            }
            
            for (const ByCategoryData of ByCategoryLabelStatesDaysCountDetails ) {
                  
                let itemCategory = item.itemRef.substring(0,item.itemRef.indexOf('-'));
                
                if(itemCategory == ByCategoryData.category){
                    if(new Date(itemCurrentSateData.currentStateSetDate) < new Date(ByCategoryData.leastStatusSetDate)){
                        ByCategoryData.leastStatusSetDate = itemCurrentSateData.currentStateSetDate;
                    }
                    ByCategoryData.LabelStateDaysCountDetails.push(LabelStateDaysCountData);
                    for (const chartItem of ByCategoryData.itemStateCountChartData) {
                        if(chartItem[0] == itemCurrentSateData.currentState){
                            chartItem[1] += 1;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        return ByCategoryLabelStatesDaysCountDetails;
    }

}

// Register the plugin
$(function () {
    plugins.register(new CapaStatusDashboard.CapaStatusDashboard());
});
