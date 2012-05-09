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

            Ext.getCmp('SimpleFriendList').setData([]);
            var store = Ext.getCmp('SimpleFriendList').getStore();
            store.load();

            var grouplist;
            socket.emit('get topic list',function(obj) {
                Ext.getCmp('SimpleFriendList').setData(obj);
            });

//            var mycontact = [];
//
//            if(friendList){
//                for(i=0; i < friendList.length;i++){
//                    mycontact.push(friendList[i]);
//                }
//            }

            Ext.getCmp('SimpleFriendList').setData(friendList);

        }

        if(Ext.getCmp('floatingPanel'))
        {
            if(!Ext.getCmp('floatingPanel').isHidden())
                Ext.getCmp('floatingPanel').hide();
        }
    }
});