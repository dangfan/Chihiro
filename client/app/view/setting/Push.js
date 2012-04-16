Ext.define('Chihiro.view.setting.Push', {
    extend: 'Ext.form.Panel',


    requires: [
        'Ext.field.Select',
        'Ext.field.Spinner'
    ],

    config: {
        title: '个人名片',
        items: [{
            xtype: 'fieldset',
            defaults: {
                labelWidth: '40%'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    name: 'onlinereminder',
                    label:'好友上线提醒'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'acceptable',
                    label:'接受活动的通知'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'acceptable',
                    label:'接受好友推送'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'acceptable',
                    label:'通讯录好友注册提醒'
                }
            ]
        },
            {
                xtype: 'fieldset',
                defaults: {
                    labelWidth: '40%'
                },
                items: [
                    {
                        xtype      : 'spinnerfield',
                        name       : 'begin',
                        label      : '开始推送时间',
                        minValue   : 0,
                        maxValue   : 24,
                        defaultValue:8,
                        increment  : 1,
                        cycle      : true
                    },
                    {
                        xtype      : 'spinnerfield',
                        name       : 'end',
                        label      : '结束推送时间',
                        minValue   : 0,
                        maxValue   : 24,
                        defaultValue:20,
                        increment  : 1,
                        cycle      : true
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    xtype: 'button'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: '保存修改',
                        ui: 'confirm',
                        width: '40%'
                        //action: 'optionalConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }]
    }
});