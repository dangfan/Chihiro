Ext.define('Chihiro.view.detail.Map', {
    extend: 'Ext.Map',
    xtype: 'detailMap',
    config: {
        mapOptions: {
            // center: this.mapPosition,
            disableDefaultUI: true,
            zoom: 17,
            draggable: true
        }
    }
});