Ext.define('Chihiro.view.signup.OptionalInfo', {
    extend: 'Ext.form.Panel',


    requires: [
        'Ext.field.Select',
        'Ext.field.DatePicker'
    ],

    config: {
        title: '更多信息',
        items: [{
            xtype: 'fieldset',
            id: 'optionalField',
            defaults: {
                xtype: 'textfield'
            },
            items: [
            {
                label: '真实姓名',
                name: 'name'
            },
            {
                xtype: 'selectfield',
                label: '性别',
                name: 'gender',
                options: [{
                    text: '男',
                    value: '男'
                }, {
                    text: '女',
                    value: '女'
                }]
            },
            {
                xtype: 'datepickerfield',
                label: '生日',
                name: 'birthday',
                dateFormat: 'Y/m/d',
                yearFrom: '1950',
                value: new Date(),
                picker: {
                    yearFrom: 1950
                }
            },
            {
                label: '学校',
                name: 'school'
            },
            {
                label: '职业',
                name: 'job'
            },
            {
                xtype: 'textareafield',
                name: 'signiture',
                label: '个性签名'
            }]
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            defaults: {
                xtype: 'button'
            },
            items: [
                {
                    text: '提交',
                    ui: 'confirm',
                    left: '10%',
                    width: '40%',
                    action: 'optionalConfirm'
                },
                {
                    text: '以后再说',
                    ui: 'decline',
                    right: '10%',
                    width: '40%',
                    action: 'infoIgnore'
                }
            ]
        }]
    }
});