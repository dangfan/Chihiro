Ext.define('Chihiro.controller.message.Friend', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            deletebutton: '#deleteButton',
            msgbutton: '#msgSendButton',
            msgtextfield:'#MessageTextField',
            friendimage:'#FriendImage'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            },
            friendimage:{
                tap:'ShowActions'
            }
        }
    },


    EndConversation: function(view, index, target, record) {
        var me = Ext.getCmp('ChattingContent');
        var store = me.getStore();
        store.load();

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        if(Ext.getCmp('ChattingFriends')){
            Ext.getCmp('ChattingFriends').deselectAll();
        }

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
            Ext.getCmp('ChattingContent').setData([
                {
                    id: '',
                    image:'',
                    nickname:"党熊",
                    xindex:'0',
                    message:msg,
                    time:"4月12日 下午18:15"
                }]);

            var scroller = Ext.getCmp('ChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
            this.fireEvent('Send',view, index, target, record);
        }

        var scroller = Ext.getCmp('ChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();

//        var uid = Ext.getCmp('ChattingFriends').getSelection()[0].raw._id;
//        //var uid = '4f8122c25f193cab1c000033';
//        socket.emit('send message',{uid:uid,msg:msg});
//        console.log({uid:uid,msg:msg});
    },

    ShowActions:function(img,obj,other){
        if (!this.view) {
                this.view = Ext.create('Chihiro.view.message.ChattingFriendData');
        }

        var view = this.view;
        //console.log(Ext.getCmp('friendData'));

        store = Ext.getCmp('friendData').getStore();
        store.load();

        if(chatobject === 'friend')
        {
            Ext.getCmp('friendData').setData(
                [
                    { text: '修改备注名', sort:' ',func: 'Nickname'},
                    { text: '邀请到群组', sort: '   ',func: 'InviteToGroup' }
                ]
            );
        }
        else
        {
            Ext.getCmp('friendData').setData(
                [
                    { text: '空的', sort:' ',func: 'Nickname'},
                    { text: '满的', sort: '   ',func: 'InviteToGroup' }
                ]
            );
        }


        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        view.show();
    }
});
