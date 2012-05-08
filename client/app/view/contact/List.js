Ext.define('Chihiro.view.contact.List', {
    extend: 'Ext.Panel',

    xtype: 'contactpanel',
    id: 'contactnavigationview',

    layout: 'vbox',
    config: {
        fullscreen: true,
        scrollable: true,
        layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
            type: 'vbox',
            align: 'center',
            pack: 'center'
        },
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '通讯录'
            },
            {
                xtype:'simplefriendlist',
                id: 'SimpleFriendList'
            }
        ]
    }
});