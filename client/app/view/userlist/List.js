Ext.define('Chihiro.view.userlist.List', {
    extend: 'Ext.DataView',
    xtype: 'userlist',

    config: {
        store: {
            fields: ['name', 'signiture','id','dis','interest','image','location','phone','email','gender'
                ,'birthday','school','nickname']
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'listitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有找到任何人哦</div>',
        // disableSelection: true,
        deselectOnContainerClick: false
    }
});