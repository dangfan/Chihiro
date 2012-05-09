Ext.define('Chihiro.view.message.Friends', {
    extend: 'Ext.Panel',
    xtype: 'friends',
    id:'chattingfriendpanel',

    config: {
        modal: true,
        hideOnMaskTap : true,

        // we always want the sheet to be 400px wide and to be as tall as the device allows
        left:0,
        top: 0,
        bottom: 0,
        right: 0,

        user: null,

        layout: {
            type: 'fit'
        },

        items: [
            {
                xtype: 'toolbar',
                docked: 'top',
                height:60,
                items: [
                    {
                        xtype: 'image',
                        id:'FriendImage',
                        //src: 'http://kiva.org/img/w80h80/1053365.jpg',
                        marginTop:5,
                        marginLeft:15,
                        height:50,
                        width:50
                    },
                    {
                        xtype:'panel',
                        id:'friendInfoPanel',
                        padding:8
                        //html:'<span class="nickname"><b>党主席</b></span><br /><p style="font-size: 12px"><b>好基友一辈子</b></p>'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconMask: true,
                        ui: 'plain',
                        iconCls: 'delete',
                        id: 'deleteButton'
                    }
                ]
            },
            {
                xtype: 'content'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'msgToolbar',
                items: [
                    {
                        iconMask: true,
                        ui: 'plain',
                        id:'FriendCanvas',
                        iconCls: 'add',
                        width:'8%'
                    },
                    {
                        xtype: 'textfield',
                        width: '76%',
                        id:'MessageTextField'
                    },
                    {
                        iconMask: true,
                        id:'msgSendButton',
                        ui: 'plain',
                        iconCls: 'compose',
                        title:'Send',
                        cls:'card dark',
                        width:'10%'
                    }
                ]
            }
        ]
    },

    hide: function(animation) {
        var me = this;
        me.fireEvent('hideanimationstart', me);
        me.callParent();
    }
});