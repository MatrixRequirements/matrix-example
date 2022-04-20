// <VERSION_INFO_PLACEHOLDER>

/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace GenericDashboard {
    // These will be replaced by the build
    const PLUGIN_NAME = "<PLUGIN_NAME_PLACEHOLDER>";
    const PLUGIN_VERSION = "<PLUGIN_VERSION_PLACEHOLDER>";

    export class GenericDashboard implements IPlugin {

        pluginsConfig: any;

        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {

            if (!IC.getSettingJSON("PluginsConfig")) return [];

            this.pluginsConfig = IC.getSettingJSON("PluginsConfig");
        
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

    interface groupByObject {
        id: string;
        renderChart: string;
        showInTable: string;
        tableHeader: string;
        labels: any[];
        labelsDesc: any[];
        groupWiseData: any[];
        currentLabelData: groupByObjectCurrentData[];
    }

    interface groupByStateObject {
        id: string;
        renderChart: string;
        showInTable: string;
        tableHeader: string;
        stateCodes: any[];
        stateDesc: any[];
        stateColors: any[];
        openState: string;
        stateWiseInitialData: any[];
        stateWiseData: any[];
        currentState: string;
        currentLabelData: groupByObjectCurrentData[];
    }

    interface groupByStackObject {
        id: string;
        renderChart: string;
        showInTable: string;
        tableHeader: string;
        categoryCodes: any[];
        categoryDesc: any[];
        groupByCodes: any[];
        groupByCodesDesc: any[];
        groupByCodeColors: any[];
        groupByStackInitialData: any[];
        groupByStackData: any[];
        currentLabelData: groupByStackCurrentData[];
    }

    interface avgObject {
        id: string;
        renderChart: string;
        stateCodes: any[];
        stateDesc: any[];
        allStateCodes: any[];
        allStateDesc: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        intialState: string;
        closedState: string;
        rejectedState: string;
        currentState: string;
        initiatedDate: Date;
        closedDate: Date;
    }

    interface closureObject {
        id: string;
        renderChart: string;
        showInTable: string;
        tableHeader: string;
        allStateCodes: any[];
        allStateDesc: any[];
        closedItemsData: any[];
        closureTimeData: any[];
        intialState: string;
        closedState: string;
        rejectedState: string; 
        currentState: string;
        initiatedDate: Date;
        closedDate: Date;
        currentLabelData: closureObjectCurrentData[];
    }

    interface dateRangeCompareObject {
        id: string;
        renderChart: string;
        showInTable: string;
        dateRanges: any[];
        defaultDateRange: string;
        labels: any[];
        labelsDesc: any[];
        labelColors: any[];
        leastStatusSetDate: Date;
        currentLabelData: groupByObjectCurrentData[];
    }

    interface trackerObject {
        id: string;
        renderChart: string;
        showInTable: string;
        stateCodes: any[];
        stateDesc: any[];
        stateColors: any[];
        allStateCodes: any[];
        allStateDesc: any[];
        stateTrackerInitialData: any[];
        stateTrackerData: any[];
        closedState: string;
        rejectedState: string;
        currentState: string;
        currentLabelData: Map<string, trackerObjectCurrentData>;
    }

    interface groupByObjectCurrentData {
        id: string;
        currentLabel: string;
        currentLabelSetDate: Date;
    }

    interface groupByStackCurrentData {
        id: string;
        currentCategoryLabel: string;
        currentgroupLabel: string;
        currentgroupLabelSetDate: Date;
    }

    interface closureObjectCurrentData {
        id: string;
        daysToClose: number;
        closedDate: Date;
    }

    interface trackerObjectCurrentData {
        id: string;
        currentState: string;
        currentStateSetDate: Date;
        itemStateDays: Map<string, Number>;
    }

    interface ItemCurrentStateData {
        id: string;
        attributes: any[];
        tableValues: any[];
        InitiatedDate: Date;
        ClosedDate: Date;
        currentState: string;
    }

    interface ByCategoryLabelData {
        category: string;
        groupByData: groupByObject[];
        groupByStateData: groupByStateObject[];
        groupByStackData: groupByStackObject[];
        groupByStateOverdueData: groupByStateObject[];
        avgData: avgObject[];
        closureData: closureObject[];
        trackerData: trackerObject[];
        dateRangeCompareData: dateRangeCompareObject[];
        itemCurrentStateTableHeaders: any[];
        itemCurrentStateValues: ItemCurrentStateData[];
    }

    class GenericDashboardControl extends BaseControl {

        labelHistoryData: XRLabelEntry[] = [];

        pluginTableId: string = "";

        currentCat: string = "";

        currentFilter: string = "";

        allChartsMap = new Map();

        dateFilterEnablerMap = new Map();

        OpenItemsDueDateMap = new Map();

        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        pluginConfig: any = {};

        isOverDueFunctionalityEnabled : boolean = false;
        overDueFunctionalityCategory : string = "";
        overDueFunctionalityFiledId : Number = 0;



        //date range functionality variables
        currentTimeRangeSelected: string = "";

        currentWeekCategoryData: any[] = [];
        currentMonthCategoryData: any = {};
        threeMonthsCategoryData: any[] = [];
        sixMonthsCategoryData: any[] = [];
        twelveMonthsCategoryData: any[] = [];
        ytdCategoryData: any[] = [];
        moreThanYearCategoryData: any[] = [];
        quarterlyCYCategoryData: any = {};
        quarterlyFYCategoryData: any = {};

        currentWeekColumnsData: any[] = [];
        currentMonthColumnsData: any[] = [];
        threeMonthsColumnsData: any[] = [];
        sixMonthsColumnsData: any[] = [];
        twelveMonthsColumnsData: any[] = [];
        ytdColumnsData: any[] = [];
        moreThanYearColumnsData: any[] = [];
        quarterlyCYColumnsData: any[] = [];
        quarterlyFYColumnsData: any[] = [];



       // pluginConfig: any = IC.getSettingJSON("MSCO");

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        initPage(pluginConfig : any) {
            let that = this;
            that.pluginConfig = pluginConfig;
            that.renderHTML();
            that.initiateByCategoryLabelData();

            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Please wait...");
            $("#waiting", that._root).append(spinningWait);
 
            $(".spinningWait", that._root).show();


            that.dateFilterEnablerMap.forEach((values,keys)=>{
                that.initiateDateFilter(keys);
            });
            
            setTimeout(o => that.installCopyButtons(that.pluginConfig.title), 10);


            if(that.isOverDueFunctionalityEnabled){
                //Get the needle data
                Matrix.Labels.getNeedlesByCategoryAndFiledId(that.overDueFunctionalityCategory,
                                                             that.overDueFunctionalityFiledId).then((result) => {
                   that.processNeedlesData(result);
                   that.getLabelsData();
                }).then(() => {
                    //Remove the spinning wait
                    $(".spinningWait",that._root).hide();
                });

            }else{
                that.getLabelsData();
            }
           
        }

        processNeedlesData(needles: XRTrimNeedleItem[]){
            
            needles.forEach((needleItem) => {
                if(needleItem.fieldVal.length > 0){
                    let itemId = needleItem.itemOrFolderRef.substring(0,needleItem.itemOrFolderRef.lastIndexOf('-'));
                    let itemDueDate = needleItem.fieldVal[0].value;
                    this.OpenItemsDueDateMap.set(itemId,itemDueDate);
                }
            });
        }

        getLabelsData() {
            let that = this;

             //Get the data and render it
             Matrix.Labels.projectLabelHistory().then((result) => {
                $(".spinningWait", that._root).hide();
                //$("#MCSONoItems", that._root).hide();
                this.labelHistoryData = result;
                that.processLabelsData(result);
                that.renderCategoryWiseData("");
            }).then(() => {
                //Let's remove the spinning wait
                $(".spinningWait",that._root).hide();
                //$("#MCSONoItems", that._root).show();
            });

        }

        renderHTML() {
            let that = this;

            //Load the template
            that._root.html(that.preparePluginHtmlTemplate());

            //Add the page title
            ml.UI.getPageTitle(that.pluginConfig.title).prependTo(that._root);

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

            let pluginCategories = that.pluginConfig.categories;
            let index = 0;

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
            if(that.pluginTableId !== ""){
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

        preparePluginHtmlTemplate() {
            let that = this;

            let genericDomStyle = "";

            let waitElementDom = `
                <div  style="margin:10px;">
                    <div class="row" id="waiting" class="spinningWait"></div>
                </div>
            `;

            let genericChartRowDom = "";

            let genericTableRowDom = "";

            if(that.pluginConfig.layoutConfig){
                let layoutConfig = that.pluginConfig.layoutConfig;
                genericDomStyle = layoutConfig.layoutDomStyle;
                if(layoutConfig.rowConfig && layoutConfig.rowConfig.length > 0){
                    let chartRowDom = "";
                    let tableRowDom = "";
                    layoutConfig.rowConfig.forEach(
                        (rowConfig) => {
                            
                            let chartColumnsDom = "";
                            let tableColumnsDom = "";

                            if(rowConfig.columnConfig && rowConfig.columnConfig.length > 0){
                                rowConfig.columnConfig.forEach(
                                    (columnConfig)=>{

                                        let contentConfig = columnConfig.contentConfig;
                                        let dateFilterIconDom = "";
                                        let dateFilterDom = "";

                                        if(contentConfig.dateFilterRequired == 'Y'){

                                            that.dateFilterEnablerMap.set(contentConfig.id,{functionality:contentConfig.functionality,dateFilterEnabled: false});

                                            dateFilterIconDom = `
                                                <i id="${contentConfig.id}-date-filter-icon" 
                                                class="far fa-calendar-alt" aria-hidden="true" style="padding-left:12px;cursor:pointer" 
                                                data-original-title="Date Filter"> </i>
                                            `;

                                            let dateFilterClass = "";

                                            if((columnConfig.contentType == "chart") || (columnConfig.contentType == "date-range-chart")){
                                                if(columnConfig.size == 12){
                                                    dateFilterClass = "dateFilterSize12";
                                                }else if(columnConfig.size == 6){
                                                    dateFilterClass = "dateFilter";
                                                }
                                            }else if(columnConfig.contentType == "table"){
                                                dateFilterClass = "tableDateFilter";
                                            }
                                            
                                            dateFilterDom = ` 
                                                <div id="${contentConfig.id}-date-filter" class="baseControl ${dateFilterClass}">
                                                    <p>
                                                        <span class="">From</span>
                                                        <input id="${contentConfig.id}-fromdate" type='text' class='date-filter-form-control filterDates'>
                                                        <span class="">To</span>
                                                        <input id="${contentConfig.id}-todate" type='text' class='date-filter-form-control filterDates'>
                                                        <button id="${contentConfig.id}-gobutton" type="button" class="date-filter-btn btn-success">Go</button>
                                                    </p>
                                                </div>
                                            `;
                                        }

                                    let chartColumnDom = "";
                                    let tableColumnDom = "";

                                    if(columnConfig.contentType == "date-range-chart"){
                                        that.allChartsMap.set(contentConfig.id,'');

                                        that.currentTimeRangeSelected = contentConfig.defaultDateRange;
                                        
                                        let dateRangeDom = "";
                                        let dateRangesDom = "";

                                        contentConfig.dateRanges.forEach((dateRange,index) => {
                                            let dateRangeDisplay = contentConfig.displayDateRanges[index];

                                            let dateRangeClass = "";

                                            if(contentConfig.defaultDateRange == dateRange){
                                                dateRangeClass = "timerangeselected";
                                            }else{
                                                dateRangeClass = "timerangenormal";
                                            }

                                            dateRangeDom = `
                                                <div class="btn-group labelTools">
                                                    <button id="${dateRange}Range" class="btn btn-default btn-xs ${dateRangeClass}">${dateRangeDisplay}</button>
                                                </div>
                                            `;

                                            dateRangesDom += dateRangeDom;

                                            that.initiateDateRangeActions(dateRange,contentConfig.id);

                                        });


                                        let dateRangesCompleteDom = `
                                            <div id="timeSeriesChartRangeFilter" class="date-range-container">
                                                ${dateRangesDom}
                                            </div>
                                        `;

                                        chartColumnDom = `
                                            <div class="col-lg-${columnConfig.size} ">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="${contentConfig.id}-ChartTitle">
                                                        ${contentConfig.title}
                                                        </h3>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class='copyTitle'> </div>
                                                        ${dateRangesCompleteDom}
                                                        ${dateFilterDom}
                                                        <div id="${contentConfig.id}-Chart" class="${contentConfig.contentClass}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;

                                    }else if(columnConfig.contentType == "chart"){
                                        that.allChartsMap.set(contentConfig.id,'');
                                        chartColumnDom = `
                                            <div class="col-lg-${columnConfig.size} ">
                                                <div class="panel panel-default">
                                                    <div class="panel-heading">
                                                        <h3 class="panel-title" id="${contentConfig.id}-ChartTitle">
                                                        ${contentConfig.title}
                                                        ${dateFilterIconDom}
                                                        </h3>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class='copyTitle'> </div>
                                                        ${dateFilterDom}
                                                        <div id="${contentConfig.id}-Chart" class="${contentConfig.contentClass}"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                     }else if(columnConfig.contentType == "table"){

                                        that.pluginTableId = contentConfig.id;

                                        tableColumnDom = `
                                            <div id="currentStatusList">
                                                <div class="row" id="${contentConfig.id}TitleForCopy"></div> 
                                                <div class="row doNotCopy ${contentConfig.id}table">
                                                    <div class="col-lg-3 ">
                                                        <h3 id="${contentConfig.id}TableHeader">
                                                        ${contentConfig.title}
                                                        ${dateFilterIconDom}
                                                        </h3>
                                                    </div>
                                                    <div class=" col-lg-7"></div>
                                                    <div class=" col-lg-2">
                                                        <input type="text" id="${contentConfig.id}InputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
                                                    </div>
                                                </div>
                                                <div class="row ${contentConfig.id}table">
                                                    <div class="col-md-12">
                                                        ${dateFilterDom}
                                                        <div class="table-responsive">
                                                            <table class="table table-condensed table-borderless table-hover" id="${contentConfig.id}Table">
                                                                <thead id="${contentConfig.id}-TableHeader">
                                                                </thead>
                                                                <tbody id="${contentConfig.id}RowList">
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        `;
                                     }

                                     chartColumnsDom += chartColumnDom;
                                     tableColumnsDom += tableColumnDom;

                                });
                            }

                            chartRowDom += `<div class="row doNotCopy">${chartColumnsDom}</div>`;
                            tableRowDom += tableColumnsDom
                    });

                    genericChartRowDom += chartRowDom;
                    genericTableRowDom += tableRowDom;

                }
            }

            let genericHtmlDom = `
                <div class="panel-body-v-scroll fillHeight panel-default ">
                    <style>${genericDomStyle}</style>
                    ${waitElementDom}
                    <div id="MCSOContent" class="" style="margin:10px;" >
                    ${genericChartRowDom}
                    ${genericTableRowDom}
                    </div>
                </div>
            `; 

            return genericHtmlDom;

        }

        initiateByCategoryLabelData(){

            let that = this;
            let categoriesFunctionalities = that.pluginConfig.categoriesFunctionalities;

            categoriesFunctionalities.forEach(category => {

                let itemCurrentStateTableHeaders: any[] = ['Item'];
                let itemCurrentStateValues: ItemCurrentStateData[] = [];
                let groupByData: groupByObject[] = [];
                let groupByStateData: groupByStateObject[] = [];
                let groupByStateOverdueData: groupByStateObject[] = [];
                let groupByStackData: groupByStackObject[] = [];
                let avgData: avgObject[] = [];
                let closureData: closureObject[] = [];
                let trackerData: trackerObject[] = [];
                let dateRangeCompareData: dateRangeCompareObject[] = [];
                let groupByStackCurrentLabelData: groupByStackCurrentData[] = [];
                let groupByObjectCurrentLabelData: groupByObjectCurrentData[] = [];
                let closureLabelCurrentData: closureObjectCurrentData[] = [];
                let dateRangeCompareCurrentLabelData: groupByObjectCurrentData[] = [];
                let trackerLabelCurrentData: Map<string, trackerObjectCurrentData> = new Map<string, trackerObjectCurrentData>();

                category.functionalities.forEach(functionality => {

                    switch (functionality.type) {
                        case 'groupBy':
                            let groupWiseInitials = Array(functionality.labels.length).fill(0);
                            let groupByObject: groupByObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                tableHeader: functionality.tableHeader,
                                labels: functionality.labels,
                                labelsDesc: functionality.labelsDesc,
                                groupWiseData: [category.id + ' ' + functionality.title , ...groupWiseInitials],
                                currentLabelData: JSON.parse(JSON.stringify(groupByObjectCurrentLabelData))
                            };
                            groupByData.push(groupByObject);
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break;
                        case 'statusOverdue':    
                        case 'groupByState':
                            let statusWiseData: any[] = [];

                            functionality.labelsDesc.forEach(labelDesc => {
                                statusWiseData.push([labelDesc, 0]);
                            });

                            let groupByStateObject: groupByStateObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                tableHeader: functionality.tableHeader,
                                stateCodes: functionality.labels,
                                stateDesc: functionality.labelsDesc,
                                stateColors: functionality.labelColors,
                                openState: "",
                                stateWiseInitialData: JSON.parse(JSON.stringify(statusWiseData)),
                                stateWiseData: JSON.parse(JSON.stringify(statusWiseData)),
                                currentState: "",
                                currentLabelData: JSON.parse(JSON.stringify(groupByObjectCurrentLabelData))
                            };

                            if(functionality.type == "groupByState"){
                                groupByStateData.push(groupByStateObject);
                            }else{
                                groupByStateObject.openState = functionality.openStateLabel;
                                groupByStateOverdueData.push(groupByStateObject);
                                that.isOverDueFunctionalityEnabled = true;
                                that.overDueFunctionalityCategory = category.id;
                                that.overDueFunctionalityFiledId = functionality.overDueFieldId;
                            }
                            
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break;
                        case 'groupByStack':
                            let groupByStackChartData: any[] = [];

                            let emptyInitials = Array(functionality.categoryLabels.length).fill(0);

                            functionality.groupByLabelsDesc.forEach(labelDesc => {
                                groupByStackChartData.push([labelDesc, ...emptyInitials]);
                            });

                            let groupByStackObject: groupByStackObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                tableHeader: functionality.tableHeader,
                                categoryCodes: functionality.categoryLabels,
                                categoryDesc: functionality.categoryLabelsDesc,
                                groupByCodes: functionality.groupByLabels,
                                groupByCodesDesc: functionality.groupByLabelsDesc,
                                groupByCodeColors: functionality.groupByLabelColors,
                                groupByStackInitialData: JSON.parse(JSON.stringify(groupByStackChartData)),
                                groupByStackData: JSON.parse(JSON.stringify(groupByStackChartData)),
                                currentLabelData: groupByStackCurrentLabelData
                            };

                            groupByStackData.push(groupByStackObject);
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break;    
                        case 'avg':
                            let SateWiseAvgInitials: any[] = [];
                            let statusWiseTotalDaysData: any[] = [];

                            functionality.labels.forEach(label => {
                                SateWiseAvgInitials.push(0);
                                statusWiseTotalDaysData.push([0,0]);
                            });

                            functionality.labelsDesc.push("Closure Time");
                            SateWiseAvgInitials.push(0);
                            statusWiseTotalDaysData.push([0,0]);

                            let avgObject: avgObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                stateCodes: functionality.labels,
                                stateDesc: functionality.labelsDesc,
                                allStateCodes: functionality.allLabels,
                                allStateDesc: functionality.allLabelDesc,
                                statusWiseTotalDaysData: statusWiseTotalDaysData,
                                statusWiseAvgData: [category.id + ' ' + functionality.title , ...SateWiseAvgInitials],
                                intialState: functionality.initialSateLabel,
                                closedState: functionality.closedStateLabel,
                                rejectedState: functionality.rejectedStateLabel,
                                currentState: "",
                                initiatedDate: null,
                                closedDate: null
                            };

                            avgData.push(avgObject);

                            break;
                        case 'closure':
                            let closedItemsData: any[] = [];
                            let closureObject: closureObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                tableHeader: functionality.tableHeader,
                                allStateCodes: functionality.allLabels,
                                allStateDesc: functionality.allLabelDesc,
                                closedItemsData: closedItemsData,
                                closureTimeData: [category.id + ' ' + functionality.title],
                                intialState: functionality.initialSateLabel,
                                closedState: functionality.closedStateLabel,
                                rejectedState: functionality.rejectedStateLabel,
                                currentState: "",
                                initiatedDate: null,
                                closedDate: null,
                                currentLabelData: closureLabelCurrentData
                            };

                            closureData.push(closureObject);
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break; 
                        case 'tracker':
                            let stateTrackerData: any[] = [['x']];

                            functionality.labelsDesc.forEach(labelDesc => {
                                stateTrackerData.push([labelDesc]);
                            });

                            let trackerObject: trackerObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                stateCodes: functionality.labels,
                                stateDesc: functionality.labelsDesc,
                                stateColors: functionality.labelColors,
                                allStateCodes: functionality.allLabels,
                                allStateDesc: functionality.allLabelDesc,
                                stateTrackerInitialData: JSON.parse(JSON.stringify(stateTrackerData)),
                                stateTrackerData: JSON.parse(JSON.stringify(stateTrackerData)),
                                closedState: functionality.closedStateLabel,
                                rejectedState: functionality.rejectedStateLabel,
                                currentState: "",
                                currentLabelData: trackerLabelCurrentData
                            };

                            trackerData.push(trackerObject);
                            
                            functionality.allLabelDesc.forEach(lableDesc => {
                                itemCurrentStateTableHeaders.push(lableDesc);
                            });

                            break;  
                        case 'dateRangeComapre':
                            
                            let dateRangeComapreObject: dateRangeCompareObject = {
                                id: functionality.id,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                dateRanges: functionality.dateRanges,
                                defaultDateRange: functionality.defaultDateRange,
                                labels: functionality.labels,
                                labelsDesc: functionality.labelsDesc,
                                labelColors: functionality.labelColors,
                                leastStatusSetDate: null,
                                currentLabelData: dateRangeCompareCurrentLabelData
                            };
                            dateRangeCompareData.push(dateRangeComapreObject);
                            functionality.dateRanges.forEach(dateRange => {
                                that.initiateDateRangeActions(dateRange,functionality.id);
                            });
                            break;      
                    };     

                });

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: category.id,
                    groupByData: groupByData,
                    groupByStateData: groupByStateData,
                    groupByStateOverdueData: groupByStateOverdueData,
                    groupByStackData: groupByStackData,
                    avgData: avgData,
                    closureData: closureData,
                    trackerData: trackerData,
                    dateRangeCompareData: dateRangeCompareData,
                    itemCurrentStateTableHeaders: itemCurrentStateTableHeaders,
                    itemCurrentStateValues: itemCurrentStateValues
                }

                this.ByCategoryLabelDetails.push(ByCategoryLabelData);
            });

            // for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
            //     console.log("ByCategoryLabelData:"+JSON.stringify(ByCategoryLabelData));
            // }
        }

        installCopyButtons(title: string) {
            let that = this;
            
            let savedWidth = 0;

            that.allChartsMap.forEach((value,key)=>{

                ml.UI.copyBuffer($(`#${key}-ChartTitle`,this._root), "copy  to clipboard", $(`.panel-body:has(#${key}-Chart)`), this._root, (copied: JQuery) => {
                    console.log("start");
                    $(`#${key}-date-filter`,copied).remove();
                    let title_ = $(`#${key}-ChartTitle`,this._root).text();
                    $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
        
                    ml.UI.fixC3ForCopy(copied);

                    console.log("end");
        
                },"",()=>{    
                    savedWidth = $(`#${key}-Chart svg`,this._root).width();
                    let chartObject = that.allChartsMap.get(key);
                    chartObject.resize({width:590});
                    
                },()=>{     
                    let chartObject = that.allChartsMap.get(key);
                    chartObject.resize({width:savedWidth});
                });
                
            });
    
            

            ml.UI.copyBuffer($(`#${that.pluginTableId}TableHeader`,this._root), "copy list to clipboard", $("#currentStatusList",this._root), this._root, (copied: JQuery) => {
                $(".doNotCopy", copied).remove();
    
                var filter = $(`#${that.pluginTableId}InputFilter`,this._root).val();
               
                $(".hidden",copied).remove();
           
                $("#id", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
    
                $(`#${that.pluginTableId}InputFilter`,copied).remove();

                $(`#${that.pluginTableId}-date-filter`,copied).remove();

                $(`#${that.pluginTableId}TitleForCopy`, copied).html("<div><h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) + "</span> <br/>" + (filter != "" ? "<b>Filter : </b>" + filter + "<br/>" : "") + "</div>");
            });
        }

        initiateDateFilter(dateFilterId){

            let that = this;
            let enableDateFilter;

            $("#"+dateFilterId+"-date-filter").hide();

            $("#"+dateFilterId+"-date-filter-icon").click(function () {
                
                let dateFileterData = that.dateFilterEnablerMap.get(dateFilterId);
                enableDateFilter = !dateFileterData.dateFilterEnabled;
                dateFileterData.dateFilterEnabled = enableDateFilter;
                that.dateFilterEnablerMap.set(dateFilterId,dateFileterData);

                if(enableDateFilter){
                    $("#"+dateFilterId+"-date-filter").show();
                }else{
                    $("#"+dateFilterId+"-date-filter").hide();

                    let byCategoryLabelData = that.ByCategoryLabelDetails
                    .find(({ category }) => category === that.currentCat);

                    switch (dateFileterData.functionality) {
                        case 'groupBy':
                            if(byCategoryLabelData.groupByData.length > 0){
                                byCategoryLabelData.groupByData.forEach(groupByObject => {
                                    if(dateFilterId == groupByObject.id){
                                        that.renderGroupByChart(groupByObject.labelsDesc,groupByObject.groupWiseData,groupByObject.id);
                                    }
                                });
                            }
                            break;
                        case 'groupByState':
                            if(byCategoryLabelData.groupByStateData.length > 0){
                                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                                    if(dateFilterId == groupByStateObject.id){
                                        that.renderGroupByStateChart(groupByStateObject.stateWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                                    }
                                });
                            }
                            break;
                        case 'statusOverdue':
                            if(byCategoryLabelData.groupByStateOverdueData.length > 0){
                                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverdueObject => {
                                    if(dateFilterId == groupByStateOverdueObject.id){
                                        that.renderGroupByStateChart(groupByStateOverdueObject.stateWiseData,groupByStateOverdueObject.stateColors,groupByStateOverdueObject.id);
                                    }
                                });
                            }
                            break;    
                        case 'groupByStack':
                            if(byCategoryLabelData.groupByStackData.length > 0){
                                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                                    if(dateFilterId == groupByStackObject.id){
                                        that.renderGroupByStackChart(groupByStackObject.groupByStackData,groupByStackObject.groupByCodesDesc,groupByStackObject.categoryDesc,groupByStackObject.groupByCodeColors,groupByStackObject.id);
                                    }
                                });
                            }
                            break;    
                        case 'avg':
                            if(byCategoryLabelData.avgData.length > 0){
                                byCategoryLabelData.avgData.forEach(avgObject => {
                                    if(dateFilterId == avgObject.id){
                                        that.renderAvgChart(avgObject.stateDesc,avgObject.statusWiseAvgData,avgObject.id);
                                    }
                                });
                            }
                            break;
                        case 'closure':
                            if(byCategoryLabelData.closureData.length > 0){
                                byCategoryLabelData.closureData.forEach(closureObject => {
                                    if(dateFilterId == closureObject.id){
                                        that.renderClosureChart(closureObject.closedItemsData,closureObject.closureTimeData,closureObject.id);
                                    }
                                });
                            }
                            break; 
                        case 'tracker':
                            if(byCategoryLabelData.trackerData.length > 0){
                                byCategoryLabelData.trackerData.forEach(trackerObject => {
                                    if(dateFilterId == trackerObject.id){
                                        that.renderTrackerChart(trackerObject.stateDesc,trackerObject.stateTrackerData,trackerObject.stateColors,trackerObject.id);
                                    }
                                });
                            }
                            break; 
                        case 'table':
                            if(byCategoryLabelData.itemCurrentStateValues.length > 0){
                                that.renderPluginTable(byCategoryLabelData.itemCurrentStateTableHeaders,byCategoryLabelData.itemCurrentStateValues);
                            }
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
                let dateFileterData = that.dateFilterEnablerMap.get(dateFilterId);
                
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

        renderDateRangeByAction(range,contentId){
            let that = this;
            let columnData;
            let categoryData;

            switch (range) {
                case 'week':
                    columnData = that.currentWeekColumnsData;
                    categoryData = that.currentWeekCategoryData;
                    break;
                case 'month':
                    columnData = that.currentMonthColumnsData;
                    categoryData = that.currentMonthCategoryData.categories;
                    break;
                case 'threeMonths':
                    columnData = that.threeMonthsColumnsData;
                    categoryData = that.threeMonthsCategoryData;
                    break;    
                case 'sixMonths':
                    columnData = that.sixMonthsColumnsData;
                    categoryData = that.sixMonthsCategoryData;
                    break;    
                case 'twelveMonths':
                    columnData = that.twelveMonthsColumnsData;
                    categoryData = that.twelveMonthsCategoryData;
                    break; 
                case 'ytd':
                    columnData = that.ytdColumnsData;
                    categoryData = that.ytdCategoryData;
                    break; 
                case 'moreThanYear':
                    columnData = that.moreThanYearColumnsData;
                    categoryData = that.moreThanYearCategoryData;
                    break;  
                case 'quarterlyCY':
                    columnData = that.quarterlyCYColumnsData;
                    categoryData = that.quarterlyCYCategoryData.categories;
                    break;  
                case 'quarterlyFY':
                    columnData = that.quarterlyFYColumnsData;
                    categoryData = that.quarterlyFYCategoryData.categories;
                    break;                   
            };

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
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

            let ByCategoryLabelData = this.ByCategoryLabelDetails
                .find(({ category }) => category === this.currentCat);

            if(ByCategoryLabelData.groupByData.length > 0){
                ByCategoryLabelData.groupByData.forEach(groupByObject => {
                    that.renderGroupByChart(groupByObject.labelsDesc,groupByObject.groupWiseData,groupByObject.id);
                });
            }

            if(ByCategoryLabelData.groupByStateData.length > 0){
                ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                    that.renderGroupByStateChart(groupByStateObject.stateWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                });
            }

            if(ByCategoryLabelData.groupByStateOverdueData.length > 0){
                ByCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverDueObject => {
                    that.renderGroupByStateChart(groupByStateOverDueObject.stateWiseData,groupByStateOverDueObject.stateColors,groupByStateOverDueObject.id);
                });
            }

            if(ByCategoryLabelData.groupByStackData.length > 0){
                ByCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                    that.renderGroupByStackChart(groupByStackObject.groupByStackData,groupByStackObject.groupByCodesDesc,groupByStackObject.categoryDesc,groupByStackObject.groupByCodeColors,groupByStackObject.id);
                });
            }

            if(ByCategoryLabelData.avgData.length > 0){
                ByCategoryLabelData.avgData.forEach(avgObject => {
                    that.renderAvgChart(avgObject.stateDesc,avgObject.statusWiseAvgData,avgObject.id);
                });
            }

            if(ByCategoryLabelData.closureData.length > 0){
                ByCategoryLabelData.closureData.forEach(closureObject => {
                    that.renderClosureChart(closureObject.closedItemsData,closureObject.closureTimeData,closureObject.id);
                });
            }

            if(ByCategoryLabelData.trackerData.length > 0){
                ByCategoryLabelData.trackerData.forEach(trackerObject => {
                    that.renderTrackerChart(trackerObject.stateDesc,trackerObject.stateTrackerData,trackerObject.stateColors,trackerObject.id);
                });
            }

            if(ByCategoryLabelData.dateRangeCompareData.length > 0){
                ByCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                    that.prepareDateRangeCompareChartData(dateRangeCompareObject.currentLabelData, dateRangeCompareObject.labelsDesc, 
                        dateRangeCompareObject.dateRanges, dateRangeCompareObject.leastStatusSetDate);
                    
                    if (that.currentTimeRangeSelected !== dateRangeCompareObject.defaultDateRange) {
                        $('#' + dateRangeCompareObject.defaultDateRange + 'Range').removeClass("timerangenormal");
                        $('#' + dateRangeCompareObject.defaultDateRange + 'Range').addClass("timerangeselected");
        
                        $('#' + that.currentTimeRangeSelected + 'Range').removeClass("timerangeselected");
                        $('#' + that.currentTimeRangeSelected + 'Range').addClass("timerangenormal");
        
                        that.currentTimeRangeSelected = dateRangeCompareObject.defaultDateRange;
                    }  

                    that.renderDateRangeChart(that.currentWeekColumnsData,that.currentWeekCategoryData,dateRangeCompareObject.labelsDesc,
                        dateRangeCompareObject.labelColors,dateRangeCompareObject.id);    
                });
            }

            if(ByCategoryLabelData.itemCurrentStateValues.length > 0){
                that.renderPluginTable(ByCategoryLabelData.itemCurrentStateTableHeaders,ByCategoryLabelData.itemCurrentStateValues);
            }
            
        }

        filterByLabel(filter: any) {
            this.currentFilter = filter.type;
            let filterDataClass = "";
            if (filter.type == "") {
                //Show all
                $(`#${this.pluginTableId}Table tbody tr`).show();
            }
            else {
                filterDataClass = filter.type.split(' ').join('-').replaceAll('&','-');
                $(`#${this.pluginTableId}Table tbody tr`).hide();
                $(`#${this.pluginTableId}Table tbody tr.${filterDataClass}`).show();
            }
        }

        private prepareQuarterlyCYCategories(year) {
            let months = [];
            let categories = [];
              
            categories.push("Quater1", "Quater2", "Quater3", "Quater4");
            months.push(
                { start: new Date(year, 0, 2).toJSON().slice(0, 10), end: new Date(year, 2, 32).toJSON().slice(0, 10) },
                { start: new Date(year, 3, 2).toJSON().slice(0, 10), end: new Date(year, 5, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 6, 2).toJSON().slice(0, 10), end: new Date(year, 8, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 9, 2).toJSON().slice(0, 10), end: new Date(year, 11, 32).toJSON().slice(0, 10) }
            );

            let quarterlyCYCategoryData = {
                categories: categories,
                months: months
            };

            return quarterlyCYCategoryData;
        }

        private prepareQuarterlyFYCategories(year) {
            let months = [];
            let categories = [];
              
            categories.push("Quater1", "Quater2", "Quater3", "Quater4");
            months.push(
                { start: new Date(year, 3, 2).toJSON().slice(0, 10), end: new Date(year, 5, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 6, 2).toJSON().slice(0, 10), end: new Date(year, 8, 31).toJSON().slice(0, 10) },
                { start: new Date(year, 9, 2).toJSON().slice(0, 10), end: new Date(year, 11, 32).toJSON().slice(0, 10) },
                { start: new Date(year+1, 0, 2).toJSON().slice(0, 10), end: new Date(year+1, 2, 32).toJSON().slice(0, 10) }
            );

            let quarterlyFYCategoryData = {
                categories: categories,
                months: months
            };

            return quarterlyFYCategoryData;
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

        private prepareInitialColumns(categoiesLength, labels) {

            let emptyInitials = Array(categoiesLength).fill(0);
            let initialColumns = [];

            labels.forEach(
                (label) => {
                    initialColumns.push([label, ...emptyInitials]);
            });

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

        private prepareQuarterlyColumnData(currentStatus, currentStausSetDate, categoriesData, columnsData) {

            let statusColumnIndex = columnsData.findIndex(column => column[0] === currentStatus);
            let currentStatusSetDate = new Date(currentStausSetDate);
            categoriesData.months.forEach((categoryData, index) => {
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


        private prepareDateRangeCompareChartInitialData(dateRanges: any[], labelsDesc: any[], leastStatusSetDate: Date) {

            let currentDate = new Date();
            let currentMonth = currentDate.getMonth();
            let currentYear = currentDate.getFullYear();

            dateRanges.forEach(
                (dateRange) =>{
                    switch (dateRange) {
                        case 'week':
                            this.currentWeekCategoryData = [];
                            this.currentWeekColumnsData = [];
                            this.currentWeekCategoryData = this.prepareCurrentWeekCategories();
                            this.currentWeekColumnsData = this.prepareInitialColumns(this.currentWeekCategoryData.length,labelsDesc);
                            
                            break;
                        case 'month':
                            this.currentMonthCategoryData = {};
                            this.currentMonthColumnsData = [];
                            this.currentMonthCategoryData = this.prepareCurrentMonthCategories(currentMonth, currentYear, 'monday');
                            this.currentMonthColumnsData = this.prepareInitialColumns(this.currentMonthCategoryData.categories.length,labelsDesc);
                            break;
                        case 'threeMonths':
                            this.threeMonthsCategoryData = [];
                            this.threeMonthsColumnsData = [];
                            this.threeMonthsCategoryData = this.prepareMonthWiseCategories(3);
                            this.threeMonthsColumnsData = this.prepareInitialColumns(this.threeMonthsCategoryData.length,labelsDesc);
                            break;    
                        case 'sixMonths':
                            this.sixMonthsCategoryData = [];
                            this.sixMonthsColumnsData = [];
                            this.sixMonthsCategoryData = this.prepareMonthWiseCategories(6);
                            this.sixMonthsColumnsData = this.prepareInitialColumns(this.sixMonthsCategoryData.length,labelsDesc);
                            break;    
                        case 'twelveMonths':
                            this.twelveMonthsCategoryData = [];
                            this.twelveMonthsColumnsData = [];
                            this.twelveMonthsCategoryData = this.prepareMonthWiseCategories(12);
                            this.twelveMonthsColumnsData = this.prepareInitialColumns(this.twelveMonthsCategoryData.length,labelsDesc);
                            break; 
                        case 'ytd':
                            this.ytdCategoryData = [];
                            this.ytdColumnsData = [];
                            this.ytdCategoryData = this.prepareYtdCategories(currentMonth, currentYear);
                            this.ytdColumnsData = this.prepareInitialColumns(this.ytdCategoryData.length,labelsDesc);
                            break; 
                        case 'moreThanYear':
                            this.moreThanYearCategoryData = [];
                            this.moreThanYearColumnsData = [];
                            this.moreThanYearCategoryData = this.prepareMoreThanYearCategories(currentYear, leastStatusSetDate);
                            this.moreThanYearColumnsData = this.prepareInitialColumns(this.moreThanYearCategoryData.length,labelsDesc);
                            break; 
                        case 'quarterlyCY':
                            this.quarterlyCYCategoryData = [];
                            this.quarterlyCYColumnsData = [];
                            this.quarterlyCYCategoryData = this.prepareQuarterlyCYCategories(currentYear);
                            this.quarterlyCYColumnsData = this.prepareInitialColumns(this.quarterlyCYCategoryData.categories.length,labelsDesc);
                            break;
                        case 'quarterlyFY':
                            this.quarterlyFYCategoryData = [];
                            this.quarterlyFYColumnsData = [];
                            this.quarterlyFYCategoryData = this.prepareQuarterlyFYCategories(currentYear);
                            this.quarterlyFYColumnsData = this.prepareInitialColumns(this.quarterlyFYCategoryData.categories.length,labelsDesc);
                            break;              
                    };
            });

        }

        private prepareDateRangeCompareChartData(labelsCurrentStateData: groupByObjectCurrentData[], labelsDesc: any[], dateRanges: any[], leastStatusSetDate: Date) {

            this.prepareDateRangeCompareChartInitialData(dateRanges, labelsDesc, leastStatusSetDate);


            labelsCurrentStateData.forEach(
                (labelCurrentData) => {

                    dateRanges.forEach(
                        (dateRange) =>{
                            switch (dateRange) {
                                case 'week':
                                this.prepareCurrentWeekColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.currentWeekCategoryData,
                                        this.currentWeekColumnsData);
                                    break;
                                case 'month':
                                    this.prepareCurrentMonthColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.currentMonthCategoryData,
                                        this.currentMonthColumnsData);
                
                                    break;
                                case 'threeMonths':
                                    this.prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.threeMonthsCategoryData,
                                        this.threeMonthsColumnsData);
                                    break;    
                                case 'sixMonths':
                                    this.prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.sixMonthsCategoryData,
                                        this.sixMonthsColumnsData);
                                    break;    
                                case 'twelveMonths':
                                    this.prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.twelveMonthsCategoryData,
                                        this.twelveMonthsColumnsData);
                                    break; 
                                case 'ytd':
                                    this.prepareMonthWiseColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.ytdCategoryData,
                                        this.ytdColumnsData);                
                                    break; 
                                case 'moreThanYear':
                                    this.prepareMoreThanYearColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.moreThanYearCategoryData,
                                        this.moreThanYearColumnsData);
                                    break;
                                case 'quarterlyCY':
                                    this.prepareQuarterlyColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.quarterlyCYCategoryData,
                                        this.quarterlyCYColumnsData);
                                    break;    
                                case 'quarterlyFY':
                                    this.prepareQuarterlyColumnData(labelCurrentData.currentLabel,
                                        labelCurrentData.currentLabelSetDate,
                                        this.quarterlyFYCategoryData,
                                        this.quarterlyFYColumnsData);
                                    break;               
                            };
                    });

            });

        }

        renderDateRangeComapreDataByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {
            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            let formattedFromDate = new Date(fromDate.setDate(fromDate.getDate() + 1)).toISOString().slice(0, 10);
            let formattedToDate = new Date(toDate.setDate(toDate.getDate() + 1)).toISOString().slice(0, 10);

            let daterangeCompareLabels = [];
            let dateFilterChartCategoryData = [];
            let dateFilterChartColumnsData : any = [];

            if(byCategoryLabelData.dateRangeCompareData.length > 0){
                byCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                    if(dateRangeCompareObject.id == groupId){
                        dateFilterChartCategoryData = dateRangeCompareObject.labelsDesc;
                        daterangeCompareLabels = dateRangeCompareObject.labels;
                        let daterangeCompareLabelInitials = Array(dateRangeCompareObject.labels.length).fill(0);
                        dateFilterChartColumnsData = [
                            ['From:'+formattedFromDate, ...daterangeCompareLabelInitials],
                            ['To:'+formattedToDate, ...daterangeCompareLabelInitials]
                        ];
                    }
                });
            }

            this.labelHistoryData.forEach(
                (labelHistoryRecord) => {
                    let itemCategory = labelHistoryRecord.itemRef.substring(0, labelHistoryRecord.itemRef.indexOf('-'));
                    if(itemCategory == this.currentCat){
                        let labelHistoryData_ = { ...labelHistoryRecord };
                        let fromDateLabels: XRLabelChange[] = [];
                        let toDateLabels: XRLabelChange[] = [];

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
                                        let dateRecord = new Date(setDateRecord.dateIso);

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
                                        let dateRecord = new Date(resetDateRecord.dateIso);

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

                        if(fromDateLabels.length > 0){
                            fromDateLabels.forEach((fromDateLabel) => {
                                let labelIndex = daterangeCompareLabels.findIndex(labelCode => labelCode === fromDateLabel.label);

                                if(labelIndex > -1 && (fromDateLabel.reset.length !== fromDateLabel.set.length)){
                                    dateFilterChartColumnsData[0][labelIndex + 1] += 1;  
                                }
                            });
                        }
                        
                        if(toDateLabels.length > 0){
                            toDateLabels.forEach((toDateLabel) => {
                                let labelIndex = daterangeCompareLabels.findIndex(labelCode => labelCode === toDateLabel.label);

                                if(labelIndex > -1 && (toDateLabel.reset.length !== toDateLabel.set.length)){
                                    dateFilterChartColumnsData[1][labelIndex + 1] += 1;
                                }
                            });
                        }
                   }
                }
            );


            this.renderDateRangeCompareChart(dateFilterChartColumnsData,dateFilterChartCategoryData,groupId);
        }

        renderDateRangeCompareChart(chartColumnsData, chartCategoryData, groupId){
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

            that.allChartsMap.set(groupId,dateRangeChart);

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

            that.allChartsMap.set(groupId,dateRangeChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });

        }

        renderGroupByChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.groupByData.length > 0){
                byCategoryLabelData.groupByData.forEach(groupByObject => {

                    if(groupByObject.id == groupId){

                        let groupWiseInitials = Array(groupByObject.labels.length).fill(0);
                        let groupWiseData =  [ groupByObject.groupWiseData[0] , ...groupWiseInitials];

                        groupByObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if(itemCurrentStateData.currentLabelSetDate && 
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)){
                                        let groupByLabelIndex = groupByObject.labels.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);
                                        groupWiseData[groupByLabelIndex + 1] += 1;
                                }

                        });

                        this.renderGroupByChart(groupByObject.labelsDesc,groupWiseData,groupByObject.id);
                    }
                });
            }
        }

        renderGroupByChart(labels,grouoWiseData,groupId){
            let that = this;
             //prepare template "${contentConfig.id}-Chart"
             let groupByChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    x : 'x',
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

            that.allChartsMap.set(groupId,groupByChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderGroupByStateChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.groupByStateData.length > 0){
                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {

                    if(groupByStateObject.id == groupId){
                        let statusWiseData: any = JSON.parse(JSON.stringify(groupByStateObject.stateWiseInitialData));

                        groupByStateObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if(itemCurrentStateData.currentLabelSetDate && 
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)){
                                        let groupByStateLabelIndex = groupByStateObject.stateCodes.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);
                                        statusWiseData[groupByStateLabelIndex][1] += 1;
                                }

                        });

                        this.renderGroupByStateChart(statusWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                        
                    }
                });
            }
        }

        renderGroupByStateOverdueChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.groupByStateOverdueData.length > 0){
                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverdueObject => {

                    if(groupByStateOverdueObject.id == groupId){
                        let statusWiseData: any = JSON.parse(JSON.stringify(groupByStateOverdueObject.stateWiseInitialData));

                        groupByStateOverdueObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if(itemCurrentStateData.currentLabelSetDate && 
                                    (itemCurrentStateData.currentLabelSetDate >= fromDate && itemCurrentStateData.currentLabelSetDate <= toDate)){
                                        let groupByStateLabelIndex = groupByStateOverdueObject.stateCodes.findIndex(labelCode => labelCode === itemCurrentStateData.currentLabel);
                                        
                                        if(itemCurrentStateData.currentLabel == groupByStateOverdueObject.openState){
                                            let itemDueDate = this.OpenItemsDueDateMap.get(itemCurrentStateData.id);
                                            //check for overdue
                                            if(new Date(itemDueDate) < new Date()){
                                                statusWiseData[groupByStateOverdueObject.stateDesc.length-1][1] += 1;
                                            }else{
                                                statusWiseData[groupByStateLabelIndex][1] += 1;
                                            }
                                        }else{
                                            statusWiseData[groupByStateLabelIndex][1] += 1;
                                        }
                                }

                        });

                        this.renderGroupByStateChart(statusWiseData,groupByStateOverdueObject.stateColors,groupByStateOverdueObject.id);
                        
                    }
                });
            }
        }

        renderGroupByStateChart(stateWiseData,stateColors,groupId){
            let that = this;
            //prepare template
            let groupByStateChartParams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
                data: {
                    columns: stateWiseData,
                    type : 'pie',
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
                        value: function (value : any, ratio: any, id: any, index: any) { return value; }
                    }
                }
            };

            //prepare chart config and render
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let groupByStateChart = c3.generate(groupByStateChartParams);

            that.allChartsMap.set(groupId,groupByStateChart);

            $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
            });
        }

        renderGroupByStackChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.groupByStackData.length > 0){
                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {

                    if(groupByStackObject.id == groupId){
                        let stackWiseData: any = JSON.parse(JSON.stringify(groupByStackObject.groupByStackInitialData));

                        groupByStackObject.currentLabelData.forEach((itemCurrentLabelData) => {
                            if(itemCurrentLabelData.currentgroupLabelSetDate && 
                                (itemCurrentLabelData.currentgroupLabelSetDate >= fromDate && itemCurrentLabelData.currentgroupLabelSetDate <= toDate)){

                                    let categoryLabelIndex = groupByStackObject.categoryDesc.findIndex(labelDesc => labelDesc === itemCurrentLabelData.currentCategoryLabel);
                                    
                                    stackWiseData.forEach(stackGroupData => {
                                        if(stackGroupData[0] == itemCurrentLabelData.currentgroupLabel){
                                            stackGroupData[categoryLabelIndex + 1] += 1;
                                        }
                                    }); 
                            }
                        });

                        this.renderGroupByStackChart(stackWiseData,groupByStackObject.groupByCodesDesc,groupByStackObject.categoryDesc,groupByStackObject.groupByCodeColors,groupByStackObject.id);
                        
                    }
                });
            }
        }

        renderGroupByStackChart(stackColumnData,stackGroupLabels,stackCategories,stackColors,groupId){
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

            that.allChartsMap.set(groupId,groupByStackChart);
        }

        renderAvgChart(states,statusWiseAvgData,groupId){
            let that = this;
            //prepare template
            let avgChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
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
            $(`#${groupId}-Chart div`).remove();

            $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

            let avgChart = c3.generate(avgChartparams);

            that.allChartsMap.set(groupId,avgChart);
        }

        renderClosureChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.closureData.length > 0){
                byCategoryLabelData.closureData.forEach(closureObject => {
                    if(closureObject.id == groupId){
                   
                        let closedItemsData = [];
                        let closureTimeData: any[] = [closureObject.closureTimeData[0]];

                        closureObject.currentLabelData.forEach(
                            (itemCurrentStateData) => {

                                if(itemCurrentStateData.closedDate && 
                                    (itemCurrentStateData.closedDate >= fromDate && itemCurrentStateData.closedDate <= toDate)){
                                        closedItemsData.push(itemCurrentStateData.id);
                                        closureTimeData.push(itemCurrentStateData.daysToClose);

                                }

                        });

                        this.renderClosureChart(closedItemsData,closureTimeData,closureObject.id);
                    }
                });
            }
        }

        renderClosureChart(closedItemsData,closureTimeData,groupId){
            let that = this;
            //prepare template
            let closureChartparams: c3.ChartConfiguration = {
               bindto: `#${groupId}Graph`,
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
           $(`#${groupId}-Chart div`).remove();

           $(`#${groupId}-Chart`).append(`<div id='${groupId}Graph'>`);

           let closureChart = c3.generate(closureChartparams);

           that.allChartsMap.set(groupId,closureChart);

           $(`#${groupId}-Chart svg`).click(function () {
                that.filterByLabel({ type: "" })
           });
        }

        renderTrackerChartByDateRanges(fromDateVal: any, toDateVal: any,byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.trackerData.length > 0){
                byCategoryLabelData.trackerData.forEach(trackerObject => {
                    if(trackerObject.id == groupId){
                        let stateTrackerData: any[] = [['x']];

                        trackerObject.stateDesc.forEach(labelDesc => {
                            stateTrackerData.push([labelDesc]);
                        });

                        trackerObject.currentLabelData.forEach(
                            (itemCurrentStateData,itemId)=>{
                                if(itemCurrentStateData.currentStateSetDate && itemCurrentStateData.currentState !== trackerObject.closedState
                                    && (itemCurrentStateData.currentStateSetDate >= fromDate && itemCurrentStateData.currentStateSetDate <= toDate)){
                                        stateTrackerData[0].push(itemCurrentStateData.id);
                                        trackerObject.stateCodes.forEach(
                                            (trackState, stateIndex) => {
                                                let stateDays = itemCurrentStateData.itemStateDays.get(trackState);
                                                if(stateDays){
                                                    stateTrackerData[stateIndex +1].push(stateDays);
                                                }else{
                                                    stateTrackerData[stateIndex +1].push("");
                                                }    
                                        });
                                }
                        });

                        this.renderTrackerChart(trackerObject.stateDesc,stateTrackerData,trackerObject.stateColors,trackerObject.id);
                    }
                });
            }
        }

        renderTrackerChart(trackerStates,stateTrackerData,stateColors,groupId){
            let that = this;
            //prepare template
            let trackerChartparams: c3.ChartConfiguration = {
                bindto: `#${groupId}Graph`,
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

            that.allChartsMap.set(groupId,trackerChart);
        }

        renderPluginTableByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);
            let itemCurrentStateDetailsByDateRange: ItemCurrentStateData[] = [];

            byCategoryLabelData.itemCurrentStateValues.forEach(
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

            this.renderPluginTable(byCategoryLabelData.itemCurrentStateTableHeaders,itemCurrentStateDetailsByDateRange);
        }

        renderPluginTable(itemCurrentStateTableHeaders: any[],itemCurrentStateValues: ItemCurrentStateData[]) {
            let that = this;

            let table = $(`#${that.pluginTableId}Table`);
            $(".addedItem", table).remove();
            $(".addedHeader", table).remove();

            let tableHeader = $('<tr />');
            tableHeader.attr("class", "addedHeader");

            itemCurrentStateTableHeaders.forEach(
                (headerLabel) => {
                    tableHeader.append('<th>' + headerLabel +'</th>');
                }
            );

            $(`#${that.pluginTableId}-TableHeader`).append(tableHeader);

            itemCurrentStateValues.forEach(
                (itemCurrentStateData) => {
                    let tableRow = $(`<tr/>`);
                    let classAttr = "addedItem";

                    itemCurrentStateData.attributes.forEach((attribute) => {
                        classAttr += " " + attribute.split(' ').join('-').replaceAll('&','-');
                    });

                    tableRow.attr("class", classAttr);

                    let itemRowData = $("<td/>");
                    tableRow.append(itemRowData);
                    itemRowData.text(itemCurrentStateData.id + "!");
                    itemRowData.data("ref", itemCurrentStateData.id + "!");

                    itemCurrentStateData.tableValues.forEach(
                        (rowValue,rowIndex) => {
                            if(rowIndex != 0){
                                let labelRowData = $("<td>"+ rowValue +"</td>");
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


        processLabelsData(labels: XRLabelEntry[]){
            let that = this;
            let pluginCategories = that.pluginConfig.categories;

            for (const item of labels) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory && (!pluginCategories.includes(itemCategory))){
                    continue;
                }

                let ByCategoryLabelData: ByCategoryLabelData;
                let itemIndex = -1;
                let labelstateDaysCount;

                let groupByStackCurrentCategory = new Map();
                let groupByStackCurrentgroup = new Map();

                for (const ByCategoryData of this.ByCategoryLabelDetails) {
                    if (itemCategory == ByCategoryData.category) {
                        ByCategoryLabelData = ByCategoryData;
                        break;
                    }
                }

                let itemCurrentStateTableInitials : any[] = [];

                itemCurrentStateTableInitials = Array(ByCategoryLabelData.itemCurrentStateTableHeaders.length).fill("");

                let itemCurrentStateData : ItemCurrentStateData = {
                    id: item.itemRef,
                    attributes: [],
                    tableValues: itemCurrentStateTableInitials,
                    InitiatedDate: null,
                    ClosedDate: null,
                    currentState: ''
                };

                if(ByCategoryLabelData.trackerData.length > 0) {      
                    ByCategoryLabelData.trackerData.forEach(trackerObject => {
                        trackerObject.stateTrackerInitialData = JSON.parse(JSON.stringify(trackerObject.stateTrackerData));
                    });
                }

                
                for (const label of item.labels) {

                    //process groupBy functionality
                    if(ByCategoryLabelData.groupByData.length > 0){
                        ByCategoryLabelData.groupByData.forEach(groupByObject => {
                            let labelIndex = groupByObject.labels.findIndex(labelCode => labelCode === label.label);

                            if(labelIndex > -1 && (label.reset.length !== label.set.length)){
                                if(groupByObject.renderChart == 'Y'){
                                    groupByObject.groupWiseData[labelIndex + 1] += 1;
                                }
            
                                if(groupByObject.showInTable == 'Y'){
                                    let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByObject.tableHeader);
                                    itemCurrentStateData.tableValues[headerIndex] = groupByObject.labelsDesc[labelIndex];
                                    itemCurrentStateData.attributes.push(groupByObject.labelsDesc[labelIndex]);
                                }

                                if(this.dateFilterEnablerMap.get(groupByObject.id)){
                                    label.set.sort((a, b) => b.version - a.version);
                                    let currentLableSetDate = new Date(label.set[0].dateIso);
                                    itemCurrentStateData.InitiatedDate = currentLableSetDate;

                                    let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                        id: item.itemRef,
                                        currentLabel: label.label,
                                        currentLabelSetDate: currentLableSetDate
                                    };

                                    groupByObject.currentLabelData.push(groupByObjectcurrentLabelData);
                                }
                            }
                        });
                    }

                    //process groupByStack functionality
                    if(ByCategoryLabelData.groupByStackData.length > 0){
                        ByCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                            let categoryLabelIndex = groupByStackObject.categoryCodes.findIndex(categoryCode => categoryCode === label.label);
                            let groupLabelIndex = groupByStackObject.groupByCodes.findIndex(groupCode => groupCode === label.label);

                            if(categoryLabelIndex > -1 && (label.reset.length !== label.set.length)){
                                groupByStackCurrentCategory.set(groupByStackObject.id,{label: label, labelIndex: categoryLabelIndex});
                            }else if(groupLabelIndex > -1 && (label.reset.length !== label.set.length)){
                                groupByStackCurrentgroup.set(groupByStackObject.id,{label: label, labelIndex: groupLabelIndex});
                            }  

                        });
                    }        

                    //process groupByState functionality
                    if(ByCategoryLabelData.groupByStateData.length > 0){
                        ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {

                            let stateIndex = groupByStateObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                            //let currentStateIndex = -1;
                            if(stateIndex > -1){
                                // if(groupByStateObject.currentState){
                                //     currentStateIndex = groupByStateObject.stateCodes.findIndex(stateCode => stateCode === groupByStateObject.currentState);
                                // }
                                //if((label.reset.length !== label.set.length) && currentStateIndex < 0){
                                if(label.reset.length !== label.set.length){    
                                    if(groupByStateObject.renderChart == 'Y'){
                                        groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                    }
                                    groupByStateObject.currentState = label.label;
                                    itemCurrentStateData.currentState = label.label;
                                    if(groupByStateObject.showInTable == 'Y'){
                                        let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                        itemCurrentStateData.tableValues[headerIndex] = groupByStateObject.stateDesc[stateIndex];
                                        itemCurrentStateData.attributes.push(groupByStateObject.stateDesc[stateIndex]);
                                    }

                                    if(this.dateFilterEnablerMap.get(groupByStateObject.id)){
                                        label.set.sort((a, b) => b.version - a.version);
                                        let currentLableSetDate = new Date(label.set[0].dateIso);
                                        itemCurrentStateData.InitiatedDate = currentLableSetDate;
    
                                        let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                            id: item.itemRef,
                                            currentLabel: label.label,
                                            currentLabelSetDate: currentLableSetDate
                                        };
    
                                        groupByStateObject.currentLabelData.push(groupByObjectcurrentLabelData);
                                    }
                                }
                                
                                // else if((label.reset.length !== label.set.length) && stateIndex > currentStateIndex) {
                                //     if(groupByStateObject.renderChart == 'Y'){
                                //         groupByStateObject.stateWiseData[currentStateIndex][1] -= 1;
                                //         groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                //     }
                                //     groupByStateObject.currentState = label.label;
                                //     itemCurrentStateData.currentState = label.label;
                                //     if(groupByStateObject.showInTable == 'Y'){
                                //         let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                //         itemCurrentStateData.tableValues[headerIndex] = groupByStateObject.stateDesc[stateIndex];
                                //         itemCurrentStateData.attributes.push(groupByStateObject.stateDesc[stateIndex]);
                                //     }
                                //     if(this.dateFilterEnablerMap.get(groupByStateObject.id)){
                                //         label.set.sort((a, b) => b.version - a.version);
                                //         let currentLableSetDate = new Date(label.set[0].dateIso);
                                //         itemCurrentStateData.InitiatedDate = currentLableSetDate;
    
                                //         let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                //             id: item.itemRef,
                                //             currentLabel: label.label,
                                //             currentLabelSetDate: currentLableSetDate
                                //         };
    
                                //         groupByStateObject.currentLabelData.push(groupByObjectcurrentLabelData);
                                //     }
                                // }   
                            }
                        });
                    }

                    //process groupByStateOverDue functionality
                    if(ByCategoryLabelData.groupByStateOverdueData.length > 0){
                        ByCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverDueObject => {

                            let stateIndex = groupByStateOverDueObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                            let isCurrentStateOverDue = false;
                            //let openStateIndex = groupByStateOverDueObject.stateCodes.findIndex(stateCode => stateCode === groupByStateOverDueObject.openState);
                            //let currentStateIndex = -1;

                            if(stateIndex > -1){
                                // if(groupByStateOverDueObject.currentState){
                                //     currentStateIndex = groupByStateOverDueObject.stateCodes.findIndex(stateCode => stateCode === groupByStateOverDueObject.currentState);
                                // }
                                //if((label.reset.length !== label.set.length) && currentStateIndex < 0){
                                if(label.reset.length !== label.set.length){
                                    groupByStateOverDueObject.currentState = label.label;
                                    itemCurrentStateData.currentState = label.label;

                                    if(groupByStateOverDueObject.renderChart == 'Y'){
                                        if(itemCurrentStateData.currentState == groupByStateOverDueObject.openState){    
                                            let itemDueDate = this.OpenItemsDueDateMap.get(item.itemRef);
                                            //check for overdue
                                            if(new Date(itemDueDate) < new Date()){
                                                groupByStateOverDueObject.stateWiseData[groupByStateOverDueObject.stateDesc.length-1][1] += 1;
                                                itemCurrentStateData.currentState = groupByStateOverDueObject.stateDesc[groupByStateOverDueObject.stateDesc.length-1];
                                                isCurrentStateOverDue = true;
                                            }else{
                                                groupByStateOverDueObject.stateWiseData[stateIndex][1] += 1;
                                            }
                                        }else{
                                            groupByStateOverDueObject.stateWiseData[stateIndex][1] += 1;
                                        }
                                    }

                                    if(groupByStateOverDueObject.showInTable == 'Y'){
                                        let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateOverDueObject.tableHeader);
                                        let tableValue; 
                                        if(isCurrentStateOverDue){
                                            tableValue = itemCurrentStateData.currentState;
                                        }else{
                                            tableValue = groupByStateOverDueObject.stateDesc[stateIndex];
                                        }
                                        itemCurrentStateData.tableValues[headerIndex] = tableValue;
                                        itemCurrentStateData.attributes.push(tableValue);
                                    }
                                    if(this.dateFilterEnablerMap.get(groupByStateOverDueObject.id)){
                                        label.set.sort((a, b) => b.version - a.version);
                                        let currentLableSetDate = new Date(label.set[0].dateIso);
                                        itemCurrentStateData.InitiatedDate = currentLableSetDate;
    
                                        let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                            id: item.itemRef,
                                            currentLabel: label.label,
                                            currentLabelSetDate: currentLableSetDate
                                        };
    
                                        groupByStateOverDueObject.currentLabelData.push(groupByObjectcurrentLabelData);
                                    }
                                }
                                
                                // else if((label.reset.length !== label.set.length) && stateIndex > currentStateIndex) {
                                //     if(groupByStateOverDueObject.renderChart == 'Y'){
                                //         groupByStateOverDueObject.stateWiseData[currentStateIndex][1] -= 1;
                                //         if(currentStateIndex == openStateIndex){
                                //             groupByStateOverDueObject.stateWiseData[groupByStateOverDueObject.stateDesc.length-1][1] -= 1;
                                //         }
                                //         groupByStateOverDueObject.stateWiseData[stateIndex][1] += 1;
                                //     }
                                //     groupByStateOverDueObject.currentState = label.label;
                                //     itemCurrentStateData.currentState = label.label;
                                //     if(groupByStateOverDueObject.showInTable == 'Y'){
                                //         let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateOverDueObject.tableHeader);
                                //         itemCurrentStateData.tableValues[headerIndex] = groupByStateOverDueObject.stateDesc[stateIndex];
                                //         itemCurrentStateData.attributes.push(groupByStateOverDueObject.stateDesc[stateIndex]);
                                //     }
                                //     if(this.dateFilterEnablerMap.get(groupByStateOverDueObject.id)){
                                //         label.set.sort((a, b) => b.version - a.version);
                                //         let currentLableSetDate = new Date(label.set[0].dateIso);
                                //         itemCurrentStateData.InitiatedDate = currentLableSetDate;
    
                                //         let groupByObjectcurrentLabelData: groupByObjectCurrentData = {
                                //             id: item.itemRef,
                                //             currentLabel: label.label,
                                //             currentLabelSetDate: currentLableSetDate
                                //         };
    
                                //         groupByStateOverDueObject.currentLabelData.push(groupByObjectcurrentLabelData);
                                //     }
                                // }  
                               
                            }
                        });
                    }

                    //getting state number of days required for avg,tracker and closure functionality
                    if((ByCategoryLabelData.avgData.length > 0) 
                        || (ByCategoryLabelData.trackerData.length > 0)
                        || (ByCategoryLabelData.closureData.length > 0)
                        ){
                        //get the number of days label state was in
                        label.set.sort((a, b) => a.version - b.version);
                        label.reset.sort((a, b) => a.version - b.version);

                        labelstateDaysCount = label.set.reduce((accumulator, currentValue, currentIndex, set) => {
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
                    }

                    

                    //process avg functionality
                    if(ByCategoryLabelData.avgData.length > 0){
                        ByCategoryLabelData.avgData.forEach(avgObject => {

                            let stateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === label.label);
                            if(stateIndex > -1 && (label.reset.length !== label.set.length)){
                                avgObject.currentState = label.label;
                            }

                            let initialStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.intialState);
                            let closedStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.closedState);

                            if(stateIndex == initialStateIndex){
                                label.set.sort((a, b) => a.version - b.version);
                                let intiatedDate = new Date(label.set[0].dateIso);
                                avgObject.initiatedDate = intiatedDate;
                            }
    
                            if(stateIndex == closedStateIndex){
                                label.set.sort((a, b) => b.version - a.version);
                                const colosedDate = new Date(label.set[0].dateIso);
                                avgObject.closedDate = colosedDate;
                            }

                            if(label.reset.length == label.set.length){
                                if(avgObject.renderChart == 'Y'){
                                    let avgStateIndex = avgObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                                    if(avgStateIndex > -1){
                                        avgObject.statusWiseTotalDaysData[avgStateIndex][0] += labelstateDaysCount;
                                        avgObject.statusWiseTotalDaysData[avgStateIndex][1] += 1;
                                    }
                                }
                            }
                        });
                    }

                    //process closure functionality
                    if( ByCategoryLabelData.closureData.length > 0){
                        ByCategoryLabelData.closureData.forEach(closureObject => {
                            let stateIndex = closureObject.allStateCodes.findIndex(stateCode => stateCode === label.label);
                            if(stateIndex > -1 && (label.reset.length !== label.set.length)){
                                closureObject.currentState = label.label;
                            }

                            let initialStateIndex = closureObject.allStateCodes.findIndex(stateCode => stateCode === closureObject.intialState);
                            let closedStateIndex = closureObject.allStateCodes.findIndex(stateCode => stateCode === closureObject.closedState);

                            if(stateIndex == initialStateIndex){
                                label.set.sort((a, b) => a.version - b.version);
                                let intiatedDate = new Date(label.set[0].dateIso);
                                closureObject.initiatedDate = intiatedDate;
                                itemCurrentStateData.InitiatedDate = intiatedDate;
                            }
    
                            if(stateIndex == closedStateIndex){
                                label.set.sort((a, b) => b.version - a.version);
                                const colosedDate = new Date(label.set[0].dateIso);
                                closureObject.closedDate = colosedDate;
                                itemCurrentStateData.ClosedDate = colosedDate;
                            }
                        });
                    }

                    //process dateRangeComapre functionality
                    if(ByCategoryLabelData.dateRangeCompareData.length > 0){
                        ByCategoryLabelData.dateRangeCompareData.forEach(dateRangeCompareObject => {
                            let labelIndex = dateRangeCompareObject.labels.findIndex(labelCode => labelCode === label.label);

                            if(labelIndex > -1 && (label.reset.length !== label.set.length)){
                                if(dateRangeCompareObject.renderChart == 'Y'){

                                    label.set.sort((a, b) => b.version - a.version);
                                    let currentLableSetDate = new Date(label.set[0].dateIso);

                                   if((!dateRangeCompareObject.leastStatusSetDate) || (currentLableSetDate < dateRangeCompareObject.leastStatusSetDate)){
                                        dateRangeCompareObject.leastStatusSetDate = currentLableSetDate;
                                   }

                                    let dateRangeComapreCurrentLabelData: groupByObjectCurrentData = {
                                        id: item.itemRef,
                                        currentLabel: dateRangeCompareObject.labelsDesc[labelIndex],
                                        currentLabelSetDate: currentLableSetDate
                                    };

                                    dateRangeCompareObject.currentLabelData.push(dateRangeComapreCurrentLabelData);  
                                }
                            }
                        });
                    }

                    //process tracker functionality
                    if(ByCategoryLabelData.trackerData.length > 0){
                        ByCategoryLabelData.trackerData.forEach(trackerObject => {

                            let stateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === label.label);
                            if(stateIndex > -1 && (label.reset.length !== label.set.length)){
                                trackerObject.currentState = label.label;
                                itemCurrentStateData.currentState = label.label;
                            }

                            if(trackerObject.renderChart == 'Y'){
                                let trackerStateIndex = trackerObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                                if(trackerStateIndex > -1){
                                    if(itemIndex > -1){
                                        trackerObject.stateTrackerData[trackerStateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                                    }else{
                                        trackerObject.stateTrackerData[0].push(item.itemRef);
                                        itemIndex = trackerObject.stateTrackerData[0].length - 2;
                                        for (let i = 0; i <= trackerObject.stateCodes.length - 1; i++) {
                                            trackerObject.stateTrackerData[i + 1].push(0);
                                        }
                                        trackerObject.stateTrackerData[trackerStateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                                    }

                                    if(this.dateFilterEnablerMap.get(trackerObject.id)){
                                        let currentLableSetDate = null;
                                        let currentState = null;
                                        if(label.reset.length !== label.set.length){
                                            label.set.sort((a, b) => b.version - a.version);
                                            currentLableSetDate = new Date(label.set[0].dateIso);
                                            currentState = label.label;
                                            itemCurrentStateData.InitiatedDate = currentLableSetDate;
                                        }

                                        let trackerItemCurrentData = trackerObject.currentLabelData.get(item.itemRef);

                                        if(trackerItemCurrentData){
                                            trackerItemCurrentData.currentState = currentState;
                                            trackerItemCurrentData.currentStateSetDate = currentLableSetDate;
                                            trackerItemCurrentData.itemStateDays.set(label.label,labelstateDaysCount);
                                            trackerObject.currentLabelData.set(item.itemRef,trackerItemCurrentData);

                                        }else{
                                            let trackerObjectCurrentData: trackerObjectCurrentData = {
                                                id: item.itemRef,
                                                currentState: currentState,
                                                currentStateSetDate: currentLableSetDate,
                                                itemStateDays: new Map<string, Number>()
                                            };
                                            trackerObjectCurrentData.itemStateDays.set(label.label,labelstateDaysCount);
                                            trackerObject.currentLabelData.set(item.itemRef,trackerObjectCurrentData);
                                        }
                                    }
                                }
                            }

                            if(trackerObject.showInTable == 'Y'){

                                let stateDesc = trackerObject.allStateDesc[stateIndex];
                                let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === stateDesc);
                                itemCurrentStateData.tableValues[headerIndex] = labelstateDaysCount;

                            }

                        });
                    }

                }

                if(ByCategoryLabelData.groupByStackData.length > 0){
                    ByCategoryLabelData.groupByStackData.forEach(groupByStackObject => {

                        let categoryLabelData = groupByStackCurrentCategory.get(groupByStackObject.id);
                        let groupLabelData = groupByStackCurrentgroup.get(groupByStackObject.id);

                        let categoryLabelIndex = -1;
                        let groupLabelIndex = -1;

                        if(categoryLabelData && groupLabelData){
                            categoryLabelIndex = categoryLabelData.labelIndex;
                            groupLabelIndex = groupLabelData.labelIndex;
                        }


                        if(categoryLabelIndex >= 0 && groupLabelIndex >= 0){
                            let groupDesc = groupByStackObject.groupByCodesDesc[groupLabelIndex];
                            let categoryDesc = groupByStackObject.categoryDesc[categoryLabelIndex];
                            
                            groupByStackObject.groupByStackData.forEach(stackGroupData => {
                                if(stackGroupData[0] == groupDesc){
                                    stackGroupData[categoryLabelIndex + 1] += 1;
                                }
                            });

                            // groupLabelData.label.set.sort((a, b) => b.version - a.version);
                            // let currentLableSetDate = new Date(groupLabelData.label.set[0].dateIso);
                            categoryLabelData.label.set.sort((a, b) => b.version - a.version);
                            let currentLableSetDate = new Date(categoryLabelData.label.set[0].dateIso);
                            itemCurrentStateData.InitiatedDate = currentLableSetDate;

                            let groupByLabelCurrentData: groupByStackCurrentData = {
                                id: item.itemRef,
                                currentCategoryLabel: categoryDesc,
                                currentgroupLabel: groupDesc,
                                currentgroupLabelSetDate: currentLableSetDate
                            };

                            groupByStackObject.currentLabelData.push(groupByLabelCurrentData);
                        }
                    });
                } 

                if(ByCategoryLabelData.trackerData.length > 0) {
                    ByCategoryLabelData.trackerData.forEach(trackerObject => {
                        let currentStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.currentState);
                        let closedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.closedState);
                        let rejectedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.rejectedState);
                        if( (currentStateIndex == closedStateIndex)
                        || (currentStateIndex == rejectedStateIndex)
                        ){
                            trackerObject.stateTrackerData = trackerObject.stateTrackerInitialData;
                        }
                    });
                }

                if( ByCategoryLabelData.avgData.length > 0){
                    ByCategoryLabelData.avgData.forEach(avgObject => {
                        let currentStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.currentState);
                        let closedStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.closedState);

                        if(currentStateIndex == closedStateIndex){
                            if(avgObject.initiatedDate && avgObject.closedDate){         
                                let time_difference = avgObject.closedDate.getTime() - avgObject.initiatedDate.getTime();
                                //calculate days difference by dividing total milliseconds in a day  
                                let days_difference = time_difference / (1000 * 60 * 60 * 24);
                                let daysToCloseItem = Math.floor(days_difference);
                                if(avgObject.renderChart == 'Y'){
                                    let closureTimeLabelIndex = avgObject.statusWiseTotalDaysData.length;
                                    avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][0] += daysToCloseItem;
                                    avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][1] += 1;
                                }
                            }
                        }
                    });
                }

                if( ByCategoryLabelData.closureData.length > 0){
                    ByCategoryLabelData.closureData.forEach(closureObject => {
                        let currentStateIndex = closureObject.allStateCodes.findIndex(stateCode => stateCode === closureObject.currentState);
                        let closedStateIndex = closureObject.allStateCodes.findIndex(stateCode => stateCode === closureObject.closedState);
                        if(currentStateIndex == closedStateIndex){
                            if(closureObject.initiatedDate && closureObject.closedDate){
                                let time_difference = closureObject.closedDate.getTime() - closureObject.initiatedDate.getTime();
                                //calculate days difference by dividing total milliseconds in a day  
                                let days_difference = time_difference / (1000 * 60 * 60 * 24);
                                let daysToCloseItem = Math.floor(days_difference);
                                if(closureObject.renderChart == 'Y'){
                                    closureObject.closedItemsData.push(item.itemRef);
                                    closureObject.closureTimeData.push(daysToCloseItem);
                                }
                                if(closureObject.showInTable == 'Y'){
                                    let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === closureObject.tableHeader);
                                    itemCurrentStateData.tableValues[headerIndex] = daysToCloseItem;
                                }
                                if(this.dateFilterEnablerMap.get(closureObject.id) && closureObject.closedDate){
                                
                                    let closureItemsCurrentData: closureObjectCurrentData = {
                                        id: item.itemRef,
                                        daysToClose: daysToCloseItem,
                                        closedDate: closureObject.closedDate
                                    };
    
                                    closureObject.currentLabelData.push(closureItemsCurrentData);
                                }
                            }
                        }
                    });
                }

                ByCategoryLabelData.itemCurrentStateValues.push(itemCurrentStateData);
            }

            //updating avg functionality data
            for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
                ByCategoryLabelData.avgData.forEach(avgObject => {
                    avgObject.statusWiseTotalDaysData.forEach((element,index) => {
                        let avgData = 0;
                        if(element[1] !== 0){
                            avgData = element[0]/element[1]
                        }
                        avgObject.statusWiseAvgData[index + 1] = avgData.toFixed(2);
                    });

                });
            }

            // for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
            //     console.log("category:"+ByCategoryLabelData.category)
            //     console.log("groupByData:"+JSON.stringify(ByCategoryLabelData.groupByData));
            //     console.log("groupByStateData:"+JSON.stringify(ByCategoryLabelData.groupByStateData));
            //     console.log("avgData:"+JSON.stringify(ByCategoryLabelData.avgData));
            //     console.log("closureData:"+JSON.stringify(ByCategoryLabelData.closureData));
            //     console.log("trackerData:"+JSON.stringify(ByCategoryLabelData.trackerData));
            //     console.log("itemCurrentStateTableHeaders:"+JSON.stringify(ByCategoryLabelData.itemCurrentStateTableHeaders));
            //     console.log("itemCurrentStateValues:"+JSON.stringify(ByCategoryLabelData.itemCurrentStateValues));
            // }

        }

    }
}

// Register the plugin
$(function () {
    plugins.register(new GenericDashboard.GenericDashboard());
});