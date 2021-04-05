
interface ILabelDisplay{ id:string,displayString:string}
interface ILabelDashboardRule {type :string ; labels : ILabelDisplay[];cat: string}  ;

interface ILabelDashboardRuleArray {
    [key: string]: ILabelDashboardRule;
 }

interface ILabelDashboardGraphData{
    [key: string]: XRTrimNeedleItem[]
}
class LabelDashboardabilityOverview implements IPlugin {
    // ****************************************
    // standard plugin interface
    // ****************************************
    dlg: JQuery;
    popupModeOrControl: boolean = false;
    private currentFolder: IItem;
    static fieldType = "LabelDashboard_summary";

    public isDefault = true;

    constructor() { }

    initItem(_item: IItem, _jui: JQuery) {
        if (_item.id.indexOf("F-") == 0) {
            this.currentFolder = _item;
            this.popupModeOrControl = true;
        }
        else {
            this.currentFolder = undefined;
            this.popupModeOrControl = false;
        }
    }
    static canBeDisplayed(cat:string):boolean
    {
        return new LabelTools().getLabelDefinitions( [cat]).length != 0;            
    }
    
    initServerSettings(serverSettings: XRGetProject_StartupInfo_ListProjectAndSettings) {
    }
    updateMenu(ul: JQuery, hook: number) {
        let that = this;
        
        if (this.currentFolder != undefined) {

            var menuItem = $('<li id="LabelDashboardMenuItem"><span class="toolmenu">Labels overview</span></li>');
            let cat = LabelDashboardabilityOverviewImpl.getCatFromFolderName(this.currentFolder.id);
            //check if the current item has labels
            if(LabelDashboardabilityOverview.canBeDisplayed(cat)) {
                ul.append(menuItem);
            }

            menuItem.click(function () {

                that.dlg = $("<div>").appendTo($("body"));
                let ui = $("<div style='height:100%;width:100%'>");

                let LabelDashboardabilityOverview = new LabelDashboardabilityOverviewImpl(ui);
                LabelDashboardabilityOverview.popupModeOrControl = true;
                LabelDashboardabilityOverview.renderProjectPage();
                let dialogTitle = "Labels overview for " + that.currentFolder.id;
                ml.UI.showDialog(that.dlg, dialogTitle, ui, $(document).width() * 0.90, app.itemForm.height() * 0.90,
                    [],
                    UIToolsEnum.Scroll.Vertical,
                    true,
                    true,
                    () => {
                        that.dlg.remove();
                    },
                    () => {
                        LabelDashboardabilityOverview.installCopyButtons(dialogTitle);
                        LabelDashboardabilityOverview.SelectionChanged(cat, that.currentFolder.id);// TODO : To be changed
                        
                       
                    },
                    () => { }
                );
            });
        }
    }

    supportsControl(ctrlType: string): boolean {
        let that = this ;
        //check if the current item has down or uplink 
        return (ctrlType === LabelDashboardabilityOverview.fieldType);
    }

    createControl(ctrl: JQuery, options: IBaseControlOptions) {
        let that = this;
        let o: ILabelDashboardSummaryOptions = <ILabelDashboardSummaryOptions>options;
        o.currentFolder = that.currentFolder;
        o.popupModeOrControl = that.popupModeOrControl;
        //check if the current item has down or uplink 
        ctrl.LabelDashboard_summary(o);
    }

    initProject() {

    }

    isEnabled() {
        return true;
    }


    // add one new project page to  the tree
    getProjectPages(): IProjectPageParam[] {
        let that = this;
        var pages: IProjectPageParam[] = [];
        // Only display LabelDashboard for project with labels
        if( ml.LabelTools.getLabelGroups().length > 0)
        {
            pages.push({
                id: "LAO", title: "Labels Overview", folder:"DASHBOARDS", order:3000, icon: "fal fa-tasks-alt",  usesFilters:true,  render: (options: IPluginPanelOptions) => {
                    let LabelDashboard = new LabelDashboardabilityOverviewImpl(options.control);
    
                    LabelDashboard.renderProjectPage()
                }
            });
        }
       
        return pages;
    }


}


let labelDashboardabilityOverview = new LabelDashboardabilityOverview();

// register the engine as plugin
$(function () {
    plugins.register(labelDashboardabilityOverview);
  
});


interface ILabelDashboardSummaryOptions extends IBaseControlOptions {
    currentFolder: IItem;
    popupModeOrControl: boolean;
}

interface JQuery {
    LabelDashboard_summary?: (options: ILabelDashboardSummaryOptions) => JQuery;
}
$.fn.LabelDashboard_summary = function (this: JQuery, options: ILabelDashboardSummaryOptions) {

    let baseControl = new LabelDashboardabilityOverviewImpl(this);
    this.getController = () => { return baseControl; }

    baseControl.init(options);
    return this;
}

class LabelDashboardabilityOverviewImpl extends BaseControl {
    
    currentGroups: ILabelDashboardRule[];
    currentLabels: ILabel[];
    charts: c3.ChartAPI[] = [];
    static getCatFromFolderName(folder: string): string {
        return folder.substring(folder.indexOf("-") + 1,folder.lastIndexOf("-"), )
        
    }


    //Item == "SPEC-12-v12"
    static getCatFromFullItemID(itemId: string): string {
        return itemId.substring(0,itemId.indexOf("-")  )
        
    }
    elementsLst: XRTodo[];
    protected createHelp(settings: IBaseControlOptions): JQuery {
        throw new Error("Method not implemented.");
    }
    getValue() {
    }
    hasChanged(): boolean {
        return false;
    }
    resizeItem(): void {
    }
    destroy(): void {
    }
    init(options: ILabelDashboardSummaryOptions) {
        if (options.controlState == ControlState.FormEdit || options.controlState == ControlState.FormView) {
            this.popupModeOrControl = options.popupModeOrControl;
            if (options.currentFolder != undefined) {
                 let cat =  LabelDashboardabilityOverviewImpl.getCatFromFolderName(options.currentFolder.id);
                 $("#LabelDashboardMenuItem").hide();

                if(LabelDashboardabilityOverview.canBeDisplayed(cat))
                {
                    this.renderProjectPage();
                    this.SelectionChanged(options.currentFolder.type, options.currentFolder.id);
                }
            }
        }

    }

    popupModeOrControl: boolean = false;;
    currentCat:string = "";
    currentFolder:string = undefined;
    
    public SelectionChanged(cat: string, folder?: string) {
        let that = this;
        if (cat == undefined) {
            return;
        }
        if( cat =="")
            cat = $("#itemSelectionLabelDashboard .dropdown-menu li:first").text();   
 
       that.currentCat = cat ;
     

       let groups = ml.LabelTools.getLabelGroups(cat);

       
       let labels: ILabelDashboardRule[] = [] 
       that.currentLabels= [];
       
       groups.forEach(g => {
                          if( g.labelDef.length > 0)
                            {
                                let ld:ILabelDisplay[] = [];
                                g.labelDef.forEach(o=>{ 
                                    that.currentLabels.push(o) 
                                    //Calculate label string
                                    let displayString = o.label;
                                    if(o.style.label.on.displayName !="")
                                    {
                                        displayString = o.style.label.on.displayName;
                                    }
                                    else if(o.displayName != "")
                                    {
                                        displayString = o.displayName;
                                    }


                                    ld.push({id:o.label, displayString:displayString })
                                });
                                labels.push( {type : g.selection , labels : ld, cat: cat} );
                            }                         
       });
       // console.log(cat,that.currentLabels);

        that.currentFolder = folder;
        that.currentGroups = labels;
        
             $("#selectedCat", that._root).text(cat);

        //No save in case of popup
        if (!this.popupModeOrControl)
            that.setLastSelection(cat);


        $("#waitForIt").html("");
        $("#waitForIt").append(ml.UI.getSpinningWait("please wait..."));

        $(".spinningWait").show();

        that.elementsLst = [];
        $('.addedNotifRow').remove();

      
        that.filterByLabel({type:""});

        this.getItems(cat, folder);
    }
    getItems(cat: string, folder?: string): JQueryDeferred<IRestResult>[] {
        let deffered: JQueryDeferred<IRestResult>[] = [];
        let that = this;
        this.needleList = [];
        var query =[];
        if(cat != "")
        {
            query.push( " category=" + cat);;
        }
        else 
        {   
        
        }    
        if (folder && folder != "" )  {
            query.push("folderm=" + folder);
        }
        let mrqlQuery =  "needle?search=mrql:" + query.join(" AND ") +  "&labels=1";
        var d = restConnection.getProject(mrqlQuery);
        deffered.push(d);
        d.done((result: XRTrimNeedle) => {
            that.needleList.push(result);
            let output = that.renderLabelDashboardTable(result.needles,cat);
             $("#LabelDashboardContentPanel").show();
             $("#waitForIt").html("");
             setTimeout(o=>{ that.drawChart(output)},100)


        })
        return deffered;
    }
    start() {
        let that = this;

        // No automatic start in case of popup
        if (that.popupModeOrControl)
            return;
        // Get last opened Notif for that user.

        let cat = that.getLastSelection();
        this.installCopyButtons("Labels Overview for " + cat);
        that.SelectionChanged(cat)
    }
    getLastSelection(): string {

        let value = projectStorage.getItem("lastLabelDashboardSelection");
        if (value != undefined && value != "")
            return value;
        return "";

    }
    setLastSelection(sel: string) {
        projectStorage.setItem("lastLabelDashboardSelection", sel);
    }

    private needleList: XRTrimNeedle[];
    private currentFilter = "";
    filterByLabel(filter:any)
    {
        this.currentFilter = filter.type;
        if( filter.type == "")
        {
            //Show all
            $("#itemLabelDashboardList tbody tr").show();
            
        }
        else
        {  
            $("#itemLabelDashboardList tbody tr").hide();
            $("#itemLabelDashboardList tbody tr."+filter.type).show();
        }
     

    }
    appendLine(needle: XRTrimNeedleItem)
    {

    }
    renderLabelDashboardTable(needles: XRTrimNeedleItem[],cat:string) {
        
        let that = this;
        
        let data:ILabelDashboardGraphData ={} ;

        data.allItems = [];
        data["Other"]  = [];
        (that.currentLabels).forEach(element => {
            data[element.label] =[];
        });

        var table = $("#itemLabelDashboardList ");
        var template = $(".template", table);
        $(".addedItem", table).remove();

        let hideNoLabelSet = $("#hideNoLabelSet").is(":checked") ;
        
        if (needles != undefined) {
            needles.forEach((needle: XRTrimNeedleItem) => {
                let labels:string[] = [];
                if(needle.labels  !=undefined)
                {

                     labels  = needle.labels.replace(/\(|\)/g,"").split(",");
                } 
                if(hideNoLabelSet && labels.length == 0)
                {
                    return ;    
                }
                let jqueryItem = template.clone();

                let missingDown = false;
                let missingUp = false;
                jqueryItem.attr("data-id",needle.itemOrFolderRef);
                jqueryItem = jqueryItem.removeClass("template").removeClass("hidden").addClass("addedItem");
                $(".title", jqueryItem).html("");
                $(".label", jqueryItem).html("");

                let itemId = needle.itemOrFolderRef.substring(0, needle.itemOrFolderRef.lastIndexOf("-"));
                let itemLink = $(".linkLabelDashboard",jqueryItem);

                 var link = $("<div></div>").refLink({
                    id: itemId, title: needle.title , style: refLinkStyle.link,  tooltip: refLinkTooltip.html, hideTitle:false
                })
               
                $(".title", jqueryItem).data("ref", itemId+"!");

                $(".title", jqueryItem).append(link);
                
                let container =  $(".labelList .labelTools", jqueryItem)

            


                let ctrlParameter:any = { help:''};
                ctrlParameter.fieldValue =  JSON.stringify( labels);
                ctrlParameter.parameter = {titleBarControl :container};
         
                let control = $(".labelList", jqueryItem) ;
                let c = control.labelsControl(<any>ml.JSON.setOptions(ctrlParameter,  {type: cat , isItem:true,controlState : ControlState.Tooltip, canEdit:true}));

                labels = labels.filter(l=>{ return that.currentLabels.find( (oo=> oo.label==l) ) }) ;

                if( labels.length > 0)
               {
                   (labels).forEach(element => {
                    if( data[element] != undefined)
                    {
                        data[element].push(needle);
                        jqueryItem.addClass(element);
                    } 
                    else
                        {
                         data["Other"].push(needle);
                         jqueryItem.addClass("Other");

                         console.log("Other");  
                        }   
                    });
                    
               } 
               else
               {
                    data["Other"].push(needle);
                    jqueryItem.addClass("Other");

               }






/*
                    $(".labelList", jqueryItem).text(
                                labels.join(' | ') 
                    );*/
                
               
              
                
                //get all labels
              
                
                
                                 //$(".downlink",item).html("");
                // Let's check each rule
                

                $("tbody", table).append(jqueryItem);
                
                $(".linkLabelDashboard",jqueryItem).css("color","red");

             
            });
        }
      


        $("#itemLabelDashboardList tbody tr").show();
        that.filterByLabel({type:that.currentFilter});
        return data;

    }

    // project pages show in the top in Projects, Reports and Documents
    public renderProjectPage() {
        let that = this;

        that._root.html(that.LabelDashboardHTMLDom);
        if(!this.popupModeOrControl)
        {
            that._root.prepend(ml.UI.getPageTitle("Labels overview"))
        }
        var baseControl = $("<div id='itemSelectionLabelDashboard'/>")
        
        $(".toolbarButtons").append(baseControl);

        var select = $(`<div class="dropdown navbar-right" style="">
                <input type="checkbox" id="hideNoLabelSet" /> <small style="margin-right:20px">Hide items without label</small>
                <button class="btn btn-xs dropdown-toggle" type="button" data-toggle="dropdown">
                    <span id="selectedCat" >CAT</span>&nbsp;
                    <span class="caret"></span>
                </button>
                <ul class="dropdown-menu">
                </ul>
                </div>`);

                
        baseControl.append(select);

        if (that.popupModeOrControl) {
            baseControl.hide();
        }
        //Table filter
        $("#LabelDashboardInputFilter").on("keyup", function (e) {
            var value = $(e.target).val().toLowerCase();
            $("#itemLabelDashboardList tbody tr").show();
        
            $("#itemLabelDashboardList tbody tr").each(function (index, elem) {
               if(($(elem).text().toLowerCase().indexOf(value) == -1))
               {
                    $(elem).hide();
               }
            });
        });

        if (!that.popupModeOrControl) {
            setTimeout(o => that.start(), 10);
        }
         let categories =  IC.getCategories();
        var index = 0 ;

        categories.forEach(cat => {
            
            if( ml.LabelTools.getLabelDefinitions([cat]).length > 0)
            {
                let item = $(`<li class="cat" data-cat="${cat}"><a href="javascript:void(0)">${cat}</a></li>`).click(function(){
                    that.SelectionChanged(cat);
                });
                $(".dropdown-menu",select).append(item);
                if( index == 0)
                {
                  $("#selectedCat").text(cat);
                }
                index ++;

            }           
         });

         $("#hideNoLabelSet").change( ()=>{
             if( that.currentCat !=  undefined && that.currentCat != "")
              that.SelectionChanged(that.currentCat)
            });

    }
    static getRules()
    {
      
    }
  
    installCopyButtons(title: string) {
        let that = this;
        $("#LabelDashboardTableHeader i").remove();
        let saveSize = [];
        ml.UI.copyBuffer($("#LabelDashboardPieChartTitle"), "copy  to clipboard", $(".panel-body-v-scroll"), this._root, (copied: JQuery) => {
         
         ml.UI.fixC3ForCopy(copied);
         $(".title", copied).each( (i,item)=>{ $(item).text($(item).data("ref") +"!")  } );
         $(".hidden",copied).remove();
         $("#LabelDashboardPieChartTitle", copied).html("<h1>" + title + "</h1> <span> <b> Date:</b> " + ml.UI.DateTime.renderCustomerHumanDate(new Date()) +  "<br/>");

        }, "",()=>{
            $("#LabelDashboardContentPanel svg").each((i,item,)=>{ saveSize.push($(item).width())});
            that.charts.forEach((chart)=>{ chart.resize({width:590})});
            /*()=>{
            savedWidth = $("#overviewPerUser svg").width();
            that.overviewPerUserChart.resize({width:590});
        },()=>{
            that.overviewPerUserChart.resize({width:savedWidth})

        });*/


        },()=>{
            let i = 0; 
            that.charts.forEach((chart)=>{ chart.resize({width:saveSize[i]}); i++; });
        });


    }
    
    private colors= [
         UIToolsEnum.CIColors.BlueZiggurat.color,
         UIToolsEnum.CIColors.OrangeYellow.color,
         UIToolsEnum.CIColors.RedPersimmon.color,
         UIToolsEnum.CIColors.BlueEastBay.color,
         UIToolsEnum.CIColors.GreenYellow.color,
         UIToolsEnum.CIColors.BlueDoger.color
        ]
    generateGraphforXor(i:number,group: ILabelDashboardRule, inputData: ILabelDashboardGraphData): any {
      
        let colums:any[] = [];
        let that = this;
        if(!$("#hideNoLabelSet").is(":checked") )
          colums.push(["No label set",inputData["Other"].length, "Other" ,that.colors[0]]);
        let j = 0;
        group.labels.forEach(
            (label)=>{
                colums.push([label.displayString,inputData[label.id]!= undefined?  inputData[label.id].length : 0,label.id, this.colors[ (j + 1)%that.colors.length]]);
                j++
            }
        )

        let graphWidth =  350;
        let params:c3.ChartConfiguration = {
            bindto: '#graph'+i,
            size: {
                width: graphWidth!=-1?graphWidth:undefined,
              },
            data: {
                columns: colums,
                type :  "donut",
                onclick: function (d , i) { 
                    setTimeout(()=>{
                        var c = colums.filter((item)=>{return item[0] == d.id});
                        if( c.length>0)
                        {
                            that.filterByLabel({ type: c[0][2]});
                        }
                        
                    },100)
                    

                    },
                    color:  function (color, d:string) {
                        var c = colums.filter((item)=>{return item[0] == d});
                        if( c.length>0)
                        {
                            return c[0][c[0].length -1];
                        }
                        return color;
                     },
            },
            donut: {
                label: {
                    format: function (value, ratio, id) {
                        return (value);
                    }
                },
            },
            legend: {
              
                position:'inset',
                inset: {
                    
                    anchor: "top-right" 
                },
               
            },
            tooltip: {
                format: {
                    value: function (value:any, ratio:any, id:any, index:any) { return value; }
                }
                },
            };
            
         that.charts.push(c3.generate(params));

    }

    generateGraphforOr(i:number, group: ILabelDashboardRule, inputData: ILabelDashboardGraphData): any {
        let colums:any[] = [];
        let that = this;
        let header =["x"]; 
        let values: [string|number]= ["Items"];  
        let footers = ["footer"];
        
        if(!$("#hideNoLabelSet").is(":checked") )
        {
            header.push("No label set");
            values.push(inputData["Other"].length );
            footers.push("Other");
        }
        group.labels.forEach(
            (label)=>{
                header.push(label.displayString);
                footers.push(label.id)
                values.push(inputData[label.id]!= undefined ?  inputData[label.id].length : 0 );
            }
        );
        colums.push(header);
        colums.push(values);
        colums.push(footers);
        let graphWidth =  footers.length * 50;
        let params:c3.ChartConfiguration = {
            bindto: '#graph'+i,
            size: {
                width: graphWidth!=-1?graphWidth:undefined,
              },
            data: {
                columns: colums,
                type : "bar",
                onclick: function (d , i) { 
                    setTimeout(()=>{
                        that.filterByLabel({ type: colums[colums.length -1][d.x +1] });
                    },100)
                    },
                x:"x",
                color: (d:any,i:c3.DataPoint)=>{{
                    return that.colors[i.x % that.colors.length];
                }},
                hide: ['footer']
            },
            axis: {
                x: {
                    type: 'category' // this needed to load string x value
                }
            },
            donut: {
                label: {
                    format: function (value, ratio, id) {
                        return (value);
                    }
                },
            },
            legend: {
                show: false
            },
            tooltip: {
                format: {
                    value: function (value:any, ratio:any, id:any, index:any) { return value; }
                }
                },
            };
            
        that.charts.push(c3.generate(params));

    }


    private drawChart(inputData: ILabelDashboardGraphData) {
       
       let that = this;
       let i = 0;
       $("#LabelDashboardPieChart div").remove();
       let w = 90/that.currentGroups.length;
       that.currentGroups.forEach
       ((group)=>{
            $("#LabelDashboardPieChart").append("<div id='graph" + i + "'>");
            let colors:string[]=[];
            let colums:any[] = [];

            if( group.type == "xor" || group.type == "review")
            {
                that.generateGraphforXor(i,group ,inputData);
            }
            else
            {
                that.generateGraphforOr(i,group,inputData);
            }



            i++;
       });

       $("#LabelDashboardPieChart svg").click(function(){   
           that.filterByLabel({type:""})
       });
       return;
    
    }
        

    private LabelDashboardHTMLDom = `<div class="panel-body-v-scroll fillHeight">
        <style>
        #LabelDashboardPieChart
        {
            scroll-direction: horizontal;
            overflow-x:auto;
        }
        .chart {
            min-height: 350px;
            cursor:pointer;
            display: flex;
        }
        .chart {
          
        }
        .bigChart
        {
            min-height:700px;
        }
        .labelList .btn[disabled]
        {
            opacity:1 !important;
        }
        </style>
        <div class="row" id="waitForIt" class="spinningWait"></div>
        <div class="panel-body" id="LabelDashboardContentPanel">
           
            <div id="">   
                <div class="panel panel-default">
                <div class="panel-heading">
                    <h3 class="panel-title" id="LabelDashboardPieChartTitle">Overview</h3>
                </div>
                <div class="panel-body">
                    <div class="LabelDashboardTitleForCopy"></div>
                    <div id="LabelDashboardPieChart" class="chart"></div>
                </div>
        </div></div>
        <div id="LabelDashboardContent" >
        <div class="row doNotCopy">
            <div class="col-lg-3 ">
                <h3 id="LabelDashboardTableHeader">Items list</h3>
            </div>
            <div class=" col-lg-7">
            </div>
            <div class=" col-lg-2">
            <input type="text" id="LabelDashboardInputFilter" style="margin-bottom:10px;" placeholder="filter..." class="doNotCopy  form-control"></input>
            </div>
        </div>
        <div class="LabelDashboardTitleForCopy"></div>
            <table id="itemLabelDashboardList" class="table table-condensed table-borderless table-hover">
               <thead>
                <tr>
                    <th> id</th>
                    <th> Labels</th>
                </tr>
               </thead>
               <tbody>
                    <tr class="template hidden">
                        <td class="title" >MyITEM : my title ablash </td>
                        <td class="labelList" > <!--<div class="labelContainer labelTools"/>--></td>
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
        </div>
        `
}



