Ext.define('Chihiro.view.userlist.SimpleFriendList', {
    extend: 'Ext.tab.Panel',
    xtype:'simplefriendlist2',

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
            title: '邀请好友',
            layout: Ext.os.deviceType == 'Phone' ? 'fit' : {
                type: 'vbox',
                align: 'center',
                pack: 'center',
                docked:'top'
            },
            cls: 'demo-list',
            selectedCls: 'x-item-selected',

            items: [{
                width: '100%',
                height: 500,
                xtype: 'list',
                allowDeselect:false,
                mode:'MULTI',
                id: 'SimpleFriendList2',
                store:{
                    fields: ['nickname','_id'],
                    sorters: 'nickname',
                    grouper: function(record) {
                        return record.get('nickname')[0];
                    },
                    proxy: {
                        type: 'localstorage'
                    }
//                    data: [
//                        {nickname: '党凡',id:'1'},
//                        {nickname: '钱堃',id:'2'},
//                        {nickname: '蔡梦琳',id:'3'},
//                        {nickname:'丁鹏',id:'4'},
//                        {nickname:'丁鹏2',id:'5'},
//                        {nickname:'丁鹏3',id:'6'},
//                        {nickname:'徐涵',id:'7'}
//                    ]
                },
                itemTpl: '<div class="contact"><strong>{nickname}</strong> </div>',
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