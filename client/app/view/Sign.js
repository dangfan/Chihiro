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
                name: 'fieldSet',
                instructions: '还没有账号？看右上角吧亲',
                items:[
                    {
                        xtype: 'emailfield',
                        name: 'username',
                        label: '邮箱'
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
                handler: function(){
                    var value = this.parent.getValues();
                    delete value.null;
                    socket.emit('login',value, function(msg) {
                        if(msg.err == 0)
                        {
                            console.log('success');
                            window.localStorage.setItem('sid',msg.sid);
                            mainView.setActiveItem(Ext.create('Chihiro.view.Home'));
                        }
                        else Ext.Msg.alert(msg.msg);
                    });
                }
            }
        ]
    }
})
