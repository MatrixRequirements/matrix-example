/// <reference path="../lib/core.d.ts" />
/// <reference path="../lib/admin.d.ts" />
/// <reference types="jquery" />

console.log("Hello there");

class ExamplePlugin extends ConfigPage {
    private uiNode:JQuery|null = null

    getNode() {
        return {
            id: "patchConfig",
            type: "patchConfig",
            title: "Patch Config",
            icon: "admin/setting.png",
            children: <IDB[]>[]
        }
    }

    saveAsync() {
        return $.Deferred().resolve()
    }

    load(pageId: string) {
        super.load(pageId);
        this.initPage("Example Config",
            true, "",
            "This is an example admin page");

        this.showSimple()
    };

    protected showSimple() {
        this.uiNode = this.simple.append($(`<div id="exampleUI">`))
        const button = $(`<button class='btn btn-link'>Say hello</button>`)
            .click( () => {
                this.uiNode?.append($("<div>Hallo</div>"))
            })
        this.uiNode?.append(button)
    }
}

$(function () { window.setTimeout( function() {
    configApp.configPages.registerPage( new ExamplePlugin(), ServerSettingsFolder.SERVER_SETTING_FOLDER_ID,
        undefined, true);
},1);});
