Ext.define('Chihiro.view.userlist.Detail', {
    extend: 'Ext.Panel',
    xtype: 'detail',
    id:'DetailPanel',

    requires: [
        'Ext.carousel.Carousel',
        'Chihiro.view.userlist.Information',
        'Chihiro.view.userlist.GroupInformation'
    ],

    config: {
        baseCls: Ext.baseCSSPrefix + 'sheet',
        modal: true,
        centered : false,
        hideOnMaskTap : true,

        ui: 'detail',

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        width: 400,
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
                id:'MyCarousel',
                flex: 1,
                items: [
                      { xtype: 'detailInformation' },
                      { xtype: 'chattingfriendpanel' }
                ]
            },
            {
                xtype: 'button',
                text: '加为好友',
                id: 'addFriendBtn'
            },
            {
                xtype: 'button',
                text: '删除好友',
                id: 'deleteFriendBtn'
            }
        ]
    },

    hide: function(animation) {
        var me = this;

        //we fire this event so the controller can deselect all items immediately.
        me.fireEvent('hideanimationstart', me);

        //show the mask again
        me.callParent();
    },

    updateUser: function(newUser) {
        var carousel = this.down('carousel');
        information = this.down('detailInformation');
        information.setData(newUser.data);
    }

});