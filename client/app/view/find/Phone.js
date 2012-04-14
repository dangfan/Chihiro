Ext.define('Chihiro.view.find.Phone', {
    extend:'Ext.form.Panel',
    id: 'findbyphone',

    requires: [
        'Ext.field.Number'
    ],

    config:{
        title: '按手机号查找好友',
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