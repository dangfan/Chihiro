Ext.define('Chihiro.view.activity.Create',{
    extend: 'Ext.navigation.View',
    xtype: 'createform',

    config: {
        autoDestroy: false,
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items: [
            {
                xclass: 'Chihiro.view.activity.BasicActivityInfo',
                id: 'basicactivityinfo'
            }
        ]
    }
})