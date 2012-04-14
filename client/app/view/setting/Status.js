Ext.define('Chihiro.view.setting.Status', {
    extend:'Ext.form.Panel',

    requires: [
        'Ext.field.Select'
    ],

    config:{
        title:'头像与签名',
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype: 'selectfield',
                        label: '我的状态',
                        name: 'status',
                        options: [{
                            text: '在线',
                            value: 0
                        }, {
                            text: '隐身',
                            value: 1
                        },{
                            text:'离开',
                            value:2
                        }
                        ]
                    },
                    {
                        xtype:'textfield',
                        name:'signature',
                        label:'个性签名',
                        placeHolder:'诚征好基友！'
                    }
                ]
            },
            {
                xtype:'panel',
                layout:'hbox',
                defaults:{
                    xtype:'button'
                },
                items:[
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: '保存修改',
                        ui: 'confirm',
                        width: '40%'
                        //action:'requiredConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});