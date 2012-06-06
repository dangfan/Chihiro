Ext.define('Chihiro.view.message.ChattingGroupPanel', {
    extend: 'Ext.navigation.View',

    xtype: 'chattinggrouppanel',
    id:'chattinggrouppanel',

    requires: [
        'Ext.data.Store',
        'Ext.dataview.List'
    ],

    config: {
        defaultBackButtonText: '返回',
        items:[
            {
                title: '设置',
                xtype: 'list',
                ui:'round',
                disableSelection: true,
                grouped:true,
                pinHeaders:false,

                store: {
                    fields: ['text', 'sort','func'],
                    sorters:'sort',
                    proxy: {
                        type: 'localstorage'
                    },
                    grouper:function(record){
                        return record.get('sort');
                    },

                    data: [
                        { text: '修改群公告', sort:' ',func: 'GroupInfoModify'},
                        { text: '邀请好友', sort: '   ',func: 'InviteToGroup' }

                    ]
                },
                itemTpl: '<div class="contact"><strong>{text}</strong></div>',

                onItemDisclosure: function(record, btn, index) {
                    Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('firstName'), Ext.emptyFn);
                },

                listeners: {
                    itemtap: function(view, index, target, record) {
                        console.log(record.get('func'));
                        this.parent.push(Ext.create('Chihiro.view.message.other.' + record.get('func'), {
                            title: record.get('text')
                        }));
                        invitationList = [];
                        Ext.getCmp('InvitationList').setData([]);
                        var store = Ext.getCmp('InvitationList').getStore();
                        console.log(2);
                        store.load();
                        Ext.getCmp('InvitationList').setData(friendList);
                    }
                }
            }
        ]
    }
});