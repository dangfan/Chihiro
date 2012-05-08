Ext.define('Chihiro.view.setting.Account', {
    extend:'Ext.form.Panel',
    autoDestroy: true,
    id: 'accountSetting',
    config:{
        title:'我的帐户',
        items:[
            {
                xtype:'fieldset',
                defaults:{
                    required:true,
                    allowBlank:false,
                    readOnly: true
                },
                items:[
                    {
                        xtype:'emailfield',
                        name:'email',
                        label:'邮箱',
                        valueType:'email'
                    },
                    {
                        xtype:'numberfield',
                        name:'phone',
                        label:'手机号'
                    },
                    {
                        xtype: 'spacer',
                        width: 5
                    },
                    {
                        xtype:'passwordfield',
                        name: 'newpassword',
                        label: '新密码',
                        readOnly:false
                    },
                    {
                        xtype:'passwordfield',
                        name:'repeatpassword',
                        label: '重复新密码',
                        readOnly:false
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
                        text: '修改密码',
                        ui: 'confirm',
                        width: '40%',
                        action:'updateAccount'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});