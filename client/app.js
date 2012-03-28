var socket = io.connect('http://localhost:8000');
// var socket = io.connect('http://ec2-23-20-135-217.compute-1.amazonaws.com:8000');
var mainView;
Ext.Loader.setConfig({
    enabled : true
});
Ext.application({
    name: 'Chihiro',
    views:['Main','Home','SignUp','Sign'],
    controllers:['Sign','SignUp'],
    launch: function() {
        //window.localStorage.removeItem('sid');
        //for showing the Signup
        if(window.localStorage.getItem('sid') != null)
        {
            mainView = Ext.create('Chihiro.view.Main', {
                items:[
                    { xclass: 'Chihiro.view.Home'}
                ]
            });
        }
        else mainView = Ext.create('Chihiro.view.Main', {
            items:[
                { xclass: 'Chihiro.view.Sign'}
            ]
        });
    }
});
