/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace CapaStatusDashboard {
    export class CapaStatusDashboard implements IPlugin {
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
                    const control = new CapaStatusDashboardControl(options.control);
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

   
    class CapaStatusDashboardControl extends BaseControl {

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

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                console.log("Check the result");
            }).then(() => {
                //Let's remove the spinning wait
                spinningWait.remove();
            });
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
        ExampleHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        <style>
        </style>
        <div class="row" id="waiting" class=""></div>
        <div class="panel-body" id="CapaStatusDashboardPanel">
            <div id="">   
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title" id="CapaStatusChartTitle">MCapa Status Overview</h3>
                    </div>
                    <div class="panel-body chartcontainer"></div>
               </div>
            </div>
        </div>
        `
    }

}

// Register the plugin
$(function () {
    plugins.register(new CapaStatusDashboard.CapaStatusDashboard());
});
