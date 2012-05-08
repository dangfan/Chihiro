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
//            socket.emit('find closest', function(list) {
//                Ext.getCmp('SimpleFriendList').setData(list);
//                console.log(list);
//            });
            Ext.getCmp('SimpleFriendList').setData(
                [
                    {nickname: '党凡',type:'1'},
                    {nickname: '钱堃',type:'1'},
                    {nickname:'丁鹏',type:'1'},
                    {nickname:'丁鹏2',type:'1'},
                    {nickname:'党主席基友团',type:'2'},
                    {nickname:'党主席护卫军',type:'2'}
                ]
            );


            //Ext.getCmp('SimpleFriendList').setData(friendList);
        }

        if(Ext.getCmp('floatingPanel'))
        {
            if(!Ext.getCmp('floatingPanel').isHidden())
                Ext.getCmp('floatingPanel').hide();
        }
    }
});