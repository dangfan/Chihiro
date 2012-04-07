Ext.define('Chihiro.view.message.List', {
    extend: 'Ext.navigation.View',

    xtype: 'messagepanel',

    config: {
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            title: '聊天'
        }]
    }
});