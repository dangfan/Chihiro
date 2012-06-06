Ext.define('Chihiro.view.userlist.GroupDetail', {
    extend: 'Ext.Panel',
    xtype: 'groupdetail',
    id:'GroupDetailPanel',

    requires: [
        'Ext.carousel.Carousel',
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
                id:'GroupCarousel',
                flex: 1,
                items: [
                    { xtype: 'groupDetailInformation'},
                    { xtype: 'chattinggrouppanel' }
                ]
            },
            {
                xtype: 'button',
                text: '退出该群',
                action: 'QuitGroup',
                id:'quitGroupBtn'
            }
        ]
    },

    hide: function(animation) {
        var me = this;
        me.fireEvent('hideanimationstart', me);
        me.callParent();
    },

    updateUser: function(newUser) {
        var carousel = this.down('carousel');
        information2 = this.down('groupDetailInformation');
        information2.setData(newUser.data);
    }

});