Ext.define('Chihiro.view.activity.MapLocate',{
    extend: 'Ext.Panel',
    xtype: 'maplocate',
    scrollable: false,
    config: {
        title: '确认坐标',
        layout: 'vbox',
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
                items:[
                    {
                        xtype: 'fieldset',
                        id: 'locationfield',
                        title: '地图坐标',
                        items:[
                            {
                                xtype: 'textfield',
                                label: '纬度',
                                name: 'latitude',
                                id: 'latitudetext',
                                disabled: true
                            },
                            {
                                xtype: 'textfield',
                                label: '经度',
                                name: 'longitude',
                                id: 'longitudetext',
                                disabled: true
                            }
                        ]
                    },
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
                    }
                ]
            }
        ]
    }
})