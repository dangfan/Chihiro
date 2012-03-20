Ext.Loader.setConfig({
    enabled : true
});

Ext.application({
    name: 'Chihiro',

    viewport: {
        layout: {
            type: 'card',
            animation: {
                type: 'pop'
            }
        }
    }
});