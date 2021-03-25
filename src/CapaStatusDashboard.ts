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

    // Data we will use for display
    interface LabelStateDaysCountData {
        id: string;
        labels: LabelStateDaysCount[];
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
            this.renderHTML();
            //Add a waiting spinning item
            let spinningWait = ml.UI.getSpinningWait("Loading");
            $("#waiting", this._root).append(spinningWait);

            //Get the data and render it
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.renderResult(result);
            }).then(() => {
                //Let's remove the spinning wait
                spinningWait.remove();
            });
        }

        renderHTML() {
            //Load the template
            this._root.html(this.ExampleHTMLDom);
            //Add the page title
            ml.UI.getPageTitle("CAPA Status Overview").prependTo(this._root);
        }

        private renderResult(result: XRLabelEntry[]) {

            let LabelStateDaysCountDetails: LabelStateDaysCountData[] = extractLabelStatusDays(result);

            // result.forEach((item)=>{

            //     let clonedTemplate =  $("#itemCapaStatusDashboardList .template",this._root).clone();
            //     //Remove the template and hidden classes 
            //     clonedTemplate.attr("class","");
            //     $(".title",clonedTemplate).text(item.itemRef + "!");
            //     $(".content",clonedTemplate).text(item.labels.map((l)=>{ return l.label }).join(","));
            //     clonedTemplate.appendTo($("#itemCapaStatusDashboardList tbody",this._root));

            // })

            LabelStateDaysCountDetails.forEach(
                (labelData) => {
                    let clonedTemplate = $("#itemCapaStatusDashboardList .template", this._root).clone();
                    //Remove the template and hidden classes 
                    clonedTemplate.attr("class", "");
                    $(".title", clonedTemplate).text(labelData.id + "!");

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




        // HTML template
        ExampleHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        <style>
        /* If required */
        </style>
        <div class="row" id="waiting" class=""></div>
            <div class="panel-body" id="CapaStatusDashboardPanel">
                <div id="">   
                    <div class="panel panel-default">
                    <div class="panel-heading">
                        <h3 class="panel-title" id="">Capa Status Overview</h3>
                    </div>
                    <div class="panel-body">
                        <div id="CapaStatusDashboardPieChart" class="chart">Chart will go here</div>
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
                        <th> Open</th>
                        <th> Wait</th>
                        <th> Checked</th>
                        <th> Closed</th>
                    </tr>
                </thead>
                <tbody>
                        <tr class="template hidden">
                            <td class="title" >MyITEM : my title  </td>
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
    * Extract the number of days each label state was in
    * @param labels The labels to process
    * @return A set of items and their labels with number of days each label state was in
    * @private
    */
    function extractLabelStatusDays(labels: XRLabelEntry[]): LabelStateDaysCountData[] {
        let LabelStateDaysCountDetails: LabelStateDaysCountData[] = [];
        for (const item of labels) {
            let LabelStateDaysCountData: LabelStateDaysCountData = {
                id: item.itemRef,
                labels: []
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
            LabelStateDaysCountDetails.push(LabelStateDaysCountData);
        }
        return LabelStateDaysCountDetails;
    }

}

// Register the plugin
$(function () {
    plugins.register(new CapaStatusDashboard.CapaStatusDashboard());
});
