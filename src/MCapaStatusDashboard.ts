/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace MCapaStatusDashboard {
    export class MCapaStatusDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "MCSO",
                title: "MCAPA Status Overview",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
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
            return "MCAPA Status Overview";
        }

        getPluginVersion(): string {
            return "0.0.1";
        }
    }

    interface ByCategoryLabelData {
        category: string;
        departments: any[];
        categories: any[];
        stateCodes: any[];
        stateDesc: any[];
        trackerStates: any[];
        deptWiseData: any[];
        categoryWiseData: any[];
        statusWiseData: any[];
        statusWiseTotalDaysData: any[];
        statusWiseAvgData: any[];
        stateTracketData: any[];
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


            setTimeout(o => that.installCopyButtons("MCAPA Status Overview"), 10);

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

       renderByStatusChart(statusWiseData){
                //prepare template
                let byStatusChartparams: c3.ChartConfiguration = {
                bindto: '#StatusWiseoverviewGraph',
                data: {
                    columns: statusWiseData,
                    type : 'pie'
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

        renderTrackerChart(trackerStates,stateTracketData){
            //prepare template
            // let trackerChartparams: c3.ChartConfiguration = {
            //     bindto: '#CapaTrackerGraph',
            //     size: {
            //         height: 900
            //     },
            //     data: {
            //         x : 'x',
            //         columns: stateTracketData,
            //         type: 'bar',
            //         groups: [
            //                   trackerStates
            //                 ]
            //     },
            //     axis: {
            //         x: {
            //             type: 'category'
            //         },
            //         rotated: true
            //     }
            // };

            let trackerChartparams: c3.ChartConfiguration = {
                bindto: '#CapaTrackerGraph',
                size: {
                    height: 900
                },
                data: {
                    x : 'x',
                    columns: [
                        ['x', 'CA1','CA2','CA3','CA4','CA5','CA6','CA7','CA8','CA9','CA10','PA1','PA2','PA3','PA4','PA5','PA6','PA7','PA8','PA9','PA10'],
                        ['Initiated', 30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40],
                        ['Approved', 30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40],
                        ['WFEC', 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40]
                    ],
                    type: 'bar',
                    groups: [
                                ['Initiated', 'Approved', 'WFEC']
                            ]
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
            ml.UI.getPageTitle("MCAPA Status Overview").prependTo(that._root);

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
                 let categories: any[] = [];
                 let stateCodes: any[] = [];
                 let stateDesc: any[];
                 let trackerStates: any[];
                 let deptWiseInitials: any[] = [];
                 let catWiseInitials: any[] = [];
                 let SateWiseAvgInitials: any[] = [];
                 let statusWiseData: any[] = [];
                 let stateTracketData: any[] = [];
                 let statusWiseTotalDaysData: any[] = [];
                 let closedState;
                 
                let departments_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "Department")[0].labels;

                departments_.forEach(dept => {
                    let deptDispName = new LabelTools().getDisplayName(dept);
                    departments.push(deptDispName);
                });
    
                categories = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == "CAPA Category")[0].labels;
    
                deptWiseInitials = Array(departments.length).fill(0);
                catWiseInitials = Array(categories.length).fill(0);

                let states_ = new LabelTools().getLabelGroups(cat).filter( lg => lg.filterMenu && lg.filterMenu.displayName == cat)[0].labels.sort();

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

                    stateTracketData = [
                        ['x']
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved'],
                        ['WFEC']
                    ];

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

                    stateTracketData = [
                        ['x']
                        ['Initiated'],
                        ['Approved'],
                        ['RC Approved']
                    ];
                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    departments: departments,
                    categories: categories,
                    stateCodes: stateCodes,
                    stateDesc: stateDesc,
                    trackerStates: trackerStates,
                    deptWiseData: [cat + ' count by department', ...deptWiseInitials],
                    categoryWiseData: [cat + ' count by category', ...catWiseInitials],
                    statusWiseData: statusWiseData,
                    statusWiseTotalDaysData: statusWiseTotalDaysData,
                    statusWiseAvgData: [cat + ' average time spent in state', ...SateWiseAvgInitials],
                    stateTracketData: stateTracketData,
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

            this.renderByDeptChart(ByCategoryLabelData.departments,ByCategoryLabelData.deptWiseData);
            this.renderByCatChart(ByCategoryLabelData.categories,ByCategoryLabelData.categoryWiseData);
            this.renderByStatusChart(ByCategoryLabelData.statusWiseData);
            this.renderByAvgTimeChart(ByCategoryLabelData.stateDesc,ByCategoryLabelData.statusWiseAvgData);
            this.renderTrackerChart(ByCategoryLabelData.trackerStates,ByCategoryLabelData.stateTracketData);

        }

        processLabelsData(labels: XRLabelEntry[]){

            for (const item of labels) {

                let itemCategory: String = item.itemRef.substring(0, item.itemRef.indexOf('-'));

                if(itemCategory && (itemCategory != "CA" || itemCategory != "PA")){
                    continue;
                }

                let ByCategoryLabelData: ByCategoryLabelData;
                let itemIndex = -1;

                for (const ByCategoryData of this.ByCategoryLabelDetails) {
                    if (itemCategory == ByCategoryData.category) {
                        ByCategoryLabelData = ByCategoryData;
                        break;
                    }
                }

                for (const label of item.labels) {
                    //check for item department
                    let deptIndex = ByCategoryLabelData.departments.findIndex(dept => dept === label.label);

                    if(deptIndex > -1){
                        ByCategoryLabelData.deptWiseData[deptIndex + 1] += 1;
                    }

                    let catIndex = ByCategoryLabelData.categories.findIndex(cat => cat === label.label);

                    if(catIndex > -1){
                        ByCategoryLabelData.categoryWiseData[catIndex + 1] += 1;
                    }

                    let stateIndex = ByCategoryLabelData.stateCodes.findIndex(stateCode => stateCode === label.label);

                    if(stateIndex > -1){
                        //check for current state
                        if(label.reset.length == 0){
                            ByCategoryLabelData.statusWiseData[stateIndex][0] += 1;
                        }

                         //get the number of days label state was in
                        label.set.sort((a, b) => a.version - b.version);
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

                        ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][0] += labelstateDaysCount;
                        ByCategoryLabelData.statusWiseTotalDaysData[stateIndex][1] += 1;

                        //check if state is closed or not
                        if(label.label !== ByCategoryLabelData.closedState){
                            //update state tracker
                            if(itemIndex > -1){
                                ByCategoryLabelData.stateTracketData[stateIndex + 1][itemIndex] += 1;
                            }else{
                                ByCategoryLabelData.stateTracketData[0].push(item.itemRef);
                                itemIndex = ByCategoryLabelData.stateTracketData[0].length - 2;
                                for (let i = 1; i <= ByCategoryLabelData.stateCodes.length; i++) {
                                    ByCategoryLabelData.stateTracketData[i].push(0);
                                }
                            }
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
