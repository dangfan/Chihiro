Ext.define('Chihiro.view.activity.DetailActivityInfo',{
    extend: 'Ext.form.Panel',
    xtype: 'detailactivityinfo',

    config:{
        title: '详细信息',
        layout: 'vbox',
        items:[
            {
                xtype: 'textareafield',
                name: 'detail',
                scrollable: false,
                label: '不超过1000字'
            },
            {
                xtype:'panel',
                defaults:{
                    xtype:'button'
                },
                items:[
                    {
                        text:'提交',
                        ui:'confirm',
                        enabled:false,
                        action: 'createConfirm'
                    }
                ]
            }
        ]
    }
})