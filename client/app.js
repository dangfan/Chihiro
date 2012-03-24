Ext.Loader.setConfig({
    enabled : true
});
Ext.application({
    name: 'Chihiro',
    views:['Main','Sign','SignUp'],
    controllers:['Sign','Main','SignUp'],
    viewport: {
        layout:{
            type:'card',
            animation:{
                type:'pop'
            }
        }
    }
});
