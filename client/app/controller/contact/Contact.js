Ext.define('Chihiro.controller.contact.Contact',{
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            homeView: '#homeView'
        },
        control:
        {
            homeView: {
                activeitemchange: 'showfriendlist'
            }
        }
    },
    showfriendlist: function(){
        if(Ext.getCmp('homeView').getActiveItem().title=='通讯录'){

            Ext.getCmp('friendlist').setData([]);
            var store = Ext.getCmp('friendlist').getStore();
            store.load();
            Ext.getCmp('friendlist').setData(friendList);
        }

        if(Ext.getCmp('floatingPanel'))
        {
            if(!Ext.getCmp('floatingPanel').isHidden())
                Ext.getCmp('floatingPanel').hide();
        }
    }
});