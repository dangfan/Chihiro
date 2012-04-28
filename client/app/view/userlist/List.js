Ext.define('Chihiro.view.userlist.List', {
    extend: 'Ext.DataView',
    xtype: 'userlist',

    store: {
        model: 'Chihiro.model.User',
        id: 'liststore'
        /*data: [
         {id: 'id',name: 'name',nickname: 'nickname'}
         ]*/
    },
    config: {
        ui:'loans',
        useComponents: true,
        defaultType: 'listitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有找到任何人哦</div>',
        deselectOnContainerClick: false
    }
});