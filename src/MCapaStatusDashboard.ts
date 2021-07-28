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

   
    class MCapaStatusDashboardControl extends BaseControl {

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
                that.renderCharts();
            }).then(() => {
                //Let's remove the spinning wait
                $(".spinningWait",that._root).hide();
                //$("#MCSONoItems", that._root).show();
            });
        }

        DeptWiseChartTitle
        DeptWiseoverviewChart
        DeptWiseoverviewGraph

        CatWiseChartTitle
        CatWiseoverviewChart
        CatWiseoverviewGraph

        StatusWiseChartTitle
        StatusWiseoverviewChart
        StatusWiseoverviewGraph

        AvgTimeWiseChartTitle
        AvgTimeWiseoverviewChart
        AvgTimeWiseoverviewGraph

        CapaTrackerChartTitle
        CapaTrackerChart
        CapaTrackerGraph

        installCopyButtons(title: string) {
            let that = this;
            
            let savedWidth = 0;
    
            ml.UI.copyBuffer($("#DeptWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#DeptWiseoverviewGraph)"), this._root, (copied: JQuery) => {
                let title_ = $("#DeptWiseChartTitle",this._root).val();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#DeptWiseoverviewGraph svg",this._root).width();
                that.DeptWiseoverviewChart.resize({width:590});
            },()=>{
                that.DeptWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#CatWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CatWiseoverviewGraph)"), this._root, (copied: JQuery) => {
                let title_ = $("#CatWiseChartTitle",this._root).val();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CatWiseoverviewGraph svg",this._root).width();
                that.CatWiseoverviewChart.resize({width:590});
            },()=>{
                that.CatWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#StatusWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#StatusWiseoverviewGraph)"), this._root, (copied: JQuery) => {
                let title_ = $("#StatusWiseChartTitle",this._root).val();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#StatusWiseoverviewGraph svg",this._root).width();
                that.StatusWiseoverviewChart.resize({width:590});
            },()=>{
                that.StatusWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#AvgTimeWiseChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#AvgTimeWiseoverviewGraph)"), this._root, (copied: JQuery) => {
                let title_ = $("#AvgTimeWiseChartTitle",this._root).val();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#AvgTimeWiseoverviewGraph svg",this._root).width();
                that.AvgTimeWiseoverviewChart.resize({width:590});
            },()=>{
                that.AvgTimeWiseoverviewChart.resize({width:savedWidth})
            });


            ml.UI.copyBuffer($("#CapaTrackerChartTitle",this._root), "copy  to clipboard", $(".panel-body:has(#CapaTrackerGraph)"), this._root, (copied: JQuery) => {
                let title_ = $("#CapaTrackerChartTitle",this._root).val();
                $(".copyTitle",copied).html(`<h1> ${title_}</h1><span> <b> Date:</b> ${ml.UI.DateTime.renderCustomerHumanDate(new Date())}</span>`);
    
                ml.UI.fixC3ForCopy(copied);
    
            },"",()=>{
                savedWidth = $("#CapaTrackerGraph svg",this._root).width();
                that.CapaTrackerChart.resize({width:590});
            },()=>{
                that.CapaTrackerChart.resize({width:savedWidth})
            });
        }

        renderCharts(){
          this.renderByDeptChart();
          this.renderByCatChart();
          this.renderByStatusChart();
          this.renderByAvgTimeChart();
          this.renderTrackerChart();
        }

        renderByDeptChart(){
             //prepare template
             let byDeptChartparams: c3.ChartConfiguration = {
                bindto: '#DeptWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', 'ST','PROD','QC','D&D','QA','MICRO','PUR','PROD','SC'],
                        ['CAPA count by department', 30, 20, 10, 40,30, 20, 10, 40,50]
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

        renderByCatChart(){
            //prepare template
            let byCatChartparams: c3.ChartConfiguration = {
               bindto: '#CatWiseoverviewGraph',
               data: {
                x : 'x',
                columns: [
                    ['x', 'Internal Audit','Process/ Product','Complaint','External Audit'],
                    ['CAPA count by category', 30, 20, 10, 40]
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

       renderByStatusChart(){
                //prepare template
                let byStatusChartparams: c3.ChartConfiguration = {
                bindto: '#StatusWiseoverviewGraph',
                data: {
                    columns: [
                        ['Initiated', 38],
                        ['Approved', 8],
                        ['WFEC', 31],
                        ['Closed', 23]
                    ],
                    type : 'pie'
                }
            };

            //prepare chart config and render
            $("#StatusWiseoverviewChart div").remove();

            $("#StatusWiseoverviewChart").append("<div id='StatusWiseoverviewGraph'>");

            this.StatusWiseoverviewChart = c3.generate(byStatusChartparams);
            //this.charts.push(renderedChart);
        }

        renderByAvgTimeChart(){
            //prepare template
            let byAvgTimeChartparams: c3.ChartConfiguration = {
                bindto: '#AvgTimeWiseoverviewGraph',
                data: {
                    x : 'x',
                    columns: [
                        ['x', 'Initiated','Approved','WFEC','Closed'],
                        ['CAPA average time spent in state', 30, 20, 10, 40]
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

        renderTrackerChart(){
            //prepare template
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

            categories.forEach(cat => {

                if (ml.LabelTools.getLabelDefinitions([cat]).length > 0) {
                    let item = $(`<li class="cat" data-cat="${cat}"><a href="javascript:void(0)">${cat}</a></li>`).click(function () {
                        console.log("Render based on CAT selected");
                    });
                    $(".dropdown-menu", select).append(item);
                    if (index == 0) {
                        $("#selectedCat").text(cat);
                    }
                    index++;
                }
            });

        }

        
        // HTML template
        // ExampleHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        // <style>
        // </style>
        // <div class="row" id="waiting" class=""></div>
        // <div class="panel-body" id="CapaStatusDashboardPanel">
        //     <div id="">   
        //         <div class="panel panel-default">
        //             <div class="panel-heading">
        //                 <h3 class="panel-title" id="CapaStatusChartTitle">MCapa Status Overview</h3>
        //             </div>
        //             <div class="panel-body chartcontainer"></div>
        //        </div>
        //     </div>
        // </div>
        // `

        //<div id="MCSONoItems">Not enough data to display MCSO Overview </div>


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
