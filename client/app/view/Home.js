/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-26
 * Time: 上午12:22
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Chihiro.view.Home', {
    extend: 'Ext.tab.Panel',
    config: {
        fullscreen:true,
        tabBarPosition:'bottom',
        items:[
            {
                title:'新鲜事',
                iconCls:'star',
                items:[
                    {
                        xtype:'titlebar',
                        docked:'top',
                        title:'新鲜事',
                        items:[
                            {
                                iconCls:'refresh',
                                align:'right'
                            }
                        ]
                    }
                ]
            },
            {
                title:'消息',
                items:[
                    {
                        xtype:'titlebar',
                        docked:'top',
                        title:'消息',
                        items:[
                            {
                                iconCls:'compose',
                                align:'right'
                            }
                        ]
                    }
                ]
            },
            {
                title:'好友',
                items:[
                    {
                        xtype:'titlebar',
                        docked:'top',
                        title:'好友',
                        items:[
                            {
                                iconCls:'user',
                                align:'right'
                            }
                        ]
                    }
                ]
            },
            {
                title:'查找',
                iconCls:'search',
                items:[
                    {
                        xtype:'titlebar',
                        docked:'top',
                        title:'查找'
                    }
                ]
            },
            {
                title:'设置',
                iconCls:'settings',
                items:[
                    {
                        xtype:'titlebar',
                        docked:'top',
                        title:'消息'
                    }
                ]
            }
        ]
    }
})