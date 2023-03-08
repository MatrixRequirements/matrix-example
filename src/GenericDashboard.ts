// <VERSION_INFO_PLACEHOLDER>

/// <reference path="api/Matrix.Labels.ts" />
/// <reference path="commons/Commons.RenderTemplate.ts" />
/// <reference path="commons/Commons.GenericFunctionalities.ts" />
/// <reference path="commons/Commons.DateRangeFunctionalities.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace GenericDashboard {

    interface ISourceAttribute{
        value: any;
        name: string;
        
    }

    interface IDataSource{
        sourceAtrributes: ISourceAttribute[];
        type: string;
        
    }
    interface IFilterData{
        functionality:"groupBy"| "statusOverdue" | "groupByState" | "closure" | "groupByStack"| "dateRangeComapre"| "table"| "tracker";
    }
    // These will be replaced by the build
    const PLUGIN_NAME = "<PLUGIN_NAME_PLACEHOLDER>";
    const PLUGIN_VERSION = "<PLUGIN_VERSION_PLACEHOLDER>";

    export class GenericDashboard implements IPlugin {

        pluginsConfig: any;

        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {

            this.pluginsConfig = IC.getSettingJSON("PluginsConfig");

            if (!this.pluginsConfig) return [];

            let pages: IProjectPageParam[] = [];

            this.pluginsConfig.plugins.forEach(pluginConfig => {

                pages.push({
                    id: pluginConfig.id,
                    title: pluginConfig.title,
                    folder: pluginConfig.folder,
                    order: pluginConfig.order,
                    icon: pluginConfig.icon,
                    usesFilters: true,
                    render: (options: IPluginPanelOptions) => {
                        const control = new GenericDashboardControl(options.control);
                        control.initPage(pluginConfig);
                    },
                });

            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return PLUGIN_NAME;
        }

        getPluginVersion(): string {
            return PLUGIN_VERSION;
        }
    }

    class GenericDashboardControl extends BaseControl {

        pluginTableId: string = "";

        // This should have a strong type. We should not use any
        allChartsMap = new Map();

        // This should have a strong type. We should not use any
        dateFilterEnablerMap = new Map();

        currentTimeRangeSelected: string = "";

        currentCat: string = "";

        currentFilter: string = "";
        // Shouldn't start with capital letter
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        labelHistoryData: XRLabelEntry[] = [];

        dateRangeData : dateRangeData = {
            currentWeekCategoryData: [],
            currentMonthCategoryData: {},
            threeMonthsCategoryData: [],
            sixMonthsCategoryData: [],
            twelveMonthsCategoryData: [],
            ytdCategoryData: [],
            moreThanYearCategoryData: [],
            quarterlyCYCategoryData: {},
            quarterlyFYCategoryData: {},
            currentWeekColumnsData: [],
            currentMonthColumnsData: [],
            threeMonthsColumnsData: [],
            sixMonthsColumnsData: [],
            twelveMonthsColumnsData: [],
            ytdColumnsData: [],
            moreThanYearColumnsData: [],
            quarterlyCYColumnsData: [],
            quarterlyFYColumnsData: []
        };

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        initPage(pluginConfig: any) {
            let that = this;
            that.renderHTML(pluginConfig);
            that.initiateByCategoryLabelData(pluginConfig);

            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Please wait...");
            $("#waiting", that._root).append(spinningWait);

            $(".spinningWait", that._root).show();

            that.dateFilterEnablerMap.forEach((values, keys) => {
                that.initiateDateFilter(keys);
            });

            setTimeout(o => that.installCopyButtons(pluginConfig.title), 10);

            that.initiateDataSource(pluginConfig);

        }

        instanceOfXRTrimNeedleItem(data: any): data is XRTrimNeedleItem {
            return 'fieldVal' in data;
        }

        instanceOfXRLabelEntry(data: any): data is XRLabelEntry {
            return 'itemRef' in data;
        }

        async initiateDataSource(pluginConfig: any) {
            let that = this;

            // This should have a strong type. We should not use any
            let dataSources:IDataSource[] = pluginConfig.dataSources;
            // We should gracefully handle the case where there are no data sources
            if (!dataSources) {
                ml.UI.showError("No datasources", "No data sources defined for this plugin");
                return;
            }

            // We should not use any
            let dataSourcePromises = [];

            // We should not use any
            let dashboardPluginSources: any[] = [];

            // Use for...of instead of forEach
            for(let dataSourceConfig of dataSources) {
                if (dataSourceConfig.type == "Needles") {
                    let needleSourceCategory;
                    let needleSourceFieldId;
                    // Use for...of instead of forEach
                    dataSourceConfig.sourceAtrributes.forEach(sourceAttribute => {
                        if (sourceAttribute.name == "category") {
                            needleSourceCategory = sourceAttribute.value;
                        } else if (sourceAttribute.name == "fieldId") {
                            needleSourceFieldId = sourceAttribute.value;
                        }
                    });
                    if (needleSourceCategory && needleSourceFieldId) {
                        dataSourcePromises.push(Matrix.Labels.getNeedlesByCategoryAndFiledId(needleSourceCategory,
                            needleSourceFieldId));
                    }
                } else if (dataSourceConfig.type == "Labels") {
                    dataSourcePromises.push(Matrix.Labels.projectLabelHistory());
                }
            }

            
           let dataSourcePromisesResults = await Promise.all(dataSourcePromises);
            try{
                for( let dataSourcePromiseResult of dataSourcePromisesResults){

                        if (dataSourcePromiseResult.length > 0 && that.instanceOfXRTrimNeedleItem(dataSourcePromiseResult[0])) {
                            dashboardPluginSources.push({
                                "type": "Needles",
                                "source": dataSourcePromiseResult
                            })
                        } else if (dataSourcePromiseResult.length > 0 && that.instanceOfXRLabelEntry(dataSourcePromiseResult[0])) {
                            that.labelHistoryData = dataSourcePromiseResult;
                            dashboardPluginSources.push({
                                "type": "Labels",
                                "source": dataSourcePromiseResult
                            })
                        }

                    }
                    that.processFunctionalitiesData(dashboardPluginSources, pluginConfig);
                    that.renderCategoryWiseData(that.currentCat);
                    $(".spinningWait", that._root).hide();
                }
                catch(error){
                    //Report the error to the user
                    ml.UI.showError("Error", error);
                    //Remove the spinning wait
                    $(".spinningWait", that._root).hide();
                }
        }

        renderHTML(pluginConfig: any) {
            let that = this;

            const renderTemplateData: any = Commons.RenderTemplate.preparePluginHtmlTemplate(pluginConfig);
            that.pluginTableId = renderTemplateData.pluginTableId;
            that.allChartsMap = renderTemplateData.allChartsMap;

            that.dateFilterEnablerMap = renderTemplateData.dateFilterEnablerMap;
            that.currentTimeRangeSelected = renderTemplateData.currentTimeRangeSelected;

            renderTemplateData.dateRangeData.forEach(dateRangeItem => {
                that.initiateDateRangeActions(dateRangeItem.range,dateRangeItem.contentId);
            });


            //Load the template
            that._root.html(renderTemplateData.genericHtmlDom);

            //Add the page title
            ml.UI.getPageTitle(pluginConfig.title).prependTo(that._root);

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

            let pluginCategories = pluginConfig.categories;
            let index = 0;

            // Use for...of instead of forEach
            pluginCategories.forEach(cat => {

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
            if (that.pluginTableId !== "") {
                //Probably more clear if you use backticks and ${} instead of concatenation
                $("#" + that.pluginTableId + "InputFilter").on("keyup", function (e) {
                    let inputValue = $(e.target).val().toString();
                    let value = inputValue.toLowerCase();
                    $("#" + that.pluginTableId + "Table tbody tr").show();

                    $("#" + that.pluginTableId + "Table tbody tr").each(function (index, elem) {
                        if (($(elem).text().toLowerCase().indexOf(value) == -1)) {
                            $(elem).hide();
                        }
                    });
                });
            }

        }


        initiateByCategoryLabelData(pluginConfig: any) {
            let that = this;
            Commons.GenericFunctionalities.initiateByCategoryLabelData(pluginConfig, that.ByCategoryLabelDetails);

            let categoriesFunctionalities = pluginConfig.categoriesFunctionalities;
            // Use for...of instead of forEach + strong type
            categoriesFunctionalities.forEach(category => {

                 // Use for...of instead of forEach + strong type
                category.functionalities.forEach(functionality => {
                    if(functionality.type === 'dateRangeComapre'){
                        functionality.dateRanges.forEach(dateRange => {
                            that.initiateDateRangeActions(dateRange,functionality.id);
                        });
                    }
                });
            });
            
        }


        //copy button functionality
        installCopyButtons(title: string) {
            let that = this;

            let savedWidth = 0;

            that.allChartsMap.forEach((value, key) => {

                ml.UI.copyBuffer($(`#${key}-ChartTitle`, this._root), "copy  to clipboard", $(`.panel-body:has(#${key}-Chart)`), this._root, (copied: JQuery) => {
                    console.log("start");
                    $(`#${key}-date-filter`, copied).remove();
                    let title_ = $(`#${key}-ChartTitle`, this._root).text();
                    $(".copyTitle", copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);

                    ml.UI.fixC3ForCopy(copied);

                    console.log("end");

                }, "", () => {
                    savedWidth = $(`#${key}-Chart svg`, this._root).width();
                    let chartObject = that.allChartsMap.get(key);
                    chartObject.resize({ width: 590 });

                }, () => {
                    let chartObject = that.allChartsMap.get(key);
                    chartObject.resize({ width: savedWidth });
                });

            });



            ml.UI.copyBuffer($(`#${that.pluginTableId}TableHeader`, this._root), "copy list to clipboard", $("#currentStatusList", this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();

                var filter = $(`#${that.pluginTableId}InputFilter`, this._root).val();

                $(".hidden", copied).remove();

                $("#id", copied).each((i, item) => { $(item).text($(item).data("ref") + "!") });

                $(`#${that.pluginTableId}InputFilter`, copied).remove();

                $(`#${that.pluginTableId}-date-filter`, copied).remove();

                $(`#${that.pluginTableId}TitleForCopy`, copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });
        }

        //date filter functionalities
        initiateDateFilter(dateFilterId) {

            let that = this;
            let enableDateFilter;
            //Probably more clear if you use backticks and ${} instead of concatenation
            $("#" + dateFilterId + "-date-filter").hide();

            $("#" + dateFilterId + "-date-filter-icon").click(function () {

                //This should be strongly typed
                let dateFileterData = that.dateFilterEnablerMap.get(dateFilterId);
                enableDateFilter = !dateFileterData.dateFilterEnabled;
                dateFileterData.dateFilterEnabled = enableDateFilter;
                that.dateFilterEnablerMap.set(dateFilterId, dateFileterData);

                if (enableDateFilter) {
                    $("#" + dateFilterId + "-date-filter").show();
                } else {
                    $("#" + dateFilterId + "-date-filter").hide();

                    let byCategoryLabelData = that.ByCategoryLabelDetails
                        .find(({ category }) => category === that.currentCat);

                    switch (dateFileterData.functionality) {
                        case 'groupBy':
                            if (byCategoryLabelData.groupByData.length > 0) {
                                byCategoryLabelData.groupByData.forEach(groupByObject => {
                                    if (dateFilterId == groupByObject.id) {
                                        that.renderGroupByChart(groupByObject.labelsDesc,groupByObject.groupWiseData,groupByObject.id);
                                    }
                                });
                            }
                            break;
                        case 'groupByState':
                            if (byCategoryLabelData.groupByStateData.length > 0) {
                                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                                    if (dateFilterId == groupByStateObject.id) {
                                        that.renderGroupByStateChart(groupByStateObject.stateWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                                    }
                                });
                            }
                            break;
                        case 'statusOverdue':
                            if (byCategoryLabelData.groupByStateOverdueData.length > 0) {
                                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverdueObject => {
                                    if (dateFilterId == groupByStateOverdueObject.id) {
                                        that.renderGroupByStateChart(groupByStateOverdueObject.stateWiseData,groupByStateOverdueObject.stateColors,groupByStateOverdueObject.id);
                                    }
                                });
                            }
                            break;
                        case 'groupByStack':
                            if (byCategoryLabelData.groupByStackData.length > 0) {
                                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                                    if (dateFilterId == groupByStackObject.id) {
                                        that.renderGroupByStackChart(groupByStackObject.groupByStackData,groupByStackObject.groupByCodesDesc,groupByStackObject.categoryDesc,groupByStackObject.groupByCodeColors,groupByStackObject.id);
                                    }
                                });
                            }
                            break;
                        case 'avg':
                            if (byCategoryLabelData.avgData.length > 0) {
                                byCategoryLabelData.avgData.forEach(avgObject => {
                                    if (dateFilterId == avgObject.id) {
                                        that.renderAvgChart(avgObject.stateDesc,avgObject.statusWiseAvgData,avgObject.id);
                                    }
                                });
                            }
                            break;
                        case 'closure':
                            if (byCategoryLabelData.closureData.length > 0) {
                                byCategoryLabelData.closureData.forEach(closureObject => {
                                    if (dateFilterId == closureObject.id) {
                                        that.renderClosureChart(closureObject.closedItemsData,closureObject.closureTimeData,closureObject.id);
                                    }
                                });
                            }
                            break;
                        case 'tracker':
                            if (byCategoryLabelData.trackerData.length > 0) {
                                byCategoryLabelData.trackerData.forEach(trackerObject => {
                                    if (dateFilterId == trackerObject.id) {
                                        that.renderTrackerChart(trackerObject.stateDesc,trackerObject.stateTrackerData,trackerObject.stateColors,trackerObject.id);
                                    }
                                });
                            }
                            break;
                        case 'table':
                            if (byCategoryLabelData.itemCurrentStateValues.length > 0) {
                                that.renderPluginTable(byCategoryLabelData.itemCurrentStateTableHeaders,byCategoryLabelData.itemCurrentStateValues);
                            }
                            break;
                    }
                }
            });

            //Initiating date range selection section
            let fromDate = $("#" + dateFilterId + "-fromdate", that._root);
            let toDate = $("#" + dateFilterId + "-todate", that._root);
            let goButton = $("#" + dateFilterId + "-gobutton", that._root);

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
            //Use backticks instead of concatenation
            $("#" + dateFilterId + "-gobutton").click(function () {

                let fromDateSelected = fromDate.data("DateTimePicker").date();
                let toDateSelected = toDate.data("DateTimePicker").date();
                let dateFileterData:IFilterData = that.dateFilterEnablerMap.get(dateFilterId);

                let byCategoryLabelData = that.ByCategoryLabelDetails
                    .find(({ category }) => category === that.currentCat);

                switch (dateFileterData.functionality) {
                    case 'groupBy':
                        that.renderGroupByChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'groupByState':
                        that.renderGroupByStateChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'statusOverdue':
                        that.renderGroupByStateOverdueChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'groupByStack':
                        that.renderGroupByStackChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'closure':
                        that.renderClosureChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'tracker':
                        that.renderTrackerChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    //This is a good example of why you should use strong typing and restrict the possible values of a variable. dateRangeComapre vs dateRangeCompare: 
                    case 'dateRangeComapre':
                        that.renderDateRangeComapreDataByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'table':
                        that.renderPluginTableByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;
                };
            });

        }

        initiateDateRangeActions(range,contentId){
            let that = this;

            $("#"+range+"Range").click(function () {

                if(range == "dateCompare"){
                    $("#"+contentId+"-date-filter").show();
                }else{
                    $("#"+contentId+"-date-filter").hide();
                }
                
                if (that.currentTimeRangeSelected !== range) {
                    $("#"+range+"Range").removeClass("timerangenormal");
                    $("#"+range+"Range").addClass("timerangeselected");

                    $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                    $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                    that.currentTimeRangeSelected = range;
                    
                    if(range !== "dateCompare"){
                        that.renderDateRangeByAction(range,contentId);
                    }
                }

            });

        }
        // Should be strongly typed
        renderDateRangeByAction(range,contentId){
            let that = this;
            let columnData;
            let categoryData;
            // Same here, use strong typing to restrict the possible values of range (Or use enum)
            switch (range) {
                case 'week':
                    columnData = that.dateRangeData.currentWeekColumnsData;
                    categoryData = that.dateRangeData.currentWeekCategoryData;
                    break;
                case 'month':
                    columnData = that.dateRangeData.currentMonthColumnsData;
                    categoryData = that.dateRangeData.currentMonthCategoryData.categories;
                    break;
                case 'threeMonths':
                    columnData = that.dateRangeData.threeMonthsColumnsData;
                    categoryData = that.dateRangeData.threeMonthsCategoryData;
                    break;    
                case 'sixMonths':
                    columnData = that.dateRangeData.sixMonthsColumnsData;
                    categoryData = that.dateRangeData.sixMonthsCategoryData;
                    break;    
                case 'twelveMonths':
                    columnData = that.dateRangeData.twelveMonthsColumnsData;
                    categoryData = that.dateRangeData.twelveMonthsCategoryData;
                    break; 
                case 'ytd':
                    columnData = that.dateRangeData.ytdColumnsData;
                    categoryData = that.dateRangeData.ytdCategoryData;
                    break; 
                case 'moreThanYear':
                    columnData = that.dateRangeData.moreThanYearColumnsData;
                    categoryData = that.dateRangeData.moreThanYearCategoryData;
                    break;  
                case 'quarterlyCY':
                    columnData = that.dateRangeData.quarterlyCYColumnsData;
                    categoryData = that.dateRangeData.quarterlyCYCategoryData.categories;
                    break;  
                case 'quarterlyFY':
                    columnData = that.dateRangeData.quarterlyFYColumnsData;
                    categoryData = that.dateRangeData.quarterlyFYCategoryData.categories;
                    break;                   
            };
            // No capital letters in variable names as first letter please 
            let ByCategoryLabelData = this.ByCategoryLabelDetails
                .find(({ category }) => category === this.currentCat);

            if(ByCategoryLabelData.dateRangeCompareData.length > 0){
                ByCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                    if(dateRangeCompareObject.id == contentId){
                        that.renderDateRangeChart(columnData,categoryData,dateRangeCompareObject.labelsDesc,
                            dateRangeCompareObject.labelColors,dateRangeCompareObject.id); 
                    }   
                });
            }
        }

        renderCategoryWiseData(cat: string) {
            let that = this;

            if (cat == undefined) {
                return;
            }
            if (cat == ""){
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();
            }

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

            // No capital letters in variable names as first letter please. Also, use strong typing.
            let ByCategoryLabelData = this.ByCategoryLabelDetails
                .find(({ category }) => category === this.currentCat);

            if (ByCategoryLabelData.groupByData && ByCategoryLabelData.groupByData.length > 0) {
                ByCategoryLabelData.groupByData.forEach(groupByObject => {
                    that.renderGroupByChart(groupByObject.labelsDesc, groupByObject.groupWiseData, groupByObject.id);
                });
            }

            if (ByCategoryLabelData.groupByOperandsData && ByCategoryLabelData.groupByOperandsData.length > 0) {
                ByCategoryLabelData.groupByOperandsData.forEach(groupByOperandsObject => {
                    that.renderGroupByChart(groupByOperandsObject.labelsDesc, groupByOperandsObject.groupWiseData, groupByOperandsObject.id);
                });
            }

            if (ByCategoryLabelData.groupByStateData && ByCategoryLabelData.groupByStateData.length > 0) {
                ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                    if (groupByStateObject.type == "groupByGapAnalysis") {
                        that.renderGroupByStatePercentChart(groupByStateObject.stateWiseData, groupByStateObject.stateColors, groupByStateObject.id);
                    } else {
                        that.renderGroupByStateChart(groupByStateObject.stateWiseData, groupByStateObject.stateColors, groupByStateObject.id);
                    }
                });
            }

            if (ByCategoryLabelData.groupByStateOverdueData && ByCategoryLabelData.groupByStateOverdueData.length > 0) {
                ByCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverDueObject => {
                    that.renderGroupByStateChart(groupByStateOverDueObject.stateWiseData, groupByStateOverDueObject.stateColors, groupByStateOverDueObject.id);
                });
            }

            if (ByCategoryLabelData.groupByStackData && ByCategoryLabelData.groupByStackData.length > 0) {
                ByCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                    that.renderGroupByStackChart(groupByStackObject.groupByStackData, groupByStackObject.groupByCodesDesc, groupByStackObject.categoryDesc, groupByStackObject.groupByCodeColors, groupByStackObject.id);
                });
            }

            if (ByCategoryLabelData.avgData && ByCategoryLabelData.avgData.length > 0) {
                ByCategoryLabelData.avgData.forEach(avgObject => {
                    that.renderAvgChart(avgObject.stateDesc, avgObject.statusWiseAvgData, avgObject.id);
                });
            }

            if (ByCategoryLabelData.closureData && ByCategoryLabelData.closureData.length > 0) {
                ByCategoryLabelData.closureData.forEach(closureObject => {
                    that.renderClosureChart(closureObject.closedItemsData, closureObject.closureTimeData, closureObject.id);
                });
            }

            if (ByCategoryLabelData.trackerData && ByCategoryLabelData.trackerData.length > 0) {
                ByCategoryLabelData.trackerData.forEach(trackerObject => {
                    that.renderTrackerChart(trackerObject.stateDesc, trackerObject.stateTrackerData, trackerObject.stateColors, trackerObject.id);
                });
            }

            if (ByCategoryLabelData.dateRangeCompareData && ByCategoryLabelData.dateRangeCompareData.length > 0) {
                ByCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {

                    Commons.DateRangeFunctionalities.prepareDateRangeCompareChartData(
                        dateRangeCompareObject.currentLabelData,
                        dateRangeCompareObject.labelsDesc,
                        dateRangeCompareObject.dateRanges,
                        dateRangeCompareObject.leastStatusSetDate,
                        that.dateRangeData);

                    if (that.currentTimeRangeSelected !== dateRangeCompareObject.defaultDateRange) {
                        $('#' + dateRangeCompareObject.defaultDateRange + 'Range').removeClass("timerangenormal");
                        $('#' + dateRangeCompareObject.defaultDateRange + 'Range').addClass("timerangeselected");

                        $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                        $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");

                        that.currentTimeRangeSelected = dateRangeCompareObject.defaultDateRange;
                    }

                    that.renderDateRangeChart(that.dateRangeData.currentWeekColumnsData, that.dateRangeData.currentWeekCategoryData, dateRangeCompareObject.labelsDesc,
                        dateRangeCompareObject.labelColors, dateRangeCompareObject.id);
                });
            }

            if (ByCategoryLabelData.itemCurrentStateValues && ByCategoryLabelData.itemCurrentStateValues.length > 0) {
                that.renderPluginTable(ByCategoryLabelData.itemCurrentStateTableHeaders, ByCategoryLabelData.itemCurrentStateValues);
            }

        }
        //Don't use any as a type. Use the actual type.
        filterByLabel(filter: any) {
            this.currentFilter = filter.type;
            let filterDataClass = "";
            if (filter.type == "") {
                //Show all
                $(`#${this.pluginTableId}Table tbody tr`).show();
            }
            else {
                filterDataClass = filter.type.split(' ').join('-').replaceAll('&', '-');
                $(`#${this.pluginTableId}Table tbody tr`).hide();
                $(`#${this.pluginTableId}Table tbody tr.${filterDataClass}`).show();
            }
        }

        //Don't use any as a type. Use the actual type.
        renderDateRangeComapreDataByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {
            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let formattedFromDate = new Date(fromDate.setDate(fromDate.getDate() + 1)).toISOString().slice(0, 10);
            let formattedToDate = new Date(toDate.setDate(toDate.getDate() + 1)).toISOString().slice(0, 10);
            
            //No any please.
            let daterangeCompareLabels = [];
            let dateFilterChartCategoryData = [];
            let dateFilterChartColumnsData: any = [];

            if (byCategoryLabelData.dateRangeCompareData.length > 0) {
                byCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                    if (dateRangeCompareObject.id == groupId) {
                        dateFilterChartCategoryData = dateRangeCompareObject.labelsDesc;
                        daterangeCompareLabels = dateRangeCompareObject.labels;
                        let daterangeCompareLabelInitials = Array(dateRangeCompareObject.labels.length).fill(0);
                        dateFilterChartColumnsData = [
                            ['From:' + formattedFromDate, ...daterangeCompareLabelInitials],
                            ['To:' + formattedToDate, ...daterangeCompareLabelInitials]
                        ];
                    }
                });
            }
            // use for...of instead of forEach and strongly type the variable
            this.labelHistoryData.forEach(
                (labelHistoryRecord) => {
                    let itemCategory = labelHistoryRecord.itemRef.substring(0, labelHistoryRecord.itemRef.indexOf('-'));
                    if (itemCategory == this.currentCat) {
                        let labelHistoryData_ = { ...labelHistoryRecord };
                        let fromDateLabels: XRLabelChange[] = [];
                        let toDateLabels: XRLabelChange[] = [];
            
                        // use for...of instead of forEach and strongly type the variable
                        labelHistoryData_.labels.forEach(
                            (labelStatusHistoryrecord) => {
                                let fromDateLabelStatusData = { ...labelStatusHistoryrecord };
                                let toDateLabelStatusData = { ...labelStatusHistoryrecord };

                                fromDateLabelStatusData.set = [];
                                fromDateLabelStatusData.reset = [];

                                toDateLabelStatusData.set = [];
                                toDateLabelStatusData.reset = [];

                                labelStatusHistoryrecord.set.forEach(
                                    (setDateRecord) => {
                                        let dateRecord = new Date(setDateRecord.dateIso);

                                        if (dateRecord <= fromDate) {
                                            fromDateLabelStatusData.set.push(setDateRecord);
                                        }

                                        if (dateRecord <= toDate) {
                                            toDateLabelStatusData.set.push(setDateRecord);
                                        }
                                    }
                                );

                                labelStatusHistoryrecord.reset.forEach(
                                    (resetDateRecord) => {
                                        let dateRecord = new Date(resetDateRecord.dateIso);

                                        if (dateRecord <= fromDate) {
                                            fromDateLabelStatusData.reset.push(resetDateRecord);
                                        }

                                        if (dateRecord <= toDate) {
                                            toDateLabelStatusData.reset.push(resetDateRecord);
                                        }
                                    }
                                );

                                if (fromDateLabelStatusData.set.length > 0 || fromDateLabelStatusData.reset.length > 0) {
                                    fromDateLabels.push(fromDateLabelStatusData);
                                }

                                if (toDateLabelStatusData.set.length > 0 || toDateLabelStatusData.reset.length > 0) {
                                    toDateLabels.push(toDateLabelStatusData);
                                }

                            }
                        );

                        
                        if (fromDateLabels.length > 0) {
                            fromDateLabels.forEach((fromDateLabel) => {
                                let labelIndex = daterangeCompareLabels.findIndex(labelCode => labelCode === fromDateLabel.label);

                                if (labelIndex > -1 && (fromDateLabel.reset.length !== fromDateLabel.set.length)) {
                                    dateFilterChartColumnsData[0][labelIndex + 1] += 1;
                                }
                            });
                        }

                        if (toDateLabels.length > 0) {
                            toDateLabels.forEach((toDateLabel) => {
                                let labelIndex = daterangeCompareLabels.findIndex(labelCode => labelCode === toDateLabel.label);

                                if (labelIndex > -1 && (toDateLabel.reset.length !== toDateLabel.set.length)) {
                                    dateFilterChartColumnsData[1][labelIndex + 1] += 1;
                                }
                            });
                        }
                    }
                }
            );


            this.renderDateRangeCompareChart(dateFilterChartColumnsData, dateFilterChartCategoryData, groupId);
        }

        renderDateRangeCompareChart(chartColumnsData, chartCategoryData, groupId) {
            let that = this;
            let dateRangeCompareChartParams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: chartColumnsData,
                    type: 'bar'
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
                    pattern: ['#17becf', '#9467bd']
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let dateRangeChart = c3.generate(dateRangeCompareChartParams);

            that.allChartsMap.set(groupId, dateRangeChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }


        renderDateRangeChart(chartColumnsData, chartCategoryData, groupLabels, groupColors, groupId) {
            let that = this;
            //prepare template
            let dateRangeChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: chartColumnsData,
                    type: 'bar',
                    groups: [
                        groupLabels
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
                    pattern: groupColors
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let dateRangeChart = c3.generate(dateRangeChartparams);

            that.allChartsMap.set(groupId, dateRangeChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });

        }

        renderGroupByChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.groupByData.length > 0) {
                byCategoryLabelData.groupByData.forEach(groupByObject => {

                    if (groupByObject.id == groupId) {

                        let groupWiseInitials = Array(groupByObject.labels.length).fill(0);
                        let groupWiseData = [groupByObject.groupWiseData[0], ...groupWiseInitials];

                        groupByObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if (itemCurrentStateData.currentLabelSetDate &&
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)) {
                                    let groupByLabelIndex = groupByObject.labels.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);
                                    groupWiseData[groupByLabelIndex + 1] += 1;
                                }

                            });

                        this.renderGroupByChart(groupByObject.labelsDesc, groupWiseData, groupByObject.id);
                    }
                });
            }
        }
        //Specify parameters types
        renderGroupByChart(labels, grouoWiseData, groupId) {
            let that = this;
            //prepare template "${contentConfig.id}-Chart"
            let groupByChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    x: 'x',
                    columns: [
                        ['x', ...labels],
                        grouoWiseData
                    ],
                    type: 'bar',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: labels[d.x] });
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
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let groupByChart = c3.generate(groupByChartparams);

            that.allChartsMap.set(groupId, groupByChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }
        //Specify parameters types
        renderGroupByStateChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.groupByStateData.length > 0) {
                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {

                    if (groupByStateObject.id == groupId) {
                        let statusWiseData: any = JSON.parse(JSON.stringify(groupByStateObject.stateWiseInitialData));

                        groupByStateObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if (itemCurrentStateData.currentLabelSetDate &&
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)) {
                                    let groupByStateLabelIndex = groupByStateObject.stateCodes.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);
                                    statusWiseData[groupByStateLabelIndex][1] += 1;
                                }

                            });

                        this.renderGroupByStateChart(statusWiseData, groupByStateObject.stateColors, groupByStateObject.id);

                    }
                });
            }
        }

        renderGroupByStateOverdueChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.groupByStateOverdueData.length > 0) {
                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverdueObject => {

                    if (groupByStateOverdueObject.id == groupId) {
                        let statusWiseData: any = JSON.parse(JSON.stringify(groupByStateOverdueObject.stateWiseInitialData));

                        groupByStateOverdueObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if (itemCurrentStateData.currentLabelSetDate &&
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)) {
                                    let groupByStateLabelIndex = groupByStateOverdueObject.stateCodes.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);

                                    if (itemCurrentStateData.currentLabel == groupByStateOverdueObject.openState) {
                                        let itemDueDate = groupByStateOverdueObject.OpenItemsDueDateMap.get(itemCurrentStateData.id);
                                        //check for overdue
                                        if (new Date(itemDueDate) < new Date()) {
                                            statusWiseData[groupByStateOverdueObject.stateDesc.length - 1][1] += 1;
                                        } else {
                                            statusWiseData[groupByStateLabelIndex][1] += 1;
                                        }
                                    } else {
                                        statusWiseData[groupByStateLabelIndex][1] += 1;
                                    }
                                }

                            });

                        this.renderGroupByStateChart(statusWiseData, groupByStateOverdueObject.stateColors, groupByStateOverdueObject.id);

                    }
                });
            }
        }

        renderGroupByStateChart(stateWiseData, stateColors, groupId) {
            let that = this;
            //prepare template
            let groupByStateChartParams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: stateWiseData,
                    type: 'pie',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                color: {
                    pattern: stateColors
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
                        value: function (value: any, ratio: any, id: any, index: any) { return value; }
                    }
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let groupByStateChart = c3.generate(groupByStateChartParams);

            that.allChartsMap.set(groupId, groupByStateChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderGroupByStatePercentChart(stateWiseData, stateColors, groupId) {
            let that = this;
            //prepare template
            let groupByStateChartParams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: stateWiseData,
                    type: 'pie',
                    onclick: function (d, i) {
                        setTimeout(() => {
                            that.filterByLabel({ type: d.id });
                        }, 100);
                    }
                },
                color: {
                    pattern: stateColors
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let groupByStateChart = c3.generate(groupByStateChartParams);

            that.allChartsMap.set(groupId, groupByStateChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderGroupByStackChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.groupByStackData.length > 0) {
                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {

                    if (groupByStackObject.id == groupId) {
                        let stackWiseData: any = JSON.parse(JSON.stringify(groupByStackObject.groupByStackInitialData));

                        groupByStackObject.currentLabelData.forEach((itemCurrentLabelData) => {
                            if (itemCurrentLabelData.currentgroupLabelSetDate &&
                                (itemCurrentLabelData.currentgroupLabelSetDate >= fromDate && itemCurrentLabelData.currentgroupLabelSetDate <= toDate)) {

                                let categoryLabelIndex = groupByStackObject.categoryDesc.findIndex(labelDesc => labelDesc === itemCurrentLabelData.currentCategoryLabel);

                                stackWiseData.forEach(stackGroupData => {
                                    if (stackGroupData[0] == itemCurrentLabelData.currentgroupLabel) {
                                        stackGroupData[categoryLabelIndex + 1] += 1;
                                    }
                                });
                            }
                        });

                        this.renderGroupByStackChart(stackWiseData, groupByStackObject.groupByCodesDesc, groupByStackObject.categoryDesc, groupByStackObject.groupByCodeColors, groupByStackObject.id);

                    }
                });
            }
        }

        renderGroupByStackChart(stackColumnData, stackGroupLabels, stackCategories, stackColors, groupId) {
            let that = this;
            //prepare template
            let groupByStackChartParams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: stackColumnData,
                    type: 'bar',
                    groups: [
                        stackGroupLabels
                    ]
                },
                axis: {
                    x: {
                        type: 'category',
                        categories: stackCategories
                    },
                    y: {
                        show: true
                    }
                },
                color: {
                    pattern: stackColors
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let groupByStackChart = c3.generate(groupByStackChartParams);

            that.allChartsMap.set(groupId, groupByStackChart);
        }

        renderAvgChart(states, statusWiseAvgData, groupId) {
            let that = this;
            //prepare template
            let avgChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    x: 'x',
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
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let avgChart = c3.generate(avgChartparams);

            that.allChartsMap.set(groupId, avgChart);
        }

        renderClosureChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.closureData.length > 0) {
                byCategoryLabelData.closureData.forEach(closureObject => {
                    if (closureObject.id == groupId) {

                        let closedItemsData = [];
                        let closureTimeData: any[] = [closureObject.closureTimeData[0]];

                        closureObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if (itemCurrentStateData.closedDate &&
                                    (itemCurrentStateData.closedDate >= fromDate && itemCurrentStateData.closedDate <= toDate)) {
                                    closedItemsData.push(itemCurrentStateData.id);
                                    closureTimeData.push(itemCurrentStateData.daysToClose);

                                }

                            });

                        this.renderClosureChart(closedItemsData, closureTimeData, closureObject.id);
                    }
                });
            }
        }

        renderClosureChart(closedItemsData, closureTimeData, groupId) {
            let that = this;
            //prepare template
            let closureChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    x: 'x',
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
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let closureChart = c3.generate(closureChartparams);

            that.allChartsMap.set(groupId, closureChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderTrackerChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if (byCategoryLabelData.trackerData.length > 0) {
                byCategoryLabelData.trackerData.forEach(trackerObject => {
                    if (trackerObject.id == groupId) {
                        let stateTrackerData: any[] = [['x']];

                        trackerObject.stateDesc.forEach(labelDesc => {
                            stateTrackerData.push([labelDesc]);
                        });

                        trackerObject.currentLabelData.forEach(
                            (itemCurrentStateData, itemId) => {
                                if (itemCurrentStateData.currentStateSetDate && itemCurrentStateData.currentState !== trackerObject.closedState
                                    && (itemCurrentStateData.currentStateSetDate >= fromDate && itemCurrentStateData.currentStateSetDate <= toDate)) {
                                    stateTrackerData[0].push(itemCurrentStateData.id);
                                    trackerObject.stateCodes.forEach(
                                        (trackState, stateIndex) => {
                                            let stateDays = itemCurrentStateData.itemStateDays.get(trackState);
                                            if (stateDays) {
                                                stateTrackerData[stateIndex + 1].push(stateDays);
                                            } else {
                                                stateTrackerData[stateIndex + 1].push("");
                                            }
                                        });
                                }
                            });

                        this.renderTrackerChart(trackerObject.stateDesc, stateTrackerData, trackerObject.stateColors, trackerObject.id);
                    }
                });
            }
        }

        renderTrackerChart(trackerStates, stateTrackerData, stateColors, groupId) {
            let that = this;
            //prepare template
            let trackerChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                size: {
                    height: 900
                },
                data: {
                    x: 'x',
                    columns: stateTrackerData,
                    type: 'bar',
                    groups: [
                        trackerStates
                    ],
                    order: null
                },
                color: {
                    pattern: stateColors
                },
                axis: {
                    x: {
                        type: 'category'
                    },
                    rotated: true
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let trackerChart = c3.generate(trackerChartparams);

            that.allChartsMap.set(groupId, trackerChart);
        }

        renderPluginTableByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);
            let itemCurrentStateDetailsByDateRange: ItemCurrentStateData[] = [];

            byCategoryLabelData.itemCurrentStateValues.forEach(
                (itemCurrentStateData) => {

                    if (
                        (itemCurrentStateData.InitiatedDate &&
                            (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate))
                        ||
                        (itemCurrentStateData.ClosedDate &&
                            (itemCurrentStateData.ClosedDate >= fromDate && itemCurrentStateData.ClosedDate <= toDate))
                    ) {

                        itemCurrentStateDetailsByDateRange.push(itemCurrentStateData);
                    }
                });

            this.renderPluginTable(byCategoryLabelData.itemCurrentStateTableHeaders, itemCurrentStateDetailsByDateRange);
        }

        renderPluginTable(itemCurrentStateTableHeaders: any[], itemCurrentStateValues: ItemCurrentStateData[]) {
            let that = this;

            let table = $(`#${that.pluginTableId}Table`);
            $(".addedItem", table).remove();
            $(".addedHeader", table).remove();

            let tableHeader = $('<tr />');
            tableHeader.attr("class", "addedHeader");

            itemCurrentStateTableHeaders.forEach(
                (headerLabel) => {
                    tableHeader.append('<th>' + headerLabel + '</th>');
                }
            );

            $(`#${that.pluginTableId}-TableHeader`).append(tableHeader);

            itemCurrentStateValues.forEach(
                (itemCurrentStateData) => {
                    let tableRow = $(`<tr/>`);
                    let classAttr = "addedItem";

                    itemCurrentStateData.attributes.forEach((attribute) => {
                        classAttr += " " + attribute.split(' ').join('-').replaceAll('&', '-');
                    });

                    tableRow.attr("class", classAttr);

                    let itemRowData = $("<td/>");
                    tableRow.append(itemRowData);
                    itemRowData.text(itemCurrentStateData.id + "!");
                    itemRowData.data("ref", itemCurrentStateData.id + "!");

                    itemCurrentStateData.tableValues.forEach(
                        (rowValue, rowIndex) => {
                            if (rowIndex != 0) {
                                let labelRowData = $("<td>" + rowValue + "</td>");
                                tableRow.append(labelRowData);
                            }
                        }
                    );

                    $(`#${that.pluginTableId}RowList`).append(tableRow);
                }
            );

            $(`table#${that.pluginTableId}Table`).highlightReferences();
            $(`table#${that.pluginTableId}Table`).tablesorter();

            this.filterByLabel({ type: "" });

        }


        //use strong typing for the parameters
        // functionalityDataSources should a map instead of array. That would be accessed by key instead of looping each time.
        processFunctionalitiesData(functionalityDataSources: any, pluginConfig: any) {

            let that = this;
            // No capital letters in the variable names as first letter
            for (const byCategoryLabelData of this.ByCategoryLabelDetails) {

                //process groupBy functionality
                byCategoryLabelData.groupByData.forEach(groupByObject => {
                    let groupByObjectDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByObject.dataSourceType);
                    Commons.GenericFunctionalities.processGroupByObjectData(groupByObject,
                        groupByObjectDataSource.source,
                        byCategoryLabelData.category,
                        that.dateFilterEnablerMap,
                        byCategoryLabelData.itemCurrentStateTableHeaders,
                        byCategoryLabelData.itemCurrentStateValues
                    );

                });

                //process groupBy-operands functionality
                byCategoryLabelData.groupByOperandsData.forEach(groupByOperandsObject => {
                    let groupByOperandsDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByOperandsObject.dataSourceType);
                    Commons.GenericFunctionalities.processGroupByOperandsData(groupByOperandsObject,
                        groupByOperandsDataSource.source,
                        byCategoryLabelData.category
                    );

                });

                //process groupByStack functionality
                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                    let groupByStackDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByStackObject.dataSourceType);
                    Commons.GenericFunctionalities.processGroupByStackData(groupByStackObject,
                        groupByStackDataSource.source,
                        byCategoryLabelData.category,
                        byCategoryLabelData.itemCurrentStateTableHeaders,
                        byCategoryLabelData.itemCurrentStateValues
                    );
                });

                //process groupByState functionality
                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                    let groupByStateDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByStateObject.dataSourceType);
                    if(groupByStateDataSource.type === "Labels"){
                        Commons.GenericFunctionalities.processGroupByStateData(groupByStateObject,
                            groupByStateDataSource.source,
                            byCategoryLabelData.category,
                            that.dateFilterEnablerMap,
                            byCategoryLabelData.itemCurrentStateTableHeaders,
                            byCategoryLabelData.itemCurrentStateValues
                        );
                    }else if(groupByStateDataSource.type === "Needles"){
                        Commons.GenericFunctionalities.processGroupByStateNeedleData(groupByStateObject,
                            groupByStateDataSource.source
                        );
                    }

                    if(groupByStateObject.type === "groupByGapAnalysis"){
                        that.currentCat = "QMS";
                    }
                });

                //process groupByStateOverDue functionality
                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverDueObject => {

                    let labelsDataSource: XRLabelEntry[];
                    let needlesDataSource: XRTrimNeedleItem[];

                    for (const dataSourceType of groupByStateOverDueObject.dataSources) {

                        let dataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === dataSourceType);
                        if (dataSourceType === "Labels") {
                            labelsDataSource = dataSource.source;
                        } else if (dataSourceType === "Needles") {
                            needlesDataSource = dataSource.source;
                        }

                    }

                    Commons.GenericFunctionalities.processGroupByStateOverDueData(groupByStateOverDueObject,
                        labelsDataSource,
                        needlesDataSource,
                        byCategoryLabelData.category,
                        that.dateFilterEnablerMap,
                        byCategoryLabelData.itemCurrentStateTableHeaders,
                        byCategoryLabelData.itemCurrentStateValues
                    );
                });

                //process avg functionality
                byCategoryLabelData.avgData.forEach(avgObject => {
                    let avgDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === avgObject.dataSourceType);
                    Commons.GenericFunctionalities.processAvgData(avgObject,
                        avgDataSource.source,
                        byCategoryLabelData.category
                    );
                });

                //process closure functionality
                byCategoryLabelData.closureData.forEach(closureObject => {
                    let closureDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === closureObject.dataSourceType);
                    Commons.GenericFunctionalities.processClosureData(closureObject,
                        closureDataSource.source,
                        byCategoryLabelData.category,
                        that.dateFilterEnablerMap,
                        byCategoryLabelData.itemCurrentStateTableHeaders,
                        byCategoryLabelData.itemCurrentStateValues
                    );
                });

                //process dateRangeComapre functionality
                byCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                    let dateRangeCompareDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === dateRangeCompareObject.dataSourceType);
                    Commons.GenericFunctionalities.processDateRangeCompareData(dateRangeCompareObject,
                        dateRangeCompareDataSource.source,
                        byCategoryLabelData.category
                    );
                });

                //process tracker functionality
                byCategoryLabelData.trackerData.forEach(trackerObject => {
                    let trackerDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === trackerObject.dataSourceType);
                    Commons.GenericFunctionalities.processTrackerData(trackerObject,
                        trackerDataSource.source,
                        byCategoryLabelData.category,
                        that.dateFilterEnablerMap,
                        byCategoryLabelData.itemCurrentStateTableHeaders,
                        byCategoryLabelData.itemCurrentStateValues
                    );
                });
            }
        }
    }
}

// Register the plugin
$(function () {
    plugins.register(new GenericDashboard.GenericDashboard());
});