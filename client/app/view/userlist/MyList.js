Ext.define('Chihiro.view.userlist.MyList', {
    extend: 'Ext.dataview.List',
    xtype:'simplefriendlist',

    config: {
            width: '100%',
            height: 500,
            allowDeselect:true,
            cls: 'demo-list',
            store:{
                fields: [ 'id','_id', 'name', 'title','nickname', 'signiture',
                    'gender', 'birthday', 'school', 'job', 'portrait', 'interests',
                    'intro','dis','members'],
                sorters: 'nickname',
                grouper: function(record) {
                        return record.get('nickname')[0];
                },
                proxy: {
                    type: 'localstorage'
                }
            },
            itemTpl: '<div class="contact"><strong>{nickname}{title}</strong> </div>',
            grouped: true,
            indexBar: true
    }
});