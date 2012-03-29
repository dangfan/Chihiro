Ext.define('Chihiro.view.detail.Map', {
    extend: 'Ext.Map',
    xtype: 'detailMap',
    config: {
        mapOptions: {
            // center: this.mapPositieon,
            disableDefaultUI: true,
            zoom: 17,
            draggable: true
        }
    }
});