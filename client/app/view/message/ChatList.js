
Ext.define('Chihiro.view.message.ChatList', {
    extend: 'Ext.DataView',
    xtype: 'chatlist',
    id:'ChattingFriends',

    config: {
        store: {
            model: 'Chihiro.model.ChattingFriends'
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'chatlistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有人与您聊天哟</div>',
        deselectOnContainerClick: false
    }
});