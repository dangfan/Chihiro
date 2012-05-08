Ext.define('Chihiro.view.message.other.InviteToGroup', {
    extend: 'Ext.Panel',
    xtype:'simplegrouplist',

    config: {
        items: [{
            width: 400,
            height: 500,
            xtype: 'list',
            allowDeselect:false,
            mode:'MULTI',
            id: 'SimpleGroupList',
            store:{
                fields: ['name','id'],
                sorters: 'name',
                grouper: function(record) {
                    return record.get('name')[0];
                },
                proxy: {
                    type: 'localstorage'
                },
                data: [
                    {name: '党主席基友团',id:'1'},
                    {name: '约炮专群',id:'2'}
                ]
            },
            itemTpl: '<div class="contact"><strong>{name}</strong> </div>',
            grouped: true
        }
        ]
    }
});