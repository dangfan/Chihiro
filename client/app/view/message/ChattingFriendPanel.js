Ext.define('Chihiro.view.message.ChattingFriendPanel', {
    extend: 'Ext.navigation.View',

    xtype: 'chattingfriendpanel',
    id:'chattingfriendpanel',

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
                id:'friendData',

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
                        //{ text: '修改备注名', sort:' ',func: 'Nickname'},
                        { text: '邀请到群组', sort: '   ',func: 'InviteToGroup' }
                    ]
                },
                itemTpl: '<div class="contact"><strong>{text}</strong></div>',

                onItemDisclosure: function(record, btn, index) {
                    Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('firstName'), Ext.emptyFn);
                },

                listeners: {
                    itemtap: function(view, index, target, record) {
                        var panel = Ext.create('Chihiro.view.message.other.' + record.get('func'), {
                            title: record.get('text')
                        });
                        this.parent.push(panel);
                        invitationList = [];
                        socket.emit('get topic list',function(obj) {
                            var grouplist = obj;
                            Ext.getCmp('SimpleGroupList').setData(grouplist);
                        });
                    }
                }
            }
        ]
    }
});