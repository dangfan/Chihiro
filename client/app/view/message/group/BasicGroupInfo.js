Ext.define('Chihiro.view.message.group.BasicGroupInfo',{
    extend: 'Ext.form.Panel',
    xtype: 'basicgroupinfo',
    config:{
        title: '创建群组',
        items:[
            {
                xtype:'fieldset',
                id:'basicGroupField',
                defaults:{
                    required:true,
                    allowBlank:false
                },
                items:[
                    {
                        xtype:'textareafield',
                        id:'groupname',
                        name:'title',
                        label:'群名',
                        placeHolder:'请输入群组名称'
                    },
                    {
                        xtype:'textfield',
                        id:'groupintro',
                        name:'intro',
                        height:150,
                        label:'群公告'
                    }
                ]
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
                        text:'创建',
                        ui:'confirm',
                        left:'10%',
                        enabled:false,
                        action: 'createGroup'
                    },
                    {
                        text:'返回',
                        ui:'decline',
                        right:'10%',
                        action: 'backToGroupList'
                    }
                ]
            }
        ]
    }
})