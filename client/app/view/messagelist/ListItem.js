Ext.define('Chihiro.view.messagelist.ListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'listitem',
    requires: ['Ext.Img'],

    config: {
        height:100,
        dataMap: {
            getName: {
                setHtml: 'nickname'
            },

            getStatus: {
                setHtml: 'signiture'
            },

            getAvatar: {
                setSrc: 'image'
            },

            getDistance: {
                setHtml: 'dis'
            }
        },

        cls: Ext.baseCSSPrefix + 'list-item',

        name: {
            cls: 'name'
        },

        status: {
            cls: 'use'
        },

        avatar: {
            docked: 'left'
        },

        distance: {
            docked: 'right'
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

    applyStatus: function(config) {
        return Ext.factory(config, Ext.Component, this.getStatus());
    },

    updateStatus: function(newStatus) {
        if (newStatus) {
            this.add(newStatus);
        }
    },

    applyAvatar: function(config) {
        console.log(this.getAvatar());
        return Ext.factory(config, Ext.Img, this.getAvatar());
    },

    updateAvatar: function(newAvatar) {
        if (newAvatar) {
            this.add(newAvatar);
        }
    },

    applyDistance: function(config) {
        return Ext.factory(config, Ext.Component, this.getDistance());
    },

    updateDistance: function(newDistance) {
        if (newDistance) {
            this.add(newDistance);
        }
    }
});