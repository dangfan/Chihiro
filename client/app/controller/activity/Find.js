Ext.define('Chihiro.controller.activity.Find',{
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            homeView: '#homeView',
            nearactivitylistref: '#nearactivitylist',
            sponseactivitylistref: '#sponseactivitylist',
            participateactivitylistref: '#participateactivitylist',
            activitydetail: '#activitydetail',
            button: '#activitygroup',
            carousel: '#activitypanel',
            invitebuttom:'#GroupInviteBtn'
        },
        control:
        {
            homeView: {
                activeitemchange: 'showNearActivity'
            },
            'button[action=createActivity]':{
                tap: 'createActivity'
            },
            nearactivitylistref:{
                select: 'nalOnItemTap'
            },
            sponseactivitylistref:{
                select: 'salOnItemTap'
            },
            participateactivitylistref:{
                select: 'palOnItemTap'
            },
            activitydetail:{
                hideanimationstart: 'onHide'
            },
            'button[action=participate]':{
                tap: 'participateActivity'
            },
            'button[action=invite]':{
                tap: 'inviteFriends'
            },
            'button[action=edit]':{
                tap: 'editActivity'
            },
            'button[action=quit]':{
                tap: 'quitActivity'
            },
            button: {
                toggle: 'toggle'
            },
            carousel: {
                activeitemchange: 'activeitemChange'
            },
            invitebuttom:{
                tap: 'inviteFriendsConfirm'
            }
        }
    },
    showNearActivity: function(){
        if(Ext.getCmp('homeView').getActiveItem().title=='活动'){
            locateGeo();
            socket.emit('find closest activities',function(msg){
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: '载入中...'
                });
                //console.log(msg);
                Ext.getCmp('nearactivitylist').getStore().load();
                Ext.getCmp('nearactivitylist').setData(msg);
                Ext.Viewport.setMasked(false);
            });
            socket.emit('find activity by creator',function(msg){
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: '载入中...'
                });
                console.log(msg);
                Ext.getCmp('sponseactivitylist').getStore().load();
                Ext.getCmp('sponseactivitylist').setData(msg);
                Ext.Viewport.setMasked(false);
            });
            socket.emit('find activity by participant',function(msg){
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: '载入中...'
                });
                console.log(msg);
                Ext.getCmp('participateactivitylist').getStore().load();
                Ext.getCmp('participateactivitylist').setData(msg);
                Ext.Viewport.setMasked(false);
            });
        }
    },
    activeitemChange: function(a,value, oldValue, eOpts){
        var currentTitle = value.title;
        var button = this.getButton();
        var items = button.innerItems;

        items[0].removeCls('x-button-pressed');
        items[1].removeCls('x-button-pressed');
        items[2].removeCls('x-button-pressed');
        if(currentTitle === '附近'){
            items[0].addCls('x-button-pressed');
        };
        if(currentTitle === '已发起'){
            items[1].addCls('x-button-pressed');
        };
        if(currentTitle === '已参加'){
            items[2].addCls('x-button-pressed');
        };
    },
    toggle:function(a,b,c,d){
        var title = b.getText();
        var carou = Ext.getCmp('activitypanel');
        var index = carou.getActiveIndex();

        if(title === '已发起'&& index === 0)
            carou.next();

        if(title === '已参加'&& index === 1)
            carou.next();

        if(title === '已参加'&& index === 0)
        {
            carou.next();
            carou.next();
        };

        if(title === '已发起'&& index === 2 )
            carou.previous();

        if(title === '附近'&& index === 1)
            carou.previous();

        if(title === '附近'&& index === 2)
        {
            carou.previous();
            carou.previous();
        };

    },
    refreshActivity: function(){
        this.showNearActivity();
    },
    createActivity: function(){
        if(!Ext.getCmp('createactivity')){
            Ext.create('Chihiro.view.activity.Create',{
                id: 'createactivity'
            });
        }
        createOrEdit = 0;
        Ext.Viewport.setActiveItem(Ext.getCmp('createactivity'));
    },
    setList:function(){
        Ext.getCmp('invitecandidatelist').setData([]);
        var store = Ext.getCmp('invitecandidatelist').getStore();
        store.load();
        Ext.getCmp('invitecandidatelist').setData(friendList);
    },
    nalOnItemTap: function(list, user){
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.activitylist.Detail');
        }
        var view = this.view;
        Ext.getCmp('ParticipateBtn').setHidden(false);
        //Ext.getCmp('InviteBtn').setHidden(true);
        Ext.getCmp('EditBtn').setHidden(true);
        Ext.getCmp('QuitBtn').setHidden(true);
        view.setUser(user);
        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }
        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }
        //this.setList();
        view.show();
    },
    salOnItemTap: function(list, user){
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.activitylist.Detail');
        }
        var view = this.view;
        Ext.getCmp('ParticipateBtn').setHidden(true);
        //Ext.getCmp('InviteBtn').setHidden(false);
        Ext.getCmp('EditBtn').setHidden(false);
        Ext.getCmp('QuitBtn').setHidden(true);
        view.setUser(user);
        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }
        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }
        //this.setList();
        view.show();
    },
    palOnItemTap: function(list, user){
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.activitylist.Detail');
        }
        var view = this.view;
        Ext.getCmp('ParticipateBtn').setHidden(true);
        //Ext.getCmp('InviteBtn').setHidden(true);
        Ext.getCmp('EditBtn').setHidden(true);
        Ext.getCmp('QuitBtn').setHidden(false);
        view.setUser(user);
        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }
        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }
        //this.setList();
        view.show();
    },
    onHide: function(){
        if(Ext.getCmp('nearactivitylist')){
            Ext.getCmp('nearactivitylist').deselectAll();
        }
        if(Ext.getCmp('sponseactivitylist')){
            Ext.getCmp('sponseactivitylist').deselectAll();
        }
        if(Ext.getCmp('participateactivitylist')){
            Ext.getCmp('participateactivitylist').deselectAll();
        }
    },
    participateActivity: function(){
        var activityId;
        console.log("addActivity:" + addActivityID);
        if(addActivityID != null) activityId = addActivityID;
        else activityId = Ext.getCmp('nearactivitylist').getSelection()[0].raw._id;
        socket.emit('participate activity', activityId, function(msg){
            if(msg.err == 0){
                Ext.Msg.alert('恭喜','参加成功！',Ext.emptyFn);
                //TODO: 参加活动列表
            }
            else{
                Ext.Msg.alert('抱歉','网络忙，请稍后再试',Ext.emptyFn);
            }
        });
        addActivityID = null;
    },
    editActivity: function(){
        if(!Ext.getCmp('createactivity')){
            Ext.create('Chihiro.view.activity.Create',{
                id: 'createactivity'
            });
        }
        console.log(Ext.getCmp('sponseactivitylist').getSelection()[0]);
        Ext.getCmp('activityname').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.name);
        var date = new Date(Ext.getCmp('sponseactivitylist').getSelection()[0].data.date);
        Ext.getCmp('activitydate').setValue(date);
        Ext.getCmp('activitycost').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.cost);
        Ext.getCmp('activitytype').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.type);
        Ext.getCmp('activitylocation').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.location);
        Ext.getCmp('activitystarttime').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.starttime);
        Ext.getCmp('activityendtime').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.endtime);
        if(!Ext.getCmp('detailinfo')){
            Ext.create('Chihiro.view.activity.DetailActivityInfo',{
                id: 'detailactivity'
            });
        }
        Ext.getCmp('detailinfo').setValue(Ext.getCmp('sponseactivitylist').getSelection()[0].data.detail);
        createOrEdit = Ext.getCmp('sponseactivitylist').getSelection()[0].raw._id;
        Ext.getCmp('activitydetail').hide();
        Ext.Viewport.setActiveItem(Ext.getCmp('createactivity'));
    },
    quitActivity: function(){
        var activityId = Ext.getCmp('participateactivitylist').getSelection()[0].raw._id;
        socket.emit('unparticipate activity',activityId,function(msg){
            if(msg.err == 0){
                Ext.Msg.alert('退出成功');
                //TODO:已参加列表的修改
            }
            else{
                Ext.Msg.alert('网络忙，请稍后再试');
            }
        });
    },
    inviteFriends:function(){
        var activityId = Ext.getCmp('sponseactivitylist').getSelection()[0].raw._id;
        Ext.getCmp('activitydetail').hide();

        if(!Ext.getCmp('SimpleFriendListPanel')){
            Ext.create('Chihiro.view.userlist.SimpleFriendList',{
                id: 'SimpleFriendListPanel'
            });
        }
        invitationList = [];
        Ext.getCmp('SimpleFriendList2').setData([]);
        var store = Ext.getCmp('SimpleFriendList2').getStore();
        store.load();
        Ext.getCmp('SimpleFriendList2').setData(friendList);

        Ext.Viewport.setActiveItem(Ext.getCmp('SimpleFriendListPanel'));
    },
    inviteFriendsConfirm: function(){
        if(Ext.getCmp('homeView').getActiveItem().title == '活动'){
            console.log('活动邀请好友');
            Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
        }
    }
});