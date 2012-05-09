var profile;
Ext.define('Chihiro.controller.SignIn', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            loginView: '#loginView',
            signinBtn: '#signinBtn',
            gotoSignUpViewBtn: '#gotoSignUpViewBtn'
        },
        control: {
            signinBtn: {
                tap: 'doSignin'
            },
            gotoSignUpViewBtn: {
                tap: 'doGotoSignUpView'
            },
            loginView: {
                show: 'resetView'
            }
        }
    },
    resetView: function() {
        Ext.getCmp('homeView').setActiveItem(0);
        var items = Ext.getCmp('homeView').getItems().items;
        //console.log(items.items);
//        for(var i = 0; i < items.length; i++) {
//            console.log(items[i].getXTypes());
//        };
        //console.log(Ext.getCmp('homeView'));
        //Ext.create('Chihiro.view.Home');
        //Ext.Viewport.setActiveItem(Ext.getCmp('loginView'));
    },
    doSignin: function() {
        var val = this.getLoginView().getValues();
        if (val.username == "") {
            Ext.Msg.alert('提示', '请输入用户名');
            return;
        }
        if (val.password == "") {
            Ext.Msg.alert('提示', '请输入密码');
            return;
        }
        socket.emit('login', val, function (msg) {
            if (msg.err) {
                Ext.Msg.alert('登录失败',msg.msg);
            } else {
                window.localStorage.setItem('sid', msg.sid);
                successLogin(msg.obj);
            }
        })
    },

    doGotoSignUpView: function() {
        Ext.Viewport.setActiveItem(Ext.getCmp('requiredinfoView'));
    },

    launch: function() {
        var sid = window.localStorage.getItem('sid');
        if (sid) {
            socket.emit('init', sid, function(msg) {
                if (!msg.err) {
                    successLogin(msg.obj);
                }
            });
        }
    }
});
function successLogin(obj){
    profile = obj;
    if(profile.birthday && profile.birthday != 'null') profile.birthday = new Date(profile.birthday);
    if(profile.interests && profile.interests != 'null') {
        var interest = profile.interests;
        var interestStr = '';
        for(var i in interest) {
            if(interest[i] == '"' || interest[i] == '[' || interest[i] == ']') continue;
            else if(interest[i] == ',') interestStr += ' ';
            else interestStr += interest[i];
        }
        console.log(interestStr);
        profile.interests = interestStr;
    }
    sname = obj.nickname;
    friendList = obj.friends;
    updateProfile();
    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
};

function updateProfile () {
    var imagesrc = (profile.portrait) ? profile.portrait : '/portraits/default.png';
    //var imagesrc = urlprefix + '/portraits/default.png';
    imagesrc = urlprefix + imagesrc;
    Ext.getCmp('MyImage').setSrc(imagesrc);
    Ext.getCmp('MyImage').setWidth(50);
    Ext.getCmp('MyImage').setHeight(50);
    Ext.getCmp('MyInfoPanel').setHtml('<span class="nickname"><b>'+profile.nickname+'</b></span><br />' +
        '<p style="font-size: 12px"><b>'+profile.signiture+'</b></p>');
}