
Ext.define('Chihiro.view.SignUp', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[
            {
                title: '加入千寻',
                items: [
                    {
                        xtype: 'fieldset',
                        id: 'field',
                        width: '90%',
                        left: '5%',
                        top: '15px',
                        items:[
                            {
                                xtype: 'emailfield',
                                labelWidth: '90px',
                                label: '邮箱'
                            },
                            {
                                xtype: 'passwordfield',
                                labelWidth: '90px',
                                label: '密码'
                            },
                            {
                                xtype: 'passwordfield',
                                labelWidth: '90px',
                                label: '确认密码'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [
                            {
                                xtype: 'button',
                                text: '下一步',
                                ui: 'confirm',
                                top: '170px',
                                left: '15%',
                                width: '30%',
                                handler: function(){
                                    signUpView.push(Ext.create('InterestView'))
                                }
                            },
                            {
                                xtype: 'button',
                                text: '返回',
                                ui: 'decline',
                                top: '170px',
                                right: '15%',
                                width: '30%',
                                action: 'backToSignIn'
                            }
                        ]
                    }
                ]
            }
        ]

    }
});
Ext.define('MoreInfoView', {
    extend: 'Ext.Panel',
    config: {

        title: '更多信息',
        items: [
            {
                xtype: 'fieldset',
                id: 'field',
                width: '90%',
                left: '5%',
                top: '20px',
                instructions: '让别人更了解你吧！',
                items:[
                    {
                        xtype: 'textfield',
                        label: '真实姓名',
                        labelWidth: '90px'
                    },
                    {
                        xtype: 'selectfield',
                        label: '性别',
                        labelWidth: '90px',
                        options: [
                            {text: '男', value: 0},
                            {text: '女', value: 1}
                        ]
                    },
                    {
                        xtype: 'datepickerfield',
                        label: '生日',
                        labelWidth: '90px',
                        name: 'birthday',
                        dateFormat: 'Y/m/d',
                        yearFrom: '1950',
                        value: new Date()
                    },
                    {
                        xtype: 'textfield',
                        label: '学校',
                        labelWidth: '90px'
                    },
                    {
                        xtype: 'textfield',
                        label: '职业',
                        labelWidth: '90px'
                    }
                ]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: '下一步',
                        ui: 'confirm',
                        top: '300px',
                        left: '10%',
                        width: '35%',
                        handler: function(){
                            signUpView.push({
                                title: '更多信息'
                            })
                        }
                    },
                    {
                        xtype: 'button',
                        text: '以后再填',
                        ui: 'decline',
                        top: '300px',
                        right: '10%',
                        width: '40%'
                    }
                ]
            }
        ]
    }
});
Ext.define('InterestView', {
        extend: 'Ext.Panel',
        config: {
            title: '兴趣爱好',
            items: [
                {
                    xtype: 'fieldset',
                    id: 'field',
                    width: '90%',
                    left: '5%',
                    top: '15px',
                    items:[
                        {
                            xtype: 'textfield'
                        }
                    ]
                },
                {
                    xtype: 'panel',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',
                            text: '下一步',
                            ui: 'confirm',
                            top: '170px',
                            left: '10%',
                            width: '35%',
                            handler: function(){
                                signUpView.push(Ext.create('MoreInfoView'))
                            }
                        },
                        {
                            xtype: 'button',
                            text: '以后再说',
                            ui: 'decline',
                            top: '170px',
                            right: '10%',
                            width: '40%'
                        }
                    ]
                }
            ]
        }
    });