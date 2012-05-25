Ext.define('Chihiro.view.message.Groups', {
    extend: 'Ext.Panel',
    xtype: 'groups',

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
                        id:'GroupImage',
                        //src: 'http://kiva.org/img/w80h80/1053367.jpg',
                        marginTop:5,
                        marginLeft:15,
                        height:60,
                        width:60
                    },
                    {
                        xtype:'panel',
                        id:'groupInfoPanel',
                        padding:8
                        //html:'<span class="nickname"><b>{nickname}</b></span><br /><p style="font-size: 12px"><b>{lastmsg}</b></p>'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        iconMask: true,
                        ui: 'plain',
                        iconCls: 'delete',
                        id: 'groupDeleteButton'
                    }
                ]
            },
            {
                xtype: 'groupcontent'
            },
            {
                xtype: 'toolbar',
                docked: 'bottom',
                itemId: 'groupMsgToolbar',
                items: [
                    {
                        iconMask: true,
                        ui: 'plain',
                        iconCls: 'add',
                        width:'8%'
                    },
                    {
                        xtype: 'textfield',
                        width: '76%',
                        id:'GroupMessageTextField'
                    },
                    {
                        iconMask: true,
                        id:'groupMsgSendButton',
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
    },

    updateUser: function(newUser) {
        var carousel = this.down('toolbar'),  information = this.down('image');
        information.setData(newUser.data);
    }
});