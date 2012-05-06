Ext.define('Chihiro.view.activitylist.List',{
    extend: 'Ext.DataView',
    xtype: 'activitylist',

    config: {
        ui:'loans',
        useComponents: true,
        store: {
            model: 'Chihiro.model.Activity',
            id: 'activityliststore',
            data:[{
                name: 'name',
                starttime: '07:00',
                endtime: '12:00',
                date: new Date(),
                location: '东京',
                mark: { latitude: 37.381592, longitude: 122.135672 },
                cost: 'cost',
                type: 'type',
                sponsor: 'sponsor',
                detail: 'detail',
                zoom: 15
            }]
        },
        defaultType: 'activitylistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有找到任何活动哦</div>',
        deselectOnContainerClick: false
    }
})