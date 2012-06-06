Ext.define('Chihiro.view.setting.Privacy', {
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
                    id: 'friendverify',
                    label:'加我为好友时需要验证'
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
                        xtype: 'selectfield',
                        label: '地理位置可见性',
                        id: 'geoVisible',
                        name: 'locationVisibility',
                        options: [{
                            text: '可见',
                            value: 0
                        },{
                            text:'不可见',
                            value: 1
                        }
                        ]
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
                        width: '40%',
                        action: 'privacyOptionalConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }]
    }
});