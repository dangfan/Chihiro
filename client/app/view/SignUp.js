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
                    labelWidth: '95px',
                    required: true,
                    allowBlank: false
                },
                items:[
                    {
                        xtype: 'emailfield',
                        name: 'email',
                        label: '邮箱',
                        placeHolder: '邮箱注册后不可修改',
                        valueType: 'email'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'password',
                        label: '密码'
                    },
                    {
                        xtype: 'passwordfield',
                        name: 'confirmPW',
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
                        enabled: false,
                        handler: function(){
                            var value = this.parent.parent.getValues();
                            console.log(value);
                            if(value.email.length == 0 || value.password.length == 0 || value.phone.length == 0 || value.nickname.length == 0)
                            {
                                Ext.Msg.alert('请完整填写信息！');
                            }
                            else if(!value.email.match(/^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/))
                            {
                                //this.parent.parent.email.focus();
                                Ext.Msg.alert('邮箱格式不正确');
                            }
                            else if(value.confirmPW != value.password)
                            {
                                //this.parent.parent.item[password].focus();
                                Ext.Msg.alert('两次密码输入不同');
                            }
                            else
                            {
                                delete value.confirmPW;
                                console.log('here');
                                socket.emit('signup',value,
                                    function(msg)
                                    {
                                        if(msg.err == 0)
                                        {
                                            console.log('success');
                                            window.localStorage.setItem('sid',msg.msg);
                                            signUpView.push(Ext.create('InterestView'));
                                        }
                                        else Ext.Msg.alert(msg.msg);
                                    });
                            }

                        }
                    },
                    {
                        text: '返回',
                        ui: 'decline',
                        right: '10%',
                        action: 'backToSignIn'
                    }
                ]
            }
        ]
    }
//    validateForm: function(value) {
//        var valid = true;
//        if(value.email.length == 0 || value.password.length == 0 || value.phone.length == 0 || value.nickname.length == 0)
//        {
//            Ext.Msg.alert('请完整填写信息！');
//            valid = false;
//        }
//        else if(!value.email.match(/^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/))
//        {
//            //this.parent.parent.email.focus();
//            Ext.Msg.alert('邮箱格式不正确');
//            valid = false;
//        }
//        else if(value.confirmPW != value.password)
//        {
//            //this.parent.parent.item[password].focus();
//            Ext.Msg.alert('两次密码输入不同');
//            valid = false;
//        }
//        return valid;
//    }
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
                        name: 'signiture',
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
                        left: '10%',
                        width: '40%',
                        handler: function(){
                            var value = this.parent.parent.getValues();
                            delete value.null;
                            console.log(value);
                            socket.emit('update profile',value);
                            mainView.setActiveItem(Ext.create('Chihiro.view.Home'));
                        }
                    },
                    {
                        text: '以后再说',
                        ui: 'decline',
                        right: '10%',
                        width: '40%',
                        handler: function() {
                            mainView.setActiveItem(Ext.create('Chihiro.view.Home'));
                        }
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
                            name: 'interest',
                            placeHolder: '千寻将根据您的兴趣问您推荐好友'
                        }
                    ]
                },
//                {
//                    xtype: 'list',
//                    itemTpl: '<div class="contact">{interestItem}</div>',
//                    store: interestStore
//                },
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
                                var interest = this.parent.parent.getValues().interest;
                                console.log(value);
                                socket.emit('update profile',{interests:[value]});
                                signUpView.push(Ext.create('MoreInfoView'))
                            }
                        },
                        {
                            text: '以后再说',
                            ui: 'decline',
                            right: '10%',
                            width: '40%',
                            handler: function() {
                                mainView.setActiveItem(Ext.create('Chihiro.view.Home'));
                            }
                        }
                    ]
                }
            ]
        }
    });