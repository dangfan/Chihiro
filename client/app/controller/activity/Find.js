Ext.define('Chihiro.controller.activity.Find',{
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            homeView: '#homeView',
            activitylistref: '#activitylist',
            activitydetail: '#activitydetail'
        },
        control:
        {
            homeView: {
                activeitemchange: 'showNearActivity'
            },
            'button[action=refreshList]':{
                tap: 'refreshActivity'
            },
            'button[action=createActivity]':{
                tap: 'createActivity'
            },
            activitylistref:{
                select: 'onItemTap'
            },
            activitydetail:{
                hideanimationstart: 'onHide'
            }
        }
    },
    showNearActivity: function(){
        if(Ext.getCmp('homeView').getActiveItem().title=='活动'){
            if(!Ext.getCmp('activitylist')){
                /*Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: '载入中...'
                });
                //接收活动信息
                Ext.Viewport.setMasked(false);*/
                Ext.create('Chihiro.view.activitylist.List');
                Ext.getCmp('activitypanel').add(Ext.getCmp('activitylist'));
            }
        }
    },
    refreshActivity: function(){

    },
    createActivity: function(){
        //var createForm = Ext.create('Chihiro.view.activity.Create');
        if(!Ext.getCmp('createactivity')){
            Ext.create('Chihiro.view.activity.Create',{
                id: 'createactivity'
            });
        }
        /*if(!Ext.getCmp('basicactivityinfo')){
            Ext.create('Chihiro.view.activity.BasicActivityInfo',{
                id: 'basicactivityinfo'
            });
        }*/
        console.log(Ext.getCmp('createactivity'));
        Ext.Viewport.setActiveItem(Ext.getCmp('createactivity'));
    },
    onItemTap: function(list, user){
        //console.log(new Date().getFullYear());
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.activitylist.Detail');
        }
        var view = this.view;
        view.setUser(user);
        //console.log(this);
        /*if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }*/
        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        view.show();
    },
    onHide: function(){
        if(Ext.getCmp('activitylist')){
            Ext.getCmp('activitylist').deselectAll();
        }
    }
})