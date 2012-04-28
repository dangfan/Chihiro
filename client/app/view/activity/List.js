Ext.define('Chihiro.view.activity.List', {
    extend: 'Ext.navigation.View',

    xtype: 'activitypanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],
    config: {
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xtype: 'list',
            title: '活动',
            id: 'activityoperation',
            store: {
                field: ['text','operation'],
                data:[
                    {text: '搜索附近的活动', operation: 'find'},
                    {text: '发起新活动', operation: 'create'},
                    {text: '邀请好友', operation: 'invite'}
                ]
            },
            itemTpl: '{text}',
            disableSelection: true
        }]
    }
});