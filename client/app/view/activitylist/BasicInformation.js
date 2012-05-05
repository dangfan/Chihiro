Ext.define('Chihiro.view.activitylist.BasicInformation', {
    extend: 'Ext.Container',
    xtype: 'basicinformation',
    requires: ['Ext.XTemplate'],

    config: {
        cls: 'detail-card',
        styleHtmlContent: true,
        scrollable: {
            direction: 'vertical',
            directionLock: true
        },

        tpl: Ext.create('Ext.XTemplate',
            '<h1>{name}</h1>',
            '<img src="http://hdn.xnimg.cn/photos/hdn421/20100403/2025/large_fdEG_41708n019118.jpg" width="120" height="160">',
            '<p class="overview">',
            '<strong>编号:</strong> {id}<br />',
            '<strong>时间:</strong> {time}<br />',
            '<strong>位置:</strong>{location}<br />',
            '<strong>费用:</strong> {cost}<br />',
            '<strong>类型:</strong>{type}<br />',
            '<p >',
            '<strong>发起人:</strong>{sponsor}<br />'
        )
    }
});