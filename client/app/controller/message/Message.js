Ext.define('Chihiro.controller.message.Message', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            chatlist: 'chatlist',
            carousel: '#messagepanel',
            button:'#chatgroup'
        },
        control: {
            carousel: {
                activeitemchange: 'activeItemChange'
            },
            button:{
                toggle:'toggle'
            }
        }
    },

    activeItemChange: function( a,value, oldValue, eOpts ) {
        var currentTitle = value.title;
        var button = this.getButton();
        var items = button.innerItems;

        items[0].removeCls('x-button-pressed');
        items[1].removeCls('x-button-pressed');
        items[2].removeCls('x-button-pressed');
        if(currentTitle === '好友'){
            items[0].addCls('x-button-pressed');
        };
        if(currentTitle === '群组'){
            items[1].addCls('x-button-pressed');
        };
        if(currentTitle === '讨论组'){
            items[2].addCls('x-button-pressed');
        };
    },

    toggle:function(a,b,c,d){
        var title = b.getText();
        //console.log(title);
        var carou = this.getCarousel();
        var index = carou.getActiveIndex();

        if(title === '群组'&& index === 0 )
            carou.next();

        if(title === '讨论组'&& index === 1)
            carou.next();

        if(title === '讨论组'&& index === 0)
        {
            carou.next();
            carou.next();
        };

        if(title === '群组'&& index === 2 )
            carou.previous();

        if(title === '好友'&& index === 1)
            carou.previous();

        if(title === '好友'&& index === 2)
        {
            carou.previous();
            carou.previous();
        };

    }
});
