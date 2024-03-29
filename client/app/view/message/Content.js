Ext.define('Chihiro.view.message.Content', {
    extend: 'Ext.DataView',
    xtype: 'content',
    id:'ChattingContent',

    config: {
        store: {
            model: 'Chihiro.model.ChattingContent'
        },
        autoDestroy:true,
        scrollToTopOnRefresh:true,
        useComponents: true,
        defaultType: 'sentence'
    }
});