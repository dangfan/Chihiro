Ext.define('Chihiro.view.message.other.InviteFriends', {
    extend: 'Ext.Panel',
    xtype:'invitationlist',

    config: {
        items: [{
            width: 400,
            height: 400,
            xtype: 'list',
            allowDeselect:false,
            mode:'MULTI',
            id: 'InvitationList',
            store:{
                fields: ['nickname','id'],
                sorters: 'nickname',
                grouper: function(record) {
                    return record.get('nickname')[0];
                },
                proxy: {
                    type: 'localstorage'
                }
            },
            itemTpl: '<div class="contact"><strong>{nickname}</strong> </div>',
            grouped: true
        },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    xtype: 'button'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: '邀请好友',
                        ui: 'confirm',
                        width: '40%',
                        action: 'InviteFriendsToOneGroup'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});