Ext.define('Chihiro.view.Main', {
    extend:'Ext.Container',
    requires: ['Chihiro.view.Sign'],

    id: 'viewport',
    config: {
        layout: {
            type: 'card'
        },
        fullscreen: true,

        items: [
            { xclass: 'Chihiro.view.Sign' }
        ]
    }
})

