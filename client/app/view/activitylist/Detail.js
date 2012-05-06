Ext.define('Chihiro.view.activitylist.Detail', {
    extend: 'Ext.Panel',
    xtype: 'activitydetail',
    id: 'activitydetail',

    requires: [
        'Ext.carousel.Carousel',
        'Chihiro.view.activitylist.BasicInformation'
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
                flex: 1,
                items: [
                    {
                        xtype: 'basicinformation'
                    },
                    {
                        xtype: 'detailinformation'
                    },
                    {
                        xtype: 'detailMap'
                    }
                ]
            },
            {
                xtype: 'button',
                text: '我要参加',
                id: 'ParticipateBtn',
                action: 'participate'
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
        var carousel = this.down('carousel'),
            basicInformation = this.down('basicinformation'),
            detailInformation = this.down('detailinformation'),
            map = this.down('detailMap');
        basicInformation.setData(newUser.data);
        detailInformation.setData(newUser.data);
        map.setMapCenter(newUser.data.mark);
        map.setMapOptions({zoom: newUser.data.zoom});
    }

});