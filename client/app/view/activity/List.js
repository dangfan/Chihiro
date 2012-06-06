Ext.define('Chihiro.view.activity.List', {
    extend: 'Ext.Carousel',

    xtype: 'activitypanel',
    id: 'activitypanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],
    config: {
        //scrollable: true,
        items:[
            {
                xtype: 'toolbar',
                ui: 'dark',
                docked: 'top',
                scrollable: false,
                //title: '活动',
                items:[
                    {
                        docked: 'left',
                        iconCls: 'refresh',
                        iconMask: true,
                        ui: 'plain',
                        action: 'refreshList'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'segmentedbutton',
                        id:'activitygroup',
                        allowDepress: false,
                        //docked:'mid',
                        items: [
                            {
                                text: '附近',
                                pressed: true
                            },
                            {
                                text: '已发起'
                            },
                            {
                                text: '已参加'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        docked: 'right',
                        iconCls: 'add',
                        iconMask: true,
                        ui: 'plain',
                        action: 'createActivity'
                    }
                ]
            },
            {
                xtype: 'activitylist',
                id: 'nearactivitylist',
                title: '附近'
            },
            {
                xtype: 'activitylist',
                id: 'sponseactivitylist',
                title: '已发起'
            },
            {
                xtype: 'activitylist',
                id: 'participateactivitylist',
                title: '已参加'
            }
        ]
    }
});