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
                ui: 'neutral',
                docked: 'top',
                scrollable: false,
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'image',
                        id:'MyImage',
                        //src: 'http://hdn.xnimg.cn/photos/hdn121/20120331/1930/tiny_GRdJ_60512g019117.jpg',
                        marginTop:5,
                        marginLeft:35,
                        height:50,
                        width:50
                    },
                    {
                        xtype:'panel',
                        id:'MyInfoPanel',
                        padding:8
                        //html:'<span class="nickname"><b>徐涵</b></span><br /><p style="font-size: 12px"><b>软工要跪啊！</b></p>'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'segmentedbutton',
                        id:'chatgroup',
                        allowDepress: false,
                        //docked:'right',
                        items: [
                            {
                                text: '好友',
                                //badgeText:'2',
                                pressed: true
                            },
                            {
                                text: '群组'
                            }
                        ]
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconMask: true,
                        id:'ChatHelper',
                        ui: 'plain',
                        iconCls: 'add'
                    }
                ]
            },
            {
                xtype:'chatlist',
                title:'好友',
                id:'ChattingFriends'
            },
            {
                xtype:'grouplist',
                title:'群组'
            }
        ]
    }
});