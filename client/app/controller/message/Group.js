Ext.define('Chihiro.controller.message.Group',{
    extend: 'Ext.app.Controller',

    config:{
        control:{
            'button[action=backToGroupList]': {
                tap: 'backToGroupList'
            },
            'button[action=createGroup]': {
                tap: 'createGroup'
            }
        }
    },

    launch: function(){

    },
    backToGroupList: function(){
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },

    createGroup: function(){
        var val = Ext.getCmp('creategroup').getValues();
        console.log(val);

        if(val.name.length == 0){
            Ext.Msg.alert('群组名不能为空');
            return;
        }
        else{
             if(!Ext.getCmp('SimpleFriendListPanel')){
                    Ext.create('Chihiro.view.userlist.SimpleFriendList',{
                        id: 'SimpleFriendListPanel'
                    });
             }
            invitationList = [];
             Ext.Viewport.setActiveItem(Ext.getCmp('SimpleFriendListPanel'));
        }

    }

})