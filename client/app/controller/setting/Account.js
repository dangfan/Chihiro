/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-5-6
 * Time: 下午4:27
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.controller.setting.Account', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fieldpanel: '#accountSetting'
        },
        control: {
            'button[action=updateAccount]': {
                tap: 'updateAccount'
            }
        }
    },
    updateAccount: function() {
        var panel = this.getFieldpanel();
        var data = panel.getValues();
        socket.emit('update profile', data, function(msg) {
            alert(msg.msg);
            if(!msg.err) {
                for(t in data) profile[t] = data[t];
            }
            console.log(profile);
        })
    }
});
