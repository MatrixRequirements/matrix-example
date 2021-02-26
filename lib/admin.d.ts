/// <reference types="jquery" />
interface IPojectDataMap {
    [key: string]: XRGetProject_ProjectInfo_ProjectInfo;
}
declare class ConfigApp {
    private dbConnection;
    private itemForm;
    private printForm;
    private dlgForm;
    private currentItem;
    private _user;
    private _status;
    private _control;
    private _needsSave;
    private triggerSelectionChangeMySelf;
    private configTree;
    private projectData;
    private lastProject;
    plugins: IServerPluginSettings[];
    private PROJECT_FOLDER_ID;
    private PROJECT_FOLDER_WAIT_ID;
    configPages: ConfigPageFactory;
    constructor();
    init(itemForm: JQuery, dlgForm: JQuery): void;
    getUser(): string;
    getVersion(): string;
    getNeedsSave(): boolean;
    getLastProject(): void;
    getType(): string;
    saveAsync(): JQueryDeferred<unknown>;
    cancel(): void;
    resizeItem(): void;
    postLogin(user: string, projects: string): void;
    treeSelectionChange(pageId: string): void;
    selectItem(itemId: string, itemLabel: string): void;
    getTree(): IDB[];
    getItem(itemId: string): IDB;
    getCurrentItemId(): string;
    pingCurrentItem(): void;
    registerPage(item: IItem, parent: string): void;
    insertItem(item: IItem, parent: string): void;
    itemChanged(needsSave: boolean): void;
    setLastConnection(): void;
    canNavigateAwayAsync(): JQueryDeferred<unknown>;
    canDragDrop(nodeType: string, pageId: string): boolean;
    dragEnter(dragged: Fancytree.FancytreeNode, target: Fancytree.FancytreeNode): string[] | boolean;
    getJSONProjectSettings(projectId: string, settingId?: string): IJsonSetting[];
    settingExists(projectId: string, settingId: string): boolean;
    setJSONProjectSettingAsync(projectId: string, setting: IJsonSetting, pageId: string): JQueryDeferred<IRestResult>;
    setProjectSettingAsync(projectId: string, settingId: string, settingValue: string, pageId: string): JQueryDeferred<IRestResult>;
    setServerSettingAsync(settingId: string, settingValue: string): JQueryDeferred<unknown>;
    getServerSetting(settingId: string, defaultValue: any): any;
    setServerSetting(settingId: string, property: string, newValue: any): void;
    getCustomerSetting(setting: string): string;
    setCategorySettingAsync(projectId: string, category: string, settingId: string, settingValue: string, pageId: string): JQueryDeferred<unknown>;
    getProjectConfig(projectId: string): XRGetProject_ProjectInfo_ProjectInfo;
    getCatgegoryConfig(projectId: string, category: string): XRCategoryExtendedType;
    getUserPermission(projectId: string): XRUserPermissionType[];
    getGroupPermission(projectId: string): XRGroupPermissionType[];
    canUserWrite(projectId: string, login: string): boolean;
    canGroupWrite(projectId: string, groupId: number): boolean;
    getFieldConfig(projectId: string, category: string, field: string): XRFieldType;
    updateFieldConfig(projectId: string, category: string, field: string, newConfig: XRFieldType): void;
    removedFromTree(itemId: string, newId: string): void;
    renamePage(pageId: string, label: string, parent: string): void;
    updateProjectData(projectId: string): JQueryDeferred<IRestResult>;
    private removeACL;
    reloadProject(project: string, pageId: string, parentFolderId: string): JQueryDeferred<unknown>;
    signOut(): void;
    private clear;
    private movePage;
    private prepareTree;
    private addProjectsToTree;
    private showUrl;
    private navigateToUrl;
    private expandProject;
    private renderPage;
    private loadProjectAsync;
}
declare var configApp: ConfigApp;
interface IConfigPage {
    getNode(): IDB;
    saveAsync(): JQueryDeferred<{}>;
    load(pageId: string): void;
    getProject(): string;
    getCategory(): string;
    getField(): string;
    willUnload(): void;
}
interface IGroupsUsers {
    users: XRUserType[];
    groups: XRGroupType[];
}
declare class ConfigPage implements IConfigPage {
    protected pageId: string;
    protected simple: JQuery;
    protected allUsers: XRUserType[];
    protected allGroups: XRGroupType[];
    getNode(): IDB;
    saveAsync(): JQueryDeferred<{}>;
    load(pageId: string): void;
    getProject(): string;
    getCategory(): string;
    getField(): string;
    willUnload(): void;
    protected initPage(title: string, showAdvancedBtn: boolean, showDeleteText: string, help: string, externalHelp?: string, showCopy?: boolean): void;
    protected showAdvanced(): void;
    protected doCopy(): void;
    protected doDelete(): void;
    protected showSimple(): void;
    protected showWarning(text: string): void;
    protected showNote(text: string): void;
    protected showAdvancedCode(code: string, success: (code: string) => void, sematicValidate?: IValidationSpec): void;
    protected getProjectSettingLink(setting: string): string;
    protected getProjectSettingLinkA(setting: string, name: string): string;
    protected getCategorySettingLink(): string;
    protected getTraceSettingLink(): string;
    protected getPluginLink(): string;
    protected getGroupId(group: XRGroupType): string;
    protected getGroupDisplayNameFromId(groupOrUserId: string): string;
    protected combinedName(user: XRUserType): string;
    private resizeUserSelectDlg;
    protected showUserAndGroupsSelectWithDialog(container: JQuery, showUsers: boolean, showGroups: boolean, help: string, empty: string, selected: string[], dialogTitle: string, onSelect: (selection: string[]) => void): void;
    protected showSelectDialog(selectedIn: string[], showUsers: boolean, showGroups: boolean, dialogTitle: string, onSelect: (selection: string[]) => void): void;
    protected markUsersWithoutAccess(lis: JQuery): void;
    protected filterGroupsAndUsers(lis: JQuery, sex: string, writeOnly: boolean): void;
    protected updateUsersAndGroups(withDetails: boolean): JQueryDeferred<{}>;
    initMeta(users: XRUserType[], groups: XRGroupType[], pageId: string): void;
}
declare class GenericAdminPage extends ConfigPage {
    private page;
    constructor(page: ISettingPage);
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected doDelete(): void;
}
interface IDynParent {
    parent: string;
    node: IConfigPage;
    superadminOnly: boolean;
}
declare class ConfigPageFactory extends Application {
    private registered_pages;
    private dynamicParents;
    private delayedRegister;
    constructor();
    updateMainUI(disabled?: boolean): void;
    createPage(pageId: string, type: string): IConfigPage;
    registerPage(ext: IConfigPage, parentId?: string, dynamicParentId?: string, superadminOnly?: boolean): void;
    delayedPageAdd(): void;
    insertProjectCopy(projectId: string): void;
    insertProjectSettings(projectId: string): void;
    insertProjectExtensionFolder(projectId: string): void;
    insertProjectCategoryFolder(projectId: string, categoryExtended: XRCategoryExtendedType[]): void;
    insertProjectExtension(projectId: string, parentId: string, plugin: any): void;
    insertCategory(projectId: string, categories: XRCategoryExtendedType[]): void;
}
declare class LineEditor extends ConfigPage {
    editor: LineEditorExt;
    constructor();
    showDialog(title: string, height: number, input: ILineEditorLine[], onOk: (update: ILineEditorLine[]) => boolean, width?: number): void;
    static mapToKeys(results: ILineEditorLine[]): ILineEditorLine[];
}
declare class TextEditor {
    constructor();
    showDialog(title: string, value: string, onOk: (update: string) => void): void;
}
declare class TextMacroBase extends ConfigPage {
    protected macrosOriginal: ISmartTextConfig;
    protected macrosChanged: ISmartTextConfig;
    protected isServerMacros: boolean;
    protected moveToServer: string[];
    protected useTiny: boolean;
    protected paramChanged(): void;
    protected init(): void;
    protected showSimple(): void;
    protected showMacroList(title: string, type: number, help: string, projectId: string): void;
    protected deleteMacro(midx: number, projectId?: string): void;
    protected editMacro(tidx: number, type: number): void;
    protected updateMacro(tidx: number, newMac: ISmartTextConfigReplacement): boolean;
    protected globalMacro(tidx: number, type: number): void;
    protected showAdvanced(): void;
}
declare class CategoryFolder extends ConfigPage {
    static CATEGORY_FOLDER_ID: string;
    static CATEGORY_FOLDER_TYPE: string;
    private project;
    private help;
    private category;
    private newLabel;
    private newType;
    private hint;
    private create;
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected enableCreateField(): void;
    protected doDoCopy(selectedProject: string, dialog: JQuery): void;
    protected doCopy(): void;
    protected doDelete(): void;
    protected changeCategoryLabels(newShort: string, newLong: string): void;
    protected changeCategoryLabels_doIt(newShort: string, newLong: string): void;
    protected dodoDelete(): void;
}
declare class CategoryFolders extends ConfigPage {
    static CATEGORY_FOLDERS_ID: string;
    private catId;
    private catName;
    private includeDefaultFields;
    private create;
    private ctype;
    private hint;
    getNode(): {
        id: string;
        title: string;
        type: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    protected enableCreateField(): void;
}
declare class CategorySetting extends ConfigPage {
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    private createEdit;
    private editConcurrentEdit;
    private editItemTabbing;
    private editCategoryIcon;
    private editSyncInfo;
    private createNew;
}
declare class Field extends ConfigPage {
    static FIELD_TYPE: string;
    private help;
    private project;
    private category;
    private fieldId;
    private field;
    private fieldOriginal;
    private fieldOptions;
    constructor();
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    static getFieldDescription(fieldType: string): IFieldDescription;
    static fieldHelp(fieldType: string): string;
    static fieldDescription: IFieldDescription[];
    static getDHFConfig(): IDHFConfig;
    static getPossibleFieldsForCategory(project: string, category: string): IFieldDescription[];
    static fieldGroupsBase: {
        value: string;
        label: string;
    }[];
    static fieldGroupsNormal: {
        value: string;
        label: string;
    }[];
    static fieldGroupsDocs: {
        value: string;
        label: string;
    }[];
    static getFieldGroups(category: string): {
        value: string;
        label: string;
    }[];
    protected isInternal(fieldType: string): boolean;
    protected showSimple(): void;
    protected showAdvanced(): void;
    protected addTabSelect(): void;
    protected doDelete(): void;
    private paramChanged;
    private addCommonFields;
    private canBePublished;
    private addRichtextFields;
    private addDateFields;
    private addSectionFields;
    private addPlainTextFields;
    private addFileManagerFields;
    private addDropdownFields;
    private showEditDropDown;
    private addUserFields;
    private addCascadingSelectFields;
    private addDownLinkFields;
    private addCheckboxFields;
    private addCrossLinkFields;
    private addGateFields;
    private editGateButtons;
    private editGateLine;
    private addUplinkInfo;
    private addRiskFields;
    private addTestFields;
    private addSyncFields;
    private addInternal;
    private addDocPropertySelector;
}
declare class TableConfigPlugin implements IPlugin {
    getFieldConfigOptions(): IFieldDescription[];
    private static columnTypes;
    addFieldSettings(configApp: any, project: string, pageId: string, fieldType: string, fieldParams: IFieldParameter, ui: JQuery, paramChanged: () => void, canBePublished: boolean): void;
    addColumnEditor(ui: JQuery, options: ITableParams, paramChanged: () => void): void;
    private askForColumnType;
    private editOptions;
    private static askForName;
    private static askForDropdownOptions;
    private static askForCategoryOptions;
    private static askForCategoryUpDownOptions;
}
declare class ExtensionFolder extends ConfigPage {
    static EXTENSION_FOLDER_ID: string;
    getNode(): {
        id: string;
        title: string;
        type: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showExtensions(users: IDropdownOption[]): void;
    setPluginSetting(wfgw: RestConnector, pluginId: string, key: string, value: string, encrypted: boolean, ok: Function, failure: Function): void;
}
interface IActualSetting {
    projectId: number;
    projectName: string;
    settingName: string;
    settingValue: any;
}
interface ISetupSetting {
    key: string;
    type: string;
    userTitle: string;
}
interface IProjectPlugin {
    owner: string;
    projectId: number;
    projectName: string;
    pwd: string;
    repo: string;
    user: string;
}
interface IServerPluginSettings {
    pluginName: string;
    displayName: string;
    capabilities: IGenericMap;
    needed: boolean;
    pluginId: number;
    comments: string;
    actualSettings: IActualSetting[];
    projects: IProjectPlugin[];
    setupSettings: ISetupSetting[];
}
declare class ProjectPluginSetting extends ConfigPage {
    static PROJECT_EXTENSION_BASE_ID: string;
    static PROJECT_EXTENSION_TYPE: string;
    private plugin;
    private pluginOrginal;
    private pluginChanged;
    private projectId;
    private clientConfig;
    private wfgw;
    constructor(projectId: string, plugin: IServerPluginSettings);
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    protected saveAsyncRec(idx: number): JQueryDeferred<IRestResult>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected getActualSetting(key: string): string;
    protected setActualSetting(key: string, newvalue: string): void;
    protected showServerSettings(): void;
    protected showTextInput(key: string, help: string, password: boolean): void;
    protected showclientConfigs(): void;
    protected showBool(field: string, text: string): void;
    protected showCreate(): void;
    protected editCreate(gidx: number): void;
    protected showSmartTasks(asSimpleId: boolean): void;
    protected editSmart(matchJustAnId: boolean, gidx: number): void;
    protected showSearches(): void;
    protected editSearch(gidx: number): void;
}
declare class ProjectPluginSettingFolder extends ConfigPage {
    static PROJECT_EXTENSION_FOLDER_BASE_ID: string;
    static PROJECT_EXTENSION_FOLDER_TYPE: string;
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: any;
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
}
declare class Project extends ConfigPage {
    static PROJECT_FOLDER_TYPE: string;
    spinningWait: JQuery;
    exportBtn: JQuery;
    getNode(): {
        type: string;
        id: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    private waitForJob;
    protected showSimple(): void;
    private showBranchInfoPage;
    protected deleteProject(): void;
    protected analyze(): void;
}
declare class ProjectLoad extends ConfigPage {
    static PROJECTLOAD_FOLDER_TYPE: string;
    getNode(): {
        type: string;
        id: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
}
declare class Projects extends ConfigPage {
    static PROJECT_FOLDER_ID: string;
    static PROJECT_FOLDER_TYPE: string;
    protected copyName: JQuery;
    protected copyId: JQuery;
    protected copyIdHint: JQuery;
    protected copyTemplate: JQuery;
    protected copyRemoveContent: JQuery;
    protected copyRemoveAccess: JQuery;
    protected copyKeepHistory: JQuery;
    protected copyCreate: JQuery;
    private projectCreationProgress;
    protected backName: JQuery;
    protected backId: JQuery;
    protected backIdHint: JQuery;
    protected backTemplate: JQuery;
    protected backTag: JQuery;
    protected backTagHint: JQuery;
    protected backOver: JQuery;
    protected enableUserImportCheckbox: JQuery;
    protected backNewTag: JQuery;
    protected backNewTagDescription: JQuery;
    protected backCreate: JQuery;
    protected backLastFile: FileList;
    getNode(): {
        type: string;
        id: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected showBackup(): void;
    protected waitForProjectJob(jobId: number, projectId: string): void;
    protected enableCreateBackup(): void;
    protected showCopy(): void;
    protected enableCreateCopy(): void;
    protected waitForProject(projectId: string): void;
    protected projectIdTest(projcectId: string, complainHere: JQuery, allowProjectOverwrite?: boolean): boolean;
    static checkProjectId(projcectId: string): "" | "the project id must be shorter than 20 characters" | "the project id must start with an uppercase letter" | "the project id can only consist of letters, digits and underscore";
}
declare class ACL extends ConfigPage {
    static ACL_BASE_ID: string;
    protected aclChanged: IACL;
    protected aclOriginal: IACL;
    protected grouped: IGenericMap;
    private readonly DOCSECTIONS;
    private readonly DOCSECTIONSTYPE;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected showRules(): void;
    protected editRule(gidx: number): void;
    protected showGroupsInRule(ul: JQuery, gidx: number): void;
    protected showAccessRightsDialog(gidx: number): void;
    private displayAccessRights;
    private yesNo;
    private na;
    private getCatAcl;
    private paramChanged;
    protected analyze(): void;
}
declare class Branch extends ConfigPage {
    static BRANCH_BASE_ID: string;
    getNode(): {
        type: string;
        title: string;
        id: string;
        iconClass: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<IRestResult>;
    load(pageId: string): void;
    showSimple(): void;
    private showCreatePage;
    private validate;
    private startCopy;
    protected waitForProjectJob(jobId: number, projectId: string): void;
}
declare class BranchConfig extends ConfigPage {
    protected uploader: JQuery;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
}
declare class CategoryGroups extends ConfigPage {
    static CATEGORYGROUPS_BASE_ID: string;
    protected groupsChanged: ICategoryGroups;
    protected groupsOriginal: ICategoryGroups;
    protected grouped: IGenericMap;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected showGroups(): void;
    protected editGroup(gidx: number): void;
    protected showCategoriesInGroup(ul: JQuery, gidx: number): void;
    protected getAvailableCategories(cats: string[]): IDropdownOption[];
    private paramChanged;
    protected analyze(): void;
}
declare class ContextPages extends ConfigPage {
    static CONTEXTPAGE_BASE_ID: string;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showSimple(): void;
    protected showSimpleProp(key: string, title: string, label: string): void;
    protected showAdvanced(): void;
}
interface ISectionDef {
    name: string;
    type: string;
}
declare class DhfConfig extends ConfigPage {
    static LOCK_BASE_ID: string;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected showDocumentStructures(): void;
    protected showSignatureMeanings(): void;
    protected editStructure(docId: string): void;
    protected editSignatureMeaning(sicId: string): void;
}
declare class DropDowns extends ConfigPage {
    static DROPDOWN_BASE_ID: string;
    private project;
    private newId;
    private hint;
    private tests;
    private updates;
    private guiTools;
    create: JQuery;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    setProject(project: string): void;
    showDropDownAdd(ui: JQuery, text: string, pageId?: string, created?: (id: string) => void): void;
    editDropDownOptions(ddid: string, saveDirect: boolean): void;
    editDropDownGroups(ddid: string, saveDirect: boolean): void;
    editAdvanced(ddid: string): void;
    private paramChanged;
    private showDropDowns;
}
declare class DrowDownEditorGui {
    private dropdownEdit;
    private jsonEditor;
    constructor();
    test(ui: JQuery, id: string, dropdown: IDropDownConfig): void;
    editOptions(dropdown: IDropDownConfig, onOk: (update: IDropDownConfig) => void): void;
    editGroups(dropdown: IDropDownConfig, onOk: (update: IDropDownConfig) => void): void;
    private goodId;
    private verify;
    advancedDlg(ddid: string, dropdown: IDropDownConfig, onOk: (update: IDropDownConfig) => void): void;
    getValue(): IDropDownConfig;
}
declare class Extras extends ConfigPage {
    static EXTRAS_BASE_ID: string;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showSimple(): void;
    protected showSimpleProp(key: string, label: string, help: string): void;
    protected showAdvanced(): void;
}
declare class ItemLock extends ConfigPage {
    static LOCK_BASE_ID: string;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showSimple(): void;
    protected showLocks(): void;
    protected editGroup(gidx: number): void;
    protected showLockMasters(ul: JQuery, gidx: number): void;
    protected showAdvanced(): void;
}
declare class Labels extends ConfigPage {
    static LABELS_BASE_ID: string;
    private labelsOriginal;
    private labelsChanged;
    private labelTools;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected analyze(): void;
    static getName(label: ILabel): string;
    protected showShared(): void;
    protected showOr(): void;
    protected showXor(): void;
    protected showReview(): void;
    protected showDesignReview(): void;
    protected showGroup(groupType: string): void;
    protected sortGroup(groupIdx: number): void;
    protected editGroup(groupType: string, groupIdx: number): void;
    protected editOrGroup(groupType: string, groupIdx: number): void;
    protected showDesignReviewLabels(ul: JQuery): void;
    protected showLabelsInGroup(ul: JQuery, groupType: string, gidx: number): void;
    protected editLabel(groupIdx: number, groupType: string, label: string): void;
    protected getLabelProp(ldef: ILabel, ps: string): any;
    protected groupsAreSame(g1: ILabelGroup, g2: ILabelGroup): boolean;
    static getLabelName(projectId: string, label: string): string;
    static getLabelOptions(includeDesignReviews?: boolean): IDropdownOption[];
    static hasCategory(projectId: string, category: string): boolean;
    static removeCategory(projectId: string, category: string): JQueryDeferred<string | {}>;
}
declare class Mail extends ConfigPage {
    static MAIL_BASE_ID: string;
    private mailChanged;
    private mailOriginal;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    paramChanged(): void;
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    protected showAdvanced(): void;
}
declare class NavigationBarConfig extends ConfigPage {
    protected uploader: JQuery;
    private settingOriginal;
    private settingNow;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected editTab(idx: number): void;
}
declare class ProjectLogo extends ConfigPage {
    protected uploader: JQuery;
    protected logo: IStringMap;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected addUploadArea(logoName: string, help: string, logoId: string, removeName: string, defaultPath: string, fileTypes: string[], containerDisplayClass: string): void;
    protected fileUploaded(uploaded: JQuery, logoId: string): void;
    protected logoDeleted(logoId: string): void;
}
declare class ProjectSettingsFolder extends ConfigPage {
    static PROJECT_SETTING_FOLDER_BASE_ID: string;
    static PROJECT_SETTING_FOLDER_TYPE: string;
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected createNewSetting(): void;
    protected deleteSettings(key: string): void;
    protected createEditSetting(key: string): void;
}
declare class QMS extends ConfigPage {
    static QMS_BASE_ID: string;
    private qmsConfigOriginal;
    private qmsConfigChanged;
    protected labelsConfigOriginal: ILabelsConfig;
    protected labelsConfigChanged: ILabelsConfig;
    protected affectedConfigOriginal: IDropDownConfig;
    protected affectedConfigChanged: IDropDownConfig;
    protected responsibleConfigOriginal: IDropDownConfig;
    protected responsibleConfigChanged: IDropDownConfig;
    protected grouped: IGenericMap;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<IRestResult>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    /************************** Roles rights *************************/
    protected showRoles(): void;
    protected showPushRoles(): void;
    protected showRolesFor(responsible: boolean): void;
    protected showRole(ul: JQuery, responsible: boolean, roleIdx: number, roleName: string, showUp: boolean, showDown: boolean): void;
    protected editRole(responsible: boolean, roleIdx: number): void;
    protected createRole(responsible: boolean): void;
    /************************** Publishing rights *************************/
    protected showPublishing(publication: IPublication): void;
    /************************** Viewing rights *************************/
    protected showViewingRights(): void;
    /************************** PROC and WI reviewer *************************/
    protected showReviewers(categoryRules: IPublicationCategory): void;
    protected showLabelReviewers(label: string, reviewType: string): void;
    /************************** Groups *************************/
    protected showGroupLabels(groupType: string, groupName: string, groupCategory: string): void;
    protected moveUp(el: JQuery): void;
    protected moveDown(el: JQuery): void;
    protected showGroupLabel(groupType: string, ul: JQuery, groupLabelId: string, showUp: boolean, showDown: boolean): void;
    protected editGroupLabel(groupLabelId: string): void;
    protected createGroupLabel(groupType: string, groupCategory: string): void;
    protected getLabelName(labelId: string): string;
    protected setLabelName(labelId: string, newName: string): void;
    protected deleteGroupLabel(groupLabelId: string): void;
    protected analyze(): void;
}
declare class Risks extends ConfigPage {
    static RISKS_BASE_ID: string;
    protected riskOriginal: IRiskConfig;
    protected riskChanged: IRiskConfig;
    protected riskFactorIds: string[];
    protected riskWeightIds: string[];
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected riskSave(event: IItemChangeEvent): void;
    protected paramChanged(): void;
    protected showAdvanced(): void;
    protected showError(area: string): void;
    protected showSimple(): void;
    protected analyze(): void;
    protected showTest(): void;
    protected showReductions(): void;
    protected showPerControlReductions(): void;
    protected editReduction(rr_idx: number): void;
    protected showMethod(): void;
    protected editRpnTable(): void;
    protected editRiskZones(): void;
    protected editRPNLooks(which: string): void;
    protected showRiskControls(): void;
    protected showFactors(): void;
    protected getNameOfType(type: string): "dropdown" | "multiline text field" | "rich text" | "line of text";
    protected showWeights(factorLi: JQuery, factorIdx: number, isPostReductionFactor?: boolean): void;
    protected createEditFactor(idx: number): void;
    protected createEditWeight(fidx: number, widx: number, isPostReductionFactor?: boolean): void;
    protected createEditFactorOptions(fidx: number): void;
    static hasCategory(projectId: string, category: string): boolean;
    static removeCategory(projectId: string, category: string): JQueryDeferred<unknown>;
}
declare class RiskSettings extends Risks {
    private fieldConfig;
    private onChangeFieldSetting;
    addFieldSettings(configApp: ConfigApp, project: string, pageId: string, fieldType: string, fieldParams: IRiskTableControlOptions, ui: JQuery, paramChanged: () => void): void;
    postSave(project: string, field: string): void;
    protected showPostDialogsForRisks(project: string, search: string): void;
    protected showPostSaveDialog(project: string): void;
    protected startReIndex(project: string, content: JQuery, dlg: JQuery): void;
    protected paramChanged(): void;
}
declare class Search extends ConfigPage {
    protected mc: ISearchConfig;
    static SEARCH_BASE_ID: string;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected createEditSearch(idx: number): void;
    protected showAdvanced(): void;
}
interface ITestColumns {
    testCats: string[];
    shared: ITableParams;
    xtcOnly: ITableParams;
}
declare class Tests extends ConfigPage {
    static TESTS_BASE_ID: string;
    private testOriginal;
    private testChanged;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected fixTestChanged(): void;
    protected showError(area: string): void;
    protected showSimple(): void;
    protected analyze(): void;
    protected showTestCategories(): void;
    protected showTestColumns(): void;
    private getTestColumns;
    protected showPresetFields(): void;
    protected showDefaultTester(): void;
    protected showDefaultTestResultResult(): void;
    protected showSearchExpressions(): void;
    showTestStepResults(): void;
    editAutomatic(): void;
    editManual(): void;
    editSteps(): void;
    static hasCategory(projectId: string, category: string): boolean;
    static removeCategory(projectId: string, category: string): JQueryDeferred<string | {}>;
}
declare class TextMacros extends TextMacroBase {
    static MACROS_BASE_ID: string;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    private saveProject;
    private saveServer;
    load(pageId: string): void;
}
declare class Traceability extends ConfigPage {
    static TRACE_BASE_ID: string;
    private traceOriginal;
    private traceChanged;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    load(pageId: string): void;
    private paramChanged;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected categoriesWithLinks(): string[];
    protected showGraph(): void;
    protected analyze(): void;
    protected showConfig(): void;
    static getCatTypeOptions(): {
        id: string;
        label: string;
    }[];
    protected editCategory(cidx: number): void;
    protected showRules(sul: JQuery, tridx: number, down: boolean): void;
    protected editRule(tridx: number, idx: number, down: boolean): void;
    static hasCategory(projectId: string, category: string): boolean;
    static removeCategory(projectId: string, category: string): JQueryDeferred<string | {}>;
    static getCategoryOfType(type: string): string[];
    static getDocCats(): string[];
    static getCategoryTypeHuman(category: string): string;
    static addCategory(catId: string, projectId: string, catType: string): JQueryDeferred<string | {}>;
}
declare class WordTemplate extends ConfigPage {
    protected uploader: JQuery;
    protected labelUI: LabelTemplateSettings;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<string | {}>;
    willUnload(): void;
    load(pageId: string): void;
    protected fileUploaded(): void;
    protected doDelete(): void;
}
declare class LabelTemplateSettings {
    DOCUMENT_STATUS_GROUP: string;
    DEFAULT_LABEL_NAME: string;
    LABEL_COLOR_ACTIVE: ICIColor;
    LABEL_COLOR_PASSIVE: ICIColor;
    LABEL_REGEX_STRING: string;
    LABEL_REGEX: RegExp;
    labels: ILabelsConfig;
    project: string;
    container: JQuery;
    fileEditors: {
        [key: string]: JQuery;
    };
    deleteEnabled?: string;
    newLabelText: string;
    constructor(container: JQuery, project: string);
    private documentClickHandler;
    removeDocumentClickHandler(): void;
    update(): void;
    private makeSureItHasDefaults;
    buildUITable(): void;
    private isTheLabalValueNew;
    private checkAddLabelButton;
    private addLabelSubmit;
    fileEditor(labelName: string): JQuery;
    addNewLabel(name: string): void;
    getSettings(): string;
    private deleteLabel;
    addLabelToLabelConfig(config: ILabelsConfig, label: ILabel, addToFront?: boolean): ILabelsConfig;
    updateStatusGroup(config: ILabelsConfig, newGroup: ILabelGroup): ILabelsConfig;
    findStatusGroup(config: ILabelsConfig): ILabelGroup;
    deleteLabelFromConfig(config: ILabelsConfig, labelID: string): ILabelsConfig;
    createLabel(name: string): ILabel;
    createDefaultLabel(): ILabel;
    styleSet(text: string): {
        on: {
            foreground: string;
            background: string;
            icon: string;
            displayName: string;
            tooltip: string;
        };
        off: {
            foreground: string;
            background: string;
            icon: string;
            displayName: string;
            tooltip: string;
        };
    };
    enabledLabel(text: string): {
        foreground: string;
        background: string;
        icon: string;
        displayName: string;
        tooltip: string;
    };
    disabledLabel(text: string): {
        foreground: string;
        background: string;
        icon: string;
        displayName: string;
        tooltip: string;
    };
    labelStyle(text: string, foreground: ICIColor, background: ICIColor): {
        foreground: string;
        background: string;
        icon: string;
        displayName: string;
        tooltip: string;
    };
    createGroup(): ILabelGroup;
}
interface IFileConfig {
    sharing: string;
}
declare class FileSettings extends ConfigPage {
    private fileConfig;
    private fileSetting;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    paramChanged(): void;
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showAdvanced(): void;
}
declare class DateTimeSettings extends ConfigPage {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
}
interface IRestoreObject {
    project: string;
    newId: string;
}
declare class SettingDeletedProjects extends ConfigPage {
    private dpChanged;
    private dpOriginal;
    private backIdHint;
    static SERVER_SETTING_DELETED_PROJECTS: string;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected enableRestore(restoreBtn: JQuery, restore: IRestoreObject): void;
}
declare class JobList extends ConfigPage {
    interval: number;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    willUnload(): void;
    JobList: {
        [key: number]: JQuery;
    };
    protected showHide(name: string, checked: boolean): void;
    protected showSimple(): void;
    createNewJob(job: XRJobWithUrl): void;
}
declare class PasswordSettings extends ConfigPage {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    private changePasswordExpiry;
}
declare class PrintConfig extends ConfigPage {
    private dpChanged;
    private dpOriginal;
    private resyncButton;
    private validateButton;
    private validation;
    static SERVER_SETTING_PRINTCONFIG_PAGE_ID: string;
    static SERVER_SETTING_PRINTCONFIG_SETTING: string;
    private static BUTTON_TEXT;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    private paramChanged;
    load(pageId: string): void;
    private updateSettings;
    private validateSettings;
    protected showAdvanced(): void;
    protected showSimple(): void;
    resyncSettings(): void;
    /** --------------------------------
     * Resync code
     * First load all settings from the items, then apply this back to the server
     **/
    /***
     * Go through all the items in the PRINT project and collect the code fragments
     * @param current The current configuration, the source project and functionDefaults will be kept
     * @private
     */
    private getSyncedSettings;
    /***
     * Wrapper around the matrix rest call, returning a regular Promise
     * @param url the URL to call, will be prefixed with the current PRINT project
     * @private
     */
    private callMatrix;
    /***
     * Get the all items in a category and their code
     * @param type The type to get all code fragments for
     * @private
     */
    private getItemMap;
    /***
     * Get the field ID of the CODE field of the given category. This uses the current PRINT project
     * @param category The category ID
     * @private
     */
    private getCodeField;
    /***
     * Get the value of the CODE field of an item
     * @param id The item ID
     * @private
     */
    private getFieldValue;
}
declare type ItemCode = {
    item: string;
    code: string;
};
declare type ItemCodeMap = {
    [key: string]: string;
};
declare class ServerSettingsFolder extends ConfigPage {
    static SERVER_SETTING_FOLDER_ID: string;
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showSimple(): void;
    protected showPlugins(): void;
}
declare class SettingProjectGroups extends ConfigPage {
    groupsChanged: IProjectGroups;
    groupsOriginal: IProjectGroups;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected showSimple(): void;
    protected showGroups(): void;
    protected editGroup(gidx: number): void;
    protected showProjectsInGroup(ul: JQuery, gidx: number): void;
    private paramChanged;
}
declare class SettingTerms extends TextMacroBase {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
}
declare class TemplateProjects extends ConfigPage {
    private templates;
    private original;
    static SERVER_SETTING_TEMPLATE_PROJECTS: string;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected onChange(): void;
    protected showSimple(): void;
    protected verifySource(ul: JQuery, project: string): void;
    protected verifyMarkAsTemplate(ul: JQuery, project: string): void;
    protected showProjectsInGroup(help: string, master: boolean): void;
    protected showAdvanced(): void;
}
declare class ToDoSettings extends ConfigPage {
    private todoConfig;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    paramChanged(): void;
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showAdvanced(): void;
}
declare class Tokens extends ConfigPage {
    private tokens;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    paramChanged(): void;
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    protected showTokens(container: JQuery, allUsers: XRGetUser_AllUsers_GetUserListAck): void;
    protected showAdvanced(): void;
}
declare class UIConfig extends ConfigPage {
    private dpChanged;
    private dpOriginal;
    static SERVER_SETTING_UI_PAGE_ID: string;
    static SERVER_SETTING_UI_SETTING: string;
    getNode(): {
        id: string;
        type: string;
        title: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    private paramChanged;
    load(pageId: string): void;
    protected showAdvanced(): void;
    protected showSimple(): void;
}
interface GroupAccessUser {
    overall: string;
    details: string[];
}
declare class ConfigPageUsersBase extends ConfigPage {
    private vscroll;
    private ivscroll;
    private hscroll;
    private ihscroll;
    private filterBox;
    private mainTable;
    private leftTable;
    private leftContainer;
    protected leftBody: JQuery;
    private topTable;
    private topContainer;
    protected headerRow: JQuery;
    protected accessTable: JQuery;
    private accessContainer;
    protected accessBody: JQuery;
    protected createMainContainer(): void;
    protected initTooltipBox(onShow: (cell: JQuery) => string): void;
    protected placeChangeMenu(uio: JQuery, cell: JQuery): void;
    protected doAllVerticalCells(accessTable: JQuery, row: number, col: number, change: (cell: JQuery, option: string) => JQueryDeferred<{}>, option: string): void;
    protected doAllHorizontalCells(accessTable: JQuery, row: number, col: number, change: (cell: JQuery, option: string) => JQueryDeferred<{}>, option: string): void;
    protected initCellMenu(menu: number, change: (cell: JQuery, option: string) => JQueryDeferred<{}>): void;
    protected hideMenu(): void;
    protected scrollTop(): void;
    protected scrollLeft(): void;
    protected initTableScrolling(paddingBottom?: number): void;
    protected addFilter(label: string, key: string, alt?: string, onAltClick?: () => void): JQuery;
    protected addFilterUserGroup(label: string, classKey: string, dataKey: string, alt?: string, onAltClick?: () => void): JQuery;
    protected addFilterProjectGroup(label: string, classKey: string, dataKey: string, alt?: string, onAltClick?: () => void): JQuery;
    protected addFilterGroup(options: IDropdownOption[], resolve: (selected: string[]) => string[], label: string, classKey: string, dataKey: string, alt?: string, onAltClick?: () => void): JQuery;
    protected isMember(groupId: number, login: string): boolean;
    protected updateMember(groupId: number, login: string, isMember: boolean): void;
    protected getAccessRights(groupId: number, project: string): "" | "W" | "Q" | "R";
    protected getAccessLetterFromNumber(projectRights: number): "" | "W" | "Q" | "R";
}
declare class GroupsAccessOverview extends ConfigPageUsersBase {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    private setAccess;
}
interface GroupAccessUser {
    overall: string;
    details: string[];
}
declare class UserAccessOverview extends ConfigPageUsersBase {
    private allAdmins;
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    readonly AR_NoAccess = -1;
    readonly AR_WriteAccess = 1;
    readonly AR_ReadAccess = 0;
    readonly AR_QMSAccess = 2;
    showSimple(): void;
    private showSimpleInner;
    private setAccess;
    private computeOverallAccess;
    private updateMail;
    private getGroupAccess;
}
interface IUserFilter {
    filterText: string;
    deleted: boolean;
    filterGroup: string[];
}
declare class UserDetails extends ConfigPage {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    protected applyFilter(filter: IUserFilter): void;
    protected insertImage(imageID: string): string;
    protected formatPasswordAge(maxage: number, age: number): string | number;
}
declare class UserGroups extends ConfigPageUsersBase {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    protected showUserGroups(): void;
    protected getGroupLi(idx: number): JQuery;
    protected createUserGroup(ul: JQuery): void;
    protected editUserGroup(gidx: number, li: JQuery): void;
}
declare class UserGroupsAccess extends ConfigPageUsersBase {
    getNode(): {
        type: string;
        title: string;
        id: string;
        icon: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
    private setAccess;
}
declare class UsersFolder extends ConfigPage {
    static USERS_FOLDER_ID: string;
    getNode(): {
        type: string;
        id: string;
        icon: string;
        title: string;
        children: IDB[];
    };
    saveAsync(): JQueryDeferred<unknown>;
    load(pageId: string): void;
    showSimple(): void;
}
//# sourceMappingURL=admin.d.ts.map