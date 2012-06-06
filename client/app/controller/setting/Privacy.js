Ext.define('Chihiro.controller.setting.Privacy',{
    extend: 'Ext.app.Controller',

    config: {
        control:{
            'button[action=privacyOptionalConfirm]':{
                tap: 'confirm'
            }
        }
    },

    confirm: function(){
        console.log(Ext.getCmp('friendverify').getValue());
        if(Ext.getCmp('friendverify').getValue())
            profile.requireConfirm = '1';
        else
            profile.requireConfirm = '0';
        console.log(profile.requireConfirm);
        socket.emit('hide in nearest', Ext.getCmp('geoVisible').getValue());
        socket.emit('require friend confirm', profile.requireConfirm);
        profile.privacy = Ext.getCmp('geoVisible').getValue();
        Ext.Msg.alert("保存成功");
    }
})