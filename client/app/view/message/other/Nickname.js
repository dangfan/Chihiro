Ext.define('Chihiro.view.message.other.Nickname', {
    extend: 'Ext.form.Panel',

    requires: [
        'Ext.field.Select',
        'Ext.field.DatePicker'
    ],

    config: {
        title: '修改备注名',
        items: [{
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    label: '备注名',
                    name: 'nickname',
                    placeHolder:'党主席'
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