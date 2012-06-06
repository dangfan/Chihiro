Ext.define('Chihiro.view.activitylist.ListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'activitylistitem',
    //requires: ['Ext.Img'],

    config: {
        height:100,
        dataMap: {
            getName: {
                setHtml: 'name'
            },
            getDis: {
                setHtml: 'dis'
            },
            getType: {
                setSrc: 'type',
                layout:{
                    type: 'card'
                }
            },
            getLocation: {
                setHtml: 'location'
            }
        },

        cls: Ext.baseCSSPrefix + 'list-item',
        name: {
            cls: 'name'
        },

        type: {
            docked: 'left'
        },
        dis: {
            docked: 'right'
        },

        location: {
            cls: 'use'
        },

        layout: {
            type: 'vbox',
            pack: 'center'
        }
    },

    applyName: function(config) {
        return Ext.factory(config, Ext.Component, this.getName());
    },

    updateName: function(newName) {
        if (newName) {
            this.add(newName);
        }
    },
    applyDis:function(config){
        return Ext.factory(config, Ext.Component, this.getDis());
    },
    updateDis:function(newDis){
        if(newDis){
            this.add(newDis);
        }
    },
    applyType: function(config){
        return Ext.factory(config, Ext.Img, this.getType());
    },
    updateType: function(newType){
        if(newType){
            this.add(newType);
        }
    },
    applyLocation: function(config){
        return Ext.factory(config, Ext.Component, this.getLocation());
    },
    updateLocation: function(newLocation){
        if(newLocation){
            this.add(newLocation);
        }
    }
});