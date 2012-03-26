var moreInfoView, interestView;
Ext.define('Chihiro.view.SignUp', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'FirstView'
        }
        ]

    }
});
Ext.define('FirstView', {
    extend: 'Ext.form.Panel',
    name: 'mustForm',
    config: {
        title: '加入千寻',
        items: [
            {
                xtype: 'fieldset',
                id: 'field',
                defaults:{
                    labelWidth: '90px'
                },
                items:[
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: '邮箱',
                        placeHolder: '邮箱注册后不可修改'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: '密码'
                    },
                    {
                        xtype: 'passwordfield',
                        label: '确认密码'
                    },
                    {
                        xtype: 'numberfield',
                        name: 'phone',
                        label: '手机号'
                    },
                    {
                        xtype: 'textfield',
                        name: 'nickname',
                        label: '昵称'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults:
                {
                    xtype: 'button',
                    flex: 1,
                    width: '40%'
                },
                items: [
                    {
                        text: '下一步',
                        ui: 'confirm',
                        left: '10%',
                        handler: function(){
                            var value = this.parent.parent.getValues();
                            delete value.null;
                            console.log(value);
                            socket.emit('signup',value,
                            function(msg)
                            {
                                if(msg.err == 0)
                                {
                                    window.localStorage.setItem('sid',msg.sid);
                                    signUpView.push(Ext.create('InterestView'));
                                }
                                else alert(msg.msg);
                            });
                        }
                    },
                    {
                        xtype: 'button',
                        text: '返回',
                        ui: 'decline',
                        right: '10%',
                        action: 'backToSignIn'
                    }
                ]
            }
        ]
    }
});
Ext.define('MoreInfoView', {
    extend: 'Ext.form.Panel',
    config: {
        title: '更多信息',
        items: [
            {
                xtype: 'fieldset',
                id: 'field',
                defaults:{
                    xtype: 'textfield',
                    labelWidth: '90px'
                },
                items:[
                    {
                        label: '真实姓名',
                        name: 'name'
                    },
                    {
                        xtype: 'selectfield',
                        label: '性别',
                        name: 'gender',
                        options: [
                            {text: '男', value: 0},
                            {text: '女', value: 1}
                        ]
                    },
                    {
                        xtype: 'datepickerfield',
                        label: '生日',
                        name: 'birthday',
                        dateFormat: 'Y/m/d',
                        yearFrom: '1950',
                        value: new Date(),
                        picker:
                        {
                            yearFrom: 1950
                        }
                    },
                    {
                        label: '学校',
                        name: 'school'
                    },
                    {
                        label: '职业',
                        name: 'job'
                    },
                    {
                        xtype: 'textareafield',
                        name: 'sign',
                        label: '个性签名'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults:
                {
                    xtype: 'button'
                },
                items: [
                    {
                        text: '提交',
                        ui: 'confirm',
                        left: '15%',
                        width: '70%'
                    }
                ]
            }
        ]
    }
});
Ext.define('InterestView', {
        extend: 'Ext.form.Panel',
        config: {
            title: '兴趣爱好',
            items: [
                {
                    xtype: 'fieldset',
                    id: 'field',
                    items:[
                        {
                            xtype: 'textfield',
                            placeHolder: '千寻将根据您的兴趣问您推荐好友'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    defaults:
                    {
                        xtype: 'button'
                    },
                    items: [
                        {
                            text: '下一步',
                            ui: 'confirm',
                            left: '10%',
                            width: '40%',
                            handler: function(){
                                signUpView.push(Ext.create('MoreInfoView'))
                            }
                        },
                        {
                            text: '以后再说',
                            ui: 'decline',
                            right: '10%',
                            width: '40%'
                        }
                    ]
                }
            ]
        }
    });