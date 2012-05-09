Ext.define('Chihiro.view.message.other.Canvas', {
    extend: 'Ext.Panel',
    xtype:'chattingCanvas',
    id:'chattingCanvas',

    config: {
        html: '<canvas id="the_stage" width="350" height="300" style="border: 1px solid #999;">您的浏览器不支持canvas!</canvas> ',
        left: 0,
        padding: 10
    }
});