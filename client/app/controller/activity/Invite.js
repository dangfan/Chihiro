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
            },
            'button[action=InviteFriendsToActivity]':{
                tap: 'inviteFriendsToActivity'
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
    },
    inviteFriendsToActivity: function(){
        console.log('hehe');
        var aid;
        if(Ext.getCmp('activitypanel').getActiveIndex() === 0)
            aid = Ext.getCmp('nearactivitylist').getSelection()[0].raw._id;
        else if(Ext.getCmp('activitypanel').getActiveIndex() === 1)
            aid = Ext.getCmp('sponseactivitylist').getSelection()[0].raw._id;
        else if(Ext.getCmp('activitypanel').getActiveIndex() === 2)
            aid = Ext.getCmp('participateactivitylist').getSelection()[0].raw._id;
        console.log(uid);
        console.log(invitationList);
        var ids = [];
        for(var i = 0; i < invitationList.length; i++){
            ids.push[invitationList[i]];
        }
        var obj = {};
        obj.aid = aid;
        obj.ids = ids;
        socket.emit('add participants',obj,function(msg){
            if(msg == '1')
                Ext.Msg.alert('好友邀请成功');
            else
                Ext.Msg.alert('好友邀请失败');
        });
    }
});