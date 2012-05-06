Ext.define('Chihiro.view.activity.MapLocate',{
    extend: 'Ext.Panel',
    xtype: 'maplocate',
    scrollable: false,
    config: {
        title: '确认坐标',
        layout: 'vbox',
        fullscreen: true,
        scrollable: false,
        items:[
            {
                xtype: 'carousel',
                scrollable: false,
                items: [
                    {
                        xtype:'detailMap',
                        id: 'mylocation',
                        mapOptions:{
                            zoom: 16
                        }
                    }
                ],
                flex: 3
            },
            {
                xtype: 'panel',
                flex: 2,
                layout: 'vbox',
                items:[
                    {
                        xtype:'panel',
                        defaults:{
                            xtype:'button'
                        },
                        items:[
                            {
                                text:'确定',
                                ui:'confirm',
                                enabled:false,
                                action: 'toDetailActivity'
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        html: '<p align="middle"><h1> 若图示不正确，请返回上一层重新设置地点 </h1></p>'
                    }
                ]
            }
        ]
    }
})