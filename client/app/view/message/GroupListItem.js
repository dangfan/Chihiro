Ext.define('Chihiro.view.message.GroupListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'grouplistitem',
    requires: ['Ext.Img'],

    config: {
        height:100,
        dataMap: {
            getName: {
                setHtml: 'nickname'
            },

            getStatus: {
                setHtml: 'lastmsg'
            },

            getAvatar: {
                setSrc: 'portrait'
            },

            getUnread: {
                setHtml: 'lasttime'
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

        unread: {
            docked: 'right'
            // hidden: (Ext.os.deviceType === 'Phone') ? true : false
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
        return Ext.factory(config, Ext.Img, this.getAvatar());
    },

    updateAvatar: function(newAvatar) {
        if (newAvatar) {
            this.add(newAvatar);
        }
    },

    applyUnread: function(config) {
        return Ext.factory(config, Ext.Component, this.getUnread());
    },

    updateUnread: function(newUnread) {
        if (newUnread) {
            this.add(newUnread);
        }
    }
});