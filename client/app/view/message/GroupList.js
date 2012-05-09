
Ext.define('Chihiro.view.message.GroupList', {
    extend: 'Ext.DataView',
    xtype: 'grouplist',
    id:'ChattingGroups',

    config: {
        store: {
            model: 'Chihiro.model.ChattingGroups'
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'grouplistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有人与您聊天哟</div>',
        deselectOnContainerClick: false
    }
});