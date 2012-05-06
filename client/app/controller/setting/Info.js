/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-5-6
 * Time: 下午2:30
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Chihiro.controller.setting.Info', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            fieldpanel: '#infoSetting'
        },
        control: {
            'button[action=updateInfo]': {
                tap: 'updateInfo'
            }
        }
    },
    //TODO: birthday is not displaying
    updateInfo: function() {
        var panel = this.getFieldpanel();
        var data = panel.getValues();
        if(data.nickname == '') {
            alert("昵称不得为空！");
            return;
        }
        socket.emit('update profile', data, function(msg) {
            alert(msg.msg);
            if(!msg.err) {
                for(t in data) profile[t] = data[t];
            }
            console.log(profile);
        })
    }
});
