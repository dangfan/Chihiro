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
    console.log(Ext.getCmp('homeView').getActiveItem());
    var imagesrc = (profile.portrait) ? profile.portrait : 'resources/icons/徐涵.png';
    //var imagesrc = urlprefix + '/portraits/default.png';
    profile.portrait = imagesrc;
    if(profile.birthday && profile.birthday != 'null') profile.birthday = new Date(profile.birthday);
    if(profile.interests && profile.interests != 'null') {
        var interest = profile.interests;
        var interestStr = '';
        for(var i in interest) {
            if(interest[i] == '"' || interest[i] == '[' || interest[i] == ']') continue;
            else if(interest[i] == ',') interestStr += ' ';
            else interestStr += interest[i];
        }
        profile.interests = interestStr;
    }
    sid = obj._id;
    sname = obj.nickname;
    friendList = obj.friends;
    updateProfile();
    if(friendList){
        console.log(friendList);
        for(var i = 0; i < friendList.length;i++)
        {
            if(friendList[i].nickname === '徐涵')
                friendList[i].portrait = 'resources/icons/徐涵.png';
            if(friendList[i].nickname === '丁鹏')
                friendList[i].portrait = 'resources/icons/丁鹏.png';
            if(friendList[i].nickname === '党凡')
                friendList[i].portrait = 'resources/icons/党凡.png';
            if(friendList[i].nickname === '钱堃')
                friendList[i].portrait = 'resources/icons/钱堃.png';
            if(friendList[i].nickname === '蔡梦琳')
                friendList[i].portrait = 'resources/icons/蔡梦琳.png';
            if(friendList[i].lastmsg){
                var msg = friendList[i].lastmsg.split('|');
                friendList[i].lastmsg = msg[2];
                friendList[i].lasttime =msg[1];
            }
            else{
                friendList[i].lastmsg = '快开始你们的第一次聊天吧～';
                friendList[i].lasttime ='Never';
            }
        }
        Ext.getCmp('ChattingFriends').setData(friendList);

        socket.emit('get topic list',function(obj) {
            var grouplist = obj;
            for(var i = 0; i < grouplist.length;i++)
            {
                grouplist[i].lastmsg = '';
                grouplist[i].lasttime ='';
                grouplist[i].portrait = 'resources/icons/group.jpg';
            }

            Ext.getCmp('ChattingGroups').setData([]);
            var store = Ext.getCmp('ChattingGroups').getStore();
            store.load();
            Ext.getCmp('ChattingGroups').setData(obj);
        });
    }
    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
};

function updateProfile () {
    Ext.getCmp('MyImage').setSrc(profile.portrait);
    Ext.getCmp('MyImage').setWidth(50);
    Ext.getCmp('MyImage').setHeight(50);
    Ext.getCmp('MyInfoPanel').setHtml('<span class="nickname"><b>'+profile.nickname+'</b></span><br />' +
        '<p style="font-size: 12px"><b>'+profile.signiture+'</b></p>');
}
