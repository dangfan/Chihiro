Ext.define('Chihiro.view.userlist.SimpleFriendList', {
    extend: 'Ext.tab.Panel',
    xtype:'simplefriendlist',

    config: {
        activeItem: 2,
        tabBar: {
            docked: 'top',
            ui: 'neutral',
            layout: {
                pack: 'center'
            }
        },
        items: [{
            title: '邀请好友加入群',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center'
            },
            cls: 'demo-list',
            selectedCls: 'x-item-selected',

            items: [{
                width: 400,
                height: 500,
                xtype: 'list',
                allowDeselect:false,
                mode:'MULTI',
                id: 'SimpleFriendList',
                store:{
                    fields: ['Name','id'],
                    sorters: 'Name',
                    grouper: function(record) {
                        return record.get('Name')[0];
                    },
                    data: [
                        {Name: '党凡',id:'1'},
                        {Name: '钱堃',id:'2'},
                        {Name: '蔡梦琳',id:'3'},
                        {Name:'丁鹏',id:'4'},
                        {Name:'丁鹏2',id:'5'},
                        {Name:'丁鹏3',id:'6'},
                        {Name:'徐涵',id:'7'}
                    ]
                },
                itemTpl: '<div class="contact"><strong>{Name}</strong> </div>',
                grouped: true,
                indexBar: true
            },
                {
                    xtype: 'button',
                    text: '邀请好友',
                    id: 'GroupInviteBtn'
                }]
        }
           ]
    }
});