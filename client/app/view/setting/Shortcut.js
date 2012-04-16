Ext.define('Chihiro.view.setting.Shortcut', {
    extend:'Ext.form.Panel',

    config:{
        title:'头像与签名',
        items:[
            {
                xtype:'panel',
                layout: 'hbox',
                items: [
                    {
                        xtype: 'image',
                        height:100,
                        width:100,
                        src: 'http://kiva.org/img/w80h80/1053361.jpg'
                    },
                    {
                        xtype: 'spacer'
                    },
                    {
                        xtype: 'button',
                        height:40,
                        width:150,
                        docked:'right',
                        margin:'50 20 20 40',
                        text:'上传头像'
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
                        text: '保存修改',
                        ui: 'confirm',
                        width: '40%'
                        //action:'requiredConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }
        ]
    }
});