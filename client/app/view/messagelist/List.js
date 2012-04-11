Ext.define('Chihiro.view.messagelist.List', {
    extend: 'Ext.DataView',
    xtype: 'userlist',

    config: {
        store: {
            model: 'Chihiro.model.User'
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'listitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有找到任何人哦</div>',
        deselectOnContainerClick: false
    }
});