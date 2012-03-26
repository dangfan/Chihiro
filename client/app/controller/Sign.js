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
    }
});