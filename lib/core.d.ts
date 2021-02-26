/// <reference path="../../../web/ts/tinymce.d.ts" />
/// <reference types="jquery" />
declare var verbose: boolean;
declare var globalShiftDown: boolean;
declare var globalCtrlDown: boolean;
declare var resetHighlightLinks: Function;
declare var PopulateProjects: Function;
declare var mobileApp: {
    Login: Function;
    ShowLoginScreen: Function;
    ShowMobileUI: Function;
};
declare var jiraPlugin: any;
declare var jsl: any;
declare var EmbeddedReport: any;
declare var Admin: any;
interface Admin {
}
interface MatrixReq {
}
interface Error {
    name: string;
    message: string;
}
interface IControlDefinition {
    name?: string;
    control?: JQuery;
    fieldId?: number;
    isDhfType?: boolean;
    ctrlType?: string;
}
interface IGenericMap {
    [key: string]: any;
}
interface IAnyMap {
    [key: string]: any;
}
interface IStringMap {
    [key: string]: string;
}
interface IItemGetMap {
    [key: string]: IItemGet;
}
interface INumberStringMap {
    [key: number]: string;
}
interface IStringNumberMap {
    [key: string]: number;
}
interface IBooleanMap {
    [key: string]: boolean;
}
interface IStringStringArrayMap {
    [key: string]: string[];
}
interface IStringJQueryMap {
    [key: string]: JQuery;
}
interface IJsonSetting {
    id: string;
    value: any;
}
interface IRestParam extends Object {
    td?: number;
    reason?: string;
    filter?: string;
    [key: string]: any;
}
declare type IRestResult = {} | string;
declare var doc: any;
declare var addHighlightLink: Function;
declare var addHighlightRegex: Function;
declare var ITEM_DOES_NOT_EXIST: string;
declare var matrixRestUrl: string;
declare var matrixBaseUrl: string;
declare var matrixWfgw: string;
declare var matrixExpress: boolean;
declare var matrixProduct: string;
declare var mxOauth: string;
declare var mxOauthLoginUrl: string;
declare var matrixApplicationUI: Application;
declare var IC: ItemConfiguration;
declare var matrixSession: MatrixSession;
declare var serverStorage: IDataStorage;
declare var projectStorage: IDataStorage;
declare var restConnection: RestConnector;
declare var wfgwConnection: RestConnector;
declare var app: MatrixReq;
declare var globalShiftDown: boolean;
declare var globalCtrlDown: boolean;
declare var historyFilter: string;
declare var EmbeddedReport: any;
declare var Modernizr: any;
interface JQuery {
    itemTree?: ({}: {}) => JQuery;
    riskCtrl?: ({}: {}) => JQuery;
}
interface IReference {
    projectShortLabel?: string;
    to: string;
    title: string;
    modDate?: string;
    isIndirect?: boolean;
}
interface IItemIdParts {
    id: string;
    version: number;
    type: string;
    isFolder: boolean;
    url: string;
    link: string;
    linkv: string;
    number: number;
}
interface IReferenceChange {
    action: string;
    fromId: string;
    toId: string;
}
interface IEmail {
    summary: string;
    description: string;
    matrixProject: string;
    matrixItem: string;
    browser: string;
    log: string;
    email?: string;
}
interface IDevice {
    screen: ISize;
    viewport: ISize;
}
interface ISize {
    width: number;
    height: number;
}
interface IItem {
    upLinks?: IReference[];
    upLinkList?: XRTrimLink[];
    downLinks?: IReference[];
    children?: IItem[];
    history?: IItemHistory[];
    modDate?: string;
    isUnselected?: number;
    availableFormats?: string[];
    selectSubTree?: XRCategoryAndRoot[];
    requireSubTree?: XRCategoryAndRoot[];
    icon?: string;
    type?: string;
    id?: string;
    title?: string;
    linksUp?: string;
    linksDown?: string;
    isFolder?: boolean;
    isDeleted?: boolean;
    maxVersion?: number;
    docHasPackage?: boolean;
    [key: string]: any;
}
interface ILink {
    from: string;
    to: string;
}
interface IItemGet extends IItem {
    labels?: string[];
}
interface IItemPut extends IItem {
    labels?: string;
    onlyThoseFields?: number;
    onlyThoseLabels?: number;
}
interface IItemHistory {
    action: string;
    user: string;
    dateUserFormat: string;
    comment: string;
    id: string;
    version: number;
    date: string;
    title: string;
    deletedate?: string;
}
interface IDataStorage {
    setItem: (itemKey: string, itemVal: string, sanitize?: boolean) => void;
    getItem: (itemKey: string, dontSanitize?: boolean) => string;
    getItemDefault: (itemKey: string, defaultValue: string) => string;
}
declare enum ControlState {
    FormEdit = 0,
    FormView = 1,
    DialogCreate = 2,
    HistoryView = 3,
    Tooltip = 4,
    Print = 5,
    Report = 6,
    DialogEdit = 7
}
declare namespace Summernote {
    interface editor extends JQuery {
        summernote: (p: any) => any;
        cleanHtml: () => Node;
        setCursorXY: (p1: any, p2: any, p3: any) => any;
        insertImage: (p1: any, p2: any, p3?: any, p4?: any) => any;
        insert: (p1: any, p2: any, p3: any) => any;
        destroy: () => any;
        insertText: (editable: any, text: string) => any;
        insertHTML: (editable: any, targetElement: JQuery, selection: any, range: any, html: string, uncleanHTML?: string) => void;
        afterCommand: (editable: any) => any;
        insertNode: (editable: any, node: any, inline: boolean) => void;
    }
    interface layoutInfo {
        editable: () => JQuery;
    }
    interface summernote extends JQuery {
        summernote: {
            renderer: {
                getTemplate: () => any;
            };
            eventHandler: {
                getEditor: () => any;
            };
            addPlugin: (pluginConfig: Summernote.plugin) => any;
        };
    }
    interface plugin {
        name: string;
        buttons: pluginButton;
        init: (layoutInfo: any) => void;
        dialogs: {};
        events: pluginEvent;
    }
    interface pluginButton {
        [key: string]: (lang?: any, opt?: any) => void;
    }
    interface pluginEvent {
        [key: string]: (layoutInfo: any, value?: string, target?: JQuery, event?: JQueryEventObject) => void;
    }
}
declare interface JQueryStatic {
    summernote: {
        eventHandler: {
            getEditor: () => any;
        };
    };
}
interface HTMLElementExt extends HTMLElement {
    createTextRange: () => any;
    moveToElementText: (p1: any) => any;
    collapse: (p1: any) => any;
    select: () => any;
}
declare interface JQueryStatic {
    cookie: (key: string) => string;
}
interface DatepickerOptions {
    format?: string | DatepickerCustomFormatOptions;
    weekStart?: number;
    startDate?: any;
    endDate?: any;
    autoclose?: boolean;
    startView?: number;
    todayBtn?: any;
    todayHighlight?: boolean;
    keyboardNavigation?: boolean;
    language?: string;
    beforeShowDay?: (date: any) => any;
    calendarWeeks?: boolean;
    clearBtn?: boolean;
    daysOfWeekDisabled?: number[];
    forceParse?: boolean;
    inputs?: any[];
    minViewMode?: any;
    multidate?: any;
    multidateSeparator?: string;
    orientation?: string;
    assumeNearbyYear?: any;
    viewMode?: string;
}
interface DatepickerCustomFormatOptions {
    toDisplay?(date: string, format: any, language: any): string;
    toValue?(date: string, format: any, language: any): Date;
}
interface DatepickerEventObject extends JQueryEventObject {
    date: Date;
    format(format?: string): string;
}
interface JQuery {
    datepicker(): JQuery;
    datepicker(methodName: string): any;
    datepicker(methodName: string, params: any): any;
    datepicker(options: DatepickerOptions): JQuery;
    off(events: "changeDate", selector?: string, handler?: (eventObject: DatepickerEventObject) => any): JQuery;
    off(events: "changeDate", handler: (eventObject: DatepickerEventObject) => any): JQuery;
    on(events: "changeDate", selector: string, data: any, handler?: (eventObject: DatepickerEventObject) => any): JQuery;
    on(events: "changeDate", selector: string, handler: (eventObject: DatepickerEventObject) => any): JQuery;
    on(events: 'changeDate', handler: (eventObject: DatepickerEventObject) => any): JQuery;
}
interface ISelectizeOptions {
    delimiter?: string;
    diacritics?: boolean;
    create?: any;
    createOnBlur?: boolean;
    createFilter?: any;
    highlight?: boolean;
    persist?: boolean;
    openOnFocus?: boolean;
    maxOptions?: number;
    maxItems?: number;
    hideSelected?: boolean;
    allowEmptyOption?: boolean;
    scrollDuration?: number;
    loadThrottle?: number;
    preload?: any;
    dropdownParent?: string;
    addPrecedence?: boolean;
    selectOnTab?: boolean;
    plugins?: string[];
    options?: any[];
    dataAttr?: string;
    valueField?: string;
    optgroups?: any[];
    optgroupValueField?: string;
    labelField?: string;
    optgroupLabelField?: string;
    optgroupField?: string;
    sortField?: any;
    searchField?: any;
    searchConjunction?: string;
    optgroupOrder?: string[];
    copyClassesToDropdown?: boolean;
    placeholder?: string;
    onChange?(value: any): any;
}
interface ISelectizeApi {
    setValue: (p: any) => any;
}
interface JQuery {
    selectize(options?: ISelectizeOptions): JQuery;
}
interface HTMLElement {
    selectize: ISelectizeApi;
}
declare namespace JQueryUI {
    interface UI {
        fancytree: Fancytree.FancytreeStatic;
    }
}
interface JQuery {
    fancytree(options?: Fancytree.FancytreeOptions): Fancytree.Fancytree;
    fancytree(option?: string, ...rest: any[]): any;
}
declare namespace Fancytree {
    interface Fancytree {
        $div: JQuery;
        rootNode: FancytreeNode;
        /** Activate node with a given key and fire focus and
         * activate events. A prevously activated node will be
         * deactivated. If activeVisible option is set, all parents
         * will be expanded as necessary. Pass key = false, to deactivate
         * the current node only.
         *
         * @returns {FancytreeNode} activate node (null, if not found)
         */
        activateKey(key: string): FancytreeNode;
        /** (experimental)
         *
         * @returns resolved, when all patches have been applied
         */
        applyPatch(patchList: NodePatch[]): JQueryPromise<any>;
        /** [ext-clones] Replace a refKey with a new one. */
        changeRefKey(oldRefKey: string, newRefKey: string): void;
        /** [ext-persist] Remove persistence cookies of the given type(s).
         *  Called like $("#tree").fancytree("getTree").clearCookies("active expanded focus selected"); */
        clearCookies(): void;
        /** [ext-filter] Reset the filter.  */
        clearFilter(): void;
        /** Return the number of nodes. */
        count(): number;
        /** Write to browser console if debugLevel >= 2 (prepending tree name)  */
        debug(msg: any): void;
        /** [ext-filter] Dimm or hide whole branches.
         * @returns {integer} count
         */
        filterBranches(filter: string): number;
        /** [ext-filter] Dimm or hide whole branches.
         * @returns {integer} count
         */
        filterBranches(filter: (node: FancytreeNode) => boolean): number;
        /** [ext-filter] Dimm or hide nodes.
         * @returns {integer} count
         */
        filterNodes(filter: string, leavesOnly?: boolean): number;
        /** [ext-filter] Dimm or hide nodes.
         * @returns {integer} count
         */
        filterNodes(filter: (node: FancytreeNode) => boolean, leavesOnly?: boolean): number;
        /** Find the next visible node that starts with `match`, starting at `startNode` and wrap-around at the end.
         *
         * @returns matching node or null
         */
        findNextNode(match: string, startNode?: FancytreeNode): FancytreeNode;
        /** Find the next visible node that starts with `match`, starting at `startNode` and wrap-around at the end.
         *
         * @returns matching node or null
         */
        findNextNode(match: (node: FancytreeNode) => boolean, startNode?: FancytreeNode): FancytreeNode;
        /** Generate INPUT elements that can be submitted with html forms. In selectMode 3 only the topmost selected nodes are considered. */
        generateFormElements(selected?: boolean, active?: boolean): void;
        /** Return the currently active node or null.  */
        getActiveNode(): FancytreeNode;
        /** Return the first top level node if any (not the invisible root node). */
        getFirstChild(): FancytreeNode;
        /** Return node that has keyboard focus.
         *
         * @param ifTreeHasFocus (default: false) (not yet implemented)
         */
        getFocusNode(ifTreeHasFocus?: boolean): FancytreeNode;
        /** Return node with a given key or null if not found.
         *
         * @param searchRoot (optional) only search below this node.
         */
        getNodeByKey(key: string, searchRoot?: FancytreeNode): FancytreeNode;
        /** [ext-clones] Return all nodes with a given refKey (null if not found).
         *
         * @param rootNode optionally restrict results to descendants of this node.
         */
        getNodesByRef(refKey: string, rootNode?: FancytreeNode): FancytreeNode[];
        /** [ext-persist] Return persistence information from cookies Called like $("#tree").fancytree("getTree").getPersistData(); */
        getPersistData(): void;
        /** Return the invisible system root node.  */
        getRootNode(): FancytreeNode;
        /** Return an array of selected nodes.
         *
         * @param stopOnParents only return the topmost selected node (useful with selectMode 3)
         */
        getSelectedNodes(stopOnParents?: boolean): FancytreeNode[];
        /** Return true if the tree control has keyboard focus */
        hasFocus(): boolean;
        /** Write to browser console if debugLevel >= 1 (prepending tree name)  */
        info(msg: any): void;
        /**  [ext-edit] Check if any node in this tree in edit mode. */
        isEditing(): FancytreeNode;
        /** Make sure that a node with a given ID is loaded, by traversing - and loading - its parents. This method is ment for lazy hierarchies. A callback is executed for every node as we go.
         *
         * @param keyPathList one or more key paths  (e.g. '/3/2_1/7')
         * @param callback callback(node, status) is called for every visited node ('loading', 'loaded', 'ok', 'error')
         */
        loadKeyPath(keyPathList: string[], callback: (node: FancytreeNode, status: string) => void): JQueryPromise<any>;
        /** Make sure that a node with a given ID is loaded, by traversing - and loading - its parents. This method is ment for lazy hierarchies. A callback is executed for every node as we go.
         *
         * @param keyPath a key path (e.g. '/3/2_1/7')
         * @param callback callback(node, status) is called for every visited node ('loading', 'loaded', 'ok', 'error')
         */
        loadKeyPath(keyPath: string, callback: (node: FancytreeNode, status: string) => void): JQueryPromise<any>;
        /** Re-fire beforeActivate and activate events. */
        reactivate(): void;
        /** Reload tree from source and return a promise.
         *
         * @param source optional new source (defaults to initial source data)
         */
        reload(source?: any): JQueryPromise<any>;
        /** Render tree (i.e. create DOM elements for all top-level nodes).
         *
         * @param force create DOM elements, even is parent is collapsed (default = false)
         * @param deep (default = false)
         */
        render(force?: boolean, deep?: boolean): void;
        /** @param flag (default = true) */
        setFocus(flag?: boolean): void;
        /** Return all nodes as nested list of NodeData.
         *
         * @param callback Called for every node
         * @param includeRoot Returns the hidden system root node (and its children) (default = false)
         */
        toDict(includeRoot?: boolean, callback?: (node: FancytreeNode) => void): any;
        /** Call fn(node) for all nodes.
         *
         * @param fn the callback function. Return false to stop iteration, return "skip" to skip this node and children only.
         * @returns false, if the iterator was stopped.
         */
        visit(fn: (node: FancytreeNode) => any): boolean;
        /** Write warning to browser console (prepending tree info) */
        warn(msg: any): void;
    }
    /** A FancytreeNode represents the hierarchical data model and operations. */
    interface FancytreeNode {
        /** The tree instance */
        tree: Fancytree;
        /** The parent node */
        parent: FancytreeNode;
        /** Node id (must be unique inside the tree) */
        key: string;
        /** Display name (may contain HTML) */
        title: string;
        /** Contains all extra data that was passed on node creation */
        data: Object;
        /** Array of child nodes. For lazy nodes, null or undefined means 'not yet loaded'. Use an empty array to define a node that has no children. */
        children: FancytreeNode[];
        /** Use isExpanded(), setExpanded() to access this property. */
        expanded: boolean;
        /** Addtional CSS classes, added to the node's `<span>`. */
        extraClasses: string;
        /** Folder nodes have different default icons and click behavior. Note: Also non-folders may have children. */
        folder: boolean;
        /** null or type of temporarily generated system node like 'loading', or 'error'. */
        statusNodeType: string;
        /** True if this node is loaded on demand, i.e. on first expansion. */
        lazy: boolean;
        /** Alternative description used as hover banner */
        tooltip: string;
        /**
         * Append (or insert) a list of child nodes.
         *
         * @param children array of child node definitions (also single child accepted)
         * @param insertBefore child node to insert nodes before. If omitted, the new children is appended.
         * @returns The first child added.
         */
        addChildren(children: Fancytree.NodeData[], insertBefore?: FancytreeNode): FancytreeNode;
        /**
         * Append (or insert) a list of child nodes.
         *
         * @param children array of child node definitions (also single child accepted)
         * @param insertBefore key of the child node to insert nodes before. If omitted, the new children is appended.
         * @returns The first child added.
         */
        addChildren(children: Fancytree.NodeData[], insertBefore?: string): FancytreeNode;
        /**
         * Append (or insert) a list of child nodes.
         *
         * @param children array of child node definitions (also single child accepted)
         * @param insertBefore index of the child node to insert nodes before. If omitted, the new children is appended.
         * @returns The first child added.
         */
        addChildren(children: Fancytree.NodeData[], insertBefore?: number): FancytreeNode;
        /**
         * Append (or insert) a single child node.
         *
         * @param child node to add
         * @param insertBefore child node to insert this node before. If omitted, the new child is appended.
         * @returns The child added.
         */
        addChildren(child: Fancytree.NodeData, insertBefore?: FancytreeNode): FancytreeNode;
        /**
         * Append (or insert) a single child node.
         *
         * @param child node to add
         * @param insertBefore key of the child node to insert this node before. If omitted, the new child is appended.
         * @returns The child added.
         */
        addChildren(child: Fancytree.NodeData, insertBefore?: string): FancytreeNode;
        /**
         * Append (or insert) a single child node.
         *
         * @param child node to add
         * @param insertBefore index of the child node to insert this node before. If omitted, the new child is appended.
         * @returns The child added.
         */
        addChildren(child: Fancytree.NodeData, insertBefore?: number): FancytreeNode;
        /** Append or prepend a node, or append a child node. This a convenience function that calls addChildren()
         *
         * @param mode 'before', 'after', 'firstChild', or 'child' ('over' is a synonym for 'child') (default='child')
         * @returns new node.
         */
        addNode(node: NodeData, mode?: string): FancytreeNode;
        /** Modify existing child nodes. */
        applyPatch(patch: NodePatch): JQueryPromise<any>;
        /** Collapse all sibling nodes. */
        collapseSiblings(): JQueryPromise<any>;
        /** Copy this node as sibling or child of `node`.
         *
         * @param node source node
         * @param mode 'before' | 'after' | 'child' (default='child')
         * @param map callback function(NodeData) that could modify the new node
         * @returns new node.
         */
        copyTo(node: FancytreeNode, mode?: string, map?: (node: NodeData) => void): FancytreeNode;
        /** Count direct and indirect children.
         *
         * @param deep pass 'false' to only count direct children. (default=true)
         */
        countChildren(deep?: boolean): number;
        /** Write to browser console if debugLevel >= 2 (prepending node info) */
        debug(msg: any): void;
        /** [ext-edit] Create a new child or sibling node and start edit mode.
         *
         * @param mode 'before', 'after', or 'child' (default='child')
         * @param init NodeData (or simple title string)
         */
        editCreateNode(mode?: string, init?: Object): void;
        /** [ext-edit] Stop inline editing.
         *
         * @param applyChanges false: cancel edit, true: save (if modified)
         */
        editEnd(applyChanges: boolean): void;
        /** [ext-edit] Start inline editing of current node title.  */
        editStart(): void;
        /** Find all nodes that contain `match` in the title.
         *
         * @param match string to search for
         */
        findAll(match: string): FancytreeNode[];
        /** Find all nodes that contain `match` in the title.
          *
          * @param match a function that returns `true` if a node is matched.
          */
        findAll(match: (node: FancytreeNode) => boolean): FancytreeNode[];
        /** Find first node that contains `match` in the title (not including self).
         *
         * @param match string to search for
         */
        findFirst(match: string): FancytreeNode;
        /** Find first node that contains `match` in the title (not including self).
          *
          * @param match a function that returns `true` if a node is matched.
          */
        findFirst(match: (node: FancytreeNode) => boolean): FancytreeNode;
        /** Fix selection status, after this node was (de)selected in multi-hier mode. This includes (de)selecting all children. */
        fixSelection3AfterClick(): void;
        /** Fix selection status for multi-hier mode. Only end-nodes are considered to update the descendants branch and parents. Should be called after this node has loaded new children or after children have been modified using the API. */
        fixSelection3FromEndNodes(): void;
        /** Update node data. If dict contains 'children', then also replace the hole sub tree.  */
        fromDict(dict: NodeData): void;
        /** Return the list of child nodes (undefined for unexpanded lazy nodes). */
        getChildren(): FancytreeNode[];
        /** [ext-clones] Return a list of clone-nodes or null. */
        getCloneList(includeSelf?: boolean): FancytreeNode[];
        /** Return the first child node or null. */
        getFirstChild(): FancytreeNode;
        /** Return the 0-based child index. */
        getIndex(): number;
        /** Return the hierarchical child index (1-based, e.g. '3.2.4').  */
        getIndexHier(): string;
        /** Return the parent keys separated by options.keyPathSeparator, e.g. "id_1/id_17/id_32". */
        getKeyPath(excludeSelf: boolean): string;
        /** Return the last child of this node or null. */
        getLastChild(): FancytreeNode;
        /** Return node depth. 0: System root node, 1: visible top-level node, 2: first sub-level, ... . */
        getLevel(): number;
        /** Return the successor node (under the same parent) or null. */
        getNextSibling(): FancytreeNode;
        /** Return the parent node (null for the system root node).  */
        getParent(): FancytreeNode;
        /**Return an array of all parent nodes (top-down).
         *
         * @param includeRoot Include the invisible system root node. (default=false)
         * @param includeSelf Include the node itself (default=false).
          */
        getParentList(includeRoot: boolean, includeSelf: boolean): FancytreeNode[];
        /** Return the predecessor node (under the same parent) or null. */
        getPrevSibling(): FancytreeNode;
        /** Return true if node has children. Return undefined if not sure, i.e. the node is lazy and not yet loaded). */
        hasChildren(): boolean;
        /** Return true if node has keyboard focus. */
        hasFocus(): boolean;
        /** Write to browser console if debugLevel >= 1 (prepending node info)  */
        info(msg: string): void;
        /** Return true if node is active (see also FancytreeNode.isSelected). */
        isActive(): boolean;
        /** Return true if node is a direct child of otherNode. */
        isChildOf(otherNode: FancytreeNode): boolean;
        /** [ext-clones] Return true if this node has at least another clone with same refKey. */
        isClone(): boolean;
        /** Return true, if node is a direct or indirect sub node of otherNode. */
        isDescendantOf(otherNode: FancytreeNode): boolean;
        /** [ext-edit] Check if this node is in edit mode. */
        isEditing(): boolean;
        /** Return true if node is expanded.  */
        isExpanded(): boolean;
        /** Return true if node is the first node of its parent's children.  */
        isFirstSibling(): boolean;
        /** Return true if node is a folder, i.e. has the node.folder attribute set. */
        isFolder(): boolean;
        /** Return true if node is the last node of its parent's children.  */
        isLastSibling(): boolean;
        /** Return true if node is lazy (even if data was already loaded)  */
        isLazy(): boolean;
        /** Return true if node is lazy and loaded. For non-lazy nodes always return true.  */
        isLoaded(): boolean;
        /**Return true if children are currently beeing loaded, i.e. a Ajax request is pending.  */
        isLoading(): boolean;
        /** Return true if this is the (invisible) system root node. */
        isRootNode(): boolean;
        /** Return true if node is selected, i.e. has a checkmark set (see also FancytreeNode#isActive). */
        isSelected(): boolean;
        /** Return true if this node is a temporarily generated system node like 'loading', or 'error' (node.statusNodeType contains the type). */
        isStatusNode(): boolean;
        /** Return true if this a top level node, i.e. a direct child of the (invisible) system root node. */
        isTopLevel(): boolean;
        /** Return true if node is lazy and not yet loaded. For non-lazy nodes always return false. */
        isUndefined(): boolean;
        /** Return true if all parent nodes are expanded. Note: this does not check whether the node is scrolled into the visible part of the screen. */
        isVisible(): boolean;
        /** Load all children of a lazy node if neccessary. The *expanded* state is maintained.
         *
         * @param forceReload Pass true to discard any existing nodes before.
         */
        load(forceReload?: boolean): JQueryPromise<any>;
        /** Expand all parents and optionally scroll into visible area as neccessary. Promise is resolved, when lazy loading and animations are done.
         *
         * @param opts passed to `setExpanded()`. Defaults to {noAnimation: false, noEvents: false, scrollIntoView: true}
         */
        makeVisible(opts?: Object): JQueryPromise<any>;
        /** Move this node to targetNode.
         *
         * @param mode 'child': append this node as last child of targetNode.
         *                       This is the default. To be compatble with the D'n'd
         *                       hitMode, we also accept 'over'.
         *              'before': add this node as sibling before targetNode.
         *              'after': add this node as sibling after targetNode.
         *
         * @param map optional callback(FancytreeNode) to allow modifcations
         */
        moveTo(targetNode: FancytreeNode, mode: string, map?: (node: FancytreeNode) => void): void;
        /** Set focus relative to this node and optionally activate.
         *
         * @param where The keyCode that would normally trigger this move, e.g. `$.ui.keyCode.LEFT` would collapse the node if it is expanded or move to the parent oterwise.
         * @param activate (default=true)
         */
        navigate(where: number, activate?: boolean): JQueryPromise<any>;
        /** Remove this node (not allowed for system root).  */
        remove(): void;
        /** Remove childNode from list of direct children. */
        removeChild(childNode: FancytreeNode): void;
        /** Remove all child nodes and descendents. This converts the node into a leaf.
         * If this was a lazy node, it is still considered 'loaded'; call node.resetLazy() in order to trigger lazyLoad on next expand.
         */
        removeChildren(): void;
        /** This method renders and updates all HTML markup that is required to display this node in its current state.
         *
         * @param force re-render, even if html markup was already created
         * @param deep  also render all descendants, even if parent is collapsed
         */
        render(force?: boolean, deep?: boolean): void;
        /** Update element's CSS classes according to node state. */
        renderStatus(): void;
        /** Create HTML markup for the node's outer (expander, checkbox, icon, and title).  */
        renderTitle(): void;
        /** [ext-clones] Update key and/or refKey for an existing node. */
        reRegister(key: string, refKey: string): boolean;
        /** Remove all children, collapse, and set the lazy-flag, so that the lazyLoad event is triggered on next expand. */
        resetLazy(): void;
        /** Schedule activity for delayed execution (cancel any pending request). scheduleAction('cancel') will only cancel a pending request (if any). */
        scheduleAction(mode: string, ms: number): void;
        /**
         * @param effects animation options.
         * @param options {topNode: null, effects: ..., parent: ...} this node will remain visible in any case, even if `this` is outside the scroll pane.
         */
        scrollIntoView(effects?: boolean, options?: Object): JQueryPromise<any>;
        /**
         * @param effects animation options.
         * @param options {topNode: null, effects: ..., parent: ...} this node will remain visible in any case, even if `this` is outside the scroll pane.
         */
        scrollIntoView(effects?: Object, options?: Object): JQueryPromise<any>;
        /**
         * @param flag pass false to deactivate
         * @param opts additional options. Defaults to {noEvents: false}
         */
        setActive(flag?: boolean, opts?: Object): JQueryPromise<any>;
        /**
         * @param flag pass false to collapse.
         * @param opts additional options. Defaults to {noAnimation:false, noEvents:false}
         */
        setExpanded(flag?: boolean, opts?: Object): JQueryPromise<any>;
        /**
         * Set keyboard focus to this node.
         *
         * @param flag pass false to blur.
         */
        setFocus(flag?: boolean): void;
        /**
         * Select this node, i.e. check the checkbox.
         *
         * @param flag pass false to deselect.
         */
        setSelected(flag?: boolean): void;
        /**
         * Mark a lazy node as 'error', 'loading', or 'ok'.
         *
         * @param status 'error', 'ok'
         */
        setStatus(status: string, message?: string, details?: string): void;
        /** Rename this node. */
        setTitle(title: string): void;
        /**
         * Sort child list by title.
         *
         * @param cmp custom compare function(a, b) that returns -1, 0, or 1 (defaults to sort by title).
         * @param deep pass true to sort all descendant nodes
         */
        sortChildren(cmp?: (a: FancytreeNode, b: FancytreeNode) => number, deep?: boolean): void;
        /**
         * Convert node (or whole branch) into a plain object. The result is compatible with node.addChildren().
         *
         * @param recursive include child nodes.
         * @param callback callback(dict) is called for every node, in order to allow modifications
         */
        toDict(recursive?: boolean, callback?: (dict: NodeData) => void): NodeData;
        /** Flip expanded status. */
        toggleExpanded(): void;
        /** Flip selection status. */
        toggleSelected(): void;
        /**
         * Call fn(node) for all child nodes.
         * Stop iteration, if fn() returns false. Skip current branch,
         * if fn() returns "skip". Return false if iteration was stopped.
         *
         * @param fn the callback function. Return false to stop iteration, return "skip" to skip this node and its children only.
         * @param includeSelf (default=false)
         */
        visit(fn: (node: FancytreeNode) => any, includeSelf?: boolean): boolean;
        /**
         * Call fn(node) for all child nodes and recursively load lazy children.
         * Note: If you need this method, you probably should consider to review your architecture! Recursivley loading nodes is
         * a perfect way for lazy programmers to flood the server with requests ;-)
         *
         * @param fn the callback function. Return false to stop iteration, return "skip" to skip this node and its children only.
         * @param includeSelf (default=false)
         */
        visitAndLoad(fn: (node: FancytreeNode) => any, includeSelf?: boolean): JQueryPromise<any>;
        /**
         * Call fn(node) for all parent nodes, bottom-up, including invisible system root.
         * Stop iteration, if fn() returns false.
         * Return false if iteration was stopped.
         *
         * @param fn the callback function. Return false to stop iteration, return "skip" to skip this node and its children only.
         * @param includeSelf (default=false)
         */
        visitParents(fn: (node: FancytreeNode) => any, includeSelf?: boolean): boolean;
        /**
         * Write warning to browser console (prepending node info)
         */
        warn(msg: any): void;
    }
    enum FancytreeClickFolderMode {
        activate = 1,
        expand = 2,
        activate_and_expand = 3,
        activate_dblclick_expands = 4
    }
    enum FancytreeSelectMode {
        single = 1,
        multi = 2,
        mutlti_hier = 3
    }
    /** Context object passed to events and hook functions. */
    interface EventData {
        /** The tree instance */
        tree: Fancytree;
        /** The jQuery UI tree widget */
        widget: Object;
        /** Shortcut to tree.options */
        options: FancytreeOptions;
        /** The jQuery Event that initially triggered this call */
        originalEvent: JQueryEventObject;
        /** The node that this call applies to (`null` for tree events) */
        node: FancytreeNode;
        /** (output parameter) Event handlers can return values back to the
          * caller. Used by `lazyLoad`, `postProcess`, ... */
        result: any;
        /** (only for click and dblclick events) 'title' | 'prefix' | 'expander' | 'checkbox' | 'icon' */
        targetType: string;
        /** (only for postProcess event) Original ajax response */
        response: any;
    }
    /** The `this` context of any event function is set to tree's the HTMLDivElement  */
    interface FancytreeEvents {
        /** 'data.node' was deactivated. */
        activate?(event: JQueryEventObject, data: EventData): void;
        /** Return false to prevent default processing */
        beforeActivate?(event: JQueryEventObject, data: EventData): boolean;
        /** Return `false` to prevent default processing */
        beforeExpand?(event: JQueryEventObject, data: EventData): boolean;
        /** Return `false` to prevent default processing */
        beforeSelect?(event: JQueryEventObject, data: EventData): boolean;
        /** `data.node` lost keyboard focus */
        blur?(event: JQueryEventObject, data: EventData): void;
        /** `data.tree` lost keyboard focus */
        blurTree?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` was clicked. `data.targetType` contains the region ("title", "expander", ...). Return `false` to prevent default processing, i.e. activating, etc. */
        click?(event: JQueryEventObject, data: EventData): boolean;
        /** `data.node` was collapsed */
        collapse?(event: JQueryEventObject, data: EventData): void;
        /** Widget was created (called only once, even if re-initialized). */
        create?(event: JQueryEventObject, data: EventData): void;
        /** Allow tweaking and binding, after node was created for the first time (NOTE: this event is only available as callback, but not for bind()) */
        createNode?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` was double-clicked. `data.targetType` contains the region ("title", "expander", ...). Return `false` to prevent default processing, i.e. expanding, etc. */
        dblclick?(event: JQueryEventObject, data: EventData): boolean;
        /** `data.node` was deactivated */
        deactivate?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` was expanded */
        expand?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` received keyboard focus */
        focus?(event: JQueryEventObject, data: EventData): void;
        /**`data.tree` received keyboard focus */
        focusTree?(event: JQueryEventObject, data: EventData): void;
        /** Widget was (re-)initialized. */
        init?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` received key. `event.which` contains the key. Return `false` to prevent default processing, i.e. navigation. Call `data.result = "preventNav";` to prevent navigation but still allow default handling inside embedded input controls. */
        keydown?(event: JQueryEventObject, data: EventData): boolean;
        /** (currently unused) */
        keypress?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` is a lazy node that is expanded for the first time. The new child data must be returned in the `data.result` property (see `source` option for available formats). */
        lazyLoad?(event: JQueryEventObject, data: EventData): void;
        /** Node data was loaded, i.e. `node.nodeLoadChildren()` finished */
        loadChildren?(event: JQueryEventObject, data: EventData): void;
        /** A load error occured. Return `false` to prevent default processing. */
        loadError?(event: JQueryEventObject, data: EventData): boolean;
        /** Allows to modify the ajax response. */
        postProcess?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` was removed (NOTE: this event is only available as callback, but not for bind()) */
        removeNode?(event: JQueryEventObject, data: EventData): void;
        /** (used by table extension) */
        renderColumns?(event: JQueryEventObject, data: EventData): void;
        /** Allow tweaking after node state was rendered (NOTE: this event is only available as callback, but not for bind()) */
        renderNode?(event: JQueryEventObject, data: EventData): void;
        /** Allow replacing the `<span class='fancytree-title'>` markup (NOTE: this event is only available as callback, but not for bind()) */
        renderTitle?(event: JQueryEventObject, data: EventData): void;
        /** ext-persist has expanded, selected, and activated the previous state */
        restore?(event: JQueryEventObject, data: EventData): void;
        /** `data.node` was selected */
        select?(event: JQueryEventObject, data: EventData): void;
    }
    interface FancytreeOptions extends FancytreeEvents {
        /** Make sure that the active node is always visible, i.e. its parents are expanded (default: true). */
        activeVisible?: boolean;
        /** Default options for ajax requests. */
        ajax?: Object;
        /** (default: false) Add WAI-ARIA attributes to markup */
        aria?: boolean;
        /** Activate a node when focused with the keyboard (default: true) */
        autoActivate?: boolean;
        /** Automatically collapse all siblings, when a node is expanded (default: false). */
        autoCollapse?: boolean;
        /** Scroll node into visible area, when focused by keyboard (default: false). */
        autoScroll?: boolean;
        /** Display checkboxes to allow selection (default: false) */
        checkbox?: boolean;
        /** Defines what happens, when the user click a folder node. (default: activate_dblclick_expands) */
        clickFolderMode?: FancytreeClickFolderMode;
        /** 0..2 (null: use global setting $.ui.fancytree.debugInfo) */
        debugLevel?: number;
        /** callback(node) is called for new nodes without a key. Must return a new unique key. (default null: generates default keys like that: "_" + counter) */
        defaultKey?: (node: FancytreeNode) => string;
        /** Accept passing ajax data in a property named `d` (default: true). */
        enableAspx?: boolean;
        /** List of active extensions (default: []) */
        extensions?: string[];
        /** Set focus when node is checked by a mouse click (default: false) */
        focusOnSelect?: boolean;
        /** Add `id="..."` to node markup (default: true). */
        generateIds?: boolean;
        /** Display node icons (default: true) */
        icons?: boolean;
        /** (default: "ft_") */
        idPrefix?: string;
        /** Path to a folder containing icons (default: null, using 'skin/' subdirectory). */
        imagePath?: string;
        /** Support keyboard navigation (default: true). */
        keyboard?: boolean;
        /** (default: "/") */
        keyPathSeparator?: string;
        /** 2: top-level nodes are not collapsible (default: 1) */
        minExpandLevel?: number;
        /** navigate to next node by typing the first letters (default: false) */
        quicksearch?: boolean;
        /** optional margins for node.scrollIntoView() (default: {top: 0, bottom: 0}) */
        scrollOfs?: Object;
        /** scrollable container for node.scrollIntoView() (default: $container) */
        scrollParent?: JQuery;
        /** default: multi_hier */
        selectMode?: FancytreeSelectMode;
        /** Used to Initialize the tree. */
        source?: any;
        /** Translation table */
        strings?: Object;
        /** Add tabindex='0' to container, so tree can be reached using TAB */
        tabbable?: boolean;
        /** Add tabindex='0' to node title span, so it can receive keyboard focus */
        titlesTabbable?: boolean;
        /** Animation options, false:off (default: { effect: "blind", options: {direction: "vertical", scale: "box"}, duration: 200 }) */
        toggleEffect?: Object;
    }
    /** Data object passed to FancytreeNode() constructor. Note: typically these attributes are accessed by meber methods, e.g. `node.isExpanded()` and `node.setSelected(false)`.  */
    interface NodeData {
        /** node text (may contain HTML tags) */
        title: string;
        icon?: string;
        iconclass?: string;
        /** unique key for this node (auto-generated if omitted) */
        key?: string;
        /** (reserved) */
        refKey?: string;
        expanded?: boolean;
        /** (initialization only, but will not be stored with the node). */
        active?: boolean;
        /** (initialization only, but will not be stored with the node). */
        focus?: boolean;
        folder?: boolean;
        hideCheckbox?: boolean;
        lazy?: boolean;
        selected?: boolean;
        unselectable?: boolean;
        /** optional array of child nodes */
        children?: NodeData[];
        tooltip?: string;
        /** class names added to the node markup (separate with space) */
        extraClasses?: string;
        /** all properties from will be copied to `node.data` */
        data?: Object;
    }
    /** Data object similar to NodeData, but with additional options.
      * May be passed to FancytreeNode#applyPatch (Every property that is omitted (or set to undefined) will be ignored)  */
    interface NodePatch {
        /** (not yet implemented) */
        appendChildren?: NodeData;
        /** (not yet implemented) */
        replaceChildren?: NodeData;
        /** (not yet implemented) */
        insertChildren?: NodeData;
    }
    /** May be passed to Fancytree#applyPatch. */
    interface TreePatch {
        [key: string]: NodePatch;
    }
    interface FancytreeStatic {
        buildType: string;
        debugLevel: number;
        version: string;
        /** Throw an error if condition fails (debug method).  */
        assert(cond: boolean, msg: string): void;
        /** Return a function that executes *fn* at most every *timeout* ms. */
        debounce<T extends (...args: any[]) => void>(timeout: number, fn: T, invokeAsap?: boolean, ctx?: any): T;
        debug(msg: string): void;
        error(msg: string): void;
        escapeHtml(s: string): string;
        getEventTarget(event: Event): Object;
        getEventTargetType(event: Event): string;
        getNode(el: JQuery): FancytreeNode;
        getNode(el: Event): FancytreeNode;
        getNode(el: Element): FancytreeNode;
        info(msg: string): void;
        /** Convert a keydown event to a string like 'ctrl+a', 'ctrl+shift+f2'.  */
        keyEventToString(event: Event): string;
        /** Parse tree data from HTML markup */
        parseHtml($ul: JQuery): NodeData[];
        /** Add Fancytree extension definition to the list of globally available extensions. */
        registerExtension(definition: Object): void;
        unescapeHtml(s: string): string;
        warn(msg: string): void;
    }
}
interface DOMEvent extends Event {
}
declare namespace Slick {
    /**
    * slick.core.js
    **/
    /**
    * An event object for passing data to event handlers and letting them control propagation.
    * <p>This is pretty much identical to how W3C and jQuery implement events.</p>
    * @class EventData
    * @constructor
    **/
    class EventData {
        constructor();
        /***
        * Stops event from propagating up the DOM tree.
        * @method stopPropagation
        */
        stopPropagation(): void;
        /***
        * Returns whether stopPropagation was called on this event object.
        * @method isPropagationStopped
        * @return {Boolean}
        */
        isPropagationStopped(): boolean;
        /***
        * Prevents the rest of the handlers from being executed.
        * @method stopImmediatePropagation
        */
        stopImmediatePropagation(): void;
        /***
        * Returns whether stopImmediatePropagation was called on this event object.\
        * @method isImmediatePropagationStopped
        * @return {Boolean}
        */
        isImmediatePropagationStopped(): boolean;
    }
    /***
    * A simple publisher-subscriber implementation.
    * @class Event
    * @constructor
    */
    class Event<T> {
        constructor();
        /***
        * Adds an event handler to be called when the event is fired.
        * <p>Event handler will receive two arguments - an <code>EventData</code> and the <code>data</code>
        * object the event was fired with.<p>
        * @method subscribe
        * @param fn {Function} Event handler.
        */
        subscribe(fn: (e: EventData, data: T) => any): void;
        subscribe(fn: (e: DOMEvent, data: T) => any): void;
        /***
        * Removes an event handler added with <code>subscribe(fn)</code>.
        * @method unsubscribe
        * @param fn {Function} Event handler to be removed.
        */
        unsubscribe(fn: (e: EventData, data: T) => any): void;
        unsubscribe(fn: (e: DOMEvent, data: T) => any): void;
        /***
        * Fires an event notifying all subscribers.
        * @method notify
        * @param args {Object} Additional data object to be passed to all handlers.
        * @param e {EventData}
        *      Optional.
        *      An <code>EventData</code> object to be passed to all handlers.
        *      For DOM events, an existing W3C/jQuery event object can be passed in.
        * @param scope {Object}
        *      Optional.
        *      The scope ("this") within which the handler will be executed.
        *      If not specified, the scope will be set to the <code>Event</code> instance.
        * @return Last run callback result.
        * @note slick.core.Event.notify shows this method as returning a value, type is unknown.
        */
        notify(args?: T, e?: EventData, scope?: any): any;
        notify(args?: T, e?: DOMEvent, scope?: any): any;
    }
    class EventHandler {
        constructor();
        subscribe(event: EventData, handler: Function): EventHandler;
        unsubscribe(event: EventData, handler: Function): EventHandler;
        unsubscribeAll(): EventHandler;
    }
    /***
    * A structure containing a range of cells.
    * @class Range
    **/
    class Range {
        /**
        * A structure containing a range of cells.
        * @constructor
        * @param fromRow {Integer} Starting row.
        * @param fromCell {Integer} Starting cell.
        * @param toRow {Integer} Optional. Ending row. Defaults to <code>fromRow</code>.
        * @param toCell {Integer} Optional. Ending cell. Defaults to <code>fromCell</code>.
        **/
        constructor(fromRow: number, fromCell: number, toRow?: number, toCell?: number);
        /***
        * @property fromRow
        * @type {Integer}
        */
        fromRow: number;
        /***
        * @property fromCell
        * @type {Integer}
        */
        fromCell: number;
        /***
        * @property toRow
        * @type {Integer}
        */
        toRow: number;
        /***
        * @property toCell
        * @type {Integer}
        */
        toCell: number;
        /***
        * Returns whether a range represents a single row.
        * @method isSingleRow
        * @return {Boolean}
        */
        isSingleRow(): boolean;
        /***
        * Returns whether a range represents a single cell.
        * @method isSingleCell
        * @return {Boolean}
        */
        isSingleCell(): boolean;
        /***
        * Returns whether a range contains a given cell.
        * @method contains
        * @param row {Integer}
        * @param cell {Integer}
        * @return {Boolean}
        */
        contains(row: number, cell: number): boolean;
        /***
        * Returns a readable representation of a range.
        * @method toString
        * @return {String}
        */
        toString(): string;
    }
    /***
    * A base class that all special / non-data rows (like Group and GroupTotals) derive from.
    * @class NonDataItem
    * @constructor
    */
    class NonDataRow {
    }
    /***
    * Information about a group of rows.
    * @class Group
    * @extends Slick.NonDataItem
    * @constructor
    */
    class Group<T extends SlickData> extends NonDataRow {
        constructor();
        /**
        * Grouping level, starting with 0.
        * @property level
        * @type {Number}
        */
        level: number;
        /***
        * Number of rows in the group.
        * @property count
        * @type {Integer}
        */
        count: number;
        /***
        * Grouping value.
        * @property value
        * @type {Object}
        */
        value: any;
        /***
        * Formatted display value of the group.
        * @property title
        * @type {String}
        */
        title: string;
        /***
        * Whether a group is collapsed.
        * @property collapsed
        * @type {Boolean}
        */
        collapsed: boolean;
        /***
        * GroupTotals, if any.
        * @property totals
        * @type {GroupTotals}
        */
        totals: GroupTotals<T>;
        /**
        * Rows that are part of the group.
        * @property rows
        * @type {Array}
        */
        rows: T[];
        /**
        * Sub-groups that are part of the group.
        * @property groups
        * @type {Array}
        */
        groups: Group<T>[];
        /**
        * A unique key used to identify the group.  This key can be used in calls to DataView
        * collapseGroup() or expandGroup().
        * @property groupingKey
        * @type {Object}
        */
        groupingKey: any;
        /***
        * Compares two Group instances.
        * @method equals
        * @return {Boolean}
        * @param group {Group} Group instance to compare to.
        * todo: this is on the prototype (NonDataRow()) instance, not Group, maybe doesn't matter?
        */
        equals(group: Group<T>): boolean;
    }
    /***
    * Information about group totals.
    * An instance of GroupTotals will be created for each totals row and passed to the aggregators
    * so that they can store arbitrary data in it.  That data can later be accessed by group totals
    * formatters during the display.
    * @class GroupTotals
    * @extends Slick.NonDataItem
    * @constructor
    */
    class GroupTotals<T> extends NonDataRow {
        constructor();
        /***
        * Parent Group.
        * @param group
        * @type {Group}
        */
        group: Group<T>;
    }
    /***
    * A locking helper to track the active edit controller and ensure that only a single controller
    * can be active at a time.  This prevents a whole class of state and validation synchronization
    * issues.  An edit controller (such as SlickGrid) can query if an active edit is in progress
    * and attempt a commit or cancel before proceeding.
    * @class EditorLock
    * @constructor
    */
    class EditorLock<T extends Slick.SlickData> {
        constructor();
        /***
        * Returns true if a specified edit controller is active (has the edit lock).
        * If the parameter is not specified, returns true if any edit controller is active.
        * @method isActive
        * @param editController {EditController}
        * @return {Boolean}
        */
        isActive(editController: Editors.Editor<T>): boolean;
        /***
        * Sets the specified edit controller as the active edit controller (acquire edit lock).
        * If another edit controller is already active, and exception will be thrown.
        * @method activate
        * @param editController {EditController} edit controller acquiring the lock
        */
        activate(editController: Editors.Editor<T>): void;
        /***
        * Unsets the specified edit controller as the active edit controller (release edit lock).
        * If the specified edit controller is not the active one, an exception will be thrown.
        * @method deactivate
        * @param editController {EditController} edit controller releasing the lock
        */
        deactivate(editController: Editors.Editor<T>): void;
        /***
        * Attempts to commit the current edit by calling "commitCurrentEdit" method on the active edit
        * controller and returns whether the commit attempt was successful (commit may fail due to validation
        * errors, etc.).  Edit controller's "commitCurrentEdit" must return true if the commit has succeeded
        * and false otherwise.  If no edit controller is active, returns true.
        * @method commitCurrentEdit
        * @return {Boolean}
        */
        commitCurrentEdit(): boolean;
        /***
        * Attempts to cancel the current edit by calling "cancelCurrentEdit" method on the active edit
        * controller and returns whether the edit was successfully cancelled.  If no edit controller is
        * active, returns true.
        * @method cancelCurrentEdit
        * @return {Boolean}
        */
        cancelCurrentEdit(): boolean;
    }
    /**
    * A global singleton editor lock.
    * @class GlobalEditorLock
    * @static
    * @constructor
    **/
    var GlobalEditorLock: EditorLock<Slick.SlickData>;
    /**
    * slick.grid.js
    **/
    /**
    * Options which you can apply to the columns objects.
    **/
    interface Column<T extends Slick.SlickData> {
        /**
        * This accepts a function of the form function(cellNode, row, dataContext, colDef) and is used to post-process the cell's DOM node / nodes
        * @param cellNode
        * @param row
        * @param dataContext
        * @param colDef
        * @return
        **/
        asyncPostRender?: (cellNode: any, row: any, dataContext: any, colDef: any) => void;
        /**
        * Used by the the slick.rowMoveManager.js plugin for moving rows. Has no effect without the plugin installed.
        **/
        behavior?: any;
        /**
        * In the "Add New" row, determines whether clicking cells in this column can trigger row addition. If true, clicking on the cell in this column in the "Add New" row will not trigger row addition.
        **/
        cannotTriggerInsert?: boolean;
        /**
        * Accepts a string as a class name, applies that class to every row cell in the column.
        **/
        cssClass?: string;
        /**
        * When set to true, the first user click on the header will do a descending sort. When set to false, the first user click on the header will do an ascending sort.
        **/
        defaultSortAsc?: boolean;
        /**
        * The editor for cell edits {TextEditor, IntegerEditor, DateEditor...} See slick.editors.js
        **/
        editor?: any;
        /**
        * The property name in the data object to pull content from. (This is assumed to be on the root of the data object.)
        **/
        field?: string;
        /**
        * When set to false, clicking on a cell in this column will not select the row for that cell. The cells in this column will also be skipped during tab navigation.
        **/
        focusable?: boolean;
        /**
        * This accepts a function of the form function(row, cell, value, columnDef, dataContext) and returns a formatted version of the data in each cell of this column. For example, setting formatter to function(r, c, v, cd, dc) { return "Hello!"; } would overwrite every value in the column with "Hello!" See defaultFormatter in slick.grid.js for an example formatter.
        * @param row
        * @param cell
        * @param value
        * @param columnDef
        * @param dataContext
        * @return
        **/
        formatter?: Formatter<T>;
        /**
        * Accepts a string as a class name, applies that class to the cell for the column header.
        **/
        headerCssClass?: string;
        /**
        * A unique identifier for the column within the grid.
        **/
        id?: string;
        /**
        * Set the maximum allowable width of this column, in pixels.
        **/
        maxWidth?: number;
        /**
        *  Set the minimum allowable width of this column, in pixels.
        **/
        minWidth?: number;
        /**
        * The text to display on the column heading.
        **/
        name?: string;
        /**
        * If set to true, whenever this column is resized, the entire table view will rerender.
        **/
        rerenderOnResize?: boolean;
        /**
        * If false, column can no longer be resized.
        **/
        resizable?: boolean;
        /**
        * If false, when a row is selected, the CSS class for selected cells ("selected" by default) is not applied to the cell in this column.
        **/
        selectable?: boolean;
        /**
        * If true, the column will be sortable by clicking on the header.
        **/
        sortable?: boolean;
        /**
        * If set to a non-empty string, a tooltip will appear on hover containing the string.
        **/
        toolTip?: string;
        /**
        * Width of the column in pixels. (May often be overridden by things like minWidth, maxWidth, forceFitColumns, etc.)
        **/
        width?: number;
        options?: {
            [key: string]: string;
        };
        editorParam?: string;
    }
    interface EditorFactory {
        getEditor<T>(column: Column<T>): Editors.Editor<T>;
    }
    interface FormatterFactory<T extends SlickData> {
        getFormatter(column: Column<T>): Formatter<any>;
    }
    interface GridOptions<T extends SlickData> {
        /**
        * Makes cell editors load asynchronously after a small delay. This greatly increases keyboard navigation speed.
        **/
        asyncEditorLoading?: boolean;
        /**
        * Delay after which cell editor is loaded. Ignored unless asyncEditorLoading is true.
        **/
        asyncEditorLoadDelay?: number;
        /**
        *
        **/
        asyncPostRenderDelay?: number;
        /**
        * Cell will not automatically go into edit mode when selected.
        **/
        autoEdit?: boolean;
        /**
        *
        **/
        autoHeight?: boolean;
        /**
        * A CSS class to apply to flashing cells via flashCell().
        **/
        cellFlashingCssClass?: string;
        /**
        * A CSS class to apply to cells highlighted via setHighlightedCells().
        **/
        cellHighlightCssClass?: string;
        /**
        *
        **/
        dataItemColumnValueExtractor?: any;
        /**
        *
        **/
        defaultColumnWidth?: number;
        /**
        *
        **/
        defaultFormatter?: Formatter<T>;
        /**
        *
        **/
        editable?: boolean;
        /**
        * Not listed as a default under options in slick.grid.js
        **/
        editCommandHandler?: any;
        /**
        * A factory object responsible to creating an editor for a given cell. Must implement getEditor(column).
        **/
        editorFactory?: EditorFactory;
        /**
        * A Slick.EditorLock instance to use for controlling concurrent data edits.
        **/
        editorLock?: EditorLock<T>;
        /**
        * If true, a blank row will be displayed at the bottom - typing values in that row will add a new one. Must subscribe to onAddNewRow to save values.
        **/
        enableAddRow?: boolean;
        /**
        * If true, async post rendering will occur and asyncPostRender delegates on columns will be called.
        **/
        enableAsyncPostRender?: boolean;
        /**
        * *WARNING*: Not contained in SlickGrid 2.1, may be deprecated
        **/
        enableCellRangeSelection?: any;
        /**
        * Appears to enable cell virtualisation for optimised speed with large datasets
        **/
        enableCellNavigation?: boolean;
        /**
        *
        **/
        enableColumnReorder?: boolean;
        /**
        * *WARNING*: Not contained in SlickGrid 2.1, may be deprecated
        **/
        enableRowReordering?: any;
        /**
        *
        **/
        enableTextSelectionOnCells?: boolean;
        /**
        * @see Example: Explicit Initialization
        **/
        explicitInitialization?: boolean;
        /**
        * Force column sizes to fit into the container (preventing horizontal scrolling). Effectively sets column width to be 1/Number of Columns which on small containers may not be desirable
        **/
        forceFitColumns?: boolean;
        /**
        *
        **/
        forceSyncScrolling?: boolean;
        /**
        * A factory object responsible to creating a formatter for a given cell. Must implement getFormatter(column).
        **/
        formatterFactory?: FormatterFactory<T>;
        /**
        * Will expand the table row divs to the full width of the container, table cell divs will remain aligned to the left
        **/
        fullWidthRows?: boolean;
        /**
        *
        **/
        headerRowHeight?: number;
        /**
        *
        **/
        leaveSpaceForNewRows?: boolean;
        /**
        * @see Example: Multi-Column Sort
        **/
        multiColumnSort?: boolean;
        /**
        *
        **/
        multiSelect?: boolean;
        /**
        *
        **/
        rowHeight?: number;
        /**
        *
        **/
        selectedCellCssClass?: string;
        /**
        *
        **/
        showHeaderRow?: boolean;
        /**
        * If true, the column being resized will change its width as the mouse is dragging the resize handle. If false, the column will resize after mouse drag ends.
        **/
        syncColumnCellResize?: boolean;
        /**
        *
        **/
        topPanelHeight?: number;
    }
    interface DataProvider<T extends SlickData> {
        /**
         * Returns the number of data items in the set.
         */
        getLength(): number;
        /**
         * Returns the item at a given index.
         * @param index
         */
        getItem(index: number): T;
        /**
         * Returns the metadata for the item at a given index (optional).
         * @param index
         */
        getItemMetadata?(index: number): RowMetadata<T>;
    }
    interface SlickData {
    }
    interface RowMetadata<T> {
        /**
         * One or more (space-separated) CSS classes to be added to the entire row.
         */
        cssClasses?: string;
        /**
         * Whether or not any cells in the row can be set as "active".
         */
        focusable?: boolean;
        /**
         * Whether or not a row or any cells in it can be selected.
         */
        selectable?: boolean;
        /**
         * Metadata related to individual columns
         */
        columns?: {
            /**
             * Metadata indexed by column id
             */
            [index: string]: ColumnMetadata<T>;
            /**
             * Metadata indexed by column index
             */
            [index: number]: ColumnMetadata<T>;
        };
    }
    interface ColumnMetadata<T extends SlickData> {
        /**
         * Whether or not a cell can be set as "active".
         */
        focusable?: boolean;
        /**
         * Whether or not a cell can be selected.
         */
        selectable?: boolean;
        /**
         * A custom cell formatter.
         */
        formatter?: Formatter<T>;
        /**
         * A custom cell editor.
         */
        editor?: Slick.Editors.Editor<T>;
        /**
         * Number of columns this cell will span. Can also contain "*" to indicate that the cell should span the rest of the row.
         */
        colspan?: number | string;
    }
    /**
    * Selecting cells in SlickGrid is handled by a selection model.
    * Selection models are controllers responsible for handling user interactions and notifying subscribers of the changes in the selection. Selection is represented as an array of Slick.Range objects.
    * You can get the current selection model from the grid by calling getSelectionModel() and set a different one using setSelectionModel(selectionModel). By default, no selection model is set.
    * The grid also provides two helper methods to simplify development - getSelectedRows() and setSelectedRows(rowsArray), as well as an onSelectedRowsChanged event.
    * SlickGrid includes two pre-made selection models - Slick.CellSelectionModel and Slick.RowSelectionModel, but you can easily write a custom one.
    **/
    class SelectionModel<T extends SlickData, E> {
        /**
        * An initializer function that will be called with an instance of the grid whenever a selection model is registered with setSelectionModel. The selection model can use this to initialize its state and subscribe to grid events.
        **/
        init(grid: Grid<T>): void;
        /**
        * A destructor function that will be called whenever a selection model is unregistered from the grid by a call to setSelectionModel with another selection model or whenever a grid with this selection model is destroyed. The selection model can use this destructor to unsubscribe from grid events and release all resources (remove DOM nodes, event listeners, etc.).
        **/
        destroy(): void;
        onSelectedRangesChanged: Slick.Event<E>;
    }
    class Grid<T extends SlickData> {
        /**
        * Create an instance of the grid.
        * @param container Container node to create the grid in. This can be a DOM Element, a jQuery node, or a jQuery selector.
        * @param data Databinding source. This can either be a regular JavaScript array or a custom object exposing getItem(index) and getLength() functions.
        * @param columns An array of column definition objects. See Column Options for a list of options that can be included on each column definition object.
        * @param options Additional options.  See Grid Options for a list of options that can be included.
        **/
        constructor(container: string | HTMLElement | JQuery, data: T[] | DataProvider<T>, columns: Column<T>[], options: GridOptions<T>);
        /**
        * Initializes the grid. Called after plugins are registered. Normally, this is called by the constructor, so you don't need to call it. However, in certain cases you may need to delay the initialization until some other process has finished. In that case, set the explicitInitialization option to true and call the grid.init() manually.
        **/
        init(): void;
        /**
        * todo: no docs
        **/
        destroy(): void;
        /**
        * Returns an array of every data object, unless you're using DataView in which case it returns a DataView object.
        * @return
        **/
        getData(): any;
        /**
        * Returns the databinding item at a given position.
        * @param index Item index.
        * @return
        **/
        getDataItem(index: number): T;
        /**
        * Sets a new source for databinding and removes all rendered rows. Note that this doesn't render the new rows - you can follow it with a call to render() to do that.
        * @param newData New databinding source using a regular JavaScript array..
        * @param scrollToTop If true, the grid will reset the vertical scroll position to the top of the grid.
        **/
        setData(newData: T[], scrollToTop: boolean): void;
        /**
        * Sets a new source for databinding and removes all rendered rows. Note that this doesn't render the new rows - you can follow it with a call to render() to do that.
        * @param newData New databinding source using a custom object exposing getItem(index) and getLength() functions.
        * @param scrollToTop If true, the grid will reset the vertical scroll position to the top of the grid.
        **/
        setData(newData: DataProvider<T>, scrollToTop: boolean): void;
        /**
        * Returns the size of the databinding source.
        * @return
        **/
        getDataLength(): number;
        /**
        * Returns an object containing all of the Grid options set on the grid. See a list of Grid Options here.
        * @return
        **/
        getOptions(): GridOptions<any>;
        /**
        * Returns an array of row indices corresponding to the currently selected rows.
        * @return
        **/
        getSelectedRows(): number[];
        /**
        * Returns the current SelectionModel. See here for more information about SelectionModels.
        * @return
        **/
        getSelectionModel(): SelectionModel<any, any>;
        /**
        * Extends grid options with a given hash. If an there is an active edit, the grid will attempt to commit the changes and only continue if the attempt succeeds.
        * @options An object with configuration options.
        **/
        setOptions(options: GridOptions<T>): void;
        /**
        * Accepts an array of row indices and applies the current selectedCellCssClass to the cells in the row, respecting whether cells have been flagged as selectable.
        * @param rowsArray An array of row numbers.
        **/
        setSelectedRows(rowsArray: number[]): void;
        /**
        * Unregisters a current selection model and registers a new one. See the definition of SelectionModel for more information.
        * @selectionModel A SelectionModel.
        **/
        setSelectionModel(selectionModel: SelectionModel<T, any>): void;
        /**
        * Proportionately resizes all columns to fill available horizontal space. This does not take the cell contents into consideration.
        **/
        autosizeColumns(): void;
        /**
        * Returns the index of a column with a given id. Since columns can be reordered by the user, this can be used to get the column definition independent of the order:
        * @param id A column id.
        * @return
        **/
        getColumnIndex(id: string): number;
        /**
        * Returns an array of column definitions, containing the option settings for each individual column.
        * @return
        **/
        getColumns(): Column<T>[];
        /**
        * Sets grid columns. Column headers will be recreated and all rendered rows will be removed. To rerender the grid (if necessary), call render().
        * @param columnDefinitions An array of column definitions.
        **/
        setColumns(columnDefinitions: Column<T>[]): void;
        /**
        * Accepts a columnId string and an ascending boolean. Applies a sort glyph in either ascending or descending form to the header of the column. Note that this does not actually sort the column. It only adds the sort glyph to the header.
        * @param columnId
        * @param ascending
        **/
        setSortColumn(columnId: string, ascending: boolean): void;
        /**
        * Accepts an array of objects in the form [ { columnId: [string], sortAsc: [boolean] }, ... ]. When called, this will apply a sort glyph in either ascending or descending form to the header of each column specified in the array. Note that this does not actually sort the column. It only adds the sort glyph to the header
        * @param cols
        **/
        setSortColumns(cols: {
            columnId: string;
            sortAsc: boolean;
        }[]): void;
        /**
        * todo: no docs or comments available
        * @return
        **/
        getSortColumns(): {
            columnId: string;
            sortAsc: boolean;
        }[];
        /**
        * Updates an existing column definition and a corresponding header DOM element with the new title and tooltip.
        * @param columnId Column id.
        * @param title New column name.
        * @param toolTip New column tooltip.
        **/
        updateColumnHeader(columnId: string, title?: string, toolTip?: string): void;
        /**
        * Adds an "overlay" of CSS classes to cell DOM elements. SlickGrid can have many such overlays associated with different keys and they are frequently used by plugins. For example, SlickGrid uses this method internally to decorate selected cells with selectedCellCssClass (see options).
        * @param key A unique key you can use in calls to setCellCssStyles and removeCellCssStyles. If a hash with that key has already been set, an exception will be thrown.
        * @param hash A hash of additional cell CSS classes keyed by row number and then by column id. Multiple CSS classes can be specified and separated by space.
        * @example
        * {
        * 	0:    {
        * 		"number_column":    "cell-bold",
        * 		"title_column":     "cell-title cell-highlighted"
        * 	},
        * 	4:    {
        * 		"percent_column":    "cell-highlighted"
        * 	}
        * }
        **/
        addCellCssStyles(key: string, hash: CellCssStylesHash): void;
        /**
        * Returns true if you can click on a given cell and make it the active focus.
        * @param row A row index.
        * @param col A column index.
        * @return
        **/
        canCellBeActive(row: number, col: number): boolean;
        /**
        * Returns true if selecting the row causes this particular cell to have the selectedCellCssClass applied to it. A cell can be selected if it exists and if it isn't on an empty / "Add New" row and if it is not marked as "unselectable" in the column definition.
        * @param row A row index.
        * @param col A column index.
        * @return
        **/
        canCellBeSelected(row: number, col: number): boolean;
        /**
        * Attempts to switch the active cell into edit mode. Will throw an error if the cell is set to be not editable. Uses the specified editor, otherwise defaults to any default editor for that given cell.
        * @param editor A SlickGrid editor (see examples in slick.editors.js).
        **/
        editActiveCell(editor: Editors.Editor<T>): void;
        /**
        * Flashes the cell twice by toggling the CSS class 4 times.
        * @param row A row index.
        * @param cell A column index.
        * @param speed (optional) - The milliseconds delay between the toggling calls. Defaults to 100 ms.
        **/
        flashCell(row: number, cell: number, speed?: number): void;
        /**
        * Returns an object representing the coordinates of the currently active cell:
        * @example
        * 	{
        * 	  row: activeRow,
        * 	  cell: activeCell
        * 	}
        * @return
        **/
        getActiveCell(): Cell;
        /**
        * Returns the DOM element containing the currently active cell. If no cell is active, null is returned.
        * @return
        **/
        getActiveCellNode(): HTMLElement;
        /**
        * Returns an object representing information about the active cell's position. All coordinates are absolute and take into consideration the visibility and scrolling position of all ancestors.
        * @return
        **/
        getActiveCellPosition(): CellPosition;
        /**
        * Accepts a key name, returns the group of CSS styles defined under that name. See setCellCssStyles for more info.
        * @param key A string.
        * @return
        **/
        getCellCssStyles(key: string): CellCssStylesHash;
        /**
        * Returns the active cell editor. If there is no actively edited cell, null is returned.
        * @return
        **/
        getCellEditor(): Editors.Editor<any>;
        /**
        * Returns a hash containing row and cell indexes from a standard W3C/jQuery event.
        * @param e A standard W3C/jQuery event.
        * @return
        **/
        getCellFromEvent(e: DOMEvent): Cell;
        /**
        * Returns a hash containing row and cell indexes. Coordinates are relative to the top left corner of the grid beginning with the first row (not including the column headers).
        * @param x An x coordinate.
        * @param y A y coordinate.
        * @return
        **/
        getCellFromPoint(x: number, y: number): Cell;
        /**
        * Returns a DOM element containing a cell at a given row and cell.
        * @param row A row index.
        * @param cell A column index.
        * @return
        **/
        getCellNode(row: number, cell: number): HTMLElement;
        /**
        * Returns an object representing information about a cell's position. All coordinates are absolute and take into consideration the visibility and scrolling position of all ancestors.
        * @param row A row index.
        * @param cell A column index.
        * @return
        **/
        getCellNodeBox(row: number, cell: number): CellPosition;
        /**
        * Accepts a row integer and a cell integer, scrolling the view to the row where row is its row index, and cell is its cell index. Optionally accepts a forceEdit boolean which, if true, will attempt to initiate the edit dialogue for the field in the specified cell.
        * Unlike setActiveCell, this scrolls the row into the viewport and sets the keyboard focus.
        * @param row A row index.
        * @param cell A column index.
        * @param forceEdit If true, will attempt to initiate the edit dialogue for the field in the specified cell.
        * @return
        **/
        gotoCell(row: number, cell: number, forceEdit?: boolean): void;
        /**
        * todo: no docs
        * @return
        **/
        getTopPanel(): HTMLElement;
        /**
        * todo: no docs
        * @param visible
        **/
        setTopPanelVisibility(visible: boolean): void;
        /**
        * todo: no docs
        * @param visible
        **/
        setHeaderRowVisibility(visible: boolean): void;
        /**
        * todo: no docs
        * @return
        **/
        getHeaderRow(): HTMLElement;
        /**
        * todo: no docs, return type is probably wrong -> "return $header && $header[0]"
        * @param columnId
        * @return
        **/
        getHeaderRowColumn(columnId: string): Column<any>;
        /**
        * todo: no docs
        * @return
        **/
        getGridPosition(): CellPosition;
        /**
        * Switches the active cell one row down skipping unselectable cells. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigateDown(): boolean;
        /**
        * Switches the active cell one cell left skipping unselectable cells. Unline navigatePrev, navigateLeft stops at the first cell of the row. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigateLeft(): boolean;
        /**
        * Tabs over active cell to the next selectable cell. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigateNext(): boolean;
        /**
        * Tabs over active cell to the previous selectable cell. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigatePrev(): boolean;
        /**
        * Switches the active cell one cell right skipping unselectable cells. Unline navigateNext, navigateRight stops at the last cell of the row. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigateRight(): boolean;
        /**
        * Switches the active cell one row up skipping unselectable cells. Returns a boolean saying whether it was able to complete or not.
        * @return
        **/
        navigateUp(): boolean;
        /**
        * Removes an "overlay" of CSS classes from cell DOM elements. See setCellCssStyles for more.
        * @param key A string key.
        **/
        removeCellCssStyles(key: string): void;
        /**
        * Resets active cell.
        **/
        resetActiveCell(): void;
        /**
        * Sets an active cell.
        * @param row A row index.
        * @param cell A column index.
        **/
        setActiveCell(row: number, cell: number): void;
        /**
        * Sets CSS classes to specific grid cells by calling removeCellCssStyles(key) followed by addCellCssStyles(key, hash). key is name for this set of styles so you can reference it later - to modify it or remove it, for example. hash is a per-row-index, per-column-name nested hash of CSS classes to apply.
        * Suppose you have a grid with columns:
        * ["login", "name", "birthday", "age", "likes_icecream", "favorite_cake"]
        * ...and you'd like to highlight the "birthday" and "age" columns for people whose birthday is today, in this case, rows at index 0 and 9. (The first and tenth row in the grid).
        * @param key A string key. Will overwrite any data already associated with this key.
        * @param hash A hash of additional cell CSS classes keyed by row number and then by column id. Multiple CSS classes can be specified and separated by space.
        **/
        setCellCssStyles(key: string, hash: CellCssStylesHash): void;
        onScroll: Slick.Event<OnScrollEventArgs<T>>;
        onSort: Slick.Event<OnSortEventArgs<T>>;
        onHeaderMouseEnter: Slick.Event<OnHeaderMouseEventArgs<T>>;
        onHeaderMouseLeave: Slick.Event<OnHeaderMouseEventArgs<T>>;
        onHeaderContextMenu: Slick.Event<OnHeaderContextMenuEventArgs<T>>;
        onHeaderClick: Slick.Event<OnHeaderClickEventArgs<T>>;
        onHeaderCellRendered: Slick.Event<OnHeaderCellRenderedEventArgs<T>>;
        onBeforeHeaderCellDestroy: Slick.Event<OnBeforeHeaderCellDestroyEventArgs<T>>;
        onHeaderRowCellRendered: Slick.Event<OnHeaderRowCellRenderedEventArgs<T>>;
        onBeforeHeaderRowCellDestroy: Slick.Event<OnBeforeHeaderRowCellDestroyEventArgs<T>>;
        onMouseEnter: Slick.Event<OnMouseEnterEventArgs<T>>;
        onMouseLeave: Slick.Event<OnMouseLeaveEventArgs<T>>;
        onClick: Slick.Event<OnClickEventArgs<T>>;
        onDblClick: Slick.Event<OnDblClickEventArgs<T>>;
        onContextMenu: Slick.Event<OnContextMenuEventArgs<T>>;
        onKeyDown: Slick.Event<OnKeyDownEventArgs<T>>;
        onAddNewRow: Slick.Event<OnAddNewRowEventArgs<T>>;
        onValidationError: Slick.Event<OnValidationErrorEventArgs<T>>;
        onColumnsReordered: Slick.Event<OnColumnsReorderedEventArgs<T>>;
        onColumnsResized: Slick.Event<OnColumnsResizedEventArgs<T>>;
        onCellChange: Slick.Event<OnCellChangeEventArgs<T>>;
        onBeforeEditCell: Slick.Event<OnBeforeEditCellEventArgs<T>>;
        onBeforeCellEditorDestroy: Slick.Event<OnBeforeCellEditorDestroyEventArgs<T>>;
        onBeforeDestroy: Slick.Event<OnBeforeDestroyEventArgs<T>>;
        onActiveCellChanged: Slick.Event<OnActiveCellChangedEventArgs<T>>;
        onActiveCellPositionChanged: Slick.Event<OnActiveCellPositionChangedEventArgs<T>>;
        onDragInit: Slick.Event<OnDragInitEventArgs<T>>;
        onDragStart: Slick.Event<OnDragStartEventArgs<T>>;
        onDrag: Slick.Event<OnDragEventArgs<T>>;
        onDragEnd: Slick.Event<OnDragEndEventArgs<T>>;
        onSelectedRowsChanged: Slick.Event<OnSelectedRowsChangedEventArgs<T>>;
        onCellCssStylesChanged: Slick.Event<OnCellCssStylesChangedEventArgs<T>>;
        onViewportChanged: Slick.Event<OnViewportChangedEventArgs<T>>;
        registerPlugin(plugin: Plugin<T>): void;
        unregisterPlugin(plugin: Plugin<T>): void;
        render(): void;
        invalidate(): void;
        invalidateRow(row: number): void;
        invalidateRows(rows: number[]): void;
        invalidateAllRows(): void;
        updateCell(row: number, cell: number): void;
        updateRow(row: number): void;
        getViewport(viewportTop?: number, viewportLeft?: number): Viewport;
        getRenderedRange(viewportTop?: number, viewportLeft?: number): Viewport;
        resizeCanvas(): void;
        updateRowCount(): void;
        scrollRowIntoView(row: number, doPaging: boolean): void;
        scrollRowToTop(row: number): void;
        scrollCellIntoView(row: number, cell: number, doPaging: boolean): void;
        getCanvasNode(): HTMLCanvasElement;
        focus(): void;
        getEditorLock(): EditorLock<any>;
        getEditController(): {
            commitCurrentEdit(): boolean;
            cancelCurrentEdit(): boolean;
        };
    }
    interface GridEventArgs<T extends SlickData> {
        grid: Grid<T>;
    }
    interface OnCellCssStylesChangedEventArgs<T extends SlickData> extends GridEventArgs<T> {
        key: string;
        hash: CellCssStylesHash;
    }
    interface OnSelectedRowsChangedEventArgs<T extends SlickData> extends GridEventArgs<T> {
        rows: number[];
    }
    interface OnDragEndEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnDragEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnDragStartEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnDragInitEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnActiveCellPositionChangedEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnActiveCellChangedEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
    }
    interface OnBeforeDestroyEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnBeforeCellEditorDestroyEventArgs<T extends SlickData> extends GridEventArgs<T> {
        editor: Editors.Editor<T>;
    }
    interface OnBeforeEditCellEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
        item: T;
        column: Column<T>;
    }
    interface OnCellChangeEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
        item: T;
    }
    interface OnColumnsResizedEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnColumnsReorderedEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnValidationErrorEventArgs<T extends SlickData> extends GridEventArgs<T> {
        editor: Editors.Editor<T>;
        cellNode: HTMLElement;
        validationResults: ValidateResults;
        row: number;
        cell: number;
        column: Column<T>;
    }
    interface OnAddNewRowEventArgs<T extends SlickData> extends GridEventArgs<T> {
        item: T;
        column: Column<T>;
    }
    interface OnKeyDownEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
    }
    interface OnContextMenuEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnDblClickEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
    }
    interface OnClickEventArgs<T extends SlickData> extends GridEventArgs<T> {
        row: number;
        cell: number;
    }
    interface OnMouseLeaveEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnMouseEnterEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface OnBeforeHeaderRowCellDestroyEventArgs<T extends SlickData> extends GridEventArgs<T> {
        node: HTMLElement;
        column: Column<T>;
    }
    interface OnHeaderRowCellRenderedEventArgs<T extends SlickData> extends GridEventArgs<T> {
        node: HTMLElement;
        column: Column<T>;
    }
    interface OnBeforeHeaderCellDestroyEventArgs<T extends SlickData> extends GridEventArgs<T> {
        node: HTMLElement;
        column: Column<T>;
    }
    interface OnHeaderCellRenderedEventArgs<T extends SlickData> extends GridEventArgs<T> {
        node: HTMLElement;
        column: Column<T>;
    }
    interface OnHeaderClickEventArgs<T extends SlickData> extends GridEventArgs<T> {
        column: Column<T>;
    }
    interface OnHeaderContextMenuEventArgs<T extends SlickData> extends GridEventArgs<T> {
        column: Column<T>;
    }
    interface OnHeaderMouseEventArgs<T extends SlickData> extends GridEventArgs<T> {
        column: Column<T>;
    }
    interface OnSortEventArgs<T extends SlickData> extends GridEventArgs<T> {
        multiColumnSort: boolean;
        sortCol?: Column<T>;
        sortAsc: boolean;
        sortCols?: SortColumn<T>[];
    }
    interface OnScrollEventArgs<T extends SlickData> extends GridEventArgs<T> {
        scrollLeft: number;
        scrollTop: number;
    }
    interface OnViewportChangedEventArgs<T extends SlickData> extends GridEventArgs<T> {
    }
    interface SortColumn<T extends SlickData> {
        sortCol: Column<T>;
        sortAsc: boolean;
    }
    interface Cell {
        row: number;
        cell: number;
    }
    interface CellPosition extends Position {
        bottom: number;
        height: number;
        right: number;
        visible: boolean;
        width: number;
    }
    interface Position {
        top: number;
        left: number;
    }
    interface CellCssStylesHash {
        [index: number]: {
            [id: string]: string;
        };
    }
    interface Viewport {
        top: number;
        bottom: number;
        leftPx: number;
        rightPx: number;
    }
    interface ValidateResults {
        valid: boolean;
        msg: string;
    }
    module Editors {
        interface EditorOptions<T extends Slick.SlickData> {
            column: Column<T>;
            container: HTMLElement;
            grid: Grid<T>;
        }
        class Editor<T extends Slick.SlickData> {
            constructor(args: EditorOptions<T>);
            init(): void;
            destroy(): void;
            focus(): void;
            loadValue(item: any): void;
            applyValue(item: any, state: string): void;
            isValueChanged(): boolean;
            serializeValue(): any;
            validate(): ValidateResults;
        }
        class Text<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            getValue(): string;
            setValue(val: string): void;
            serializeValue(): string;
        }
        class Integer<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            serializeValue(): number;
        }
        class Date<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            show(): void;
            hide(): void;
            position(position: Position): void;
            serializeValue(): string;
        }
        class YesNoSelect<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            serializeValue(): boolean;
        }
        class Checkbox<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            serializeValue(): boolean;
        }
        class PercentComplete<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            serializeValue(): number;
        }
        class LongText<T extends Slick.SlickData> extends Editor<T> {
            constructor(args: EditorOptions<T>);
            handleKeyDown(e: DOMEvent): void;
            save(): void;
            cancel(): void;
            hide(): void;
            show(): void;
            position(position: Position): void;
            serializeValue(): string;
        }
    }
    interface Formatter<T extends SlickData> {
        (row: number, cell: number, value: any, columnDef: Column<T>, dataContext: SlickData): string;
    }
    module Formatters {
        var PercentComplete: Formatter<Slick.SlickData>;
        var PercentCompleteBar: Formatter<Slick.SlickData>;
        var YesNo: Formatter<Slick.SlickData>;
        var Checkmark: Formatter<Slick.SlickData>;
    }
    module Data {
        interface DataViewOptions<T extends Slick.SlickData> {
            groupItemMetadataProvider?: GroupItemMetadataProvider<T>;
            inlineFilters?: boolean;
        }
        /**
        * Item -> Data by index
        * Row -> Data by row
        **/
        class DataView<T extends Slick.SlickData> implements DataProvider<T> {
            constructor(options?: DataViewOptions<T>);
            beginUpdate(): void;
            endUpdate(): void;
            setPagingOptions(args: PagingOptions): void;
            getPagingInfo(): PagingOptions;
            getItems(): T[];
            setItems(data: T[], objectIdProperty?: string): void;
            setFilter(filterFn: (item: T, args: any) => boolean): void;
            sort(comparer: Function, ascending: boolean): void;
            fastSort(field: string, ascending: boolean): void;
            fastSort(field: Function, ascending: boolean): void;
            reSort(): void;
            setGrouping(groupingInfos: GroupingOptions<T> | GroupingOptions<T>[]): void;
            getGrouping(): GroupingOptions<T>[];
            /**
            * @deprecated
            **/
            groupBy(valueGetter: any, valueFormatter: any, sortComparer: any): void;
            /**
            * @deprecated
            **/
            setAggregators(groupAggregators: any, includeCollapsed: any): void;
            /**
            * @param level Optional level to collapse.  If not specified, applies to all levels.
            **/
            collapseAllGroups(level?: number): void;
            /**
            * @param level Optional level to collapse.  If not specified, applies to all levels.
            **/
            expandAllGroups(level?: number): void;
            /**
            * @param varArgs Either a Slick.Group's "groupingKey" property, or a
            *     variable argument list of grouping values denoting a unique path to the row.  For
            *     example, calling collapseGroup('high', '10%') will collapse the '10%' subgroup of
            *     the 'high' setGrouping.
            */
            collapseGroup(...varArgs: string[]): void;
            /**
            * @param varArgs Either a Slick.Group's "groupingKey" property, or a
            *     variable argument list of grouping values denoting a unique path to the row.  For
            *     example, calling expandGroup('high', '10%') will expand the '10%' subgroup of
            *     the 'high' setGrouping.
            */
            expandGroup(...varArgs: string[]): void;
            getGroups(): Group<T>[];
            getIdxById(id: string): number;
            getRowById(id: string): number;
            getItemById(id: any): T;
            getItemByIdx(idx: number): T;
            mapRowsToIds(rowArray: T[]): string[];
            setRefreshHints(hints: RefreshHints): void;
            setFilterArgs(args: any): void;
            refresh(): void;
            updateItem(id: string, item: T): void;
            insertItem(insertBefore: number, item: T): void;
            addItem(item: T): void;
            deleteItem(id: string): void;
            syncGridSelection(grid: Grid<T>, preserveHidden: boolean): void;
            syncGridCellCssStyles(grid: Grid<T>, key: string): void;
            getLength(): number;
            getItem(index: number): T;
            getItemMetadata(index: number): RowMetadata<T>;
            onRowCountChanged: Slick.Event<OnRowCountChangedEventData>;
            onRowsChanged: Slick.Event<OnRowsChangedEventData>;
            onPagingInfoChanged: Slick.Event<OnPagingInfoChangedEventData>;
        }
        interface GroupingOptions<T> {
            getter?: ((item?: T) => any) | string;
            formatter?: (item?: T) => string;
            comparer?: (a: Group<T>, b: Group<T>) => number;
            predefinedValues?: any[];
            aggregators?: Aggregators.Aggregator<T>[];
            aggregateEmpty?: boolean;
            aggregateCollapsed?: boolean;
            aggregateChildGroups?: boolean;
            collapsed?: boolean;
            displayTotalsRow?: boolean;
        }
        interface PagingOptions {
            pageSize?: number;
            pageNum?: number;
            totalRows?: number;
            totalPages?: number;
        }
        interface RefreshHints {
            isFilterNarrowing?: boolean;
            isFilterExpanding?: boolean;
            isFilterUnchanged?: boolean;
            ignoreDiffsBefore?: boolean;
            ignoreDiffsAfter?: boolean;
        }
        interface OnRowCountChangedEventData {
        }
        interface OnRowsChangedEventData {
            rows: number[];
        }
        interface OnPagingInfoChangedEventData extends PagingOptions {
        }
        module Aggregators {
            class Aggregator<T extends Slick.SlickData> {
                field: string;
                init(): void;
                accumulate(item: T): void;
                storeResult(groupTotals: GroupTotals<T>): void;
            }
            class Avg<T> extends Aggregator<T> {
            }
            class Min<T> extends Aggregator<T> {
            }
            class Max<T> extends Aggregator<T> {
            }
            class Sum<T> extends Aggregator<T> {
            }
        }
        /***
        * Provides item metadata for group (Slick.Group) and totals (Slick.Totals) rows produced by the DataView.
        * This metadata overrides the default behavior and formatting of those rows so that they appear and function
        * correctly when processed by the grid.
        *
        * This class also acts as a grid plugin providing event handlers to expand & collapse groups.
        * If "grid.registerPlugin(...)" is not called, expand & collapse will not work.
        *
        * @class GroupItemMetadataProvider
        * @module Data
        * @namespace Slick.Data
        * @constructor
        * @param options
        */
        class GroupItemMetadataProvider<T extends Slick.SlickData> {
            init(): void;
            destroy(): void;
            getGroupRowMetadata(item?: Group<T>): RowMetadata<T>;
            getTotalsRowMetadata(item?: GroupTotals<T>): RowMetadata<T>;
        }
        interface GroupItemMetadataProviderOptions {
            groupCssClass?: string;
            groupTitleCssClass?: string;
            totalsCssClass?: string;
            groupFocusable?: boolean;
            totalsFocusable?: boolean;
            toggleCssClass?: string;
            toggleExpandedCssCass?: string;
            toggleCollapsedCssClass?: string;
            enableExpandCollapse?: boolean;
        }
    }
    class Plugin<T extends Slick.SlickData> {
        constructor(options?: PluginOptions);
        init(grid: Grid<T>): void;
        destroy(): void;
    }
    interface PluginOptions {
    }
    interface ICustomSlickEditorArgs<T extends Slick.SlickData> {
        column: Slick.Column<T>;
        commitChanges: Function;
        container: JQuery;
    }
}
interface XEditableOptions {
    ajaxOptions?: any;
    anim?: string;
    autotext?: string;
    defaultValue?: any;
    disabled?: boolean;
    display?: any;
    emptyclass?: string;
    emptytext?: string;
    error?: any;
    highlight?: any;
    mode?: string;
    name?: string;
    onblur?: string;
    params?: any;
    pk?: any;
    placement?: string;
    savenochange?: boolean;
    selector?: string;
    send?: string;
    showbuttons?: any;
    success?: any;
    toggle?: string;
    type?: string;
    unsavedclass?: string;
    url?: any;
    validate?: any;
    value?: any;
}
interface XEditableSubmitOptions {
    url?: any;
    data?: any;
    ajaxOptions?: any;
    error(obj: any): void;
    success(obj: any, config: any): void;
}
interface XEditable {
    options: XEditableOptions;
    activate(): void;
    destroy(): void;
    disable(): void;
    enable(): void;
    getValue(isSingle: boolean): any;
    hide(): void;
    option(key: any, value: any): void;
    setValue(value: any, convertStr: boolean): void;
    show(closeAll: boolean): void;
    submit(options: XEditableSubmitOptions): void;
    toggle(closeAll: boolean): void;
    toggleDisabled(): void;
    validate(): void;
}
interface JQuery {
    /**
      * Initializes editable with the specified options
      * @param options an object with options specific to the editable instance
      */
    editable(options?: any): XEditable;
    /**
      * Initializes editable calling the specific method with is parameters
      * @param method the method to call
      * @param params the parameters expected by the method
      */
    editable(method: string, params?: any): XEditable;
}
interface CodeMirrorScrollInfo {
    x: number;
    y: number;
    width: number;
    height: number;
}
interface CodeMirrorCoords {
    x: number;
    y: number;
    yBot: number;
}
interface CodeMirrorPosition {
    line: number;
    ch: number;
}
interface CodeMirrorHistorySize {
    undo: number;
    redo: number;
}
interface CodeMirrorToken {
    start: number;
    end: number;
    string: string;
    className: string;
    state: any;
}
interface CodeMirrorMarkTextOptions {
    inclusiveLeft: boolean;
    inclusiveRight: boolean;
    startStype: string;
    endStyle: string;
}
interface CodeMirrorBookMark {
    clear(): void;
    find(): CodeMirrorPosition;
}
interface CodeMirrorLineHandle {
}
interface CodeMirrorLineInfo {
    line: number;
    handler: CodeMirrorLineHandle;
    text: string;
    markerText: string;
    markerClass: string;
    lineClass: string;
    bgClass: string;
}
interface CodeMirrorViewPort {
    from: number;
    to: number;
}
interface CodeMirrorChange {
    from: CodeMirrorPosition;
    to: CodeMirrorPosition;
    text: string[];
    next: CodeMirrorChange;
}
interface CodeMirrorChangeListener {
    (editor: CodeMirrorEditor, change: CodeMirrorChange): void;
}
interface CodeMirrorViewPortChangeListener {
    (editor: CodeMirrorEditor, from: CodeMirrorPosition, to: CodeMirrorPosition): void;
}
interface CodeMirrorStream {
    eol(): boolean;
    sol(): boolean;
    peek(): string;
    next(): string;
    eat(match: any): string;
    eatWhile(match: any): boolean;
    eatSpace(): boolean;
    skipToEnd(): void;
    skipTo(ch: string): boolean;
    match(pattern: RegExp, consume: boolean, caseFold: boolean): boolean;
    backUp(n: number): void;
    column(): number;
    indentation(): number;
    current(): string;
    string: string;
    pos: number;
    start: number;
}
interface CodeMirrorModeDefition {
    (options: CodeMirrorOptions, modeOptions: any): CodeMirrorMode;
}
interface CodeMirrorMode {
    startState(): any;
    token(stream: CodeMirrorStream, state: any): string;
    blankLine?(state: any): string;
    copyState?(state: any): any;
    indent?(state: any, textAfter: string, text: String): number;
    electricChars?: string;
}
interface CodeMirrorEditor {
    getValue(): string;
    setValue(valu: string): void;
    getSelection(): string;
    replaceSelection(value: string): void;
    setSize(width: number, height: number): void;
    focus(): void;
    scrollTo(x: number, y: number): void;
    getScrollInfo(): CodeMirrorScrollInfo;
    setOption(option: string, value: any): void;
    getOption(option: string): any;
    getMode(): CodeMirrorMode;
    cursorCoords(start: boolean, mode: string): CodeMirrorCoords;
    charCoords(pos: CodeMirrorPosition, mode: string): CodeMirrorCoords;
    undo(): void;
    redo(): void;
    historySize(): CodeMirrorHistorySize;
    clearHistory(): void;
    getHistory(): any;
    setHistory(history: any): void;
    indentLine(line: number, dir?: boolean | string): void;
    getTokenAt(pos: CodeMirrorPosition): CodeMirrorToken;
    markText(from: CodeMirrorPosition, to: CodeMirrorPosition, className: string, option?: CodeMirrorMarkTextOptions): CodeMirrorBookMark;
    setBookmark(pos: CodeMirrorPosition): CodeMirrorBookMark;
    findMarksAt(pos: CodeMirrorPosition): CodeMirrorBookMark[];
    setMarker(line: number, text: string, className: string): CodeMirrorLineHandle;
    clarMarker(line: number): void;
    setLineClass(line: number, className: string, backgroundClassName: string): CodeMirrorLineHandle;
    hideLine(line: number): CodeMirrorLineHandle;
    showLine(line: number): CodeMirrorLineHandle;
    onDeleteLine(line: number, callBack: Function): void;
    lineInfo(line: number): CodeMirrorLineInfo;
    getLineHandler(line: number): CodeMirrorLineHandle;
    getViewPort(): CodeMirrorViewPort;
    addWidget(pos: CodeMirrorPosition, node: Node, scrollIntoView: boolean): void;
    matchBrackets(): void;
    lineCount(): number;
    getCursor(start?: void | boolean): CodeMirrorPosition;
    somethingSelected(): boolean;
    setCursor(pos: CodeMirrorPosition): void;
    setCursor(a: number, b: number): void;
    setSelection(start: CodeMirrorPosition, end: CodeMirrorPosition): void;
    getLine(n: number): string;
    setLine(n: string, text: string): void;
    removeLine(n: number): void;
    getRange(from: CodeMirrorPosition, to: CodeMirrorPosition): string;
    replaceRange(text: string, from: CodeMirrorPosition, to?: CodeMirrorPosition): void;
    posFromIndex(index: number): CodeMirrorPosition;
    indexFromPos(pos: CodeMirrorPosition): number;
    operation(func: Function): any;
    compundChange(func: Function): any;
    refresh(): void;
    getInputField(): HTMLTextAreaElement;
    getWrapperElement(): HTMLElement;
    getScrollerElement(): HTMLElement;
    getGutterElement(): HTMLElement;
    getStateAfter(line: any): any;
    jsonMode: boolean;
}
interface CodeMirrorState {
    lexical: CodeMirrorLexicalState;
}
interface CodeMirrorLexicalState {
    type: string;
}
interface CodeMirrorOptions {
    value?: string;
    mode?: string;
    them?: string;
    indentUnit?: number;
    smartIndend?: number;
    tabSize?: number;
    indentWithTabs?: boolean;
    electricsChars?: boolean;
    autoClearEmptyLines?: boolean;
    keyMap?: string;
    extraKeys?: any;
    lineWrapping?: boolean;
    lineNumbers?: boolean;
    firstLineNumber?: boolean;
    lineNumberFormatter?: Function;
    gutter?: boolean;
    fixedGutter?: boolean;
    readOnly?: boolean;
    onChange?: CodeMirrorChangeListener;
    onCursorActivity?: Function;
    onViewportChange?: CodeMirrorViewPortChangeListener;
}
interface CodeEditorMode {
    commentEnd: string;
    commentStart: string;
}
declare var CodeMirror: {
    (element: HTMLElement, options: CodeMirrorOptions): CodeMirrorEditor;
    version: string;
    defaults: CodeMirrorOptions;
    fromTextArea(textArea: HTMLTextAreaElement | HTMLElement, options: CodeMirrorOptions | any): CodeMirrorEditor;
    defineMode(name: string, func: CodeMirrorModeDefition): void;
    defineMIME(mime: string, mode: string): void;
    connect(target: EventTarget, event: String, func: Function): void;
    commands: any;
    extendMode: (mode: string, param: {}) => void;
    defineExtension: (p1: string, fct: (a: any, b: any, c: any) => void) => void;
    innerMode: (p1: any, p2: any) => {
        mode: {
            newlineAfterToken: any;
        };
        state: any;
    };
    copyState(outer: any, state: any): void;
    StringStream: any;
};
declare class SimpleDateFormat {
    constructor(ds: string);
    format(date: Date): string;
}
declare var DrawTree: any;
interface DrawTreeNode {
    isRoot?: boolean;
    isOutDate?: boolean;
    Class?: string;
    isSelect?: boolean;
    types?: ILinkType[];
    isDown?: boolean;
    isCreate?: boolean;
    isIndirect?: boolean;
    type?: string;
    Content?: JQuery;
    style?: string;
    Nodes?: DrawTreeNode[];
    Hidden?: DrawTreeNode[];
    ToolTip?: string;
    id?: string;
}
interface DrawTreeType {
    type: string;
}
declare namespace Annotator {
    class Plugin {
        static superUser: boolean;
        static IO: (element: any, options: AnnotatorPluginOptions) => any;
        static apply: (a: any, b: any) => any;
    }
}
interface AnnotatorObj {
    subscribe: (eventName: string, fct: (annotation: IInlineComment) => any) => AnnotatorObj;
    viewer: {
        addField: (load: any) => any;
    };
}
interface AnnotatorPluginOptions {
    events: {};
    options: {};
    pluginInit: () => any;
}
declare type JSONEditorOptions<TValue> = {
    /**
     * If true, JSON Editor will load external URLs in $ref via ajax.
     */
    ajax?: boolean;
    /**
     * If true, remove all "add row" buttons from arrays.
     */
    custom_validators?: any[];
    disable_array_add?: boolean;
    /**
     * If true, remove all "delete row" buttons from arrays.
     */
    disable_array_delete?: boolean;
    /**
     * If true, remove all "move up" and "move down" buttons from arrays.
     */
    disable_array_reorder?: boolean;
    /**
     * If true, remove all collapse buttons from objects and arrays.
     */
    disable_collapse?: boolean;
    /**
     * If true, remove all Edit JSON buttons from objects.
     */
    disable_edit_json?: boolean;
    /**
     * If true, remove all Edit Properties buttons from objects.
     */
    disable_properties?: boolean;
    /**
     * The first part of the `name` attribute of form inputs in the editor. An full example name is `root[person][name]` where "root" is the form_name_root.
     */
    form_name_root?: string;
    /**
     * The icon library to use for the editor.
     */
    iconlib?: "bootstrap2" | "bootstrap3" | "foundation2" | "foundation3" | "jqueryui" | "fontawesome3" | "fontawesome4";
    /**
     * If true, objects can only contain properties defined with the properties keyword.
     */
    no_additional_properties?: boolean;
    object_layout?: string;
    /**
     * An object containing schema definitions for URLs. Allows you to pre-define external schemas.
     */
    refs?: any;
    /**
     * If true, all schemas that don't explicitly set the required property will be required.
     */
    required_by_default?: boolean;
    /**
     * If true, makes oneOf copy properties over when switching.
     */
    keep_oneof_values?: boolean;
    /**
     * A valid JSON Schema to use for the editor. Version 3 and Version 4 of the draft specification are supported.
     */
    schema?: any;
    /**
     * When to show validation errors in the UI. Valid values are interaction, change, always, and never.
     */
    show_errors?: "interaction" | "change" | "always" | "never";
    /**
     * Seed the editor with an initial value. This should be valid against the editor's schema.
     */
    startval?: TValue;
    /**
     * The JS template engine to use.
     */
    template?: string | {
        compile: (template: string) => (vars: any) => string;
    };
    /**
     * The CSS theme to use.
     */
    theme?: "barebones" | "html" | "bootstrap2" | "bootstrap3" | "foundation3" | "foundation4" | "foundation5" | "foundation6" | "jqueryui";
    /**
     * If true, only required properties will be included by default.
     */
    display_required_only?: boolean;
};
declare type JSONEditorError = {
    path: string;
    property: string;
    message: string;
};
declare type JSONEditorObjectOptions = {
    /**
     * If set to true, the editor will start collapsed
     */
    collapsed?: boolean;
    /**
     * If set to true, the collapse button will be hidden
     */
    disable_collapse?: boolean;
    /**
     * If set to true, the Edit JSON button will be hidden
     */
    disable_edit_json?: boolean;
    /**
     * If set to true, the Edit Properties button will be hidden
     */
    disable_properties?: boolean;
};
declare type JSONEditorArrayOptions = {
    /**
     * If set to true, the editor will start collapsed
     */
    collapsed?: boolean;
    /**
     * If set to true, the "add row" button will be hidden
     */
    disable_array_add?: boolean;
    /**
     * If set to true, all of the "delete" buttons will be hidden
     */
    disable_array_delete?: boolean;
    /**
     * If set to true, just the "delete all rows" button will be hidden
     */
    disable_array_delete_all_rows?: boolean;
    /**
     * If set to true, just the "delete last row" buttons will be hidden
     */
    disable_array_delete_last_row?: boolean;
    /**
     * If set to true, the "move up/down" buttons will be hidden
     */
    disable_array_reorder?: boolean;
    /**
     * If set to true, the collapse button will be hidden
     */
    disable_collapse?: boolean;
};
declare class JSONEditor<TValue> {
    static defaults: {
        options: JSONEditorOptions<any>;
        editors: {
            object: {
                options: JSONEditorObjectOptions;
            };
            array: {
                options: JSONEditorArrayOptions;
            };
        };
        languages: any;
        language: string;
        resolvers: ((schema: any) => string)[];
        custom_validators: (((schema: any, value: string, path: string) => JSONEditorError[]))[];
    };
    static plugins: {
        sceditor: {
            emoticonsEnabled: boolean;
        };
        epiceditor: {
            basePath: string;
        };
        ace: {
            theme: string;
        };
        selectize: {
            enable: boolean;
        };
    };
    constructor(element: HTMLElement, options: JSONEditorOptions<TValue>);
    on(event: string, fn: Function): JSONEditor<TValue>;
    off(event: string, fn: Function): JSONEditor<TValue>;
    watch(event: string, fn: Function): JSONEditor<TValue>;
    unwatch(event: string, fn: Function): JSONEditor<TValue>;
    validate(value?: TValue): JSONEditorError[];
    setValue(value: TValue): void;
    getValue(): TValue;
    getEditor(name: string): JSONEditor<TValue>;
    disable(): void;
    enable(): void;
    isEnabled(): boolean;
    destroy(): void;
}
declare module "json-editor" {
    export = JSONEditor;
}
declare namespace DOMPurify {
    let version: string;
    let removed: any[];
    let isSupported: boolean;
    function sanitize(source: string | Node): string;
    function sanitize(source: string | Node, config: Config & {
        RETURN_DOM_FRAGMENT?: false;
        RETURN_DOM?: false;
    }): string;
    function sanitize(source: string | Node, config: Config & {
        RETURN_DOM_FRAGMENT: true;
    }): DocumentFragment;
    function sanitize(source: string | Node, config: Config & {
        RETURN_DOM: true;
    }): HTMLElement;
    function sanitize(source: string | Node, config: Config): string | HTMLElement | DocumentFragment;
    function addHook(hook: 'uponSanitizeElement', cb: (currentNode: Element, data: SanitizeElementHookEvent, config: Config) => void): void;
    function addHook(hook: 'uponSanitizeAttribute', cb: (currentNode: Element, data: SanitizeAttributeHookEvent, config: Config) => void): void;
    function addHook(hook: HookName, cb: (currentNode: Element, data: HookEvent, config: Config) => void): void;
    function setConfig(cfg: Config): void;
    function clearConfig(): void;
    function isValidAttribute(tag: string, attr: string, value: string): boolean;
    function removeHook(entryPoint: HookName): void;
    function removeHooks(entryPoint: HookName): void;
    function removeAllHooks(): void;
    interface Config {
        ADD_ATTR?: string[];
        ADD_TAGS?: string[];
        ALLOW_DATA_ATTR?: boolean;
        ALLOWED_ATTR?: string[];
        ALLOWED_TAGS?: string[];
        FORBID_ATTR?: string[];
        FORBID_TAGS?: string[];
        FORCE_BODY?: boolean;
        KEEP_CONTENT?: boolean;
        RETURN_DOM?: boolean;
        RETURN_DOM_FRAGMENT?: boolean;
        RETURN_DOM_IMPORT?: boolean;
        SAFE_FOR_JQUERY?: boolean;
        SANITIZE_DOM?: boolean;
        WHOLE_DOCUMENT?: boolean;
        ALLOWED_URI_REGEXP?: RegExp;
        SAFE_FOR_TEMPLATES?: boolean;
        ALLOW_UNKNOWN_PROTOCOLS?: boolean;
        USE_PROFILES?: false | {
            mathMl?: boolean;
            svg?: boolean;
            svgFilters?: boolean;
            html?: boolean;
        };
        IN_PLACE?: boolean;
    }
    type HookName = 'beforeSanitizeElements' | 'uponSanitizeElement' | 'afterSanitizeElements' | 'beforeSanitizeAttributes' | 'uponSanitizeAttribute' | 'afterSanitizeAttributes' | 'beforeSanitizeShadowDOM' | 'uponSanitizeShadowNode' | 'afterSanitizeShadowDOM';
    type HookEvent = SanitizeElementHookEvent | SanitizeAttributeHookEvent | null;
    interface SanitizeElementHookEvent {
        tagName: string;
        allowedTags: string[];
    }
    interface SanitizeAttributeHookEvent {
        attrName: string;
        attrValue: string;
        keepAttr: boolean;
        allowedAttributes: string[];
    }
}
declare namespace c3 {
    const version: string;
    function generate(config: ChartConfiguration): ChartAPI;
    type Primitive = string | boolean | number | Date | null | Function;
    type PrimitiveArray = Primitive[];
    type ArrayOrSingle<T extends any> = T | T[];
    type ArrayOrString = ArrayOrSingle<string>;
    /** Zoomed domain in the form `[minimum, maximum]` where `minimum` and `maximum` are the values at the edges of the visible x-axis. */
    type Domain = [number, number];
    /**
     * Formatter function for data labels.
     * D3 formatter function can be set (e.g. `d3.format('$')`).
     * @param v The value of the data point where the label is shown.
     * @param id The id of the data where the label is shown.
     * @param i The index of the data point where the label is shown.
     * @param j The sub index of the data point where the label is shown.
     * @returns The formatted data label.
     */
    type FormatFunction = (v: number | {
        valueOf(): number;
    }, id: string, i: number, j: number) => string;
    type YAxisName = "y" | "y2";
    type AxisName = "x" | YAxisName;
    type ChartType = "line" | "spline" | "step" | "area" | "area-spline" | "area-step" | "bar" | "scatter" | "stanford" | "pie" | "donut" | "gauge";
    interface SidePadding {
        /** Right padding. */
        right?: number;
        /** Left padding. */
        left?: number;
    }
    interface Padding extends SidePadding {
        /** Top padding. */
        top?: number;
        /** Bottom padding. */
        bottom?: number;
    }
    interface ChartConfiguration {
        /**
         * The CSS selector or the element which the chart will be set to. D3 selection object can be specified. If other chart is set already, it will be replaced with the new one (only one chart
         * can be set in one element).
         * If this option is not specified, the chart will be generated but not be set. Instead, we can access the element by chart.element and set it by ourselves.
         * Note: When chart is not binded, c3 starts observing if chart.element is binded by MutationObserver. In this case, polyfill is required in IE9 and IE10 becuase they do not support
         * MutationObserver. On the other hand, if chart always will be binded, polyfill will not be required because MutationObserver will never be called.
         */
        bindto?: string | HTMLElement | null;
        svg?: {
            /** Class to assign to the chart's container SVG element. */
            classname?: string;
        };
        size?: {
            /**
             * The desired width of the chart element.
             * If this option is not specified, the width of the chart will be calculated by the size of the parent element it's appended to.
             * Note: This option should be specified if possible because it can improve its performance because some size calculations will be skipped by an explicit value.
             */
            width?: number;
            /**
             * The desired height of the chart element.
             * If this option is not specified, the height of the chart will be calculated by the size of the parent element it's appended to.
             */
            height?: number;
        };
        padding?: Padding;
        resize?: {
            /**
             * Indicate if the chart should automatically get resized when the window gets resized.
             */
            auto?: boolean;
        };
        color?: {
            /**
             * Set custom color pattern. Order matches the order of the data.
             */
            pattern?: string[];
            /**
             * **Experimental.**
             */
            threshold?: {
                unit?: string;
                values?: any[];
                /** Defaults to `100`. */
                max?: number;
            };
        };
        interaction?: {
            /**
             * Indicate if the chart should have interactions.
             * If `false` is set, all of interactions (showing/hiding tooltip, selection, mouse events, etc) will be disabled.
             */
            enabled?: boolean;
            brighten?: boolean;
        };
        transition?: {
            /**
             * Set duration of transition (in milliseconds) for chart animation.
             * Note: If `0` or `null` set, transition will be skipped. So, this makes initial rendering faster especially in case you have a lot of data.
             */
            duration?: number | null;
        };
        /**
         * Set a callback to execute when the chart is initialized.
         */
        oninit?(this: ChartInternal): void;
        /**
         * Set a callback which is executed when the chart is rendered. Basically, this callback will be called in each time when the chart is redrawed.
         */
        onrendered?(this: ChartInternal): void;
        /**
         * Set a callback to execute when mouse enters the chart.
         */
        onmouseover?(this: ChartInternal): void;
        /**
         * Set a callback to execute when mouse leaves the chart.
         */
        onmouseout?(this: ChartInternal): void;
        /**
         * Set a callback to execute when user resizes the screen.
         */
        onresize?(this: ChartInternal): void;
        /**
         * Set a callback to execute when screen resize finished.
         */
        onresized?(this: ChartInternal): void;
        data: Data;
        axis?: AxesOptions;
        grid?: GridOptions;
        /**
         * Show rectangles inside the chart.
         * This option accepts array including object that has axis, start, end and class. The keys start, end and class are optional.
         * axis must be x, y or y2. start and end should be the value where regions start and end. If not specified, the edge values will be used. If timeseries x axis, date string, Date object and
         * unixtime integer can be used. If class is set, the region element will have it as class.
         */
        regions?: RegionOptions[];
        legend?: LegendOptions;
        tooltip?: TooltipOptions;
        subchart?: SubchartOptions;
        zoom?: ZoomOptions;
        point?: PointOptions;
        line?: LineOptions;
        area?: {
            /**
             * Set if min or max value will be 0 on area chart.
             */
            zerobased?: boolean;
        };
        bar?: {
            /**
             * Change the width of bars. If ratio is specified, change the width of bar chart by ratio.
             */
            width?: number | {
                /**
                 * Set the width of each bar by ratio
                 * Defaults to `0.6`.
                 */
                ratio: number;
                /**
                 * Set max width of each bar
                 */
                max?: number;
            };
            /**
             * Set if min or max value will be 0 on bar chart.
             */
            zerobased?: boolean;
            /**
             * Set space between bars in bar charts
             */
            space?: number;
        };
        pie?: {
            label?: LabelOptionsWithThreshold;
            /**
             * Enable or disable expanding pie pieces.
             */
            expand?: ExpandOptions;
        };
        donut?: {
            label?: LabelOptionsWithThreshold;
            /**
             * Enable or disable expanding pie pieces.
             */
            expand?: ExpandOptions;
            /**
             * Set width of donut chart.
             */
            width?: number;
            /**
             * Set title of donut chart.
             */
            title?: string;
        };
        gauge?: {
            label?: LabelOptions;
            labelLine?: {
                show?: boolean;
            };
            /**
             * Enable or disable expanding gauge.
             */
            expand?: ExpandOptions;
            /**
             * Set min value of the gauge.
             * Defaults to `0`.
             */
            min?: number;
            /**
             * Set max value of the gauge.
             * Defaults to `100`.
             */
            max?: number;
            /**
             * Set units of the gauge.
             */
            units?: string;
            /**
             * Set width of gauge chart.
             */
            width?: number;
            /**
             * Whether this should be displayed
             * as a full circle instead of a
             * half circle.
             * Defaults to `false`.
             */
            fullCircle?: boolean;
            arcs?: {
                /**
                 * Defaults to `5`.
                 */
                minWidth?: number;
            };
        };
        spline?: {
            interpolation?: {
                /**
                 * Set custom spline interpolation
                 */
                type?: 'linear' | 'linear-closed' | 'basis' | 'basis-open' | 'basis-closed' | 'bundle' | 'cardinal' | 'cardinal-open' | 'cardinal-closed' | 'monotone';
            };
        };
        stanford?: {
            /** Show lines anywhere in the chart. */
            lines?: Array<{
                value_x1?: number;
                value_y1?: number;
                value_x2?: number;
                value_y2?: number;
                /** Class to apply to the line. */
                class?: string;
            }>;
            /** Add regions to the chart. */
            regions?: Array<{
                /** Points should be added in counter-clockwise direction  to close the polygon. */
                points: Array<{
                    x: number;
                    y: number;
                }>;
                text?: string;
                opacity?: number;
                /** Class to apply to the region. */
                class?: string;
            }>;
            /** Show text anywhere inside the chart. */
            texts?: Array<{
                /** x-position. */
                x?: number;
                /** y-position. */
                y?: number;
                /** Text content to show. */
                content?: string;
                /** Class to apply to the text. */
                class?: string;
            }>;
            /** Change the minimum value of the stanford color scale. */
            scaleMin?: number;
            /** Change the maximum value of the stanford color scale. */
            scaleMax?: number;
            /**
             * Change the width of the stanford color scale.
             * Defaults to `20`.
             */
            scaleWidth?: undefined;
            /**
             * Set formatter for stanford color scale axis tick text.
             * This option accepts the string 'pow10', a d3.format object and any function you define.
             * Defauls to `d3.format("d")`.
             */
            scaleFormat?: 'pow10' | ((arg0: number) => string);
            /**
             * Set the values for stanford color scale axis tick text. This option accepts a function that returns an array of numbers.
             */
            scaleValues?: (minValue: number, maxValue: number) => number[];
            /**
             * Set the color interpolator for stanford color scale. This option is a
             * `d3.interpolate*` object or any function you definethat receives a
             * value between `0` and `1`, and returns a color as string.
             */
            colors?: (value: number) => string;
            /**
             * Set the padding for the Stanford color scale.
             */
            padding?: Padding;
        };
        title?: {
            /**
             * Chart title text.
             */
            text?: string;
            /**
             * Spacing around the title.
             */
            padding?: Padding;
            /**
             * Position the title relative to the chart.
             */
            title_position?: "right" | "center" | "left";
        };
    }
    interface LabelOptions {
        /**
         * Show or hide label on each pie piece.
         */
        show?: boolean;
        /**
         * Set formatter for the label on each pie piece.
         */
        format?(value: number, ratio: number, id: string): string | number;
    }
    type ExpandOptions = boolean | {
        /** Transition duration for expanding. */
        duration?: number;
    };
    interface LabelOptionsWithThreshold extends LabelOptions {
        /**
         * Set threshold to show/hide labels.
         * Defaults to `0.05`.
         */
        threshold?: number;
        ratio?: any;
    }
    interface Data {
        /**
         * Load a CSV or JSON file from a URL. Note that this will not work if loading via the `"file://"` protocol as most browsers with block `XMLHTTPRequests`.
         */
        url?: string;
        /**
         * Specify headers for the data request if `data.url` is provided.
         */
        headers?: any;
        /**
         * Parse a JSON object for data. Can be in the column form `{key1: [val1, val2, ...]; ...}` or in the row form `[{key1: val1; key2: val2}, ...]`. If `url` is provided this will be ignored.
         */
        json?: Record<string, PrimitiveArray> | Array<Record<string, Primitive>>;
        /**
         * A list of rows, where the first row is the column names and the remaining rows are data.  If `url` or `json` are provided this will be ignored.
         */
        rows?: PrimitiveArray[];
        /**
         * A list of columns, where the first element in each column is the ID and the remaining elements are data. If `url`, `json`, or `rows` are provided, this will be ignored.
         */
        columns?: PrimitiveArray[];
        /**
         * Used if loading JSON via `data.url`.
         */
        mimeType?: string;
        /**
         * If `data.json` is provided and is in row form, these keys are used to pull the data from each row.
         */
        keys?: {
            /** This is the key for the x-value in each row. */
            x?: string;
            /** List of remaining keys (besides the x key) to pull data for. */
            value: string[];
        };
        /**
         * Specify the key of x values in the data.
         * We can show the data with non-index x values by this option. This option is required when the type of x axis is timeseries. If this option is set on category axis, the values of the data
         * on the key will be used for category names.
         */
        x?: string;
        /**
         * Specify the keys of the x values for each data.
         * This option can be used if we want to show the data that has different x values.
         */
        xs?: {
            [key: string]: string;
        };
        /**
         * Set a format to parse string specifed as x.
         * Default is `"%Y-%m-%d"`.
         * @see https://github.com/d3/d3-time-format#locale_format For a list of valid format specifiers.
         */
        xFormat?: string;
        /**
         * Set to `true` to parse dates and times as local time.
         * **Experimental.**
         */
        xLocaltime?: boolean;
        /**
         * Set to `true` to sort x values.
         * **Experimental.**
         */
        xSort?: boolean;
        /**
         * Set custom data display names.
         */
        names?: {
            [key: string]: string;
        };
        /**
         * Set custom data classes for styling.
         * If this option is specified, the element g for the data has an additional class that has the prefix `c3-target-` (e.g. `c3-target-additional-data1-class`).
         */
        classes?: {
            [key: string]: string;
        };
        /**
         * Set groups for the data for stacking.
         */
        groups?: string[][];
        /**
         * Set y axis the data related to.
         */
        axes?: {
            [key: string]: AxisName;
        };
        /**
         * Set chart type at once.
         * If this option is specified, the type will be applied to every data. This setting can be overwritten for individual data by `data.types`.
         */
        type?: ChartType;
        /**
         * Set chart type for each data.
         * This setting overwrites the chart-wide `data.type` setting.
         */
        types?: {
            [key: string]: ChartType;
        };
        /**
         * Show labels on each data points or set formatter function for data labels.
         * Control all labels with a boolean value or `format` function, or control behavior for individual data with a `format` object.
         */
        labels?: boolean | {
            format: FormatFunction;
        } | {
            format: {
                [key: string]: boolean | FormatFunction;
            };
        };
        /**
         * Define the order of the data.
         * This option changes the order of stacking the data and pieces of pie/donut. If null specified, it will be the order the data loaded. If function specified, it will be used to sort the data
         * and it will recieve the data as argument.
         */
        order?: "asc" | "desc" | ((...data: DataSeries[]) => number) | null;
        /**
         * Define regions for each data.
         * The values must be an array for each data and it should include an object that has start, end, style. If start is not set, the start will be the first data point. If end is not set, the
         * end will be the last data point.
         * Currently this option supports only line chart and dashed style. If this option specified, the line will be dashed only in the regions.
         */
        regions?: {
            [key: string]: RegionOptions[];
        };
        /**
         * Set color converter function.
         * The function is called for each data ID, for each data series, and for each individual point.
         */
        color?: (color: string, d: string | DataSeries | DataPoint) => string;
        /**
         * Set color for each data.
         * If a function is specified, it is called once each with the data ID, the data series, and each point.
         */
        colors?: {
            [key: string]: string | ((d: string | DataSeries | DataPoint) => string);
        };
        /**
         * Hide each data when the chart appears.
         * If true specified, all of data will be hidden. If multiple ids specified as an array, those will be hidden.
         */
        hide?: boolean | string[];
        /**
         * Specify a filter function to selectively load data.
         * @param series The data series for which to decide whether to show or not.
         * @param index The index of the data series in the data.
         * @param allSeries Array of all data series, whether filtered or not.
         * @returns `true` if the series should be shown, `false` if it should be hidden.
         */
        filter?: (series: DataSeries, index: number, allSeries: DataSeries[]) => boolean;
        /**
         * Set text displayed when empty data.
         * Defaults to `""`.
         */
        empty?: {
            label: {
                text: string;
            };
        };
        selection?: {
            /**
             * Enable or disable selecting data.
             * If this option is set `true`, we can select the data points and get/set its state of selection by API (e.g. `select`, `unselect`, `selected`).
             * Defaults to `false`.
             */
            enabled?: boolean;
            /**
             * Set grouped selection enabled.
             * If this option set `true`, multiple data points that have same x value will be selected by one selection.
             * Defaults to `false`.
             */
            grouped?: boolean;
            /**
             * Set multiple data points selection enabled.
             * If this option set `true`, multiple data points can have the selected
             * state at the same time. If `false` set, only one data point can have
             * the selected state and the others will be unselected when the new data point is selected.
             */
            multiple?: boolean;
            /**
             * Enable to select data points by dragging.
             * If this option set `true`, data points can be selected by dragging.
             *
             * **Note**: If this option set `true`, scrolling on the chart will be disabled because dragging event will handle the event.
             */
            draggable?: boolean;
            /**
             * Prevent specific data from being selected. Only called if `selection.enabled` is `true`.
             * @param d The data series to decide for.
             * @returns `false` if selection should be disabled for this data.
             */
            isselectable?(this: Record<string, any>, d: DataSeries): boolean;
        };
        /**
         * Set a callback for click event on each data point.
         * @param d The data point that was clicked.
         * @param element The element for the data point that was clicked.
         */
        onclick?(this: ChartAPI, d: DataPoint, element: SVGElement): void;
        /**
         * Set a callback for mouseover event on each data point.
         * @param d The data point that was moused over.
         * @param element The element for that point. Not passed for some chart types, line 'line'.
         */
        onmouseover?(this: ChartAPI, d: DataPoint, element?: SVGElement): void;
        /**
         * Set a callback for mouseout event on each data point.
         * @param d The data point that the mouse left.
         * @param element The element for that point. Not passed for some chart types, line 'line'.
         */
        onmouseout?(this: ChartAPI, d: DataPoint, element?: SVGElement): void;
        /**
         * Set a callback for data selection.
         * @param d The data point that was selected.
         * @param element The element for the data point that was selected.
         */
        onselected?(this: ChartAPI, d: DataPoint, element: SVGElement): void;
        /**
         * Set a callback for data deselection.
         * @param d The data point that was unselected.
         * @param element The element for the data point that was unselected.
         */
        onunselected?(this: ChartAPI, d: DataPoint, element: SVGElement): void;
        /**
         * For Stanford charts, specify the key of the epochs data, which maps values to their color.
         * Defaults to `"epochs"`.
         */
        epochs?: string;
        /**
         * Convert data IDs with this function before creating chart.
         * @param id The original ID string.
         * @returns The converted ID string.
         */
        idConverter?(id: string): string;
    }
    interface AxesOptions {
        /**
         * Switch x and y axis position.
         */
        rotated?: boolean;
        /** x axis configuration. */
        x?: XAxisConfiguration;
        /** y axis configuration. */
        y?: YAxisConfigurationWithTime;
        /** y2 axis configuration. */
        y2?: YAxisConfiguration;
    }
    interface AxisConfiguration {
        /**
         * Show or hide the axis.
         */
        show?: boolean;
        /**
         * Set padding for axis.
         * If this option is set, the range of axis will increase/decrease according to the values. If no padding is needed in the range of axis, `0` should be set. On category axis, this option
         * will be ignored.
         */
        padding?: Padding;
        /**
         * Set label on axis.
         * Valid horizontal axis positions: inner-right (default), inner-center, inner-left, outer-right, outer-center, outer-left
         * Valid vertical axis positions: inner-top, inner-middle, inner-bottom, outer-top, outer-middle, outer-bottom
         */
        label?: string | {
            /** The label text to show. */
            text: string;
            /** The position of the label. */
            position: 'inner-right' | 'inner-center' | 'inner-left' | 'outer-right' | 'outer-center' | 'outer-left' | 'inner-top' | 'inner-middle' | 'inner-bottom' | 'outer-top' | 'outer-middle' | 'outer-bottom';
        };
        /**
         * Set max value of the axis.
         */
        max?: string | number | Date;
        /**
         * Set min value of the axis.
         */
        min?: string | number | Date;
        /**
         * Show the axis inside of the chart.
         */
        inner?: boolean;
    }
    interface XAxisConfiguration extends AxisConfiguration {
        /**
         * Set type of x axis.
         * Defaults to `"indexed"`.
         */
        type?: "timeseries" | "category" | "indexed";
        /**
         * Set how to treat the timezone of x values.
         * If `true` (default), treat x value as localtime. If `false`, convert to UTC internally.
         */
        localtime?: boolean;
        /**
         * Set category names on category axis.
         * This must be an array that includes category names in string. If category names are included in the date by `data.x` option, this is not required.
         */
        categories?: string[];
        tick?: XTickConfiguration;
        /**
         * Set height of x axis.
         * The height of x axis can be set manually by this option. If you need more space for x axis, please use this option for that. The unit is pixel.
         */
        height?: number;
        /**
         * Set default extent for subchart and zoom. This can be an array or function that returns an array.
         */
        extent?: number[] | (() => number[]);
        selection?: any;
    }
    interface YAxisConfiguration extends AxisConfiguration {
        /**
         * Change the direction of y axis.
         * If true set, the direction will be from the top to the bottom.
         */
        inverted?: boolean;
        /**
         * Set center value of y axis.
         */
        center?: number;
        tick?: YTickConfiguration;
        /**
         * Set default range of y axis. This option set the default value for y axis when there is no data on init.
         */
        default?: [number, number];
        max?: number;
        min?: number;
    }
    interface YAxisConfigurationWithTime extends YAxisConfiguration {
        tick?: YTickConfigurationWithTime;
        type?: any;
    }
    interface TickConfiguration {
        /**
         * Show x axis outer tick.
         */
        outer?: boolean;
        /**
         * Set the x values of ticks manually.
         * If this option is provided, the position of the ticks will be determined based on those values. This option works with timeseries data and the x values will be parsed accoding to the type
         * of the value and data.xFormat option.
         */
        values?: number[] | string[];
        /**
         * Rotate x axis tick text. If you set negative value, it will rotate to opposite direction.
         */
        rotate?: number;
        /**
         * The number of x axis ticks to show.
         * This option hides tick lines together with tick text. If this option is used on timeseries axis, the ticks position will be determined precisely and not nicely positioned (e.g. it will
         * have rough second value).
         */
        count?: number;
    }
    interface XTickConfiguration extends TickConfiguration {
        /**
         * A function to format x-axis tick values. A format string is also supported for timeseries data.
         */
        format?: string | ((x: number | Date) => string | number);
        /**
         * Centerise ticks on category axis
         */
        centered?: boolean;
        /**
         * Setting for culling ticks.
         * If `true` is set, the ticks will be culled, then only limitted tick text will be shown.
         * This option does not hide the tick lines. If `false` is set, all of ticks will be shown.
         */
        culling?: boolean | {
            /**
             * The number of tick texts will be adjusted to less than this value.
             */
            max: number;
        };
        /**
         * Fit x axis ticks.
         * If `true` set, the ticks will be positioned nicely. If `false` set, the ticks will be positioned
         * according to x value of the data points.
         */
        fit?: boolean;
        /**
         * Set width of x axis tick.
         */
        width?: number;
        multiline?: boolean;
        multilineMax?: number;
    }
    interface YTickConfiguration extends TickConfiguration {
        /**
         * A function to format y-axis tick values.
         */
        format?: (x: number) => string | number;
    }
    interface YTickConfigurationWithTime extends YTickConfiguration {
        time?: {
            type?: any;
            interval?: any;
        };
    }
    interface GridOptions {
        x?: AxisGridOptions;
        y?: AxisGridOptions;
        focus?: {
            show?: boolean;
        };
        lines?: {
            front?: boolean;
        };
    }
    interface AxisGridOptions {
        /**
         * Show grids along an axis.
         */
        show?: boolean;
        /**
         * Show additional grid lines along x axis.
         * If x axis is `category` axis, value can be category name. If x axis is `timeseries` axis, value can be date string, `Date` object and unixtime integer.
         */
        lines?: GridLineOptions[];
        /** Not used. */
        type?: string;
    }
    interface GridLineOptions {
        /** Value to place the grid line at. */
        value: string | number | Date;
        text?: string;
        position?: "start" | "end" | "middle";
        /** Class to give the grid line for styling. */
        class?: string;
    }
    interface GridLineOptionsWithAxis extends GridLineOptions {
        axis?: AxisName;
    }
    interface RegionOptions {
        /**
         * The axis on which `start` and `end` values lie.
         */
        axis?: AxisName;
        /**
         * The point on the axis at which to start the region. If not provided, will
         * use the start edge of the axis.
         */
        start?: string | number | Date;
        /**
         * The point on the axis at which to end the region. If not provided, will
         * use the end edge of the axis.
         */
        end?: string | number | Date;
        /**
         * An optional class to apply to the region, which can be used for styling
         * or targeting.
         */
        class?: string;
        /**
         * Control the opacity of the region area.
         */
        opacity?: number;
        /**
         * If `'dashed'`, renders the line as dashed in this range instead of showing a region block.
         */
        style?: "dashed";
    }
    interface LegendOptions {
        /**
         * Show or hide legend.
         * Defaults to `true`.
         */
        show?: boolean;
        /**
         * Hide legend
         * If true given, all legend will be hidden. If string or array given, only the legend that has the id will be hidden.
         * Defaults to `false`.
         */
        hide?: boolean | ArrayOrString;
        /**
         * Change the position of legend.
         */
        position?: "bottom" | "right" | "inset";
        /**
         * Change inset legend attributes. Ignored unless `legend.position` is `"inset"`.
         */
        inset?: {
            /**
             * Decides the position of the legend.
             * Defaults to `"top-left"`.
             */
            anchor?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
            /**
             * Set the horizontal position of the legend based on the anchor.
             * Defaults to `10`.
             */
            x?: number;
            /**
             * Set the vertical position of the legend based on the anchor.
             * Defaults to `0`.
             */
            y?: number;
            /**
             * Defines the max step the legend has (e.g. If `step=2` and legend has 3 items, the legend has 2 columns).
             */
            step?: number;
        };
        /**
         * Padding between legend elements.
         * Defaults to `0`.
         */
        padding?: number;
        item?: {
            /**
             * Set click event handler to the legend item.
             * @param id The ID of the legend item.
             */
            onclick?(this: ChartInternal, id: string): void;
            /**
             * Set mouseover event handler to the legend item.
             * @param id The ID of the legend item.
             */
            onmouseover?(this: ChartInternal, id: string): void;
            /**
             * Set mouseout event handler to the legend item.
             * @param id The ID of the legend item.
             */
            onmouseout?(this: ChartInternal, id: string): void;
            /**
             * Tile settings for legend color display.
             */
            tile?: {
                /**
                 * Tile width.
                 * Defaults to `10`.
                 */
                width?: number;
                /**
                 * Tile height.
                 * Defaults to `10`.
                 */
                height?: number;
            };
        };
        /**
         * Defaults to `false`.
         */
        equally?: boolean;
    }
    interface TooltipOptions {
        /**
         * Show or hide tooltip.
         * Defaults to `true`.
         */
        show?: boolean;
        /**
         * Set if tooltip is grouped or not for the data points.
         * Defaults to `true`.
         */
        grouped?: boolean;
        format?: {
            /**
             * Set format for the title of tooltip.
             * @param x Value of the data point to show.
             * @param index Index of the data point to show.
             */
            title?(x: Primitive, index: number): string;
            /**
             * Set format for the name of each data in tooltip.
             * @param ratio Will be `undefined` if the chart is not donut/pie/gauge.
             */
            name?(name: string, ratio: number | undefined, id: string, index: number): string;
            /**
             * Set format for the value of each data in tooltip.
             * @param ratio Will be `undefined` if the chart is not donut/pie/gauge.
             * @returns If `undefined` returned, the row of that value will be skipped.
             */
            value?(value: Primitive, ratio: number | undefined, id: string, index: number): string | undefined;
        };
        /** Show the tooltips based on the horizontal position of the mouse. */
        horizontal?: boolean;
        /**
         * Set custom position for the tooltip. This option can be used to modify the tooltip position by returning object that has top and left.
         */
        position?(this: ChartInternal, data: Primitive, width: number, height: number, element: SVGElement): {
            top: number;
            left: number;
        };
        /**
         * Set custom HTML for the tooltip.
         * @param data If `tooltip.grouped` is true, data includes multiple data points.
         */
        contents?(this: ChartInternal, data: DataPoint[], defaultTitleFormat: (...args: any[]) => any, defaultValueFormat: (...args: any[]) => any, color: (...args: any[]) => any): string;
        /**
         * Set tooltip values order.
         */
        order?: "desc" | "asc" | any[] | ((data1: any, data2: any) => number) | null;
        init?: {
            show?: boolean;
            x?: number;
            position?: {
                /** Defaults to `"0px"`. */
                top?: string;
                /** Defaults to `"50px"`. */
                left?: string;
            };
        };
    }
    interface SubchartOptions {
        /**
         * Show sub chart on the bottom of the chart.
         * Defaults to `false`.
         */
        show?: boolean;
        size?: {
            /**
             * Change the height of the subchart.
             */
            height: number;
        };
        axis?: {
            x?: {
                show: boolean;
            };
        };
        /**
         * Set callback for brush event.
         * Specified function receives the current zoomed x domain.
         */
        onbrush?(this: ChartAPI, domain: Domain): void;
    }
    interface ZoomOptions {
        /**
         * Enable zooming.
         */
        enabled?: boolean;
        /**
         * Set interaction type for zooming
         */
        type?: 'scroll' | 'drag';
        /**
         * Enable to rescale after zooming. If true set, y domain will be updated according to the zoomed region.
         */
        rescale?: boolean;
        /**
         * Set callback that is called when the chart is zooming. Specified function receives the zoomed domain.
         */
        onzoom?(this: ChartAPI, domain: Domain): void;
        /**
         * Set callback that is called when zooming starts. Specified function receives the zoom event.
         */
        onzoomstart?(this: ChartAPI, event: Event): void;
        /**
         * Set callback that is called when zooming ends. Specified function receives the zoomed domain.
         */
        onzoomend?(this: ChartAPI, domain: Domain): void;
        /**
         * Set the initial minimum and maximum x-axis zoom values.
         */
        initialRange?: Domain;
        /**
         * Disable the default animation of zoom. This option is useful when you want to get the zoomed domain by `onzoom` or `onzoomend` handlers and override the default animation behavior.
         * @see https://github.com/c3js/c3/pull/2439 for details.
         */
        disableDefaultBehavior?: boolean;
        priveleged?: boolean;
        x?: {
            min?: number;
            max?: number;
        };
        /**
         * Change zoom extent.
         * **Experimental.**
         */
        extent?: [number, number];
    }
    interface PointOptions {
        /**
         * Whether to show each point in line.
         * Defaults to `true`.
         */
        show?: boolean;
        /**
         * The radius size of each point.
         * Defaults to `2.5`. If it's a function, will call for each point.
         */
        r?: number | ((this: ChartInternal, d: DataPoint) => number);
        /**
         * How sensitive is each point to mouse cursor hover.
         * Defaults to `10`.
         */
        sensitivity?: number;
        focus?: {
            expand: {
                /**
                 * Whether to expand each point on focus.
                 */
                enabled?: boolean;
                /**
                 * The radius size of each point on focus.
                 */
                r?: number;
            };
        };
        select?: {
            /**
             * The radius size of each point on selected.
             */
            r?: number;
        };
    }
    interface LineOptions {
        /**
         * Set if null data point will be connected or not.
         * If `true` set, the region of null data will be connected without any data point.
         * If `false` set, the region of null data will not be connected and get empty.
         */
        connectNull?: boolean;
        step?: {
            /**
             * Change step type for step chart.
             * Defaults to `"step"`.
             */
            type: "step" | "step-before" | "step-after";
        };
    }
    interface ShowHideOptions {
        /** Controls whether the legend will be shown or hidden along with the data. */
        withLegend?: boolean;
    }
    interface ChartAPI {
        /**
         * This API highlights specified targets and fade out the others.
         * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be highlighted.
         */
        focus(targetIds?: ArrayOrString): void;
        /**
         * This API fades out specified targets and reverts the others.
         * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be faded out.
         */
        defocus(targetIds?: ArrayOrString): void;
        /**
         * This API reverts specified targets.
         * You can specify multiple targets by giving an array that includes id as String. If no argument is given, all of targets will be reverted.
         */
        revert(targetIds?: ArrayOrString): void;
        /**
         * This API shows specified targets.
         * @param targetIds You can specify multiple data sets by giving an array of ID strings. If no argument is given, all of data will be shown.
         * @param options Options object.
         */
        show(targetIds?: ArrayOrString, options?: ShowHideOptions): void;
        /**
         * This API hides specified targets.
         * @param targetIds You can specify multiple data sets by giving an array of ID strings. If no argument is given, all of data will be hidden.
         * @param options Options object.
         */
        hide(targetIds?: ArrayOrString, options?: ShowHideOptions): void;
        /**
         * This API toggles (shows or hides) specified targets.
         * @param targetIds You can specify multiple data sets by giving an array of ID strings. If no argument is given, all of data will be toggled.
         * @param options Options object.
         */
        toggle(targetIds?: ArrayOrString, options?: ShowHideOptions): void;
        /**
         * Load data to the chart.
         * NOTE: unload should be used if some data needs to be unloaded simultaneously. If you call unload API soon after/before load instead of unload param, chart will not be rendered properly
         * because of cancel of animation.
         * NOTE: done will be called after data loaded, but it's not after rendering. It's because rendering will finish after some transition and there is some time lag between loading and rendering.
         */
        load(args: {
            /** Data to load. */
            data?: Data;
            /** API url to load data from. If `data` is provided this will be ignored. */
            url?: string;
            /**
             * An object to convert to data to load. Can be in the column form
             * (`{key1: [val1, val2, ...]; ...}`) or in the row form (`[{key1: val1; key2: val2}, ...]`).
             * If `data` or `url` are provided this will be ignored.
             */
            json?: Record<string, PrimitiveArray> | Array<Record<string, Primitive>>;
            /** If json is provided and is in row form, these keys are used to pull the data from each row. */
            keys?: {
                /** This is the key for the x-value in each row. */
                x?: string;
                /** List of remaining keys (besides the x key) to pull data for. */
                value: string[];
            };
            /** A list of rows, where the first row is the column names and the remaining rows are data.  If `data`, `url`, or `json` are provided this will be ignored.  */
            rows?: PrimitiveArray[];
            /** A list of columns, where the first element in each column is the ID and the remaining elements are data. If `data`, `url`, `json`, or 'rows' are provided, this will be ignored. */
            columns?: PrimitiveArray[];
            /** Match x columns to the corresponding data columns. */
            xs?: Record<string, string>;
            /** Match loaded data IDs with display names. */
            names?: Record<string, string>;
            /** If classes given, the classes specifed by `data.classes` will be updated. Keys should be data IDs and values should be classes to assign. */
            classes?: Record<string, string>;
            /** Array of arrays of data IDs. IDs that share a sub-array will be categorized together. */
            categories?: string[][];
            /** Match data IDs to their axes. */
            axes?: Record<string, AxisName>;
            /** Match data IDs to the colors to render that data as. */
            colors?: Record<string, string>;
            /** Select the plot type for the loaded data. */
            type?: string;
            /** Select the plot types for each individual data by ID. */
            types?: Record<string, string>;
            /** ID of data to remove, or list of IDs of data to remove, or `true` to remove all data. */
            unload?: true | ArrayOrString;
            /** Called when loading completes. */
            done?(): void;
        }): void;
        /**
         * Unload data from the chart.
         * @param args If given, will unload the data with the ids that match the string, the array of strings, or the `ids` argument of the object. If not given, will unload all data.
         * NOTE: If you call load API soon after/before unload, unload param of load should be used. Otherwise chart will not be rendered properly because of cancel of animation.
         */
        unload(args?: ArrayOrString | {
            ids?: ArrayOrString;
            /** Called after data is loaded, but not after rendering. This is because rendering will finish after some transition and there is some time lag between loading and rendering. */
            done?: () => void;
        }): void;
        /**
         * Flow data to the chart. By this API, you can append new data points to the chart.
         * If data that has the same target id is given, the chart will be appended. Otherwise, new target will be added.
         * @param args The arguments object for this method.
         */
        flow(args: {
            /** An object to convert to data to load. Can be in the column form `{key1: [val1, val2, ...]; ...}` or in the row form `[{key1: val1; key2: val2}, ...]`. */
            json?: Record<string, PrimitiveArray> | Array<Record<string, Primitive>>;
            /** If json is provided and is in row form, these keys are used to pull the data from each row. */
            keys?: {
                /** This is the key for the x-value in each row. */
                x?: string;
                /** List of remaining keys (besides the x key) to pull data for. */
                value: string[];
            };
            /** A list of rows, where the first row is the column names and the remaining rows are data. If this is provided and `json` is provided, this is ignored. */
            rows?: PrimitiveArray[];
            /** A list of columns, where the first element in each column is the ID and the remaining elements are data. If `json` or `rows` are provided, this will be ignored. */
            columns?: PrimitiveArray[];
            /** If given, the lower x edge will move to that point. If not given, the lower x edge will move by the number of given data points. */
            to?: string | number;
            /** If given, the lower x edge will move by the number of this argument. */
            length?: number;
            /** If given, the duration of the transition will be specified value. If not given, `transition.duration` will be used as default. */
            duration?: number;
            /** Will be called when the flow ends. */
            done?(): void;
        }): void;
        /**
         * Change data point state to selected. By this API, you can select data points. To use this API, `data.selection.enabled` needs to be `true`.
         * @param ids Specify target ids to be selected. If this argument is not given, all targets will be the candidate.
         * @param indices Specify indices to be selected. If this argument is not given, all data points will be the candidate.
         * @param resetOther If this argument is set true, the data points that are not specified by ids, indices will be unselected.
         */
        select(ids?: string[], indices?: number[], resetOther?: boolean): void;
        /**
         * Change data point state to unselected. By this API, you can unselect data points. To use this API, `data.selection.enabled` needs to be `true`.
         * @param ids Specify target ids to be unselected. If this argument is not given, all targets will be the candidate.
         * @param indices Specify indices to be unselected. If this argument is not given, all data points will be the candidate.
         */
        unselect(ids?: string[], indices?: number[]): void;
        /**
         * Get selected data points. By this API, you can get selected data points information. To use this API, `data.selection.enabled` needs to be `true`.
         * @param targetId You can filter the result by giving target id that you want to get. If not given, all of data points will be returned.
         */
        selected(targetId?: string): Data;
        /**
         * Change the type of the chart.
         * @param type Specify the type to be transformed. The types listed in data.type can be used.
         * @param targetIds Specify target data IDs to be transformed. If not given, all targets will be the candidate.
         */
        transform(type: ChartType, targetIds?: ArrayOrString): void;
        /**
         * Update groups for the targets.
         * @param groups An array of groups, each with an array of data IDs defining members of the groups.
         */
        groups(): string[][];
        groups<T extends string[][]>(groups?: T): T;
        xgrids: GridOperations;
        ygrids: GridOperations;
        regions: {
            /**
             * Either get the regions or override the regions.
             * @param regions Regions will be replaced with this argument.
             * @returns The regions on the plot, after running this function.
             */
            (): RegionOptions[];
            <T extends RegionOptions[]>(regions: T): T;
            /**
             * Add new region. This API adds new region instead of replacing.
             * @param grids New region or regions to be added.
             * @returns The regions on the plot, after running this function.
             */
            add(regions?: ArrayOrSingle<RegionOptions>): RegionOptions[];
            /**
             * Remove regions from the chart.
             * @param args Arguments object. If not provided, removes all regions.
             * @returns The regions on the plot, after running this function.
             */
            remove(args?: {
                /** If provided, removes the regions that have all of the specified classes. Otherwise removes all regions. */
                classes?: string[];
                /** Transition duration for fade out. */
                duration?: number;
            }): RegionOptions[];
        };
        data: {
            /**
             * Get data loaded in the chart.
             * @param targetIds If this argument is given, this API returns the specified target data. If this argument is not given, all of data will be returned.
             */
            (targetIds?: ArrayOrString): DataSeries[];
            /**
             * Get data shown in the chart.
             * @param targetIds If this argument is given, this API filters the data with specified target ids. If this argument is not given, all shown data will be returned.
             */
            shown(targetIds?: ArrayOrString): DataSeries[];
            /**
             * Get values of the data loaded in the chart.
             * @param targetIds This API returns the values of specified target. If this argument is not given, null will be retruned.
             */
            values(targetIds?: ArrayOrString): number[] | null;
            /**
             * Set names of the data loaded in the chart.
             * @param names This is a map of current names to new names.
             * @returns Map of the old names to the new names. Only includes the names that were changed.
             */
            names(): {};
            names<T extends {
                [key: string]: string;
            }>(names: T): T;
            /**
             * Get and set colors of the data loaded in the chart.
             * @param colors If this argument is given, the colors of data will be updated. If not given, the current colors will be returned. The format of this argument is the same as data.colors.
             * @returns A map of all data IDs to their current colors.
             */
            colors(colors?: {
                [key: string]: string;
            }): {
                [key: string]: string;
            };
            /**
             * Get and set axes of the data loaded in the chart.
             * @param axes If this argument is given, the axes of data will be updated. This is a map of data IDs to their new axes' names.
             * @returns Map of the changed data IDs to their new axes' names.
             */
            axes(): {};
            axes<T extends {
                [key: string]: AxisName;
            }>(axes: T): T;
        };
        /**
         * Get and/or set the value of a category.
         * @param i Index of the category to get or set.
         * @param category: Value to update the category to. If not provided, no change will be made.
         * @returns The value of the category after updating.
         */
        category(i: number): string;
        category<T extends string>(i: number, category: T): T;
        /**
         * Get and/or set the categories.
         * @param categories: Value of the categories to update. If provided, will overwrite all categories. If not provided, no change will be made.
         * @returns The list of categories after updating.
         */
        categories(): string[];
        categories<T extends string[]>(categories: T): T;
        /**
         * Get the color for the specified id.
         * @returns The color that the data series with the specified id has on the chart.
         */
        color(id: string): string;
        /**
         * Get and set x values for the chart. Same as `xs` method.
         * @param x If given, x values of every target will be updated.
         * @returns A map of data IDs to their x IDs after running this function.
         */
        x(x?: {
            [key: string]: PrimitiveArray;
        }): {
            [key: string]: PrimitiveArray;
        };
        /**
         * Get and set x values for the chart. Same as `x` method.
         * @param x If given, x values of every target will be updated.
         * @returns A map of data IDs to their x IDs after running this function.
         */
        xs(xs?: {
            [key: string]: PrimitiveArray;
        }): {
            [key: string]: PrimitiveArray;
        };
        axis: {
            (): void;
            /**
             * Get and set axis labels.
             * @param labels If labels is given, specified axis' label will be updated.
             */
            labels(labels?: {
                [key in AxisName]?: string;
            }): void;
            /**
             * Get and set axis min value.
             * @param min If an object is given, specified axis' min value will be updated. If a number is given, the min values for y and y2 will be updated.
             * @returns If `min` is *not* given, the current max values for each axis will be returned. Otherwise returns nothing.
             */
            min(): {
                [key in AxisName]: number;
            };
            min(min: number | {
                [key in AxisName]?: number;
            }): void;
            /**
             * Get and set axis max value.
             * @param max If an object is given, specified axis' max value will be updated. If a number is given, the max values for y and y2 will be updated.
             * @returns If `max` is *not* given, the current max values for each axis will be returned. Otherwise returns nothing.
             */
            max(): {
                [key in AxisName]: number;
            };
            max(max: number | {
                [key in AxisName]?: number;
            }): void;
            /**
             * Get and set axis min and max values.
             * @param range If range is given, specified axis' min and max value will be updated.
             * @returns If `range` is *not* given, returns the current min and max values for each axis.
             */
            range(): {
                min: {
                    [key in AxisName]: number;
                };
                max: {
                    [key in AxisName]: number;
                };
            };
            range(range: {
                min?: number | {
                    [key in AxisName]?: number;
                };
                max?: number | {
                    [key in AxisName]?: number;
                };
            }): void;
        };
        legend: {
            (): void;
            /**
             * Show legend for each target.
             * @param targetIds If targetIds is given, specified target's legend will be shown. If only one target is the candidate, String can be passed. If no argument is given, all of target's
             * legend will be shown.
             */
            show(targetIds?: ArrayOrString): void;
            /**
             * Hide legend for each target.
             * @param targetIds If targetIds is given, specified target's legend will be hidden. If only one target is the candidate, String can be passed. If no argument is given, all of target's
             * legend will be hidden.
             */
            hide(targetIds?: ArrayOrString): void;
        };
        zoom: {
            /**
             * Zoom by giving x domain.
             * @param domain If given, the chart will be zoomed to the given domain.
             * @returns `domain`, if given; otherwise the current zoom range of the chart.
             */
            (domain?: number[]): number[];
            /**
             * Enable and disable zooming.
             * @param enabled If enabled is `true`, the feature of zooming will be enabled. If `false` is given, it will be disabled.
             */
            enable(enabled: boolean): void;
            /**
             * Set or get the maximum x value of the chart for zooming.
             * @param max The new maximum zoom value.
             * @returns If `max` is _not_ given, will return the existing zoom value.
             *
             */
            max(): number;
            max(max: number): void;
            /**
             * Set or get the minimum x value of the chart for zooming.
             * @param min The new minimum zoom value.
             * @returns If `min` is _not_ given, will return the existing zoom value.
             *
             */
            min(): number;
            min(min: number): void;
            /**
             * Set or get both the max and min zoom values at the same time.
             * @param range An object with max and/or min values.
             * @returns If `range` is _not_ given, returns an object with current max and min zoom values.
             */
            range(): {
                max: number;
                min: number;
            };
            range(range: {
                max?: number;
                min?: number;
            }): void;
        };
        /**
         * Unzoom to the original domain.
         */
        unzoom(): void;
        /**
         * Resize the chart. If no size is specified it will resize to fit.
         * @param size This argument should include width and height in pixels.
         */
        resize(size?: {
            width?: number;
            height?: number;
        }): void;
        /**
         * Force to redraw.
         */
        flush(): void;
        /**
         * Reset the chart object and remove element and events completely.
         */
        destroy(): null;
        tooltip: {
            (): void;
            show(args: {
                mouse: any;
                data?: {
                    targets: DataSeries[];
                };
                id?: string;
                x?: number;
            }): void;
            hide(): void;
        };
        internal: ChartInternal;
    }
    interface ChartInternal {
        /** Access the external Chart API. */
        api: ChartAPI;
        [key: string]: any;
    }
    interface DataSeries {
        id?: string;
        id_org?: string;
        values: DataPoint[];
    }
    interface DataPoint {
        x: number;
        value: number;
        id: string;
        index: number;
    }
    interface RedrawOptions {
        [key: string]: boolean;
    }
    interface UpdateAndRedrawOptions {
        [key: string]: boolean;
    }
    interface GridOperations {
        /**
         * Update the grid lines.
         * @param grids Grid lines will be replaced with this argument.
         */
        (): GridLineOptionsWithAxis[];
        <T extends GridLineOptionsWithAxis[]>(grids: T): T;
        /**
         * Add grid lines. This API adds new grid lines instead of replacing.
         * @param grids New grid lines will be added. It's possible to give an Object if only one line will be added.
         */
        add(grids: ArrayOrSingle<GridLineOptionsWithAxis>): GridLineOptionsWithAxis[];
        /**
         * Remove grid lines.
         * @param params Specifies which grid line to remove. If not given, all of x/y grid lines will be removed. If empty, none will be removed
         */
        remove(params?: {
            /** If provided, will remove all gridlines with this class. */
            class?: string;
            /** If provided, will remove all gridlines at this value. */
            value?: number | string;
        }): void;
    }
}
interface XCGetAllUsers extends IRestParam {
    details: any;
}
interface XCGetUser extends IRestParam {
}
interface XCGetUserAudit extends IRestParam {
    startAt?: number;
    maxResults?: number;
}
interface XCGetUserProjects extends IRestParam {
}
interface XCCheckUserPassword extends IRestParam {
    password: string;
}
interface XCPostLogin extends IRestParam {
    password: string;
}
interface XCPostLogout extends IRestParam {
}
interface XCPostAddUser extends IRestParam {
    login: string;
    email: string;
    password: string;
    first?: string;
    last?: string;
    json: any;
}
interface XCPostAddUserProject extends IRestParam {
    permission: number;
}
interface XCPostAddUserSetting extends IRestParam {
    key: string;
    value: string;
}
interface XCPostAddUserToken extends IRestParam {
    value?: string;
    purpose: string;
    reason?: string;
    validity?: number;
}
interface XCPostResetPassword extends IRestParam {
    token: string;
    password: string;
    signature_password?: string;
}
interface XCPostCheckUserPassword extends IRestParam {
    password: string;
}
interface XCPutUser extends IRestParam {
    email: string;
    password: string;
    first?: string;
    last?: string;
    json: string;
}
interface XCPutUserProject extends IRestParam {
    permission: number;
}
interface XCPutUserStatus extends IRestParam {
    status: any;
}
interface XCPutUserRename extends IRestParam {
    newLogin: string;
}
interface XCDeleteUser extends IRestParam {
    confirm: string;
}
interface XCDeleteUserToken extends IRestParam {
    value: string;
}
interface XCGetAllGroups extends IRestParam {
    details?: number;
}
interface XCGetGroup extends IRestParam {
    details?: number;
}
interface XCPostAddGroup extends IRestParam {
}
interface XCPostAddGroupToProject extends IRestParam {
    permission?: number;
}
interface XCPutUserInGroup extends IRestParam {
}
interface XCPutAllUserInGroup extends IRestParam {
    IGNORE0?: any;
}
interface XCPutGroupRename extends IRestParam {
    newName: any;
}
interface XCDeleteGroup extends IRestParam {
    confirm: string;
}
interface XCDeleteUserFromGroup extends IRestParam {
}
interface XCGetStartupInfo extends IRestParam {
    adminUI?: number;
}
interface XCGetProjectInfo extends IRestParam {
    adminUI?: number;
}
interface XCGetCalendar extends IRestParam {
}
interface XCGetCategoryList extends IRestParam {
}
interface XCGetProjectSetting extends IRestParam {
}
interface XCGetProjectSettingAll extends IRestParam {
}
interface XCGetSchema extends IRestParam {
    simple?: number;
    excludeCategories?: string;
}
interface XCGetConfigCheck extends IRestParam {
    excludeCategories?: string;
}
interface XCGetStatus extends IRestParam {
}
interface XCGetTags extends IRestParam {
}
interface XCGetTodos extends IRestParam {
    itemRef?: string;
    includeDone?: number;
    includeAllUsers?: number;
    includeFuture?: number;
}
interface XCGetTodosAllProjects extends IRestParam {
    includeDone?: number;
    includeFuture?: number;
}
interface XCGetJobStatus extends IRestParam {
}
interface XCGetJobFile extends IRestParam {
    mode?: string;
    format?: string;
}
interface XCGetCategoryDetail extends IRestParam {
    filter?: string;
}
interface XCGetFullTree extends IRestParam {
    fancy?: string;
    filter?: string;
    atDate?: string;
}
interface XCGetNeedle extends IRestParam {
    search: string;
    id: string;
    filter?: string;
    fieldsOut?: string;
    labels?: number;
    treeOrder?: number;
    links?: string;
}
interface XCGetNeedleAllProjects extends IRestParam {
    search: string;
    id: string;
    filter?: string;
    fieldsOut?: string;
    labels?: number;
    links?: string;
}
interface XCGetMonitor extends IRestParam {
}
interface XCGetReports extends IRestParam {
}
interface XCGetDate extends IRestParam {
    date?: string;
    dateformat?: string;
    timeformat?: string;
}
interface XCGetTimeZones extends IRestParam {
}
interface XCGetAllFile extends IRestParam {
}
interface XCGetAllFileCustomer extends IRestParam {
}
interface XCGetAllJob extends IRestParam {
}
interface XCGetOneCustomerFile extends IRestParam {
    key: string;
}
interface XCGetOneFile extends IRestParam {
    key: string;
}
interface XCGetItemDetail extends IRestParam {
    history?: number;
    filter?: string;
    atDate?: string;
}
interface XCGetFolderDetail extends IRestParam {
    history?: number;
    filter?: string;
    children?: string;
    atDate?: string;
}
interface XCGetItemList extends IRestParam {
}
interface XCGetField extends IRestParam {
    field: string;
    format?: string;
    download?: number;
}
interface XCGetProjectAudit extends IRestParam {
    startAt?: number;
    maxResults?: number;
    deleteOnly?: string;
    tech?: string;
    auditIdMin?: number;
    auditIdMax?: number;
    noReport?: number;
    noImport?: number;
    include?: string;
    resolveRef?: number;
    itemRef?: string;
}
interface XCGetProjectAccess extends IRestParam {
}
interface XCGetCategorySetting extends IRestParam {
}
interface XCGetExport extends IRestParam {
    itemList: string;
}
interface XCGetLicense extends IRestParam {
}
interface XCGetMergeInfo extends IRestParam {
    excludeCategories?: string;
}
interface XCGetMergeHistory extends IRestParam {
}
interface XCGetOpenApi extends IRestParam {
}
interface XCPostCreateProject extends IRestParam {
    label: string;
    shortLabel: string;
    overwrite?: string;
    importUsers?: string;
    branchLabel?: string;
    branchTag?: string;
    branchComment?: string;
    branchBaseProjectLabel?: string;
}
interface XCPostCloneProject extends IRestParam {
    label: string;
    shortLabel: string;
    keepHistory: number;
    keepContent: number;
    keepPermissions: number;
}
interface XCPostImportItems extends IRestParam {
    reason: string;
}
interface XCPostAddCategory extends IRestParam {
    label: string;
    shortLabel: string;
    reason: string;
}
interface XCPostAddField extends IRestParam {
    label: string;
    category: string;
    fieldType: string;
    fieldParam: string;
    reason: string;
}
interface XCPostAddTag extends IRestParam {
    label: string;
    auditId: number;
    type: string;
    comments: string;
}
interface XCPostWebHook extends IRestParam {
}
interface XCPostCopyItemOrFolder extends IRestParam {
    targetFolder: string;
    targetProject?: string;
    copyLabels?: number;
    map?: string;
    reason: string;
}
interface XCPostAddItem extends IRestParam {
    title: string;
    folder: string;
    IGNORE2?: any;
    labels?: string;
    author?: string;
    reason: string;
    linksUp: string;
    linksDown: string;
}
interface XCPostSendMail extends IRestParam {
    to: string[];
    cc: string[];
    subject: string;
    htmlbody: string;
    textbody: string;
    system?: number;
}
interface XCPostCreateServiceDesk extends IRestParam {
    summary: string;
    description: string;
    matrixProject: string;
    matrixItem: string;
    browser: string;
    log: string;
}
interface XCPostAddLink extends IRestParam {
    reason: string;
}
interface XCPostAddFolder extends IRestParam {
    parent: string;
    label: string;
    reason: string;
    fxField?: string;
}
interface XCPostAddProjectSetting extends IRestParam {
    key: string;
    value: string;
}
interface XCPostAddCustomerSetting extends IRestParam {
    key: string;
    value: string;
}
interface XCPostLog extends IRestParam {
    message: string;
}
interface XCPostAddCustomerFile extends IRestParam {
}
interface XCPostAddFile extends IRestParam {
    url?: string;
}
interface XCPostConvertExcelFile extends IRestParam {
}
interface XCPostLaunchReport extends IRestParam {
    itemList?: string;
    url?: string;
    resturl?: string;
    format?: string;
    isSignedReport: string;
    includeSignatures: string;
    newTitle: string;
    copyFields: string;
    filter?: string;
    useOld?: number;
    atDate?: string;
}
interface XCPostLaunchSignedReport extends IRestParam {
    url?: string;
    resturl?: string;
    format?: string;
}
interface XCPostMoveItems extends IRestParam {
    items?: string;
    reason: string;
}
interface XCPostCreateTodo extends IRestParam {
    fieldId?: number;
    logins?: string;
    text: string;
    todoType?: string;
    atDate?: string;
    auto?: number;
}
interface XCPostRestoreItem extends IRestParam {
    at?: number;
    reason: string;
}
interface XCPostHook extends IRestParam {
    hook: string;
}
interface XCPostAddCategorySetting extends IRestParam {
    key: string;
    value: string;
}
interface XCPostSignItem extends IRestParam {
    password: string;
}
interface XCPostPublishItem extends IRestParam {
    reason: string;
    trainingFor?: string;
}
interface XCPostExecuteXtc extends IRestParam {
    IGNORE0?: any;
}
interface XCPostCompareSign extends IRestParam {
}
interface XCPostConvertWord extends IRestParam {
    fileNo?: number;
    targetDocumentFolder?: string;
    useAsField?: number;
    reason: string;
}
interface XCPostCompareHtml extends IRestParam {
    arg?: string;
}
interface XCPostJobProgress extends IRestParam {
    progress: number;
    status?: string;
}
interface XCPostBranch extends IRestParam {
    label: string;
    shortLabel: string;
    history?: number;
    tag?: string;
}
interface XCPutEditItem extends IRestParam {
    title?: string;
    IGNORE1?: any;
    labels?: string;
    auditAction?: string;
    newFolder?: string;
    newPosition?: number;
    reason: string;
    filter?: string;
    linksUp?: string;
    linksDown?: string;
    currentVersion?: number;
    onlyThoseFields?: number;
    onlyThoseLabels?: number;
}
interface XCPutEditField extends IRestParam {
    field: number;
    label: string;
    fieldParam: string;
    order: number;
    reason: string;
}
interface XCPutTouchItems extends IRestParam {
    reason: string;
    nbLayers?: number;
}
interface XCPutEditCategory1 extends IRestParam {
    order: number;
    shortLabel: string;
    label: string;
    reason: string;
}
interface XCPutHideProject extends IRestParam {
    reason: string;
}
interface XCPutUnhideProject extends IRestParam {
    newShort: string;
    reason: string;
}
interface XCDeleteProject extends IRestParam {
    confirm: string;
}
interface XCDeleteItem extends IRestParam {
    confirm: string;
    reason: string;
}
interface XCDeleteLink extends IRestParam {
    reason: string;
}
interface XCDeleteCategory extends IRestParam {
    reason: string;
}
interface XCDeleteField extends IRestParam {
    field: number;
    reason: string;
}
interface XCDeleteTodo extends IRestParam {
}
declare type XRGetProject_StartupInfo_ListProjectAndSettings = XRListProjectAndSettings;
declare type XRGetProject_ProjectInfo_ProjectInfo = XRProjectInfo;
declare type XRGetProject_Calendar_CalendarTypeList = XRCalendarType[];
declare type XRGetProject_CategoryList_GetProjectStructAck = XRGetProjectStructAck;
declare type XRGetProject_ProjectSetting_GetProjectSettingAck = XRGetProjectSettingAck;
declare type XRGetProject_ProjectSettingAll_GetSettingAck = XRGetSettingAck;
declare type XRGetProject_getSchema = string;
declare type XRGetProject_getConfigCheck = string;
declare type XRGetProject_Status_ServerStatus = XRServerStatus;
declare type XRGetProject_Tags_TagList = XRTag[];
declare type XRGetProject_Todos_GetTodosAck = XRGetTodosAck;
declare type XRGetProject_TodosAllProjects_GetTodosAck = XRGetTodosAck;
declare type XRGetProject_JobStatus_JobsStatusWithUrl = XRJobsStatusWithUrl;
declare type XRGetProject_getJobFile = string;
declare type XRGetProject_CategoryDetail_CategoryFull = XRCategoryFull;
declare type XRGetProject_FullTree_FancyFolderList = XRFancyFolder[];
declare type XRGetProject_Needle_TrimNeedle = XRTrimNeedle;
declare type XRGetProject_GetNeedleAllProjects_TrimNeedle = XRTrimNeedle;
declare type XRGetProject_Monitor_GetMonitorAck = XRGetMonitorAck;
declare type XRGetProject_Reports_GetReportsAck = XRGetReportsAck;
declare type XRGetProject_Date_GetDateAck = XRGetDateAck;
declare type XRGetProject_TimeZones_StringList = string[];
declare type XRGetProject_AllFile_GetProjectFileListAck = XRGetProjectFileListAck;
declare type XRGetProject_GetAllFileCustomer_GetProjectFileListAck = XRGetProjectFileListAck;
declare type XRGetProject_AllJob_JobsWithUrl = XRJobsWithUrl;
declare type XRGetProject_getOneCustomerFile = string;
declare type XRGetProject_getOneFile = string;
declare type XRGetProject_ItemDetail_TrimItem = XRTrimItem;
declare type XRGetProject_FolderDetail_TrimFolder = XRTrimFolder;
declare type XRGetProject_ItemList_GetItemListAck = XRGetItemListAck;
declare type XRGetProject_getField = string;
declare type XRGetProject_ProjectAudit_TrimAuditList = XRTrimAuditList;
declare type XRGetProject_ProjectAccess_GetAccessAck = XRGetAccessAck;
declare type XRGetProject_CategorySetting_GetSettingAck = XRGetSettingAck;
declare type XRGetProject_Export_ExportItemsAck = XRExportItemsAck;
declare type XRGetProject_License_LicenseStatus = XRLicenseStatus;
declare type XRGetProject_MergeInfo_MergeInfoList = XRMergeInfo[];
declare type XRGetProject_MergeHistory_MergeHistoryList = XRMergeHistory[];
declare type XRGetProject_LabelHistory_LabelHistoryList = XRLabelHistory[];
declare type XRGetProject_getOpenApi = string;
interface XRListProjectAndSettings {
    currentUser: string;
    customerAdmin: number;
    superAdmin: number;
    dateInfo: XRGetDateAck;
    customerSettings: XRSettingType[];
    license: XRMatrixLicense;
    readWriteUsers: string[];
    allUsers: XRUserType[];
    licenseStatus: string;
    todoCounts: XRTodoCount[];
    allTodos: XRTodo[];
    currentUserSettings: XRSettingType[];
    branches: XRMainAndBranch[];
    serviceEmail: string;
    project: XRProjectType[];
    serverVersion: string;
    baseUrl: string;
    restUrl: string;
}
interface XRProjectInfo {
    userPermission: XRUserPermissionType[];
    groupPermission: XRGroupPermissionType[];
    categoryList: XRCategoryExtendedListType;
    label: string;
    shortLabel: string;
    acl: string;
    aclExplanations: string;
    settingList: XRSettingType[];
    categorySettingList: XRCategoryAndSettingListType[];
    pluginSettingsList: XRPluginSetting[];
    todos: XRTodo[];
}
interface XRCalendarType {
    dateString: string;
    auditIdMin: number;
    auditIdMax: number;
    nbChanges: number;
}
interface XRGetProjectStructAck {
    categoryList: XRCategoryExtendedListType;
    label: string;
    shortLabel: string;
    acl: string;
    aclExplanations: string;
}
interface XRGetProjectSettingAck {
    settingList: XRSettingType[];
    categorySettingList: XRCategoryAndSettingListType[];
    pluginSettingsList: XRPluginSetting[];
}
interface XRGetSettingAck {
    settingList: XRSettingType[];
}
interface XRServerStatus {
    exceptionStatus: XRExceptionStatus;
    version: string;
    publicUrl: string;
}
interface XRTag {
    id: number;
    auditId: number;
    auditTime: string;
    label: string;
    comments: string;
    tagType: string;
    tagCreation: string;
    userLogin: string;
    baseProjectId: number;
    baseProjectName: string;
    baseProjectTag: string;
    baseAuditCreation: string;
    baseAuditId: number;
}
interface XRGetTodosAck {
    todos: XRTodo[];
    todoCounts: XRTodoCount[];
}
interface XRJobsStatusWithUrl {
    progress: number;
    status: string;
    visibleName: string;
    jobFile: XRJobFileWithUrl[];
}
interface XRCategoryFull {
    project: XRProjectType;
    categ: XRCategoryType;
    folder: XRTrimFolder;
    fieldList: XRRestField[];
}
interface XRFancyFolder {
    children: (XRFancyFolder | XRFancyLeaf)[];
    icon: string;
    id: string;
    title: string;
    type: string;
    isUnselected: number;
    version: string;
}
interface XRTrimNeedle {
    startAt: number;
    maxResults: number;
    totalResults: number;
    searchId: string;
    needles: XRTrimNeedleItem[];
}
interface XRGetMonitorAck {
    reminderActions: XRMonitorAction[];
    firstLoginDate: string;
    lastLoginDate: string;
}
interface XRGetReportsAck {
    reportList: XRReportType[];
}
interface XRGetDateAck {
    dateIso8601: string;
    timeUserFormat: string;
    dateUserFormat: string;
    timeCustomerFormat: string;
    dateCustomerFormat: string;
    dateformat: string;
    timeformat: string;
    timeZone: string;
    timeZoneDesc: string;
    customerDateformat: string;
    customerTimeformat: string;
    customerTimezone: string;
    customerTimezoneDesc: string;
}
interface XRGetProjectFileListAck {
    projectFile: XRProjectFileType[];
}
interface XRJobsWithUrl {
    runningJobs: number;
    maxRunningJobs: number;
    jobs: XRJobWithUrl[];
}
interface XRTrimItem {
    title: string;
    itemRef: string;
    folderRef: string;
    upLinkList: XRTrimLink[];
    downLinkList: XRTrimLink[];
    fieldValList: XRFieldValListType;
    labels: string[];
    itemHistoryList: XRItemHistoryListType;
    maxVersion: number;
    disabled: number;
    isFolder: number;
    availableFormats: string[];
    itemId: number;
    modDate: string;
    modDateUserFormat: string;
    requireSubTree: XRCategoryAndRoot[];
    selectSubTree: XRCategoryAndRoot[];
    isUnselected: number;
    downloads: XRUserAndTime[];
    docHasPackage: boolean;
}
interface XRTrimFolder {
    itemRef: string;
    title: string;
    partial: number;
    itemList: XRTrimFolder[];
    fieldValList: XRFieldValListType;
    isFolder: number;
    isUnselected: number;
    itemHistoryList: XRItemHistoryListType;
    maxVersion: number;
    modDate: string;
    modDateUserFormat: string;
    itemId: number;
    disabled: number;
}
interface XRGetItemListAck {
    docDateCustomerFormat: string;
    docDate: string;
    items: XRItemSimpleType[];
}
interface XRTrimAuditList {
    startAt: number;
    maxResults: number;
    totalResults: number;
    audit: XRTrimAudit[];
}
interface XRGetAccessAck {
    userPermission: XRUserPermissionType[];
    groupPermission: XRGroupPermissionType[];
}
interface XRExportItemsAck {
    jobId: number;
}
interface XRLicenseStatus {
    modules: string[];
    maxUsers: number;
    currentRWUsers: number;
    licenseUsers: XRLicenseUser[];
}
interface XRMergeInfo {
    branchBase: XRMergeInfoPoint;
    branchNow: XRMergeInfoPoint;
    mainlineBase: XRMergeInfoPoint;
    mainlineNow: XRMergeInfoPoint;
    linksAdded: XRMergeItemLink[];
    linksDifferent: XRMergeItemLink[];
    linksDeleted: XRMergeItemLink[];
}
interface XRMergeHistory {
    entries: XRMergeEntry[];
}
interface XRLabelHistory {
    entries: XRLabelEntry[];
}
interface XRFancyLeaf {
    id: string;
    title: string;
    type: string;
    isUnselected: number;
    version: string;
}
interface XRSettingType {
    value: string;
    key: string;
    secret: boolean;
}
interface XRMatrixLicense {
    licenseVersion: number;
    customerName: string;
    customerId: number;
    customerEcommerceId: number;
    customerEmail: string;
    customerPhone: string;
    maxReadWrite: number;
    validTo: string;
    productName: string;
    options: string[];
    VERSION: number;
}
interface XRUserType {
    id: number;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    signatureImage: string;
    signaturePassword: string;
    customerAdmin: number;
    passwordAgeInDays: number;
    badLogins: number;
    badLoginsBefore: number;
    superAdmin: number;
    userStatus: string;
    userSettingsList: XRSettingType[];
    tokenList: XRTokenType[];
    groupList: number[];
}
interface XRTodoCount {
    userId: number;
    login: string;
    projectId: number;
    projectShort: string;
    nbTodos: number;
    firstTodos: XRTodo[];
}
interface XRTodo {
    todoId: number;
    userId: number;
    login: string;
    projectShort: string;
    itemRef: string;
    fieldLabel: string;
    fieldId: number;
    auto: boolean;
    originatorUserId: number;
    originatorLogin: string;
    action: XRTodoAction;
    createdAt: string;
    closedAt: string;
    createdAtUserFormat: string;
    closedAtUserFormat: string;
    future: boolean;
}
interface XRMainAndBranch {
    mainline: string;
    branch: string;
    user: string;
    branchDateTime: string;
    branchDateTimeUser: string;
    withHistory: number;
    branchUntilTag: string;
    lastMergeDatetime: string;
    lastMergeDatetimeUser: string;
    lastMergeUser: string;
}
interface XRProjectType {
    id: number;
    label: string;
    shortLabel: string;
    projectLogo: string;
    qmsProject: boolean;
    accessType: string;
}
interface XRUserPermissionType {
    id: number;
    login: string;
    email: string;
    permission: number;
    firstName: string;
    lastName: string;
}
interface XRGroupPermissionType {
    groupName: string;
    permission: number;
    groupId: number;
    membership: XRUserTypeSimple[];
}
interface XRCategoryExtendedListType {
    categoryExtended: XRCategoryExtendedType[];
}
interface XRCategoryAndSettingListType {
    settingList: XRSettingType[];
    categoryId: number;
    categoryShort: string;
}
interface XRPluginSetting {
    pluginId: number;
    pluginLongName: string;
    pluginShortName: string;
    settings: XRSettingAndValue[];
    computedSettings: XRSettingAndValue[];
    capabilities: XRPluginCapabilities;
}
interface XRExceptionStatus {
    nbExceptionsStillStart: number;
    lastHourExceptions: XRExceptionItemIso[];
}
interface XRJobFileWithUrl {
    restUrl: string;
    jobFileId: number;
    visibleName: string;
    internalPath: string;
    mimeType: string;
}
interface XRCategoryType {
    id: number;
    label: string;
    shortLabel: string;
    maxSerial: number;
}
interface XRRestField {
    id: number;
    label: string;
    fieldType: string;
    fieldParam: string;
    testParam: string;
    testExecParam: string;
}
interface XRTrimNeedleItem {
    itemOrFolderRef: string;
    title: string;
    project: string;
    fieldVal: XRFieldValType[];
    labels: string;
    lastModDate: string;
    creationDate: string;
    upLinkList: XRTrimLink[];
    downLinkList: XRTrimLink[];
}
interface XRMonitorAction {
    action: string;
    done: boolean;
}
interface XRReportType {
    id: string;
    label: string;
    group: string;
    description: string;
    custom: boolean;
    guiItems: string[];
    requireSubtreeType: string;
    requireSubtree: string;
    selectSubtreeType: string;
    selectSubtree: string;
    targets: XRReportTarget[];
}
interface XRProjectFileType {
    fileId: number;
    localName: string;
    fullPath: string;
    mimeType: string;
    key: string;
}
interface XRJobWithUrl {
    getJobUrl: string;
    jobId: number;
    progress: number;
    status: string;
    jobBirth: string;
    jobLastWrite: string;
    project: string;
}
interface XRTrimLink {
    upLinkList: XRTrimLink[];
    downLinkList: XRTrimLink[];
    itemRef: string;
    title: string;
    modDate: string;
    modDateUserFormat: string;
}
interface XRFieldValListType {
    fieldVal: XRFieldValType[];
}
interface XRItemHistoryListType {
    itemHistory: XRItemHistoryType[];
}
interface XRCategoryAndRoot {
    category: string;
    rootFolder: string;
}
interface XRUserAndTime {
    userId: number;
    login: string;
    firstName: string;
    lastName: string;
    email: string;
    date: string;
    dateUserFormat: string;
}
interface XRItemSimpleType {
    author: string;
    birth: string;
    ref: string;
    title: string;
    version: number;
}
interface XRTrimAudit {
    userLogin: string;
    dateTime: string;
    dateTimeUserFormat: string;
    action: string;
    entity: string;
    reason: string;
    projectLabel: string;
    reportRef: string;
    reportTitle: string;
    reportJobId: number;
    itemBefore: XRTrimNeedleItem;
    itemAfter: XRTrimNeedleItem;
    itemUp: XRTrimNeedleItem;
    itemDown: XRTrimNeedleItem;
    auditId: number;
    techAudit: XRTechAuditType[];
    tags: XRTag[];
}
interface XRLicenseUser {
    userId: number;
    login: string;
    name: string;
    email: string;
    level: string;
}
interface XRMergeInfoPoint {
    project: string;
    date: string;
    items: XRMergeItem[];
}
interface XRMergeItemLink {
    upItemRef: string;
    downItemRef: string;
}
interface XRMergeEntry {
    id: number;
    user: string;
    mainlineProject: string;
    branchProject: string;
    date: string;
    dateUser: string;
    comments: string;
    details: XRMergeAction[];
}
interface XRLabelEntry {
    itemRef: string;
    labels: XRLabelChange[];
}
interface XRTokenType {
    userId: number;
    tokenId: number;
    purpose: string;
    reason: string;
    value: string;
    validTo: string;
    validToUserFormat: string;
}
interface XRTodoAction {
    text: string;
    todoType: string;
}
interface XRUserTypeSimple {
    userId: number;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
}
interface XRCategoryExtendedType {
    category: XRCategoryType;
    fieldList: XRFieldListType;
    enable: string[];
}
interface XRSettingAndValue {
    setting: string;
    value: string;
    encrypted: boolean;
}
interface XRPluginCapabilities {
    canCreate: boolean;
    canFind: boolean;
    needSetup: boolean;
    handleAsLink: boolean;
    one2OneMapping: boolean;
    hasMeta: boolean;
    canCreateBacklinks: boolean;
    messaging: boolean;
    restToken: boolean;
    impersonate: boolean;
    extendedSettings: boolean;
    hideInProjectSettings: boolean;
}
interface XRExceptionItemIso {
    date: string;
    text: string;
}
interface XRFieldValType {
    id: number;
    value: string;
    hide: number;
    restricted: number;
    fieldName: string;
    fieldType: string;
}
interface XRReportTarget {
    targetId: string;
    targetText: string;
}
interface XRItemHistoryType {
    version: number;
    createdAt: string;
    createdAtUserFormat: string;
    deletedAt: string;
    deletedAtUserFormat: string;
    title: string;
    createdByUserId: number;
    createdByUserLogin: string;
    reason: string;
    auditId: number;
    auditAction: string;
}
interface XRTechAuditType {
    id: number;
    operation: string;
    table: string;
    index: number;
    ref: string;
}
interface XRTag {
    id: number;
    auditId: number;
    auditTime: string;
    label: string;
    comments: string;
    tagType: string;
    tagCreation: string;
    userLogin: string;
    baseProjectId: number;
    baseProjectName: string;
    baseProjectTag: string;
    baseAuditCreation: string;
    baseAuditId: number;
}
interface XRMergeItem {
    itemRef: string;
    version: number;
    title: string;
    parentFolder: string;
    nbMoveSinceV1: number;
}
interface XRMergeAction {
    action: string;
    branchItem: string;
    branchItem2: string;
    mainlineItem: string;
    mainlineItem2: string;
    mainlineFolder: string;
    request: string;
    error: string;
}
interface XRLabelChange {
    label: string;
    set: XRLabelChangeDetail[];
    reset: XRLabelChangeDetail[];
}
interface XRFieldListType {
    field: XRFieldType[];
}
interface XRLabelChangeDetail {
    version: number;
    dateIso: string;
    dateUser: string;
}
interface XRFieldType {
    id: number;
    order: number;
    fieldType: string;
    parameter: string;
    label: string;
}
declare type XRPostProject_postCreateProject = string;
declare type XRPostProject_postCloneProject = string;
declare type XRPostProject_postImportItems = string;
declare type XRPostProject_postAddCategory = string;
declare type XRPostProject_postAddField = string;
declare type XRPostProject_postAddTag = string;
declare type XRPostProject_postWebHook = string;
declare type XRPostProject_postCopyItemOrFolder = string;
declare type XRPostProject_AddItem_AddItemAck = XRAddItemAck;
declare type XRPostProject_postSendMail = string;
declare type XRPostProject_postCreateServiceDesk = string;
declare type XRPostProject_postAddLink = string;
declare type XRPostProject_AddFolder_AddItemAck = XRAddItemAck;
declare type XRPostProject_postAddProjectSetting = string;
declare type XRPostProject_postAddCustomerSetting = string;
declare type XRPostProject_postLog = string;
declare type XRPostProject_AddCustomerFile_AddFileAck = XRAddFileAck;
declare type XRPostProject_AddFile_AddFileAck = XRAddFileAck;
declare type XRPostProject_postConvertExcelFile = string;
declare type XRPostProject_LaunchReport_CreateReportJobAck = XRCreateReportJobAck;
declare type XRPostProject_postLaunchSignedReport = string;
declare type XRPostProject_postMoveItems = string;
declare type XRPostProject_postCreateTodo = string;
declare type XRPostProject_RestoreItem_UndeleteAnswer = XRUndeleteAnswer;
declare type XRPostProject_postHook = string;
declare type XRPostProject_postAddCategorySetting = string;
declare type XRPostProject_SignItem_SignItemAck = XRSignItemAck;
declare type XRPostProject_postPublishItem = string;
declare type XRPostProject_ExecuteXtc_FolderAnswer = XRFolderAnswer;
declare type XRPostProject_postCompareSign = string;
declare type XRPostProject_postConvertWord = string;
declare type XRPostProject_CompareHtml_HtmlCompareResult = XRHtmlCompareResult;
declare type XRPostProject_postJobProgress = string;
declare type XRPostProject_postBranch = string;
declare type XRPostProject_postMerge = string;
interface XRAddItemAck {
    itemId: number;
    serial: number;
}
interface XRAddFileAck {
    fileId: number;
    fileFullPath: string;
    key: string;
}
interface XRCreateReportJobAck {
    jobId: number;
}
interface XRUndeleteAnswer {
    newParent: string;
    newOrder: number;
}
interface XRSignItemAck {
    result: string;
    ok: boolean;
}
interface XRFolderAnswer {
    folder: string;
    xtcInError: XRExecuteTestErrorDetails[];
}
interface XRHtmlCompareResult {
    html: string[];
    spanElement: string;
    addClass: string;
    removeClass: string;
}
interface XRExecuteTestErrorDetails {
    key: string;
    errors: string[];
}
declare type XRPutProject_EditItem_TrimItem = XRTrimItem;
declare type XRPutProject_putEditField = string;
declare type XRPutProject_putTouchItems = string;
declare type XRPutProject_putEditCategory1 = string;
declare type XRPutProject_putHideProject = string;
declare type XRPutProject_putUnhideProject = string;
declare type XRDeleteProject_deleteProject = string;
declare type XRDeleteProject_deleteItem = string;
declare type XRDeleteProject_deleteLink = string;
declare type XRDeleteProject_deleteCategory = string;
declare type XRDeleteProject_deleteField = string;
declare type XRDeleteProject_deleteTodo = string;
declare type XRGetUser_AllUsers_GetUserListAck = XRGetUserListAck;
declare type XRGetUser_User_UserType = XRUserType;
declare type XRGetUser_UserAudit_TrimAuditList = XRTrimAuditList;
declare type XRGetUser_UserProjects_UserDetails = XRUserDetails;
declare type XRGetUser_checkUserPassword_CheckPasswordAck = XRCheckPasswordAck;
interface XRGetUserListAck {
    user: XRUserType[];
    needDoublePassword: number;
    passwordExpirationDays: number;
    passwordStrength: number;
    maxUsers: number;
}
interface XRUserDetails {
    login: string;
    nbReadWriteProjectsNow: number;
    projects: XRProjectAndAccess[];
    infoUpdates: XRUserInfo[];
    admin: number;
    superAdmin: number;
    userStatus: string;
}
interface XRCheckPasswordAck {
    actualLogin: string;
    userId: number;
    userDetails: XRUserType;
    maxAge: number;
    singleSignOn: boolean;
    superAdmin: boolean;
    customerAdmin: boolean;
}
interface XRProjectAndAccess {
    projectId: number;
    projectShort: string;
    projectLabel: string;
    accesses: XRAccess[];
}
interface XRUserInfo {
    startDate8601: string;
    endDate8601: string;
    hasKey: boolean;
    userId: number;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
}
interface XRAccess {
    startDate8601: string;
    endDate8601: string;
    readWrite: number;
    visitorOnly: boolean;
}
declare type XRPostUser_postLogin = string;
declare type XRPostUser_postLogout = string;
declare type XRPostUser_postAddUser = string;
declare type XRPostUser_postAddUserProject = string;
declare type XRPostUser_postAddUserSetting = string;
declare type XRPostUser_postAddUserToken = string;
declare type XRPostUser_postResetPassword = string;
declare type XRPostUser_postCheckUserPassword = string;
declare type XRPutUser_putUser = string;
declare type XRPutUser_putUserProject = string;
declare type XRPutUser_putUserStatus = string;
declare type XRPutUser_putUserRename = string;
declare type XRDeleteUser_deleteUser = string;
declare type XRDeleteUser_deleteUserToken = string;
declare type XRGetGroup_AllGroups_GetGroupListAck = XRGetGroupListAck;
declare type XRGetGroup_Group_GroupType = XRGroupType;
interface XRGetGroupListAck {
    groups: XRGroupType[];
}
interface XRGroupType {
    groupName: string;
    membership: XRUserType[];
    permissions: XRProjectPermissionType[];
    groupId: number;
}
interface XRProjectPermissionType {
    project: XRProjectType;
    access: XRAccess;
}
declare type XRPostGroup_postAddGroup = string;
declare type XRPostGroup_postAddGroupToProject = string;
declare type XRPutGroup_putUserInGroup = string;
declare type XRPutGroup_putAllUserInGroup = string;
declare type XRPutGroup_putGroupRename = string;
declare type XRDeleteGroup_deleteGroup = string;
declare type XRDeleteGroup_deleteUserFromGroup = string;
declare class IDeletedProjects {
    deleted: string[];
}
interface IWorkflowConfig {
    enabled?: boolean;
    defaultProjectId?: string;
    defaultTypeId?: string;
    projectsAndTypes?: IWorkflowConfigProjectsAndTypes[];
    one2one?: IWorkflowConfigOne2One;
    states?: IWorkflowConfigStates[];
    pluginId: number;
}
interface IWorkflowConfigOne2One {
    projectId: string;
    typeId: string;
}
interface IWorkflowConfigProjectsAndTypes {
    key: string;
    id: string;
    issueTypes: IWorkflowConfigIssueType[];
    name: string;
}
interface IWorkflowConfigIssueType {
    id: string;
    name: string;
    icon?: string;
    quickIssue?: boolean;
}
interface IWorkflowConfigStates {
    projectId: string;
    typeId: string;
    states: IWorkflowConfigStateDetails[];
}
interface IWorkflowConfigStateDetails {
    name: string;
    color: string;
    background: string;
    done: boolean | string;
}
interface IWorkflowConfigJira extends IWorkflowConfig {
    hideCreateJiraSimpleIssue?: boolean;
    hideCreateJiraNativeIssue?: boolean;
    requireCommitTicket?: boolean;
    addJIRAComment?: boolean;
}
interface IWorkflowConfigZoho extends IWorkflowConfig {
    zohoBaseUrl?: string;
}
interface IWorkflowConfigIssueTypesZoho extends IWorkflowConfigIssueType {
    prefix: string;
    details?: string;
}
interface ITraceConfig {
    rules: ITraceConfigDetails[];
}
interface ITraceConfigDetails {
    category: string;
    creates_end: string | boolean;
    end_point: string;
    reporting: string[];
    up_rules: ITraceConfigRule[];
    down_rules: ITraceConfigRule[];
}
interface ITraceConfigRule {
    message: string;
    name: string;
    rule: TTraceRule;
    any_of: string[];
}
declare type TTraceRule = "can_have" | "must_have";
declare enum EnumItemPublish {
    IfNotInGroup = 0,
    Always = 1,
    Never = 2
}
interface IQMSConfig {
    /** there's only one publication in the array supported */
    publications: IPublication[];
    rolesTargetProjects?: string[];
    affectedByField?: string;
    responsibleForField?: string;
    training?: ITraining;
    /** obsolete */
    legacyRoles: boolean;
}
interface ITraining {
    messages?: ITrainingMessages;
}
interface ITrainingMessages {
    trainingSub?: string;
    trainingText?: string;
    overdueSub?: string;
    overdueText?: string;
}
interface IPublication {
    /** information for each publishable category */
    rules: IPublicationCategory[];
    /** needs to be PUB right now */
    toCategory: string;
    /** needs to be pub right now */
    target: string;
    /** comma separated list of users who can publish */
    publisher: string;
    /** beta: userMode: default 0 - select the logged in user, 1 no user pre selected, 2: hide all other users  */
    userMode?: number;
    /** Experimental: comma separated list of labels to show in published site -> if they are set */
    showLabels?: string;
    /** obsolete */
    keepFlatList: boolean;
}
interface IPublicationCategory {
    /** the category for which the rule applies  */
    category: string;
    /** a list of labels which must be set to be able to publish (approved labels)*/
    readyLabels: string[];
    /** how individual items can be published:  0 - only if they are not in a group, 1 - independently of groups, 2 - only as part of a group*/
    itemRules: EnumItemPublish;
    /** name of the group, displayed in the UI as heading in the navigation of the live qms */
    groupName?: string;
    /** identification of labels which define the group (groupType setting in labels)  */
    groupLabelType?: string;
    /** if a PROC should only be published with its WI,s the group down would be WI*/
    groupDown?: string[];
}
interface IPublicationCategoryGroup {
    category: string;
    groupName: string;
    groupLabelType: string;
}
declare const qmsDefaultConfig: IQMSConfig;
interface IPublishLegacy {
    publisher: string;
}
interface ILabelsConfig {
    /** basic label definitions */
    labels: ILabel[];
    /** grouping of labels to or, xor or review groups */
    groups: ILabelGroup[];
    /** array of the design review labels */
    design_reviews?: IDesignReview[];
    /** allows to change the background color of the top bar if a filter is selected */
    filterBackgroundColor?: string;
    /** if set to true, the filters are shown in a drop down menu (each group needs to be added as well)*/
    useFilterMenu?: boolean;
    /** beta: when looking at an item, it shows the labels underneath the item if set to true - this allows for more items.. */
    useLabelBar?: boolean;
    /** invert groups in items (this will make groups show in the wrong order... as it was in 2.2 and before) */
    invertGroups?: boolean;
}
interface ILabelStyle {
    label: {
        on: {
            foreground: string;
            background: string;
            icon?: string;
            displayName: string;
            tooltip: string;
        };
        off: {
            foreground: string;
            background: string;
            icon?: string;
            displayName: string;
            tooltip: string;
        };
    };
    filter: {
        on: {
            foreground: string;
            background: string;
            icon?: string;
            displayName: string;
            tooltip: string;
        };
        off: {
            foreground: string;
            background: string;
            icon?: string;
            displayName: string;
            tooltip: string;
        };
    };
}
interface ILabel {
    label: string;
    categories: string[];
    editors?: string[];
    reportName: string;
    reportHide: string;
    default: boolean | string;
    defaultAsk: boolean;
    style: ILabelStyle;
    isSelected?: boolean;
    isNegative?: boolean;
    askForComment?: boolean;
    displayName?: string;
    toolTipFilterOn?: string;
    color?: string;
    template?: ILabelTemplate;
}
interface ILabelInstance extends ILabel {
    btn: JQuery;
}
interface ILabelTemplate {
    id: number;
    name: string;
    key: string;
}
interface ILabelGroup {
    selection: string;
    labels: string[];
    filterMenu?: IFilterMenu;
    default?: string;
    defaultAsk?: boolean;
    noColor?: string;
    noName?: string;
    noIcon?: string;
    reset?: boolean;
    foreground?: string;
    background?: string;
    askForComment?: boolean;
    showComments?: boolean;
    tooltip?: string;
    reviewers?: string[];
    groupType?: string;
    labelDef?: ILabel[];
    filterSelection?: string;
    virtualGroup?: boolean;
}
interface IFilterMenu {
    displayName: string;
    on?: {
        foreground: string;
        background: string;
        icon?: string;
        displayName: string;
        tooltip: string;
    };
    off?: {
        foreground: string;
        background: string;
        icon?: string;
        displayName: string;
        tooltip: string;
    };
}
interface IDesignReview {
    /** id of label (no spaces, special characters) */
    label: string;
    /** define who can approve the review. Empty array -> everybody.  */
    reviewers?: string[];
    /** beta: allow to specify the name of a field from which to take possible approvers. If set it has precedence over reviewers */
    reviewerField?: string;
    /** set to true if labels should be reset if item is changed */
    reset: boolean;
    /** title of review  */
    reviewName: string;
    /** sub title */
    reviewHelp: string;
    /** list of questions, checkboxes, or a signature box */
    reviewDetails: {
        name: string;
        help?: string;
        type?: string;
    }[];
    /**  can be set to rename comment field to something else than "Design Review Comment" */
    commentHeading?: string;
    /** can be used to set a group type (used internally e.g. to indicate a group is a design review for a Process) */
    groupType?: string;
    /** can be used to put the reviews' filter into the filter menu if enabled */
    filterMenu?: IFilterMenu;
    /** beta: allows to name a table field. If this exists, the revision need to increase when setting the label */
    revisionTableName?: string;
}
interface IMailConfig {
    canned?: IMailConfigCanned;
    defaultCC?: string[];
}
interface IMailConfigCanned {
    please_sign?: string;
    look_at?: string;
    release_note?: string;
    new_user?: string;
}
interface IMailConfigCustom {
    name: string;
    categories: string[];
    to: string[];
    subject: string;
    message: string;
}
interface ISearchConfig {
    searches: ISearchConfigSearch[];
    init?: IInitialSearches[];
}
interface ISearchConfigSearch {
    name: string;
    expr: string;
}
interface IInitialSearches {
    expr: string;
    style: string;
    computeFolder: number;
}
interface ILabelLockConfig {
    locks: ILabelLockConfigLocks[];
}
interface ILabelLockConfigLocks {
    label: string;
    lockKeeper: string[];
}
interface IRiskConfig {
    factors?: IRiskConfigFactor[];
    method?: IRiskConfigMethod;
    maxGreen?: number;
    maxYellow?: number;
    charts?: IRiskConfigZone[];
    rpns?: IRiskConfigRPN[];
    riskCategory?: string;
    riskCategories?: string[];
    mitigationTypes?: IRiskConfigMitgationType[];
    mitigationTable?: IRiskConfigMitgationTable;
    mitigationColDef?: IColDef;
    reductions?: IRiskConfigReduction[];
    postReduction?: IRiskPostReduction;
    rbm?: IRiskConfigRT;
    ram?: IRiskConfigRT;
    controls?: string;
    hazard_category?: string;
}
declare type IRiskConfigMethod = "+" | "*" | "lookup";
interface IRiskConfigRT {
    short: string;
    long: string;
    report: string;
    hidden?: boolean;
    colDef?: IColDef;
}
interface IRiskConfigMitgationType {
    type: string;
    name: string;
}
interface IRiskConfigFactor {
    type: string;
    label: string;
    weights: IRiskConfigFactorWeight[];
    hideTextInput?: boolean;
    readonly?: boolean;
    inputType?: IRiskConfigFactorInputType;
    options?: IRiskConfigFactorOption[];
    spancols?: boolean;
    colDef?: IColDef;
}
interface IColDef {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    rowSpan?: boolean;
}
interface IRiskConfigMitgationTable {
    columns: IRiskConfigTablesColumn[];
}
interface IRiskConfigTablesColumn {
    name: string;
    field: string;
    editor: RiskTableCellEditor;
    options?: any;
}
declare type RiskTableCellEditor = "control" | "reduction";
declare type IRiskConfigFactorInputType = "text" | "select" | "textarea" | "richtext";
interface IRiskConfigFactorOption {
    value: string;
    label: string;
    changes: IRiskConfigSelectChanges[];
}
interface IRiskConfigSelectChanges {
    changesFactor?: string;
    changesWeight?: string;
    value: number | string;
}
interface IRiskConfigFactorWeight {
    type: string;
    help: boolean;
    label: string;
    readonly?: boolean;
    hidden?: boolean;
    values: IRiskConfigFactorWeightValue[];
    colDef?: IColDef;
}
interface IRiskConfigFactorWeightValue {
    shortname: string;
    help: string;
    factor: number;
}
interface IRiskConfigReduction {
    name: string;
    options: IRiskConfigReductionOptions[];
}
interface IRiskConfigReductionOptions {
    shortname: string;
    by: number;
    changes: string;
}
interface IRiskConfigZone {
    zone?: string;
    foreground?: string;
    background?: string;
    textColor?: string;
    label?: string;
}
interface IRiskConfigRPN {
    zone: string;
    text: string;
    [key: string]: string | number;
}
interface IRiskPostReduction {
    weights: IRiskConfigFactorWeight[];
    help?: string;
}
interface ICascadingSelect {
    startGroupId: string;
    groups: ICascadingSelectGroup[];
}
interface ICascadingSelectGroup {
    groupId: string;
    type: "text" | "number" | "select";
    spec: ICascadingSelectText | ICascadingSelectNumber | ICascadingSelectSelect[];
}
interface ICascadingSelectNumber {
    counter: string;
    format: string;
    nextGroupId: string;
}
interface ICascadingSelectSelect {
    text: string;
    help?: string;
    nextGroupId: string;
}
interface ICascadingSelectText {
    text: string;
    nextGroupId: string;
}
interface IDHFConfig {
    /** if set to true the created PDFs won't be locked */
    doNotLockPDF?: boolean;
    /** default formats for different report types */
    defaultFormats?: IDHFConfigDefaultFormats;
    /** table configuration for audit trail table */
    audittrail?: IDHFConfigTable;
    /** table configuration for signature table*/
    signatures?: IDHFConfigTable;
    /** table configuration for responsibilities table */
    responsibilities?: IDHFConfigTable;
    /** list with predefined document sections when creating new DOC items */
    controlledDocs?: IDHFConfigStandardDocs;
    /** can be used to define custom table columns (e.g. dropdowns) */
    customColumns?: IDHFConfigCustomColumn[];
    /** allows to specify an alternative for "Ready to Sign / Release" button*/
    archiveButtonName?: string;
    /** if set to true a warning will be shown if there's a missing signature */
    warnMissingSign?: boolean;
    /** possibility to overwrite options in signature meaning column */
    signatureMeanings?: IStringMap;
    /**  beta: if true a user can reject instead of signing. the reject comment will be stored and showed, other cannot sign anymore */
    canReject?: boolean;
    /**  beta:  if canReject is true and this is true the user can reject without supplying a password */
    rejectWithoutPass?: boolean;
    /** beta: if canReject is true and this is true the user needs to supply special comment to reject */
    rejectNeedsComment?: boolean;
    /** beta: text shown in signature box if someone needs to sign something */
    signatureHint?: string;
    /** beta: list of users who can change name of person who needs to sign */
    proxyRights?: string[];
    /** beta: a list of options to declare what user is signing for ["i release", "i confirm correct","I don't know"], */
    signedMeaning?: string[];
    /** beta: removes not needed notifications and adds new ones when changing signatures proxies */
    fixNotifications?: boolean;
    /** beta: 0 leave original sign info. 1 replace name and title when chaning signature proxies */
    proxySignTableUpdate?: number;
    /** beta: set to true show a column with sign meaning in SIGN */
    showOriginalSignMeaning?: boolean;
    /** obsolete */
    hideFileFormats?: IDHFConfigHideFormat[];
    /** obsolete */
    customTables?: IDHFConfigCustomTable[];
    /** obsolete  */
    customReports?: IDHFConfigCustomReports;
    /**  obsolete */
    categories?: IDHFCategories;
    /**  obsolete */
    captions?: ICaptions;
    /**  obsolete */
    renderInTree?: string[];
    /** obsolete */
    toolFolderName?: string;
    /** obsolete */
    functionDefaults?: IPrintFunctionParamsOverwrites;
}
interface ICaptions {
    figure?: ICaption;
    table?: ICaption;
}
interface ICaption {
    preNo: string;
    postNo: string;
}
interface IDHFCategories {
    documentTypes: string[];
    documentForms: string[];
    documentSigned: string[];
    documentTemplates: string[];
    signAs: string;
}
interface IDHFConfigCustomReports {
    group: string;
}
interface IDHFConfigDefaultFormats {
    DOC: IDHFConfigDefaultFormatsOption;
    SIGN: IDHFConfigDefaultFormatsOption;
    REPORT: IDHFConfigDefaultFormatsOption;
    [map: string]: IDHFConfigDefaultFormatsOption;
}
declare type IDHFConfigDefaultFormatsOption = "docx" | "pdf" | "html";
interface IDHFConfigHideFormat {
    category: string;
    format: IDHFConfigDefaultFormatsOption;
}
interface IDHFConfigCustomColumn {
    type: string;
    options: IDropdownOption[];
    name: string;
    editor?: string;
}
interface IDHFConfigTable {
    columns: IDHFConfigTableColumn[];
}
interface IDHFConfigTableColumn {
    name: string;
    field: string;
    columnType: IDHFConfigTableColumnType;
    pos: number;
    editor?: TableCellEditor;
    options?: IDropdownOption[];
}
declare type IDHFConfigTableColumnType = "type0" | "type1" | "type2" | "type3" | "type4" | "type5" | "type6" | "type7" | "type8" | "type9" | "type10" | "type11" | "type12" | "type13";
interface IDHFConfigCustomTable {
    name: string;
    id: string;
}
interface IDHFConfigStandardDocs {
    [key: string]: IDHFConfigStandardDocsDef;
}
interface IDHFConfigStandardDocsDef {
    fields: IDHFConfigStandardDocsSection[];
}
interface IDHFConfigStandardDocsSection {
    [key: string]: string;
}
interface IContextPageConfig {
    categoryHelp?: IContextPageConfigHelp;
    itemHelp?: IContextPageConfigHelp;
    tabs?: IContextPageConfigTab[];
}
interface IContextPageConfigHelp {
    [key: string]: string;
}
interface IContextPageConfigTab {
    title: string;
    type: ContextPageConfigTabOption;
    tabId?: string;
    hipchat?: boolean;
    baseURL?: string;
}
declare type ContextPageConfigTabOption = "help" | "support" | "faq" | "references" | "smartlinks" | "iframe" | "iframeget" | "upreferences" | "downreferences" | "foldercontent" | "trainings";
interface ITestConfig {
    xtcType: string;
    cloneSources: string[];
    presetFields: ITestConfigPresetField[];
    render: ITestConfigTables;
    defaultTestResultResult: string;
    automatic: ITestRuleAuto[];
    manual: ITestRuleManual[];
    perStep: ITestRuleStep[];
    reExecute?: string;
    autoFillTester?: string;
}
interface ITestConfigPresetField {
    field: string;
    value: string;
}
interface ITestConfigTables {
    [key: string]: ITestConfigTablesColumns;
}
interface ITestConfigTablesColumns {
    columns: ITestConfigTablesColumn[];
}
interface ITestConfigTablesColumn {
    name: string;
    field: string;
    editor: TableCellEditor;
    options?: IDropdownOption[] | any;
}
declare type TableCellEditor = "text" | "none" | "textline" | "design" | "uprules" | "downrules" | "rules" | "result" | "user" | "versionletter" | "date" | "select";
interface ITestRule {
    human: string;
    code: string;
    render: TestResultType;
}
interface ITestRuleAuto extends ITestRule {
    rule: TestResultRule;
    param: string;
}
interface ITestRuleManual extends ITestRule {
    command: string;
}
interface ITestRuleStep extends ITestRuleManual {
    key: string;
    image: string;
}
declare type TestResultType = "ok" | "error" | "warning";
declare type TestResultRule = "all" | "one" | "";
interface ICategorySetting {
}
interface ICategorySettingTitle extends ICategorySetting {
    create?: string;
    placeholder?: string;
}
interface ICategorySettingTextIcon extends ICategorySetting {
    color?: string;
    text?: string;
}
interface ICategorySettingTabs extends ICategorySetting {
    tabs: ICategorySettingTab[];
}
interface ICategorySettingTab {
    id?: string;
    name: string;
    fields: string[];
}
interface ICategoryGroups {
    groups: ICategoryGroup[];
}
interface ICategoryGroup {
    categories: string[];
    text: string;
    name: string;
    color: string;
    position?: number;
    helpPage?: string;
}
declare const ACL_SETTING: string;
interface IACL {
    rules: IACLRules[];
}
interface IACLRules {
    name: string;
    groups: string[];
    acl: IACLGroupsAcl[];
}
interface IACLGroupsAcl {
    category: string;
    fields?: string[];
    rights: string[];
}
interface IFieldParameter {
    [key: string]: any;
    /** if set to true, the control will not be editable by the user */
    readonly?: boolean;
    /** if set to true the field will not be shown in reports */
    hide_report?: boolean;
    /** if set to true the field will not be shown in documents */
    hide_document?: boolean;
    /** if set to true the field will not be shown in published (QMS) */
    hide_publication?: boolean;
    hide_UI?: boolean;
    /** this can be set to point to a an external website which is openend when user clicks on a link, e.g.
     * "externalHelp":"matrix.com". Note this must be a website which is accesible through https://url */
    externalHelp?: string;
    /** this can be set to show help as a tooltip, e.g. "popupHelp":"enter a short description" */
    popupHelp?: string;
    /** this can be set to render a help line underneath the "heading":"enter a long description" */
    inlineHelp?: string;
    /** for folder category */
    visibleOption?: string;
    /** for SIGN category
     * if set to true, the field is not visible (only makes sense with the above flag)
     */
    invisible?: boolean;
    /** this allows to copy fields from underlying DOC into the SIGN item.
     * Note: Fields are copied only if this is set to true and the labels (names) of the field is the same in the
     * DOC and the SIGN */
    copyfromdoc?: boolean;
    /** legacy options */
    adminVisibility?: boolean;
    /** legacy options */
    requiresContent?: boolean;
}
interface IDropDownConfig {
    fieldMeaning?: string;
    placeholder?: string;
    options: IDropdownOption[];
    groups?: IDropdownGroup[];
}
interface IDropdownGroup {
    value: string;
    label: string;
}
interface IDropdownOption {
    id: string;
    label: string;
    class?: string;
    disabled?: boolean;
}
interface IAutoFillSetting {
    allowAutoFill: boolean;
    allowLoginAutoFill: boolean;
    allowDocSignAutoFill: boolean;
    allowLabelSignAutoFill: boolean;
    allowGateAutoFill: boolean;
    allowPublishAutoFill: boolean;
}
interface ISmartTextConfig {
    replacements?: ISmartTextConfigReplacement[];
}
interface ISmartTextConfigReplacement {
    /** id of the macro: needs to be simple combination of letters and digits */
    what: string;
    /** the text to display */
    with: string;
    /** value from 1 to 4: 1=plain text 2=rich text 3=term 4=abbreviation */
    tagType: number;
    /**  additional explanation for terms*/
    description?: string;
    /** set to true to ask user to review before creating document */
    warn: boolean;
    /** date/time of creation */
    when: string;
    /** internal: not to be used */
    projectSetting?: boolean;
    /** legacy: now handled by tagType */
    plain?: boolean;
}
interface IProjectLogo {
    fileId: string;
}
interface IExtras {
    tableCanImport: boolean | string;
    copyPaste: boolean | string;
    moveIn: boolean | string;
    excelImport: boolean | string;
    deepTouch: boolean | string;
    noTouch: boolean | string;
    setLabel: boolean | string;
    compare: boolean | string;
    compareInside: boolean | string;
    indexer: boolean;
    cleanup: boolean | string;
    defaultToNewEditor: boolean | string;
}
interface IEmbeddedReport {
    reportId: string;
}
interface IProjectGroups {
    groups: IProjectGroup[];
}
interface IProjectGroup {
    name: string;
    projects: string[];
}
interface IFieldCapabilities {
    onlyOne?: boolean;
    canBePublished: boolean;
    canBeReadonly: boolean;
    canHideInDoc: boolean;
    canBeXtcPreset: boolean;
    canRequireContent?: boolean;
    canBeUsedInDocs?: boolean;
    validationFunction?: JsonEditorValidation;
    schema?: string;
    needsConfiguration?: boolean;
}
interface IFieldDescription {
    id: string;
    label: string;
    class: string;
    help: string;
    capabilities: IFieldCapabilities;
}
interface INotificationConfig {
    enabled: boolean;
    closeAuto: boolean;
    manualCreate: boolean;
    browserNotificationDisabled?: boolean;
    browserNotificationAutoCloseAfter?: number;
}
declare let notificationSetting: string;
declare let defaultNotificationConfig: INotificationConfig;
/** allow to set cell in table column if another dropdown cell in same row changes*/
interface IAutoColumn {
    /** a list of mappings (which cell is updated upon change of which cell) */
    maps: IAutoColumnMap[];
}
interface IAutoColumnMap {
    /** name of cell which triggers change */
    dropdownColumnName: string;
    /** name of cell which is updated  */
    textColumnName: string;
    /** mapping from selected to set value */
    mapping: IAutoColumnMapping[];
}
interface IAutoColumnMapping {
    /** selected value */
    dropdownValue: string;
    /** set value */
    textValue: string;
}
declare let autoColumnSetting: string;
declare let autoColumnDefault: IAutoColumn;
interface ISingleSelectOptions extends IDHFSectionOptions {
    search?: string;
}
interface IDoubleSelectOptions extends IDHFSectionOptions {
    searchFrom?: string;
    searchTo?: string;
}
interface ISingleDefaultControllerConfig {
    default: ISingleSelectOptions;
}
interface IDoubleDefaultControllerConfig {
    default: ISingleSelectOptions;
}
declare abstract class SingleSelectBase implements IDHFSection {
    protected abstract config: ISingleDefaultControllerConfig;
    abstract renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    abstract updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ISingleSelectOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    abstract showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    protected addSpecificSettings(controllerConfig: ISingleSelectOptions, custom: JQuery): void;
    abstract saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    protected setSpecificSettings(controllerConfig: ISingleSelectOptions, custom: JQuery): boolean;
    hasSearch(ctrl: IDHFControlDefinition): boolean;
    executeSearch(ctrl: IDHFControlDefinition): void;
    verifySearch(ctrl: IDHFControlDefinition): void;
    verifyContent(ctrl: IDHFControlDefinition): void;
    protected removeSpaces(str: string): string;
}
declare abstract class DoubleSelectBase implements IDHFSection {
    protected abstract config: IDoubleDefaultControllerConfig;
    abstract renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    abstract updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDoubleSelectOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    abstract showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    protected addSpecificSettings(controllerConfig: IDoubleSelectOptions, custom: JQuery): void;
    abstract saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    protected setSpecificSettings(controllerConfig: IDoubleSelectOptions, custom: JQuery): boolean;
    hasSearch(ctrl: IDHFControlDefinition): boolean;
    executeSearch(ctrl: IDHFControlDefinition): void;
    verifySearch(ctrl: IDHFControlDefinition): void;
    verifyContent(ctrl: IDHFControlDefinition): void;
    protected removeSpaces(str: string): string;
}
interface IPrintList extends IPrintFormatter {
    iterator: string;
    params: IPrintItemIteratorParams;
    before: string;
    after: string;
    folder: string;
    item: string;
}
interface IPrintListMacro extends IPrintArrayMacro {
    renderList: string;
}
interface IPrintTable extends IPrintFormatter {
    iterator: string;
    params?: IPrintItemIteratorParams;
    subTable: string;
    subTableFolder: string;
    before: string;
    after: string;
    renderFolderRow: IPrintTableRow;
    renderItemRow: IPrintTableRow;
}
interface IPrintTableMacro extends IPrintArrayMacro {
    renderTable: string;
}
interface IPrintTableRow {
    before: string;
    after: string;
    cells: ITableTableCell[];
}
interface ITableTableCell {
    before: string;
    after: string;
    render?: string;
    merge?: boolean;
    fetchColumn?: number;
    fetchColumnAlt?: string;
    sortFunction?: string;
    sortPriority?: number;
}
interface IPrintSubTable extends IPrintFormatter {
    iterator: string;
    params: IPrintItemIteratorParams;
    subTable: string;
    cells: IPrintSubTableCell[];
}
interface IPrintSubTableCell {
    render: string;
    fetchColumn?: number;
    fetchColumnAlt?: string;
}
interface IPrintRenderedCell {
    rowspan: number;
    content: string;
    classes: string[];
    style: string;
}
interface IPrintRowContent {
    isFolderRow: boolean;
    rowBefore: string;
    rowAfter: string;
    cells: string[];
}
/************************************************************************
 
Formatter deal with an array or a single item/folder/label/field and convert that to an "html" string

 There are 3 main different types of formatters:
 * lists: print folders/items in a list by mixing html with macros
 * tables: print folders arrays in a tabular form by mixing html with macros
 * info: print something about an item/folder/label/field by mixing html with macros
 
 These are implemented as JSON objects or javascript functions

************************************************************************/
interface IPrintFormatter {
    uid: string;
    name: string;
    help: string;
    condition?: string;
    conditionParams?: IPrintConditionParams;
}
declare function isIPrintCustomFormatter(data: unknown): data is IPrintCustomFormatter;
interface IPrintCustomFormatter {
    /**
     * The project on this instance that is used as the source
     * for the definitions. By default this is PRINT
     */
    source?: string;
    /**
     * Definition of LIST iterators
     */
    lists: {
        [key: string]: IPrintList;
    };
    /**
     * Definition of TABLE iterators
     */
    tables: {
        [key: string]: IPrintTable;
    };
    /**
     * Definition of SUBTABLE iterators that can be used
     * in another TABLE
     */
    subtables: {
        [key: string]: IPrintSubTable;
    };
    /**
     * Formatter definition for items
     */
    items: {
        [key: string]: IPrintItem;
    };
    /**
     * Overwrites for default function parameters
     */
    functionDefaults: IPrintFunctionParamsOverwrites;
}
interface IPrintFormatterMap {
    [key: string]: IPrintFormatter;
}
interface IPrintConditionParams {
    negate?: boolean;
}
/************************************************************************
 
Print Functions item/folder/label/field and convert that to an "html" string or boolean
  
 These are implemented as javascript functions

************************************************************************/
interface IPrintFunctionMap {
    [key: string]: IPrintFunction;
}
interface IConditionFunctionMap {
    [key: string]: IConditionFunction;
}
interface IPrintBaseFunction {
    getName: () => string;
    getHelp: (hideDetails?: boolean) => string;
    editParams?: (json: {}, onUpdate: (newParams: {}) => void) => JQuery;
}
interface IPrintBaseFunctionMap {
    [key: string]: IPrintBaseFunction;
}
interface IPrintFunction extends IPrintBaseFunction {
    getGroup: () => string;
    render: (overwrites: IGlobalPrintFunctionParams, params: IPrintFunctionParams, itemOrFolder: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => string;
}
interface IPrintFunctionParams {
}
interface IPrintFunctionParamsOverwrites {
    debug: number;
    [key: string]: IPrintFunctionParams;
}
interface IGlobalPrintFunctionParams {
    outputFormat: string;
    customer: IPrintFunctionParamsOverwrites;
    project: IPrintFunctionParamsOverwrites;
    section: IPrintFunctionParamsOverwrites;
}
interface IConditionFunction extends IPrintBaseFunction {
    evaluate: (overwrites: IGlobalPrintFunctionParams, params: {}, object: JQuery, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => boolean;
}
interface IPrintFunctionMacro {
    renderFunction: string;
}
interface IPrintItem extends IPrintFormatter {
    iterator: string;
    params: IPrintLabelIteratorParams | IPrintFieldIteratorParams;
    render: string;
}
interface IPrintItemMacro extends IPrintConditionalMacro {
    renderItem: string;
    before?: string;
    after?: string;
}
/************************************************************************
 
Iterators return children of an item, items or folders in a folder, or field / label objects

 There are 3 main different types of formatters:
 * Item operators return item ids based on an reference item or folder
 * Label iterators return label objects for an item
 * Field iterators return field objects for an item or folder
  
 These are implemented as javascript functions
 
************************************************************************/
interface IPrintIteratorMap {
    [key: string]: IPrintIterator;
}
interface IPrintItemIteratorParams {
    maxDepth?: number;
    sorting?: IPrintSortParams[];
}
interface IPrintIterator extends IPrintBaseFunction {
}
interface IPrintItemIterator extends IPrintIterator {
    iterate: (overwrites: IGlobalPrintFunctionParams, params: IPrintItemIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => string[];
    getValidation: () => JsonEditorValidation | null;
}
interface IPrintFieldIteratorParams {
}
interface IPrintFieldInfo {
    fieldId: string;
    field: JQuery;
    name: string;
    type: string;
    config: JQuery;
    jsonConfig: any;
    jsonValue: any;
}
interface IPrintFieldIterator extends IPrintIterator {
    iterate: (overwrites: IGlobalPrintFunctionParams, params: IPrintFieldIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => IPrintFieldInfo[];
}
interface IPrintLabelIteratorParams {
}
interface IPrintLabelInfo {
    id: string;
    printName: string;
    icon: string;
    set: boolean;
    jsonConfig: {};
}
interface IPrintLabelIterator extends IPrintIterator {
    iterate: (overwrites: IGlobalPrintFunctionParams, params: IPrintLabelIteratorParams, itemOrFolder: string, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => IPrintLabelInfo[];
}
/**
    Macro's are used in format strings to call/embed iterators, or primitive functions or other formatters in a formatting
*/
interface IPrintMacro {
}
interface IPrintArrayMacro extends IPrintMacro {
    iterator?: string;
    maxDepth?: number;
}
interface IPrintConditionalMacro {
    conditionTrue?: string;
    conditionFalse?: string;
}
interface IPrintMacroParams {
    itemIterator?: string;
    labelIterator?: string;
    fieldIterator?: string;
    maxDepth?: number;
    value?: string;
    values?: string[];
    render?: string;
    fieldDetails?: IPrintLabelInfo;
    formatter?: string;
    rowspan?: number;
}
interface IPrintFieldLabelMacroParams extends IPrintMacroParams {
    hideHeader: boolean;
}
interface IPrintValueMacro extends IPrintMacro {
    idx?: number;
}
/** Notes:
 *
 * if the include is "_RECURSE_"
 * it will recursively show children, in this case a default iterator function can be specified, this function can be overwritten by the caller
 *
 * parameters will overwrite defaults inside the function, they can be overwritten globally per function
 *
*/ 
/************************************** Main section definition  ********************************************/
interface ICustomSection {
    description?: string;
    descriptionContent?: string;
    descriptionNoContent?: string;
    formatter: string;
    functionDefaults?: IPrintFunctionParamsOverwrites;
}
interface IPrintProcessorOptions {
    headers?: {
        maxDepth?: number;
        altBefore?: string;
        altAfter?: string;
    };
}
interface IPrintProcessor {
    prepareProcessing(mf: JQuery, onError: (message: string) => void, format: string): any;
    processSection(formatter: IPrintCustomFormatter, section: ICustomSection, projectOverwrites: IPrintFunctionParamsOverwrites, selection: string[], possibleTargets: string[]): any;
    getCustomStylesheet(): string;
}
declare const PrintFindAllScriptsRegex: RegExp;
interface IPrintConfig {
    getPrintProcessor(): IPrintProcessor;
    getFieldAndLabelsIteratorsDropdown(): IDropdownOption[];
    getItemIteratorsDropdown(): any;
    getItemConditionDropdown(): any;
    showOptionsEditor(fctName: string, currentValue: string, onUpdate: (newValue: string) => void): any;
    editFunctionOptions(currentValue: string, onUpdate: (newOptions: string) => void): any;
    editStyle(wrap: JQuery): any;
    functionHasOptions(functionUid: string): any;
    getFunctions(group: string): any;
    getItemSorters(): IPrintSorterMap;
    getAllFunctions(): IPrintBaseFunctionMap;
}
declare var globalPrintConfig: IPrintConfig;
/************************************************************************
 
print sorter allow to sort items in tables
 
************************************************************************/
interface IPrintSorterMap {
    [key: string]: IPrintSorter;
}
interface IPrintSorterParams {
    reverse: boolean;
}
interface IPrintSorter {
    getName: () => string;
    getHelp: () => string;
    sort: (a: string, b: string, inverse: boolean, params: any, mf: JQuery, itemMap: IStringJQueryMap, possibleTargets: string[], onError: (message: string) => void) => number;
}
interface IPrintSortParams {
    sorter: string;
    descending: boolean;
    params?: any;
}
interface IContextInformation {
    project: string;
    user: string;
    server: string;
    version: string;
    product: string;
    itemId: string;
    item: string;
    fieldList: string;
}
declare class ContextFramesTools {
    static defaultPages: IContextPageConfig;
    private exists;
    private visible;
    private support;
    private context;
    private controls;
    private resetSmartLinks;
    private maxNumberOfLinks;
    private categoryFilter;
    private shouldBeVisible;
    constructor();
    protected setToogleIcon(allowClose: boolean): void;
    protected toggleFunction(): void;
    showContextFrame(tabType: string, makeVisible: boolean): boolean;
    getExpender(): JQuery;
    private getTabs;
    visibility(enabled: boolean): void;
    hideContextFrames(): void;
    showContextFrames(): void;
    private showSupport;
    private showHelp;
    private showSmartLinksTab;
    private showReferencesTab;
    private showItemsInFolderTab;
    private showUpReferences;
    private showDownReferences;
    private getUpLinks;
    private getDownLinks;
    private renderFromIds;
    private renderIds;
    private nonBlockingRenderNext;
    private nonBlockingRender;
    private renderAllUpOrDown;
    private renderAllInFolder;
    private showNothingFound;
    renderContextFrames(): void;
    fillContextFrame(_data: IItem, itemId: string): void;
    init(): void;
}
interface IUploadedFileInfo {
    fileName: string;
    fileId?: string;
    uploaded?: boolean;
    fileObj?: any;
}
interface IFileDefinition {
    name: string;
}
declare class FileTools {
    private uploadInfo;
    private uploadFilesAsync;
    UploadFilesAsync(files: FileList | File[]): JQueryDeferred<IUploadedFileInfo[]>;
    UploadFileAsync(file: File): JQueryDeferred<IUploadedFileInfo[]>;
    convertXLSXAsync(file: IFileParam): JQueryDeferred<string>;
}
interface IHTMLClean {
    whiteLists: {
        styles: IHTMLWhiteList[];
        classes: IHTMLWhiteList[];
        properties: IHTMLWhiteList[];
        data: IHTMLWhiteList[];
    };
    blackLists: {
        removeTags: string[];
        keepOnlyInside: string[];
        removeEmpty: string[];
    };
    tagReplacements: IHTMLReplacement[];
    tagReplacementsDoc: IHTMLReplacement[];
}
interface IHTMLReplacement {
    what: string;
    with: string;
}
interface IHTMLWhiteList {
    tagName: string;
    allowed: string[];
}
declare class HTMLCleaner {
    text: string;
    cleanConfig: IHTMLClean;
    constructor(htmlCode: string);
    replaceWiki(): string;
    private applyWiki;
    private replaceCode;
    private replaceTable;
    private replaceList;
    private getListLevel;
    getClean(cleaningLevel?: HTMLCleaner.CleanLevel, keepMatrix?: boolean): string;
    getText(): string;
    setMaxImageSize(): void;
    replaceCount(what: string, wth: string): number;
    replaceNoCount(what: string, wth: string): void;
    replaceTags(cleaningLevel: HTMLCleaner.CleanLevel): number;
    removeTags(): void;
    removeInsideTags(): void;
    cleanInlineStyle(): void;
    cleanClasses(): void;
    private removeProps;
    cleanProperties(): void;
    cleanData(): void;
    removeUseLessStuff(): void;
    handleWordLists(): void;
    private removeSpansWithoutStyle;
    private removeEmpty;
    private unwrapEmptyStuff;
    private removeDivDiv;
}
declare namespace HTMLCleaner {
    enum CleanLevel {
        PurifyOnly = 0,
        Basic = 1,
        Soft = 2,
        Strict = 3,
        BasicSafety = 4,
        StrictDoc = 5
    }
}
declare class ItemTools {
    parseRef(itemRef: string): IItemIdParts;
    getCreator(item: IItem): string;
    getLastEditor(item: IItem): string;
    refListToDisplayString(inputItems: IReference[] | null, prefix: string, shorten?: number): string;
    renderLink(itemId: string, itemTitle?: string, newWindow?: boolean): JQuery;
    updateReferences(oldReferences: IReference[], newReferences: IReference[], fromId: string | null, toId: string | null): IReferenceChange[];
    clone(item: IItemGet, copyLabels: boolean): IItemPut;
    static sort(a: string, b: string): number;
}
declare class JSONTools {
    private cloner2;
    mergeOptions(defaultOptions: IBaseControlOptions, options: IBaseControlOptions): IBaseControlOptions;
    setOptions(newOptions: IBaseControlOptions, options: IBaseControlOptions): IBaseControlOptions;
    isTrue(obj: undefined | null | boolean | string | number): boolean;
    isFalse(obj: undefined | null | boolean | string | number): boolean;
    fromString(str: null | string): {
        status: string;
        value: {};
    };
    clone(src: any): any;
}
interface IChangedLabels {
    changed: boolean;
    added: string[];
    removed: string[];
    delta: string;
}
declare const DOCUMENT_STATUS_LABEL_GROUP_TYPE = "_DOCUMENT_STATUS_";
declare class LabelTools {
    ignoreProjectFilter: boolean;
    private activeFilter;
    getFilterColor(): string;
    getFilter(): string;
    getDisplayName(labelId: string): string;
    getFilterName(labelId: string): string;
    getLabelDefinitions(categories: string[]): ILabel[];
    setFilter(filter: string[]): void;
    resetReviewLabels(labelIds: string[], category: string, addXor?: boolean): string[];
    getDefaultLabels(category: string): string[];
    hasLabels(): boolean;
    setLabels(oldLabelIds: string, labels: string[]): string;
    setLabel(oldLabelIds: string[], label: string): string[];
    unsetLabel(oldLabelIds: string[], label: string): string[];
    compareLabels(before: string[], after: string[]): IChangedLabels;
    protected hasCombinedFilterMenu(): boolean;
    static timeWarpLabel: string;
    protected getLabelList(): ILabel[];
    getLabelNames(): string[];
    protected getDesignReviews(): IDesignReview[];
    getDesignReview(labelId: string): IDesignReview | null;
    isFiltered(category: string, labels: string): boolean;
    getLabelsOfLabelGroupsType(labelGroupType: string): string[];
    getLabelGroups(category?: string): ILabelGroup[];
    protected getGroupOfLabel(labelID: string): ILabelGroup | null;
}
declare class LabelSwitches extends LabelTools {
    private lexist;
    private isFilter;
    private dbClickCounter;
    private dbClickTimer;
    private groups;
    private ui;
    private canEdit;
    private category;
    private currentLabelsOn;
    private mode;
    private valueChanged;
    private item?;
    private restrictEditTo;
    private canAutoFill;
    constructor(ui: JQuery, canEdit: boolean, category: string, currentLabelsOn: string[], mode: string, valueChanged: (clo: string[]) => void, item?: IItem, restrictEditTo?: string[]);
    labelsExist(): boolean;
    private canEditLabel;
    /**
     *  this.ui elements for different label this.groups
     */
    private create_group_or;
    private triggerLabelChanged;
    private create_group_xor;
    private create_group_review;
    private create_group_design_review;
    protected verifyRevisionTable(label: string, revisionTableName: string): JQueryDeferred<unknown>;
    private compareRevisions;
    static getLastTimeLabelWasSet(itemId: string, label: string, beforeRevision: number): JQueryDeferred<unknown>;
    protected getRevisionFromTable(revisionTableVal: string, revisionColumn: string): string;
    protected getUsersFromField(fieldName: string): any;
    protected initPasswordField(name: JQuery, pwd: JQuery): void;
    private add_to_global_dropdown;
    private create_dropdown_group;
    private updateSelection;
    private createButton;
    private createLabel;
}
declare enum SERVER_LOG_LEVEL {
    WEIRD_STATE = "WEIRD_STATE",
    BROKEN_STATE = "BROKEN_STATE"
}
declare class LoggerTools {
    private verbose;
    private lastLogMsg;
    private logData;
    private logIdx;
    private logSize;
    log(id: string, msg: string): void;
    private getCaller;
    private logServer;
    debug(message: string): void;
    info(message: string): void;
    warning(message: string): void;
    error(message: string): void;
    weirdState(message: string): void;
    brokenState(message: string): void;
    getLog(): string;
}
interface IUserDropDown {
    id: string;
    label: string;
}
interface ITestCanned extends IMailConfigCanned {
    [key: string]: string | undefined;
}
interface IUserLookup extends XRUserPermissionType {
    [key: string]: string | number;
}
declare class MailTools {
    /** send mail
    * @param {type} to comma separated list of user ids
    * @param {type} cc comma separated  list of user ids
    * @param {type} bcc comma separated  list of user ids
    * @param {type} subject default subject
    * @param {type} body default body
    * @param {type} systemMail set to 1 to send mail in name of system rather than user
    *
    * @returns {undefined} nothing
    */
    sendMail(to: string, cc: string, bcc: string, subject: string, body: string, systemMail?: number, noSuccess?: boolean): JQueryDeferred<{}>;
    /** show send mail dialog and send mail
    * @param {type} sendTo comma separated list of user ids
    * @param {type} preSelectedUsers available users or null if to use all project users
    * @param {type} subject default subject
    * @param {type} body default body
    * @param {type} includeSupport whether to send it to matrix support
    * @param {type} sendCc
    
    * @returns {undefined} nothing
    */
    sendMailDlg(sendTo: string, preSelectedUsers: XRUserPermissionType[], subject: string, body: string, sendCc: string): void;
    replacePlaceholders(template: string, itemId: string, rejectComment: string, reviewers: string[], readers: string[], trainers: string[], trainees: string[]): string;
    /** get default messages, replace a few strings
     *
     * @param {type} messageId
     * @param {type} itemId
     * @returns {undefined}
     */
    getCannedMessage(messageId: string, to: string, itemId: string, custom?: string): string;
    sendMails(sendTos: string[], subject: string, messages: string[]): void;
    private sendMailsRec;
}
interface IReportTask {
    reportId: string;
    jobId: number;
    progress: number;
    postCreateCallback: Function;
    reportOptions?: IReportOptions;
}
interface IJobList {
    allGood: boolean;
    tasks: IReportTask[];
    doneBatch: number;
}
interface IReportOptions extends IRestParam {
    format?: string;
    reason?: string;
    filter?: string;
    isSignedReport?: boolean;
    includeSignatures?: string;
    newTitle?: string;
    copyFields?: string;
    itemList?: string;
    url?: string;
    resturl?: string;
}
interface IReportTransferField {
    fromId: string;
    toId: string;
}
interface IReportSetField {
    toId: string;
    value: string;
}
interface IGetReportProgressResult {
    status: string;
    progress: number;
    jobFile: IGetReportProgressJobFileResult[];
    visibleName: string;
}
interface IGetReportProgressJobFileResult {
    internalPath: string;
    jobFileId: number;
    mimeType: string;
    restUrl: string;
    visibleName: string;
}
interface IPostCreateSignOrDocResult {
    jobId: number;
}
interface IReportInput {
    to: string;
}
declare class ReportGeneratorTools {
    private reportJoblist;
    private reportProc;
    lastReportXMLs: string[];
    private SaveAndCreate;
    private StartReportEngine;
    private StartReportEngineLaunch;
    private waitForReports;
    private updateAfterCreatingCache;
    private getProgressStatus;
    private getError;
    CreateSignedDoc(docId: string, signatures: string[], signedDocumentsControl: JQuery, labelFilter: string, signName: string, transferFields: IReportTransferField[], defaultLabels: string[], docUpdateCb: (createdDocumentId: string) => void): void;
    createSIGN(target: string, comment: string, docId: string, signatures: string[], signedDocumentsControl: JQuery, labelFilter: string, signName: string, transferFields: IReportTransferField[], defaultLabels: string[], docUpdateCb: (createdDocumentId: string) => void): void;
    protected addSignToTree(target: string, comment: string, itemdetails: IItemGet, signedDocumentsControl: JQuery): void;
    CreateDoc(docId: string, format: IReportOptions, labelFilter: string): void;
    CreateReport(reportId: string, format: IReportOptions, inputItems?: IReportInput[], requiredItems?: IReportInput[]): void;
    DownloadSignedDoc(signedId: string, format: IReportOptions): void;
}
declare class SearchTools {
    private globalFilter;
    private highlightContext;
    getFilter(): string;
    cancelSearch(): void;
    searchInDialog(): void;
    endSearchInDialog(): void;
    highlight(term: string): void;
    hideHighlight(): void;
    renderHighlight(): void;
    private updateTinys;
}
interface ICaptionFormat extends ICaption {
    captionDetails: string;
    captionClass: string;
    referenceClassNo: string;
}
declare class SmartTextTools {
    private figureDef;
    private tableDef;
    createMenu(docMode: boolean, tableMode: boolean): void;
    deleteTag(what: string): void;
    insertFigReference(reference: string, editor: any, editable: any): void;
    insertTabReference(reference: string, editor: any, editable: any): void;
    pasteBuffer(editor: any, editable: any): void;
    private insertReference;
    createCaption(isTable: boolean, editor: Summernote.editor, editable: any): void;
    updateCaptionsAndReferences(): void;
    createEditTag(tagType: number, what: string, data?: ISmartTextConfigReplacement, saveFct?: Function, forceTiny?: boolean): void;
    selectEditCreateTag(mode: number, tagType: number, tagSelected: Function): void;
    private calculateButtonEnableInsert;
    private calculateButtonEnable;
    removeOuterParagraph(edit: string): string;
    private addSelect;
    private addEnter;
    replaceTextFragments(text: string, showTooltips?: boolean, encoded?: boolean): string;
    private resolveRec;
    showTooltips(node: JQuery, noContainer?: boolean): void;
    prepareForReadReadRender(itemDetails: JQuery): void;
    private getTooltipType;
    private getCurrentConfig;
    private updateTags;
    private saveTag;
    private getReplacement;
}
interface IToolTipCache {
    date: Date;
    item: IItem;
}
interface IDropDownButtonOption {
    name: string;
    class?: string;
    click: Function;
}
interface IDialogOptions {
    container: JQuery;
    title: string;
    buttons: any[];
    content?: JQuery;
    minMaxWidth?: number;
    minMaxHeight?: number;
    scrolling?: UIToolsEnum.Scroll;
    autoResize?: boolean;
    maximizeButton?: boolean;
    noXButton?: boolean;
    onClose?: Function;
    onOpen?: Function;
    onResize?: Function;
    noCloseOnEscape?: boolean;
}
interface ICIColor {
    color: string;
    alternateColor: string;
}
interface ICIColorList {
    [key: string]: ICIColor;
}
declare enum CIColors {
}
declare class UIToolsEnum {
    fixC3ForCopy(copied: JQuery): void;
    static CIColors: ICIColorList;
    static CIColorsGrey: ICIColorList;
    static allGrey: string[];
    static CIColorsPrimary: ICIColorList;
    private tooltip_cache;
    private lastTooltipRequest;
    private lastTooltipHide;
    private hidden_tooltip_itemId;
    private removeTimer;
    widgetPluginsContainer: WidgetPluginsContainer;
    createDropDownButton(defaultText: string, options: IDropDownButtonOption[], isUp: boolean, isJui: boolean, buttonId?: string, disableDefaultButtonClick?: boolean): JQuery;
    getNiceDialogSize(minWidth: number, minHeight: number): {
        width: number;
        height: number;
    };
    showSuccess(messageTitle: string, hideAfter?: number): void;
    hideSuccess(): void;
    hideError(): void;
    showError(messageTitle: string, messageBody: string, showForMS?: number): void;
    /**
     * show acknowledge dialog
     * @param ackId: a (unique) value > 0 can be used as unique id to have acknowledge boxes which are shown only one
     * @param messageTitle
     * @param dlgTitle
     */
    showAck(ackId: number, messageTitle: string, dlgTitle?: string): void;
    showConfirm(confId: number, messageInfo: {
        title: string;
        ok: string;
        nok?: string;
        third?: string;
    }, confFunction: Function, noConfFunction: Function, thirdFunction?: Function): void;
    confirmSpinningWait(message: string): void;
    closeConfirmSpinningWait(): void;
    showTooltip(itemId: string, target: JQuery, event: Event, crossProject?: string): void;
    showTaskAsTooltip(id: string, title: string, url: string, htmlContent: string, target: JQuery): void;
    hideTooltip(now?: boolean): void;
    updateTooltip(): void;
    spaceMessage(userHasSpaces: boolean, passwordHasSpaces: boolean): string;
    getSpinningWait(message?: string): JQuery;
    setEnabled(button: JQuery, enabled: boolean): void;
    getDisplayError(jqxhr: IJcxhr, textStatus: string, error: string): string;
    showDialog(dlg: JQuery, title: string, content: JQuery, minMaxWidth: number, minMaxHeight: number, buttons: any[], // DialogButtonOptions 
    scrolling: UIToolsEnum.Scroll, autoResize?: boolean, maximizeButton?: boolean, close?: Function, open?: Function, resize?: Function, noCloseOnEscape?: boolean): void;
    showDialogDes({ maximizeButton, noXButton, autoResize, onClose, onOpen, onResize, noCloseOnEscape, minMaxWidth, minMaxHeight, scrolling, content, container, title, buttons }: IDialogOptions): void;
    pushDialog(thisDialog: JQuery): void;
    popDialog(thisDialog: JQuery): void;
    copyBuffer(anchor: JQuery, tooltip: string, content: JQuery, catchKey?: JQuery, onProcessCopy?: Function, btnText?: string, beforeCopy?: Function, afterCopy?: Function): void;
    toolIcons: string[];
    getIconOptions(): {
        id: string;
        label: string;
    }[];
    private colorScheme;
    calculateColorFrom(input: string): ICIColor;
    getAvatar(info: string, size: number): JQuery;
    doCopy(content: JQuery, onProcessCopy: Function): void;
    private countVisibleDialogs;
    DateTime: DateTimeUI;
    BlockingProgress: BlockingProgressUI;
    SelectUserOrGroup: SelectUserOrGroupUI;
    Progress: ProgressUI;
    ThemeSelector: ThemeSelector;
    private getSlideHeight;
    private showSlide;
    private hideSlide;
    private getItemHtmlFromCacheOrServerAsync;
    private renderItem;
    private renderCrossItem;
    private hideCurrentToolTip;
    private showTaskAsTooltip_Delayed;
    private showTooltip_Delayed;
    enableIf(cb: JQuery, state: boolean, ctrls: JQuery[]): void;
    addCheckboxD(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, defaultValue: string): JQuery;
    addCheckbox(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function): JQuery;
    /** checkbox will only be checked if explicitly be set to true*/
    addCheckboxIsTrue(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function): JQuery;
    /** checkbox will only checked if NOT explicitly be set to false (so unchanged=default=checked) */
    addCheckboxIsFalse(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function): JQuery;
    addPassInput(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, onUnFocus?: Function): JQuery;
    addTextInput(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, onFocusOut?: Function, isPass?: boolean, help?: string, readonly?: boolean): JQuery;
    addRichTextInput(ui: JQuery, params: IRichTextParams, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, onFocusOut?: Function): JQuery;
    addDateSelect(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, help?: string, readonly?: boolean): JQuery;
    addIconInput(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, onChange: Function, onFocusOut?: Function, isPass?: boolean): JQuery;
    addDropdownToArray(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, options: IDropdownOption[], grouping: IDropdownGroup[], maxItems: number, create: boolean, sort: boolean, onChange: Function, placeholder?: string): JQuery;
    addDropdownToValue(ui: JQuery, text: string, fieldParams: IGenericMap, propertyName: string, options: IDropdownOption[], create: boolean, sort: boolean, onChange: Function, placeholder?: string, paramsBase?: IDropdownParams): JQuery;
    getPageTitle(title: string, getPanel?: () => JQuery, resize?: () => void): JQuery;
    createConfigLine(lineId: string, linePrefix: string, lineName: string, lineArray: any[], idProp: string, onChangedOrder: () => void, onEdit: (lineId: string) => void, needsEdit: boolean, onDelete: (lineId: string) => void): JQuery;
    fixArrows(ul: JQuery): void;
    createConfigAddLine(action: string, onAdd: () => void): JQuery;
    protected getIndex(lineArray: any[], idProp: string, lineId: string): number;
    protected moveUp(moveBtn: JQuery): any;
    protected moveDown(moveBtn: JQuery): any;
}
interface ITimeZoneOption {
    val: string;
    text: string;
    timeformat?: string;
    dateformat?: string;
}
interface ITimeZoneSetting {
    [key: string]: string | ITimeZoneOption[] | undefined;
    timeZoneOptions: ITimeZoneOption[];
    settingsSource: string;
    timeformat?: string;
    dateformat?: string;
    timezone?: string;
}
interface IMoment {
    format(f?: any): string;
    valueOf(): number;
    isValid(): boolean;
    date(i?: number): any;
    day(i?: number): any;
    month(i?: number): any;
    year(i?: number): any;
    second(i?: number): any;
    minute(i?: number): any;
    hour(i?: number): any;
    toDate(): Date;
    fromNow(): String;
}
declare function moment(val?: any, format?: any): IMoment;
declare class DateTimeUI {
    private userDateTimeFormat;
    private userDateOnlyFormat;
    private userTimezone;
    private simpleDateTimeFormat;
    private simpleDateFormat;
    private dateIso8601FromServer;
    private dateUserFromServer;
    private serverDateTimeFormat;
    private serverDateOnlyFormat;
    private serverTimezone;
    private simpleCustomerDateTimeFormat;
    private simpleCustomerDateFormat;
    private showControls;
    private initAsync;
    private renderDateTimeFormat;
    private showTime;
    private setSetting;
    private renderTimeZone;
    private renderTimeZoneWarning;
    private isValidDate;
    initDateTimeSettings(update?: boolean): JQueryDeferred<{}>;
    renderHumanDate(date: Date, dateOnly?: boolean): string;
    renderCustomerHumanDate(date: Date, dateOnly?: boolean): string;
    renderHumanMonth(dateObj: Date): string;
    renderDashFormat(dateObj: Date): string;
    renderSettingControls(options: {
        table: JQuery;
        user: string;
        help: string;
    }): void;
    renderSettingDialog(user: string): void;
    requiresTimeZoneWarning(): boolean;
    getTimeZoneCTA(): JQuery;
    getSimpleDateFormat(): string;
    getSimpleDateFormatMoment(): string;
    getSimpleDateTimeFormatMoment(): string;
    private toMoment;
}
interface IBlockingProgressUITask {
    name: string;
    progress?: number;
}
declare class BlockingProgressUI {
    private progressLauncher;
    private animation;
    private taskList;
    private closeIfDone;
    Init(tasks: IBlockingProgressUITask[], animate?: boolean): void;
    SetProgress(taskIdx: number, percent: number, newText?: string): void;
    SetProgressError(taskIdx: number, problem: string): void;
    private tick;
}
declare class ProgressUI {
    private ProgressCtrlTimer;
    Init(message: string, warning?: boolean): void;
    Update(progress: number): void;
    SuccessHide(message: string, ms: number): void;
    ErrorHide(message: string, ms: number): void;
}
declare class SelectUserOrGroupUI {
    dlg: JQuery;
    constructor();
    showMultiUserSelect(container: JQuery, help: string, selected: string[], title: string, selectFrom: string, selectTo: string, showUsers: boolean, showGroups: boolean, onSelect: (selection: string[]) => void, preSelectedUsers?: XRUserPermissionType[]): void;
    getUsersInSelection(selection: string[]): string[];
    getGroupId(group: XRGroupPermissionType | XRGroupType): string;
    getGroupDisplayNameFromId(groupOrUserId: string): string;
    isGroup(groupOrUserId: string): boolean;
    exists(groupOrUserId: string): boolean;
    showSelectDialog(selected: string[], title: string, selectFrom: string, selectTo: string, showUsers: boolean, showGroups: boolean, onSelect: (selection: string[]) => void, preSelectedUsers?: XRUserPermissionType[]): void;
    getUserDropDownOptions(showUsers: boolean, showGroups: boolean, preSelectedUsers?: XRUserPermissionType[]): IDropdownOption[];
    showSingleSelect(control: JQuery, showUsers: boolean, showGroups: boolean, onSelect: (selection: string) => void, preSelectedUsers?: XRUserPermissionType[]): void;
    getAllUsersAndGroups(): JQueryDeferred<IDropdownOption[]>;
    protected combinedName(user: XRUserPermissionType): string;
    showSingleSelectDialog(selected: string, title: string, help: string, showUsers: boolean, showGroups: boolean, onSelect: (selection: string) => void, preSelectedUsers?: XRUserPermissionType[]): void;
    private resize;
}
declare module UIToolsEnum {
    enum Scroll {
        Auto = 0,
        Vertical = 1,
        None = 2
    }
}
interface IMatrixUrlParts {
    project: string;
    item: string;
    params: IStringMap;
}
declare class URLTools {
    getParameterByName(url: string, name: string): string | null;
    parseUrl(url: String): IMatrixUrlParts;
}
interface IXPathToolsComp {
    name?: string;
    position: number;
}
declare class XPathTools {
    get(node: JQuery): string;
    hardCopy(element: JQuery): string;
}
interface IPanel {
    destroy: Function;
    title: string;
}
interface IItemPanelOptions {
    control: JQuery;
    itemId: string;
    changed: Function;
    cachedItem: IItem;
}
declare class Application {
    lastMainItemForm: ItemControl;
    protected currentPanel: IPanel;
    protected currentPrintPanel: IPanel;
    protected saveEnabled: boolean;
    currentItem: IItem;
    protected currentItemForcedReadonly: boolean;
    protected isSaving: boolean;
    constructor();
    saveSave(): void;
    updateMainUI(disabled?: boolean): void;
    setSaveCancelState(enabled: boolean, quietCancel: boolean): void;
    editConfiguration(): void;
    destroyOldControls(): void;
    updateControl(watcherInfo: IItemWatched, itemChanged: (needsSave: boolean) => void): void;
    forceReadonly(itemId: string): void;
    createControl(folderType: string, itemId: string, itemChanged?: (needsSave: boolean) => void, cachedItem?: IItem): void;
    renderErrorControl(control: JQuery, header: string, text: string, contextFrame?: boolean): void;
    private createItemControlCached;
    private createItemControl;
}
interface ILineEditorLine {
    id?: string;
    key?: number;
    help: string;
    explanation?: string;
    value: string;
    type: string;
    options?: IDropdownOption[];
    multiple?: boolean;
    groups?: IDropdownGroup[];
    columns?: ITableControlOptionsColumn[];
    noEdit?: boolean;
    readonly?: boolean;
    hide?: boolean;
    required?: boolean;
}
declare class LineEditorExt {
    constructor();
    showDialog(title: string, height: number, input: ILineEditorLine[], onOk: (update: ILineEditorLine[]) => boolean, width?: number, showUserAndGroupsSelectWithDialog?: (container: JQuery, showUsers: boolean, showGroups: boolean, help: string, empty: string, selected: string[], dialogTitle: string, onSelect: (selection: string[]) => void) => void): void;
    static mapToKeys(results: ILineEditorLine[]): ILineEditorLine[];
    private setEnabled;
    private getValue;
    private isEnabled;
}
interface IValidationSpec {
    validationFunction?: JsonEditorValidation | null;
    schema?: string;
    apiHelp?: string;
}
declare class JsonEditor {
    constructor();
    showDialog(title: string, value: string, onOk: (update: string) => void, semanticValidate?: IValidationSpec): void;
}
interface IItemControlOptions extends IBaseControlOptions {
    id?: string;
    control?: JQuery;
    type?: string;
    item?: IItemGet;
    dummyData?: {};
    parent?: string;
    changed?: Function;
    isForm?: boolean;
    isItem?: boolean;
    isPrint?: boolean;
    isHistory?: number;
    isDialog?: boolean;
    canEdit?: boolean;
    canEditLabels?: boolean;
    canEditTitle?: boolean;
}
interface ILinkType {
    type: string;
    name?: string;
    buttonName?: string;
    folder?: boolean;
    import?: boolean;
    required?: boolean;
}
declare class ItemControl {
    private settings;
    private defaultOptions;
    private resizeItTimer;
    controls: IControlDefinition[];
    private _title;
    private _riders;
    private _outerbody;
    private _body;
    private config;
    private title;
    private links;
    private orginalControlState;
    private startEdit;
    private duringFill;
    private restrictUnlockTo;
    static lastTab: IStringNumberMap;
    constructor(options: IItemControlOptions);
    destroy(): void;
    getValues(update: IItemPut, latest?: IItemGet): IItemPut;
    saveAsync(category: string, auditAction: string, valueOverwrites?: IItemGet): JQueryDeferred<IDBParent | IItemGet>;
    addMove(itemId: string, newVersion: number): void;
    resizeItem(force?: boolean): void;
    fillControls(): void;
    needsSave(): boolean;
    hasTitle(): boolean;
    updateItem(newItem: IItem): void;
    setFieldValue(fieldId: number, newValue: string): void;
    getFieldValue(fieldId: number): any;
    getCurrentTitle(): any;
    setViewers(viewers: IItemWatched): void;
    getControls(fieldType?: string): JQuery[];
    /** returns (first) control with a given title */
    getControlByName(name: string): JQuery;
    /** returns control with a given id */
    getControlById(fieldId: number): JQuery;
    wasUpdated(itemId: string, historyLength: number): boolean;
    private addTabs;
    private showTab;
    private allowSectionClose;
    resizeIt(forceRedraw?: boolean): void;
    private needsSaveImpl;
    private getFieldType;
    private sendNeedsSave;
    private renderActionButtonsReport;
}
interface IShortcut {
    disableEdge: boolean;
    disableSafari: boolean;
    withCtrl: boolean;
    keyCode: number;
    key: string;
    help: string;
    category: string;
    inElement: string[];
    notInElement: string[];
    fct: (event: JQueryEventObject, that?: KeyboardShortcuts) => void;
}
interface IShortCutOverWrite {
    orgCtrl: boolean;
    newCtrl: boolean;
    orgKey: string;
    newKey: string;
    orgKeyCode: number;
    newKeyCode: number;
}
declare class KeyboardShortcuts {
    private lastKeyDown;
    private shortCuts;
    private documentSectionIdx;
    constructor();
    private defineShortcuts;
    print(): void;
    resetCustomKeys(): void;
    setKey(orgCtrl: boolean, newCtrl: boolean, orgKey: string, newKey: string): void;
    setKeyCode(orgCtrl: boolean, newCtrl: boolean, orgKeyCode: number, newKeyCode: number): void;
    addCtrlShortcut(key: string, category: string, help: string, inElement: string[], notInElement: string[], fct: (event: JQueryEventObject, that?: KeyboardShortcuts) => void, disableEdge: boolean, disableSafari: boolean): void;
    addShortcut(key: string, category: string, help: string, inElement: string[], notInElement: string[], fct: (event: JQueryEventObject, that?: KeyboardShortcuts) => void, disableEdge: boolean, disableSafari: boolean): void;
    addCtrlShortcutCode(keyCode: number, category: string, key: string, help: string, inElement: string[], notInElement: string[], fct: (event: JQueryEventObject, that?: KeyboardShortcuts) => void, disableEdge: boolean, disableSafari: boolean): void;
    addShortcutCode(keyCode: number, category: string, key: string, help: string, inElement: string[], notInElement: string[], fct: (event: JQueryEventObject, that?: KeyboardShortcuts) => void, disableEdge: boolean, disableSafari: boolean): void;
    init(): void;
    private isGoodTarget;
    private isDialogOpen;
    private static isDialogOpen;
    private showInReview;
    private showZen;
    private save;
    static doSave(): void;
    private createSelect;
    private toggleSections;
    private delete;
    private initToggleSection;
    private toggleSection;
    private downloadDocument;
    private focusSearch;
    private help;
}
interface INavigationBar {
    disableTabs: boolean;
    tabs: INavigationBarTab[];
}
interface INavigationBarRuntime extends INavigationBar {
    tabs: INavigationBarTabRuntime[];
}
interface INavigationBarTab {
    name: string;
    icon: string;
    mode: TabMode;
    other: string[];
}
interface INavigationBarTabRuntime extends INavigationBarTab {
    node?: JQuery;
    trees?: JQuery[];
    isActive?: boolean;
}
interface IStringTabMap {
    [key: string]: INavigationBarTab;
}
declare enum TabMode {
    ShowAsDefault = 1,
    HideAsDefault = 2
}
declare class NavigationBar {
    static navbarWidth: number;
    protected rootTabMap: IStringTabMap;
    protected workFolders: string[];
    protected enabled: boolean;
    protected bar: INavigationBarRuntime;
    protected helpButton: JQuery;
    static getDefaultBar(project: string): INavigationBar;
    constructor();
    init(): void;
    isEnabled(): boolean;
    isInCurrentTab(itemId: string): boolean;
    getCurrentTab(): string;
    countPerTab(itemIds: string[]): ISearchCountsTab[];
    activateItemsTab(itemId: string): void;
    updateNotificationCounters(): void;
    protected drawNavigationBar(): void;
    setWorkFolders(folders: string[]): void;
    protected resizeBarItems(): void;
    protected createTabs(): void;
    switchTab(tabName: string): boolean;
    protected activateTab(tab: INavigationBarTabRuntime): void;
    private getTab;
}
declare let NavBar: NavigationBar;
interface IUIMap {
    [key: string]: JQuery;
}
interface IKeyTitle {
    key: string;
    title: string;
}
declare class ListView {
    private control;
    private hits;
    private selected;
    private projectWarn;
    private panel;
    private sRoot;
    private uRoot;
    private nodes;
    private noSelected;
    constructor(panel: ProjectView);
    show(): void;
    hide(): void;
    setSelectedItems(selectedItems: string[]): void;
    redrawItem(itemId: string): void;
    filterList(match: string): ISearchCounts;
    showSearchResults(serverSearchResults: string[]): ISearchCounts;
    selectAll(setSelected: boolean): void;
    private getTitleFromTree;
    private showNodes;
    private createNode;
    getFancyRootNode(): Fancytree.FancytreeNode;
    getFancyTree(): Fancytree.Fancytree;
}
interface ISearchCounts {
    current: number;
    total: number;
    perTab: ISearchCountsTab[];
}
interface ISearchCountsTab {
    tabName: string;
    count: number;
}
declare class ProjectTree {
    private hits;
    private allHits;
    private lastFilterFct;
    private panel;
    private canBeFiltered;
    private lt;
    private lit;
    private legacyColors;
    constructor(panel: ProjectView, canBeFiltered: boolean);
    show(): void;
    hide(): void;
    setSelectedItems(selectedItems: string[]): void;
    applyFilter(): void;
    redrawItem(itemId: string): void;
    openTree(key: string): void;
    closeTree(key: string): void;
    selectAll(isSelected: boolean): void;
    selectChildren(node: Fancytree.FancytreeNode): void;
    unSelectChildren(node: Fancytree.FancytreeNode): void;
    unselectParents(node: Fancytree.FancytreeNode): void;
    setHideMismatches(hideMismatches: boolean): void;
    forcePartial(): void;
    filterTree(match?: string): ISearchCounts;
    removeFilter(): number;
    showSearchResults(serverSearchResults: string[]): ISearchCounts;
    getFancyRootNode(): Fancytree.FancytreeNode;
    getFancyTree(): Fancytree.Fancytree;
    getNode(key: string): Fancytree.FancytreeNode;
    removeNode(key: string): void;
    setTitle(key: string, title: string): boolean;
    select(key: string): void;
    isSelected(key: string): boolean;
    updateRec(item: IDB): void;
    insertRec(parentKey: string, item: IDB): void;
    moveNode(parentId: string, itemId: string, position: number): void;
    addNode(treeNode: Fancytree.FancytreeNode, item: IDB, position?: {
        at: number;
    }): Fancytree.FancytreeNode;
    treeFromDb(dbTree: IDB[]): void;
    updateItemIsUnselected(itemId: string, isUnselected: boolean): boolean;
    updateNotificationCounters(): void;
    private addNodes;
}
interface IProjectPanelControlOptions extends IBaseControlOptions {
    parameter?: {
        readonly?: boolean;
        placeholder?: string;
        maxItems?: number;
        options?: any;
    };
    noAnimation?: boolean;
    dragAndDrop?: boolean;
    controlState?: ControlState;
    highlight?: boolean;
    canFilter?: boolean;
    isConfigSearch?: boolean;
    serverSearch?: boolean;
    expand?: number;
    tree?: IDB[];
    tooltips?: boolean;
    collectionChanged?: (count: number) => void;
    selectionChanged?: (id: string) => void;
    onExpand?: (id: string) => void;
    dropCallback?: Function;
    crossProject?: string;
    selectedItems?: IReference[];
    selectMode?: SelectMode;
    glueToBottom?: boolean;
    isMainTree?: boolean;
    autoScroll?: boolean;
}
declare enum SelectMode {
    /*** DO NOT CHANGED numbers use from baseControl */
    none = 0,
    items = 1,
    folders = 2,
    singleItem = 3,
    singleFolder = 4,
    independent = 5,
    auto = 6,
    independentAuto = 7,
    autoPrecise = 8
}
interface MyNodeData extends Fancytree.FancytreeNode {
    cstrender?: boolean;
    background?: string;
    shortTitle?: string;
    border?: string;
    type?: string;
    icon?: string;
    hideCheckbox?: boolean;
    isUnselected?: boolean;
    extraStyle?: string;
    classes?: string[];
}
interface MyNode extends Fancytree.FancytreeNode {
    selected?: boolean;
    unselectable?: boolean;
    ul?: JQuery;
    span?: JQuery;
    type?: string;
    subMatch?: boolean;
    shortTitle?: string;
}
interface MyDDData {
    otherNode?: MyNode;
    hitMode?: string;
}
interface MyFancytree extends Fancytree.Fancytree {
    options?: Fancytree.FancytreeOptions;
}
interface MyFancytreeOption extends Fancytree.FancytreeOptions {
    filter?: {
        mode?: string;
    };
}
declare enum SearchState {
    NoSearch = 0,
    FilterDone = 1,
    ServerRunning = 2,
    ServerDone = 3
}
declare enum SearchUpdate {
    inserted_node = 1,
    updated_rec = 2,
    filter_status_changed = 3,
    title_changed = 4,
    item_dropped = 5
}
interface IVizMode {
    uid: string;
    icon: string;
    text: string;
    mainTree: boolean;
    asList: boolean;
    hide: boolean;
    check: boolean;
    expand: boolean;
}
interface IDelayedAction {
    type: string;
    expression: string;
}
interface JQuery {
    projectView?: (options: IProjectPanelControlOptions) => JQuery;
}
declare class ProjectView implements IBaseControl {
    settings: IProjectPanelControlOptions;
    viewModeSelector: ViewModeSelector;
    searchBox: SearchBox;
    projectTree: ProjectTree;
    listView: ListView;
    prefixCategory: string;
    tree: JQuery;
    private _root;
    needsLatest: boolean;
    constructor(control: JQuery);
    init(options: IBaseControlOptions): void;
    private forceSelectChildren;
    hasChanged(): boolean;
    getValue(): IReference[];
    setValue(selectedItems: string[]): void;
    toggleSelection(selected: boolean): void;
    destroy(): void;
    resizeItem(): void;
    clearFilter(): void;
    filterStatusChanged(itemId: string): void;
    insertNode(parentKey: string, item: IDB, position: {
        at: number;
    }): void;
    moveNode(parentId: string, itemId: string, position: number): void;
    refresh(): void;
    updateRec(item: IDB): void;
    insertRec(parentKey: string, item: IDB): void;
    updateTopPosition(top: number): void;
    appendController(controller: JQuery): void;
    render(subtree?: number, itemId?: string, item?: IDB): void;
    openTree(key: string): void;
    closeTree(key: string): void;
    setTitle(key: string, title: string): void;
    removeNode(key: string): void;
    select(key: string): void;
    isSelected(key: string): boolean;
    updateItemIsUnselected(itemId: string, isUnselected: boolean): void;
    updateNotificationCounters(): void;
    private saveSelection;
    private calculateDropTarget;
}
declare class SearchBox {
    private spinnerServerSearch;
    private currentStatus;
    private currentResults;
    private currentSearchExpression;
    private delayedAction;
    private panel;
    private filterHighlight_timeout;
    private filterSearch_timeout;
    private searchMetaInfo;
    private isEnabled;
    private isConfigSearch;
    private savedSearchIndex;
    constructor(panel: ProjectView);
    updateHeights(): void;
    renderSearchField(filter: JQuery, enableServerSearch: boolean, highlightResults: boolean, isConfigSearch: boolean): void;
    private setPrefixCategory;
    render(): void;
    protected showMatches(matches: ISearchCounts, localSearch: boolean): void;
    resetSearch(): void;
    private getMiracleControl;
    addToSavedSearch(str: string, filter: JQuery): void;
    getSavedSearches(): string[];
    private filterAgainExpression;
    private filter;
    private filterAgain;
    private search;
    private doDelayed;
    private showSearchStatus;
    private updateSearchStatusHeights;
}
declare class ViewModeSelector {
    private isMainTree;
    private btn;
    private img;
    private searchVizModes;
    private panel;
    constructor(panel: ProjectView);
    private selectFoldersOnly;
    getVizModeControl(onChange: Function): JQuery;
    setEnabled(enabled: boolean): void;
    showAsList(): boolean;
    hideMismatches(): boolean;
    isExpandTree(): boolean;
    private getMode;
    private setMode;
}
interface ITableParams {
    canBeModified?: boolean;
    create?: boolean;
    showLineNumbers?: boolean;
    maxRows?: number;
    fixRows?: number;
    readonly_allowfocus?: boolean;
    columns: any;
    onCellChanged?: Function;
}
interface IBaseControl {
    getValue: (latestItem?: IItemGet) => any;
    hasChanged: () => boolean;
    resizeItem: (width?: number, forceRedraw?: boolean) => void;
    destroy: () => void;
    getText?: Function;
    getValueRaw?: Function;
    setValue?: Function;
    updateItem?: Function;
    linksToCreate?: Function;
    labelsToSet?: Function;
    redraw?: Function;
    refresh?: Function;
    needsLatest: boolean;
    requiresContent?: () => boolean;
    disableDelayedShow?: boolean;
}
interface IBaseControlOptions {
    [key: string]: any;
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldType?: string;
    fieldId?: number;
    valueChanged?: Function;
    parameter?: IFieldParameter;
    fieldValue?: any;
    fieldValueJSON?: {};
    isItem?: boolean;
    item?: IItem;
    isForm?: boolean;
    isPrint?: boolean;
    isTooltip?: boolean;
    id?: string;
    isHistory?: number;
    type?: string;
    isFolder?: boolean;
    requiresContent?: boolean;
}
declare abstract class BaseControl implements IBaseControl {
    protected _root: JQuery;
    disableDelayedShow: boolean;
    needsLatest: boolean;
    constructor(control: JQuery);
    protected createHelp(settings: IBaseControlOptions): JQuery;
    abstract getValue(): any;
    abstract hasChanged(): boolean;
    abstract resizeItem(newWidth?: number, force?: boolean): void;
    abstract destroy(): void;
}
interface IGenericTableRow {
    [key: string]: string;
}
declare type IGenericTableData = IGenericTableRow[];
declare class PrintProjectUIMods implements IPlugin {
    isDefault: boolean;
    static getMenu(): string;
    static addTinyMenus(editor: any, valueChanged: Function, category: string): void;
    private _item;
    private _jui;
    private codeFieldId;
    private enabledProject;
    initItem(item: IItem, jui: JQuery): void;
    initProject(): void;
    subscribe(): void;
    private saveToInstance;
    private convertPrintToJson;
    private getTableBefore;
    private getTableAfter;
    private getTable;
    private rowBefore;
    private rowAfter;
    private getSubTableCells;
    private getTableItemRow;
    private getTableItemRowSubtable;
    private toPrintScript;
    private wrapRenderItems;
    private getBeforeAfter;
    private toJSON;
    private toXML;
    private toText;
}
interface ICascadingSelectOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        cascadingOptions?: ICascadingSelect;
    };
}
interface JQuery {
    cascadingSelect?: (options: ICascadingSelectOptions) => JQuery;
}
interface ICascadingOptionSelector {
    groupId: string;
    groupValue: string;
}
declare class CascadingSelect extends BaseControl {
    private settings;
    private optionsChain;
    constructor(control: JQuery);
    init(options: ICascadingSelectOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    getGuid(): string;
    private completeChain;
    private getGroup;
    private renderControls;
    private updateControls;
}
interface ICheckBoxControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        inlineHelp?: string;
        initialContent?: boolean;
    };
}
interface JQuery {
    checkBox?: (options: ICheckBoxControlOptions) => JQuery;
}
declare class CheckBoxImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: ICheckBoxControlOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(value: boolean): void;
    destroy(): void;
    resizeItem(): void;
}
interface IColorPickerParams {
    externalHelp?: string;
    readonly?: boolean;
    allowResize?: boolean;
    requiresContent?: boolean;
    inlineHelp?: string;
    initialContent?: string;
    hideFullscreen?: boolean;
}
interface IColorPickerControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    lostFocus?: Function;
    parameter?: IColorPickerParams;
}
interface JQuery {
    colorPicker?: (options: IColorPickerControlOptions) => JQuery;
}
declare class ColorPickerImpl extends BaseControl {
    private settings;
    private lastValueChanged;
    private _editor;
    private doesRequireContent;
    constructor(control: JQuery);
    init(options: IColorPickerControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    requiresContent(): boolean;
    refresh(): void;
    setValue(newValue: string, reset?: boolean): void;
    destroy(): void;
    resizeItem(): void;
    private valueChanged;
}
interface IDateSelectParams {
    allowClear?: boolean;
    readonly?: boolean;
    vertical?: string;
    horizontal?: string;
    minDate?: Date;
    requiresContent?: boolean;
    initialContent?: boolean;
    inlineHelp?: string;
}
interface IDateSelectOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IDateSelectParams;
}
interface JQuery {
    dateselect?: (options: IDateSelectOptions) => JQuery;
}
declare class DateSelectImpl extends BaseControl {
    private settings;
    private data;
    private lastSelectedDate;
    private ctrl;
    private doesRequireContent;
    constructor(control: JQuery);
    init(options: IDateSelectOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(date: string): void;
    destroy(): void;
    resizeItem(): void;
    requiresContent(): boolean;
    private setDateFromString;
    static getDateFromString(dateStr: string): Date;
    private valueChanged;
    private renderHuman;
}
interface ISignaturesInfo {
    signatures: ISignature[];
    missing: string[];
    given: string[];
    signatureDate: {
        [key: string]: string;
    };
    missingSignatures: number;
    givenSignatures: number;
    needSignature: boolean;
    hasSignature: boolean;
    isTemplate: boolean;
}
declare abstract class DocBaseImpl extends BaseControl {
    constructor(control: JQuery);
    static readSignatureInfo(item: IItemGet): ISignaturesInfo;
    static isMeTest(user: string): boolean;
    protected isMe(user: string): boolean;
}
interface IDocFilterOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {};
}
interface JQuery {
    docFilter?: (options: IDocFilterOptions) => JQuery;
}
declare class DocFilterImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: IDocFilterOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(): void;
    destroy(): void;
    resizeItem(): void;
}
interface IDocReviewOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        hideReview?: boolean;
        allowModifyOthers?: boolean;
    };
}
interface IReviewData {
    inlineComments: IInlineComment[];
}
interface IInlineComment {
    ranges: IInlineCommentRange[];
    quote: string;
    text: string;
    id: string;
    changedBy: string;
    createdBy: string;
    changedAt: string;
    createdAt: string;
    highlights?: JQuery[];
}
interface IInlineCommentRange {
    start: string;
    startOffset: number;
    end: string;
    endOffset: number;
}
interface IAnnotationChange {
    action: string;
    value: IInlineComment;
}
interface JQuery {
    docReview?: (options: IDocReviewOptions) => JQuery;
}
interface ISignature {
    userid: string;
    signDate: string;
    signDateCustomer?: string;
    signaturefileid: string;
}
interface ISignatureChange {
    action: string;
    value: string;
}
declare class DocReviewImpl extends DocBaseImpl {
    private settings;
    private data;
    private annotationRecording;
    private commentSortedBy;
    private uiCtrl;
    private reportBuffer;
    constructor(control: JQuery);
    init(options: IDocReviewOptions): void;
    hasChanged(): boolean;
    getValue(currentItem?: IItemGet): string;
    destroy(): void;
    resizeItem(): void;
    private applyRecordings;
    private parseValue;
    /********************************************
     
     ******************************************** */
    protected reviewButton(signatureStatus: ISignaturesInfo): void;
    recordAnnotation(action: string, annotation: IInlineComment): void;
    protected showReviewComments(canEdit: boolean, comments: IInlineComment[]): void;
    private showReportWithComments;
    private showComments;
    sortCommentsBy(sortBy: number): void;
}
declare class HTMLAnnotator {
    private annotationsBefore;
    private annotationsAfter;
    private commentSortedBy;
    constructor();
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    static mergeAnnotation(serverVersion: string, localBefore: string, localAfter: string): string;
    static hasAnnotations(reviewComments: string): boolean;
    showReviewDialog(canEdit: boolean, itemId: string, version: number, data: IItem, reviewComments: string, isSuperUser: boolean, onUpdate: Function): void;
    protected recordAnnotation(action: string, annotation: IInlineComment): void;
    private showHTMLWithComments;
    private showCommentList;
    private sortCommentsBy;
}
declare function getAnnotation(obj: IInlineComment): IInlineComment;
interface IDocSignOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        inlineHelp?: string;
    };
}
interface ISignData {
    rejectComments: ISignComment[];
    acceptComments: ISignComment[];
}
interface ISignComment {
    user: string;
    comment: string;
    createdAt: string;
}
interface JQuery {
    docSign?: (options: IDocSignOptions) => JQuery;
}
interface ISignature {
    userid: string;
    signDate: string;
    signDateCustomer?: string;
    signaturefileid: string;
}
interface ISignatureChange {
    action: string;
    value: string;
}
declare class DocSignImpl extends DocBaseImpl {
    protected settings: IDocSignOptions;
    private data;
    private uiCtrl;
    private static iHaveSignature;
    private static iUser;
    constructor(control: JQuery);
    init(options: IDocSignOptions): void;
    hasChanged(): boolean;
    getValue(currentItem?: IItemGet): string;
    destroy(): void;
    resizeItem(): void;
    private parseValue;
    protected addSignMeaning(uiCtrl: JQuery): void;
    protected renderSignatureTable(signatureInfo: ISignaturesInfo, uiCtrl: JQuery, notSigned: string, youSign: string, signedAt: string): void;
    protected addRejectNotification(itemId: string): JQueryDeferred<unknown>;
    protected removeNotifications(itemId: string, user?: string): void;
    protected removeNotificationsRec(toDelete: XRTodo[], idx: number): void;
    protected getUserId(login: string): number;
    protected showSignatureField(signatureInfo: ISignaturesInfo, uiCtrl: JQuery, columnSize: number, btnName: string, onSign: (pwd: string) => void): void;
    protected replaceSignButton(): void;
    protected rejectSignWithPass(): void;
    protected rejectSign(): void;
    protected signFromDropdown(meaning?: string): void;
    protected signDocument(pwd: string, meaning?: string): void;
}
interface IDropdownParams {
    readonly?: boolean;
    placeholder?: string;
    maxItems?: number;
    options?: IDropdownOption[];
    groups?: IDropdownGroup[];
    create?: boolean;
    sort?: boolean;
    optionSetting?: string;
    splitHuman?: boolean;
    inlineHelp?: string;
    requiresContent?: boolean;
    maxHeight?: string;
    printProcessor?: {
        dropdownOptions?: string;
        parameterField?: string;
    };
    width?: string;
    initialContent?: string;
}
interface IDropDownControlOptions extends IBaseControlOptions {
    parameter?: IDropdownParams;
    noMarkup?: boolean;
}
interface IUserSelect extends IDropDownControlOptions {
    parameter?: {
        readonly?: boolean;
        placeholder?: string;
        maxItems?: number;
        showGroups?: boolean;
        showUsers?: boolean;
    };
    options?: IDropdownOption[];
    create?: boolean;
}
interface JQuery {
    mxDropdown?: (options: IDropDownControlOptions) => JQuery;
}
declare class DropdownImpl extends BaseControl {
    private settings;
    private rawValue;
    private ctrl;
    private human;
    private duringInit;
    private beforeDisplay;
    private doesRequireContent;
    constructor(control: JQuery);
    init(options: IDropDownControlOptions): void;
    getValueRaw(): string;
    hasChanged(): boolean;
    getValue(): string;
    getText(): string;
    destroy(): void;
    resizeItem(): void;
    requiresContent(): boolean;
    setValue(newValue: string, force?: boolean): void;
    private valueChanged;
    private parseValue;
}
interface IErrorControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {};
}
interface JQuery {
    errorControl?: (options: IErrorControlOptions) => JQuery;
}
declare class ErrorControlImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: IErrorControlOptions): void;
    getValue(): void;
    hasChanged(): boolean;
    destroy(): void;
    resizeItem(): void;
}
interface IFileManagerParams {
    readonly?: boolean;
    replace?: ReplaceOptions;
    autohide?: boolean;
    hidden?: boolean;
    manualOnly?: boolean;
    titleBarControl?: JQuery;
    extensions?: string[];
    textTodo?: string;
    single?: boolean;
    hideNoFileInfo?: boolean;
    maxWidth?: number;
    naked?: boolean;
}
interface IFileManagerOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IFileManagerParams;
    processExternally?: (fileList: FileList) => boolean;
    id?: string;
}
declare type ReplaceOptions = "never" | "name" | "name_auto" | "type" | "type_auto";
interface JQuery {
    fileManager?: (options: IFileManagerOptions) => JQuery;
}
declare class FileManagerImpl extends BaseControl {
    private settings;
    private data;
    private fileInfo;
    private dragCounter;
    constructor(control: JQuery);
    init(options: IFileManagerOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(files: string): void;
    destroy(): void;
    resizeItem(): void;
    addLinks(uploads: IUploadedFileInfo[]): void;
    populateFromRichtext(): boolean;
    private showFiles;
    private deleteFile;
    private deleteFiles;
    private uploadFiles;
    private badExtension;
    private uploadFilesUser;
    private onDrop;
}
interface IGateControlControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter: IGate;
}
/** define behavior of a gate */
interface IGate {
    /** define different reviews/approvals which need to be made for gate to pass */
    lines: IGateLine[];
    /** if set to true the user can add some comment when approving */
    hasComments: boolean;
    /** defines behavior when all reviews/approvals have passed */
    allPass: {
        /** locks the fields above the gate if all reviews/approvals have passed */
        lockAbove: boolean;
        /** enables the fields below the gate if all reviews/approvals have passed */
        enableBelow: boolean;
        /** sets the specified labels if all reviews/approvals have passed */
        setLabels?: string[];
        /** hides the tools menu if all reviews/approvals have passed */
        hideMenu?: boolean | string[];
        /** hides the reference view if all reviews/approvals have passed */
        hideReferences?: boolean;
        /** locks the title if all reviews/approvals have passed */
        lockTitle?: boolean;
        /** disables delete if all reviews/approvals have passed */
        lockDelete?: boolean;
    };
    /** text to show in printed reports if all reviews/approvals have passed */
    printAllPassed: string;
    /** text to show in printed reports if reviews/approvals has been rejected */
    printNotPassed: string;
    /** text to show in printed reports if reviews/approvals still need to be finished */
    printTodo: string;
    /** button allowing to approve a gate, leave empty ("") to hide*/
    pass: string;
    /** button allowing to reject a gate, leave empty  ("") to hide*/
    fail: string;
    /** text to show instead of pass button if gate was approved, leave empty ("") to use same as pass, set to "hide" to hide the button in this state*/
    passPassed?: string;
    /** text to show instead of pass button if gate was rejected, leave empty ("") to use same as pass, set to "hide" to hide the button in this state */
    passFailed?: string;
    /** text to show instead of fail button if gate was approved, leave empty ("") to use same as fail, set to "hide" to hide the button in this state */
    failPassed?: string;
    /** text to show instead of fail button if gate was rejected, leave empty ("") to use same as fail, set to "hide" to hide the button in this state */
    failFailed?: string;
    /** ask for signature to approve a gate */
    requireSignature?: boolean;
    /** ask for signature to reject a gate */
    requireSignatureReject?: boolean;
    /**  reset gate if any of these fields change. enter field names or ids  */
    reset?: string[];
    readOnly?: boolean;
    /** legacy mode (don't show in UI and printed documents who approved/rejected a line) */
    hideApprovalInfo?: boolean;
    /** show a line per given signature when printing */
    printSignaturesApproved?: boolean;
    /** show a line per missing signature when printing */
    printSignaturesRequired?: boolean;
    /** show a line per rejected signature when printing */
    printSignaturesRejected: boolean;
    /**   if set to true only allow a user to sign only one line in a gate  */
    strictSign?: boolean;
}
interface IGateLine {
    /** a unique id for the line */
    id: string;
    /** define which users can approve */
    users: string[];
    /** info to show before user (e.g. to hint what the approval means) */
    hint?: string;
    /** info to show before user (... once approved) */
    hintDone?: string;
    /** info to show before user (... if rejected) */
    hintRejected?: string;
}
interface IGateStatus {
    passed: boolean;
    failed: boolean;
    lines: IGateStatusLine[];
    search: string;
}
interface IGateStatusLine {
    id: string;
    passed: boolean;
    failed: boolean;
    user: string;
    date: string;
    dateUser: string;
    comment: string;
}
interface JQuery {
    gateControl?: (options: IGateControlControlOptions) => JQuery;
}
declare class GateControlImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    private currentValue;
    private uiCtrl;
    private triggerUpdate;
    private allPassed;
    init(options: IGateControlControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(): void;
    destroy(): void;
    resizeItem(): void;
    labelsToSet(): string[];
    changed(fieldId: number, fieldName: string): void;
    private showControl;
    private askForSignature;
    private setStatus;
    private update;
    private setColor;
    private getLine;
    private parseFieldValue;
    private updateOverallStatus;
}
interface IHiddenOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {};
}
interface JQuery {
    hidden?: (options: IHiddenOptions) => JQuery;
}
declare class HiddenImpl extends BaseControl {
    private curValue;
    constructor(control: JQuery);
    init(options: IHiddenOptions): void;
    getValue(): any;
    setValue(newValue: any): void;
    hasChanged(): boolean;
    destroy(): void;
    resizeItem(): void;
}
interface IHtmlFormOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        readonly?: boolean;
        htmlSetting?: string;
    };
}
interface IHTMLFormValue {
    name: string;
    value: string;
    pos?: number;
}
interface IFormValue {
    data: IHTMLFormValue[];
    html: string;
}
interface JQuery {
    htmlform?: (options: IHtmlFormOptions) => JQuery;
}
declare class HtmlFormImpl extends BaseControl {
    private settings;
    private timer;
    private form;
    constructor(control: JQuery);
    init(options: IHtmlFormOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(newValue: string): void;
    destroy(): void;
    resizeItem(): void;
    private readData;
    private writeData;
    private getHtml;
}
interface IHyperlinkOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {};
    fieldValueLabel?: string;
    linkPrefix?: string;
}
interface JQuery {
    hyperlink?: (options: IHyperlinkOptions) => JQuery;
}
declare class HyperlinkImpl extends BaseControl {
    private settings;
    private lastValueChanged;
    private _editor;
    constructor(control: JQuery);
    init(options: IHyperlinkOptions): void;
    protected showLink(container: JQuery): void;
    hasChanged(): boolean;
    getValue(): any;
    destroy(): void;
    resizeItem(): void;
    private valueChanged;
}
interface IItemSelectionParams {
    prefix?: string;
    buttonName?: string;
    showOnly?: string[];
    showNot?: string[];
    crossProject?: boolean;
    singleFolderOnly?: boolean;
    readOnly?: boolean;
    linkTypes?: {}[];
    readonly?: boolean;
    crossProjectHideDelete?: boolean;
    crossProjectAsList?: boolean;
}
interface IItemSelectionOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IItemSelectionParams;
}
interface JQuery {
    itemSelection?: (options: IItemSelectionOptions) => JQuery;
}
declare class ItemSelectionImpl extends BaseControl {
    private settings;
    private selectedItems;
    private uiCtrl;
    private currentSelection;
    constructor(control: JQuery);
    init(options: IItemSelectionOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(itemIds: string[]): void;
    destroy(): void;
    resizeItem(): void;
    private addUnlink;
    private showCurrentSelection;
}
interface IItemSelectionFromToOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        /** Do not include these CATs in the FROM selection list */
        showNotFrom?: string[];
        /** Only include these CATs in the TO selection list */
        showOnlyTo?: string[];
        /** Initially select all possible items as to items */
        allTo?: boolean;
        buttonNameFrom?: string;
        buttonNameTo?: string;
        prefixFrom?: string;
        prefixTo?: string;
    };
}
interface JQuery {
    itemSelectionFromTo?: (options: IItemSelectionFromToOptions) => JQuery;
}
interface IFromToSelection {
    from: IReference[];
    to: IReference[];
}
declare class ItemSelectionFromToImpl extends BaseControl {
    private settings;
    private selectedItems;
    private defaultSelection;
    constructor(control: JQuery);
    init(options: IItemSelectionFromToOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(newValue: string): void;
    setValueFrom(itemIds: string[]): void;
    setValueTo(itemIds: string[]): void;
    destroy(): void;
    resizeItem(): void;
    private getSelectionString;
    private isDefaultSelection;
}
interface ILabelsControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        titleBarControl?: JQuery;
        renderSliders?: boolean;
    };
    type?: string;
    restrictEditTo?: string[];
}
interface JQuery {
    labelsControl?: (options: ILabelsControlOptions) => JQuery;
}
declare class LabelsControlImpl extends BaseControl {
    private settings;
    private space;
    private mode;
    constructor(control: JQuery);
    init(options: ILabelsControlOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(labelStr: string): void;
    destroy(): void;
    resizeItem(): void;
    private showLabels;
}
interface ILinkRenderParams {
    linkTypes?: ILinkCategories[];
    none?: string;
    disableCreate?: boolean;
    readonly?: boolean;
    reviewMode?: boolean;
    render?: {
        category?: string;
        hideLink?: boolean;
        buttonName?: string;
        hideCreate?: boolean;
        hideSelect?: boolean;
        ignoreOutOfDate?: boolean;
    }[];
}
interface ILinkCollectionOptions extends IBaseControlOptions {
    fieldValue?: IReference[];
    parameter?: ILinkRenderParams;
    doNotSave?: boolean;
    mitigationRenderer?: Function;
    id?: string;
    tiny?: boolean;
}
interface ILinkCategories {
    name?: string;
    required?: boolean;
    type: string;
}
interface JQuery {
    linkCollection?: (options: ILinkCollectionOptions) => JQuery;
}
declare class LinkCollectionImpl extends BaseControl {
    private settings;
    private saveInDb;
    private itemReferences;
    private hideSelect;
    private ignoreOutOfDate;
    private showLinks;
    constructor(control: JQuery);
    init(options: ILinkCollectionOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(newVal: IReference[]): void;
    resizeItem(): void;
    destroy(): void;
    updateItem(newItem: IItem): void;
    private deleteReference;
    private removeDeletedReference;
    private addReference;
    private selectionChange;
    private renderRefs;
}
interface IDocMarkAsTemplateOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        inlineHelp?: string;
    };
}
interface IPasteSourceSetting {
    templates: IPasteSource[];
}
interface IPasteSource {
    fromProject: string;
    fromSign: string;
    fromName: string;
    fromDOC: string;
    canUseIn: string[];
}
interface ITempSignatures {
    signatures: ITempSignature[];
}
interface ITempSignature {
    user: string;
    datetime: string;
}
interface JQuery {
    markAsTemplate?: (options: IDocFilterOptions) => JQuery;
}
interface ITemplateProjects {
    projects: string[];
    targets: string[];
}
declare class MarkAsTemplateImpl extends DocSignImpl {
    static PROJECT_SETTING: string;
    static PROJECT_SETTING_Projects: string;
    private originalValue;
    private newValue;
    private pub;
    private publishTo;
    constructor(control: JQuery);
    init(options: IDocMarkAsTemplateOptions): void;
    private getHelpPart;
    hasChanged(): boolean;
    getValue(): string;
    setValue(): string;
    destroy(): void;
    resizeItem(): void;
    static getRequiredApprovals(value: string): string[];
    static getTemplateSignatureStatus(value: string): ISignaturesInfo;
    static removeFromTemplates(deletedItems: string[]): void;
    private hideSignatureCtrl;
    private showProjects;
    private showCurrentUsages;
    private showSignatureTableEdit;
    private getTemplateSignatureStatus;
    private askForSignatures;
    protected signTemplate(pwd: string): void;
}
interface IPlainTextParams {
    externalHelp?: string;
    readonly?: boolean;
    allowResize?: boolean;
    rows?: number;
    code?: boolean | CodeLanguage;
    lineNumbers?: boolean;
    tabSize?: number;
    height?: number;
    password?: boolean;
    autoEdit?: boolean;
    autoFormat?: boolean;
    showJSONFormat?: boolean;
    requiresContent?: boolean;
    inlineHelp?: string;
    magic?: boolean;
    apiHelp?: string;
    initialContent?: string;
    hideFullscreen?: boolean;
    purify?: boolean;
}
interface IPlainTextControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    lostFocus?: Function;
    parameter?: IPlainTextParams;
}
declare type CodeLanguage = "xml" | "json" | "css";
interface JQuery {
    plainText?: (options: IPlainTextControlOptions) => JQuery;
}
declare class PlainTextImpl extends BaseControl {
    private settings;
    private lastValueChanged;
    private isCode;
    private myCodeMirror;
    private _editor;
    private doesRequireContent;
    constructor(control: JQuery);
    init(options: IPlainTextControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    requiresContent(): boolean;
    refresh(): void;
    setValue(newValue: string, reset?: boolean): void;
    destroy(): void;
    resizeItem(): void;
    private valueChanged;
    private compactizeJSON;
}
interface JQuery {
    publishedContent?: (options: IBaseControlOptions) => JQuery;
}
declare class PublishedContentImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: ICheckBoxControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(value: boolean): void;
    destroy(): void;
    resizeItem(): void;
}
interface IRichTextParams {
    showSmartText?: boolean;
    autoEdit?: boolean;
    height?: number;
    docMode?: boolean;
    tableMode?: boolean;
    readonly?: boolean;
    wiki?: boolean;
    tiny?: boolean;
    noConvertTiny?: boolean;
    requiresContent?: boolean;
    printMode?: boolean;
    width?: string;
    initialContent?: string;
}
interface IRichTextControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IRichTextParams;
}
interface JQuery {
    richText?: (options: IRichTextControlOptions, form?: ItemControl) => JQuery;
}
declare class RichTextImpl extends BaseControl {
    private settings;
    private lastClient;
    private editStart;
    private data;
    private lastScroll;
    private hiddenPasteBuffer;
    private _editor;
    private editable;
    private lastValueChanged;
    private form;
    private resizable;
    private heightDelta;
    private failedImages;
    private recCall;
    static editorInstanceCount: number;
    constructor(control: JQuery);
    init(options: IRichTextControlOptions, form?: ItemControl): void;
    getValue(): string;
    setValue(newVal: string): void;
    hasChanged(): boolean;
    getText(): void;
    getValueRaw(): void;
    destroy(): void;
    resizeItem(): void;
    static useTiny(ctrlParameter: IRichTextControlOptions): boolean;
    private triggerValueChange;
    private valueChanged;
    private showMenu;
    private markBadImages;
    private importImages;
    private importImagesRec;
    private showBadImages;
    private hideMenu;
    private uploadAndInsertImages;
    private cleanPastedHTML;
    private processpaste;
    private ddUploadFiles;
    private ddCreateLink;
    private ddUploadHTML;
    private onDragOver;
    private onDrop;
    private addVerticalResizer;
}
declare function hackInAQueryParamToDisableCachingForSafariOnly(original: string): string;
declare class RichText2 extends BaseControl {
    static editorInstanceCount: number;
    static toolbarHeight: number;
    private settings;
    private selectorId;
    private dataOriginal;
    private dataChanged;
    private lastValueChanged;
    private isInEditMode;
    private duringInit;
    private delayedInit;
    private editingDrawIO;
    private editorBox;
    private editor;
    private form;
    private tinyConf;
    private failedImages;
    private imgSrcMap;
    private doesRequireContent;
    private cachedContent;
    constructor(control: JQuery);
    init(options: IRichTextControlOptions, form?: ItemControl): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(newVal: string): void;
    destroy(): void;
    resizeItem(): void;
    requiresContent(): boolean;
    private cleanBlock;
    private initEditor;
    private onSetup;
    private images_upload_handler;
    private onInit;
    private onChange;
    private onPostChange;
    private onFocus;
    private PastePreProcess;
    private replaceWith;
    private PastePostProcess;
    private getPurifiedContent;
    private OnKeyUp;
    private OnKeyDown;
    private AfterSetContent;
    private onMouseDown;
    private onMouseUp;
    private onResizeEditor;
    private setMinHeight;
    private closeEditor;
    private enableEditor;
    private setContent;
    private toSelector;
    private toOffset;
    private getSelector;
    /*******************************************************
     * Drag and drop support
     *******************************************************/
    private setupDragAndDrop;
    private onDragStart;
    private dragEnterCounter;
    private onDragEnter;
    private onDragLeave;
    private onDragOver;
    private onDrop;
    private ddCreateLink;
    private ddUploadFiles;
    private insertImage;
    private resizeNewImage;
    private createImage;
    private getImageSize;
    private getInitialImageSize;
    private ddUploadHTML;
    /*******************************************
     * handle images pointing to alien servers
     *******************************************/
    private markBadImages;
    private markBadImage;
    private processPastedImages;
    private uploadPastedImagesRec;
    private showBadImages;
    /******************************************
     * Smart text tools
    *******************************************/
    private insertReference;
    private insertCrossReference;
    private pasteBuffer;
    private insertSmartMacro;
    /****************************************** */
    /****************************************** */
    private addDrawIO;
    private openDrawIODrawing;
    private onOpenedDrawIO;
    private onClosedDrawIO;
}
declare class RichText2Plugin implements IPlugin {
    static fieldType: string;
    constructor();
    private _item;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    updateMenu(ul: JQuery): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
}
declare let RichText2Instance: RichText2Plugin;
interface IRiskControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IRiskParameter;
    links?: IReference[];
    hideReadonlyColumns?: boolean;
}
interface IRiskParameter {
    riskConfig?: IRiskConfig;
    showAttributeNames?: boolean;
    forceAfterWeightsInPrint?: boolean;
}
interface IRiskValue {
    factors: IRiskValueFactor[];
    mitigations: IRiskValueMitigation[];
    postWeights?: IRiskValueFactorWeight[];
}
interface IRiskValueFactor {
    label: string;
    type: string;
    value: string;
    inputType?: string;
    weights: IRiskValueFactorWeight[];
}
interface IRiskValueFactorWeight {
    description: string;
    label: string;
    type: string;
    value: number;
}
interface IRiskValueMitigation {
    to: string;
    title: string;
    changes: IRiskValueMitigationChange[];
}
interface IRiskValueMitigationChange {
    by: number;
    changes: string;
    description: string;
    name: string;
}
interface IRiskValueMap {
    [key: string]: number;
}
interface JQuery {
    riskCtrl2?: (options: IRiskControlOptions) => JQuery;
}
interface IRiskRender {
    text: string;
    foregroundColor: string;
    backgroundColor: string;
    css: string;
}
declare class RiskCalculator {
    private riskValue;
    private config;
    constructor(config: IRiskConfig);
    parse(fieldValue: string): void;
    updateMitigations(possibleRefs: IReference[]): void;
    updateMitigationTitles(possibleLinks: IReference[]): void;
    init(riskValue: IRiskValue): void;
    /** get the value */
    getValue(): IRiskValue;
    getAttributeHTML(attributeIn: string): string;
    getWeight(factorType: string, weightType: string): number;
    getRBM(): IRiskValueMap;
    getRAMByMath(rbm: IRiskValueMap): IRiskValueMap;
    getRAMByUser(rbm: IRiskValueMap): IRiskValueMap;
    getRAM(rbm: IRiskValueMap): IRiskValueMap;
    getRiskSumText(riskValues: IRiskValueMap): {
        text: string;
        foregroundColor: string;
        backgroundColor: string;
        css: string;
    };
    getRiskSumSpan(riskValues: IRiskValueMap): string;
}
declare class RiskControlImpl extends BaseControl {
    private settings;
    private config;
    private risk;
    private mitbody;
    private isPrint;
    private riskCalculator;
    constructor(control: JQuery);
    init(options: IRiskControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    private syncTheLinks;
    private controlsFromTable;
    private controlsToTable;
    private renderFactorWithWeightsLine;
    private editRichText;
    private setFactorRichValue;
    private renderWeight;
    private setWeight;
    private setFactor;
    riskChange(): void;
    private mitigationChanged;
    private getLabelFactor;
    private getLabelWeight;
    private getLabelWeightFactor;
    private createMitigationSelect;
    private mitigationRenderer;
    private setSelectValues;
    private setSelectValue;
    private canBeMitigation;
    /********************************
     * render as table control
     ********************************/
    private renderTableBodyRow;
    /********************************
     * user inputs
     ********************************/
    private renderFactorInput;
    private renderWeightInput;
    private renderMitigationSelect;
}
interface ISectionOptions extends IBaseControlOptions {
    controlState?: ControlState;
    help?: string;
    parameter?: ISectionParams;
}
interface ISectionParams {
    lineBefore?: boolean;
    lineAfter?: boolean;
}
interface JQuery {
    section?: (options: ISectionOptions) => JQuery;
}
declare class SectionImpl extends BaseControl {
    private curValue;
    constructor(control: JQuery);
    init(options: ISectionOptions): void;
    getValue(): string;
    setValue(newValue: any): void;
    hasChanged(): boolean;
    destroy(): void;
    resizeItem(): void;
}
interface IDocSourceRefOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        readonly?: boolean;
    };
}
interface JQuery {
    sourceRef?: (options: IDocFilterOptions) => JQuery;
}
declare class SourceRefImpl extends DocBaseImpl {
    private settings;
    private originalValue;
    private newValue;
    private lastValueChanged;
    constructor(control: JQuery);
    init(options: IDocSourceRefOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(newInfo: string): string;
    destroy(): void;
    resizeItem(): void;
}
interface ISyncSourceInfoOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        readonly?: boolean;
    };
}
interface ISyncSourceInfo {
    param: string;
    type: string;
    value: string;
}
interface JQuery {
    syncSourceInfo?: (options: ISyncSourceInfoOptions) => JQuery;
}
declare const enum InfoType {
    Date = 0,
    Text = 1,
    Url = 2
}
declare class SyncSourceInfoImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: IHtmlFormOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    setValue(syncStatusString: string): void;
    destroy(): void;
    resizeItem(): void;
    private renderValue;
}
interface ISyncStatusOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        readonly?: boolean;
    };
}
interface ISyncCatgoryInfo {
    categories: string;
    sourceName: string;
    new?: ISyncMapping[];
    resync?: ISyncMapping[];
}
interface ISyncMapping {
    from: string;
    to: string;
    fromId?: number;
    toId?: number;
}
interface ISyncStatusValue {
    targetItemId?: string;
    targetSyncedVersion?: number;
    thisSyncedVersion?: number;
}
interface JQuery {
    syncStatus?: (options: ISyncStatusOptions) => JQuery;
}
interface IMergeResult {
    targetFieldId: string;
    targetFieldValue: string;
}
declare const enum SyncStatus {
    NeverSynced = 0,
    InSync = 1,
    BothChanged = 2,
    MatrixChanged = 3,
    OtherChanged = 4
}
declare class SyncStatusImpl extends BaseControl {
    private settings;
    private syncStatus;
    private syncCatgoryInfo;
    private labelStatus;
    private target;
    private source;
    private newCreated;
    static syncBlackList: string[];
    private mergeResults;
    constructor(control: JQuery);
    init(options: IHtmlFormOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    preSaveHook(isItem: boolean, type: string, controls: IControlDefinition[]): JQueryDeferred<{}>;
    static createNew(externalCategory: string, items: string[], targetCategory: string): JQueryDeferred<{}>;
    static reSyncItems(externalCategory: string, items: string[]): JQueryDeferred<{}>;
    static breakLinks(externalCategory: string, items: string[]): JQueryDeferred<{}>;
    private static breakLinksRec;
    private static createNewRec;
    private static reSyncItemsRec;
    private static updateSyncDetails;
    private static getFieldIdMapping;
    private static matchSyncDetails;
    private getSyncStatus;
    private setSyncStatus;
    /** function called if item is not yet synced or ignored
     *
     */
    private offerLinking;
    private showSyncInfo;
    private showLinkInfo;
    private fillCreateDialog;
    private createItemLink;
    private offerBreakLink;
    /** function called if item is linked - it can or cannot be in sync
   
    */
    private offerAutoSync;
    private saveMergeInfo;
    private autoSync;
    private saveAndLink;
    private offerManualSync;
    /** render dialog to sync items */
    private showSyncDialog;
    /** render info that the item behind exists and can be loaded (or doesn't exist...) */
    private lazyLoad;
    /** hide input fields which cannot be synced (no setValue method) */
    private hideNonSyncFields;
}
declare class syncStatusSaveHook implements IPlugin {
    private syncControl;
    isDefault: boolean;
    constructor();
    preSaveHook(isItem: boolean, type: string, controls: IControlDefinition[]): JQueryDeferred<{}>;
    initSyncControl(syncControl: SyncStatusImpl): void;
    destroySyncControl(): void;
}
declare let mSyncStatusHook: syncStatusSaveHook;
interface ITableControlParams {
    readonly?: boolean;
    columns?: ITableControlOptionsColumn[];
    onDblClick?: Function;
    canBeModified?: boolean;
    create?: boolean;
    showLineNumbers?: boolean;
    maxRows?: number;
    fixRows?: number;
    readonly_allowfocus?: boolean;
    passFailEditorConfig?: any;
    readOnlyFields?: string[];
    limitEditRow?: string;
    manualTableHeights?: boolean;
    doNotRememberWidth?: boolean;
    onColumnsResized?: Function;
    cellAskEdit?: string;
    disableColumnReorder?: boolean;
    inlineHelp?: string;
    initialContent?: IStringMap[];
}
interface ITableControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: ITableControlParams;
}
interface ITableControlOptionsColumn {
    name: string;
    field: string;
    editor: string;
    options?: {
        [key: string]: string;
    } | IDropdownOption[];
    relativeWidth?: Number;
    headerCssClass?: string;
    cssClass?: string;
}
interface ITableRow {
    idx: number;
    id: string;
    name: string;
    [key: string]: any;
}
interface MyData extends Slick.SlickData {
    options?: string[];
}
interface JQuery {
    tableCtrl?: (options: ITableControlOptions) => JQuery;
    insertLine?: Function;
}
declare class TableControlImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: ITableControlOptions): void;
    getValue(): string;
    hasChanged(): boolean;
    destroy(): void;
    resizeItem(): void;
    static checkConfig(json: ITableControlParams): Promise<string | null>;
}
interface ITasksControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: any;
    valueChanged?: Function;
    parameter?: {
        readonly?: boolean;
        plugins?: number[];
    };
    readOnly?: boolean;
}
interface JQuery {
    tasksControl?: (options: ITasksControlOptions) => JQuery;
}
declare class TasksControlImpl extends BaseControl {
    private settings;
    private dragCounter;
    constructor(control: JQuery);
    init(options: ITasksControlOptions): void;
    updateControl(): void;
    init2(): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    getPluginFilter(): number[];
    private onDrop;
}
interface ITitleToolbarOptions extends IBaseControlOptions {
    parameter?: {
        readonly?: boolean;
        placeholder?: string;
    };
    id?: string;
    title?: string;
    item?: IItem;
    canEditTitle?: boolean;
    canDelete?: boolean;
    locked?: string;
    unlockers?: string;
    type?: string;
    validate?: boolean;
    noAutoActivation?: boolean;
}
interface JQuery {
    titleToolbar?: (options: ITitleToolbarOptions) => JQuery;
}
declare class TitleToolbarImpl extends BaseControl {
    private settings;
    private isInHiddenMode;
    private link;
    private warnedAboutOutOfDate;
    private _refDlgIcon;
    constructor(control: JQuery);
    init(options: ITitleToolbarOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(newTitle: string, fireUpdate: boolean): void;
    getText(): void;
    getValueRaw(): void;
    titleCreationMode(): void;
    destroy(): void;
    resizeItem(): void;
    setViewers(viewers: IItemWatched): void;
    updateItem(newItem?: IItem): void;
    private toggleOutOfDateIcon;
    private showOutOfDateIcon;
}
interface IUpLinkInfoOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string | {};
    valueChanged?: Function;
    parameter?: IUpLinkDetails;
    validate?: boolean;
}
interface IUpLinkDetails {
    /** a comma separated list of categories */
    cats: string;
    /** it is possible to show a specific text with some icons if there are (set to true)/ are no links (set to false) */
    exists?: boolean;
    /** depends on exist:  shows an icon if there's at least one (or none)  */
    icon?: string;
    /** depends on exist:  color of icon  */
    iconfg?: string;
    /** depends on exist:  background color of icon  */
    iconbg?: string;
    /** depends on exist:  text behind icon  */
    text?: string;
    /** to show information about the actualy uplinks: false (don't show)|true (shows a simple list with all id's)|listref (shows a list with id's as links and titles)|ref (shows id's as links and titles inline behind text) */
    itemInfo?: string | boolean;
    /** show create button */
    showCreate?: boolean;
    /**  a comma separated list of categories for which to hide the create button (subset of cats) */
    hideCreate?: string;
    /**  a comma separated list of categories for which to hide in selection (subset of cats) */
    hideSelect?: string;
    reports?: boolean;
}
interface JQuery {
    uplinkinfo?: (options: IUpLinkInfoOptions) => JQuery;
}
declare class UpLinkInfoImpl extends BaseControl {
    private settings;
    constructor(control: JQuery);
    init(options: IUpLinkInfoOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    updateItem(newItem: IItemGet): void;
    private renderRefs;
    private renderCreateButtons;
    private addReference;
    private selectionChange;
}
interface IWorkflowControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: {
        titleBarControl?: JQuery;
        pollFrequencyMS?: number;
        pollCount?: number;
    };
}
interface JQuery {
    workflowControl?: (options: IWorkflowControlOptions) => JQuery;
}
declare class WorkflowControlImpl extends BaseControl {
    private settings;
    private btn;
    private issue;
    private waitForChange;
    private poll;
    constructor(control: JQuery);
    init(options: IWorkflowControlOptions): void;
    hasChanged(): boolean;
    getValue(): any;
    setValue(issueId: string): void;
    destroy(): void;
    resizeItem(): void;
    private updateButton;
    private setButtonSpinning;
}
declare class WorkflowMenu implements IPlugin {
    isDefault: boolean;
    updateMenu(ul: JQuery): void;
    private editLink;
}
interface MatrixTreeOptions {
    noAnimation: boolean;
    highlight: boolean;
    canFilter: boolean;
    serverSearch: boolean;
    expand: number;
    canSelectItems: boolean;
    canFilterExclusiv: boolean;
    selectedItems: IReference[];
    isConfigSearch?: boolean;
    tree?: IDB[];
    controlState: ControlState;
    dropCallback: (moveDetails: ITreeDropInfo) => boolean;
    selectionChanged: (id: string) => void;
    onExpand?: (id: string) => void;
    isMainTree?: boolean;
}
interface ITreeDropInfo {
    parentId: string;
    itemId: string;
    index: number;
    updateUI?: () => void;
}
declare class MainTreeImpl {
    private settings;
    private _jui;
    private triggerSelectionChange;
    constructor();
    init(control: JQuery): void;
    render(treeSettings?: MatrixTreeOptions): void;
    update(item: IItem): void;
    remove(itemId: string): void;
    openFolder(itemId: string, expandToRoot?: boolean): void;
    closeFolder(itemId: string): void;
    select(itemId: string): void;
    isSelected(itemId: string): boolean;
    insertInTree(newItem: IDBParent, noEscape?: boolean): void;
    moveInTree(itemId: string, newParentId: string, newPosition: number): void;
    insertUpdateTreeRec(target: string, source: IDB): void;
    destroy(): void;
    clearFilter(): void;
    updateItemIsUnselected(itemId: string, isUnselected: boolean): void;
    updateNotificationCounters(): void;
}
declare var NavigationPanel: MainTreeImpl;
declare class ActivityPanel implements IPanel {
    title: string;
    constructor(first?: number, last?: number);
    destroy(): void;
}
interface IInfoPerDay {
    auditIdMin: number;
    auditIdMax: number;
    details?: IInfoPerDayDetail[];
    nbChanges: number;
    dejaVu?: boolean;
}
interface IInfoPerDayDetail {
    itemId: string;
    type: string;
    title: string;
    version: number;
    action: string;
    human: string;
    reason: string;
}
interface IInfoPerDayMap {
    [key: string]: IInfoPerDay;
}
declare class CalendarPanel implements IPanel {
    private control;
    private infoPerDay;
    private selectFromDate;
    private selectToDate;
    private cats;
    private select;
    private results;
    private auditIdMin;
    private auditIdMax;
    private killed;
    private timewarpColors;
    title: string;
    constructor();
    destroy(): void;
    private resetSelection;
    private changeSelection;
    private updateSelection;
    private dayOfTimeWarp;
    private renderMonth;
    private renderMonths;
    private renderEmptySelectionHelp;
    private appendSelectionTime;
    private selectCalendar;
    private addFilter;
    private filterCalendar;
    private renderCalendar;
    private renderCalendarSelection;
    private renderLastChanges;
}
declare class ChangeLogPanel implements IPanel {
    private control;
    title: string;
    constructor();
    destroy(): void;
}
declare class DeletedItemPanel implements IPanel {
    title: string;
    private filterCalendar;
    private addFilter;
    constructor();
    destroy(): void;
}
declare class DocumentPanel implements IPanel {
    title: string;
    constructor();
    destroy(): void;
}
declare class GroupPanel implements IPanel {
    title: string;
    constructor(categoryGroup: string, title: string);
    destroy(): void;
    private createProjectControl;
    private addChildren;
}
declare class ItemPanel implements IPanel {
    private itemForm;
    title: string;
    constructor(options: IItemControlOptions);
    destroy(): void;
    getItemForm(): ItemControl;
}
declare class MyDocsPanel implements IPanel {
    private control;
    title: string;
    constructor();
    destroy(): void;
    render(): void;
}
interface IPublishInfo {
    target: string;
    SOPLabelGroupType: string;
    ProcReviewLabelGroupType: string;
    WiReviewLabelGroupType: string;
    publisher: string;
}
interface IPublished {
    item: string;
    version: number;
    wis: string[];
    sop: string;
}
interface IToPublish {
    itemInfo: ISearchResult;
    approved: boolean;
    lastPublishedVersion: number;
    wis: string[];
    sop: string;
    rolesAndUsers: string[];
}
interface IToPublishMap {
    [key: string]: IToPublish;
}
interface IPublicationGroup {
    groupInfo: IPublicationCategory;
    label: string;
    groupItems: string[];
    approved: boolean;
    needsPublication: boolean;
}
interface IDocTitle {
    id: string;
    title: string;
}
declare enum SelectedEntity {
    ItemsInGroupsOnly = 0,
    ChangedItems = 1,
    DeletedItems = 2,
    UnPublish = 3
}
interface IPublicationHistory {
    history: IPublicationHistoryItem[];
}
interface IPublicationHistoryItem {
    item: string;
    date: string;
    comment: string;
}
interface INewPublication {
    item: string;
    version: number;
    wis: string[];
    sop: string;
}
declare class PublishPanel implements IPanel {
    title: string;
    private control;
    private body;
    private pubConfig;
    private selectedForPublication;
    private selectedForUnPublication;
    private deletedStillPublished;
    private itemMap;
    private unGrouped;
    private groups;
    constructor(folderType: string);
    destroy(): void;
    private renderTabs;
    private renderPublishUi;
    renderReadyToPublish(isForPublication: boolean, panel: JQuery): void;
    private renderNotReadyToPublish;
    private enablePublish;
    private showGroup;
    private updateItems;
    private getItemsFromCheckBoxes;
    private showItem;
    private showDeletedItem;
    private showGroupDetails;
    private showItemDetails;
    private addInfoLastPublication;
    private computePublicationNeeds;
    private getPublicationItemsAndGroups;
    private publishSelected;
    private getIncludedDownlinksRec;
    private doPublish;
    private doPublishInFolder;
    private waitForPublication;
    private createDateFolder;
    private createFolders;
}
declare class ITrainingFilter {
    userRaw: string[];
    user: string[];
    itemInfo: string;
    new: boolean;
    due: boolean;
    overdue: boolean;
    ok: boolean;
    none: boolean;
    overdueAfter: string;
    retrainingAfter: string;
}
interface ITrainingAnalysis {
    title: string;
    hasTraining: boolean;
    users: {
        [key: string]: ITrainingAnalysisUsers;
    };
    labels: string[];
}
interface ITrainingAnalysisUsers {
    /** true if there is an open training notification */
    thereIsATraining: boolean;
    /** if thereIsATraining number of days since it was created */
    theTrainingExistsSinceDays: number;
    /** true thereIsATraining if the training notification is overdue */
    theTrainingIsOverdue: boolean;
    /** true if there should be a training (either because there never has been one or there was no retraining) */
    thereShouldBeATraining: boolean;
    /** info about each training done */
    trainingsDone: ITrainingDone[];
    /** if there was a completed training, how many days ago the last training was completed */
    lastTrainingAgeDays: number;
    /** if there was a completed training, when last training was completed */
    lastTrainingDate: Date;
}
interface ITrainingDone {
    trainingCreated: string;
    trainingDone: string;
    trainingDays: number;
    trainingOverdue: boolean;
}
declare class TrainingTable {
    private vscroll;
    protected ivscroll: JQuery;
    private hscroll;
    protected ihscroll: JQuery;
    protected filterBox: JQuery;
    private mainTable;
    private leftTable;
    private leftContainer;
    protected leftBody: JQuery;
    protected topTable: JQuery;
    private topContainer;
    protected headerRow: JQuery;
    protected accessTable: JQuery;
    private accessContainer;
    protected accessBody: JQuery;
    protected topLeft: JQuery;
    protected createMainContainer(place: JQuery): void;
    protected initTooltipBox(onShow: (cell: JQuery) => string): void;
    protected placeChangeMenu(uio: JQuery, cell: JQuery): void;
    protected initCellMenu(change: (cell: JQuery, option: string) => void): void;
    protected hideMenu(): void;
    protected scrollTop(): void;
    protected scrollLeft(): void;
    protected initTableScrolling(where: JQuery, paddingBottom: number, cellMenuAction: (cell: JQuery, cmd: string) => void): void;
    private scrollFunction;
}
declare class QMSTraining extends TrainingTable implements IPlugin {
    isDefault: boolean;
    private panel;
    private data;
    private trainingFilter;
    private toolBar;
    private processData;
    private fieldsWithTrainees;
    private labelsCatsWithTraining;
    private trainingTodos;
    private userGroups;
    private PROGRESS_PROC;
    private PROGRESS_NOTIFICATION;
    private PROGRESS_MATH;
    private PROGRESS_UI;
    private PROGRESS_FILTER;
    private users;
    private analysis;
    private itemsWithoutNeedForTraining;
    private itemsWithNeedForTraining;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    private renderProjectPage;
    private goFullScreen;
    private updateSize;
    protected cellMenuAction(cell: JQuery, cmd: string): void;
    private render;
    private showSettingsDialog;
    private addFilters;
    private addToolbar;
    private getAndAnalyzeData;
    private analyzeProcesses;
    private analyzeProcessesRec;
    private analyzeProcess;
    private drawTable;
    private drawTableRow;
    private renderProcessInfo;
    private updateTrainingStatus;
    private hideShow;
    private hideShowRec;
    private createReportWizard;
    private renderReport;
    private onboardUserWizard;
    private createTrainingWizard;
    private sendReminderWizards;
    private addDonut;
    private getCatsWithTrainings;
    protected createTrainingsRec(items: string[], idx: number, userMap: IStringStringArrayMap, user: string): JQueryDeferred<unknown>;
}
interface IPieSlice {
    text: string;
    count: number;
}
declare let mQMSTraining: QMSTraining;
declare class SyncPanel implements IPanel {
    private control;
    private syncCatgoryInfo;
    private body;
    private syncLists;
    title: string;
    constructor();
    destroy(): void;
    private renderSyncCategory;
    /** show items from external database which never have been synched */
    private renderNew;
    private showItemList;
    /** toggle items in table */
    private toggleTable;
    /** create a new items from selected external items */
    private createNew;
    /** re-sync existing links */
    private reSync;
    /** re-sync existing links */
    private ignore;
    /** create a clickable link */
    private createItemLink;
}
declare class TagPanel implements IPanel {
    private control;
    title: string;
    constructor();
    destroy(): void;
    render(): void;
}
declare class Email {
    private element;
    private resultBox;
    constructor(e: string);
    isOK(): boolean;
    private validate;
}
interface PasswordOptions {
    minChar?: number;
    passIndex?: number;
    label?: string;
    verdicts?: string[];
    colors?: string[];
    width?: string[];
    scores?: number[];
    passFail?: (result: boolean) => void;
    other?: string;
}
declare class StrongPass {
    private options;
    private bannedPasswords;
    private checks;
    private element;
    private resultBox;
    constructor(element: string, param: PasswordOptions);
    setPassIndex(newIndex: number): void;
    isOK(): boolean;
    private attachEvents;
    private createBox;
    private runPassword;
    private checkPassword;
}
declare enum refLinkStyle {
    edit = 1,
    link = 2,
    show = 3,
    select = 4,
    selectTree = 5
}
declare enum refLinkTooltip {
    none = 1,
    html = 2
}
interface IRefLinkOptions {
    style?: refLinkStyle;
    tooltip?: refLinkTooltip;
    callback?: Function;
    id?: string;
    title?: string;
    folder?: boolean;
    showVersion?: boolean;
    validate?: boolean;
    isHidden?: boolean;
    placeholder?: string;
    hideTitle?: boolean;
    crossProject?: string;
    css?: string;
}
interface JQuery {
    refLink?: (options: IRefLinkOptions) => JQuery;
    destroy?: () => any;
    getValue?: () => any;
}
declare class RefLink {
    private settings;
    private newTitle;
    private lineEditor;
    private ttpart;
    constructor(control: JQuery, options: IRefLinkOptions);
    getValue(): string;
    destroy(): void;
}
declare var globalMouseDown: boolean;
interface IEditorSmartTextOptions {
    docMode: boolean;
    tableMode: boolean;
}
declare class TokenControl {
    static showUserTokens(container: JQuery, login: string): void;
    static showTokenList(body: JQuery, createUser: string, displayUser: string, tokenList: XRTokenType[]): void;
    static showTokenAdd(body: JQuery, user: string, allUsers: XRUserType[], onAdded: Function): void;
    private static updateCreate;
    private static createToken;
}
declare type UserEditMode = "create" | "useredit" | "adminedit";
interface IUserCreate {
    pw1?: string;
    pw2?: string;
    pw3?: string;
    password?: string;
    admin?: number;
    login?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    signatureImage?: number;
    customerAdmin?: number;
    signaturePassword?: string;
    userSettingsList?: XRSettingType[];
}
interface IUserGet {
    pw1?: string;
    pw2?: string;
    pw3?: string;
    password?: string;
    admin?: number;
    login?: string;
    email?: string;
    firstName?: string;
    lastName?: string;
    signatureImage?: string;
    customerAdmin?: number;
    signaturePassword?: string;
}
interface ITokenConfig {
    enabled: boolean;
    users: string[];
}
interface IEmailNotificationSetting {
    daily: boolean;
    weekly: boolean;
}
declare class UserControl {
    static TOKEN_CONFIG: string;
    static EMAILNOTIF_CONFIG: string;
    constructor();
    editUserDetails(mode: UserEditMode, userId?: string, userAddedCb?: Function, noUserAddedCb?: Function): void;
    resetPassword(userId: string): void;
    private canAutoFill;
    askForPassword(container: JQuery, btnName: string, showUser: boolean, userWidth: number, onSign: (name: string, pwd: string) => void): void;
    protected initUserAndPassword(name: JQuery, pwd: JQuery, showUser: boolean): void;
    private editUserDetailsDlg;
    saveNotificationsSettings(user: string, setting: IEmailNotificationSetting): void;
    renderNotificationEmailReminder(userDetails: IUserCreate, table: JQuery): void;
    private createUserMail;
    private enableSavePwd;
    private setUserData;
    private getUserDetailsHTML;
    private generatePassword;
}
declare var userControls: UserControl;
declare class User {
    private element;
    private resultBox;
    constructor(el: string);
    isOK(): boolean;
    private validate;
}
interface JQuery {
    resizeDlgContent?: (ctrls: JQuery[] | ItemControl[], fullscreen?: boolean) => JQuery;
    highlight?: (words: string, options?: {}) => JQuery;
    unhighlight?: (options?: {}) => JQuery;
    highlightReferences?: (options?: {}) => JQuery;
    unhighlightReferences?: (options?: {}) => JQuery;
    getController?: () => IBaseControl;
    code?: (p?: string) => string;
    tablesorter?: any;
    annotator?: Function;
    resizeItem?: (width?: number, force?: boolean) => void;
}
interface JQueryStatic {
    eachAsync?: (collection: any[], fct: (indexInArray: number, valueOfElement: any) => JQueryDeferred<any>, idx?: number) => JQueryDeferred<any>;
}
interface ICreateDialogOptions {
    type: string;
    name: string;
    folder: boolean;
    created?: (newItems: IReference) => void;
    singleCreate?: boolean;
    dontOpenNewItem: boolean;
    parent: string;
    closed?: Function;
}
interface ICreateDialogEventOptions {
    data: ICreateDialogOptions;
}
interface ICreateDialogButtonOptions {
    control: JQuery;
    linkTypes: ILinkType[];
    singleCreate?: boolean;
    created?: (newRef: IReference) => void;
    isRiskControl?: boolean;
    type?: string;
    parent?: string;
    docTemplate?: boolean;
    open?: (view: ItemControl) => void;
    tinybuttons?: boolean;
    dontOpenNewItem: boolean;
}
declare class ItemCreationTools {
    private onOpenDlg;
    showDialog(options: ICreateDialogOptions): void;
    renderButtons(options: ICreateDialogButtonOptions): void;
    private showCreateDialog;
    private onDialogOpen;
    private showCreateDialogEvent;
}
interface IHistory {
    history: IVersionDetails[];
    id: string;
    panel?: JQuery;
    panelBorder?: JQuery;
    header?: JQuery;
    wasEdit?: boolean;
}
interface IHistoryMap {
    [key: string]: IHistory;
}
interface IPanelOptions {
    deletedItems: boolean;
    deletedate?: string;
    ctrl: JQuery;
    id: string;
    title: string;
    isFolder: boolean;
    version: number;
    user: string;
    action: string;
    dateServer: string;
    date: string;
    comment: string;
    allowRestore: boolean;
    fullVersion: string;
    auditId: number;
    tags: XRTag[];
}
interface IMergeLine {
    user: string;
    date: string;
    dateServer: string;
    tags: XRTag[];
    comment: string;
    ctrl: JQuery;
    auditId: number;
    action: string;
}
interface IAccordionLine {
    id: string;
    title: string;
    version: number;
    user: string;
    date: string;
    dateServer: string;
}
interface IReportLine extends IAccordionLine {
    job: number;
}
interface IExecuteLine extends IAccordionLine {
}
interface ISignLine extends IAccordionLine {
    reason: string;
}
interface IAccordionToggleOptions {
    ctrl: JQuery;
    id: string;
    version: number;
    panelId: number;
    auditId: number;
    action: string;
}
interface IShowHistoryDialogOptions {
    item: IItem;
    preselect?: number[];
    id?: string;
    isFolder?: boolean;
    readOnly?: boolean;
}
interface IShowHistoryDialogButtonOptions {
    item: IItem;
    control: JQuery;
    id?: string;
    isFolder?: boolean;
    readOnly?: boolean;
}
declare class HistoryTools {
    onNewResult(cb: () => void): void;
    private onNewResultCallback;
    private panelIdCounter;
    private controls;
    private lastHistory;
    private readHistory;
    private lastWasTimewarp;
    constructor();
    compareLatest(itemId: string): void;
    compare(fullVersion: string): void;
    compareVersions(itemId: string, oldVersion: number, newVersion: number): void;
    diffAgainstLatest(localChanges: IRestParam): void;
    showDeletedItems(ctrl: JQuery): void;
    showActivity(ctrl: JQuery, auditIdMin?: number, auditIdMax?: number): void;
    showReadersDigest(ctrl: JQuery): void;
    renderButtons(options: IShowHistoryDialogButtonOptions): void;
    private createPanel;
    private createDateInfo;
    private createCommentInfo;
    private createTag;
    private createReportLine;
    private createExecuteLine;
    private createReferenceLine;
    private createSignLine;
    private createMergeLine;
    private downloadReport;
    private toggle;
    updateVersionPanes(): void;
    private updateRowHeights;
    private renderVersionPanes;
    renderItemMeat(hi: JQuery, item: IItem): void;
    private showSaveConflict;
    private compareVersionDialog;
    private showHistoryDetails;
    private showHistoryDialog;
    private initHistoryOptionSelect;
    private updateHistoryOptionSelect;
    private showDiffDialog;
    private showNextActivity;
    pFrom: number;
    pCount: number;
    pTotal: number;
    scrollInstalled: boolean;
    private showNextReaders;
    private formatReadHistoryAction;
    private showReadHistory;
}
interface IReferenceToolsOptions {
    item: IItem;
    canEdit: boolean;
    callback?: (item: IItem) => void;
}
declare class ReferenceTools {
    showReferenceDialog(options: IReferenceToolsOptions): void;
}
interface IItemSelectDialogOptions {
    linkTypes: ILinkType[];
    getSelectedItems: () => IReference[];
    selectionChange: (newSelection: IReference[]) => void;
    crossProjectInit?: Function;
    crossProject?: boolean;
    crossProjectProject?: string;
    crossProjectFilter?: string;
    crossProjectFilterStrict?: boolean;
    selectMode?: SelectMode;
    selectOptions?: JQuery;
    dialogTitle?: string;
    focusOn?: string;
    height?: number;
    autoScroll?: boolean;
}
interface IItemSelectButtonOptions extends IItemSelectDialogOptions {
    buttonName?: string;
    smallbutton?: boolean;
    isRiskControl?: boolean;
    control: JQuery;
    tinybutton?: boolean;
}
declare class ItemSelectionTools {
    constructor();
    showDialog(options: IItemSelectDialogOptions): void;
    renderButtons(options: IItemSelectButtonOptions): void;
    private showSelectDialog;
    private toggleSelect;
    showCrossProjectDialog(options: IItemSelectDialogOptions): void;
    private removeHidden;
}
declare class Layouter {
    private itemId;
    private mf;
    private sectionConfig;
    private fromSelection;
    private toSelection;
    private isLandScape;
    private displayStyle;
    constructor();
    show(itemId: string, fieldId: number, sectionConfig: ICustomSectionOptions, fromSelection: string, toSelection: string, onUpdate: (code: string) => void): void;
    private initEditor;
    private formatterList;
    private displayPreview;
    private introOptions;
    private advancedOptions;
    private static sortItems;
    private waitForJob;
    private convert;
}
interface IThemes {
    [key: string]: string;
}
declare class ThemeSelector {
    themeSelectorAdded: boolean;
    constructor();
    private currentCSS;
    private injectCSS;
    private reloadCurrentCSS;
    loadTheme(themeName: string): void;
    init(): void;
    renderThemeSelectorControl(help: string, table: JQuery): void;
    themes: IThemes;
}
interface ICategoryGroupDB extends ICategoryGroup {
    kids: IDB[];
}
interface IDB {
    children?: IDB[];
    id?: string;
    title?: string;
    type?: string;
    isUnselected?: number;
    background?: string;
    border?: string;
    icon?: string;
    iconClass?: string;
    version?: string;
    extraStyle?: string;
    order?: number;
}
interface IDBParent {
    parent: string;
    position: number;
    item: IItem;
}
interface XRCategoryAndSettingListTypeExt {
    settingList: XRSettingType[];
    categoryId: number | string;
    categoryShort: string;
}
declare class DBCache {
    private db;
    private activities;
    private groupPos;
    private groupDefintion;
    constructor();
    protected createVirtualFolder(id: string, title: string, icon?: string, color?: string): IDB;
    protected createVirtualItem(order: number, id: string, title: string, icon?: string): IDB;
    sortChildren(itemId: string): void;
    initMatrixTree(init: IDB[], includeActivity: boolean): void;
    initConfigTree(init: IDB[]): void;
    /** getTree returns a tree or a sub tree of the project.
     * this call is synchronous. The database tree is created once during the
     * initialization and filtered after as needed.
     *
     * @param {type} subtreeFilter
     * @returns tree object
     */
    getTree(subtreeFilter: string[]): IDB[];
    getParentId(itemId: string): string;
    getBreadcrumbs(itemId: string): string[];
    getType(itemId: string): string;
    getIcon(itemId: string): string;
    setStyle(itemIds: string[], style: string, computeFolder: number): void;
    setStyleRec(folder: IDB[], itemIds: string[], style: string, computeFolder: number): boolean;
    isFolder(itemId: string): boolean;
    getItemTitle(itemId: string): string;
    getItemType(itemId: string): string;
    isHiddenLink(itemId: string): boolean;
    setHiddenLink(itemId: string, hidden: number): void;
    hasChildren(itemId: string): boolean;
    doesExist(itemId: string): boolean;
    insertItem(itemJson: IItem, parentId: string): IDBParent;
    copyFrom(target: string, source: IDB): boolean;
    getRootOfType(category: string): string;
    deleteItem(itemId: string): IDB;
    moveItem(itemId: string, newFolder: string, newPosition: number): void;
    updateItem(itemJson: IItem): void;
    getChildrenIds(parentId: string): string[];
    getItemFromCache(itemId: string): IDB;
    private internalReplace;
    private findInChildren;
    private findInDB;
    private findParentId;
    private deleteItemRec;
    private insertAtRec;
}
interface ISettingMapString {
    [key: string]: string;
}
interface ISettingMapStringArray {
    [key: string]: string[];
}
interface ISettingMapJSON {
    [key: string]: {};
}
interface ICategoryConfig {
    fieldList: XRFieldTypeAnnotated[];
    label: string;
    downLinksRequired: string[];
    downLinksOptional: string[];
    enable: string[];
}
interface ICategoryConfigMap {
    [key: string]: ICategoryConfig;
}
interface XRFieldTypeAnnotated extends XRFieldType {
    parameterJson?: XRFieldTypeAnnotatedParamJson;
}
interface XRFieldTypeAnnotatedParamJson extends IFieldParameter {
    linkTypes?: XRFieldTypeAnnotatedParamJsonLinkType[];
}
interface XRFieldTypeAnnotatedParamJsonLinkType {
    required: boolean;
    type: string;
}
interface IFieldsOfType {
    category: string;
    field: XRFieldTypeAnnotated;
}
interface IUserPermission {
    userPermission: XRUserPermissionType[];
}
interface ISettingValidationFinding {
    category?: string;
    findings: ISettingValidationFindingDetail[];
}
interface ISettingValidationFindingDetail {
    message: string;
    path: string;
}
interface IDropDownInfo {
    id: string;
    label: string;
    value: IDropDownConfig;
}
declare class ItemConfiguration {
    private configuration;
    private settings;
    private settingsString;
    private settingsJSON;
    private users;
    private userList;
    private userGroups;
    private modules;
    private accessRights;
    private timewarpDate;
    isConfigured(): boolean;
    addUsers(userPer: XRGetProject_ProjectInfo_ProjectInfo): void;
    getUserInfo(login: string): XRUserPermissionType;
    getFullName(login: string): string;
    getUserIds(): string[];
    getEmail(user?: string): string;
    activateTimewarp(date: string): void;
    getTimeWarp(): string;
    isAfterTimeWarp(date: string): boolean;
    hasWriteAccess(user: string): boolean;
    getPermission(user: string): number;
    getUserNames(sorted?: boolean): XRUserPermissionType[];
    getUserGroups(): XRGroupPermissionType[];
    addGroupMember(gid: number, user: string): void;
    removeGroupMember(gid: number, user: string): void;
    amIAllowedUser(limitedTo: string[]): boolean;
    addSettings(s: XRGetProject_ProjectInfo_ProjectInfo | XRGetProject_ProjectSettingAll_GetSettingAck): void;
    getSettings(): XRSettingType[];
    getSetting(s: string): string;
    getSettingJSON(s: string, def?: {}): {};
    getDropDowns(dropdownId?: string): IDropDownInfo[];
    getTasksConfig(): ITasksConfiguration;
    getDHFConfig(): IDHFConfig;
    getExtrasConfig(): IExtras;
    getLabelsConfig(): ILabelsConfig;
    getQMSConfig(): IQMSConfig;
    getRiskConfig(): IRiskConfig;
    getCategoryGroupConfig(): ICategoryGroups;
    getACLConfig(): IACL;
    getTraceConfig(): ITraceConfig;
    getNavigationBarConfig(project: string): INavigationBar;
    getContextPagesConfig(): IContextPageConfig;
    getMailConfig(): IMailConfig;
    getSearchConfig(): ISearchConfig;
    getLabelLockConfig(): ILabelLockConfig;
    getTestConfig(): ITestConfig;
    setSettingJSON(key: string, valueJSON: {}): void;
    getSmartText(): ISmartTextConfig;
    setSmartText(config: ISmartTextConfig): void;
    addCategorySetting(categorySetting: XRCategoryAndSettingListType): void;
    getCategorySettings(category: string): XRSettingType[];
    getPluginSetting(pluginId: number, setting: string): string;
    getPluginSettings(): XRPluginSetting[];
    getFieldsOfType(fieldType: string, categoryType?: string): IFieldsOfType[];
    getCategorySetting(category: string, setting: string): ICategorySetting;
    getCategories(noFolders?: boolean): string[];
    getCategoryLabel(category: string): string;
    getCategoryId(category: string): string;
    getDownLinkTypes(category: string, required: boolean): string[];
    getUpLinkTypes(category: string, required: boolean): string[];
    addCategories(config: XRGetProject_ProjectInfo_ProjectInfo | XRGetProject_CategoryList_GetProjectStructAck): void;
    init(config: XRGetProject_ProjectInfo_ProjectInfo): void;
    canEdit(category: string): boolean;
    canEditTitle(category: string): boolean;
    canMove(category: string): boolean;
    canCreate(category: string): boolean;
    canDelete(category: string): boolean;
    canModifyLabels(category: string): boolean;
    canSign(category: string): boolean;
    canReport(category: string): boolean;
    private canDo;
    private addCategory;
    getItemConfiguration(category: string): ICategoryConfig;
    getFieldId(category: string, fieldLabel: string): number;
    getFields(category: string): XRFieldTypeAnnotated[];
    getFieldByName(category: string, name: string): XRFieldTypeAnnotated;
    getFieldById(category: string, fieldId: number): XRFieldTypeAnnotated;
    getFieldType(category: string, fieldId: number): string;
    getLinkTypes(category: string, down: boolean, required: boolean): string[];
    getLinkInfo(category: string, down: boolean, required: boolean, groupByRule: boolean): ILinkInfo[];
    validateTraceability(tc?: ITraceConfig, cats?: string[], testCats?: string[], mitCats?: ISettingMapStringArray): ISettingValidationFinding[];
    getMitigations(): IStringStringArrayMap;
    private verifyNoTracesTo;
    private verifyTracesBetween;
    private checkReporting;
    private checkNoRules;
    getTraceRule(tc: ITraceConfig, category: string): ITraceConfigDetails;
    /** validate xtc settings
     *
     */
    validateTestConfiguration(tc?: ITestConfig, cats?: string[]): ISettingValidationFinding[];
    private goodResultClass;
    private wrongResultClass;
    private wrongResultHuman;
    private countResultCodes;
    private verifyColumns;
    private addTraceFinding;
}
interface ITraceRules {
    valid: boolean;
    mustHaveCategories: string[];
    canHaveCategories: string[];
    exstingCategories: string[];
    missingMustHaveCategories: string[];
    missingCanHaveCategories: string[];
    outdatedReferences: string[];
}
interface ILinkInfo {
    category: string | string[];
    reason: string;
}
interface IVersionDetails {
    action: string;
    id: string;
    title: string;
    user: string;
    date: string;
    dateUserFormat: string;
    job?: number;
    reason?: string;
    comment: string;
    version: number;
    fullVersion: string;
    auditId: number;
    tags: XRTag[];
}
interface INewItem {
    parent: string;
    position: number;
    item: IItem;
}
interface XRTrimNeedleItemJob extends XRTrimNeedleItem {
    job?: number;
}
interface ILogoConfig {
    fileId?: string;
    logoId?: string;
}
interface IReferenceUpdate {
    added: boolean;
    fromId: string;
    toId: string;
    date: string;
    dateUserFormat: string;
    comment: string;
    user: string;
}
interface ISimpleTree {
    itemId: string;
    title: string;
    children?: ISimpleTree[];
}
interface ISetField {
    fieldName: string;
    value: string;
}
declare class MatrixReq {
    private dbConnection;
    private _itemId;
    private _needsSave;
    private forceUIRefreshTimer;
    private lastState;
    private freezeDuringSave;
    mainApp: boolean;
    itemForm: JQuery;
    printForm: JQuery;
    dlgForm: JQuery;
    constructor(dataSource: RestDB);
    setCache(externalCache: DBCache): void;
    loadProject(project: string, item: string, showBoxDashboard?: boolean): void;
    updateFavicon(project: string, notification: boolean): void;
    private showHighTree;
    private showTree;
    getTree(subtreeFilter?: string[]): IDB[];
    getSubTree(itemId: string): ISimpleTree;
    getAuditDetailsAsync(auditId?: number, ignoreErrors?: boolean): JQueryDeferred<XRTrimAudit>;
    getItemAsync(itemId: string, version?: number, ignoreErrors?: boolean, noHistory?: boolean): JQueryDeferred<IItem>;
    getNeedlesAsync(searchExpr: string, up: boolean, down: boolean, fields: string, labels: boolean, ignoreFilters?: boolean): JQueryDeferred<IItem[]>;
    getItemProjectAsync(project: string, itemId: string, ignoreErrors?: boolean): JQueryDeferred<IItem>;
    getProjectItemAsync(project: string, itemId: string, version?: number, includeHistory?: boolean): JQueryDeferred<IItem>;
    getProjectCatFields(project: string): JQueryDeferred<XRCategoryExtendedType[]>;
    getItemFromTree(itemId: string): IDB;
    getChildrenIds(parentId: string): string[];
    getChildrenIdsRec(itemId: string): string[];
    getParentId(itemId: string): string;
    getBreadcrumbs(itemId: string): string[];
    setStyle(itemIds: string[], style: string, computeFolder: number): void;
    getRootOfType(category: string): string;
    startReportAsync(itemId: string, reportOptions: IReportOptions): JQueryDeferred<{}>;
    canLaunchReport(): JQueryDeferred<boolean>;
    startCreateDocumentAsync(itemId: string, reportOptions: IReportOptions): JQueryDeferred<XRPostProject_LaunchReport_CreateReportJobAck>;
    getReportDetails(jobId: number): JQueryDeferred<XRGetProject_JobStatus_JobsStatusWithUrl>;
    compareHTML(compareParams: XCPostCompareHtml): JQueryDeferred<XRPostProject_CompareHtml_HtmlCompareResult>;
    isFolder(itemId: string): boolean;
    getItemTitle(itemId: string): string;
    download(jobId: number, file: number, param?: string[]): void;
    downloadFromUrl(url: string, param?: IStringMap): void;
    downloadInMemory(jobId: number, file: string, dataType?: string): JQueryDeferred<string>;
    downloadInMemoryFromUrl(url: string): JQueryDeferred<string>;
    searchAsync(term: string, filter?: string, ignoreFilters?: boolean, fieldList?: string, crossProject?: string, labels?: boolean, down?: boolean, up?: boolean, treeOrder?: boolean): JQueryDeferred<ISearchResult[]>;
    updateItemInDBAsync(itemJson: IItemPut, auditAction: string, requireVersion?: number): JQueryDeferred<IItemGet>;
    getFieldFromDBAsync(itemId: string, fieldName: string): void;
    updateFieldInDBAsync(itemId: string, fieldName: string, value: string): void;
    updateFieldsInDBAsync(itemId: string, data: ISetField[]): void;
    createItemOfTypeAsync(category: string, itemJson: IItemPut, actions: string, parentId: string): JQueryDeferred<IDBParent>;
    restoreItemAsync(itemId: string, title: string, version: number): JQueryDeferred<IRestoreItemResult>;
    deleteItem(itemId: string): JQueryDeferred<{}>;
    private verifyNoLockedItems;
    uploadFileProjectAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<{}>;
    fetchFileAsync(url: string, progress: (p: IFileUploadProgress) => void): JQueryDeferred<XRPostProject_AddFile_AddFileAck>;
    resizeItem(force?: boolean): void;
    itemChanged(needsSave: boolean): void;
    updateItem(newItem: IItem): void;
    setFieldValue(fieldId: number, newValue: string): void;
    getFieldValue(fieldId: number): any;
    getCurrentTitle(): any;
    addDownLinkAsync(fromId: string, toId: string): JQueryDeferred<{}>;
    removeDownLinkAsync(fromId: string, toId: string): JQueryDeferred<{}>;
    setSettingJSON(key: string, valueJSON: {}): JQueryDeferred<{}>;
    readSettingJSONAsync(key: string, otherProject?: string, noRetry?: boolean): JQueryDeferred<{}>;
    setSettingCustomerJSON(key: string, valueJSON: {}): JQueryDeferred<unknown>;
    readSettingCustomerJSONAsync(key: string): JQueryDeferred<{}>;
    getMissingUpLinks(item: IItem): string[];
    isUpLinkMissing(item: IItem): boolean;
    getMissingDownLinks(item: IItem): string[];
    getLinkCategories(item: IItem, ctrlParameter: ILinkCollectionOptions): ILinkCategories[];
    isDownLinkMissing(item: IItem): boolean;
    isAnyLinkOutdated(item: IItem): boolean;
    hasLinks(item: IItem): boolean;
    isHiddenLink(itemId: string): boolean;
    setHiddenLink(itemId: string, hidden: number): void;
    saveAsync(sendUnEdit: boolean): JQueryDeferred<{}>;
    forceReadonly(itemId: string): void;
    cancel(): void;
    someOneElseChanged(): void;
    private waitingForEditRights;
    someOneIsChangingTheItem(): void;
    waitForEditRights(): void;
    someOneElseIsChanging(watcherInfo: IItemWatched): void;
    someOneElseWasChanging(watcherInfo: IItemWatched): void;
    someOneElseStoppedEditing(watcherInfo: IItemWatched, previousWatcherInfo: IItemWatched): void;
    updateItemViewers(watcherInfo: IItemWatched): void;
    protected updateItemDisplay(watcherInfo: IItemWatched): void;
    getVersion(): string;
    getNeedsSave(): boolean;
    getType(itemId: string): string;
    getAvailableReportsAsync(): JQueryDeferred<XRGetProject_Reports_GetReportsAck>;
    getDeletedItemsAsync(insertInList: (item: IVersionDetails) => void, progress: (p: number) => void, deleteLog?: IVersionDetails[], startAt?: number): JQueryDeferred<{}>;
    getActivityAsync(insertInList: (item: IVersionDetails, first?: number, last?: number, referenceChange?: IReferenceUpdate) => void, startAt?: number, count?: number, auditIdMin?: number, auditIdMax?: number): JQueryDeferred<number>;
    canNavigateAwayAsync(): JQueryDeferred<{}>;
    treeSelectionChangeAsync(newItemId: string): JQueryDeferred<{}>;
    moveItemsAsync(itemIds: string, newFolder: string, newPosition?: number, useComment?: string): JQueryDeferred<{}>;
    updateMaxVersion(itemId: string): JQueryDeferred<unknown>;
    removedFromTree(itemId: string, parentId: string): void;
    insertInTree(newItem: IDBParent): void;
    copyFrom(target: string, source: IDB): void;
    updateCache(newItem: IUpdateCache): void;
    createItemUrl(itemId?: string, crossProject?: string): string;
    renderItem(cachedItem?: IItem): void;
    print(): void;
    touchAsync(itemOrFolderId: string, depth: number): JQueryDeferred<string>;
    setLabels(newLabels: IItemGet): JQueryDeferred<{}>;
    needsSave(): boolean;
    signItemAsync(itemId: string, password: string): JQueryDeferred<XRPostProject_SignItem_SignItemAck>;
    checkPassword(password: string): JQueryDeferred<IRestResult>;
    convertDocAsync(fileNo: number, targetDocumentFolder?: string, useOriginal?: boolean): JQueryDeferred<string>;
    pingCurrentItem(): void;
    getCurrentItemId(): string;
    /** sessions */
    commitChangeListAsync(changeList: IReferenceChange[]): JQueryDeferred<{}>;
    /**
     *  product variations
     * */
    isMedical(strict?: boolean): boolean;
    commentRequired(): boolean;
    touchToolAvailable(item: IItem): boolean;
    auditTrailAvailable(): boolean;
    mailToolAvailable(): boolean;
    postLogin(user: string): void;
    canDeleteItem(item: IItem): boolean;
    canViewItem(item: IItem): boolean;
    canEditItem(item: IItem): boolean;
    canCreateItemType(category: string, folder?: boolean): boolean;
    canDragDrop(category: string, id: string): boolean;
    dragEnter?: (dragged: Fancytree.FancytreeNode, target: Fancytree.FancytreeNode) => string[] | boolean;
    canSeeField(category: string, field: number): boolean;
    canEditField(category: string, field: number): boolean;
    private refreshUIAsync;
    evaluateTraceRule(item: IItem, checkDownRule: boolean): ITraceRules;
    private commitChangeListRec;
    static getProjectIcon(customLogo: string, alternateValue?: string): any;
    static getProjectLogo(customLogo: string): any;
}
interface IItemViewEvent {
    caller: any;
    item: IItem;
    view: ItemControl;
}
interface IItemChangeEvent {
    caller: any;
    view: ItemControl;
    before: IItem;
    after: IItem;
}
interface IPreCreateItemEvent {
    caller: any;
    view: ItemControl;
    isItem: boolean;
    category: string;
}
interface IPreCreateCloseEvent {
    caller: any;
    ok: boolean;
}
interface IGenericItemEvent {
    caller: any;
    item: IItem;
}
interface IGenericItemIdEvent {
    caller: any;
    itemId: string;
}
interface INewItemIdEvent {
    caller: any;
    item: IDBParent;
}
interface ILabelChangeEvent {
    caller: any;
    item: IItem;
    set: string[];
    unset: string[];
}
interface ISignatureEvent {
    caller: any;
    item: IItem;
    lastuser: boolean;
}
interface IEvent<TArgs, TMode> {
    subscribe(caller: any, fn: (args: TArgs) => TMode): void;
    unsubscribe(fn: (args: TArgs) => TMode): void;
    dispatch(args: TArgs): TMode;
}
declare class EventDispatcher<TArgs> implements IEvent<TArgs, void> {
    private _subscriptions;
    private _callers;
    subscribe(caller: any, fn: (args: TArgs) => void): void;
    unsubscribe(fn: (args: TArgs) => void): void;
    dispatch(args: TArgs): void;
}
declare class EventDispatcherAsync<TArgs> implements IEvent<TArgs, JQueryDeferred<{}>> {
    private _subscriptionsAsync;
    private _callersAsync;
    subscribe(caller: any, fn: (args: TArgs) => JQueryDeferred<{}>): void;
    unsubscribe(fn: (args: TArgs) => JQueryDeferred<{}>): void;
    dispatch(args: TArgs): JQueryDeferred<{}>;
    private dispatchAsyncOne;
}
declare namespace MR1 {
    function triggerItemCreate(view: ItemControl, isItem: boolean, category: string): void;
    function triggerItemCreateClose(ok: boolean): void;
    function triggerItemDisplayed(item: IItem, view: ItemControl): void;
    function triggerBeforeSaveAsync(view: ItemControl, before: IItem, after: IItem): JQueryDeferred<{}>;
    function triggerAfterSave(view: ItemControl, before: IItem, after: IItem): void;
    function triggerAfterRestore(itemId: string): void;
    function triggerAfterDelete(item: IItem): void;
    function triggerAfterItemCreate(item: IDBParent): void;
    function triggerAfterCreateSign(item: IItem): void;
    function triggerBeforeDeleteAsync(item: IItem): JQueryDeferred<{}>;
    function triggerAfterLabelChange(item: IItem, before: string[], after: string[]): void;
    function triggerAfterSignature(item: IItem, lastuser: boolean): void;
    function onItemDisplayed(): IEvent<IItemViewEvent, void>;
    function onItemCreateDlgOpen(): IEvent<IPreCreateItemEvent, void>;
    function onItemCreateDlgClose(): IEvent<IPreCreateCloseEvent, void>;
    function onAfterSave(): IEvent<IItemChangeEvent, void>;
    function onAfterRestore(): IEvent<IGenericItemIdEvent, void>;
    function onAfterDelete(): IEvent<IGenericItemEvent, void>;
    function onAfterCreate(): IEvent<INewItemIdEvent, void>;
    function onAfterCreateSign(): IEvent<IGenericItemEvent, void>;
    function onAfterLabelChange(): IEvent<ILabelChangeEvent, void>;
    function onAfterSignature(): IEvent<ISignatureEvent, void>;
    function onBeforeSaveAsync(): IEvent<IItemChangeEvent, JQueryDeferred<{}>>;
    function onBeforeDeleteAsync(): IEvent<IGenericItemEvent, JQueryDeferred<{}>>;
}
/** tests...


// MR1.onAfterLabelChange().subscribe( this, function (event:ILabelChangeEvent) { console.log("Label changed for " + event.item.id + " set: '" + event.set.join() + "' unset: '" + event.unset.join() + "'");} );


MR1.onBeforeDeleteAsync().subscribe( this, function (event:IGenericItemEvent) {
    console.log("MR1 >>>Could cancel item delete " + event.item.id);

    let res = $.Deferred();
    res.resolve(); // res.reject(); to cancel
    return res;
});

MR1.onBeforeSaveAsync().subscribe( this, function (event:IItemChangeEvent) {
    console.log("MR1 >>>Could cancel save of " + event.before.id);

    let res = $.Deferred();
    res.resolve(); // res.reject(); to cancel
    return res;
});

MR1.onAfterCreate().subscribe( this, function (event:INewItemIdEvent) { console.log("MR1 >>>Item created " + event.item.item.id);} );
MR1.onAfterCreateSign().subscribe( this, function (event:IGenericItemEvent) { console.log("MR1 >>>SIGN created " + event.item.id);} );

MR1.onAfterSignature().subscribe( this, function (event:ISignatureEvent) { console.log("MR1 >>>SIGNED " + event.item.id + " by " + matrixSession.getUser() +  ( event.lastuser?" as last signature":" but not last signature"));} );

MR1.onAfterSave().subscribe( this, function (event:IItemChangeEvent) { console.log("MR1 >>>Item saved " + event.after.id);} );
MR1.onAfterRestore().subscribe( this, function (event:IGenericItemIdEvent) { console.log("MR1 >>>Item restored " + event.itemId);} );

MR1.onAfterDelete().subscribe( this, function (event:IGenericItemEvent) { console.log("MR1 >>>Item deleted " + event.item.id);} );

MR1.onItemDisplayed().subscribe( this, function (event:IGenericItemEvent) { console.log("MR1 >>>Item displayed " + event.item.id);} );

MR1.onItemCreateDlgOpen().subscribe( this, function (event:IPreCreateItemEvent) {  console.log("MR1 >>>Create item dialog with " + event.view.getControls().length + " controls.");}  );

*/
/** example extract all italic from text and put in title when saving if title is " " or ""
MR1.onBeforeSaveAsync().subscribe( this, function (event:IItemChangeEvent) {
    console.log("MR1 >>>Could cancel save of " + event.before.title);

    if (event.after.title == " " || event.after.title == "") {
        let tf = IC.getFieldsOfType("richtext",event.after.type);
        let italics="";
        $.each( tf, function(idx, tfd) {
            let tfc = $("<div>").html(event.after[tfd.field.id]);
            $("span", tfc).each( function(spanIdx,span) {
                if ($(span).css("font-style").indexOf("italic")!=-1) {
                    italics += italics?(" "+$(span).text()):$(span).text();
                }
            });
        });
        event.after.title = italics?italics:"title required";
    }

    let res = $.Deferred();
    res.resolve();
    return res;
});

 */
interface IGetProjectResult {
    settings: IGetProjectResultSetting[];
    currentUser: string;
    customerAdmin: number;
    superAdmin: number;
    dateInfo: IGetProjectResultDateInfo;
    customerSettings: IGetProjectResultSetting[];
    project: XRProjectType[];
}
interface IGetProjectResultSetting {
    key: string;
    value: string;
}
interface IGetProjectResultDateInfo {
    timeformat: string;
    dateformat: string;
    timeZone: string;
    customerDateformat: string;
    customerTimeformat: string;
    customerTimezone: string;
    dateIso8601: string;
    timeUserFormat: string;
}
interface IGetProjectResultDateInfos {
    key: string;
    value: string;
}
interface ICustomerSettingString {
    [key: string]: string;
}
interface ICustomerSettingJSON {
    [key: string]: {};
}
interface IPostLoginResult {
    actualLogin: string;
    userId: number;
    userDetails: IPostLoginResultUserDetail;
    maxAge: number;
}
interface IPostLoginResultUserDetail {
    id: number;
    login: string;
    email: string;
    firstName: string;
    lastName: string;
    signatureImage: number;
    customerAdmin: number;
    passwordAgeInDays: number;
    badLogins: number;
    badLoginsBefore: number;
    superAdmin: number;
    userSettingsList: IGetProjectResultSetting[];
}
interface ICompanyUISettings {
    /** allow to add links to locked items */
    allowAddLinkToLocked?: boolean;
    /** if true the save button is always on the left */
    saveLeft?: boolean;
    /** if set to true, auto clean the input of text fields */
    purify?: boolean;
    /** editor setting */
    tiny?: ICompanyTiny;
    /** always use new editor (also for old projects) */
    tinyAsDefault?: boolean;
    /** true if user should be able to switch from editor to tiny per field */
    tinyUpgradeOption?: boolean;
    /** @experimental: Enable the widget dashboard on instance root */
    widgetDashboardOption?: boolean;
    /** internal: url of draw io editor */
    drawioURL?: string;
    /** @experimental: if set to anything > 0 the fields in a form are rendered in a non blocking way if there are more than largeFormRender fields */
    largeFormRender?: number;
    /** @internal beta - do not auto select parents if single item is selected for DOC */
    preciseDocSelect?: boolean;
    /** @internal obsolete */
    legacyPrint?: boolean;
    /** @internal obsolete */
    legacyUserDropdown?: number;
    /** @internal obsolete */
    legacyKeepFolder?: boolean;
}
interface ICompanyTiny {
    /** true if browser context menu should be used as default */
    tinyHideMenu?: boolean;
    /** enable or disable editor plugins */
    plugins?: string[];
    /** toolbar definition */
    toolbar?: string;
    /** menubar definition  default: edit view insert format table matrix */
    menubar?: string;
    /** menu entries can be used to change default menus or add details of new menu bar */
    menu?: ICompanyTinyMenuMap;
    /** allows to overwrite any default setting (e.g. misc: { "table_toolbar": ""} )  to hide table toolbar */
    misc?: any;
    /** html entities to accept in text */
    extended_valid_elements?: string;
    /**  optional: formats in Paragraph menu (for docs) */
    block_formats_doc?: any;
    /** optional: rules for formats (for docs) */
    apply_formats_doc?: any;
    /** optional: formats in style menu (for docs) */
    style_formats_doc?: any;
    /** optional: formats in Paragraph menu (for items) */
    block_formats?: any;
    /** optional: rules for formats (for items)  */
    apply_formats?: any;
    /** optional: formats in style menu (for items) */
    style_formats?: any;
    /** elements which don't need content (e.g. a TD cell can be empty, needs to be the complete list) */
    short_ended_elements?: string;
    /** a custom css name/path */
    css?: string;
    /** if true it used dom purify to super clean the html */
    dompurify?: boolean;
}
interface ICompanyTinyMenuMap {
    [key: string]: ICompanyTinyMenu;
}
interface ICompanyTinyMenu {
    /** display name of menu */
    title: string;
    /** items to show */
    items: string;
}
declare class MatrixSession {
    private quiet;
    private CurrentUser;
    private CurrentProject;
    private CurrentComment;
    private customerAdmin;
    private superAdmin;
    private dateInfo;
    private customerSettingsString;
    private customerSettingsJSON;
    private ProjectList;
    private CommitTransaction;
    private CommitTransactionComment;
    private CommitTransactionCancelled;
    private postConnect;
    duringBrowserNavigation: boolean;
    private userPermissions;
    private licensedModules;
    lastManualComment: string;
    serverConfig: XRGetProject_StartupInfo_ListProjectAndSettings;
    private myTodoCount;
    private myTodos;
    pushMessages: PushMessages;
    private customParams;
    private branches;
    constructor();
    startCommitTransaction(): void;
    stopCommitTransaction(): void;
    getUser(): string;
    setUser(login: string): void;
    private setDateInfo;
    getDateInfo(): IGetProjectResultDateInfo;
    private setCustomerSettings;
    setCustomerSettingJSON(s: string, setting: {}): void;
    getCustomerSetting(s: string): string;
    getCustomerSettingJSON(s: string, defaultValue?: {}): any;
    getUISettings(defaultValues?: {}): ICompanyUISettings;
    setUISetting(setting: string, value: any): void;
    showUISettings(): void;
    isEditor(): boolean;
    isCustomerAdmin(): boolean;
    isSuperAdmin(): boolean;
    isAdmin(): boolean;
    getProject(): string;
    setProject(projectId: string): void;
    getCommentAsync(): JQueryDeferred<string>;
    getComment(): string;
    private makeTeaser;
    getCommentTeaser(): string;
    setComment(comment?: string, internal?: boolean): void;
    isGroup(): boolean;
    isQMS(): boolean;
    isMerge(): boolean;
    isReview(): boolean;
    isACL(): boolean;
    isQMSProject(project?: string): boolean;
    limitAdmin(): boolean;
    hasRisks(): boolean;
    hasVariants(): boolean;
    hasDocs(): boolean;
    hasAgileSync(): boolean;
    private setModules;
    private getLastComments;
    tryReconnect(): JQueryDeferred<{}>;
    signInAfterTimeout(): JQueryDeferred<{}>;
    triggerLoginWithDialog(): void;
    changePassword(): void;
    getProjectList(readOrWriteOnly: boolean): XRProjectType[];
    canSeeProject(project: string): boolean;
    private changeToken;
    getImgFromProject(pRef: string, offsetTop?: number): string;
    private createProjectSelectLink;
    updateUI(afterTimeout?: boolean, showBoxDashboard?: boolean): void;
    updateCommentCheckboxBoxVisibility(): any;
    loadProject(projectId: string, projectURL?: string, setAsProjectUrl?: boolean, showBoxDashboard?: boolean): void;
    oAuthOnly(): boolean;
    private showProjectSelectMessage;
    private filterProjects;
    private getItemFromUrlOrStorage;
    private getProjectFromUrlOrStorage;
    browserNavigation(): void;
    signOut(requestAdminRights: boolean): void;
    editComment(): void;
    showLoginWindow(): void;
    hideLoginWindow(): void;
    private requestLogin;
    private receiveMessage;
    private addHelpButton;
    getHelpButton(): string;
    private showUserMenu;
    setNotificationCounts(todos: XRTodoCount[]): void;
    getNotificationCounts(): XRTodoCount[];
    getNotifications(): XRTodo[];
    setNotifications(todos: XRTodo[]): void;
    initPushMessaging(): JQueryDeferred<{}>;
    private lastWatchInfo;
    updateWatchItemVersion(itemId: string, newVersion: number): void;
    isConfigClient(): boolean;
    private updateSettings;
    getBranches(mainline: string, branch: string): XRMainAndBranch[];
    private signOutCleanUp;
    getCustomParams(): IStringMap;
}
interface IPlugin {
    initItem?: (item: IItem, jui: JQuery) => void;
    initServerSettings?: (serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings) => void;
    updateMenu?: (ul: JQuery, hook: number) => void;
    supportsControl?: (ctrl: string) => boolean;
    createControl?: (ctrlObj: JQuery, settings: IBaseControlOptions) => void;
    initProject?: (project: string) => void;
    isDefault?: boolean;
    filterProject?: (db: IDB[]) => void;
    updateSearchPanel?: () => void;
    updateItemPanel?: () => void;
    updateItem?: (item: IItem) => void;
    getProjectPages?: () => IProjectPageParam[];
    preSaveHook?: (isItem: boolean, type: string, controls: IControlDefinition[]) => JQueryDeferred<{}>;
    renderActionButtons?: (options: IItemControlOptions, body: JQuery, controls: IControlDefinition[]) => boolean;
    updateTree?: () => void;
    getFieldConfigOptions?: () => IFieldDescription[];
    addFieldSettings?: (configApp: any, project: string, pageId: string, fieldType: string, fieldParams: IFieldParameter, ui: JQuery, paramChanged: () => void, canBePublished?: boolean) => void;
    getProjectSettingPages?: () => ISettingPage[];
    getCustomerSettingPages?: () => ISettingPage[];
    getPluginName?: () => string;
    getPluginVersion?: () => string;
    categorySetting?: (key: string) => string;
    editCategorySetting?: (key: string, category: string) => void;
    helpUrl?: string;
}
declare let pluginHooks: {
    shares: number;
};
interface ISettingPage {
    id: string;
    title: string;
    help?: string;
    externalHelp?: string;
    render: (ui: JQuery) => void;
    advanced?: () => void;
    del?: () => void;
}
interface IProjectPageParam {
    id: string;
    title: string;
    render: any;
    destroy?: any;
    folder?: string;
    order: number;
    folderTitle?: string;
    icon?: string;
    usesFilters: boolean;
}
interface IPluginControl {
    [key: string]: Function;
}
interface IPluginPanelOptions {
    type: string;
    control: JQuery;
    controlState: number;
}
declare class PluginManager {
    private _jui;
    private _plugins;
    private controls;
    private destructors;
    private titles;
    private usesFilters;
    private activeControlPage;
    /** Called by the main UI handing over a div which can be used inside a plugin
     * to display modal popups
     *
     * @param {jquery object} jui a $("<div />") object
     * @returns {undefined}
     */
    setUI(jui: JQuery): void;
    /** function to register a plugin for a specific menu (specified by the hook)
     *
     * @param {instance of plugin} plugin
     * @returns {undefined}
     */
    register(plugin: IPlugin): void;
    /** this method is called from the main UI whenever an item is selected to be
     * displayed. The information is forwarded to all plugins
     *
     * @param {json object} item for example a requirement. see the json documention of item types
     * @returns {undefined}
     */
    init(item: IItem): void;
    /** this method is called after connecting to server using getServer ("")
     *
     * @param {json serverSettings} serverSettings or null after unsucessful login
     * @returns {undefined}
     */
    initServerSettings(serverSettings?: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    /** this method is called when creating a menu which has a hook. it allows the plugins to add
     * li's to the ul supplied
     *
     * @param {pluginHooks} hook identifies the menu
     * @param {jquery object} ul  a $("<ul />) object
     * @returns {undefined}
     */
    updateMenu(hook: number, ul: JQuery): void;
    getFieldConfigOptions(): IFieldDescription[];
    addFieldSettings(configApp: any, project: string, pageId: string, fieldType: string, fieldParams: IFieldParameter, ui: JQuery, paramChanged: () => void, canBePublished?: boolean): void;
    supportsControl(ctrl: string): boolean;
    createControl(ctrlObj: JQuery, settings: IBaseControlOptions): void;
    initProject(project: string): void;
    filterProject(db: IDB[]): void;
    updateSearchPanel(): void;
    updateItemPanel(): void;
    updateItem(updates: IItem): void;
    updateTree(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControlPage(controlType: string): boolean;
    createControlPage(options: IPluginPanelOptions): void;
    destroyActiveControlPage(): void;
    callPreSaveHook(isItem: boolean, type: string, controls: IControlDefinition[]): JQueryDeferred<{}>;
    renderActionButtons(options: IItemControlOptions, body: JQuery, controls: IControlDefinition[]): boolean;
    /******************** admin function  */
    getPlugins(): IPlugin[];
}
declare var plugins: PluginManager;
interface IPluginDocumentSection {
}
interface IDHFFieldListItem {
    id: string;
    label: string;
}
interface IDHFField {
    type: string;
    name: string;
}
interface IDHFControlDefinition extends IControlDefinition {
    dhfValue?: IDHFControlDefinitionValue;
    configTouched?: boolean;
}
interface IDHFControlDefinitionValue {
    fieldValue?: string;
    fieldValueXML?: string;
    name?: string;
    type?: string;
    ctrlConfig?: IDHFSectionOptions;
}
interface IDHFSection {
    renderControl: (ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions) => void;
    updateXmlValue: (ctrl: IDHFControlDefinition) => void;
    getConfig: (ctrl: IDHFControlDefinition) => IDHFSectionOptions;
    addSignatures: (signatures: string[], currentValue: IDHFControlDefinition, all?: boolean) => void;
    showSpecificSettings: (ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery) => void;
    saveSpecificSettings: (ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery) => boolean;
    hasSearch?: (ctrl: IDHFControlDefinition) => boolean;
    executeSearch?: (ctrl: IDHFControlDefinition) => void;
    verifySearch?: (ctrl: IDHFControlDefinition) => void;
    verifyContent: (ctrl: IDHFControlDefinition) => void;
}
interface IDHFSectionOptions {
    globalOptions?: boolean;
    show_section_title?: string;
    automation?: string;
    page_break?: string;
    landscape?: boolean;
    sub_section?: string;
}
interface IDHFFieldParameter {
    autoHide?: boolean;
    perItemVisibility?: boolean;
}
interface IDHFFieldValue {
    type: string;
}
interface IDHFXMLOptions {
}
interface IDHFPasteBuffer {
    tree: ISimpleTree;
    items: IDHFPasteBufferItem[];
}
interface IDHFPasteBufferItem {
    sourceItem: string;
    sourceProject: string;
    pasteSource: string;
    title: string;
    item: IDHFPasteBufferValue[];
}
interface IDHFPasteBufferValue {
    def: XRFieldTypeAnnotated;
    val: string;
}
interface IDHFReorder {
    idx: number;
    id: string;
    name: string;
    type: string;
}
interface IDHFFileOption {
    name: string;
    click: Function;
}
interface IDHFGuidOid {
    guid: string;
    oid: string;
}
interface IDHFWizardData {
    dhfItems: any[];
    dhfNumber: string;
    dhfGUID: string;
    dhfName: string;
    template?: string;
}
interface IDHFFactory {
    [key: string]: (config: IDHFConfig) => IDHFSection;
}
interface ISectionInfo {
    sectionName: string;
    sectionType: DocumentSectionType;
    hidden: boolean;
}
declare enum DocumentSectionType {
    Static = 1,
    Database = 2,
    Table = 3,
    Technical = 4,
    CustomTable = 5
}
interface IGrandMother {
    id: string;
    version: number;
    fullId: string;
    title: string;
}
interface ISectionMap {
    [key: string]: ISectionInfo;
}
interface ItemSortInfo {
    itemId: string;
    item: JQuery;
    existsInBoth: boolean;
}
declare const DOC_NUM_NAME = "Document Number";
declare class PluginManagerDocuments {
    private wasInformedToday;
    private wasInformedTodayAbout;
    private dhf_config;
    private item;
    private jui;
    private ColumnTypes;
    private sectionFactories;
    private sectionTypeNames;
    readonly COPY_PASTE_BUFFER = "pasteBuffer";
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrl: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(project: string): void;
    getProjectPages(): IProjectPageParam[];
    renderActionButtons(options: IItemControlOptions, body: JQuery, controls: IDHFControlDefinition[]): boolean;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, fieldValue: string): boolean;
    getValue(ctrl: IDHFControlDefinition): string;
    configChanged(ctrl: IDHFControlDefinition): boolean;
    getDefaultFormat(category: string): string;
    showInProjectFolder(category: string): boolean;
    isDocumentType(category: string): boolean;
    getDocumentTypes(): string[];
    getDocumentFormTypes(): string[];
    getDocumentTemplatesTypes(): string[];
    isDocumentFormType(category: string): boolean;
    isSignedType(category: string): boolean;
    getSignedAsync(docId: string, labelFilter?: string): JQueryDeferred<IReference[]>;
    registerSection(sectionType: DocumentSectionType, sectionId: string, sectionName: string, creator: (config?: IDHFConfig, dhfType?: string, columnTypes?: ColumnTypesInfo) => IDHFSection, hidden?: boolean): void;
    isUsedAsTemplate(itemId: string): boolean;
    removeAsTemplate(itemId: string): void;
    private runSearch;
    showConfigDialog(sectionName: string, _controller: IDHFSection, _ctrl: IDHFControlDefinition, _ctrlParameter: IBaseControlOptions, title: string, hideStandardOptions: boolean): void;
    getArchiveButtonName(): string;
    getToolFolderName(): string;
    showCreateFromDocx(options: ICreateDialogOptions): void;
    loadDocument(jobId: number, onLoad: (htmlDOM: any) => void): void;
    getSignatureMeanings(): IStringMap;
    private getDefaultFields;
    getDhfControls(): ISectionMap;
    setConfig(config: IDHFConfig): void;
    private appendConfigTool;
    private getSignatures;
    private showDHFCreateWizard;
    private createFromTemplate;
    private transformTemplate;
    private copyTemplates;
    copyTemplate(items: string[], itemIdx: number, quiet: boolean): JQueryDeferred<{}>;
    private pasteTemplates;
    private pasteTemplate;
    private getFieldByType;
    /** requires sectionName or sectionType to identify field(s) */
    private getDHFFieldValuesFromItem;
    /** requires sectionName or sectionType to identify field */
    private setDHFFieldValueOfItem;
    preparePasteBuffer(tree: ISimpleTree): void;
    private addToPasteBuffer;
    private docHasContent;
    private dhfFactory;
    private getNumberOfDHFSections;
    private getControlFieldName;
    private reorderDialog;
    private hasFileAttachments;
    private hideFileOption;
    private renderControlsSIGN;
    private getFilterCtrl;
    private getFilterValue;
    private renderControlsDOC;
    private createSIGN;
    private verifyVersionTableComplete;
    private verifyVersionInfo;
    private getVersionFromTable;
    private hasPackage;
    private createConfirmedDownloadOrSIGN;
    private getSignatureInfo;
    private renderSignDownload;
    private getOtherSigns;
    private createCompareButton;
    private compareDocuments;
    private redlineDocuments;
    private filterAlignItems;
    compareDocumentsContent(thisId: string, otherId: string, left: string, right: string, ui: JQuery): void;
    private fillSideBySide;
    getDocumentStatus(item: IItem): IDocumentStatus;
}
interface IDocumentStatus {
    isDoc?: boolean;
    isDocWithTemplate?: boolean;
    isDocWithEmptyTemplate?: boolean;
    isDocWithFilledSignatureTable?: boolean;
    isDocWithEmptySignatureTable?: boolean;
    isDocWithoutSignatureTable?: boolean;
    isSign?: boolean;
    isSignNeedingTemplateApproval?: boolean;
    isSignNeedingTemplateMyApproval?: boolean;
    isSignApprovedTemplate?: boolean;
    isSignNeedingSignature?: boolean;
    isSignCompletlySigned?: boolean;
    isSignNoSignatureNoTemplate?: boolean;
}
declare class ColumnTypesInfo {
    private config;
    private editorOfType;
    private nameOfType;
    constructor(config: IDHFConfig);
    private getCustomTypeDef;
    getCustomDropDownOptions(type: string): IDropdownOption[];
    getNames(currentColumns: string[]): {
        [key: string]: string;
    };
    getEditorOfType(type: string): TableCellEditor;
    getOptionsOfType(type: string): IDropdownOption[];
    getNameOfType(type: string): string;
}
declare let mDHF: PluginManagerDocuments;
interface IPushMessage {
    subject: string;
    project: string;
    item: string;
    version: string;
    users: string;
    parent: string;
    title: string;
    error?: string;
}
interface IItemEditor {
    user: string;
    thisSocket: boolean;
}
interface IItemWatched {
    item: string;
    users: string[];
    editor: IItemEditor;
    version: number;
}
interface IItemUpdated {
    item: string;
    version: string;
    title: string;
}
interface IItemCreated {
    item: string;
    parent: string;
    title: string;
}
interface IItemDeleted {
    item: string;
}
interface ITodoChanged {
}
declare class PushMessages {
    private webSocket;
    private itemWatched;
    private itemUpdated;
    private itemCreated;
    private itemDeleted;
    private todoChanged;
    constructor();
    newConnection(): JQueryDeferred<{}>;
    connect(): JQueryDeferred<number>;
    private preventConcurrentEdit;
    private reconnectAfterCloseMessage;
    trigger(message: any): void;
    private sendCurrentEditingStatus;
    private retryTimer;
    private send;
    watchItem(itemId: string): void;
    unWatchItem(): void;
    editItem(itemId: string): void;
    unEditItem(): void;
    onTodoChanged(fn: (args: ITodoChanged) => void): void;
    onItemUpdated(fn: (args: IItemUpdated) => void): void;
    onItemCreated(fn: (args: IItemCreated) => void): void;
    onItemDeleted(fn: (args: IItemDeleted) => void): void;
    onItemWatched(fn: (args: IItemWatched) => void): void;
}
interface IRestConfig {
    server: string;
}
interface IRestTimer {
    start: number;
    end?: number;
    status?: number;
    command?: string;
    type?: string;
}
interface IJcxhr {
    status: number;
    responseText: string;
    responseJSON: IResponseJson;
    displayError: string;
    statusText?: string;
}
interface IResponseJson {
    category: string;
    detailsList: string[];
    displayError?: string;
    code?: string;
}
interface IFileParam {
    name: string;
}
interface IFileUploadProgress {
    position?: number;
    loaded?: number;
    totalSize?: number;
    total?: number;
}
interface IFileUploadResult {
    fileId: string;
    fileFullPath: string;
    key: string;
}
declare class RestConnector {
    private restServer;
    private restServerProject;
    private timer;
    private keepAlive;
    constructor(config: IRestConfig);
    setProject(projectName: string): void;
    getProject(cmd: string, ignoreErrors?: boolean, ignoreFilters?: boolean): JQueryDeferred<IRestResult>;
    getServer(cmd: string, noRetry?: boolean): JQueryDeferred<IRestResult>;
    postServer(cmd: string, param?: IRestParam, payload?: boolean): JQueryDeferred<IRestResult>;
    postProject(cmd: string, param: IRestParam, payload?: boolean): JQueryDeferred<IRestResult>;
    putServer(cmd: string, param: IRestParam, asPayload?: boolean): JQueryDeferred<IRestResult>;
    putProject(cmd: string, param: IRestParam, itemId?: string): JQueryDeferred<IRestResult>;
    deleteProjectAsync(cmd: string, param: IRestParam, asString?: boolean): JQueryDeferred<IRestResult>;
    deleteServerAsync(cmd: string, param: IRestParam, asString?: boolean): JQueryDeferred<IRestResult>;
    download(cmd: string, params?: string[] | IStringMap): void;
    getFile(cmd: string, dataType?: string): JQueryDeferred<IRestResult>;
    uploadFileProjectAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<IFileUploadResult>;
    fetchFileAsync(url: string, progress: (p: IFileUploadProgress) => void): JQueryDeferred<IFileUploadResult>;
    uploadFileCustomerAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<IFileUploadResult>;
    importProjectAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void, params: {}): any;
    uploadFileServerAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void, target: string, params: {}, urlSuffix: string): JQueryDeferred<IFileUploadResult>;
    convertExcelProjectAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<string>;
    convertExcelServerAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<string>;
    isTimeout(jqxhr: IJcxhr): boolean;
    isGatewayTimeout(jqxhr: IJcxhr): boolean;
    handleError(jqxhr: IJcxhr, textStatus: string, error: string, cmd: string, param?: IRestParam, itemId?: string): JQueryDeferred<IRestResult>;
    private get;
    private post;
    postSpecialServer(cmd: string, param: IRestParam): JQueryDeferred<IRestResult>;
    private postSpecial;
    private put;
    private deleteRestAsync;
}
interface ISearchResult {
    itemId: string;
    version: number;
    title: string;
    fieldVal?: ISearchResultField[];
    downlinks: string[];
    uplinks: string[];
    labels: string[];
}
interface ISearchResultField {
    id: number;
    value: string;
}
interface IRestoreItemResult {
    item: string;
    version: number;
    response: XRPostProject_RestoreItem_UndeleteAnswer;
}
interface IUpdateCache {
    item: IItem;
    parent: string;
}
declare class RestDB {
    private restConnection;
    private _project;
    private dbCache;
    constructor(init: RestConnector);
    setProject(project: string): void;
    setSettingJSON(key: string, valueJSON: {}): JQueryDeferred<{}>;
    readSettingJSONAsync(key: string, otherProject?: string, noRetry?: boolean): JQueryDeferred<{}>;
    setSettingCustomerJSON(settingId: string, valueJSON: {}): JQueryDeferred<unknown>;
    readSettingCustomerJSONAsync(key: string): JQueryDeferred<unknown>;
    setCache(externalCache: DBCache): void;
    retrieveTreeAsync(): JQueryDeferred<{}>;
    doesExist(itemId: string): boolean;
    getChildrenIds(parentId: string): string[];
    getItemFromTree(itemId: string): IDB;
    getItemAsync(itemId: string, ignoreErrors: boolean, includeHistory: boolean): JQueryDeferred<IItem>;
    getNeedlesAsync(searchExpr: string, up: boolean, down: boolean, fields: string, labels: boolean, ignoreFilters?: boolean): JQueryDeferred<IItem[]>;
    getItemProjectAsync(project: string, itemId: string, ignoreErrors: boolean, includeHistory: boolean): JQueryDeferred<IItem>;
    getProjectItemAsync(project: string, itemId: string, includeHistory: boolean): JQueryDeferred<IItem>;
    startReportAsync(itemId: string, reportOptions: IReportOptions): JQueryDeferred<{}>;
    canLaunchReport(): JQueryDeferred<XRGetProject_AllJob_JobsWithUrl>;
    startCreateDocumentAsync(itemId: string, reportOptions: IReportOptions): JQueryDeferred<XRPostProject_LaunchReport_CreateReportJobAck>;
    getReportDetails(jobId: number): JQueryDeferred<XRGetProject_JobStatus_JobsStatusWithUrl>;
    compareHTML(compareParams: XCPostCompareHtml): JQueryDeferred<XRPostProject_CompareHtml_HtmlCompareResult>;
    download(jobId: number, file: number, param: string[]): void;
    downloadFromUrl(url: string, param?: IStringMap): void;
    downloadInMemory(jobId: number, file: string, dataType?: string): JQueryDeferred<string>;
    downloadInMemoryFromUrl(url: string): JQueryDeferred<string>;
    getType(itemId: string): string;
    touchAsync(itemId: string, depth: number, comment: string): JQueryDeferred<string>;
    getIcon(itemId: string): string;
    private parseSearchResult;
    searchAsync(term: string, filter?: string, ignoreFilters?: boolean, fieldList?: string, crossProject?: string, labels?: boolean, down?: boolean, up?: boolean, treeOrder?: boolean): JQueryDeferred<ISearchResult[]>;
    getVersionAsync(itemId: string, version: number, includeHistory?: boolean): JQueryDeferred<{}>;
    getProjectVersionAsync(project: string, itemId: string, version: number, includeHistory?: boolean): JQueryDeferred<{}>;
    getProjectCat(project: string): JQueryDeferred<XRGetProject_CategoryList_GetProjectStructAck>;
    getAuditLogAsync(startAt: number, maxResults: number, param: XCGetProjectAudit): JQueryDeferred<XRGetProject_ProjectAudit_TrimAuditList>;
    getAuditDetailsAsync(auditId?: number): JQueryDeferred<XRTrimAudit>;
    getAvailableReportsAsync(): JQueryDeferred<XRGetProject_Reports_GetReportsAck>;
    getTree(subtreeFilter: string[]): IDB[];
    getParentId(itemId: string): string;
    getBreadcrumbs(itemId: string): string[];
    setStyle(itemIds: string[], style: string, computeFolder: number): void;
    getRootOfType(type: string): string;
    hasChildren(itemId: string): boolean;
    isFolder(itemId: string): boolean;
    getItemTitle(itemId: string): string;
    isHiddenLink(itemId: string): boolean;
    setHiddenLink(itemId: string, hidden: number): void;
    createItemAsync(itemJson: IItemPut, comment: string, actions: string, parentId: string): JQueryDeferred<IDBParent>;
    signItemAsync(itemId: string, password: string, comment: string): JQueryDeferred<XRPostProject_SignItem_SignItemAck>;
    checkPassword(password: string): JQueryDeferred<IRestResult>;
    convertDocAsync(fileNo: number, comment: string, targetDocumentFolder?: string, useOriginal?: boolean): JQueryDeferred<string>;
    restoreItemAsync(itemId: string, title: string, version: number, comment: string): JQueryDeferred<IRestoreItemResult>;
    updateItemAsync(itemJson: IItemPut, comment: string, auditAction: string, requireVersion?: number): JQueryDeferred<IItemGet>;
    moveItemsAsync(itemIds: string, newFolder: string, newPosition: number, comment: string): JQueryDeferred<{}>;
    updateCache(newItem: IUpdateCache): void;
    copyFrom(target: string, source: IDB): boolean;
    deleteItemAsync(itemId: string, comment: string, force: boolean): JQueryDeferred<string>;
    uploadFileProjectAsync(file: IFileParam, progress: (p: IFileUploadProgress) => void): JQueryDeferred<{}>;
    fetchFileAsync(url: string, progress: (p: IFileUploadProgress) => void): JQueryDeferred<{}>;
    addDownLinkAsync(fromId: string, toId: string, comment: string): JQueryDeferred<{}>;
    removeDownLinkAsync(fromId: string, toId: string, comment: string): JQueryDeferred<{}>;
    private retrieveConfigAsync;
    private showRestError;
    private parseItemJSON;
}
/*** config
 *
 */
interface ITasksConfiguration {
    config: ITaskConfiguration[];
}
declare type FolderItem = Folder | IWltItemWithLinks;
declare type Folder = {
    name: string;
    id: string;
    children: FolderItem[];
};
interface ITaskConfiguration {
    defaultSearches?: ITaskSearch[];
    one2OneMapping?: IOne2OneMapping;
    allowEmptySearches?: boolean;
    searchHelp?: string;
    autoSearch?: boolean;
    smartLinks?: ISmartTask[];
    smartUrls?: ISmartUrls[];
    projectsCreate: ITaksProjects[];
    projectFilter: string[];
    useAsDescription?: ITaskTaskDescription;
    useEmptyTitle?: boolean;
    requireCommitTicket?: boolean;
    pluginName: string;
    pluginLongName: string;
    hideCreateTask?: boolean;
    hideSearchTasks?: boolean;
    handleAsLink?: boolean;
    hasMeta?: boolean;
    nativeCreateUrl?: string;
    nativeCreateSearch?: string;
    pluginId?: number;
}
declare type ITaskTaskDescription = "hide" | "empty" | "text";
interface IOne2OneMapping {
    projectId: string;
    taskTypeId: string;
    showId?: boolean;
    statusOverwrites: IOne2OneMappingStatus[];
}
interface IOne2OneMappingStatus extends ITaskRenderInfo {
    externalStatusName: string;
    text: string;
}
interface ITaskRenderInfo {
    text: string;
    color: string;
    background: string;
    strikethrough?: boolean;
}
interface ITaskSearch {
    name: string;
    expression: string;
}
interface ITaksProjects {
    projectId: string;
    projectName: string;
    taskTypes: ITaskType[];
}
interface ITaskType {
    taskTypeId: string;
    taskTypeName: string;
    iconUrl?: string;
    iconClass?: string;
}
interface ISmartTask {
    regex: string;
    issueProjectId: string;
    issueId: string;
    title: string;
    url?: string;
}
interface ISmartUrls {
    regex: string;
    issueProjectId: string;
    issueId: string;
    title: string;
    priority?: number;
}
/*** wlt interface
 *
 */
interface IWltItemWithLinks {
    matrixItem: IWltMatrixItem;
    links: IExternalItem[];
}
interface IWltMatrixItem {
    itemId: number;
    projectId: number;
    title: string;
    matrixItem: string;
    project: string;
}
interface IExternalItem {
    externalItemId: string;
    externalItemTitle: string;
    externalItemUrl: string;
    externalDescription: string;
    externalDone: boolean;
    externalUser?: string;
    externalProject?: string;
    externalType?: string;
    externalMeta?: string;
    plugin: number;
    more?: IMoreInfo[];
}
interface IMoreInfo {
    key: string;
    value: string;
}
interface ISearchResults {
    startAt: number;
    maxResults: number;
    tasks: IExternalItem[];
}
interface ITaskDetails extends IExternalItem {
    matrixItemIds?: string[];
}
interface XTCTableRow {
    comment: string;
}
declare class Tasks implements IPlugin {
    private item;
    private jui;
    static tasksConfiguration: ITaskConfiguration[];
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    reset(): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    preSaveHook(isItem: boolean, type: string, controls: IControlDefinition[]): JQueryDeferred<{}>;
    isPluginEnabled(pluginId: number): boolean;
    evaluateTaskIds(comment: string): string[];
    static externalItemFromUrl(url: string): IExternalItem;
    static createTaskFromUrl(itemId: string, url: string): void;
    static isTaskId(someId: string): boolean;
    static getOne2OneTask(externalItemId: string): JQueryDeferred<IExternalItem>;
    static createOne2OneTask(itemId: string): JQueryDeferred<IExternalItem>;
    static getOne2OneRenderInfo(task?: IExternalItem): ITaskRenderInfo;
    static showTasks(itemId: string, control: JQuery, canEdit: boolean, pluginFilter?: number[]): void;
    /*** UI
     *
     */
    private createAndLinkIssueDlg;
    private static createAndLinkWebDlg;
    private createSearchAndLinkIssueDlg;
    private waitForNewTaskOrWindowCloseActive;
    private waitForNewTaskOrWindowCloseTimer;
    private waitForNewTaskOrWindowClose;
    private searchAndLinkIssueDlg;
    static getConfig(pluginId: number): ITaskConfiguration;
    private renderProjectPage;
    private updateUI;
    private static getTaskDefinition;
    static renderTasks(itemId: string, linkedTasks: IExternalItem[], root: JQuery, canEdit: boolean, fullWidth: boolean): void;
    private static escapeHtml;
    static renderTask(itemId: string, task: IExternalItem, unlink: boolean, fullWidth: boolean, tinyLink?: boolean): JQuery;
    private getSearchField;
    private createLinksAsync;
    /** rest api */
    static postCreateLinks(itemId: string, tasksToLink: IExternalItem[]): JQueryDeferred<IExternalItem[]>;
    static postCreateIssue(pluginId: number, itemId: string, title: string, description: string, projectId: string, taskTypeId: string): JQueryDeferred<IExternalItem[]>;
    static getTasks(itemId?: string, pluginFilter?: number[]): JQueryDeferred<IExternalItem[]>;
    static getAllTasksProject(plugin: number): JQueryDeferred<IWltItemWithLinks[]>;
    private static getFindTasks;
    static showError(text: string, jqxhr: IJcxhr, textStatus: string, error: string): void;
    static deleteLink(itemId: string, task: IExternalItem): JQueryDeferred<{}>;
    static getMeta(pluginId: number, externalItemId: string): JQueryDeferred<IExternalItem>;
    static fillTree(tree: IDB[], alltasks: IWltItemWithLinks[]): FolderItem[];
    static isFolder(item: FolderItem): item is Folder;
    static appendIssueItems(parentElement: JQuery, folderItems: FolderItem[], selectedFolders: string[], folderChangeCallback: (folder: Folder) => void, folders?: Folder[]): void;
    private static renderTasksInTable;
    private static expandFolders;
    private static thisFolderPathIsInSelection;
}
declare let mTasks: Tasks;
interface ITestWizardParams {
    single?: number;
    input?: string[];
    output?: string;
    parentFolder?: string;
    filter?: string[];
    itemPresets?: ITestWizardParamsPreset[];
    itemFieldMapping?: IFieldMapping[];
    reason?: string;
}
interface ITestWizardParamsPreset {
    field: number;
    value: string;
}
interface ITestFieldParam extends XRFieldTypeAnnotatedParamJson {
    fieldMeaning: string;
}
interface IFieldMapping {
    fromId: number;
    toId: number;
}
interface ITestConfig15 {
    columnsStepsResult: ITestConfigTablesColumn[];
    columnsSteps: ITestConfigTablesColumn[];
}
interface ITestStepsResultsConfig {
    canBeModified: boolean;
    columns: ITestConfigTablesColumn[];
    passFailEditorConfig: ITestRuleStep[];
}
interface ITestStepsResult {
    result: string;
}
interface ITestStepsResultOption {
    id: string;
    label: string;
}
interface ITestResultInfo {
    automatic: boolean;
    label: string;
}
interface ITestRuleResult extends ITestRule {
    result: string;
}
declare class TestManager implements IPlugin {
    private XTCconfig;
    private item;
    private jui;
    private inputItems;
    private lookup;
    isDefault: boolean;
    constructor();
    initItem(item: IItem, jui: JQuery): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrl: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(project: string): void;
    getProjectPages(): IProjectPageParam[];
    preSaveHook(isItem: boolean, type: string, controls: IControlDefinition[]): JQueryDeferred<{}>;
    renderActionButtons(options: IItemControlOptions, body: JQuery, controls: IControlDefinition[]): boolean;
    isXTC(type: string): boolean;
    isTC(type: string): boolean;
    getXTCType(): string;
    getCloneSources(): string[];
    private redoFailed;
    private ConvertAll;
    private isCloneSource;
    private getTestStepsConfig;
    private getTestStepsResultsConfig;
    private getTestRunResultOptions;
    private getTestRunResultPlaceholder;
    getSearchExpression(resultType: string, notEqual: boolean): string;
    private prepareMapping;
    getMappingItems(): IFieldMapping[];
    private getResultInfo;
    private allTestSteps;
    private oneTestStep;
    private computeOverallResult;
    private createHumanValues;
}
declare let mTM: TestManager;
interface IContextFramePlugin {
    id: string;
    title: string;
    adminOption: string;
    onUpdate: (ui: JQuery, config: IContextPageConfigTab, context: IContextInformation) => void;
}
declare class ContextFrameManagerImpl {
    private pages;
    constructor();
    getPages(): IContextFramePlugin[];
    register(plugin: IContextFramePlugin): void;
    implements(id: string): boolean;
    renderTab(panel: JQuery, id: string, config: IContextPageConfigTab, context: IContextInformation): void;
    private getPlugin;
}
declare let ContextFrameManager: ContextFrameManagerImpl;
declare class ProjectStorageAdmin implements IDataStorage {
    setItem(itemKey: string, itemVal: string): void;
    getItem(itemKey: string): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
declare class ServerStorageAdmin implements IDataStorage {
    setItem(itemKey: string, itemVal: string): void;
    getItem(itemKey: string): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
interface IWidgetDashboardSettings {
    enabled: boolean;
    displayedWidgets: IDisplayedWidget[];
}
interface IDisplayedWidget {
    id: string;
    pluginName: string;
    parameters: IWidgetParameters;
}
declare enum widgetRenderEvent {
    load = 0,
    scroll = 1,
    click = 2
}
declare enum renderMode {
    placeholder = 0,
    minimized = 1,
    maximized = 2
}
declare enum IWidgetScope {
    server = 0,
    user = 1,
    superAdmin = 2
}
interface IWidgetParameters {
    scope: IWidgetScope;
    mrqlSearches?: string[];
    adminOnly: boolean;
    renderOn: widgetRenderEvent;
    w: number;
    h: number;
    x?: number;
    y?: number;
    options: {
        title: string;
        [key: string]: any;
    };
}
interface IWidgetPlugin {
    id: string;
    help: string;
    _root: JQuery;
    displayedWidget: IDisplayedWidget;
    pluginName(): string;
    defaultParameters(): IWidgetParameters;
    render(root: JQuery, displayedWidget: IDisplayedWidget, mode: renderMode): void;
    getBoxConfigurator(): ILineEditorLine[];
    updatePosition(w: number, h: number, x: number, y: number): any;
    unload?(): void;
}
declare class WidgetPluginManager {
    pluginList: {
        [key: string]: IWidgetPlugin;
    };
    loadedWidgets: {
        [key: string]: IWidgetPlugin;
    };
    constructor();
    registerPlugin(plugin: IWidgetPlugin): void;
    addLoadedWidget(key: string, widget: IWidgetPlugin): void;
    unLoadAllWidgets(): void;
}
interface IGridStackWidget {
    /** widget position x (default?: 0) */
    x?: number;
    /** widget position y (default?: 0) */
    y?: number;
    /** widget dimension width (default?: 1) */
    w?: number;
    /** widget dimension height (default?: 1) */
    h?: number;
    /** if true then x, y parameters will be ignored and widget will be places on the first available position (default?: false) */
    autoPosition?: boolean;
    /** minimum width allowed during resize/creation (default?: undefined = un-constrained) */
    minW?: number;
    /** maximum width allowed during resize/creation (default?: undefined = un-constrained) */
    maxW?: number;
    /** minimum height allowed during resize/creation (default?: undefined = un-constrained) */
    minH?: number;
    /** maximum height allowed during resize/creation (default?: undefined = un-constrained) */
    maxH?: number;
    /** prevent resizing (default?: undefined = un-constrained) */
    noResize?: boolean;
    /** prevents moving (default?: undefined = un-constrained) */
    noMove?: boolean;
    /** prevents moving and resizing (default?: undefined = un-constrained) */
    locked?: boolean;
    /** widgets can have their own resize handles. For example 'e,w' will make the particular widget only resize east and west. */
    resizeHandles?: string;
    /** value for `gs-id` stored on the widget (default?: undefined) */
    id?: number | string;
    /** html to append inside as content */
    content?: string;
}
declare var widgetPluginManager: WidgetPluginManager;
declare var GridStack: any;
declare class WidgetPluginsContainer {
    private _root;
    constructor();
    addNewWidget(): void;
    grid: any;
    render(): void;
    exit(): void;
}
declare abstract class BaseWidget implements IWidgetPlugin {
    abstract _root: JQuery;
    abstract id: string;
    abstract defaultParameters(): IWidgetParameters;
    abstract displayedWidget: IDisplayedWidget;
    abstract getBoxConfigurator(): ILineEditorLine[];
    abstract help: string;
    abstract render(root: JQuery, arg0: IDisplayedWidget, arg1: renderMode): void;
    abstract renderOn: widgetRenderEvent;
    pluginName(): string;
    addContainer(root: JQuery, displayedWidget: IDisplayedWidget, configurator: ILineEditorLine[]): JQuery;
    canBeEdited(displayedWidget: IDisplayedWidget, configurator: ILineEditorLine[]): boolean;
    canBeDeleted(displayedWidget: IDisplayedWidget): boolean;
    calculateHeight(configurator: ILineEditorLine[]): number;
    updatePosition(w: number, h: number, x: number, y: number): void;
}
declare class LastVisitedItemsWidget extends BaseWidget implements IWidgetPlugin {
    help: string;
    id: string;
    _root: JQuery;
    spinningWait: JQuery;
    constructor();
    displayedWidget: IDisplayedWidget;
    defaultParameters(): IWidgetParameters;
    renderOn: widgetRenderEvent;
    render(root: JQuery, displayedWidget: IDisplayedWidget, mode: renderMode): void;
    loadItems(container: JQuery): void;
    getBoxConfigurator(): ILineEditorLine[];
    getItemIdAndTitleLink(itemRef: string, project: string, title: string): JQuery;
}
declare class StickyNoteWidget extends BaseWidget implements IWidgetPlugin {
    help: string;
    id: string;
    _root: JQuery;
    constructor();
    displayedWidget: IDisplayedWidget;
    defaultParameters(): IWidgetParameters;
    renderOn: widgetRenderEvent;
    render(root: JQuery, displayedWidget: IDisplayedWidget, mode: renderMode): void;
    getBoxConfigurator(): ILineEditorLine[];
}
declare class ProjectStorage implements IDataStorage {
    Project: string;
    constructor(project: string);
    setItem(itemKey: string, itemVal: string, dontSanitize?: boolean): void;
    getItem(itemKey: string, dontSanitize?: boolean): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
declare class ServerStorage implements IDataStorage {
    private serverPrefix;
    setItem(itemKey: string, itemVal: string, dontSanitize?: boolean): void;
    getItem(itemKey: string, dontSanitize?: boolean): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
interface IImportMergeItem {
    instance?: string;
    project?: string;
    id: string;
    revision: number;
    description: string;
}
declare class ImportMergeBase {
    protected fieldMapping: IStringNumberMap;
    protected compare3Way(item1: IImportMergeItem, item2: IImportMergeItem, commonBase: IImportMergeItem): void;
    protected showItem(show: IImportMergeItem): void;
    protected remapItem(itemFromOtherProject: IItem): IItem;
    protected getItem(item: IImportMergeItem): JQueryDeferred<unknown>;
    protected renderVersion(hi: JQuery, source: string, item: IItem, version: number, category: string, branch?: string): void;
}
interface ILabelDisplay {
    id: string;
    displayString: string;
}
interface ILabelDashboardRule {
    type: string;
    labels: ILabelDisplay[];
    cat: string;
}
interface ILabelDashboardRuleArray {
    [key: string]: ILabelDashboardRule;
}
interface ILabelDashboardGraphData {
    [key: string]: XRTrimNeedleItem[];
}
declare class LabelDashboardabilityOverview implements IPlugin {
    dlg: JQuery;
    popupModeOrControl: boolean;
    private currentFolder;
    static fieldType: string;
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    static canBeDisplay(cat: string): boolean;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
}
declare let labelDashboardabilityOverview: LabelDashboardabilityOverview;
interface ILabelDashboardSummaryOptions extends IBaseControlOptions {
    currentFolder: IItem;
    popupModeOrControl: boolean;
}
interface JQuery {
    LabelDashboard_summary?: (options: ILabelDashboardSummaryOptions) => JQuery;
}
declare class LabelDashboardabilityOverviewImpl extends BaseControl {
    currentGroups: ILabelDashboardRule[];
    currentLabels: ILabel[];
    charts: c3.ChartAPI[];
    static getCatFromFolderName(folder: string): string;
    static getCatFromFullItemID(itemId: string): string;
    elementsLst: XRTodo[];
    protected createHelp(settings: IBaseControlOptions): JQuery;
    getValue(): void;
    hasChanged(): boolean;
    resizeItem(): void;
    destroy(): void;
    init(options: ILabelDashboardSummaryOptions): void;
    popupModeOrControl: boolean;
    currentCat: string;
    currentFolder: string;
    SelectionChanged(cat: string, folder?: string): void;
    getItems(cat: string, folder?: string): JQueryDeferred<IRestResult>[];
    start(): void;
    getLastSelection(): string;
    setLastSelection(sel: string): void;
    private needleList;
    private currentFilter;
    filterByLabel(filter: any): void;
    appendLine(needle: XRTrimNeedleItem): void;
    renderLabelDashboardTable(needles: XRTrimNeedleItem[], cat: string): ILabelDashboardGraphData;
    renderProjectPage(): void;
    static getRules(): void;
    installCopyButtons(title: string): void;
    private colors;
    generateGraphforXor(i: number, group: ILabelDashboardRule, inputData: ILabelDashboardGraphData): any;
    generateGraphforOr(i: number, group: ILabelDashboardRule, inputData: ILabelDashboardGraphData): any;
    private drawChart;
    private LabelDashboardHTMLDom;
}
interface IImportColumn {
    label: string;
    id: string;
    isLabel?: boolean;
    index?: number;
    fieldId?: number;
    fieldType?: string;
}
interface IImportRow {
    cells: string[];
}
declare class MassImportImpl implements IPlugin {
    private item;
    private errorLog;
    private duplicates;
    isDefault: boolean;
    private xml;
    private dlg;
    private jsonFields;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    private wizardStepPrepare;
    private wizardStepPrepareTC;
    private appendFileUpload;
    private wizardStepSelectWS;
    private wizardStepSelectColumns;
    private getCellIndex;
    private wizardStepMapColumns;
    private columns;
    private folderColumn;
    private hierarchyColumn;
    private titleColumn;
    private rows;
    private messages;
    private hierarchyMap;
    constructor();
    private import;
    private importTC;
    private importTCWorksheets;
    private importData;
    private createFolderHierarchy;
    private importAllRows;
    private makeTable;
    private makeDropdown;
    setRiskInput(item: JQuery, name: string, value: string, post: boolean, row: number): void;
    private error;
    private warning;
    private showCreatedItem;
}
declare let MassImport: MassImportImpl;
/**this is the information about a branch (including the merge history) */
interface IBranchInfo {
    /** tag set in mainline and branch just after the creation of the branch */
    branchTag: string;
    /** UTC date / time when the branch was created */
    branchDate: string;
    /** if of the mainline project */
    sourceProject: string;
    /** mapping of fields between mainline and branch */
    fieldMapping: IFieldMergeMapping[];
    /** allows you to not merge some categories, if not set it defaults to ["REPORT", FOLDER"] */
    dontMerge?: string[];
    /** these labels are set in new /updated items in mainline (if they exist in the given category) */
    setLabels?: string[];
    /** these labels are reset in new /updated items in mainline (if they exist in the given category) */
    resetLabels?: string[];
    /**  these labels are not copied in case they changed in the branch */
    ignoreLabels?: string[];
    /**  these labels are set (next to set labels) if there was a conflict and the user decided to mark the conflicts */
    conflictLabels?: string[];
    /** user ids of user who can merge branch back into main */
    branchMasters?: string[];
}
declare enum EMergeChangeStatus {
    deleted = 0,
    created = 1,
    changed = 2,
    unchanged = 3,
    notExist = 4
}
interface IFieldMergeMapping {
    /** field id in mainline project */
    mainline: number;
    /** field id of same field in branch project */
    branch: number;
}
interface IMergeResults {
    utcDate: string;
    user: string;
    comment: string;
    tag: string;
    results: IMergeDetails[];
}
declare enum EItemChangeState {
    never = 0,
    notNow = 1,
    now = 2
}
declare enum EMergeActionChoice {
    noActionNeeded = -1,
    undecided = 0,
    ignore = 1,
    add_restore = 2,
    replace = 3,
    delete = 4
}
declare enum EMergeActionText {
    na = "not applicable",
    ignore = "ignore",
    add_restore = "add/restore",
    add_restore_now = "add/restore now",
    replace = "replace",
    restore_replace = "restore and replace",
    delete = "delete"
}
interface IMergeDetails {
    id: string;
    mV: number;
    bV: number;
    a: EMergeActionChoice;
    np: string;
    l: string[];
    u: string;
}
interface IMergeLookup {
    [key: string]: XRMergeItem;
}
interface ILastMerges {
    [key: string]: ILastMerge;
}
interface ILastMerge {
    [key: string]: number;
}
interface IMove {
    id: string;
    parent: string;
}
interface IMergeCommand {
    copy: string[];
    conflicted: string[];
    delete: string[];
    add_links: ILink[];
    remove_links: ILink[];
    move: IMove[];
}
interface IMergeCommandTarget {
    id: string;
    m: number;
}
declare class Merge extends ImportMergeBase implements IPlugin {
    pageID: string;
    pageTitle: string;
    pageIDHistory: string;
    pageTitleHistory: string;
    static BRANCH_INFO_SETTING: string;
    isDefault: boolean;
    private branchProject;
    private branchInfo;
    private lastMerges;
    private mainlineBaseItemMap;
    private mainlineNowItemMap;
    private branchBaseItemMap;
    private branchNowItemMap;
    private branchBaseItems;
    private branchNowItems;
    private mainBaseItems;
    private mainNowItems;
    private mergeLineCount;
    private mergeOptions;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
    private showMergeHistory;
    private showMergeDetails;
    private addMergeDetail;
    static addMergeDetail(ul: JQuery, detail: XRMergeAction): void;
    private wizardShowBranchSelect;
    private wizardContentChanges;
    private showMergeDecisionsToTake;
    private getPairs;
    private getItemsOnlyInBranch;
    private getItemsByChangeStatus;
    private getOptionButtons;
    private getOptionButton;
    private showPairs;
    private activateContentChangesNext;
    private isBranchMaster;
    private getUserContentChoices;
    private wizardLinkChanges;
    private addLinkList;
    private wizardStructuralChanges;
    private wizardExecuteMerge;
    private renderSingleItem;
    private compareMainVsBranch;
    private createMap;
    private mergeSelect;
    private rememberMergeInfo;
}
interface ITodoCreatedClosed {
    date: IMoment;
    created: number;
    remaining: number;
}
declare class NotificationOverview implements IPlugin {
    dlg: JQuery;
    popupModeOrControl: boolean;
    private currentFolder;
    static fieldType: string;
    isDefault: boolean;
    enabled: boolean;
    notificationConfig: INotificationConfig;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
}
declare let NotifOverview: NotificationOverview;
interface INotifSummaryOptions extends IBaseControlOptions {
    currentNotif: IItem;
    popupModeOrControl: boolean;
}
interface JQuery {
    Notif_summary?: (options: INotifSummaryOptions) => JQuery;
}
declare class NotifSummaryImpl extends BaseControl {
    elementsLst: XRTodo[];
    protected createHelp(settings: IBaseControlOptions): JQuery;
    getValue(): void;
    hasChanged(): boolean;
    resizeItem(): void;
    destroy(): void;
    init(options: INotifSummaryOptions): void;
    eventsAttached: boolean;
    popupModeOrControl: boolean;
    loadNotifications(): void;
    start(): void;
    renderNotifTable(lst: XRTodo[]): void;
    filterNotifByUserByStatus(filter: any): void;
    renderProjectPage(): void;
    installCopyButtons(title: string): void;
    private drawNotifCharts;
    private drawCumulativeChart;
    private NOOHTMLDom;
}
interface INotificationTableOptions {
    selectable: boolean;
    forColumn: boolean;
    itemColumn: boolean;
    doneColumn: boolean;
    canCloseMine: boolean;
    canCloseAll: boolean;
    showAddButton: boolean;
    none: string;
    tableClass?: string;
    moveDoneTo?: string;
}
declare class Notifications implements IPlugin {
    private notificationConfig;
    private lastCount;
    private newNotification;
    private _item;
    private lastMenu;
    private projectCount;
    isDefault: boolean;
    private notificationUpdateTimer;
    previousNotificationsIds: number[];
    constructor();
    onUpdate(ui: JQuery, config: IContextPageConfigTab, context: IContextInformation): void;
    init(): void;
    setPreviousNotificationsIds(notifIds: number[]): void;
    getPreviousNotificationsIds(): number[];
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
    updateMenu(ul: JQuery): void;
    private userCanAcknowledgeNotification;
    supportsControl(): boolean;
    updateNotifications(): void;
    private watchActivity;
    private updateActivity;
    private getNotificationChanges;
    protected getTotalNotificationsProject(project: string): XRTodoCount;
    protected getTotalNotifications(): number;
    protected getProjectNotifications(project: string, item: string): XRTodo[];
    private renderNotificationProjectPage;
    protected renderNotificationRow(tr: JQuery, notification: XRTodo, tableOptions: INotificationTableOptions): void;
    protected renderNotificationTable(container: JQuery, tableOptions: INotificationTableOptions, notifications: XRTodo[]): void;
    protected indicateNotificationChange(): void;
    protected closeNotifications(notifications: JQuery): void;
    protected updateProjectMenu(): void;
    protected showCreateNotificationDialog(): JQueryDeferred<unknown>;
    protected showAllNotificationsDialog(): void;
    private showNotifications;
    protected filterNotifications(ui: JQuery, cbs: any): void;
    deleteNotificationDlg(notification: XRTodo): JQueryDeferred<unknown>;
    deleteNotification(notification: XRTodo): JQueryDeferred<unknown>;
    protected deleteNotificationIdRec(project: string, notifications: JQuery, idx: number): JQueryDeferred<unknown>;
    protected deleteNotificationId(project: string, todoId: number): JQueryDeferred<unknown>;
    createNotification(users: string[], project: string, item: string, text: string, type: string, atDate: Date): JQueryDeferred<unknown>;
    private countRec;
    protected updateCounters(): void;
    protected getNotificationCount(itemId: string): number;
    private addFancyTreeNotificationCounterPlugin;
}
declare let NotificationList: Notifications;
interface IStringJQueryArrayMap {
    [key: string]: JQuery[];
}
declare class QMSPubHist implements IPlugin {
    pageID: string;
    pageTitle: string;
    isDefault: boolean;
    filterTimer: number;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
    private renderProjectPage;
    private filterCopy;
    private transposeTable;
    private transposeTableRun;
    private filterTable;
}
interface IReindexCats {
    cats: string[];
}
declare class ReIndex implements IPlugin {
    isDefault: boolean;
    private cats;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    private renderProjectPage;
    private reIndex;
    private process;
}
declare let mReIndex: ReIndex;
declare class Redlining implements IPlugin {
    private _item;
    private _jui;
    isDefault: boolean;
    private panel;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    getProjectPages(): IProjectPageParam[];
    compareDocuments(report: JQuery, leftId: string, rightId: string): void;
    destroy(): void;
    private renderProjectPage;
    private addFilters;
    private hideShow;
    private showDateSelection;
    private createRedLineDates;
    private createItemsFromTree;
    private showDifferences;
    private addItems;
}
declare class ReviewContextFrame implements IPlugin {
    static reviewContextFrame: string;
    static lastDisplayedItemId: string;
    constructor();
    onUpdate(ui: JQuery, config: IContextPageConfigTab, context: IContextInformation): void;
    static lastRenderedItem: string;
    static lastRenderedVersion: number;
    static renderItem(itemId: string, version: number, showContextFrameIfNotVisible: boolean): void;
    private _item;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    updateMenu(ul: JQuery): void;
    supportsControl(): boolean;
}
declare let reviewContextFrame: ReviewContextFrame;
interface IRiskTableControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: string;
    valueChanged?: Function;
    parameter?: IRiskTableParams;
    links?: IReference[];
}
interface IRiskTableParams {
    tableOptions?: {
        showFullRisk?: boolean;
        hideReadonly?: boolean;
        cloneButtonName?: string;
    };
}
declare class RiskControlFolderControl extends BaseControl {
    protected config: IRiskConfig;
    private settings;
    private changes;
    private riskIDs;
    private riskControlsRows;
    private forwardChangeEvents;
    constructor(control: JQuery);
    init(options: IRiskTableControlOptions): void;
    hasChanged(): boolean;
    getValue(): string;
    destroy(): void;
    resizeItem(): void;
    saveChanges(): JQueryDeferred<{}>;
    private reorderRec;
    private saveChangesRec;
    private rowChange;
    private disableChangeEvents;
    private enableChangeEvents;
    private moveRow;
    private setWidth;
    private isRowSpan;
    private renderRiskRow;
    private renderTableHeaderRow;
    private renderTableFooterRow;
    private putRisk;
}
declare class RiskControlFolderPlugin implements IPlugin {
    static fieldType: string;
    control: JQuery;
    constructor();
    private _item;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    updateMenu(ul: JQuery): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    addFieldSettings(configApp: any, project: string, pageId: string, fieldType: string, fieldParams: IRiskTableParams, ui: JQuery, paramChanged: () => void): void;
    getFieldConfigOptions(): IFieldDescription[];
}
declare let FolderRiskControl: RiskControlFolderPlugin;
interface IReviewConfig {
    tasks?: IReviewConfigTask;
    lockLabel?: ILockAction;
    doneLabel?: IReviewStatusUpdate;
    mailTo?: IMailAction;
    allowSelectUserGroups?: boolean;
    showVersions?: boolean;
    showAnnotations?: boolean;
    annotationMasters?: string[];
    showComments?: boolean;
    showInline?: boolean;
    showHistory?: boolean;
    /** like showHistoryOutOfDate but it only shows items as out of date if review is not yet completed */
    showHistoryOutOfDateBeforeDone?: boolean;
    /** shows items as out of date if current revision is newer than the one in the review */
    showHistoryOutOfDate?: boolean;
    readonly?: boolean;
    appendComments?: boolean;
    statusDropdown?: string;
    canBeModified?: boolean;
    canBeModifiedBy?: string[];
    cellAskEdit?: string;
    autoshowContext?: boolean;
    createDoc?: ICreateDoc;
}
interface ICreateDoc {
    template: string;
    section: string;
    pasteTo: string;
    hide?: string[];
}
interface IReviewAction {
    buttonName: string;
    users: string[];
}
interface IMailAction extends IReviewAction {
    mailSubject: string;
}
interface ILockAction extends IReviewAction {
    label: string;
}
interface IReviewStatusUpdate extends IReviewAction {
    passedLabel?: string;
    failedLabel?: string;
    todoLabel?: string;
}
interface IReviewActionCategoryLabel {
    label: string;
    category: string;
}
interface IReviewConfigTask {
    buttonName: string;
    users: string[];
    taskPluginId: number;
    taskIssueType: string;
    taskProject: string;
    taskDescription?: string;
}
interface ITableReviewData {
    reviewtable: IStringMap[];
}
interface INeedleMap {
    [key: string]: XRTrimNeedleItem;
}
interface IItemReviews {
    [key: string]: IItemReview;
}
interface IItemReview {
    passed: string[];
    failed: string[];
    todo: string[];
    all: XRTrimNeedleItem[];
}
declare class ScheduleReview implements IPlugin {
    static fieldType: string;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    getFieldConfigOptions(): IFieldDescription[];
    addFieldSettings(configApp: any, project: string, pageId: string, fieldType: string, fieldParams: IReviewConfig, ui: JQuery, paramChanged: () => void): void;
    updateMenu(ul: JQuery): void;
    private renderReviewProjectPage;
    private renderReviews;
    private getNeedleRef;
    private getItemRef;
    private renderItems;
    renderItemsCat(container: JQuery, cat: string, reviewAnalysis: IItemReviews): void;
    private showHide;
    private analyzeReview;
    private getReviewTable;
}
interface IReviewControlOptions extends IBaseControlOptions {
    controlState?: ControlState;
    canEdit?: boolean;
    help?: string;
    fieldValue?: any;
    valueChanged?: Function;
    parameter: IReviewConfig;
    readOnly?: boolean;
}
interface JQuery {
    reviewControl?: (options: IReviewControlOptions) => JQuery;
}
declare class ReviewControlImpl extends BaseControl {
    static reviewOptionsSetting: string;
    static COL_COMMENT_LOG: string;
    static COL_ITEM: string;
    static COL_VERSION: string;
    static COL_ANNOTATIONS: string;
    private settings;
    private reviewItems;
    private reviewUsers;
    private forceNewTable;
    private currentVersions;
    private outOfDateInfo;
    private reviewTable;
    private expanded;
    private expandDetails;
    private expandSaveTimeout;
    private readonly;
    private texts;
    constructor(control: JQuery);
    init(options: IReviewControlOptions): void;
    updateControl(): void;
    init2(): void;
    private copyDetails;
    private fixInputs;
    private replaceSlickTables;
    private copyAnnotations;
    private createNewDoc;
    private copyDetail;
    private renderReviewInput;
    private isReviewDone;
    private editReview;
    private updateReview;
    hasChanged(): boolean;
    getValue(currentItem?: IItemGet): any;
    private mergeComments;
    private mergeAnnotations;
    private getItemRef;
    private getItemVersion;
    destroy(): void;
    resizeItem(newWidth?: number, force?: boolean): void;
    private createTasks;
    private createTask;
    private sendReminder;
    private lockItems;
    private setItemReviewStatusLabel;
    private setLabel;
    private getItems;
    getItemsToDoByUser(fieldId: number, tableData: IStringMap[]): IStringStringArrayMap;
    static analyzeReview(fieldId: number, tableData: IStringMap[], passedItems: string[], failedItems: string[], todoItems: string[]): void;
    static getReviewers(tableData: IStringMap[]): string[];
    static getItem(row: IStringMap): string;
    static getItemFromCell(value: string): string;
    static getReviewOptions(fieldId: number, passed: boolean, failed: boolean, todo: boolean): string[];
    private static getDropdownParams;
    private getMyReviewColumns;
    private showTable;
    private showTableDetails;
    private makeExpandable;
    private tablesReadyTimeout;
    private showAnnotations;
    private colorIcon;
    private repaintAfterColumnChange;
    private toggleItem;
    private retrieveItem;
    private showHistoryAgainstLastReviewed;
}
interface IImportItemMap {
    source: string;
    sourceVersion: number;
    target: string;
    targetVersion: number;
}
interface IImportCategoryMap {
    source: string;
    target: string;
    fields: IImportFieldMap[];
}
interface IImportFieldMap {
    source: string;
    target: string;
}
interface IImportMapping {
    project: string;
    items: IImportItemMap[];
    mapping?: IImportCategoryMap[];
    importUser: string;
    importDate: string;
    syncDate: string;
    syncUser: string;
}
interface IImports {
    sources: IImportMapping[];
}
declare class SyncImport extends ImportMergeBase implements IPlugin {
    pageID: string;
    pageTitle: string;
    static IMPORT_INFO_SETTING: string;
    isDefault: boolean;
    private imports;
    private revisionsSource;
    private revisionsTarget;
    private titleSource;
    private titleTarget;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
    private showPage;
    private showProjects;
    private showAdd;
    private addProjectImport;
    private showImportWizard;
    private showOtherProjectAtDate;
    createFieldMapping(mapping: IImportCategoryMap[], sourceIC: ItemConfiguration): void;
    private indicateSelectionRootsTimer;
    private indicateSelectionRoots;
    private askUserWhatToUpdate;
    private showList;
    private createLookups;
    private executeImportUpdate;
}
interface ICatGraphItem {
    catName: string;
    RequiredLinks: ICatGraphItem[];
}
interface IDateCreatedExecuted {
    [key: string]: ICreatedExecuted;
}
interface ITimeline {
    [key: string]: ITimelineValue[];
}
interface ITimelineValue {
    xtc: string;
    user: string;
}
interface ICreatedExecuted {
    date: any;
    created: number;
    todos: number;
}
interface IConverage {
    selectedElements: ISelectedElement[];
    items: XRGetProject_Needle_TrimNeedle;
    covered: boolean;
    query: string;
}
interface ISelectedElement {
    to: string;
    title: string;
}
interface ITeoConfig {
    testResultQueries?: ITestResultDisplay[];
    coverageGroundTruthMrqlPart?: string;
    coverageGroundTruthNotMrqlPart?: string;
    executedStatusForRunDown?: string[];
}
interface IXTC {
    id: string;
    title: string;
    tester: string;
    executionDate: IMoment;
    creationDate: IMoment;
    itrd: ITestResultDisplay;
}
interface ITestResultDisplay {
    displayString: string;
    mrqlPart: string;
    color: string;
}
declare class XTCOverview implements IPlugin {
    static fieldType: string;
    dlg: JQuery;
    popupModeOrControl: boolean;
    private currentXTC;
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
}
declare let xtcOverview: XTCOverview;
interface IXTCSummaryOptions extends IBaseControlOptions {
    currentXTC: IItem;
    popupModeOrControl: boolean;
}
interface JQuery {
    xtc_summary?: (options: IXTCSummaryOptions) => JQuery;
}
declare class XTCSummaryImpl extends BaseControl {
    XTCStatusSelection: ITestResultDisplay[];
    static XTCStatusSelectionDefault: ITestResultDisplay[];
    static settingsName: string;
    coverageGroundTruthMrqlPart: string;
    coverageGroundTruthNotMrqlPart: string;
    overviewGraphChart: c3.ChartAPI;
    overviewPerUserChart: c3.ChartAPI;
    executedStatusForRundown: string[];
    protected createHelp(settings: IBaseControlOptions): JQuery;
    getValue(): void;
    hasChanged(): boolean;
    resizeItem(): void;
    destroy(): void;
    init(options: IXTCSummaryOptions): void;
    constructor(ui: JQuery);
    TesterID: any;
    ExecutionDateID: any;
    eventsAttached: boolean;
    dlg: JQuery;
    popupModeOrControl: boolean;
    private elementsLst;
    XTCSelectionChanged(items: ISelectedElement[]): void;
    start(): void;
    getLastSelection(): ISelectedElement[];
    setLastSelection(sel: ISelectedElement[]): void;
    buildTimelineData(lst: IXTC[]): ITimeline;
    buildRundownTable(lst: IXTC[]): IDateCreatedExecuted;
    renderCoverage(): any;
    renderXTCTable(lst: IXTC[]): void;
    filterXTCByUserByStatus(filter: any): void;
    getXTCPerStatusInFolder(items: ISelectedElement[], mrqlPart: string): JQueryDeferred<IRestResult>;
    parseNeedleSearch(results: XRGetProject_Needle_TrimNeedle, itrd: ITestResultDisplay): IXTC[];
    private getXTCFromNeedleResult;
    private getFieldValue;
    private itemSelector;
    coverage: IConverage[];
    calculateCoverageByXtc(selectedElements: ISelectedElement[]): JQueryDeferred<IRestResult>[];
    renderProjectPage(): void;
    installCopyButtons(title: string): void;
    private drawXTCCharts;
    private drawCumulativeChart;
    private TEOHTMLDom;
}
interface ITraceRule {
    cat: string;
    upMust: string[][];
    upCan: string[][];
    downMust: string[][];
    downCan: string[][];
}
interface ITraceRuleArray {
    [key: string]: ITraceRule;
}
interface ITraceGraphData {
    allItems: XRTrimNeedleItem[];
    itemsWithAllCoverageMissing: XRTrimNeedleItem[];
    itemsWithDownTraceMissing: XRTrimNeedleItem[];
    itemWithUpTraceMissing: XRTrimNeedleItem[];
    hasDownMust: boolean;
    hasUpMust: boolean;
}
declare class TraceabilityOverview implements IPlugin {
    dlg: JQuery;
    popupModeOrControl: boolean;
    private currentFolder;
    static fieldType: string;
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    static canBeDisplay(cat: string): boolean;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
}
declare let traceabilityOverview: TraceabilityOverview;
interface ITraceSummaryOptions extends IBaseControlOptions {
    currentFolder: IItem;
    popupModeOrControl: boolean;
}
interface JQuery {
    Trace_summary?: (options: ITraceSummaryOptions) => JQuery;
}
declare class TraceabilityOverviewImpl extends BaseControl {
    chart: c3.ChartAPI;
    static getCatFromFolderName(folder: string): string;
    static getCatFromFullItemID(itemId: string): string;
    elementsLst: XRTodo[];
    protected createHelp(settings: IBaseControlOptions): JQuery;
    getValue(): void;
    hasChanged(): boolean;
    resizeItem(): void;
    destroy(): void;
    init(options: ITraceSummaryOptions): void;
    popupModeOrControl: boolean;
    currentCat: string;
    currentFolder: string;
    AllCoveredColor: string;
    MissingUp: string;
    MissingDown: string;
    MissingAll: string;
    SelectionChanged(cat: string, folder?: string): void;
    getItems(cat: string, folder?: string): JQueryDeferred<IRestResult>[];
    start(): void;
    getLastSelection(): string;
    setLastSelection(sel: string): void;
    private needleList;
    private currentFilter;
    filterByType(filter: any): void;
    appendLine(needle: XRTrimNeedleItem): void;
    renderTraceTable(needles: XRTrimNeedleItem[]): ITraceGraphData;
    renderProjectPage(): void;
    static getRules(): ITraceRuleArray;
    rules: ITraceRuleArray;
    installCopyButtons(title: string): void;
    private drawChart;
    private TRACEHTMLDom;
}
interface IZenConfig {
    width: string;
}
declare class Zen implements IPlugin {
    private _item;
    isDefault: boolean;
    isMobile: boolean;
    constructor();
    updateItemPanel(): void;
    initItem(item: IItem, jui: JQuery): void;
    isEnabled(): boolean;
    stopZen(): void;
    toggleZen(): void;
    protected showVersion(itemVersionId: string, actualId: string, actualTitle: string): void;
    protected showCurrentVersion(localChanges: IRestParam): void;
    private showZen;
    private applyZenMode;
    private makeZen;
    private renderItemMeat;
}
declare let ZenMode: Zen;
interface ITodotypes {
    [key: string]: any;
}
declare class MyWorkOverview implements IPlugin {
    static TodoTypes: ITodotypes;
    dlg: JQuery;
    popupModeOrControl: boolean;
    private currentMyWork;
    static fieldType: string;
    isDefault: boolean;
    lastProject: string;
    lastVisitedItems: string[];
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    static getLastVisitedItems(): any[];
    isEnabled(): boolean;
    getProjectPages(): IProjectPageParam[];
}
declare let myWorkOverview: MyWorkOverview;
interface IMyWorkSummaryOptions extends IBaseControlOptions {
    currentMyWork: IItem;
    popupModeOrControl: boolean;
}
interface JQuery {
    myWork_summary?: (options: IMyWorkSummaryOptions) => JQuery;
}
declare class MyWorkSummaryImpl extends BaseControl {
    elementsLst: XRTodo[];
    notificationConfig: INotificationConfig;
    protected createHelp(settings: IBaseControlOptions): JQuery;
    getValue(): void;
    hasChanged(): boolean;
    resizeItem(): void;
    destroy(): void;
    init(options: IMyWorkSummaryOptions): void;
    renderProjectPage(): void;
    installCopyPasteButtons(): void;
    getTodos(): JQueryDeferred<XRGetTodosAck>;
    generateXTCTable(table: JQuery): void;
    generateTodoTable(response: XRGetTodosAck, table: JQuery, filter: string[], linkBuilder: (id: string) => JQuery): number;
    getItemIdAndTitleLink(itemRef: string): JQuery;
    getItemIdAndTitleLinkForXTC(itemRef: string, title: string): JQuery;
    getItemIdAndTitleLinkForQMS(itemRef: string): JQuery;
    myWorkHTMLDom: string;
}
interface ICheckboxOptions extends IDHFSectionOptions {
}
interface IDHFCheckboxConfig {
    default: {};
}
declare class Checkbox implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ICheckboxOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface ICustomSectionOptions extends IDHFSectionOptions {
    includeInToc: boolean;
    options: ICustomSection;
}
interface IDHFCustomSectionOptions {
    default: ICustomSectionOptions;
}
declare class CustomSection extends DoubleSelectBase {
    protected config: IDHFCustomSectionOptions;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ICustomSectionOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface ITableConfig {
    default: IDhfTableOptions;
}
interface IDhfTableOptions extends IDHFSectionOptions {
    columns: ITableConfigColumn[];
}
interface ITableConfigColumn extends IDHFSectionOptions {
    columnType: string;
    field: string;
    pos: number;
    editor: string;
    name: string;
    options: IDropdownOption[];
}
declare class DhfTable implements IDHFSection {
    private config;
    private dhfTypeXML;
    private columnTypes;
    constructor(defaultConfig: IDHFConfig, dhfTypeXML: string, dhfType: string, columnTypes: ColumnTypesInfo);
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDhfTableOptions;
    addSignatures(signatures: string[], ctrl: IDHFControlDefinition, includeAll: boolean): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
    protected GetColumnCount(controllerConfig: IDhfTableOptions): number;
}
interface IDerivedFromOptions extends IDHFSectionOptions {
    render: string;
    includeInToc: boolean;
    numericalOrder: boolean;
    noHitMessage: string;
    searchFrom?: string;
    searchTo?: string;
}
interface IDHFDerivedFromConfig {
    default: IDerivedFromOptions;
}
declare class DerivedFrom extends DoubleSelectBase {
    protected config: IDHFDerivedFromConfig;
    private itemRender;
    constructor();
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDerivedFromOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface IDesignReviewsOptions extends IDHFSectionOptions {
    reviews: string[];
    user: boolean;
    date: boolean;
    revision: boolean;
    comment: boolean;
    includeInToc: boolean;
    numericalOrder: boolean;
    search?: string;
}
interface IDHFDesignReviewsConfig {
    default: IDesignReviewsOptions;
}
declare class DesignReviews extends SingleSelectBase {
    protected config: IDHFDesignReviewsConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDesignReviewsOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface IDocumentOptionsOptions extends IDHFSectionOptions {
    auto_number?: boolean;
    omit_title?: boolean;
    internal_links?: boolean;
    no_folder_ids?: boolean;
}
declare class DocumentOptions implements IDHFSection {
    private config;
    constructor();
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDocumentOptionsOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IDueDateOptions extends IDHFSectionOptions {
}
interface IDHFDueDateConfig {
    default: IDueDateOptions;
}
declare class DueDate implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDueDateOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
declare class Hidden implements IDHFSection {
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IDHFSectionOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IItemIndexOptions extends IDHFSectionOptions {
    format: string;
}
interface IDHFItemIndexConfig {
    default: IItemIndexOptions;
}
declare class ItemIndex implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IItemIndexOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IItemListOptions extends IDHFSectionOptions {
    recursive: boolean;
    tree: boolean;
    refdocs: boolean;
    hideEmptyFolders: boolean;
    showParentFolders: boolean;
    includeInToc: boolean;
    sortedList: boolean;
    search?: string;
}
interface IDHFItemListConfig {
    default: IItemListOptions;
    defaultPackage: IItemListOptions;
}
declare class ItemList extends SingleSelectBase {
    protected isSIGNPackage: boolean;
    constructor(isPackage: boolean);
    protected config: IDHFItemListConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IItemListOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface IItemTableOptions extends IDHFSectionOptions {
    includeInToc: boolean;
    sortedList: boolean;
    includeFolders: boolean;
    columns: string;
    search?: string;
}
interface IDHFItemTableConfig {
    default: IItemTableOptions;
}
declare class ItemTable extends SingleSelectBase {
    protected config: IDHFItemTableConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IItemTableOptions;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    private eitherCB;
}
interface IItemsOptions extends IDHFSectionOptions {
    folderDetails: string;
    extracolumn: string;
    showlinks: boolean;
    showUpOnly: boolean;
    showDownOnly: boolean;
    showDeeplinks: boolean;
    breadcrumb: boolean;
    showExternal: number;
    dateoptions: string;
    refdocs: boolean;
    hideLinkErrors: boolean;
    hideLabels: boolean;
    hideEmptyFolders: boolean;
    showAllParentFolders: boolean;
    includeInToc: boolean;
    search?: string;
    breakAfterItems: boolean;
}
interface IItemsFromConfig {
    default: IItemsOptions;
}
declare class Items extends SingleSelectBase {
    protected config: IItemsFromConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IItemsOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery, hideFolder?: boolean): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface ILinkListOptions extends IDHFSectionOptions {
    showExternal: number;
    includeInToc: boolean;
    search?: string;
}
interface IDHFLinkListConfig {
    default: ILinkListOptions;
}
declare class LinkList extends SingleSelectBase {
    protected config: IDHFLinkListConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ILinkListOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface IListOfFiguresOptions extends IDHFSectionOptions {
    figures?: boolean;
    tables?: boolean;
}
interface IListOfFiguresConfig {
    default: IListOfFiguresOptions;
}
interface IFigTabRef {
    fita: string;
}
declare class ListOfFigures implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IListOfFiguresOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IMultiSelectOptions extends IDHFSectionOptions {
    maxItems: number;
    create: boolean;
    sort: boolean;
    optionSetting: string;
}
interface IDHFMultiSelectConfig {
    default: IMultiSelectOptions;
}
declare class MultiSelect implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IMultiSelectOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IRemarkOptions extends IDHFSectionOptions {
}
interface IDHFRemarksConfig {
    default: {};
}
declare class Remarks implements IDHFSection {
    private config;
    constructor();
    getConfig(ctrl: IDHFControlDefinition): IRemarkOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IRichTextOptions extends IDHFSectionOptions {
}
interface IDHFRichTextConfig {
    default: IRichTextOptions;
}
declare class RichText implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IRichTextOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IRiskStatsOptions extends IDHFSectionOptions {
    includeInToc: boolean;
    table: string;
    rbm: string;
    ram: string;
    noTest: string;
    mustReduce: string;
    noBenefits: string;
    riskNoTest: string;
    riskAfterByZone: string;
    riskBeforeByZone: string;
    mitNoTest: string;
    traceMitTest: string;
    search?: string;
}
interface IDHFRiskStatsConfig {
    default: IRiskStatsOptions;
}
declare class RiskStats extends SingleSelectBase {
    protected config: IDHFRiskStatsConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): IRiskStatsOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface ISmartTextOptions extends IDHFSectionOptions {
    plaintext?: boolean;
    richtext?: boolean;
    abbreviations?: boolean;
    terms?: boolean;
    customerTags?: boolean;
    projectTags?: boolean;
    includeAll?: boolean;
    firstColumnName: string;
    secondColumnName: string;
}
interface IDHFSmartTextConfig {
    default: ISmartTextOptions;
}
declare class SmartText implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ISmartTextOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface ITableOfContentOptions extends IDHFSectionOptions {
    format: string;
    render_toc?: boolean;
}
interface IDHFTableOfContentConfig {
    default: ITableOfContentOptions;
}
declare class TableOfContent implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ITableOfContentOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface ITestResultsOptions extends IDHFSectionOptions {
    lastOnly: boolean;
    lastCreatedOnly: boolean;
    completeTree: boolean;
    failedOnly: boolean;
    dateoptions: string;
    includeInToc: boolean;
    numericalOrder: boolean;
    searchFrom?: string;
    searchTo?: string;
}
interface IDHFTestResultsConfig {
    default: ITestResultsOptions;
}
declare class TestResults extends DoubleSelectBase {
    protected config: IDHFTestResultsConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ITestResultsOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface ITextLineOptions extends IDHFSectionOptions {
}
interface IDHFTextLineConfig {
    default: ITextLineOptions;
}
declare class TextLine implements IDHFSection {
    private config;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ITextLineOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface ITraceMatrixOptions extends IDHFSectionOptions {
    includeInToc: boolean;
    numericalOrder: boolean;
    showIdOnly: boolean;
    searchFrom?: string;
    searchTo?: string;
    columnDef?: string;
}
interface IDHFTraceMatrixConfig {
    default: ITraceMatrixOptions;
}
declare class TraceMatrix extends DoubleSelectBase {
    protected config: IDHFTraceMatrixConfig;
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ITraceMatrixOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
}
interface ITracesOptions extends IDHFSectionOptions {
    strict?: boolean;
    dateoptions?: string;
    includeInToc?: boolean;
    numericalOrder?: boolean;
}
interface IDHFTracesConfig {
    default: ITracesOptions;
}
interface ITracesValue extends ITracesOptions {
    from?: string;
    to?: string;
}
declare class Traces implements IDHFSection {
    private config;
    private upTraces;
    private traceOptions;
    constructor(isUp: boolean);
    renderControl(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions): void;
    updateXmlValue(ctrl: IDHFControlDefinition): void;
    getConfig(ctrl: IDHFControlDefinition): ITracesOptions;
    addSignatures(signatures: string[], currentValue: IDHFControlDefinition): void;
    showSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): void;
    saveSpecificSettings(ctrl: IDHFControlDefinition, ctrlParameter: IBaseControlOptions, custom: JQuery): boolean;
    verifyContent(ctrl: IDHFControlDefinition): void;
}
interface IXmlCharIssues {
    itemId: string;
    details: string;
}
declare class Cleanup implements IPlugin {
    private item;
    private jui;
    static FIX_THE_ZOMBIE: string;
    static FIX_THE_IMAGE: string;
    static FIX_INVALID_XML: string;
    static badEncodedChars: string[];
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    private renderProjectPage;
    private runCleanupSmartZombies;
    private createSmartZombieNotifications;
    private getZombieNotificationName;
    private getSmartLinks;
    private runCleanupImageZombies;
    private createImageZombieNotifications;
    private getZombieImageName;
    private removeNotifications;
    private getFolders;
    private getImages;
    /*****************************************
     *
     * invalid xml characters
     *
    */
    private runCleanupCharacters;
    static textOk(fieldVal: any): boolean;
    private testXML;
}
declare let mCleanup: Cleanup;
declare class Compare implements IPlugin {
    private _item;
    private _jui;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    private compareWith;
    startCreateDocumentOtherProjectAsync(projectId: string, itemId: string, reportOptions: IReportOptions): JQueryDeferred<XRPostProject_LaunchReport_CreateReportJobAck>;
}
interface IItemCopyBuffer extends IItem {
    [key: string]: any;
}
declare class CopyPaste implements IPlugin {
    private _item;
    private _jui;
    private copypasteConfig;
    private copyIsFolder;
    private lookup;
    private itemCopied;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    updateMenu(ul: JQuery): void;
    supportsControl(): boolean;
}
/*** config
 *
 */
declare class Hazards implements IPlugin {
    private item;
    private jui;
    private hazConfig;
    private HAZ_CATEGORY;
    private hazCatConfig;
    isDefault: boolean;
    constructor();
    initItem(_item: IItem, _jui: JQuery): void;
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings): void;
    updateMenu(ul: JQuery, hook: number): void;
    supportsControl(ctrlType: string): boolean;
    createControl(ctrl: JQuery, options: IBaseControlOptions): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    private renderProjectPage;
    private createRiskConfig;
}
declare var workflowSpanCounter: number;
declare let mHazards: Hazards;
declare class MultiMove implements IPlugin {
    private _item;
    private _jui;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    private selectionContainsParent;
    private selectionContainsParentRec;
    private moveIn;
}
interface ILabelSelectMap {
    [map: string]: JQuery;
}
declare class MultiSetLabel implements IPlugin {
    private _item;
    private _jui;
    private _type;
    private selectedItems;
    private todos;
    private useFilters;
    private useGroups;
    isDefault: boolean;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    private chooseXorLabels;
    private getRelevantXorLabels;
    private getMyXorLabels;
    private setOrLabels;
    private getMyOrLabels;
    private getNotMyLocks;
    private getNotMyDesignReviews;
    private applyLabels;
    private createTodoList;
    private applyLabel;
    private chooseLabels;
    private chooseLabel;
}
declare class Touchdown implements IPlugin {
    private _item;
    private _jui;
    private waitTimer;
    isDefault: boolean;
    count: number;
    initItem(item: IItem, jui: JQuery): void;
    initServerSettings(): void;
    initProject(): void;
    getProjectPages(): IProjectPageParam[];
    supportsControl(): boolean;
    updateMenu(ul: JQuery): void;
    private touch;
    private showWait;
}
declare class ProjectStorageMobile implements IDataStorage {
    private Project;
    constructor(project: string);
    setItem(itemKey: string, itemVal: string): void;
    getItem(itemKey: string): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
declare class ServerStorageMobile {
    private Server;
    constructor();
    setItem(itemKey: string, itemVal: string): void;
    getItem(itemKey: string): string;
    getItemDefault(itemKey: string, defaultValue: string): string;
}
declare class matrix {
    Search: SearchTools;
    Item: ItemTools;
    ContextFrames: ContextFramesTools;
    JSON: JSONTools;
    XPath: XPathTools;
    URL: URLTools;
    Mail: MailTools;
    Logger: LoggerTools;
    LabelTools: LabelTools;
    UI: UIToolsEnum;
    File: FileTools;
    ReportGenerator: ReportGeneratorTools;
    SmartText: SmartTextTools;
}
declare let ml: matrix;
//# sourceMappingURL=core.d.ts.map