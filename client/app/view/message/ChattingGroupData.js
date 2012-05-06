Ext.define('Chihiro.view.message.ChattingGroupData', {
    extend: 'Ext.Panel',

    xtype: 'chattinggroupdatapanel',
    id:'chattinggroupdatapanel',

    requires: [
        'Ext.carousel.Carousel',
        'Chihiro.view.userlist.Information',
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    config: {
        baseCls: Ext.baseCSSPrefix + 'sheet',
        modal: true,
        centered : false,
        hideOnMaskTap : true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: 450,
        top: 0,
        bottom: 0,
        right: 0,

        user: null,

        layout: {
            type: 'vbox',
            align: 'stretch'
        },

        items: [
            {
                xtype: 'carousel',
                flex: 1,
                items: [
                    {
                        //xtype: 'chattingfriendpanel'
                    }
                ]
            },
            {
                xtype: 'button',
                text: '退出该群',
                id: 'quitGroup'
            }
        ]
    },

    hide: function(animation) {
        var me = this;

        me.fireEvent('hideanimationstart', me);
        me.callParent();
    }
});