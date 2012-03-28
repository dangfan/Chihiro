/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-29
 * Time: 上午1:37
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.Settings', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'SettingList'
        }
        ]
    }
});
Ext.define('SettingList', {
    extend: 'Ext.dataview.List',
    name: 'settingForm',
    config: {
        title: '设置',
        xtype: 'list',
        store: {
            fields: ['text', 'func'],
            data: [
                { text: '修改个人信息', func: 'email'},
                { text: '隐私设置', func: 'phone' }
            ]
        },
        itemTpl: '{text}',
        items: [{
            xtype: 'button',
            ui: 'confirm',
            text: '登出',
            docked: 'bottom',
            handler: function(){
                Ext.Msg.confirm("登出","确认要登出吗？", function(choice, value, opt) {
                    if(choice == 'ok' || choice == 'yes')
                    {
                        window.localStorage.removeItem('sid');
                        mainView.setActiveItem(Ext.create('Chihiro.view.Sign'));
                    }
                })
            }
        }
        ]
//        listeners: {
//            select: function(view, record) {
//                console.log(this.parent);
//                nowView = Ext.create(record.get('way')+ 'FindFriend', {
//                    title: record.get('text')
//                })
//                this.parent.push(nowView);
//            }
//        }
    }
});
