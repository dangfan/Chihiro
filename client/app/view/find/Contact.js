Ext.define('Chihiro.view.find.Contact', {
    extend:'Ext.Panel',

    config:{
        items:[
            {
                xtype: 'toolbar',
                docked: 'top',

                items: [
                    { xtype: 'spacer' },
                    {
                        xtype: 'searchfield',
                        placeHolder: '搜索...'
                    },
                    { xtype: 'spacer' }
                ]
            }
        ]
    }
});