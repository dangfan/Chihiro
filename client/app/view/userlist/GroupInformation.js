Ext.define('Chihiro.view.userlist.GroupInformation', {
    extend: 'Ext.Container',
    xtype: 'groupDetailInformation',
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
            '<img src="https://webim.feixin.10086.cn/images/status32/fetion_32.jpg" width="60" height="60">',
            '<p class="overview">',
            '<strong>群公告:</strong> {intro}<br />',
            '<strong>创建者:</strong> 丁鹏<br />',
            '</p>',
            '<p><strong>群组成员</strong><br />钱堃，小钱堃，大钱堃</p>'
            // {compiled: true}
        )
    }
});