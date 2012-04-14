Ext.define('Chihiro.view.setting.Info', {
    extend: 'Ext.form.Panel',


    requires: [
        'Ext.field.Select',
        'Ext.field.DatePicker'
    ],

    config: {
        title: '个人名片',
        items: [{
            xtype: 'fieldset',
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    label: '昵称',
                    name: 'nickname',
                    placeHolder:'党主席'
                },
                {
                    xtype: 'selectfield',
                    label: '性别',
                    name: 'gender',
                    options: [{
                        text: '男',
                        value: 0
                    }, {
                        text: '女',
                        value: 1
                    }],
                    placeHolder:'男'
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
                    name: 'school',
                    placeHolder:'清华大学'
                },
                {
                    label: '职业',
                    name: 'job',
                    placeHolder:'学生'
                }
            ]
        },
            {
                xtype: 'panel',
                layout: 'hbox',
                defaults: {
                    xtype: 'button'
                },
                items: [
                    {
                        xtype: 'spacer'
                    },
                    {
                        text: '保存修改',
                        ui: 'confirm',
                        width: '40%'
                        //action: 'optionalConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }]
    }
});