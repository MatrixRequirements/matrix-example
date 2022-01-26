/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace ExampleDashboardWithTable {
    const PLUGIN_NAME = "<PLUGIN_NAME_PLACEHOLDER>";
    const PLUGIN_VERSION = "<PLUGIN_VERSION_PLACEHOLDER>";

    export class ExampleDashboardWithTable implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "EXTAB",
                title: "Example with table",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-rocket",
                usesFilters: true,
                render: (options: IPluginPanelOptions) => {
                    const control = new ExampleDashboardControl(options.control);
                    control.initPage();
                },
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

    class ExampleDashboardControl extends BaseControl {

        destroy(): void {}

        getValue(): any {}

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void {}

        // Set up the page, load data and then render the content
        initPage() {
            this.renderHTML();
            //Add a waiting spinning item
            let spinningWait =ml.UI.getSpinningWait("Loading");
            $("#waiting",this._root).append(spinningWait);
            
            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.renderResult(result);
            }).then(()=>{
                //Let's remove the spinning wait
                spinningWait.remove();
            });
        }

        renderHTML() {
            //Load the template
            this._root.html(this.ExampleHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("Example with table").prependTo(this._root);
        }

        private renderResult(result:XRLabelEntry[]) {
            result.forEach((item)=>{

                let clonedTemplate =  $("#itemExampleDashboardList .template",this._root).clone();
                //Remove the template and hidden classes 
                clonedTemplate.attr("class","");
                $(".title",clonedTemplate).text(item.itemRef + "!");
                $(".content",clonedTemplate).text(item.labels.map((l)=>{ return l.label }).join(","));
                clonedTemplate.appendTo($("#itemExampleDashboardList tbody",this._root));

            })
            const tableDiv = $("table#itemExampleDashboardList");
            tableDiv.highlightReferences();
            tableDiv.tablesorter();
        }
        
        // HTML template
        ExampleHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        <style>
        /* If required */
        </style>
        <div class="row" id="waiting"></div>
            <div class="panel-body" id="ExamplePanel">
                <div id="">   
                    <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title" id="">Overview</h3>
                    </div>
                    <div class="panel-body">
                        <div id="ExampleDashboardPieChart" class="chart">Chart will go here</div>
                    </div>
               </div>
            </div>
            <div>
                <table id="itemExampleDashboardList" class="table table-condensed table-borderless table-hover">
                <thead>
                    <tr>
                        <th> Title</th>
                        <th> Labels</th>
                    </tr>
                </thead>
                <tbody>
                        <tr class="template hidden">
                            <td class="title" >MyITEM : my title  </td>
                            <td class="content" ></td>
                        </tr>
                    </tbody>
                </table>
         </div>
        </div>
        `
    }
}

// Register the plugin
$(function () {
    plugins.register(new ExampleDashboardWithTable.ExampleDashboardWithTable());
});
