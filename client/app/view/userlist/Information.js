Ext.define('Chihiro.view.userlist.Information', {
    extend: 'Ext.Container',
    xtype: 'detailInformation',
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
            //'<img src={portrait} width="120" height="160">',
            '<img src="http://hdn.xnimg.cn/photos/hdn421/20100403/2025/large_fdEG_41708n019118.jpg" width="120" height="160">',
            //'<h2><tpl if="location.town">{location.town}, </tpl>{location.country}</h2>',
            //'<h2><tpl if="location.town">清华大学, </tpl>北京</h2>',
            '<p class="overview">',
            '<strong>性别:</strong> {gender}<br />',
            '<strong>生日:</strong> {birthday}<br />',
            '<strong>签名:</strong>{signiture}<br />',
            '<strong>学校:</strong> {school}<br />',
            '</p>',
            '<p><strong>兴趣爱好</strong><br />{interest}</p>'
            // {compiled: true}
        )
    }
});