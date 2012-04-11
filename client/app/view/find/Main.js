Ext.define('Chihiro.view.find.Main', {
    extend: 'Ext.navigation.View',

    xtype: 'findfriendspanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    config: {
        autoDestroy: false,
        useTitleForBackButtonText: true,
        items:[{
            title: '找朋友',
            xtype: 'list',
            id: 'findlist',
            store: {
                fields: ['text', 'way'],
                data: [
                    { text: '按邮箱地址查找好友', way: 'email' },
                    { text: '按手机号查找好友', way: 'phone' },
                    { text: '通过手机通讯录', way: 'contact' },
                    { text: '查找附近的人', way: 'Nearby' }
                ]
            },
            itemTpl: '{text}',
            disableSelection: true
        }]
    }
});