Ext.define('Chihiro.controller.activity.Create',{
    extend: 'Ext.app.Controller',

    config:{
        control:{
            'button[action=backToActivityList]': {
                tap: 'backToActivityList'
            },
            'button[action=toMapLocate]':{
                tap: 'toMapLocate'
            }
        }
    },

    launch: function(){

    },
    backToActivityList: function(){
        //console.log('hello');
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },
    toMapLocate:function(){
        if(!Ext.getCmp('maplocate')){
            Ext.create('Chihiro.view.activity.MapLocate',{
                id: 'maplocate'
            })
        }
        //Ext.getCmp('locationfield').title = '地理位置' + '';
        //console.log(Ext.getCmp('locationfield'));
        Ext.getCmp('createactivity').push(Ext.getCmp('maplocate'));
    }
})