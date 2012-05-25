Ext.define("Chihiro.view.Home", {
    extend: 'Ext.tab.Panel',

    id: 'homeView',

    requires: [
        'Ext.util.Geolocation'
    ],
    
    config: {
        tabBarPosition:'bottom',

        items: [
            {
                xtype: 'MessagePanel',
                id: 'messagetab',
                title:'聊天',
                iconCls:'info'
            },
            {
                xtype: 'activitypanel',
                title:'活动',
                iconCls:'star'
            },
            {
                xtype: 'contactpanel',
                title:'通讯录',
                iconCls:'user'
            },
            {
                xtype: 'findfriendspanel',
                title:'找朋友',
                iconCls:'search'
            },
            {
                xtype: 'settingpanel',
                title:'设置',
                iconCls:'settings'
            }
        ]
    }
});