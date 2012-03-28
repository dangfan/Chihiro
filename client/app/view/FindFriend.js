/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-28
 * Time: 下午3:41
 * To change this template use File | Settings | File Templates.
 */
var userList, nowView;
Ext.define('Chihiro.view.FindFriend', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'FindWayList'
        }
        ]
    }
});
Ext.define('FindWayList', {
    extend: 'Ext.dataview.List',
    name: 'findWayForm',
    config: {
        title: '找朋友',
        xtype: 'list',
        name: 'searchMethod',
        store: {
            fields: ['text', 'way'],
            data: [
                { text: '按邮箱地址查找好友', way: 'email'},
                { text: '按手机号查找好友', way: 'phone' },
                { text: '通过手机通讯录', way: 'contact' },
                { text: '查找附近的人', way: 'nearby' }
            ]
        },
        itemTpl: '{text}',
        listeners: {
            select: function(view, record) {
                console.log(this.parent);
                nowView = Ext.create(record.get('way')+ 'FindFriend', {
                    title: record.get('text')
                })
                this.parent.push(nowView);
            }
        }
    }
});

Ext.define('emailFindFriend', {
    extend: 'Ext.form.Panel',
    config: {
        items: [
            {
                xtype: 'fieldset',
                items:[{
                    xtype: 'emailfield',
                    name: 'email',
                    placeHolder: '输入好友邮箱地址'
                }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: '确认',
                        ui: 'confirm',
                        handler: function(){
                            var value = this.parent.parent.getValues();
                            socket.emit('get info by email',value['email'], function(msg) {
                                if(msg.err == 0)
                                {
                                    alert('found');
                                    console.log(nowView.parent);
                                    this.parent.parent.parent.push('Chihiro.view.UserList');
                                }
                                else alert(msg.obj);
                            });

                        }
                    }
                ]
            }
        ]
    }
});
Ext.define('phoneFindFriend', {
    extend: 'Ext.form.Panel',
    config: {
        items: [
            {
                xtype: 'fieldset',
                items:[{
                    xtype: 'numberfield',
                    name: 'phone',
                    placeHolder: '输入好友手机号'
                }]
            },
            {
                xtype: 'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'button',
                        text: '确认',
                        ui: 'confirm',
                        handler: function(){
                            var value = this.parent.parent.getValues();
                            socket.emit('get info by phone',value['phone'], function(msg) {
                                if(msg.err == 0)
                                {
                                    alert(msg.obj);
                                    this.parent.parent.parent.push(Ext.create('userList', {
                                        title: '查找结果'
                                    }));
                                }
                                else alert(msg.usr);
                            });

                        }
                    }
                ]
            }
        ]
    }
});
Ext.define('contactFindFriend', {
    extend: 'Ext.form.Panel'
});
Ext.define('nearbyFindFriend', {
    extend: 'Chihiro.view.UserList',
    config: {
    }
});
//Ext.define('userList',{
//    extend: 'Ext.dataview.List',
//    config: {
//        store: {
//            fields: ['text', 'way'],
//            data: [
//                { text: '按邮箱地址查找好友', way: 'email'},
//                { text: '按手机号查找好友', way: 'phone' },
//                { text: '通过手机通讯录', way: 'contact' },
//                { text: '查找附近的人', way: 'nearby' }
//            ]
//        },
//        itemTpl: '{text}'
//    }
//})