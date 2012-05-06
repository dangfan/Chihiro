Ext.define('Chihiro.controller.message.Other', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fieldset: '#groupset',
            invitebutton: '#InviteToGroupBtn'
        },
        control: {
            invitebutton: {
                tap: 'InviteToGroup'
            }
        }
    },

    InviteToGroup: function(view, index, target, record) {
        alert("Invitation is being sent");

        Ext.getCmp('groupset').add({
            xtype: 'checkboxfield',
            name: 'onlinereminder',
            label:'党主席基友团'
        });
    }

});
