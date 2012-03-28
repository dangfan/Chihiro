/**
 * Created by JetBrains WebStorm.
 * User: jayxh
 * Date: 12-3-28
 * Time: 下午5:12
 * To change this template use File | Settings | File Templates.
*/
Ext.define('Chihiro.controller.UserList', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            userList: 'userlist',
            searchField: 'searchfield',
            refreshButton: 'button[iconCls=refresh]'
        },

        control: {
            'userlist': {
                select: 'onListTap'
            },
            'detail': {
                hideanimationstart: 'onDetailHideAnimationStart'
            },
            'searchfield': {
                action: 'onSearch'
            }
        }
    },

    init: function() {
//        Ext.getStore('Loans').on({
//            scope: this,
//
//            beforeload: this.onBeforeStoreLoad,
//            load: this.onStoreLoad
//        });
    },

    onListTap: function(list, user) {
        console.log(list);
        console.log(user);
        if (!this.view) {
            this.view = Ext.create('Chihiro.view.Detail');
        }

        var view = this.view;
        view.setUser(user);

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        view.show();
    },

    onSearch: function(field) {
        this.doFilter({
            q: field.getValue()
        });
    },

    onDetailHideAnimationStart: function() {
        this.getUserList().deselectAll();
    }

//    onRefreshButtonTap: function() {
//        var store = Ext.getStore('Loans'),
//            hasValue = Boolean(this.getSearchField().getValue().length);
//
//        if (!hasValue) {
//            store.clearFilter();
//        }
//
//        store.load();
//    },
//
//    onBeforeStoreLoad: function() {
//        this.getRefreshButton().setDisabled(true);
//    },
//
//    onStoreLoad: function() {
//        this.getRefreshButton().setDisabled(false);
//    },
//
//    /**
//     * @private
//     * Listener for the 'filter' event fired by the listView set up in the 'list' action. This simply
//     * gets the form values that the user wants to filter on and tells the Store to filter using them.
//     */
//    doFilter: function(values) {
//        var store = Ext.getStore('Loans'),
//            filters = [];
//
//        Ext.iterate(values, function(field, value) {
//            filters.push({
//                property: field,
//                value   : value
//            });
//        });
//
//        store.clearFilter();
//        store.filter(filters);
//        store.load();
//    }
});
