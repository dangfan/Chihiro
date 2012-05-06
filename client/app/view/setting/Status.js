Ext.define('Chihiro.view.setting.Status', {
    extend:'Ext.form.Panel',

    requires: [
        'Ext.field.Select'
    ],

    config:{
        title:'兴趣与签名',
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'textfield',
                        name:'interests',
                        label:'兴趣',
                        placeHolder:'用空格隔开多项'
                    },
                    {
                        xtype:'textareafield',
                        name:'signature',
                        label:'个性签名'
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