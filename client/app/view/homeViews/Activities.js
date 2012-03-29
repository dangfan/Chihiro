/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-29
 * Time: 上午11:05
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.homeViews.Activities', {
    extend: 'Ext.navigation.View',
    config: {
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items:[{
            xclass: 'ActivityList'
        }
        ]
    }
});
Ext.define('ActivityList', {
    extend: 'Ext.dataview.List',
    name: 'activityList',
    config: {
        title: '活动',
        xtype: 'list',
        items: [
            {
                xtype: 'searchfield',
                placeHolder: '搜索活动'
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
