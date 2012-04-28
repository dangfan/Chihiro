Ext.define('Chihiro.view.contact.List', {
    extend: 'Ext.Carousel',

    xtype: 'contactpanel',
    id: 'contactnavigationview',

    layout: 'vbox',
    config: {
        fullscreen: true,
        //autoDestroy: false,
        scrollable: true,
        //defaultBackButtonText: '返回',
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '好友'
            }
        ]
    }
});