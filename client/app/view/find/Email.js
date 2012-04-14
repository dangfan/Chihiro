Ext.define('Chihiro.view.find.Email', {
    extend:'Ext.form.Panel',
    id: 'findbyemail',

    requires: [
        'Ext.field.Email'
    ],

    config:{
        title: '按邮箱地址查找好友',
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'emailfield',
                        name:'email',
                        id:'emailfield',
                        placeHolder:'输入好友邮箱地址'
                    }
                ]
            },
            {
                xtype:'button',
                text:'确认',
                ui:'confirm',
                id:'emailbutton'
            }
        ]
    }
});