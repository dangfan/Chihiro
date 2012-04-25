Ext.define('Chihiro.view.message.List', {
    extend: 'Ext.Carousel',
    requires: [
        'Ext.SegmentedButton'
    ],
    xtype: 'messagepanel',
    id:'messagepanel',

    config: {
        items:[
            {
                xtype: 'toolbar',
                ui: 'dark',
                docked: 'top',
                scrollable: false,
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'segmentedbutton',
                        id:'chatgroup',
                        allowDepress: false,
                        items: [
                            {
                                text: '好友',
                                pressed: true
                            },
                            {
                                text: '群组'
                            },
                            {
                                text: '讨论组'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype:'chatlist',
                title:'好友'
            },
            {
                xtype:'grouplist',
                title:'群组'
            },
            {
                //xtype:'chatlist',
                title:'讨论组'
            }
        ]
    }
});