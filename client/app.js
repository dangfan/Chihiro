var socket = io.connect('http://ec2-23-20-135-217.compute-1.amazonaws.com:8000');

Ext.Loader.setConfig({
    enabled : true
});
Ext.application({
    name: 'Chihiro',
    views:['Main','SignUp','Sign'],
    controllers:['Sign','SignUp'],
    launch: function() {
        Chihiro.view.Sign.signInView = Ext.create('Chihiro.view.Main');
    }
});
