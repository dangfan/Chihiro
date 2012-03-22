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
        socket.emit('login', { username: 'k@k', password: '123'}, function (msg) {
            console.log(msg);
            socket.emit('send friend request', '4f69cf302d77928810000001');
        });
    }
});