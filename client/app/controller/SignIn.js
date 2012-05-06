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
        console.log(items.items);
//        for(var i = 0; i < items.length; i++) {
//            console.log(items[i].getXTypes());
//        };
        console.log(Ext.getCmp('homeView'));
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
                friendList=msg.obj.friends;
				sname=msg.obj.nickname;
                //console.log(msg);
                //console.log(friendList);
                Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
                // TODO: save user object
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
                    friendList=msg.obj.friends;
                    //console.log(friendList);
                    //console.log(msg.obj);
					sname=msg.obj.nickname;
                    var nickname = msg.obj.nickname;
                    var signiture = msg.obj.signiture;
                    Ext.getCmp('MyImage').setSrc('http://hdn.xnimg.cn/photos/hdn121/20120331/1930/tiny_GRdJ_60512g019117.jpg');
                    Ext.getCmp('MyInfoPanel').setHtml('<span class="nickname"><b>'+nickname+'</b></span><br />' +
                        '<p style="font-size: 12px"><b>'+signiture+'</b></p>');

                    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
                }
            });
        }
    }
});