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
            getSponsor: {
                setHtml: 'sponsor'
            }
        },

        cls: Ext.baseCSSPrefix + 'list-item',

        name: {
            cls: 'name'
        },

        sponsor: {
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
    applySponsor:function(config){
        return Ext.factory(config, Ext.Component, this.getSponsor());
    },
    updateSponsor:function(newSponsor){
        if(newSponsor){
            this.add(newSponsor);
        }
    }
    /*applyStatus: function(config) {
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
    },*/
});