
Ext.define('Chihiro.view.Detail', {
    extend: 'Ext.Panel',
    xtype: 'detail',

    requires: [
        'Chihiro.view.detail.Information',
        'Chihiro.view.detail.Map',
        'Ext.carousel.Carousel'
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
                    { xtype: 'detailInformation' },
                    { xtype: 'detailMap' }
                ]
            },
            {
                xtype: 'button',
                text: '加为好基友'
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
        var carousel = this.down('carousel'),  information = this.down('detailInformation');
        map = this.down('detailMap'),
        coords = newUser.get('location').geo.pairs.split(' ').map(parseFloat);
        information.setData(newUser.data);


        //update the map
        if (this.mapMarker) {
            this.mapMarker.setMap(null);
            delete this.mapMarker;
        }

        this.mapMarker = new google.maps.Marker({
            map: map.map,
            title : newUser.get('name'),
            position: new google.maps.LatLng(coords[0], coords[1])
        });

        carousel.setActiveItem(0);

        map.setMapCenter(this.mapMarker.position);
    }

});
