Ext.define('Chihiro.view.activitylist.Map', {
    extend: 'Ext.Map',
    xtype: 'detailMap',
    config: {
        mapOptions: {
            //center: this.mapPosition,
            disableDefaultUI: true,
            //zoom: 15,
            draggable: true
        }
    }
});
