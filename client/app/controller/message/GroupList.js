Ext.define('Chihiro.controller.message.GroupList', {
    extend: 'Ext.app.Controller',

    config: {
        profile: Ext.os.deviceType.toLowerCase(),

        refs: {
            groupList:'grouplist',
            groupinfopanle:'#groupInfoPanel'
        },

        control: {
            'grouplist':{
                select: 'onGroupListTap'
            }
        }
    },

    init: function() {

    },

    launch: function(){

    },

    onGroupListTap: function(list, user) {
        chattingID = user.data.id;

        if (!this.view) {
            this.view = Ext.create('Chihiro.view.message.Groups');
        }

        var me = Ext.getCmp('GroupChattingContent');
        var store = me.getStore();
        store.load();

        var time = getCurrentTime();
//        Ext.getCmp('GroupChattingContent').setData([
//            {
//                id: "407788",
//                nickname:"程序猿",
//                xindex:'1',
//                message:'Hello!这是群组聊天的测试消息!',
//                time:time
//            }]);

        var view = this.view;
        view.setUser(user);
        Ext.getCmp('GroupImage').setSrc(user.data.portrait);
        var a = user.data.nickname;
        var b = user.data.intro;
        Ext.getCmp('groupInfoPanel').setHtml('<span class="nickname"><b>'+a+'</b></span><br />' +
            '<p style="font-size: 12px"><b>'+b+'</b></p>');

        if (this.getProfile() == "phone") {
            view.setWidth(null);
            view.setHeight('85%');
            view.setTop(null);
            view.setLeft(0);
        }

        if (!view.getParent()) {
            Ext.Viewport.add(view);
        }

        chatobject = 'group';
        view.show();
    },

    onFriendsHideAnimationStart: function() {
        this.getGroupList().deselectAll();
        chattingID = '0';
    }
});
