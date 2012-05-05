Ext.define('Chihiro.view.activity.List', {
    extend: 'Ext.Carousel',

    xtype: 'activitypanel',
    id: 'activitypanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],
    config: {
        scrollable: true,
        items:[
            {
                xtype: 'toolbar',
                ui: 'dark',
                docked: 'top',
                scrollable: false,
                title: '活动',
                items:[
                    {
                        docked: 'left',
                        iconCls: 'refresh',
                        iconMask: true,
                        ui: 'plain',
                        action: 'refreshList'
                    },
                    {
                        docked: 'right',
                        iconCls: 'add',
                        iconMask: true,
                        ui: 'plain',
                        action: 'createActivity'
                    }
                ]
            }
        ]
    }
});