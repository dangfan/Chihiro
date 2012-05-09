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
            }
        },

        cls: Ext.baseCSSPrefix + 'list-item',

        name: {
            cls: 'name'
        },

        dis: {
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
    applyDis:function(config){
        return Ext.factory(config, Ext.Component, this.getDis());
    },
    updateDis:function(newDis){
        if(newDis){
            this.add(newDis);
        }
    }
});