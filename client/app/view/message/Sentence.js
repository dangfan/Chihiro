Ext.define('Chihiro.view.message.Sentence', {
    extend: 'Ext.Container',
    xtype: 'sentence',
    requires: ['Ext.XTemplate'],

    config: {

        tpl: Ext.create('Ext.XTemplate',
            '<tpl if="xindex % 2 === 0">',
            '<br/>',
            '<p style="font-size: 12px" align="middle">{time}<br /></p>',
            '<p class="triangle-right left"><span class="nickname">{nickname}:</span> {message}</p>',
            '</tpl>',
            '<tpl if="xindex % 2 === 1">',
            '<br/>',
            '<p style="font-size: 12px" align="middle">{time}<br /></p>',
            '<p class="triangle-right right"><span class="nickname">{nickname}:</span> {message}</p>',
            '</tpl>'
        )
    }
});