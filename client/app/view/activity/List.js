Ext.define('Chihiro.view.activity.List', {
    extend: 'Ext.navigation.View',

    xtype: 'activitypanel',

    config: {
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            title: '活动'
        }]
    }
});