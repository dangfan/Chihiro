Ext.define('Chihiro.view.activity.DetailActivityInfo',{
    extend: 'Ext.form.Panel',
    xtype: 'detailactivityinfo',

    config:{
        title: '详细信息',
        items:[
            {
                xtype: 'field'
            },
            {
                xtype:'panel',
                layout:'hbox',
                defaults:{
                    xtype:'button',
                    flex:1,
                    width:'40%'
                },
                items:[
                    {
                        text:'确定',
                        ui:'confirm',
                        left:'10%',
                        enabled:false,
                        action: 'createConfirm'
                    }
                ]
            }
        ]
    }
})