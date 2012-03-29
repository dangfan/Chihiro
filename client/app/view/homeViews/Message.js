/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-29
 * Time: 上午11:07
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.homeViews.Message', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'MessageList'
        }
        ]
    }
});
Ext.define('MessageList', {
    extend: 'Ext.dataview.List',
    name: 'messageList',
    config: {
        title: '消息',
        xtype: 'list'
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
