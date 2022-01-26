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
    }

    interface groupByStateObject {
        id: string;
        renderChart: string;
        showInTable: string;
        tableHeader: string;
        stateCodes: any[];
        stateDesc: any[];
        stateColors: any[];
        stateWiseInitialData: any[];
        stateWiseData: any[];
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
        avgData: avgObject[];
        closureData: closureObject[];
        trackerData: trackerObject[];
        itemCurrentStateTableHeaders: any[];
        itemCurrentStateValues: ItemCurrentStateData[];
    }

    class GenericDashboardControl extends BaseControl {

        pluginTableId: string = "";

        currentCat: string = "";

        currentFilter: string = "";

        allChartsMap = new Map();

        dateFilterEnablerMap = new Map();

        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        pluginConfig: any = {};

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

                                            if(columnConfig.contentType == "chart"){
                                                dateFilterClass = "dateFilter";
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
                                     
                                    if(columnConfig.contentType == "chart"){
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
                let avgData: avgObject[] = [];
                let closureData: closureObject[] = [];
                let trackerData: trackerObject[] = [];

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
                                groupWiseData: [category.id + ' ' + functionality.title , ...groupWiseInitials]
                            };
                            groupByData.push(groupByObject);
                            itemCurrentStateTableHeaders.push(functionality.tableHeader);
                            break;
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
                                stateWiseInitialData: JSON.parse(JSON.stringify(statusWiseData)),
                                stateWiseData: JSON.parse(JSON.stringify(statusWiseData))
                            };

                            groupByStateData.push(groupByStateObject);
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
                                rejectedState: functionality.rejectedStateLabel
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
                                rejectedState: functionality.rejectedStateLabel
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
                                rejectedState: functionality.rejectedStateLabel
                            };

                            trackerData.push(trackerObject);
                            
                            functionality.allLabelDesc.forEach(lableDesc => {
                                itemCurrentStateTableHeaders.push(lableDesc);
                            });

                            break;    
                    };     

                });

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: category.id,
                    groupByData: groupByData,
                    groupByStateData: groupByStateData,
                    avgData: avgData,
                    closureData: closureData,
                    trackerData: trackerData,
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
                    case 'closure':
                        that.renderClosureChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break; 
                    case 'tracker':
                        that.renderTrackerChartByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData, dateFilterId);
                        break; 
                    case 'table':
                        that.renderPluginTableByDateRanges(fromDateSelected, toDateSelected, byCategoryLabelData);
                        break;           
                };
            });

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

        renderGroupByChartByDateRanges(fromDateVal: any, toDateVal: any, byCategoryLabelData: ByCategoryLabelData, groupId: String) {

            let fromDate = new Date(fromDateVal);
            let toDate = new Date(toDateVal);

            if(byCategoryLabelData.groupByData.length > 0){
                byCategoryLabelData.groupByData.forEach(groupByObject => {

                    if(groupByObject.id == groupId){

                        let groupWiseInitials = Array(groupByObject.labels.length).fill(0);
                        let groupWiseData =  [ groupByObject.groupWiseData[0] , ...groupWiseInitials];

                        byCategoryLabelData.itemCurrentStateValues.forEach(
                            (itemCurrentStateData) => {

                                if(itemCurrentStateData.InitiatedDate && 
                                    (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                                        let headerIndex = byCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByObject.tableHeader);
                                        let groupByLabelIndex = groupByObject.labelsDesc.findIndex(labelDesc => labelDesc === itemCurrentStateData.tableValues[headerIndex]);
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

                        byCategoryLabelData.itemCurrentStateValues.forEach(
                            (itemCurrentStateData) => {
                                if(itemCurrentStateData.InitiatedDate && 
                                    (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){

                                        let headerIndex = byCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                        let groupByStateLabelIndex = groupByStateObject.stateDesc.findIndex(labelDesc => labelDesc === itemCurrentStateData.tableValues[headerIndex]);
                                        statusWiseData[groupByStateLabelIndex][1] += 1;

                                }
                        });

                        this.renderGroupByStateChart(statusWiseData,groupByStateObject.stateColors,groupByStateObject.id);
                        
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

                        byCategoryLabelData.itemCurrentStateValues.forEach(
                            (itemCurrentStateData) => {
                            if(itemCurrentStateData.ClosedDate && 
                                (itemCurrentStateData.ClosedDate >= fromDate && itemCurrentStateData.ClosedDate <= toDate)){ 
                                   
                                    let headerIndex = byCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === closureObject.tableHeader);
                                    closedItemsData.push(itemCurrentStateData.id);
                                    closureTimeData.push(itemCurrentStateData.tableValues[headerIndex]);

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

                        byCategoryLabelData.itemCurrentStateValues.forEach(
                           (itemCurrentStateData) => {
                                if(itemCurrentStateData.InitiatedDate && itemCurrentStateData.currentState !== trackerObject.closedState
                                 && (itemCurrentStateData.InitiatedDate >= fromDate && itemCurrentStateData.InitiatedDate <= toDate)){
                                    stateTrackerData[0].push(itemCurrentStateData.id);
                                    trackerObject.stateDesc.forEach(
                                        (trackState, stateIndex) => {
                                            let headerIndex = byCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === trackState);
                                            let stateDays = itemCurrentStateData.tableValues[headerIndex];
                                            stateTrackerData[stateIndex +1].push(stateDays);
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
                let itemCurrentSateIndex = -1;
                let initialStateIndex = -1;
                let closedStateIndex = -1;
                let rejectedStateIndex = -1;
                let itemIndex = -1;
                let labelstateDaysCount;

                let initalStateData = [];
                let closeStateData = [];

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
                            }
                        });
                    }

                    //process groupByState functionality
                    if(ByCategoryLabelData.groupByStateData.length > 0){
                        ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {

                            let stateIndex = groupByStateObject.stateCodes.findIndex(stateCode => stateCode === label.label);

                            if(stateIndex > -1){
                                if((label.reset.length !== label.set.length) && itemCurrentSateIndex < 0){
                                    if(groupByStateObject.renderChart == 'Y'){
                                        groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                    }
                                    itemCurrentSateIndex = stateIndex;
                                    itemCurrentStateData.currentState = label.label;
                                    if(groupByStateObject.showInTable == 'Y'){
                                        let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                        itemCurrentStateData.tableValues[headerIndex] = groupByStateObject.stateDesc[stateIndex];
                                        itemCurrentStateData.attributes.push(groupByStateObject.stateDesc[stateIndex]);
                                    }
                                }else if((label.reset.length !== label.set.length) && stateIndex > itemCurrentSateIndex) {
                                    if(groupByStateObject.renderChart == 'Y'){
                                        groupByStateObject.stateWiseData[itemCurrentSateIndex][1] -= 1;
                                        groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                    }
                                    itemCurrentSateIndex = stateIndex;
                                    itemCurrentStateData.currentState = label.label;
                                    if(groupByStateObject.showInTable == 'Y'){
                                        let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === groupByStateObject.tableHeader);
                                        itemCurrentStateData.tableValues[headerIndex] = groupByStateObject.stateDesc[stateIndex];
                                        itemCurrentStateData.attributes.push(groupByStateObject.stateDesc[stateIndex]);
                                    }
                                }   
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
                                itemCurrentSateIndex = stateIndex;
                            }

                            initialStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.intialState);
                            closedStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.closedState);
                            rejectedStateIndex = avgObject.allStateCodes.findIndex(stateCode => stateCode === avgObject.rejectedState);

                            if(stateIndex == initialStateIndex){
                                initalStateData.push(label);
                                initalStateData[0].set.sort((a, b) => a.version - b.version);
                                let intiatedDate = new Date(initalStateData[0].set[0].dateIso);
                                itemCurrentStateData.InitiatedDate = intiatedDate;
                            }
    
                            if(stateIndex == closedStateIndex){
                                closeStateData.push(label);
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

                    // //process tracker functionality
                    if(ByCategoryLabelData.trackerData.length > 0){
                        ByCategoryLabelData.trackerData.forEach(trackerObject => {

                            let stateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === label.label);
                            if(stateIndex > -1 && (label.reset.length !== label.set.length)){
                                itemCurrentSateIndex = stateIndex;
                                itemCurrentStateData.currentState = label.label;
                            }

                            closedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.closedState);
                            rejectedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.rejectedState);

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

                if(ByCategoryLabelData.trackerData.length > 0) {

                    if( (itemCurrentSateIndex == closedStateIndex)
                        || (itemCurrentSateIndex == rejectedStateIndex)
                    ){
                        ByCategoryLabelData.trackerData.forEach(trackerObject => {
                            trackerObject.stateTrackerData = trackerObject.stateTrackerInitialData;
                        });
                    }

                }
               

                if( (ByCategoryLabelData.avgData.length > 0) 
                    || (ByCategoryLabelData.closureData.length > 0)
                ){
                    if(itemCurrentSateIndex == closedStateIndex){

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

                            let daysToCloseItem = Math.floor(days_difference);

                            //process closure functionality
                            if(ByCategoryLabelData.closureData.length > 0){
                                ByCategoryLabelData.closureData.forEach(closureObject => {
                                    if(closureObject.renderChart == 'Y'){
                                        closureObject.closedItemsData.push(item.itemRef);
                                        closureObject.closureTimeData.push(daysToCloseItem);
                                    }

                                    if(closureObject.showInTable == 'Y'){
                                        let headerIndex = ByCategoryLabelData.itemCurrentStateTableHeaders.findIndex(header => header === closureObject.tableHeader);
                                        itemCurrentStateData.tableValues[headerIndex] = daysToCloseItem;
                                    }
                                });
                            }

                            //process avg functionality
                            if(ByCategoryLabelData.avgData.length > 0){
                                ByCategoryLabelData.avgData.forEach(avgObject => {
                                    if(avgObject.renderChart == 'Y'){
                                        // let closureTimeLabelIndex = avgObject.stateDesc.length;

                                        // if(closureTimeLabelIndex <=0){
                                        //     closureTimeLabelIndex = 1;
                                        // }
                                        let closureTimeLabelIndex = avgObject.statusWiseTotalDaysData.length;
                                        
                                        avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][0] += daysToCloseItem;
                                        avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][1] += 1;
                                    }
                                });
                            }
                        }
                    }
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