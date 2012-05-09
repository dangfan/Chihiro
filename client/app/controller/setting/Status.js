/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-5-9
 * Time: 下午3:10
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Chihiro.controller.setting.Status', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fieldpanel: '#statusSetting'
        },
        control: {
            'button[action=updateStatus]': {
                tap: 'updateStatus'
            },
            fieldpanel: {
                show: 'initpanel'
            }
        }
    },
    initpanel: function(panel) {

    },
    updateStatus: function() {
        var panel = this.getFieldpanel();
        var data = panel.getValues();
        var interests = data.interests.split(' ');
        data.interests = interests;
        console.log(data);
        socket.emit('update profile', data, function(msg) {
            alert(msg.msg);
            if(!msg.err) {
                for(t in data) profile[t] = data[t];
                updateProfile();
            }
            console.log(profile);
        })
    }
});
