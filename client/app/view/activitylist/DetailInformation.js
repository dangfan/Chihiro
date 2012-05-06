Ext.define('Chihiro.view.activitylist.DetailInformation', {
    extend: 'Ext.Container',
    xtype: 'detailinformation',
    requires: ['Ext.XTemplate'],

    config: {
        cls: 'detail-card',
        styleHtmlContent: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        tpl: Ext.create('Ext.XTemplate',
            '<h1>{name}</h1>',
            '<p class="overview">',
            '<strong>详细介绍:</strong> {detail}<br />',
            '<p >'
        )
    }
});