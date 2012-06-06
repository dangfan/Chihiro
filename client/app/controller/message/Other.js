Ext.define('Chihiro.controller.message.Other', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fieldset: '#groupset',
            invitebutton: '#InviteToGroupBtn'
        },
        control: {
            invitebutton: {
                tap: 'InviteToGroup'
            },
            'button[action=groupInfoModifyConfirm]':{
                tap: 'groupInfoModifyConfirm'
            }
        }
    },

    InviteToGroup: function(view, index, target, record) {
        alert("Invitation is being sent");

        Ext.getCmp('groupset').add({
            xtype: 'checkboxfield',
            name: 'onlinereminder',
            label:'党主席基友团'
        });
    },
    groupInfoModifyConfirm: function(){
        console.log(Ext.getCmp('groupintrotext').getValue());
        if(Ext.getCmp('groupintrotext').getValue().length == 0){
            Ext.Msg.alert('不能发布空消息');
            return;
        }
        var group = new Object();
        group.id = Ext.getCmp('SimpleFriendList').getSelection()[0].data.id;
        group.intro = Ext.getCmp('groupintrotext').getValue();
        socket.emit('modify intro', group);
        Ext.Msg.alert('发布成功');
        Ext.getCmp('SimpleFriendList').getSelection()[0].data.intro = group.intro;
        console.log(Ext.getCmp('ChattingGroups'));

        for(var i = 0; i < globalgrouplist.length; i++){
            if(globalgrouplist[i].id == group.id){
                globalgrouplist[i].intro = group.intro;
                break;
            }
        }
        Ext.getCmp('ChattingGroups').setData([]);
        var store = Ext.getCmp('ChattingGroups').getStore();
        store.load();
        Ext.getCmp('ChattingGroups').setData(globalgrouplist);
    }

});
