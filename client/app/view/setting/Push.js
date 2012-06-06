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
                    name: 'acceptable',
                    label:'接受活动的通知'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'acceptable',
                    label:'接受好友推送'
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