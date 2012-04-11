Ext.define('Chihiro.view.find.Phone', {
    extend:'Ext.form.Panel',

    requires: [
        'Ext.field.Number'
    ],

    config:{
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'numberfield',
                        name:'phone',
                        placeHolder:'输入好友手机号',
                        id:'phonefield'
                    }
                ]
            },
            {
                xtype:'button',
                text:'确认',
                ui:'confirm',
                id:'phonebutton'
            }
        ]
    }
});