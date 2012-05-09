Ext.define('Chihiro.controller.message.Group',{
    extend: 'Ext.app.Controller',
    profile: Ext.os.deviceType.toLowerCase(),

    config: {
        refs: {
            deletebutton: '#groupDeleteButton',
            msgbutton: '#groupMsgSendButton',
            msgtextfield:'#GroupMessageTextField',
            groupimage:'#GroupImage',
            invitebuttom:'#GroupInviteBtn'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            },
            groupimage:{
                tap:'ShowActions'
            },
            'button[action=backToGroupList]': {
                tap: 'backToGroupList'
            },
            'button[action=createGroup]': {
                tap: 'createGroup'
            },
            invitebuttom:{
                tap:'inviteFriends'
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
            var temp = Ext.getCmp('ChattingGroups').data;
            Ext.getCmp('ChattingGroups').setData([val]);
        }

    },

    EndConversation: function(view, index, target, record) {
        var me = Ext.getCmp('GroupChattingContent');
        var store = me.getStore();
        store.load();

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        if(Ext.getCmp('ChattingGroups')){
            Ext.getCmp('ChattingGroups').deselectAll();
        }
    },


    Send: function(view, index, target, record) {
        var msgtextfield = this.getMsgtextfield();
        var msg = msgtextfield.getValue();
        if(msg != '')
        {
            msgtextfield.reset();
            Ext.getCmp('GroupChattingContent').setData([
                {
                    id: '',
                    image:'',
                    nickname:"党熊",
                    xindex:'0',
                    message:msg,
                    time:"4月12日 下午18:15"
                }]);

            var scroller = Ext.getCmp('GroupChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
        }

        var scroller = Ext.getCmp('GroupChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();

        var uid = Ext.getCmp('ChattingGroups').getSelection()[0].raw._id;
        console.log({uid:uid,msg:msg});
        socket.emit('send message',{uid:uid,msg:msg});

    },

    ShowActions:function(img,obj,other){

        if(Ext.getCmp('GroupCarousel'))
        {
            var carou = Ext.getCmp('GroupCarousel');
            carou.setActiveItem(0);

            var group = Ext.getCmp('ChattingGroups').getSelection()[0];
            information = Ext.getCmp('GroupDetailPanel').down('groupDetailInformation');
            information.setData(group.data);
            Ext.getCmp('quitGroupBtn').setHidden(true);

            var button = this.getDeletebutton();
            var a = button.parent.parent;
            a.hide();

            Ext.getCmp('GroupDetailPanel').show();
            return;
        }

        if (!this.view) {
            this.view = Ext.create('Chihiro.view.userlist.GroupDetail');
        }

        Ext.getCmp('quitGroupBtn').setHidden(true);
        var view = this.view;
        var group = Ext.getCmp('ChattingGroups').getSelection()[0];
        view.setUser(group);

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        view.show();
    },

    inviteFriends:function(){
        if(Ext.getCmp('homeView').getActiveItem().title == '聊天'){
            console.log(invitationList);
        }
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    }
})