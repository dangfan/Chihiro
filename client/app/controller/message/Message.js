Ext.define('Chihiro.controller.message.Message', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            chatlist: 'chatlist',
            carousel: '#messagepanel',
            button:'#chatgroup',
            icon:'#ChatHelper',
            floatingbutton:'#floatingButton'
        },
        control: {
            carousel: {
                activeitemchange: 'activeItemChange'
            },
            button:{
                toggle:'toggle'
            },
            icon:{
                tap:'ChatHelperOptions'
            },
            floatingbutton:{
                toggle:'HelperHander'
            }
        }
    },

    activeItemChange: function( a,value, oldValue, eOpts ) {
        var currentTitle = value.title;
        var button = this.getButton();
        var items = button.innerItems;

        items[0].removeCls('x-button-pressed');
        items[1].removeCls('x-button-pressed');
        if(currentTitle === '好友'){
            items[0].addCls('x-button-pressed');
        };
        if(currentTitle === '群组'){
            items[1].addCls('x-button-pressed');
        };
        if(Ext.getCmp('floatingPanel'))
        {
            if(!Ext.getCmp('floatingPanel').isHidden())
                Ext.getCmp('floatingPanel').hide();
        }
    },

    toggle:function(a,b,c,d){
        var title = b.getText();
        var carou = this.getCarousel();
        var index = carou.getActiveIndex();

        if(title === '群组'&& index === 0 )
            carou.next();

        if(title === '好友'&& index === 1)
            carou.previous();
    },

    ChatHelperOptions:function(view, index, target, record) {

        var carou = this.getCarousel();
        var index = carou.getActiveIndex();

        if(Ext.getCmp('floatingPanel'))
        {
            if(!Ext.getCmp('floatingPanel').isHidden())
            {
                Ext.getCmp('floatingPanel').hide();
                return;
            }

            var carou = this.getCarousel();
            var index = carou.getActiveIndex();
            var button = Ext.getCmp('floatingPanel');

            if(index === 0)
            {
                Ext.getCmp('b2').show();
                Ext.getCmp('b3').hide();
            }
            if(index === 1)
            {
                Ext.getCmp('b2').hide();
                Ext.getCmp('b3').show();
            }
            Ext.getCmp('floatingPanel').show();
        }
        else{
            var tPanel = Ext.create('Ext.Panel', {
                id:'floatingPanel',
                left: 0,
                padding: 10,
                items:[
                    {
                        xtype: 'segmentedbutton',
                        allowDepress: false,
                        id:'floatingButton',
                        items: [
                            {
                                text: '刷新',
                                id:'b1'
                            },
                            {
                                text: '寻友',
                                id:'b2'
                            },
                            {
                                text:'创建群组',
                                id:'b3'
                            }
                        ]
                    }]
            }).showBy(Ext.getCmp('ChatHelper'));

            if(index === 0)
            {
                Ext.getCmp('b2').show();
                Ext.getCmp('b3').hide();
            }
            if(index === 1)
            {
                Ext.getCmp('b2').hide();
                Ext.getCmp('b3').show();
            }
        }

    },

    HelperHander:function(a,b,c,d){

        var title = b.getText();
        var carou = this.getCarousel();
        var index = carou.getActiveIndex();

        if(title === '刷新'&& index === 0 )
        {
            //var object = Ext.getCmp('ChattingFriends');
            //object.getStore().load();
            alert("等待聊天好友接口");
        }

        if(title === '刷新'&& index === 1 )
        {
            socket.emit('get topic list',function(obj) {
                console.log(obj);
                Ext.getCmp('ChattingGroups').setData([]);
                var store = Ext.getCmp('ChattingGroups').getStore();
                store.load();
                Ext.getCmp('ChattingGroups').setData(obj);
            });
        }

        if(title === '寻友'&& index === 0)
        {
            Ext.getCmp('homeView').setActiveItem(3);
        }

        if(title === '创建群组')
        {
            if(!Ext.getCmp('creategroup')){
                Ext.create('Chihiro.view.message.group.BasicGroupInfo',{
                    id: 'creategroup'
                });
            }

            Ext.Viewport.setActiveItem(Ext.getCmp('creategroup'));
        }

        if(!Ext.getCmp('floatingPanel').isHidden())
        {
            Ext.getCmp('floatingPanel').hide();
        }
    }

});
