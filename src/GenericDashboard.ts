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
        labels: any[];
        labelsDesc: any[];
        groupWiseData: any[]
    }

    interface groupByStateObject {
        id: string;
        stateCodes: any[];
        stateDesc: any[];
        stateColors: any[];
        stateWiseInitialData: any[];
        stateWiseData: any[]
    }

    interface avgObject {
        id: string;
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
        labels: any[];
        values: any[];
    }

    interface ByCategoryLabelData {
        category: string;
        groupByData: groupByObject[];
        groupByStateData: groupByStateObject[];
        avgData: avgObject[];
        closureData: closureObject[];
        trackerData: trackerObject[];
        itemCurrentStateDetails: ItemCurrentStateData[];
    }

    class GenericDashboardControl extends BaseControl {

        currentCat: string = "";

        pluginTableId: string = "";

        ByCategoryLabelDetails: ByCategoryLabelData[] = [];

        pluginConfig: any = IC.getSettingJSON("MSCO");

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
            that.initiateByCategoryLabelData();

             //Add a waiting spinning item
             let spinningWait = ml.UI.getSpinningWait("Please wait...");
             $("#waiting", that._root).append(spinningWait);
 
             $(".spinningWait", that._root).show();

             //TODO date filter and copy button

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

        initiateByCategoryLabelData(){

            let that = this;
            let categoriesFunctionalities = that.pluginConfig.categoriesFunctionalies;

            categoriesFunctionalities.forEach(category => {

                let itemCurrentStateDetails: ItemCurrentStateData[] = [];
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
                                labels: functionality.labels,
                                labelsDesc: functionality.labelsDesc,
                                groupWiseData: [category.id + ' ' + functionality.title , ...groupWiseInitials]
                            };
                            groupByData.push(groupByObject);
                            break;
                        case 'groupByState':
                            let statusWiseData: any[] = [];

                            functionality.labelsDesc.forEach(labelDesc => {
                                statusWiseData.push([labelDesc, 0]);
                            });

                            let groupByStateObject: groupByStateObject = {
                                id: functionality.id,
                                stateCodes: functionality.labels,
                                stateDesc: functionality.labelsDesc,
                                stateColors: functionality.labelColors,
                                stateWiseInitialData: JSON.parse(JSON.stringify(statusWiseData)),
                                stateWiseData: JSON.parse(JSON.stringify(statusWiseData))
                            };

                            groupByStateData.push(groupByStateObject);

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
                                allStateCodes: functionality.allLabels,
                                allStateDesc: functionality.allLabelDesc,
                                closedItemsData: closedItemsData,
                                closureTimeData: [category.id + ' ' + functionality.title],
                                intialState: functionality.initialSateLabel,
                                closedState: functionality.closedStateLabel,
                                rejectedState: functionality.rejectedStateLabel
                            };

                            closureData.push(closureObject);

                            break; 
                        case 'tracker':
                            let stateTrackerData: any[] = [['x']];

                            functionality.labelsDesc.forEach(labelDesc => {
                                stateTrackerData.push([labelDesc]);
                            });

                            let trackerObject: trackerObject = {
                                id: functionality.id,
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
                    itemCurrentStateDetails: itemCurrentStateDetails
                }

                this.ByCategoryLabelDetails.push(ByCategoryLabelData);
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

        renderCategoryWiseData(cat: string) {

            if (cat == undefined) {
                return;
            }
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);
        }

        preparePluginHtmlTemplate() {
            let that = this;

            let genericDomStyle = that.pluginConfig.layoutDomStyle;

            let waitElementDom = `
                <div  style="margin:10px;">
                    <div class="row" id="waiting" class="spinningWait"></div>
                </div>
            `;

            let genericChartRowDom = "";

            let genericTableRowDom = "";

            if(that.pluginConfig.layoutConfig && that.pluginConfig.layoutConfig.length > 0){
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
                                                                <thead id="${contentConfig.id}TableHeader">
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

                            chartRowDom = `<div class="row doNotCopy">${chartColumnsDom}</div>`;
                            tableRowDom = tableColumnsDom
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

                for (const label of item.labels) {

                    //process groupBy functionality
                    if(ByCategoryLabelData.groupByData.length > 0){
                        ByCategoryLabelData.groupByData.forEach(groupByObject => {
                            let labelIndex = groupByObject.labels.findIndex(labelCode => labelCode === label.label);

                            if(labelIndex > -1 && (label.reset.length !== label.set.length)){
                                groupByObject.groupWiseData[labelIndex + 1] += 1;
                                //TODO item current state
                                //itemCurrentStateData.department = ByCategoryLabelData.displayDepartments[deptIndex];
                            }
                        });
                    }

                    //process groupByState functionality
                    if(ByCategoryLabelData.groupByStateData.length > 0){
                        ByCategoryLabelData.groupByStateData.forEach(groupByStateObject => {

                            let stateIndex = groupByStateObject.stateCodes.findIndex(stateCode => stateCode === label.label);

                            if(stateIndex > -1){
                                if((label.reset.length !== label.set.length) && itemCurrentSateIndex < 0){
                                    groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                    itemCurrentSateIndex = stateIndex;
                                    //TODO item current state
                                    // itemCurrentStateData.currentState = ByCategoryLabelData.stateDesc[stateIndex];
                                    // itemCurrentStateData.currentStateSetDate = this.getCurrentStateSetDate(label);
                                }else if((label.reset.length !== label.set.length) && stateIndex > itemCurrentSateIndex) {
                                    groupByStateObject.stateWiseData[itemCurrentSateIndex][1] -= 1;
                                    groupByStateObject.stateWiseData[stateIndex][1] += 1;
                                    itemCurrentSateIndex = stateIndex;
                                    //TODO item current state
                                    // itemCurrentStateData.currentState = ByCategoryLabelData.stateDesc[stateIndex];
                                    // itemCurrentStateData.currentStateSetDate = this.getCurrentStateSetDate(label);
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
                                //TODO item current state
                                // initalStateData[0].set.sort((a, b) => a.version - b.version);
                                // let intiatedDate = new Date(initalStateData[0].set[0].dateIso);
                                // itemCurrentStateData.InitiatedDate = intiatedDate;
                            }
    
                            if(stateIndex == closedStateIndex){
                                closeStateData.push(label);
                            }

                            //TODO item current state
                            // let itemStateDaysCount :ItemStateDaysCount = {
                            //     state: ByCategoryLabelData.stateDesc[stateIndex],
                            //     days: labelstateDaysCount
                            // };
    
                            // itemCurrentStateData.itemStateDaysCountData.push(itemStateDaysCount);

                            if(label.reset.length == label.set.length){
                                let avgStateIndex = avgObject.stateCodes.findIndex(stateCode => stateCode === label.label);
                                if(avgStateIndex > -1){
                                    avgObject.statusWiseTotalDaysData[avgStateIndex][0] += labelstateDaysCount;
                                    avgObject.statusWiseTotalDaysData[avgStateIndex][1] += 1;
                                }
                            }
                        });
                    }

                    //process tracker functionality
                    if(ByCategoryLabelData.trackerData.length > 0){
                        ByCategoryLabelData.trackerData.forEach(trackerObject => {

                            let stateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === label.label);
                            if(stateIndex > -1 && (label.reset.length !== label.set.length)){
                                itemCurrentSateIndex = stateIndex;
                            }

                            closedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.closedState);
                            rejectedStateIndex = trackerObject.allStateCodes.findIndex(stateCode => stateCode === trackerObject.rejectedState);

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

                            //TODO item current state
                            // itemCurrentStateData.InitiatedDate = intiatedDate;
                            // itemCurrentStateData.ClosedDate = colosedDate;


                            let time_difference = colosedDate.getTime() - intiatedDate.getTime();

                            //calculate days difference by dividing total milliseconds in a day  
                            let days_difference = time_difference / (1000 * 60 * 60 * 24);

                            let daystoCloseItem = Math.floor(days_difference);

                            //TODO item current state
                            //itemCurrentStateData.openToCloseDays = daystoCloseItem;

                            //process closure functionality
                            if(ByCategoryLabelData.closureData.length > 0){
                                ByCategoryLabelData.closureData.forEach(closureObject => {
                                    closureObject.closedItemsData.push(item.itemRef);
                                    closureObject.closureTimeData.push(daystoCloseItem);
                                });
                            }

                            //process avg functionality
                            if(ByCategoryLabelData.avgData.length > 0){
                                ByCategoryLabelData.avgData.forEach(avgObject => {
                                    let closureTimeLabelIndex = avgObject.stateDesc.length;

                                    if(closureTimeLabelIndex <=0){
                                        closureTimeLabelIndex = 1;
                                    }

                                    avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][0] += daystoCloseItem;
                                    avgObject.statusWiseTotalDaysData[closureTimeLabelIndex-1][1] += 1;
                                });
                            }
                        }
                    }
                }

                //TODO current state
                //ByCategoryLabelData.itemCurrentStateDetails.push(itemCurrentStateData);
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

        }

    }
}

// Register the plugin
$(function () {
    plugins.register(new GenericDashboard.GenericDashboard());
});