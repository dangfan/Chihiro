Ext.define('Chihiro.controller.message.Friend', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            deletebutton: '#deleteButton',
            msgbutton: '#msgSendButton',
            msgtextfield:'#MessageTextField'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            }
        }
    },

    EndConversation: function(view, index, target, record) {
        var button = this.getDeletebutton();
        var a = button.parent.parent;
        //console.log(a);
        a.hide();
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

            //scrollable.getScroller().scrollToTop();
            var scroller = Ext.getCmp('ChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
            this.fireEvent('Send',view, index, target, record);
        }
//        if(msg == '')
//        alert("fuck!");
        var scroller = Ext.getCmp('ChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();
    }

});
