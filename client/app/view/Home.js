/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-26
 * Time: 上午12:22
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Chihiro.view.Home', {
    extend: 'Ext.tab.Panel',
    xtype: 'homeView',
    config: {
        fullscreen:true,
        tabBarPosition:'bottom',
        items:[
            {
                xclass: 'Chihiro.view.homeViews.Message',
                title:'消息',
                iconCls:'info'
            },
            {
                xclass: 'Chihiro.view.homeViews.Activities',
                title:'活动',
                iconCls:'star'
            },
            {
                xclass: 'Chihiro.view.homeViews.Contact',
                title:'通讯录',
                iconCls:'user'
            },
            {
                xclass: 'Chihiro.view.homeViews.FindFriend',
                title:'找朋友',
                iconCls:'search'
            },
            {
                xclass: 'Chihiro.view.homeViews.Settings',
                title:'设置',
                iconCls:'settings'
            }
        ]
    }

})