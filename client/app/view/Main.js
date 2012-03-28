Ext.define('Chihiro.view.Main', {
    extend:'Ext.Container',
    requires: ['Chihiro.view.Sign', 'Chihiro.view.Home'],

    id: 'viewport',
    config: {
        layout: {
            type: 'card'
        },
        fullscreen: true
    }
})

