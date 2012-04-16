
Ext.define('Chihiro.view.message.ChatList', {
    extend: 'Ext.DataView',
    xtype: 'chatlist',

    config: {
        store: {
            fields: ['signiture','id','image','nickname','unread'],
            data: [
                {
                    id: "407788",
                    image:'http://kiva.org/img/w80h80/1053365.jpg',
                    nickname:"党熊",
                    signiture: "我想找1个人一起自习",
                    unread:"5"
                },
                {
                    id: "407789",
                    image:'http://kiva.org/img/w80h80/1053361.jpg',
                    nickname:"我叫党主席",
                    signiture: "我想找2个人一起自习",
                    unread:"3"
                }
            ]
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'chatlistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有人与您聊天哟</div>',
        deselectOnContainerClick: false
    }
});