Ext.define('Chihiro.controller.activity.Invite',{
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
        },
        control:
        {
            'button[action=invite]':{
                tap: 'inviteFriends'
            }
        }
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