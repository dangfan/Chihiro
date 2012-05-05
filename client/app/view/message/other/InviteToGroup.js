Ext.define('Chihiro.view.message.other.InviteToGroup', {
    extend: 'Ext.form.Panel',
    xtype:'invitetogroup',

    requires: [
        'Ext.field.Select',
        'Ext.field.Spinner'
    ],

    config: {
        title: '邀请到群组',
        items: [{
            xtype: 'fieldset',
            id:'groupset',
            defaults: {
                labelWidth: '40%'
            },
            items: [
                {
                    xtype: 'checkboxfield',
                    name: 'onlinereminder',
                    label:'党主席基友团'
                },
                {
                    xtype: 'checkboxfield',
                    name: 'acceptable',
                    label:'我们是党主席护卫军'
                }
            ]
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
                        id:'InviteToGroupBtn'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }]
    }
});