/// <reference path="api/Matrix.REST.ts" />

namespace ExampleDashboard {
    export class ExampleDashboard implements IPlugin {
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

        isDefault = true;

        getPluginName(): string {
            return "Example Dashboard";
        }

        getPluginVersion(): string {
            return "Example Dashboard";
        }
    }

    interface Loading {
        kind: "loading";
    }
    interface Loaded {
        kind: "loaded";
        data: XRLabelEntry[];
        openTimes: OpenTimes[];
    }
    type DashboardState = Loading | Loaded;

    interface OpenTimes {
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

        initPage() {
            this.state = { kind: "loading" };
            this.renderProjectPage();
            Matrix.Labels.projectLabelHistory().then((result) => {
                this.updateLabels(result);
            });
        }

        private updateLabels(labels: XRLabelEntry[]) {
            let openTimes: { id: string; time: Date }[] = [];
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
            this.state = { kind: "loaded", data: labels, openTimes: openTimes };
            this.renderProjectPage();
        }

        private renderProjectPage() {
            const html = `            
            <div>${this.htmlContent()}</div>
            `;
            this._root.html(html);
        }

        private htmlContent() {
            switch (this.state.kind) {
                case "loading":
                    return "Loading ...";
                case "loaded":
                    return ExampleDashboardControl.renderOpenTimes(this.state.openTimes);
            }
            return "Unknown State";
        }

        private static renderOpenTimes(times: OpenTimes[]): string {
            const rows = times.map(
                (time) => `<tr><td>${time.id}</td><td>${time.time.toDateString()}</td></tr>`
            );
            return `<table>${rows.join("")}</table>`;
        }
    }
}

$(function () {
    plugins.register(new ExampleDashboard.ExampleDashboard());
});
