Ext.define('Chihiro.view.contact.List', {
    extend: 'Ext.navigation.View',

    xtype: 'contactpanel',

    config: {
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            title: '通讯录',
            xtype: 'userlist'
        }]
    }
});