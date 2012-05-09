Ext.define('Chihiro.view.setting.Info', {
    extend: 'Ext.form.Panel',
    xtype:'userInfo',
    id: 'infoSetting',
    autoDestroy: true,
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
                    xtype:'textfield',
                    name:'nickname',
                    required:true,
                    allowBlank:false,
                    label:'昵称'
                },
                {
                    label: '真实姓名',
                    name: 'name',
                    placeHolder:'未填写'
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
                    placeHolder:'未填写'
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
                    placeHolder:'未填写'
                },
                {
                    label: '职业',
                    name: 'job',
                    placeHolder:'未填写'
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
                        width: '40%',
                        action: 'updateInfo'
                        //action: 'optionalConfirm'
                    },
                    {
                        xtype: 'spacer'
                    }
                ]
            }]
    }
});