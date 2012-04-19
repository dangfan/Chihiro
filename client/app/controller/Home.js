Ext.define('Chihiro.controller.Home', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            homeView: '#homeView'
        },
        control: {
            homeView: {
                activate: 'listening'
            }
        }
    },

    listening: function() {
        this.locateGeo();
        socket.on('friend request', function(user) {
            alert("somebody add me!!");
            console.log(user);
        });
    },

    locateGeo: function() {
        Ext.create('Ext.util.Geolocation', {
            autoUpdate: true,
            frequency: 300000,
            listeners: {
                locationupdate: function(geo) {
                    socket.emit('update location', {
                        longitude: geo.getLongitude(),
                        latitude: geo.getLatitude()
                    });
                }
            }
        })
    }
});