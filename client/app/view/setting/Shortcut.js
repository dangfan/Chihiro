Ext.define('Chihiro.view.setting.Shortcut', {
    extend:'Ext.form.Panel',

    config:{
        title:'上传头像',
        items:[
            {
                xtype:'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'image',
                        id: 'uploadPortrait',
                        height:100,
                        width:100,
                        src: (profile.portrait) ? profile.portrait : '/portraits/default.png'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        height:40,
                        docked:'right',
                        text:'上传头像',
                        action: 'getportrait'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            },
            {
                xtype:'panel',
                layout:'hbox',
                defaults:{
                    xtype:'button'
                },
                items:[
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: '确定修改',
                        ui: 'confirm',
                        width: '100%',
                        margin: '50 20 20 20',
                        action:'uploadportrait'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});