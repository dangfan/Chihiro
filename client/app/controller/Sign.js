/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-24
 * Time: 下午11:50
 * To change this template use File | Settings | File Templates.
 */
var signUpView, signInView;
Ext.define('Chihiro.controller.Sign',{
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'button[action=gotoSignUp]': {
                tap: 'showSignUp'
            }
        }
    },
    showSignUp: function() {
        signUpView = Ext.create('Chihiro.view.SignUp');
        Ext.Viewport.setActiveItem(signUpView);
    },
    launch: function() {
        signInView = Ext.create('Chihiro.view.Sign')
        Ext.Viewport.add(signInView);
        console.log('im here');

        var socket = io.connect('http://localhost:8000');
        socket.emit('login', { username: 'k@k', password: '123'}, function (msg) {
            console.log(msg);
            socket.emit('send friend request', '4f69cf302d77928810000001');
        });
    }
});