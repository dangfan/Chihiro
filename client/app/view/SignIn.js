Ext.define("Chihiro.view.SignIn", {
    extend: 'Ext.form.Panel',

    id: 'loginView',

    requires: [
        'Ext.TitleBar',
        'Ext.form.FieldSet',
        'Ext.field.Password'
    ],
    
    config: {

        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: '千寻',
                items:[
                    {
                        xtype:'button',
                        text: '注册',
                        align: 'right',
                        id: 'gotoSignUpViewBtn'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                instructions: '还没有账号？看右上角吧亲',
                items:[
                    {
                        xtype: 'textfield',
                        name: 'username',
                        label: '账号',
                        placeHolder: '邮箱或手机号'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: '密码'
                    }
                ]
            },
            {
                xtype: 'button',
                text: '登录',
                ui: 'confirm',
                id: 'signinBtn'
            }
        ]
    }
});