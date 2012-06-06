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
            '<img src= {type} width="120" height="120">',
            '<p class="overview">',
            '<strong>位置:</strong>{location}<br />',
            '<strong>日期:</strong>{date}<br />',
            '<strong>起始时间:</strong>{starttime}<br />',
            '<strong>结束时间:</strong>{endtime}<br />',
            '<strong>费用:</strong> {cost}<br />',
            '<strong>类型:</strong>{typeText}<br />',
            '<p >',
            '<strong>发起人:</strong>{sponsor}<br />',
            '<strong>详细介绍:</strong> {detail}<br />'
        )
    }
});