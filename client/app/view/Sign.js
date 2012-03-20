Ext.define('Chihiro.view.Sign', {
    extend: 'Ext.form.Panel',
    config: {
        fullscreen: true,
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
                        action: 'gotoSignUp'
                    }
                ]
            },
            {
                xtype: 'fieldset',
                instructions: '还没有账号？看右上角吧亲',
                items:[
                    {
                        xtype: 'emailfield',
                        label: '邮箱'
                    },
                    {
                        xtype: 'passwordfield',
                        label: '密码'
                    }
                ]
            },
            {
                xtype: 'button',
                text: '登录',
                ui: 'confirm'
            }
        ]
    }
})
