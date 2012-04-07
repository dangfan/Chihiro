Ext.define('Chihiro.view.signup.Main', {
    extend: 'Ext.navigation.View',
    config: {
        autoDestroy: false,
        fullscreen: true,
        scrollable: true,
        defaultBackButtonText: '返回',
        items: [
            {
                xclass: 'Chihiro.view.signup.InterestInfo'
            }
        ]
    }
});