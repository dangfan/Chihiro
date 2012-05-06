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
//            if(!Ext.getCmp('friendlist')){
//                Ext.create('Chihiro.view.userlist.List',{
//                    id: 'friendlist'
//                });
//                Ext.getCmp('friendlist').setData(friendList);
//                Ext.getCmp('contactnavigationview').add(Ext.getCmp('friendlist'));
//                //console.log(friendList);
//            }
            Ext.getCmp('friendlist').setData([]);
            var store = Ext.getCmp('friendlist').getStore();
            store.load();
            Ext.getCmp('friendlist').setData(friendList);
        }
    }
});