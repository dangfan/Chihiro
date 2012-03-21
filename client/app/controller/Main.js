var signInView,signUpView;
Ext.define('Chihiro.controller.Main',{
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'button[action=gotoSignUp]': {
                tap: 'showSignUp'
            },
            'button[action=backToSignIn]':{
                tap: 'showSignIn'
            }
        }
    },
    showSignUp: function() {
        signUpView = Ext.create('Chihiro.view.SignUp');
        Ext.Viewport.setActiveItem(signUpView);
    },
    showSignIn: function() {
        signUpView = Ext.create('Chihiro.view.Sign');
        Ext.Viewport.setActiveItem(signInView);
    },
    launch: function() {
        signInView = Ext.create('Chihiro.view.Sign')
        Ext.Viewport.add(signInView);

        var socket = io.connect('http://localhost:8000');
        socket.emit('login', { username: "t@g", password: "123" }, function (msg) {
            console.log(msg);
            socket.emit('update profile', { interests: ['fg', 'fgd', 'kfgd'] });
        });
    }
});