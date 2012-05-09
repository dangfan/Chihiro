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
    sname = obj.nickname;
    friendList = obj.friends;
    var nickname = sname;
    var signiture = profile.signiture;
    Ext.getCmp('MyImage').setSrc('http://hdn.xnimg.cn/photos/hdn121/20120331/1930/tiny_GRdJ_60512g019117.jpg');
    Ext.getCmp('MyInfoPanel').setHtml('<span class="nickname"><b>'+nickname+'</b></span><br />' +
        '<p style="font-size: 12px"><b>'+signiture+'</b></p>');

    console.log(friendList);
    if(friendList){
        for(var i = 0; i < friendList.length;i++)
        {
            friendList[i].lastmsg = '呵呵';
            friendList[i].lasttime ='很久以前';
        }
        Ext.getCmp('ChattingFriends').setData(friendList);

        socket.emit('get topic list',function(obj) {
            var grouplist = obj;
            for(var i = 0; i < grouplist.length;i++)
            {
                grouplist[i].lastmsg = '求基友！';
                grouplist[i].lasttime ='刚刚';
                grouplist[i].portrait = 'http://hdn.xnimg.cn/photos/hdn221/20120331/0950/tiny_twM9_56111n019117.jpg';
            }

            Ext.getCmp('ChattingGroups').setData([]);
            var store = Ext.getCmp('ChattingGroups').getStore();
            store.load();
            Ext.getCmp('ChattingGroups').setData(obj);
            console.log(obj);
        });
    }

    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
};