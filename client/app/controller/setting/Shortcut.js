/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-5-8
 * Time: 下午10:38
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Chihiro.controller.setting.Shortcut', {
    extend: 'Ext.app.Controller',
    config: {
        ref :{
            setPortrait: '#setPortrait'
        },
        control: {
            'button[action=getportrait]': {
                tap: 'getPortrait'
            },
            'button[action=uploadportrait]': {
                tap: 'uploadPortrait'
            }
        }
    },
    getPortrait: function() {
        if(!this.actions) {
            this.actions = Ext.Viewport.add({
                xtype: 'actionsheet',
                items:[
                    {
                        text: '从相册中选取',
                        scope: this,
                        handler: function(){
                            this.actions.hide();
                            getPicture(0,react );
                        }
                    },
                    {
                        text:'拍照上传',
                        scope: this,
                        handler: function(){
                            this.actions.hide();
                            getPicture(1,react);
                        }
                    },
                    {
                        text:'取消',
                        scope: this,
                        ui: 'decline',
                        handler: function(){
                            this.actions.hide()
                        }
                    }
                ]
            });
        }
        this.actions.show();
    },
    uploadPortrait: function() {
        alert('头像更改成功');
    }
});

function getPicture (choice, callback) {
    // Set the image source [library || camera]
    var src = (choice) ? Camera.PictureSourceType.CAMERA : Camera.PictureSourceType.PHOTOLIBRARY;
    // Aquire the image -> Phonegap API
    navigator.camera.getPicture(success, fail, {quality: 45, sourceType: src});
    function success(imageData) {
        socket.emit('update portrait'), function(msg) {
            if(!msg.err)
                callback({err: 0, src: urlprefix + msg.src});
        }
    }
    function fail(message) { callback({err: 1, msg:'获取照片失败' }) }
};

function react (msg) {
    if(msg.err) alert(msg.msg);
    else {
        Ext.getCmp('setPortrait').setSrc(msg.src);
    }
}

function ChooseShortcut(url)
{
    console.log(url);
    profile.portrait = url;
    socket.emit('update profile', {portrait: url}, function(msg) {
        if(msg.err == 0)
        {
            alert(msg.msg);
            updateProfile();
        }
        else alert(msg.msg);
    });

}