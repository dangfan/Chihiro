Ext.define('Chihiro.view.message.GroupContent', {
    extend: 'Ext.DataView',
    xtype: 'groupcontent',
    id:'GroupChattingContent',

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