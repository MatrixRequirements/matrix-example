/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace MCapaStatusDashboard {
    export class MCapaStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {

            //if (!IC.getSettingJSON( "MSCO")) return [];
        
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "MCSO",
                title: "CAPA Status Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-chart-bar",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new MCapaStatusDashboardControl(options.control);
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
            return "1.1.0";
        }
    }

    interface ByCategoryLabelData {
        category: string;
        departments: any[];
        displayDepartments: any[];
        categories: any[];
        displayCategories: any[];
        stateCodes: any[];
        stateDesc: any[];
        trackerStates: any[];
        deptWiseData: any[];
        categoryWiseData: any[];
        statusWiseData: any[];
        statusWiseLegendColors: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        stateTrackerData: any[];
        stateTrackerLegendColors: any[];
        closedState: string;
    }

   
    class MCapaStatusDashboardControl extends BaseControl {

        currentCat: string = "";
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        DeptWiseoverviewChart: c3.ChartAPI;
        CatWiseoverviewChart: c3.ChartAPI;
        StatusWiseoverviewChart: c3.ChartAPI;
        AvgTimeWiseoverviewChart: c3.ChartAPI;
        CapaTrackerChart: c3.ChartAPI;


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


            setTimeout(o => that.installCopyButtons("CAPA Status Overview"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                console.log("Check the result");
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

        installCopyButtons(title: string) {
            let that = this;
            
            let savedWidth = 0;
    
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


            ml.UI.copyBuffer($("#StatusWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#StatusWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#StatusWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#StatusWiseoverviewChart svg",this._root).width();
                that.StatusWiseoverviewChart.resize({width:590});
            },()=>{
                that.StatusWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#AvgTimeWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#AvgTimeWiseoverviewChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#AvgTimeWiseChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#AvgTimeWiseoverviewChart svg",this._root).width();
                that.AvgTimeWiseoverviewChart.resize({width:590});
            },()=>{
                that.AvgTimeWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#CapaTrackerChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CapaTrackerChart)"), this._root, (copied: JQuery) => {
                let title_ = $("#CapaTrackerChartTitle",this._root).text();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CapaTrackerChart svg",this._root).width();
                that.CapaTrackerChart.resize({width:590});
            },()=>{
                that.CapaTrackerChart.resize({width:savedWidth})
            });
        }

        renderByDeptChart(departments,deptWiseData){
             //prepare template
             let byDeptChartparams: c3.ChartConfiguration = {
                bindto: '#DeptWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', ...departments],
                        deptWiseData
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

        renderByCatChart(categories,categoryWiseData){
            //prepare template
            let byCatChartparams: c3.ChartConfiguration = {
               bindto: '#CatWiseoverviewGraph',
               data: {
                x : 'x',
                columns: [
                    ['x', ...categories],
                    categoryWiseData
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

       renderByStatusChart(statusWiseData,legendColors){
            //prepare template
            let byStatusChartparams: c3.ChartConfiguration = {
                bindto: '#StatusWiseoverviewGraph',
                data: {
                    columns: statusWiseData,
                    type : 'pie'
                },
                color: {
                    pattern: legendColors
                }
            };

            //prepare chart config and render
            $("#StatusWiseoverviewChart div").remove();

            $("#StatusWiseoverviewChart").append("<div id='StatusWiseoverviewGraph'>");

            this.StatusWiseoverviewChart = c3.generate(byStatusChartparams);
            //this.charts.push(renderedChart);
        }

        renderByAvgTimeChart(states,statusWiseAvgData){
            //prepare template
            let byAvgTimeChartparams: c3.ChartConfiguration = {
                bindto: '#AvgTimeWiseoverviewGraph',
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
            $("#AvgTimeWiseoverviewChart div").remove();

            $("#AvgTimeWiseoverviewChart").append("<div id='AvgTimeWiseoverviewGraph'>");

            this.AvgTimeWiseoverviewChart = c3.generate(byAvgTimeChartparams);
            //this.charts.push(renderedChart);
        }

        renderTrackerChart(trackerStates,stateTrackerData,legendColors){
            //prepare template
            let trackerChartparams: c3.ChartConfiguration = {
                bindto: '#CapaTrackerGraph',
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
                    pattern: legendColors
                },
                axis: {
                    x: {
                        type: 'category'
                    },
                    rotated: true
                }
            };

            //prepare chart config and render
            $("#CapaTrackerChart div").remove();

            $("#CapaTrackerChart").append("<div id='CapaTrackerGraph'>");

            this.CapaTrackerChart = c3.generate(trackerChartparams);
            //this.charts.push(renderedChart);
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

            let capaCategories = categories.filter(cat => cat == "CA" || cat == "PA");

            capaCategories.forEach(cat => {

                 let departments: any[] = [];
                 let displayDepartments: any[] = [];
                 let categories: any[] = [];
                 let displayCategories: any[] = [];
                 let stateCodes: any[] = [];
                 let stateDesc: any[];
                 let trackerStates: any[];
                 let deptWiseInitials: any[] = [];
                 let catWiseInitials: any[] = [];
                 let SateWiseAvgInitials: any[] = [];
                 let statusWiseData: any[] = [];
                 let statusWiseLegendColors: any[];
                 let stateTrackerData: any[] = [];
                 let stateTrackerLegendColors: any[];
                 let statusWiseTotalDaysData: any[] = [];
                 let closedState;
                 
                // let departments_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;
                departments = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;
                categories = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "CAPA Category")[0].labels;
    
                departments.forEach(dept => {
                    let deptDispName = new LabelTools().getDisplayName(dept);
                    displayDepartments.push(deptDispName);
                });

                categories.forEach(cat => {
                    let catDispName = new LabelTools().getDisplayName(cat);
                    displayCategories.push(catDispName);
                });

                deptWiseInitials = Array(departments.length).fill(0);
                catWiseInitials = Array(categories.length).fill(0);

                let states_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == cat)[0].labels;

                if(cat === "CA"){

                    stateCodes = states_.sort();
                    stateDesc =  ['Initiated','Approved','RC Approved', 'WFEC','Closed'];
                    trackerStates = ['Initiated','Approved','RC Approved', 'WFEC'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0],[0,0]];
                    closedState = "AN5";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['WFEC', 0],
                        ['Closed', 0]
                    ];

                    statusWiseLegendColors = ['#d62728', '#ff7f0e', '#9467bd','#1f77b4', '#2ca02c'];


                    stateTrackerData = [
                        ['x'],
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved'],
                        ['WFEC']
                    ];

                    stateTrackerLegendColors = ['#d62728', '#ff7f0e', '#9467bd','#1f77b4'];

                }else{

                    stateCodes = states_;
                    stateDesc =  ['Initiated','Approved','RC Approved','Closed'];
                    trackerStates = ['Initiated','Approved','RC Approved'];
                    SateWiseAvgInitials = Array(stateDesc.length).fill(0);
                    statusWiseTotalDaysData = [[0,0],[0,0],[0,0],[0,0]];
                    closedState = "PAC";

                    statusWiseData = [
                        ['Initiated', 0],
                        ['Approved', 0],
                        ['RC Approved', 0],
                        ['Closed', 0]
                    ];

                    statusWiseLegendColors = ['#d62728', '#ff7f0e', '#9467bd', '#2ca02c'];

                    stateTrackerData = [
                        ['x'],
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved']
                    ];

                    stateTrackerLegendColors = ['#d62728', '#ff7f0e', '#9467bd'];

                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    departments: departments,
                    displayDepartments: displayDepartments,
                    categories: categories,
                    displayCategories: displayCategories,
                    stateCodes: stateCodes,
                    stateDesc: stateDesc,
                    trackerStates: trackerStates,
                    deptWiseData: [cat + ' count by department', ...deptWiseInitials],
                    categoryWiseData: [cat + ' count by category', ...catWiseInitials],
                    statusWiseData: statusWiseData,
                    statusWiseLegendColors: statusWiseLegendColors,
                    statusWiseTotalDaysData: statusWiseTotalDaysData,
                    statusWiseAvgData: [cat + ' average time spent in state', ...SateWiseAvgInitials],
                    stateTrackerData: stateTrackerData,
                    stateTrackerLegendColors: stateTrackerLegendColors,
                    closedState: closedState
                };
    
                this.ByCategoryLabelDetails.push(ByCategoryLabelData)

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

        }

        renderCategoryWiseData(cat: string) {

            if (cat == undefined) {
                return;
            }
            if (cat == "")
                cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();

            this.currentCat = cat;

            $("#selectedCat", this._root).text(cat);

            let ByCategoryLabelData = this.ByCategoryLabelDetails
                .find(({ category }) => category === this.currentCat);

            this.renderByDeptChart(ByCategoryLabelData.displayDepartments,ByCategoryLabelData.deptWiseData);
            this.renderByCatChart(ByCategoryLabelData.displayCategories,ByCategoryLabelData.categoryWiseData);
            this.renderByStatusChart(ByCategoryLabelData.statusWiseData,ByCategoryLabelData.statusWiseLegendColors);
            this.renderByAvgTimeChart(ByCategoryLabelData.stateDesc,ByCategoryLabelData.statusWiseAvgData);
            this.renderTrackerChart(ByCategoryLabelData.trackerStates,ByCategoryLabelData.stateTrackerData,ByCategoryLabelData.stateTrackerLegendColors);

        }

        processLabelsData(labels: XRLabelEntry[]){

            let capaCategories = ['CA','PA'];
            for (const item of labels) {

                let itemCategory: string = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory && (!capaCategories.includes(itemCategory))){
                    continue;
                }

                let ByCategoryLabelData: ByCategoryLabelData;
                let itemIndex = -1;
                let itemCurrentSateIndex = -1;

                for (const ByCategoryData of this.ByCategoryLabelDetails) {
                    if (itemCategory == ByCategoryData.category) {
                        ByCategoryLabelData = ByCategoryData;
                        break;
                    }
                }

                //let initialStateTrackerData = {...ByCategoryLabelData.stateTrackerData};
                let initialStateTrackerData = JSON.parse(JSON.stringify(ByCategoryLabelData.stateTrackerData));
                let closedStateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === ByCategoryLabelData.closedState);

                for (const label of item.labels) {
                    //check for item department
                    let deptIndex = ByCategoryLabelData.departments.findIndex(dept => dept === label.label);

                    if(deptIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.deptWiseData[deptIndex + 1] += 1;
                    }

                    let catIndex = ByCategoryLabelData.categories.findIndex(cat => cat === label.label);

                    if(catIndex > -1 && (label.reset.length !== label.set.length)){
                        ByCategoryLabelData.categoryWiseData[catIndex + 1] += 1;
                    }

                    let stateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === label.label);

                    if(stateIndex > -1){
                        //check for current state
                        if((label.reset.length !== label.set.length) && itemCurrentSateIndex < 0){
                            ByCategoryLabelData.statusWiseData[stateIndex][1] += 1;
                            itemCurrentSateIndex = stateIndex;
                        }else if((label.reset.length !== label.set.length) && stateIndex > itemCurrentSateIndex) {
                            ByCategoryLabelData.statusWiseData[itemCurrentSateIndex][1] -= 1;
                            ByCategoryLabelData.statusWiseData[stateIndex][1] += 1;
                            itemCurrentSateIndex = stateIndex;
                        }

                         //get the number of days label state was in
                        label.set.sort((a, b) => a.version - b.version);
                        label.reset.sort((a, b) => a.version - b.version);

                        const labelstateDaysCount = label.set.reduce((accumulator, currentValue, currentIndex, set) => {
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

                        ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][0] += labelstateDaysCount;
                        ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][1] += 1;

                        //check if state is closed or not  
                        if((stateIndex !== closedStateIndex) && (itemCurrentSateIndex !== closedStateIndex)){ 
                            //update state tracker
                            if(itemIndex > -1){
                                ByCategoryLabelData.stateTrackerData[stateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                            }else{
                                ByCategoryLabelData.stateTrackerData[0].push(item.itemRef);
                                itemIndex = ByCategoryLabelData.stateTrackerData[0].length - 2;
                                for (let i = 0; i <= ByCategoryLabelData.trackerStates.length - 1; i++) {
                                    ByCategoryLabelData.stateTrackerData[i + 1].push(0);
                                }
                                ByCategoryLabelData.stateTrackerData[stateIndex + 1][itemIndex + 1] = labelstateDaysCount;
                            }
                        }else{
                            ByCategoryLabelData.stateTrackerData = initialStateTrackerData;
                        }    
                    }
                } 
            }

            for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
                ByCategoryLabelData.statusWiseTotalDaysData.forEach((element,index) => {
                    let avgData = 0;
                    if(element[1] !== 0){
                        avgData = element[0]/element[1]
                    }
                    ByCategoryLabelData.statusWiseAvgData[index + 1] = avgData;
                });
            }

            // for(const ByCategoryLabelData of this.ByCategoryLabelDetails){
            //     console.log("category:"+ByCategoryLabelData.category);
            //     console.log("departments:"+ByCategoryLabelData.departments);
            //     console.log("displayDepartments:"+ByCategoryLabelData.displayDepartments);
            //     console.log("categories:"+ByCategoryLabelData.categories);
            //     console.log("displayCategories:"+ByCategoryLabelData.displayCategories);
            //     console.log("department wise:"+JSON.stringify(ByCategoryLabelData.deptWiseData));
            //     console.log("categorie wise:"+JSON.stringify(ByCategoryLabelData.categoryWiseData));
            //     console.log("state codes:"+JSON.stringify(ByCategoryLabelData.stateCodes));
            //     console.log("state wise:"+JSON.stringify(ByCategoryLabelData.statusWiseData));
            //     console.log("trackerStates:"+JSON.stringify(ByCategoryLabelData.trackerStates));
            //     console.log("state TrackerData:"+JSON.stringify(ByCategoryLabelData.stateTrackerData));
            //     console.log("status Wise TotalDaysData:"+JSON.stringify(ByCategoryLabelData.statusWiseTotalDaysData));
            //     console.log("status Wise AvgData:"+JSON.stringify(ByCategoryLabelData.statusWiseAvgData));
            // }
        }

        
        // HTML template
        ExampleHTMLDom = `
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
            min-height: 900px;
            cursor:pointer;
        }
        </style>

        <div  style="margin:10px;">
            <div class="row" id="waiting" class="spinningWait">

            </div>
        </div>

        <div id="MCSOContent" class="" style="margin:10px;" >
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

            <div class="row doNotCopy"> 
                <div class="col-lg-6 ">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="StatusWiseChartTitle">Status wise CAPA count overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="StatusWiseoverviewChart" class="chart"></div>
                        </div>
                    </div>
                </div>
                <div  class="col-lg-6">
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="AvgTimeWiseChartTitle">Average time state wise overview</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="AvgTimeWiseoverviewChart" class="chart" ></div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="row doNotCopy">
                <div class="col-lg-12"> 
                    <div class="panel panel-default">
                        <div class="panel-heading">
                            <h3 class="panel-title" id="CapaTrackerChartTitle">CAPA tracker</h3>
                        </div>
                        <div class="panel-body">
                            <div class='copyTitle'> </div>
                            <div id="CapaTrackerChart" class="bigChart"></div>
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
    plugins.register(new MCapaStatusDashboard.MCapaStatusDashboard());
});
