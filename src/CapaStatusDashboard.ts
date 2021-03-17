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
                title: "CAPA Status Dashboard",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-lightbulb-on",
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
            return "CAPA Status Dashboard";
        }

        getPluginVersion(): string {
            return "0.0.1";
        }
    }

    // The possible application states
    interface Loading {
        kind: "loading";
    }
    interface Loaded {
        kind: "loaded";
        data: XRLabelEntry[];
        LabelStateDaysCountDetails: LabelStateDaysCountData[];
    }
    type DashboardState = Loading | Loaded;

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
        state: DashboardState = { kind: "loading" };

        destroy(): void {}

        getValue(): any {}

        hasChanged(): boolean {
            return false;
        }

        resizeItem(newWidth?: number, force?: boolean): void {}

        // Set up the page, load data and then render the content
        initPage() {
            this.state = { kind: "loading" };
            this.renderProjectPage();
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.state = {
                    kind: "loaded",
                    data: result,
                    LabelStateDaysCountDetails: extractLabelStatusDays(result),
                };
                this.renderProjectPage();
            });
        }

        private renderProjectPage() {
            const content = renderContent(this.state);
            this._root.html(wrapContent(content));
        }
    }

    /**
     * Render the state into an HTML string
     * @param state UI state to display
     * @private
     */
    function renderContent(state: DashboardState): string {
        switch (state.kind) {
            case "loading":
                return "Loading ...";
            case "loaded":
                return renderLabelStateDaysCountDetails(state.LabelStateDaysCountDetails);
        }
        return "Unknown State";
    }

    /**
     * Utility render function to render the common UI wrapper
     * around stateful content
     * @param content The HTML content to wrap
     * @private
     */
    function wrapContent(content: string): string {
        return `            
            <div>${content}</div>
        `;
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
                id : item.itemRef,
                labels: []
            };
            //LabelStateDaysCountData.id = item.itemRef;
            for (const label of item.labels) {
                // if (label.label == "OPEN") {
                //     const latestOpen = label.set.reduce((prevDate: Date, set) => {
                //         const newDate = new Date(set.dateIso);
                //         if (newDate > prevDate) {
                //             return newDate;
                //         } else {
                //             return prevDate;
                //         }
                //     }, new Date(0));
                //     LabelStateDaysCountDetails.push({ id: item.itemRef, time: latestOpen });
                // }
                
                //sorting set array in ascending order based on version
                label.set.sort((a, b) => a.version - b.version);

                //sorting reset array in ascending order based on version
                label.reset.sort((a, b) => a.version - b.version);
                
                const labelstateDaysCount = label.set.reduce((accumulator, currentValue, currentIndex, set)=>{
                    let stateDays: number;
                    if(label.reset[currentIndex]){
                        const setDate = new Date(currentValue.dateUser);
                        const resetDate = new Date(label.reset[currentIndex].dateUser);
                        
                        let time_difference = resetDate.getTime() - setDate.getTime();  
  
                        //calculate days difference by dividing total milliseconds in a day  
                        let days_difference = time_difference / (1000 * 60 * 60 * 24);  

                        stateDays = Math.floor(days_difference);
                    }else{
                        const setDate = new Date(currentValue.dateUser);
                        const resetDate = new Date();

                        let time_difference = resetDate.getTime() - setDate.getTime();  
  
                        //calculate days difference by dividing total milliseconds in a day  
                        let days_difference = time_difference / (1000 * 60 * 60 * 24);  

                        stateDays = Math.floor(days_difference);
                    }

                    return accumulator + stateDays;

                },0);

                let LabelStateDays: LabelStateDaysCount = {
                    label : label.label,
                    days : labelstateDaysCount
                }
               

                LabelStateDaysCountData.labels.push(LabelStateDays);
            }
            LabelStateDaysCountDetails.push(LabelStateDaysCountData);
        }
        return LabelStateDaysCountDetails;
    }

    /**
     * Render open time into a table
     * @param times Input items
     * @private
     */
    function renderLabelStateDaysCountDetails(labelSateDaysCountDetails: LabelStateDaysCountData[]): string {
        const rows = labelSateDaysCountDetails.map(
            (labelData) => {
               

               let rowColumn = labelData.labels.map(
                   (label) =>  `<td>Label:${label.label}</td><td>Days:${label.days}</td>`
               );
              
               let tableRow = `<tr><td>ID:${labelData.id}</td>${rowColumn}</tr>`;
               
               return tableRow;
               
            }
        );
        return `<table>${rows.join("")}</table>`;
    }
}

// Register the plugin
$(function () {
    plugins.register(new CapaStatusDashboard.CapaStatusDashboard());
});
