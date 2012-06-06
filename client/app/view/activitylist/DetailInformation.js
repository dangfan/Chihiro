Ext.define('Chihiro.view.activitylist.DetailInformation', {
    extend:  'Ext.navigation.View',
    xtype: 'detailinformation',

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
                        { text: '邀请好友', sort: '   ',func: 'InviteToActivity' }

                    ]
                },
                itemTpl: '<div class="contact"><strong>{text}</strong></div>',

                onItemDisclosure: function(record, btn, index) {
                    Ext.Msg.alert('Tap', 'Disclose more info for ' + record.get('firstName'), Ext.emptyFn);
                },

                listeners: {
                    itemtap: function(view, index, target, record) {
                        invitationListForActivity = [];
                        console.log(record.get('func'));
                        this.parent.push(Ext.create('Chihiro.view.activitylist.' + record.get('func'), {
                            title: record.get('text')
                        }));
                        var store = Ext.getCmp('invitecandidatelist').getStore();
                        store.load();
                        Ext.getCmp('invitecandidatelist').setData(friendList);
                    }
                }
            }
        ]
    }
});