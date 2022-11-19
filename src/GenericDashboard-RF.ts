// <VERSION_INFO_PLACEHOLDER>

/// <reference path="api/Matrix.Labels.ts" />
/// <reference path="commons/Commons.RenderTemplate.ts" />
/// <reference path="commons/Commons.GenericFunctionalities.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace GenericDashboard {

    // These will be replaced by the build
    const PLUGIN_NAME = "<PLUGIN_NAME_PLACEHOLDER>";
    const PLUGIN_VERSION = "<PLUGIN_VERSION_PLACEHOLDER>";

    export class GenericDashboard_RF implements IPlugin {

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

        allChartsMap = new Map();

        dateFilterEnablerMap = new Map();

        currentTimeRangeSelected: string = "";

        currentCat: string = "";


        isOverDueFunctionalityEnabled : boolean = false;
        overDueFunctionalityCategory : string = "";
        overDueFunctionalityFiledId : Number = 0;

        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        initPage(pluginConfig : any) {
            let that = this;
            that.renderHTML(pluginConfig);
            that.initiateByCategoryLabelData(pluginConfig);

             //Add a waiting spinning item
             let spinningWait = ml.UI.getSpinningWait("Please wait...");
             $("#waiting", that._root).append(spinningWait);

             $(".spinningWait", that._root).show();

             that.dateFilterEnablerMap.forEach((values,keys)=>{
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

        initiateDataSource(pluginConfig : any) {
            let that = this;
            let dataSources = pluginConfig.dataSources;

            let dataSourcePromises = [];

            let dashboardPluginSources: any[] = [];

            dataSources.forEach(dataSourceConfig => {
                if(dataSourceConfig.type == "Needles"){
                    let needleSourceCategory;
                    let needleSourceFieldId;
                    dataSourceConfig.sourceAtrributes.forEach(sourceAttribute => {
                        if(sourceAttribute.name == "category"){
                            needleSourceCategory = sourceAttribute.value;
                        }else if(sourceAttribute.name == "fieldId"){
                            needleSourceFieldId = sourceAttribute.value;
                        }
                    });
                    if(needleSourceCategory && needleSourceFieldId){
                        dataSourcePromises.push(Matrix.Labels.getNeedlesByCategoryAndFiledId(needleSourceCategory,
                            needleSourceFieldId));
                    }
                }else if(dataSourceConfig.type == "Labels"){
                    dataSourcePromises.push(Matrix.Labels.projectLabelHistory());
                }
            });

            Promise.all(dataSourcePromises).then(dataSourcePromisesResults => {

                dataSourcePromisesResults.forEach( dataSourcePromiseResult => {

                    if(dataSourcePromiseResult.length > 0 && that.instanceOfXRTrimNeedleItem(dataSourcePromiseResult[0])){
                        dashboardPluginSources.push({
                            "type" : "Needles",
                            "source" : dataSourcePromiseResult
                        })
                    }else if(dataSourcePromiseResult.length > 0 && that.instanceOfXRLabelEntry(dataSourcePromiseResult[0])){
                        dashboardPluginSources.push({
                            "type" : "Labels",
                            "source" : dataSourcePromiseResult
                        })
                    }

                });

                //To do: call function to fill all functionalities data with data soruces

            }).catch(() => {
                //Remove the spinning wait
                $(".spinningWait",that._root).hide();
            });

        }

        renderHTML(pluginConfig : any) {
            let that = this;

            const renderTemplateData : any = Commons.RenderTemplate.preparePluginHtmlTemplate(pluginConfig);

            that.pluginTableId = renderTemplateData.pluginTableId;

            that.allChartsMap = renderTemplateData.allChartsMap;

            that.dateFilterEnablerMap = renderTemplateData.dateFilterEnablerMap;

            that.currentTimeRangeSelected = renderTemplateData.currentTimeRangeSelected;

            renderTemplateData.dateRangeData.forEach(dateRangeItem => {

                //TODO call initiateDateRangeActions function
                //that.initiateDateRangeActions(dateRange,contentConfig.id);

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

            pluginCategories.forEach(cat => {

                if (ml.LabelTools.getLabelDefinitions([cat]).length > 0) {
                    let item = $(`<li class="cat" data-cat="${cat}"><a href="javascript:void(0)">${cat}</a></li>`).click(function () {
                        //TODO call renderCategoryWiseData after refactoring
                        //that.renderCategoryWiseData(cat);
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


        initiateByCategoryLabelData(pluginConfig : any){

            let that = this;
            let categoriesFunctionalities = pluginConfig.categoriesFunctionalities;

            categoriesFunctionalities.forEach(category => {

                let itemCurrentStateTableHeaders: any[] = ['Item'];
                let itemCurrentStateValues: ItemCurrentStateData[] = [];
                let groupByData: groupByObject[] = [];
                let groupByOperandsData: groupByOperandsObject[] = [];
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
                let operandsData: Map<string, operandObjectData> = new Map<string, operandObjectData>();

                category.functionalities.forEach(functionality => {

                    switch (functionality.type) {
                        case 'groupBy':
                            let groupWiseInitials = Array(functionality.labels.length).fill(0);
                            let groupByObject: groupByObject = {
                                id: functionality.id,
                                dataSourceType: functionality.dataSourceType,
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
                        case 'groupBy-operands':
                            functionality.labels.forEach((label,index) => {
                                    let labelsState : Map<string, Boolean> = new Map<string, Boolean>();
                                    functionality.expressionLabels[index].forEach(operandLabel => {
                                        labelsState.set(operandLabel,false);
                                    });
                                    let operandObjectData : operandObjectData =  {operand: label,
                                                                                  labelsState: labelsState
                                                                                 };
                                    operandsData.set(functionality.labelsDesc[index],operandObjectData);                                         
                                
                            });
                            let groupByoperandDataInitials = Array(functionality.labels.length).fill(0);
                            let groupByOperandsObject: groupByOperandsObject = {
                                id: functionality.id,
                                dataSourceType: functionality.dataSourceType,
                                renderChart: functionality.renderChart,
                                showInTable: functionality.showInTable,
                                tableHeader: functionality.tableHeader,
                                labels: functionality.labels,
                                labelsDesc: functionality.labelsDesc,
                                groupWiseData: [category.id + ' ' + functionality.title , ...groupByoperandDataInitials],
                                operandsData: operandsData
                            };
                            groupByOperandsData.push(groupByOperandsObject);
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break;    
                        case 'statusOverdue':
                        case 'groupByGapAnalysis':    
                        case 'groupByState':
                            let statusWiseData: any[] = [];

                            functionality.labelsDesc.forEach(labelDesc => {
                                statusWiseData.push([labelDesc, 0]);
                            });

                            let groupByStateObject: groupByStateObject = {
                                id: functionality.id,
                                dataSourceType: functionality.dataSourceType,
                                type: functionality.type,
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
                            }else if(functionality.type == "groupByState"){
                                groupByStateObject.openState = functionality.openStateLabel;
                                groupByStateOverdueData.push(groupByStateObject);
                                that.isOverDueFunctionalityEnabled = true;
                                that.overDueFunctionalityCategory = category.id;
                                that.overDueFunctionalityFiledId = functionality.overDueFieldId;
                            }else if(functionality.type == "groupByGapAnalysis"){
                                groupByStateData.push(groupByStateObject);
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
                                dataSourceType: functionality.dataSourceType,
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
                                dataSourceType: functionality.dataSourceType,
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
                                dataSourceType: functionality.dataSourceType,
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
                                dataSourceType: functionality.dataSourceType,
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
                                dataSourceType: functionality.dataSourceType,
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
                                //TODO call initiateDateRangeActions function
                                //that.initiateDateRangeActions(dateRange,functionality.id);
                            });
                            break;      
                    };     

                });

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: category.id,
                    groupByData: groupByData,
                    groupByOperandsData: groupByOperandsData,
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


        //copy button functionality
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

        //date filter functionalities
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
                                        //TODO call render functions
                                        //that.renderGroupByChart(groupByObject.labelsDesc,groupByObject.groupWiseData,groupByObject.id);
                                    }
                                });
                            }
                            break;
                        case 'groupByState':
                            if(byCategoryLabelData.groupByStateData.length > 0){
                                byCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
                                    if(dateFilterId == groupByStateObject.id){
                                        //TODO call render functions
                                        //that.renderGroupByStateChart(groupByStateObject.stateWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                                    }
                                });
                            }
                            break;
                        case 'statusOverdue':
                            if(byCategoryLabelData.groupByStateOverdueData.length > 0){
                                byCategoryLabelData.groupByStateOverdueData.forEach(groupByStateOverdueObject => {
                                    if(dateFilterId == groupByStateOverdueObject.id){
                                        //TODO call render functions
                                        //that.renderGroupByStateChart(groupByStateOverdueObject.stateWiseData,groupByStateOverdueObject.stateColors,groupByStateOverdueObject.id);
                                    }
                                });
                            }
                            break;    
                        case 'groupByStack':
                            if(byCategoryLabelData.groupByStackData.length > 0){
                                byCategoryLabelData.groupByStackData.forEach(groupByStackObject => {
                                    if(dateFilterId == groupByStackObject.id){
                                        //TODO call render functions
                                        //that.renderGroupByStackChart(groupByStackObject.groupByStackData,groupByStackObject.groupByCodesDesc,groupByStackObject.categoryDesc,groupByStackObject.groupByCodeColors,groupByStackObject.id);
                                    }
                                });
                            }
                            break;    
                        case 'avg':
                            if(byCategoryLabelData.avgData.length > 0){
                                byCategoryLabelData.avgData.forEach(avgObject => {
                                    if(dateFilterId == avgObject.id){
                                        //TODO call render functions
                                        //that.renderAvgChart(avgObject.stateDesc,avgObject.statusWiseAvgData,avgObject.id);
                                    }
                                });
                            }
                            break;
                        case 'closure':
                            if(byCategoryLabelData.closureData.length > 0){
                                byCategoryLabelData.closureData.forEach(closureObject => {
                                    if(dateFilterId == closureObject.id){
                                        //TODO call render functions
                                        //that.renderClosureChart(closureObject.closedItemsData,closureObject.closureTimeData,closureObject.id);
                                    }
                                });
                            }
                            break; 
                        case 'tracker':
                            if(byCategoryLabelData.trackerData.length > 0){
                                byCategoryLabelData.trackerData.forEach(trackerObject => {
                                    if(dateFilterId == trackerObject.id){
                                        //TODO call render functions
                                        //that.renderTrackerChart(trackerObject.stateDesc,trackerObject.stateTrackerData,trackerObject.stateColors,trackerObject.id);
                                    }
                                });
                            }
                            break; 
                        case 'table':
                            if(byCategoryLabelData.itemCurrentStateValues.length > 0){
                                //TODO call render functions
                                //that.renderPluginTable(byCategoryLabelData.itemCurrentStateTableHeaders,byCategoryLabelData.itemCurrentStateValues);
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
                        //TODO call render functions
                        //that.renderGroupByChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'groupByState':
                        //TODO call render functions
                        //that.renderGroupByStateChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;
                    case 'statusOverdue':
                        //TODO call render functions
                        //that.renderGroupByStateOverdueChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;    
                    case 'groupByStack':
                        //TODO call render functions
                        //that.renderGroupByStackChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;    
                    case 'closure':
                        //TODO call render functions
                        //that.renderClosureChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break; 
                    case 'tracker':
                        //TODO call render functions
                        //that.renderTrackerChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break; 
                    case 'dateRangeComapre':
                        //TODO call render functions
                        //that.renderDateRangeComapreDataByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break;      
                    case 'table':
                        //TODO call render functions
                        //that.renderPluginTableByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;  
                };
            });

        }

        
        processFunctionalitiesData(functionalityDataSources : any,pluginConfig : any){

            let that = this;

            for(const ByCategoryLabelData of this.ByCategoryLabelDetails){

                //process groupBy functionality
                ByCategoryLabelData.groupByData.forEach(groupByObject => {

                    let groupByObjectDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByObject.dataSourceType);

                    Commons.GenericFunctionalities.processGroupByObjectData(groupByObject,
                                                                            groupByObjectDataSource,
                                                                            that.dateFilterEnablerMap,
                                                                            ByCategoryLabelData.category,
                                                                            ByCategoryLabelData.itemCurrentStateTableHeaders,
                                                                            ByCategoryLabelData.itemCurrentStateValues
                                                                           );

                });

                //process groupBy-operands functionality
                ByCategoryLabelData.groupByOperandsData.forEach(groupByOperandsObject => {

                    let groupByOperandsDataSource = functionalityDataSources.find((functionalityDataSource) => functionalityDataSource.type === groupByOperandsObject.dataSourceType);

                    Commons.GenericFunctionalities.processGroupByOperandsData(groupByOperandsObject,
                                                                              groupByOperandsDataSource,
                                                                              ByCategoryLabelData.category
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