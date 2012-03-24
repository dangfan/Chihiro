/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-24
 * Time: 下午11:52
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.controller.SignUp',{
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'button[action=backToSignIn]':{
                tap: 'showSignIn'
            }
        }
    },
    showSignIn: function() {
        Chihiro.view.Sign.signUpView = Ext.create('Chihiro.view.Sign');
        Ext.Viewport.setActiveItem(signInView);
    }
});