/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-29
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.homeViews.Contact', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'ContactList'
        }
        ]
    }
});
Ext.define('ContactList', {
    extend: 'Ext.dataview.List',
    name: 'contactList',
    config: {
        title: '通讯录',
        xtype: 'list',
        items: [
            {
                xtype: 'searchfield',
                placeHolder: '查找好友'
            }]
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
