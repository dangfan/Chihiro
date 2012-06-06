Ext.define('Chihiro.controller.SignUp',{
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'button[action=backToSignIn]':{
                tap: 'toSignIn'
            },
            'button[action=requiredConfirm]':{
                tap: 'toInterestInfoView'
            },
            'button[action=interestConfirm]':{
                tap: 'toOptionalInfoView'
            },
            'button[action=infoIgnore]':{
                tap: 'toHome'
            },
            'button[action=optionalConfirm]':{
                tap: 'emitThenToHome'
            }
        }
    },

    launch: function(){
        Ext.create('Chihiro.view.signup.RequiredInfo',{
            id: 'requiredinfoView'
        });
        Ext.create('Chihiro.view.signup.Main',{
            id: 'signupView'
        });
        Ext.create('Chihiro.view.signup.OptionalInfo',{
            id: 'optionalinfoView'
        })
    },

    toSignIn: function() {
        Ext.Viewport.setActiveItem(Ext.getCmp('loginView'));
    },

    toInterestInfoView: function() {
        var val = Ext.getCmp('requiredinfoView').getValues();
        if (val.email.length == 0 || val.password.length == 0 || val.phone.length == 0 || val.nickname.length == 0) {
            alert('请完整填写信息！');
        } else if (!val.email.match(/^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/)) {
            alert('邮箱格式不正确');
        } else if (val.confirmPW != val.password) {
            alert('两次密码输入不同');
        } else {
            delete val.confirmPW;
            console.log(val);
            socket.emit('signup', val, function(msg) {
                alert('oh');
                if (!msg.err) {
                    console.log(msg);
                    window.localStorage.setItem('sid', msg.sid);
                    profile = msg.obj;
                    Ext.Viewport.setActiveItem(Ext.getCmp('signupView'));
                } else alert(msg.msg);
            });
        }
    },

    toOptionalInfoView: function() {
        var interestStr = Ext.getCmp('interestinfoView').getValues().interest;
        var interest = interestStr.split(' ');
        socket.emit('update profile', {
            interests: interest
        });
        profile.interests = interestStr;
        console.log(profile);
        Ext.getCmp('signupView').push(Ext.getCmp('optionalinfoView'))
    },

    toHome: function() {
        locateGeo();
        updateProfile();
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },

    emitThenToHome: function() {
        var val = Ext.getCmp('optionalinfoView').getValues();
        socket.emit('update profile', val);
        console.log(val);
        for (var i in val) {
            profile[i] = val[i];
        }
        console.log(profile);
        this.toHome();
    }
});