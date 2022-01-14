/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace GenericDashboard {

    export class GenericDashboard implements IPlugin {

        pluginConfig: any;

        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {

            if (!IC.getSettingJSON( "MSCO")) return [];

            this.pluginConfig = IC.getSettingJSON("MSCO");
        
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "MCSO",
                title: this.pluginConfig.title,
                folder: this.pluginConfig.folder,
                order: this.pluginConfig.order,
                icon: this.pluginConfig.icon,
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new GenericDashboardControl(options.control);
                    control.initPage();
                },
            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return this.pluginConfig.name;
        }

        getPluginVersion(): string {
            return this.pluginConfig.version;
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

        allChartsMap = new Map();

        dateFilterEnablerMap = new Map();

        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        pluginConfig: any = IC.getSettingJSON("MSCO");

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        initPage() {
            let that = this;
            that.renderHTML();
            that.initiateByCategoryLabelData();

            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Please wait...");
            $("#waiting", that._root).append(spinningWait);
 
            $(".spinningWait", that._root).show();
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

        renderCategoryWiseData(cat: string) {
            let that = this;

            if (cat == undefined) {
                return;
            }
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

            // let ByCategoryLabelData = this.ByCategoryLabelDetails
            //     .find(({ category }) => category === this.currentCat);

            // if(ByCategoryLabelData.groupByData.length > 0){
            //     ByCategoryLabelData.groupByData.forEach(groupByObject => {
            //         that.renderGroupByChart(groupByObject.labelsDesc,groupByObject.groupWiseData,groupByObject.id);
            //     });
            // }

            // if(ByCategoryLabelData.groupByStateData.length > 0){
            //     ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {
            //         that.renderGroupByStateChart(groupByStateObject.stateWiseData,groupByStateObject.stateColors,groupByStateObject.id);
            //     });
            // }

            // if(ByCategoryLabelData.avgData.length > 0){
            //     ByCategoryLabelData.avgData.forEach(avgObject => {
            //         that.renderAvgChart(avgObject.stateDesc,avgObject.statusWiseAvgData,avgObject.id);
            //     });
            // }

            // if(ByCategoryLabelData.closureData.length > 0){
            //     ByCategoryLabelData.closureData.forEach(closureObject => {
            //         that.renderClosureChart(closureObject.closedItemsData,closureObject.closureTimeData,closureObject.id);
            //     });
            // }

            // if(ByCategoryLabelData.trackerData.length > 0){
            //     ByCategoryLabelData.trackerData.forEach(trackerObject => {
            //         that.renderTrackerChart(trackerObject.stateDesc,trackerObject.stateTrackerData,trackerObject.stateColors,trackerObject.id);
            //     });
            // }


            // if(ByCategoryLabelData.itemCurrentStateValues.length > 0){
            //     that.renderPluginTable(ByCategoryLabelData.itemCurrentStateTableHeaders,ByCategoryLabelData.itemCurrentStateValues);
            // }
            
        }
    }
}

// Register the plugin
$(function () {
    plugins.register(new GenericDashboard.GenericDashboard());
});