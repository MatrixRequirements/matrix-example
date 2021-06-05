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
    }

    interface ByCategoryLabelStatesDaysCountData {
        category: string;
        LabelStateDaysCountDetails: LabelStateDaysCountData[];
        itemStateCountChartData: any[];
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
        
                console.log("fromdate:"+$('#fromdate').val());
                console.log("todate:"+$('#todate').val());

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
                            let labelStatusSetData = {...labelStatusHistoryrecord.set};
                            let labelStatusFilteredSetData = labelStatusSetData.filter(statusSetRecord => {
                                let setDate = new Date(statusSetRecord.dateUser);
                                return (fromDate <= setDate && setDate <=toDate);
                            });
                            

                            let labelStatusReSetData = {...labelStatusHistoryrecord.reset};
                            let labelStatusFilteredReSetData = labelStatusReSetData.filter(statusReSetRecord => {
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

            console.log("selected cat:"+cat);

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

            let renderedChart = c3.generate(params)

            $("#CapaStatusCountChart svg").click(function(){   
                that.filterByLabel({type:""})
            });
            return;
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
                    <div class="panel-body">
                        <div id="CapaStatusCountChart" class="chart"></div>
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
    * Get the current state of an item
    * @param labelData Label data to process
    * @return state of item
    * @private
    */
    function getItemCurrentState(labels: XRLabelChange[]): string {
        
        let stateData : XRLabelChange;
        let currentState : string;

        //get closed state data
        currentState =  "CLOSED"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            return currentState;
        }

        //get checked state data
        currentState =  "CHECKED"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            return currentState;
        }

        //get wait state data
        currentState =  "WAIT"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            return currentState;
        }

        //get open state data
        currentState =  "OPEN"
        stateData = getStateData(labels, currentState);

        if(isItemCurrentState(stateData)){
            return currentState;
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
                itemStateCountChartData: [['OPEN',0],['WAIT',0],['CHECKED',0],['CLOSED',0]]
            };
            
            ByCategoryLabelStatesDaysCountDetails.push(ByCategoryLabelStatesDaysCountData)
         });


        //let LabelStateDaysCountDetails: LabelStateDaysCountData[] = [];
        for (const item of labels) {

            let itemCurrentState = getItemCurrentState(item.labels);

            let LabelStateDaysCountData: LabelStateDaysCountData = {
                id: item.itemRef,
                labels: [],
                currentState: itemCurrentState
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
                    ByCategoryData.LabelStateDaysCountDetails.push(LabelStateDaysCountData);
                    for (const chartItem of ByCategoryData.itemStateCountChartData) {
                        if(chartItem[0] == itemCurrentState){
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
