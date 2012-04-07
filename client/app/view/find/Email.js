Ext.define('Chihiro.view.find.Email', {
    extend:'Ext.form.Panel',

    requires: [
        'Ext.field.Email'
    ],

    config:{
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'emailfield',
                        name:'email',
                        placeHolder:'输入好友邮箱地址'
                    }
                ]
            },
            {
                xtype:'button',
                text:'确认',
                ui:'confirm'
            }
        ]
    }
});