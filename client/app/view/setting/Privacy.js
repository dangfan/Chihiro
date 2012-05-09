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
                        name: 'locationVisibility',
                        options: [{
                            text: '对所有人可见',
                            value: 0
                        }, {
                            text: '仅对好友可见',
                            value: 1
                        },{
                            text:'对所有人都不可见',
                            value:2
                        }
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        label: '手机号码可见性',
                        name: 'locationVisibility',
                        options: [{
                            text: '对所有人可见',
                            value: 0
                        }, {
                            text: '仅对好友可见',
                            value: 1
                        },{
                            text:'对所有人都不可见',
                            value:2
                        }
                        ]
                    },
                    {
                        xtype: 'selectfield',
                        label: '邮箱地址可见性',
                        name: 'locationVisibility',
                        options: [{
                            text: '对所有人可见',
                            value: 0
                        }, {
                            text: '仅对好友可见',
                            value: 1
                        },{
                            text:'对所有人都不可见',
                            value:2
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