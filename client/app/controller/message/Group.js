Ext.define('Chihiro.controller.message.Group', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            deletebutton: '#groupDeleteButton',
            msgbutton: '#groupMsgSendButton',
            msgtextfield:'#GroupMessageTextField',
            groupimage:'#GroupImage'
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
            }
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

//        var uid = Ext.getCmp('ChattingGroups').getSelection()[0].raw._id;
//        socket.emit('send message',{uid:uid,msg:msg});
//        console.log({uid:uid,msg:msg});
    },

    ShowActions:function(img,obj,other){

        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.ChattingFriendData');
        }

        var view = this.view;

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        view.show();
    }
});
