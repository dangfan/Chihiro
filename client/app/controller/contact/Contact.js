Ext.define('Chihiro.controller.contact.Contact',{
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            userlist: '#realuserlist',
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
            Ext.create('Chihiro.view.userlist.List');
            //Ext.getCmp('realuserlist').setData(friendlist);
            Ext.getCmp('contactnavigationview').push(Ext.getCmp('realuserlist'));
        }
        else{
            Ext.getCmp('contactnavigationview').pop();
        }
    }
});