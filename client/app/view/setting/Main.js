Ext.define('Chihiro.view.setting.Main', {
    extend: 'Ext.navigation.View',

    xtype: 'settingpanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    config: {
        defaultBackButtonText: '返回',
        items:[
            {
                title: '设置',
                xtype: 'list',
                store: {
                    fields: ['text', 'func'],
                    data: [
                        { text: '个人信息', func: 'Info'},
                        { text: '隐私设置', func: 'Privacy' }
                    ]
                },
                itemTpl: '{text}',
                disableSelection: true,
                listeners: {
                    itemtap: function(view, index, target, record) {
                        this.parent.push(Ext.create('Chihiro.view.setting.' + record.get('func'), {
                            title: record.get('text')
                        }));
                    }
                }
            },
            {
                xtype: 'button',
                docked: 'bottom',
                text: '退出登录',
                ui: 'decline',
                margin: '5 10 15 10',
                action: 'logout'
            }
        ]
    }
});