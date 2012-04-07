Ext.define('Chihiro.view.signup.InterestInfo', {
    extend: 'Ext.form.Panel',
    config: {
        title: '兴趣爱好',
        id: 'interestinfoView',
        items: [{
            xtype: 'fieldset',
            id: 'interestField',
            items: [{
                xtype: 'textfield',
                name: 'interest',
                placeHolder: '千寻将根据您的兴趣问您推荐好友'
            }]
        },
        {
            xtype: 'panel',
            layout: 'hbox',
            defaults: {
                xtype: 'button'
            },
            items: [{
                text: '下一步',
                ui: 'confirm',
                left: '10%',
                width: '40%',
                action: 'interestConfirm'
            }, {
                text: '以后再说',
                ui: 'decline',
                right: '10%',
                width: '40%',
                action: 'infoIgnore'
            }]
        }]
    }
});
