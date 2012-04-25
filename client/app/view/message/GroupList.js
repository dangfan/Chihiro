
Ext.define('Chihiro.view.message.GroupList', {
    extend: 'Ext.DataView',
    xtype: 'grouplist',

    config: {
        store: {
            fields: ['annoucement','id','image','name','unread'],
            data: [
                {
                    id: "407788",
                    image:'http://kiva.org/img/w80h80/1053365.jpg',
                    name:"党主席基友团",
                    announcement: "今晚十点，基友团第一次大作战",
                    unread:"5"
                },
                {
                    id: "407789",
                    image:'http://kiva.org/img/w80h80/1053361.jpg',
                    name:"我们是党主席护卫军",
                    announcement: "不能让党主席被女人们抢去！",
                    unread:"3"
                }
            ]
        },
        ui:'loans',
        useComponents: true,
        defaultType: 'grouplistitem',
        emptyText: '<div style="margin-top: 20px; text-align: center">没有人与您聊天哟</div>',
        deselectOnContainerClick: false
    }
});