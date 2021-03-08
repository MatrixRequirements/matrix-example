/// <reference path="api/Matrix.Labels.ts" />

// Use a namespace to isolate your plugin code
// This avoids conflicts with other plugins
namespace ExampleDashboard {
    export class ExampleDashboard implements IPlugin {
        // Implement to pass back additional pages to be displayed in the tree
        getProjectPages(): IProjectPageParam[] {
            let pages: IProjectPageParam[] = [];
            pages.push({
                id: "EXD",
                title: "Example Dashboard",
                folder: "DASHBOARDS",
                order: 3000,
                icon: "fal fa-lightbulb-on",
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
            return "Example Dashboard";
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
        openTimes: OpenTime[];
    }
    type DashboardState = Loading | Loaded;

    // Data we will use for display
    interface OpenTime {
        id: string;
        time: Date;
    }

    class ExampleDashboardControl extends BaseControl {
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
                    openTimes: extractLabelOpenTime(result),
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
                return renderOpenTimes(state.openTimes);
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
     * Extract the latest time when an item was set into the OPEN state
     * @param labels The labels to process
     * @return A set of items and their last open time
     * @private
     */
    function extractLabelOpenTime(labels: XRLabelEntry[]): OpenTime[] {
        let openTimes: OpenTime[] = [];
        for (const item of labels) {
            for (const label of item.labels) {
                if (label.label == "OPEN") {
                    const latestOpen = label.set.reduce((prevDate: Date, set) => {
                        const newDate = new Date(set.dateIso);
                        if (newDate > prevDate) {
                            return newDate;
                        } else {
                            return prevDate;
                        }
                    }, new Date(0));
                    openTimes.push({ id: item.itemRef, time: latestOpen });
                }
            }
        }
        return openTimes;
    }

    /**
     * Render open time into a table
     * @param times Input items
     * @private
     */
    function renderOpenTimes(times: OpenTime[]): string {
        const rows = times.map(
            (time) => `<tr><td>${time.id}</td><td>${time.time.toDateString()}</td></tr>`
        );
        return `<table>${rows.join("")}</table>`;
    }
}

// Register the plugin
$(function () {
    plugins.register(new ExampleDashboard.ExampleDashboard());
});
