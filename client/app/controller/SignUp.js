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
            Ext.Msg.alert('请完整填写信息！');
        } else if (!val.email.match(/^[-_A-Za-z0-9]+@([_A-Za-z0-9]+.)+[A-Za-z0-9]{2,3}$/)) {
            Ext.Msg.alert('邮箱格式不正确');
        } else if (val.confirmPW != val.password) {
            Ext.Msg.alert('两次密码输入不同');
        } else {
            delete val.confirmPW;
            //console.log('hello');
            socket.emit('signup', val, function(msg) {
                //console.log('hello');
                console.log(msg);
                if (!msg.err) {
                    window.localStorage.setItem('sid', msg.msg);
                    Ext.Viewport.setActiveItem(Ext.getCmp('signupView'));
                } else Ext.Msg.alert(msg.msg);
            });
        }
    },

    toOptionalInfoView: function() {
        var interest = Ext.getCmp('interestinfoView').getValues().interest;
        interest = interest.split(' ');
        console.log(interest);
        socket.emit('update profile', {
            interests: [interest]
        });
        Ext.getCmp('signupView').push(Ext.getCmp('optionalinfoView'))
    },

    toHome: function() {
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },

    emitThenToHome: function() {
        var val = Ext.getCmp('optionalinfoView').getValues();
        socket.emit('update profile', val);
        this.toHome();
    }
});