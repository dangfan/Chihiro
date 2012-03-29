/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-28
 * Time: 下午10:59
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.controller.Home',{
    extend: 'Ext.app.Controller',
    config: {
        control: {
            'homeView': {
                show: 'login'
            },
            //shouldn't be put here
            'nearbySearch':{
                show: 'findClosestPpl'
            }
        }
    },
    login: function(comp, obj){
        var geo = Ext.create('Ext.util.Geolocation', {
            autoUpdate: true,
            frequency: 30000,
            listeners: {
                locationupdate: function(geo) {
                    socket.emit('update location',{longitude: geo.getLongitude(), latitude: geo.getLatitude()});
                    console.log('i search!! see:'+ geo.getLongitude());
                },
                locationerror: function(geo, bTimeout, bPermissionDenied, bLocationUnavailable, message) {
                    if(bTimeout){
                        alert('Timeout occurred.');
                    } else {
                        alert('Error occurred.');
                    }
                }
            }
        });
        geo.updateLocation();
    },
    findClosestPpl: function(comp, obj){
        socket.emit('find closest', function(ppl){
            comp.setData(ppl);
            console.log(ppl);
        })
    }

});

