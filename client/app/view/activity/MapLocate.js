Ext.define('Chihiro.view.activity.MapLocate',{
    extend: 'Ext.form.Panel',
    xtype: 'maplocate',

    config: {
        title: '确认坐标',
        layout: 'vbox',
        items:[
            {
                xclass: 'Ext.Map',
                mapOptions:{
                    disableDefaultUI: true,
                    zoom: 15,
                    draggable: true
                }
            },
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
})