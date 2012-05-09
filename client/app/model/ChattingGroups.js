Ext.define('Chihiro.model.ChattingGroups', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'id', 'title', 'intro', 'lastmsg', 'portrait','lasttime','signiture','members'],
        data: [
            {
                id: "407788",
                portrait:'http://t1.baidu.com/it/u=346490350,581908109&fm=0&gp=0.jpg',
                name:"党主席基友团",
                lastmsg:"今晚有课怎么办……",
                intro: "今晚十点，基友团第一次大作战",
                lasttime:"15:15"
            },
            {
                id: "407789",
                portrait:"http://t1.baidu.com/it/u=346490350,581908109&fm=0&gp=0.jpg",
                name:"我们是党主席护卫军",
                intro: "不能让党主席被女人们抢去！",
                lastmsg:"呵呵！",
                lasttime:"16:23"
            }
        ],
        proxy: {
            type: 'localstorage'
        }
    }
});