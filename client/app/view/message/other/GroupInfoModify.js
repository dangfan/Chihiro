/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-5-24
 * Time: 下午10:49
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.other.GroupInfoModify', {
    extend:'Ext.form.Panel',
    id: 'changegroupinfo',
    config:{
        items:[
            {
                xtype:'fieldset',
                items:[
                    {
                        xtype:'textareafield',
                        name:'intro',
                        id:'groupintrotext'
                    }
                ]
            },
            {
                xtype:'button',
                text:'确认修改',
                ui:'confirm',
                id:'introbutton'
            }
        ]
    }
});