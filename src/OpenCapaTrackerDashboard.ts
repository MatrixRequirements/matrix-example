/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace OpenCapaTrackerDashboard {

    export class OpenCapaTrackerDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "OCT",
                title: "Open CAPA Tracker",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new OpenCapaTrackerDashboardControl(options.control);
                    control.initPage();
                },
            });

            return pages;
        }

        // Set to true to enable the plugin
        isDefault = true;

        getPluginName(): string {
            return "Open CAPA Tracker";
        }

        getPluginVersion(): string {
            return "1.0.0";
        }
    }

    interface ByCategoryLabelData {
        category: string;
        stateTracketData: any[];
        closedState: string;
    }

    class OpenCapaTrackerDashboardControl extends BaseControl {

        currentCat: string = "";
        ByCategoryLabelDetails: ByCategoryLabelData[] = [];
        CapaTrackerChart: c3.ChartAPI;

        destroy(): void { }

        getValue(): any { }

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void { }

        initPage() {
            let that = this;

            that.renderHTML();
            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Please wait...");
            $("#waiting", that._root).append(spinningWait);

            $(".spinningWait", that._root).show();
            //$("#MCSONoItems", that._root).hide();


            setTimeout(o => that.installCopyButtons("Open CAPA Tracker"), 10);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                console.log("Check the result");
                $(".spinningWait", that._root).hide();
                //$("#MCSONoItems", that._root).hide();
                that.renderCharts();
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

        renderCharts(){
            this.renderTrackerChart();
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
                        ['OPEN', 30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40],
                        ['WAIT', 30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40,30, 20, 10, 40],
                        ['CHECKED', 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40, 30, 20, 10, 40]
                    ],
                    type: 'bar',
                    groups: [
                                ['OPEN', 'WAIT', 'CHECKED']
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
            

        }

        processLabelsData(labels: XRLabelEntry[]){

        }

        renderHTML() {
            let that = this;

            //Load the template
            that._root.html(that.OCTHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("Open CAPA Tracker").prependTo(that._root);

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
                let stateTracketData: any[] = [];
                let closedState;

                if(cat === "CA"){
                    closedState = "CLOSED";

                    stateTracketData = [
                        ['x']
                        ['OPEN'],
                        ['WAIT'],
                        ['CHECKED'],
                        ['CLOSED']
                    ];

                }else{

                    closedState = "CLOSED";

                    stateTracketData = [
                        ['x']
                        ['OPEN'],
                        ['WAIT'],
                        ['CHECKED'],
                        ['CLOSED']
                    ];
                }

                let ByCategoryLabelData: ByCategoryLabelData = {
                    category: cat,
                    stateTracketData: stateTracketData,
                    closedState: closedState
                };
    
                this.ByCategoryLabelDetails.push(ByCategoryLabelData);

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

        OCTHTMLDom = `
        <div class="panel-body-v-scroll fillHeight panel-default ">
            <style>
            .bigChart
            {
                width: 90%; 
                min-height: 900px;
                cursor:pointer;
            }
            </style>
            <div  style="margin:10px;">
                <div class="row" id="waiting" class="spinningWait"></div>
            </div>
            <div id="OCTContent" class="" style="margin:10px;" >
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
    plugins.register(new OpenCapaTrackerDashboard.OpenCapaTrackerDashboard());
});