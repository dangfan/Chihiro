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
        if(data.newpassword == '') {
            alert('密码不得为空！');
            return;
        }
        else if(data.newpassword != data.repeatpassword) {
            alert('两次密码输入不一致！');
            return;
        }
        else {
            var newdata = {};
            newdata.password = data.newpassword;
            socket.emit('update profile', newdata, function(msg) {
                if(msg.err == 0) alert('密码修改成功！');
            });
        }
    }
});
