
//Import 

interface INotificationTableOptions { 
    selectable: boolean;
    forColumn: boolean;
    itemColumn: boolean; 
    doneColumn: boolean; 
    canCloseMine: boolean; 
    canCloseAll: boolean; 
    showAddButton: boolean;
    none: string;
    tableClass?:string, 
    moveDoneTo?:string
}

class Notifications implements IPlugin {
    
    private notificationConfig:INotificationConfig;
    private lastCount:number;
    private newNotification:boolean;
    private _item:IItem;
    private lastMenu:JQuery;
    private projectCount:IStringNumberMap = null;
    public isDefault = true;
    private notificationUpdateTimer:number;
    previousNotificationsIds: number[] = [];

    constructor() {
        this.addFancyTreeNotificationCounterPlugin();
        this.watchActivity();
        


    }
    onUpdate(ui: JQuery, config: IContextPageConfigTab, context: IContextInformation) {
        
    }

    init()
    {
        
        let that = this ;
        $().ready(()=>{
            if( matrixSession && matrixSession.serverConfig){
                that.setPreviousNotificationsIds( matrixSession.serverConfig.allTodos.map((o)=>{return o.todoId ;})) ; 
            }
        
    });

    }
    setPreviousNotificationsIds(notifIds: number[]) {

        localStorage.setItem("previousNotificationsIds", JSON.stringify(notifIds));

    }
    getPreviousNotificationsIds(): number[] {

        let notif = [];
        let notifAsString = localStorage.getItem("previousNotificationsIds");
        
        if(notifAsString != undefined )
        {
             let parseNotif =  JSON.parse(notifAsString);
            if( parseNotif != undefined)
            {
                return parseNotif;
            }

        }
        return notif;

    }
    initItem( item:IItem, jui:JQuery ) {
        if (!this.isEnabled()) {
            return;
        }
        this._item = item;
        if (!this.projectCount) {
            this.projectCount = {};
            this.countRec( app.getTree() );
        }
    }
     
    initServerSettings() {
    }

    initProject() {  
        this.notificationConfig = <INotificationConfig>matrixSession.getCustomerSettingJSON(  notificationSetting, defaultNotificationConfig );
        if (!this.isEnabled()) {
            return;
        }
        this.updateProjectMenu();
        this.init();
        this.projectCount = null;
    }

    isEnabled() {
        return this.notificationConfig && this.notificationConfig.enabled;
    }
    getProjectPages():IProjectPageParam[] { 
        let that = this;
        var pages:IProjectPageParam[] = [];
       
        if (this.isEnabled() && !IC.getTimeWarp()){
            pages.push({ id: "NOTIFICATION", title:  "My Notifications", folder:"MYWORK", order:2000, icon:"fal fa-bell",  usesFilters:false,
            render: (options: IPluginPanelOptions) => that.renderNotificationProjectPage(options)});
        }
        window.setTimeout( function() {
            if (!that.projectCount) {
                that.projectCount = {};
                that.countRec( app.getTree() );
            }    
        }, 1);
        return pages;
    }

    updateMenu(ul:JQuery) {  
        if (!this.isEnabled() || !ul || !this._item || ml.Item.parseRef(this._item.id).isFolder) {
            return;
        }
        
        let that = this;
        
        this.lastMenu = ul;

        $(".notificationMenu").remove();
        $(".notificationBtn").remove();

        let myNotification = this.getProjectNotifications( matrixSession.getProject(), app.getCurrentItemId());
      
        let myNotificationMarker = myNotification.length?
            ("<i class='fal fa-bell '></i><span class='fancytree-notificationCounter notificationCounter'>" + myNotification.length + "</span>"):
            "<i class='fal fa-bell '></i>";
        $('<div class="btn-group" style=""><button class="btn btn-item btn-sm notificationBtn" title="Show and create notifications">'+myNotificationMarker+'</button></div>').click( function( event:JQueryMouseEventObject ) {
            that.showAllNotificationsDialog();
        }).insertBefore( $("#shareButton").closest("div"));

    }

    private userCanAcknowledgeNotification(notification:XRTodo) {
        return !notification.auto;
        // that should be  notification.action.todoType == "user" ||  notification.action.todoType == "signaturesDone" ||  notification.action.todoType == "reviewsDone";
    }
    supportsControl() {
        return  false;
    }
    
    updateNotifications() {
        let that = this;

        if (!this.isEnabled()) {
            return;
        }
        clearTimeout(this.notificationUpdateTimer);

        this.notificationUpdateTimer = window.setTimeout(function( ) {
            // in case there's a couple of notifications created in a short time
            that.getNotificationChanges();
        }, 300 + Math.random()* 700); // wait up to 1 second before updating UI -> in case user has many tabs open
    }

    private watchActivity() {
        let that = this;

        $(window).on('keyup click', function(event) {
            if (that.newNotification) {
                app.updateFavicon(  matrixSession.getProject(), false );
                that.newNotification = false;
            }
        });
    }

    private updateActivity(newCount:number) {
        if (newCount > this.lastCount) {
            app.updateFavicon(  matrixSession.getProject(), true );
            this.newNotification = true;
        }
        this.lastCount = newCount;
    }
    

    // this gets all the updates about the user's notifications after being signalled that something changed for the user
    private getNotificationChanges() {
        let that = this;

        restConnection.getServer("all/todo",true).done(function(allNotifications:XRGetProject_Todos_GetTodosAck) {
            let notificationCounts:XRTodoCount[] = [];
            
            // create object with counts
            let projects = matrixSession.getProjectList(true).map( function(p) { return p.shortLabel;});
            notificationCounts = allNotifications.todoCounts.filter( function( notificationCount) { return projects.indexOf( notificationCount.projectShort)!=-1;} );
            
            let total = 0;
            $.each( notificationCounts, function( idx, tc) {
                total += tc.nbTodos;
            });

            // show a icon if the number increased
            that.updateActivity( total );

            // store them in session
            matrixSession.setNotificationCounts(notificationCounts);
            matrixSession.setNotifications(allNotifications.todos);
            
            // update UI
            that.updateCounters();
            that.updateMenu(that.lastMenu);

            // Send browser notification. The random delay will avoid duplicates
            if( that.notificationConfig.browserNotificationDisabled == undefined || that.notificationConfig.browserNotificationDisabled == false)
            {
                let timeOut =  that.notificationConfig.browserNotificationAutoCloseAfter != undefined ?  that.notificationConfig.browserNotificationAutoCloseAfter : 9000;

                allNotifications.todos.forEach((t)=>{  
                    if(that.getPreviousNotificationsIds().indexOf(t.todoId) == -1 && t.login == matrixSession.getUser())
                    {
                        if (  window.Notification != undefined ) {
                        
                        if ( window.Notification.permission !== "granted")
                                window.Notification.requestPermission();
                        else {
                                var n = new Notification(t.projectShort  + "/" + t.itemRef , {
                                    icon: matrixBaseUrl + "/favicon_medical.ico",
                                    body: t.originatorLogin  + ": " +t.action.text   ,
                                    requireInteraction: true,
                                });
                                
                                n.onclick = ()=>{ window.open(matrixBaseUrl  + "/" +t.projectShort + "/"  + t.itemRef )}; 
                                }
                                setTimeout(()=>{ if(n!=undefined)
                                {
                                    n.close();
                                } 
                                },timeOut);
                            } 
                        }
                    });
        
            }
            
            that.setPreviousNotificationsIds(allNotifications.todos.map((o)=>{return o.todoId ;})) ; 
       


        });
    }

    // get the notifications
    protected getTotalNotificationsProject(project:string){
        let list = matrixSession.getNotificationCounts().filter( function( notificationCount ) { return  notificationCount.projectShort == project;});
        return list.length?list[0]:null;
    }

    protected getTotalNotifications(){
        let sum = 0;
        $.each(matrixSession.getNotificationCounts(), function(cidx, notificationCount) { sum += notificationCount.nbTodos;});
        return sum;
    }

    protected getProjectNotifications(project:string, item:string){
        return matrixSession.getNotifications().filter( function( notification ) {
            return (!project || notification.projectShort == project) && (!item || item==notification.itemRef);
        })
    }

    private renderNotificationProjectPage(options:IPluginPanelOptions) {
        let that = this;

        if (options.controlState === ControlState.Print) {
            return;
        }

        document.title = "Notifications - " + matrixSession.getProject();
        
        options.control.html("");
        
        let h2 = ml.UI.getPageTitle("Notifications overview").appendTo(options.control);
        // paint the tabs
        let tabpanel = $('<div role="tabpanel" class="tabpanel-container contextFrameContainer" style="top:60px;padding: 5px;">');
        let tabpanelul = $('<ul class="nav nav-tabs contextFrameTabs" role="tablist">');

        let tabpanels = $('<div class="tab-content">');
        // enable copy
        ml.UI.copyBuffer( h2, "copy to clipboard", tabpanels, options.control, ( copied:JQuery) => {
            $(".tabpaneltab.tab-pane", copied).not(".active").remove();
            $(".tab-content", copied).css("height", "");
        });

        options.control.append(tabpanel);
        tabpanel.append(tabpanelul);
        tabpanel.append(tabpanels);

        tabpanelul.append('<li role="presentation" class="active"><a href="#MYNOTIFICATIONS"  role="tab" data-toggle="tab">Notifications for me</a></li>');
        let myNotifications = $('<div role="tabpanel"  style="height:100%" class="tabpaneltab tab-pane active" id="MYNOTIFICATIONS" >');
        tabpanels.append(myNotifications);

        tabpanelul.append('<li role="presentation"><a href="#MYDONE"  role="tab" data-toggle="tab">My previous notifications</a></li>');
        let myDone = $('<div role="tabpanel"  style="height:100%" class="tabpaneltab tab-pane" id="MYDONE" >');
        tabpanels.append(myDone);

        tabpanelul.append('<li role="presentation"><a href="#MYOWNED"  role="tab" data-toggle="tab">Notifications I created</a></li>');
        let myOwned = $('<div role="tabpanel"  style="height:100%" class="tabpaneltab tab-pane" id="MYOWNED" >');
        tabpanels.append(myOwned);

        tabpanelul.append('<li role="presentation"><a href="#MYOWNEDDONE"  role="tab" data-toggle="tab">Previous notifications I created</a></li>');
        let myOwnedDone = $('<div role="tabpanel"  style="height:100%" class="tabpaneltab tab-pane" id="MYOWNEDDONE" >');
        tabpanels.append(myOwnedDone);

        // adjust heights of panels
        let height = $("#main").height() - tabpanels.offset().top + $("#main").offset().top;
        tabpanels.height(  height );

        restConnection.getProject("todo?includeDone=1&includeFuture=1", true).done( function(allNotifications: XRGetTodosAck) {
            let todosForNow =  allNotifications.todos.filter( function(notification) { return !notification.future});
            let todosForLater =  allNotifications.todos.filter( function(notification) { return notification.future}).sort( function(a,b) {
                let da = new Date(a.createdAt).getTime();
                let db = new Date(b.createdAt).getTime();
                
                return da>db?1:-1;
            });
            that.renderNotificationTable(myNotifications, {
                 selectable: globalShiftDown, forColumn: false, itemColumn: true, doneColumn: false, canCloseMine: true, canCloseAll: false, showAddButton: false, none: "you have no todos", moveDoneTo:"MYDONE"
                }, todosForNow.filter(function (notification) {
                    return notification.login == matrixSession.getUser() && !notification.closedAt;
                }));

                that.renderNotificationTable(myNotifications,{
                selectable: globalShiftDown, forColumn: false, itemColumn: true, doneColumn: false, canCloseMine: true, canCloseAll: true, showAddButton: false, none: "", moveDoneTo:"MYDONE"
                },todosForLater.filter(function (notification) {
                    return notification.login == matrixSession.getUser() && !notification.closedAt;
                }));
            that.renderNotificationTable(myDone,{
                  selectable: false, forColumn: false, itemColumn: true, doneColumn: true, canCloseMine: false, canCloseAll: true, showAddButton: false, none: "you did not finish any todo"
                },  todosForNow.filter(function (notification) {
                    return notification.login == matrixSession.getUser() && notification.closedAt;
                }));
            that.renderNotificationTable(myOwned,{
                  selectable: globalShiftDown, forColumn: true, itemColumn: true, doneColumn: false, canCloseMine: false, canCloseAll: true, showAddButton: false, none: "you did not create any todos", moveDoneTo:"MYOWNEDDONE"
                }, todosForNow.filter(function (notification) {
                    return notification.originatorLogin == matrixSession.getUser() && !notification.closedAt;
                }));
            that.renderNotificationTable(myOwned,{
                 selectable: globalShiftDown, forColumn: true, itemColumn: true, doneColumn: false, canCloseMine: false, canCloseAll: true, showAddButton: false, none: ""
                }, todosForLater.filter(function (notification) {
                    return notification.originatorLogin == matrixSession.getUser() && !notification.closedAt;
                }));
            that.renderNotificationTable(myOwnedDone,{
                selectable: false, forColumn: true, itemColumn: true, doneColumn: true, canCloseMine: false, canCloseAll: false, showAddButton: false, none: "none of your todos were done"
                },  todosForNow.filter(function (notification) {
                    return notification.originatorLogin == matrixSession.getUser() && notification.closedAt;
                }));

                options.control.highlightReferences();
        });
    }
    // renders a row with a notifications and +- actions on it
    protected renderNotificationRow(tr:JQuery, notification:XRTodo, tableOptions:INotificationTableOptions) {
        let that = this;

        let isAutomatic = !that.userCanAcknowledgeNotification( notification );
        let isForMe = notification.login==matrixSession.getUser();
        let isFromMe = notification.originatorLogin==matrixSession.getUser();
                
       if ( notification.future) {
            tr.addClass("future");
        }
        if ( !isForMe) {
            tr.addClass("others");
        }
      
        if (tableOptions.selectable) {
            let input = $('<input class="notificationSelector" type="checkbox">').data("todoid", notification.todoId);
            $('<td>').appendTo(tr).append(input);
        }
        if (tableOptions.itemColumn) $('<td>' + notification.itemRef + '!</td>').appendTo(tr);
        if (tableOptions.forColumn) $('<td>' + (notification.login==matrixSession.getUser()?"You":notification.login) + '</td>').appendTo(tr);
        $('<td style="white-space: pre;"">' + notification.action.text + '</td>').appendTo(tr);
        $('<td>' + notification.originatorLogin + '</td>').appendTo(tr);
        $('<td>' + notification.createdAtUserFormat + '</td>').appendTo(tr);
        if (tableOptions.doneColumn)  $('<td>' + notification.closedAtUserFormat + '</td>').appendTo(tr);
        if (tableOptions.canCloseMine || tableOptions.canCloseAll) {
            if (!notification.closedAt && (tableOptions.canCloseAll||isForMe||isFromMe)) {
                let td = $('<td>').appendTo(tr);
                if (isAutomatic && !that.notificationConfig.closeAuto) {
                    return;
                }
                let closeStyle = "btn-success btn-xs";
                let closeText = "acknowledge";
                let closeTitle = "remove notification";
                if (isAutomatic) {
                    closeStyle = "btn-link";
                    closeText = "force acknowledge";
                    closeTitle = "notification will also go once you do the job!"
                }
                if (notification.future) {
                    closeStyle = "btn-link";
                    closeText = "acknowledge already";
                    closeTitle ="remove notification already now";
                }
                if (!isForMe) {
                    closeStyle = "btn-link";
                    closeText = "delete";
                    closeTitle = "delete notification you created for someone else"
                }
                if (tableOptions.moveDoneTo) {
                    tr.addClass("canBeClosed");
                    tr.data("todoId", notification.todoId);
                    tr.data("moveTo", tableOptions.moveDoneTo);
                }
                $('<button class="btn ' + closeStyle + '" title="' + closeTitle + '">' + closeText + '</button>').appendTo(td).click( function(event:JQueryMouseEventObject) {
                    let button = $(event.delegateTarget);
                    that.deleteNotificationId(  matrixSession.getProject(), button.data("todoid")).done( function() {
                        if ( tableOptions.moveDoneTo ) {

                            let todoId = button.closest("tr").data("todoId");
                            let toBeMoved = $(".canBeClosed").filter(function(trIdx, tr) { return $(tr).data("todoId")==todoId;});
                            $.each( toBeMoved, function( idx, tbm) {
                                let moveTo = $(tbm).data("moveTo");
                                let tbodys = $("tbody", $("#" +moveTo));
                                if ( tbodys.length ) {
                                    $(".btn", $(tbm) ).replaceWith("<span>just now</span>");
                                    $(tbodys[0]).append( $(tbm) );
                                } else {
                                    button.closest("tr").remove();
                                }
                            });
                        } else {
                            button.closest("tr").remove();
                        }
                    });
                }).data("todoid", notification.todoId);
            } else {
                $('<td>').appendTo(tr);
            }
        }
    }
    // renders a table with notifications and +- actions on them
    protected renderNotificationTable(container:JQuery, tableOptions: INotificationTableOptions, notifications:XRTodo[]) {
        let that = this;

        if ( notifications.length == 0 && !tableOptions.showAddButton) {
            if (tableOptions.none) {
                $('<p>').html(tableOptions.none).appendTo(container);
            }
            return;
        }

        let table = $("<table class='table table-lined "+(tableOptions.tableClass?tableOptions.tableClass:"")+"'>");
       
        if (!tableOptions.none) {
            $('<p>').html("Upcoming notifications").appendTo(container);
        }
        let tbody = $("<tbody>");

        // add notifications
        $.each(notifications, function(idx, notification) {
            let tr = $("<tr>").appendTo(tbody)
            that.renderNotificationRow(tr, notification, tableOptions);
        });      

        // create table with headings and body
        let thead = $("<thead><tr>" 
        +(tableOptions.selectable?"<th data-sorter='false' style='white-space: nowrap;'><input class='selectAllNotification' type='checkbox'> all</th>":"") 
        +(tableOptions.itemColumn?"<th>Item</th>":"")
        +(tableOptions.forColumn?"<th>Notification For</th>":"")
        +"<th>Notification</th><th>Originator</th><th>Due date</th>" + ( tableOptions.doneColumn?"<th>Done at</th>":"")
        +((tableOptions.canCloseMine || tableOptions.canCloseAll)?"<th></th>)":"")
        +"</tr></thead>");
        
        if (tableOptions.showAddButton && this.notificationConfig.manualCreate) {
            //  create an extra row with add button
            let addRow =  $("<tr>").appendTo(tbody);
            let columnCount = $("th", thead).length;
            $("<td colspan='" + (columnCount -1) + "'>").appendTo( addRow );
            let addCell = $("<td>").appendTo( addRow );
        
            $("<button style='margin-top: 12px;' class='btn btn-success btn-xs'>&nbsp;Create New&nbsp;</button>")
            .appendTo(addCell)
            .click( function() {
                that.showCreateNotificationDialog( ).done( function( todoIds:Number[] ) {
                    restConnection.getProject( "todo?includeFuture=1&itemRef=" + app.getCurrentItemId() ).done( function(allNotification:XRGetTodosAck) {
                        // create is always for current item
                        let todos = allNotification.todos.filter( function( todo) {return todoIds.indexOf( todo.todoId )!=-1;});

                        $.each( todos, function(idx,todo) {
                            let newNotificationRow = $("<tr>").insertBefore(addRow);
                            that.renderNotificationRow( newNotificationRow, todo, tableOptions);    
                        });

                        table.trigger('update');
                    });
                });
            });
        }

        // assemble table
        
        table.append(thead)
        .append(tbody)
        .appendTo(container).tablesorter();

        if (tableOptions.selectable) {
            $(".selectAllNotification", table).click( function() {
                $(".notificationSelector", table).prop("checked", $(".selectAllNotification", table).prop("checked"));
            });

            $("<button title class='btn btn-xs btn-default hideCopy'>Mark as done</button>").appendTo(container).click( function() {
                that.closeNotifications($(".notificationSelector:checked", table));
            });
            $("<p><br></p>").appendTo(container);
        }
    }

    protected indicateNotificationChange() {
        $(".notificationBtn").removeClass("bounce").addClass("bounce");
    }
    protected closeNotifications( notifications:JQuery) {
        ml.UI.BlockingProgress.Init([{name:"Acknowledging notifications"}]);
        this.deleteNotificationIdRec( matrixSession.getProject(), notifications, 0).always( function() {

        });
    }
    // show all notifications for current user
    protected updateProjectMenu() {
        let that = this;

        let menu = $("#idNotificationList");
        let menuResponsive = $("#idNotificationListResponsive");
        // add a navigation icon left next button to project  menu
        $(".notificationBtnMenu").remove();
        let projectButton = $('<a class="nav-link no-decoration notificationBtnMenu dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Show all notifications"><i class="fal fa-bell notificationAction"></i></a>')
            .insertBefore(menu);
        let projectButtonResponsive = $('<a class="nav-link no-decoration notificationBtnMenu dropdown-toggle" data-toggle="dropdown" title="" data-original-title="Show all notifications"><i class="fal fa-bell notificationAction"></i></a>')
            .insertBefore(menuResponsive);
        // remove old items
        menu.html("");
        menuResponsive.html("");

        $.each( matrixSession.getProjectList(true), function( idx, project) {
            let notificationCount:XRTodoCount = that.getTotalNotificationsProject( project.shortLabel );
            if (notificationCount) {
                // there are some notifications for project
                let mss:string[] = [];
                // take up to first two messages from recent message list
                if ( notificationCount.firstTodos.length > 0 ) mss.push( notificationCount.firstTodos[0].action.text );
                if ( notificationCount.firstTodos.length > 1 ) mss.push( notificationCount.firstTodos[1].action.text );

                // format messages for ui: 3 lines
                let last = "";
                if( mss.length>0)
                 {
                     if( mss[0] != undefined)
                     {
                         last =     (mss[0].length<30?mss[0]:(mss[0].substring(0, 30 - 3) + "..."));
                     }
                 }
                 let before = "";
                 if( mss.length>1)
                 {
                     if( mss[1] != undefined)
                     {
                         before =   (mss[1].length<30?mss[1]:(mss[1].substring(0, 30 - 3) + "..."));
                     }
                 }
                let more = (notificationCount.nbTodos>mss.length)?((notificationCount.nbTodos-mss.length) + " more messages"):"";
                
                // build ui
              
                let img = matrixSession.getImgFromProject(project.shortLabel,5);
                          
                let msg = img + "<span class='mainmenu'>" + project.shortLabel + ` <div class="notificationMenuSummary">
                                                                                <span class="last">${last}</span>
                                                                                <span class="before">${before}</span>
                                                                                <span class="more">${more}</span>
                                                                                </div>
                                                                            </span>`;

                $('<li style="position: relative;">' + msg + '</li>').appendTo(menu).click( function(event:JQueryEventObject) {
                    app.canNavigateAwayAsync().done( function() {
                        matrixSession.loadProject( null, $(event.delegateTarget).data("project") + "/MYWORK", true);

                    });
                }).data("project", project.shortLabel)
                $('<li style="position: relative;">' + msg + '</li>').appendTo(menuResponsive).click( function(event:JQueryEventObject) {
                    app.canNavigateAwayAsync().done( function() {
                        matrixSession.loadProject( null, $(event.delegateTarget).data("project") + "/MYWORK", true);

                    });
                }).data("project", project.shortLabel)
            }   
        });
        // fake show the list, to get the sizes

        // end fake show the list, to get the sizes
        $( "#idNotificationList")
            .css("max-height", $("#main").height()+"px")
            .css("overflow-y","auto")
            .css("overflow-x","none");
        $( "nav").css("visibility","").css("display","");

        // do main button
        this.lastCount = that.getTotalNotifications( );
        if ( this.lastCount ) {
            projectButton.append( $("<span class='notificationIcon'>").html(""+this.lastCount));
            projectButtonResponsive.append( $("<span class='notificationIcon'>").html(""+this.lastCount));
        }

    }   
    
    // show a dialog asking for details of a notification to create
    protected showCreateNotificationDialog() {
        let that = this;
        let res = $.Deferred();

        let sendTo:string[] = [];

        function updateSend() {
            var sendButton = $(".btnDoIt", ui.parent().parent());
            var enabled = sendTo.length  && subj && subj.getController().getValue() !== "";
            ml.UI.setEnabled( sendButton, enabled);
        }
        
        let usel = $("<div>");
        
        // take users from current project
        ml.UI.SelectUserOrGroup.showMultiUserSelect( usel, "For", [], "Create Notification For","","", true, true, (selection:string[]) => {
            sendTo = selection;
            updateSend();
        });
        
      
        let subj = $("<div>").plainText({
            controlState: ControlState.FormEdit,
            canEdit: true, 
            help:"Notification message",
            fieldValue:"",
            valueChanged: function () {
                updateSend();
            }, // callback to call if value changes
            parameter: {
                allowResize: false}
        });
        
        let dateSel = $("<div>").dateselect({
            controlState: ControlState.FormEdit,
            canEdit: true, 
            help:"Date to activate (optional)",
            fieldValue:"",
            valueChanged: function () {
                updateSend();
            }, 
            parameter: {
                allowClear: true,
                minDate: new Date()
            }
        });

        let dlg = $("<div>").appendTo($("body"));
        let ui = $("<div style='width:100%;height:100%'>");

        ui.append(dateSel);
        ui.append(usel);
        ui.append(subj);
        
        ui.addClass("dlg-no-scroll");
        ui.removeClass("dlg-v-scroll");

        ml.UI.showDialog( dlg, "Create Notification", ui, -730, -440,
        [{
            text: 'Create',
            class: 'btnDoIt',
            click: function () {
                let text = DOMPurify.sanitize(subj.getController().getValue()) +'';
                let dateStr = dateSel.getController().getValue();
                let date = DateSelectImpl.getDateFromString(dateStr);
                if ( date && ml.UI.DateTime.renderDashFormat( date ) == ml.UI.DateTime.renderDashFormat( new Date() ) ) {
                    // date is for today
                    date = null;
                }
                that.createNotification( sendTo, matrixSession.getProject(), app.getCurrentItemId(), text, null, date).done( function (created:XRTodo[]) {
                    res.resolve(created)
                });
                dlg.dialog("close");
            }
        }, {
            text: 'Cancel',
            class: 'btnCancelIt',
            click: function () {
                dlg.dialog("close");
            }
        }]
        , UIToolsEnum.Scroll.None,false,false, () => {  dlg.remove(); },  () => {updateSend(); $("textarea", subj).focus(); },  () => { });

        return res;
    }

    
    // show a dialog with all notifications
    protected showAllNotificationsDialog():void {
        
        let that = this;

        let dlg = $("<div>").appendTo($("body"));
        let ui = $("<div style='width:100%'>");

        ml.UI.showDialog( dlg, "Notifications", ui, 900, 600,
            [{
            text: 'Ok',
            class: 'btnDoIt',
            click: function () {
                dlg.dialog("close");
            }
        }], UIToolsEnum.Scroll.Vertical,true,true, () => { dlg.remove(); },  () => {
                that.showNotifications(ui); 
        },  () => { }
        );
    }

    private showNotifications(ui:JQuery) {
        let that = this;
        ui.html("").append( ml.UI.getSpinningWait("getting notifications...") );

        restConnection.getProject( "todo?includeFuture=1&itemRef=" + app.getCurrentItemId() ).done( function(allNotification:XRGetTodosAck) {
            
            ui.html("");
            
            let cbs = {
                others:(localStorage.getItem("ShowNotificationOthers")=="0")?false:true,
                future:(localStorage.getItem("ShowNotificationFuture")=="0")?false:true,
            };
            
            ml.UI.addCheckbox( ui, "Show notifications for others", cbs, "others", function( ){
                that.filterNotifications(ui,cbs );
            });
            ml.UI.addCheckbox( ui, "Show notifications for future", cbs, "future", function( ){
                that.filterNotifications(ui,cbs );                
            });

            $('<div style="margin-bottom: 40px;">').appendTo( ui); // just a bit of space

            that.renderNotificationTable(ui, 
                {  selectable: false, forColumn: true, itemColumn: false, doneColumn: false, canCloseMine: true, canCloseAll: false, showAddButton: true, none: "no (more) to dos", tableClass:"itemNotifications" }, 
                allNotification.todos);

            that.filterNotifications(ui, cbs); 
        });
    }
    // hide / show notifications depending on checkboxes, remember last value
    protected filterNotifications(ui:JQuery, cbs:any) {

        localStorage.setItem("ShowNotificationOthers", cbs.others?"1":"0");
        localStorage.setItem("ShowNotificationFuture", cbs.future?"1":"0");
        cbs.others?$("tr.others",ui).show():$("tr.others",ui).hide();
        cbs.future?$("tr.future",ui).show():$("tr.future",ui).hide();
    }

    // mark a notification as resolved (mark as done) 
    deleteNotificationDlg( notification:XRTodo) {
        let that = this;
        let res = $.Deferred();
        ml.UI.showConfirm( -1, { title:"Remove notification '"+ notification.action.text + "'", ok:"Ok", nok:"Cancel"},  () => {
            restConnection.deleteServerAsync(notification.projectShort + "/todo/" + notification.todoId, {}).done( function() {
               res.resolve();
            }).fail(function() {
                res.reject();
            });
        }, null);
        return res;
    }

    deleteNotification( notification:XRTodo) {
        return this.deleteNotificationId(notification.projectShort, notification.todoId);
    }

    protected deleteNotificationIdRec( project:string, notifications:JQuery, idx:number) {
        let that = this;
        let res = $.Deferred();
        
        if ( notifications.length <= idx) {
            res.resolve();
            return res;
        }
        this.deleteNotificationId( project, $(notifications[idx]).data("todoid")).done( function() {
            
            ml.UI.BlockingProgress.SetProgress(0, (idx+1) * 100 / notifications.length);
            $(notifications[idx]).closest("tr").css("color","lightgrey").css("text-decoration", "line-through");
                
            that.deleteNotificationIdRec( project, notifications, idx+1).done( function() {
                res.resolve();    
            }).fail( function() {
                res.reject();
            });
        }).fail( function() {
            ml.UI.BlockingProgress.SetProgressError(0, "failed deleting todo");
        });

        return res;
    }
    
    protected deleteNotificationId( project:string, todoId:number) {
        let res = $.Deferred();
        
        restConnection.deleteServerAsync(project + "/todo/" + todoId, {}).done( function() {
            res.resolve();
        }).fail(function() {
            res.reject();
        });
        
        return res;
    }

    
    // create a new notification object
    createNotification( users:string[], project:string, item:string, text:string, type:string, atDate:Date) {
        let that = this;
        let res = $.Deferred();
        let todoDetails:any = {
            text:text,
            logins:users.join(",")
        }
        if (atDate) {
            todoDetails.atDate = atDate.toISOString();
        }
        if ( type ) {
            todoDetails.todoType = type;
        }
        restConnection.postServer(project + "/todo/" + item, todoDetails).done( function( created:Number[] ){
            res.resolve(created);
        }).fail(function() {
            res.reject();
        });

        return res;

    }

    // count the notifications of a folder by adding up notifications of it's items
    private countRec( idb:IDB[] ) {
        let that = this;
        let sum = 0;
        $.each(idb, function(idx, child) {
            let count = 0;
           
            if (child.children) {
                // this is a folder
                count = that.countRec( child.children );
            }
            else {
                count = that.getProjectNotifications(matrixSession.getProject(), child.id).length;
            }
            that.projectCount[child.id] = count;
            sum += count;
        });

        return sum;
    }

    // update the counters in the tree: build a new cache and repaint them
    protected updateCounters(  ) {
        let that = this;
  
        // update counters
        that.projectCount = {};
        that.countRec( app.getTree() );
        that.updateProjectMenu();
      
        // change icons in tree
        NavigationPanel.updateNotificationCounters();
        NavBar.updateNotificationCounters();
    }

    // returned the cached count of notifications for a specific item
    // if it is not yet cached, recreate it
    protected getNotificationCount( itemId:string ) {
        let that = this;
      
        if (!this.projectCount) {
            this.projectCount = {};
            this.countRec( app.getTree() );
        }
        return this.projectCount[itemId];
    }
    private addFancyTreeNotificationCounterPlugin() {

        (<any>$.ui.fancytree)._FancytreeClass.prototype.updateNotificationCounters = function() {
            var tree = this
    
            tree.visit(function(node:any){
                node.updateNotificationCounters(false);
            });;
        };

        (<any>$.ui.fancytree)._FancytreeNodeClass.prototype.updateNotificationCounters = function(doParents:boolean) {
            var node = this

            if (node.span) {
                var $badge = $("span.fancytree-notificationCounter", node.span),
                extOpts = node.tree.options.notificationCounter,
                count = NotificationList.getNotificationCount( node.key);
                if (count  && node.span && (!node.isExpanded() || !extOpts.hideExpanded)
                ) {
                    if (!$badge.length) {
                        if (node.folder) {
                            let expander = $("span.fancytree-expander",node.span);
                            $badge= $("<span class='fancytree-notificationCounter notificationCounter'/>").insertBefore(expander);
                        } else {
                            $badge= $("<span class='fancytree-notificationCounter notificationCounter'/>").insertBefore(
                                $("span.fancytree-icon,span.fancytree-custom-icon",node.span));    
                        }
                    }
                    $badge.text(count);
                    $badge.closest("li").data("notifications", count);
                } else {
                    $badge.closest("li").data("notifications", 0);
                    $badge.remove();
                }
                if (doParents && extOpts.deep && !node.isTopLevel() && !node.isRoot()) {
                    node.parent.updateCounters();
                }
            }
        }

        $.ui.fancytree.registerExtension({
            // Every extension must be registered by a unique name.
            name: "notificationCounter",
            // Version information should be compliant with [semver](http://semver.org)
            version: "1.0",
    
            // Extension specific options and their defaults.
            // This options will be available as `tree.options.notificationCounter.hideExpanded`
    
            options: {
                deep: true,
                hideZeros: true,
                hideExpanded: false,
                // dnd: {
                //     axis: "y"
                // }
            },
    
            // Local functions are prefixed with an underscore '_'.
            // Callable as `this._local._appendCounter()`.
    
            /*_appendCounter: function(bar) {
                var tree = this;
            },*/
    
            // **Override virtual methods for this extension.**
          
            // `treeInit` is triggered when a tree is initialized. We can set up classes or
            // bind event handlers here...
            treeInit: function() {

            (<any>this)._super.apply(this, arguments);

                // Add a class to the tree container
                (<any>this).$container.addClass("fancytree-ext-notificationCounter");
            },
    
            // Destroy this tree instance (we only call the default implementation, so
            // this method could as well be omitted).
    
            treeDestroy: function() {
                //(<any>this)._superApply(arguments);
    (<any>this)._super.apply(this, arguments);
            },
    
            // Overload the `renderTitle` hook, to append a counter badge
            nodeRenderTitle: function(ctx:any, title:any) {
                var node = ctx.node,
                    extOpts = ctx.options.notificationCounter,
                    count = NotificationList.getNotificationCount(node.key);
                // Let the base implementation render the title
                // We use `_super()` instead of `_superApply()` here, since it is a little bit
                // more performant when called often
                (<any>this)._super(ctx, title);
                // Append a counter badge
                if (count && (!node.isExpanded() || !extOpts.hideExpanded)
                ) {
                    if (node.folder) {
                        $("span.fancytree-expander",node.span).before(
                            $("<span class='fancytree-notificationCounter notificationCounter'/>").text(count)).closest("li").data("notifications",count)
                    } else {
                        $("span.fancytree-icon,span.fancytree-custom-icon",node.span).before(
                            $("<span class='fancytree-notificationCounter notificationCounter'/>").text(count));
    
                    }
                }
            }
        })
    }
}

let NotificationList = new Notifications();

$(function () {
    plugins.register(NotificationList);
 });
