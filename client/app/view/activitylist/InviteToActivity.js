Ext.define('Chihiro.view.activitylist.InviteToActivity', {
    extend: 'Ext.Panel',
    xtype:'invitecandidatelist'})
/*
    config: {
        items: [{
            width: 400,
            height: 400,
            xtype: 'list',
            allowDeselect:false,
            mode:'MULTI',
            id: 'InviteCandidateList',
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
                        text: '发送邀请',
                        ui: 'confirm',
                        width: '40%',
                        action: 'InviteOneFriendToGroups'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});*/