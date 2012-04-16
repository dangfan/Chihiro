Ext.define('Chihiro.view.setting.Account', {
    extend:'Ext.form.Panel',

    config:{
        title:'我的帐户',
        items:[
            {
                xtype:'fieldset',
                defaults:{
                    required:true,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textfield',
                        name:'name',
                        label:'真实姓名',
                        placeHolder:'党凡'
                    },
                    {
                        xtype:'emailfield',
                        name:'email',
                        label:'邮箱',
                        placeHolder:'hjy@gmail.com',
                        valueType:'email'
                    },
                    {
                        xtype:'numberfield',
                        name:'phone',
                        label:'手机号',
                        placeHolder:'123456789'
                    },
                    {
                        xtype:'passwordfield',
                        name:'password',
                        label:'密码',
                        placeHolder:'******',
                        action:''
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