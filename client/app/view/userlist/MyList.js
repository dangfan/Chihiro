Ext.define('Chihiro.view.userlist.MyList', {
    extend: 'Ext.dataview.List',
    xtype:'simplefriendlist',

    config: {
            width: '100%',
            height: 500,
            allowDeselect:true,
            cls: 'demo-list',
            store:{
                fields: [ 'id', 'name', 'nickname', 'signiture', 'gender', 'birthday', 'school', 'job', 'portrait', 'interests', 'dis','type'],
                sorters: 'nickname',
                grouper: function(record) {
                    return record.get('nickname')[0];
                },
                proxy: {
                    type: 'localstorage'
                }
            },
            itemTpl: '<div class="contact"><strong>{nickname}</strong> </div>',
            grouped: true,
            indexBar: true
    }
});