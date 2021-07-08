/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace CapaStatusDashboard {
    export class CapaStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "CSO",
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

        currentCat: string = "";
        ByCategoryLabelStatesDaysCountDetails: ByCategoryLabelStatesDaysCountData[] = [];
        labelHistoryData: XRLabelEntry[] = [];
        labelHistoryDataFilteredByDate: XRLabelEntry[] = [];
        charts: c3.ChartAPI[] = [];

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
            let spinningWait = ml.UI.getSpinningWait("Loading");
            $("#waiting", that._root).append(spinningWait);


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

                that.highlighWeekRangeOption();

                that.renderDataByDateRanges(fromDateSelected, toDateSelected);

            });


            $('#weekRange').click(function () {

                if (that.currentTimeRangeSelected !== "week") {
                    $('#weekRange').removeClass("timerangenormal");
                    $('#weekRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "week";
                    that.renderStatusTimeSeriesChart(that.currentWeekColumnsData, that.currentWeekCategoryData);
                }

            });

            $('#monthRange').click(function () {

                if (that.currentTimeRangeSelected !== "month") {
                    $('#monthRange').removeClass("timerangenormal");
                    $('#monthRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "month";
                    that.renderStatusTimeSeriesChart(that.currentMonthColumnsData, that.currentMonthCategoryData.categories);
                }

            });

            $('#threeMonthsRange').click(function () {

                if (that.currentTimeRangeSelected !== "threeMonths") {
                    $('#threeMonthsRange').removeClass("timerangenormal");
                    $('#threeMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "threeMonths";
                    that.renderStatusTimeSeriesChart(that.threeMonthsColumnsData, that.threeMonthsCategoryData);
                }

            });

            
            $('#sixMonthsRange').click(function () {

                if (that.currentTimeRangeSelected !== "sixMonths") {
                    $('#sixMonthsRange').removeClass("timerangenormal");
                    $('#sixMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "sixMonths";
                    that.renderStatusTimeSeriesChart(that.sixMonthsColumnsData, that.sixMonthsCategoryData);
                }

            });


            $('#twelveMonthsRange').click(function () {

                if (that.currentTimeRangeSelected !== "twelveMonths") {
                    $('#twelveMonthsRange').removeClass("timerangenormal");
                    $('#twelveMonthsRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "twelveMonths";
                    that.renderStatusTimeSeriesChart(that.twelveMonthsColumnsData, that.twelveMonthsCategoryData);
                }

            });


            $('#ytdRange').click(function () {

                if (that.currentTimeRangeSelected !== "ytd") {
                    $('#ytdRange').removeClass("timerangenormal");
                    $('#ytdRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "ytd";
                    that.renderStatusTimeSeriesChart(that.ytdColumnsData, that.ytdCategoryData);
                }

            });

            $('#moreThanYearRange').click(function () {

                if (that.currentTimeRangeSelected !== "moreThanYear") {
                    $('#moreThanYearRange').removeClass("timerangenormal");
                    $('#moreThanYearRange').addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = "moreThanYear";
                    that.renderStatusTimeSeriesChart(that.moreThanYearColumnsData, that.moreThanYearCategoryData);
                }

            });

            setTimeout(o => that.installCopyButtons("CAPA Status Overview"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.labelHistoryData = result;
                this.renderResult(result);
            }).then(() => {
                //Let's remove the spinning wait
                spinningWait.remove();
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

        //if any of set and reset dates of labels falls between date ranges selected consider the item
        renderDataByDateRanges(fromDateVal: any, toDateVal: any) {

            const fromDate = new Date(fromDateVal);
            const toDate = new Date(toDateVal);
            let labelHistoryFilteredData: XRLabelEntry[] = [];

            this.labelHistoryData.forEach(
                (labelHistoryRecord) => {
                    let labelHistoryData_ = { ...labelHistoryRecord };
                    let isItemfallsinRange = false;
                    labelHistoryData_.labels.forEach(
                        (labelStatusHistoryrecord) => {
                            //let labelStatusSetData = {...labelStatusHistoryrecord.set};
                            let labelStatusFilteredSetData = labelStatusHistoryrecord.set.filter(statusSetRecord => {
                                let setDate = new Date(new Date(statusSetRecord.dateUser).toISOString().slice(0, 10));
                                return (fromDate <= setDate && setDate <= toDate);
                            });


                            //let labelStatusReSetData = {...labelStatusHistoryrecord.reset};
                            let labelStatusFilteredReSetData = labelStatusHistoryrecord.reset.filter(statusReSetRecord => {
                                let reSetDate = new Date(new Date(statusReSetRecord.dateUser).toISOString().slice(0, 10));
                                return (fromDate <= reSetDate && reSetDate <= toDate);
                            });

                            if (labelStatusFilteredReSetData.length > 0 || labelStatusFilteredSetData.length > 0) {
                                isItemfallsinRange = true;
                            }


                        }
                    );

                    if (isItemfallsinRange) {
                        labelHistoryFilteredData.push(labelHistoryData_);
                    }

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

            let categories = IC.getCategories();
            let index = 0;

            categories.forEach(cat => {

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
            $("#CapaStatusDashboarInputFilter").on("keyup", function (e) {
                let inputValue = $(e.target).val().toString();
                let value = inputValue.toLowerCase();
                $("#itemCapaStatusDashboardList tbody tr").show();

                $("#itemCapaStatusDashboardList tbody tr").each(function (index, elem) {
                    if (($(elem).text().toLowerCase().indexOf(value) == -1)) {
                        $(elem).hide();
                    }
                });
            });

        }

        public renderCategoryWiseData(cat: string) {

            if (cat == undefined) {
                return;
            }
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

            this.highlighWeekRangeOption();

            let LabelStateDaysCountDetails = this.ByCategoryLabelStatesDaysCountDetails
                .find(({ category }) => category === this.currentCat);


            let labelStateDaysDetailsData = JSON.parse(JSON.stringify(LabelStateDaysCountDetails.LabelStateDaysCountDetails));
            let labelStateTotalCountData = JSON.parse(JSON.stringify(LabelStateDaysCountDetails.itemStateCountChartData));
            this.renderTable(labelStateDaysDetailsData);
            this.renderStatusCountChart(labelStateTotalCountData);

            this.prepareStatusTimeSeriesChart(labelStateDaysDetailsData, LabelStateDaysCountDetails.leastStatusSetDate);

            this.renderStatusTimeSeriesChart(this.currentWeekColumnsData, this.currentWeekCategoryData);
        }

        private currentFilter = "";
        filterByLabel(filter: any) {
            this.currentFilter = filter.type;
            let stateClass = "";
            if (filter.type == "") {
                //Show all
                $("#itemCapaStatusDashboardList tbody tr").show();

            }
            else {
                stateClass = filter.type;
                $("#itemCapaStatusDashboardList tbody tr").hide();
                $("#itemCapaStatusDashboardList tbody tr." + stateClass).show();
            }


        }

        private renderTable(LabelStateDaysCountDetails: LabelStateDaysCountData[]) {

            var table = $("#itemCapaStatusDashboardList");
            $(".addedItem", table).remove();

            LabelStateDaysCountDetails.forEach(
                (labelData) => {
                    let clonedTemplate = $("#itemCapaStatusDashboardList .template", this._root).clone();
                    let stateClass = labelData.currentState;
                    //Remove the template and hidden classes 
                    clonedTemplate.removeClass("template").removeClass("hidden");
                    let classAttr = "addedItem" + " " + stateClass;
                    clonedTemplate.attr("class", classAttr);
                    $(".title", clonedTemplate).text(labelData.id + "!");
                    $(".title", clonedTemplate).data("ref", labelData.id + "!");

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

            this.filterByLabel({ type: "" });

        }



        private renderStatusCountChart(itemsStateCountChartData: any[]) {
            let that = this;
            $("#CapaStatusCountChart div").remove();

            $("#CapaStatusCountChart").append("<div id='statecountgraph'>");

            let params: c3.ChartConfiguration = {
                bindto: '#statecountgraph',
                size: {
                    width: 350,
                },
                data: {
                    columns: itemsStateCountChartData,
                    type: "donut",
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                color: {
                    pattern: ['#d62728', '#ff7f0e', '#1f77b4', '#2ca02c']
                },
                donut: {
                    label: {
                        format: function (value, ratio, id) {
                            return (value);
                        }
                    },
                },
                legend: {

                    position: 'inset',
                    inset: {

                        anchor: "top-right"
                    },

                },
                tooltip: {
                    format: {
                        value: function (value: any, ratio: any, id: any, index: any) { return value; }
                    }
                }
            };

            let renderedChart = c3.generate(params);
            that.charts.push(renderedChart);

            $("#CapaStatusCountChart svg").click(function () {
                that.filterByLabel({ type: "" })
            });
            return;
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

            let renderedChart = c3.generate(timeSeriesChartparams);
            this.charts.push(renderedChart);

        }

        private prepareStatusTimeSeriesChart(LabelStateDaysCountDetails: LabelStateDaysCountData[], leastStatusSetDate: string) {

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

            LabelStateDaysCountDetails.forEach(
                (labelHistoryRecord) => {
                    //prepare current week columns
                    this.prepareCurrentWeekColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.currentWeekCategoryData,
                        this.currentWeekColumnsData);

                    //prepare current month columns    
                    this.prepareCurrentMonthColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.currentMonthCategoryData,
                        this.currentMonthColumnsData);

                    //prepare three month columns    
                    this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.threeMonthsCategoryData,
                        this.threeMonthsColumnsData);

                    //prepare six month columns    
                    this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.sixMonthsCategoryData,
                        this.sixMonthsColumnsData);

                    //prepare twelve month columns    
                    this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.twelveMonthsCategoryData,
                        this.twelveMonthsColumnsData);    

                    //prepare ytd columns    
                    this.prepareMonthWiseColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.ytdCategoryData,
                        this.ytdColumnsData);

                    //prepare intial >year columns 
                    this.prepareMoreThanYearColumnData(labelHistoryRecord.currentState,
                        labelHistoryRecord.currentStateSetDate,
                        this.moreThanYearCategoryData,
                        this.moreThanYearColumnsData);
                });

        }

        private installCopyButtons(title: string) {
            let that = this;
            let saveSize = [];
            ml.UI.copyBuffer($("#CapaStatusChartTitle"), "copy  to clipboard", $(".panel-body-v-scroll"), this._root, (copied: JQuery) => {

                ml.UI.fixC3ForCopy(copied);
                $(".title", copied).each((i, item) => { $(item).text($(item).data("ref")) });
                $(".hidden", copied).remove();
                $("#dateRangeFilter", copied).remove();
                $("#timeSeriesChartRangeFilter", copied).remove();
                $("#CapaStatusDashboarInputFilter", copied).remove();
                $("#CapaStatusChartTitle", copied).html("<h1>" + title + " for " + that.currentCat + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "<br/>");

            }, "", () => {
                $("#CapaStatusDashboardPanel svg").each((i, item,) => { saveSize.push($(item).width()) });
                that.charts.forEach((chart) => { chart.resize({ width: 590 }) });
            }, () => {
                let i = 0;
                that.charts.forEach((chart) => { chart.resize({ width: saveSize[i] }); i++; });
            });
        }


        private renderResult(result: XRLabelEntry[]) {


            this.ByCategoryLabelStatesDaysCountDetails = extractLabelStatusDays(result);

            this.renderCategoryWiseData("");

        }


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
        .timerangenormal{
            background-color: rgb(255, 255, 255); 
            color: rgb(0, 128, 0);
        }
        .timerangeselected{
            background-color: #337ab7;
            color: #f6fbfd;
        }
        </style>
        <div class="row" id="waiting" class=""></div>
            <div class="panel-body" id="CapaStatusDashboardPanel">
                <div id="">   
                    <div class="panel panel-default">
                    <div class="baseControl" id="dateRangeFilter">
                    <p>
                    <span class="">Create/Modified from </span>
                    <input id="fromdate" type='text' class='form-control redlineDates'>
                    <span class=""> Create/Modified to </span>
                    <input id="todate" type='text' class='form-control redlineDates'>
                    <button id="gobutton" style="margin-left: 12px" type="button" class="btn btn-success">Go</button>
                    </p>
                    </div>
                    <div class="panel-heading">
                        <h3 class="panel-title" id="CapaStatusChartTitle">Capa Status Overview</h3>
                    </div>
                    <div class="panel-body chartcontainer">
                        <div class="LabelDashboardTitleForCopy"></div>
                        <div id="CapaStatusCountChart" class="chart"></div>
                        <div>
                        <div id="timeSeriesChartRangeFilter" style="display:flex;margin-left: 110px">
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
                        </div>
                        <div id="CapaStatusTimeSeriesChart" class="chart"></div>
                        <div>
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
                        <th> Currernt State</th>
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
        if (stateData && stateData.set && stateData.reset) {
            return stateData.set.length != stateData.reset.length;
        } else {
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
        let currentStateSetDate = new Date(labelData.set[0].dateUser).toISOString().slice(0, 10);
        return currentStateSetDate;
    }

    /**
    * Get the current state of an item
    * @param labelData Label data to process
    * @return state of item
    * @private
    */
    function getItemCurrentState(labels: XRLabelChange[]): CurrentStateData {

        let stateData: XRLabelChange;
        let currentState: string;
        let currentStateData: CurrentStateData = {
            currentState: "",
            currentStateSetDate: ""
        };

        //get closed state data
        currentState = "CLOSED"
        stateData = getStateData(labels, currentState);

        if (isItemCurrentState(stateData)) {

            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get checked state data
        currentState = "CHECKED"
        stateData = getStateData(labels, currentState);

        if (isItemCurrentState(stateData)) {
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get wait state data
        currentState = "WAIT"
        stateData = getStateData(labels, currentState);

        if (isItemCurrentState(stateData)) {
            currentStateData.currentState = currentState;
            currentStateData.currentStateSetDate = getCurrentStateSetDate(stateData);
            return currentStateData;
        }

        //get open state data
        currentState = "OPEN"
        stateData = getStateData(labels, currentState);

        if (isItemCurrentState(stateData)) {
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

        let categories = IC.getCategories();
        let index = 0;

        categories.forEach(cat => {
            let ByCategoryLabelStatesDaysCountData: ByCategoryLabelStatesDaysCountData = {
                category: cat,
                LabelStateDaysCountDetails: [],
                itemStateCountChartData: [['OPEN', 0], ['WAIT', 0], ['CHECKED', 0], ['CLOSED', 0]],
                leastStatusSetDate: new Date().toISOString().slice(0, 10)
            };

            ByCategoryLabelStatesDaysCountDetails.push(ByCategoryLabelStatesDaysCountData)
        });


        //let LabelStateDaysCountDetails: LabelStateDaysCountData[] = [];
        for (const item of labels) {

            let itemCurrentSateData: CurrentStateData = getItemCurrentState(item.labels);
            let itemClosedStateDaysCount;
            let itemCheckedStateDaysCount;
            let itemCheckedAndClosedStateDaysCount;
            let itemCheckedSateLabelIndex;
            let itemSateLabelIndex = 0;



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

                if (label.label === "CHECKED") {
                    itemCheckedStateDaysCount = labelstateDaysCount;
                    itemCheckedSateLabelIndex = itemSateLabelIndex;
                } else if (label.label === "CLOSED") {
                    itemClosedStateDaysCount = labelstateDaysCount;
                }

                LabelStateDaysCountData.labels.push(LabelStateDays);
                itemSateLabelIndex++;
            }

            //check if current state is checked but not closed
            if (itemCheckedStateDaysCount && itemClosedStateDaysCount) {
                itemCheckedAndClosedStateDaysCount = itemCheckedStateDaysCount - itemClosedStateDaysCount;

                if (itemCheckedAndClosedStateDaysCount < 0 || itemCheckedAndClosedStateDaysCount == 0) {
                    LabelStateDaysCountData.labels[itemCheckedSateLabelIndex].days = 0;
                } else {
                    LabelStateDaysCountData.labels[itemCheckedSateLabelIndex].days = itemCheckedAndClosedStateDaysCount;
                }
            }

            for (const ByCategoryData of ByCategoryLabelStatesDaysCountDetails) {

                let itemCategory = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if (itemCategory == ByCategoryData.category) {
                    if (new Date(itemCurrentSateData.currentStateSetDate) < new Date(ByCategoryData.leastStatusSetDate)) {
                        ByCategoryData.leastStatusSetDate = itemCurrentSateData.currentStateSetDate;
                    }
                    ByCategoryData.LabelStateDaysCountDetails.push(LabelStateDaysCountData);
                    for (const chartItem of ByCategoryData.itemStateCountChartData) {
                        if (chartItem[0] == itemCurrentSateData.currentState) {
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
