Ext.define('Chihiro.view.activitylist.List',{
    extend: 'Ext.DataView',
    xtype: 'activitylist',

    config: {
        ui:'loans',
        useComponents: true,

        store: {
            model: 'Chihiro.model.Activity',
            id: 'activityliststore'
        },
        defaultType: 'activitylistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有找到任何活动哦</div>',
        cls: 'demo-list',
        //cls: Ext.baseCSSPrefix + 'list-item',
        deselectOnContainerClick: false
    }
})