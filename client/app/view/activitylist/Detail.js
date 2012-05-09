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
            },
            {
                xtype: 'button',
                text: '邀请好友',
                id: 'InviteBtn',
                action: 'invite'
            },
            {
                xtype: 'button',
                text: '编辑',
                id: 'EditBtn',
                action: 'edit'
            },
            {
                xtype: 'button',
                text: '我要退出',
                id: 'QuitBtn',
                action: 'quit'
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
        carousel.setActiveItem(0);
        basicInformation.setData(newUser.data);
        detailInformation.setData(newUser.data);
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': newUser.data.location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                map.setMapCenter(results[0].geometry.location);
                map.setMapOptions({zoom: newUser.data.zoom});
            } else {
                alert("Geocode was not successful for the following reason: " + status);
            }
        });
    }
});