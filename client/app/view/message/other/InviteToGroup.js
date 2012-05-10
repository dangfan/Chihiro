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
                fields: ['nickname','id'],
                sorters: 'nickname',
                grouper: function(record) {
                    return record.get('nickname')[0];
                },
                proxy: {
                    type: 'localstorage'
                }
                //TODO: still have hard code in group
            },
            itemTpl: '<div class="contact"><strong>{nickname}</strong> </div>',
            grouped: true
        }
        ]
    }
});