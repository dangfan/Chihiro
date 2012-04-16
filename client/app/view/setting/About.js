Ext.define('Chihiro.view.setting.About', {
    extend:'Ext.form.Panel',

    config:{
        title:'关于千寻',
        layout: 'vbox',
        fullscreen:true,
        items: [
            {
                xtype: 'image',
                src: 'http://hdn.xnimg.cn/photos/hdn421/20100403/2025/large_fdEG_41708n019118.jpg',
                height:500,
                width:400,
                align:'middle'
            },
            {
                xtype: 'panel',
                html: '加入千寻，争当主席好基友！'
            }
        ]
    }
});