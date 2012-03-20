Ext.Loader.setConfig({
    enabled : true
});
Ext.application({
    name: 'Chihiro',
    views:['Main','Sign','SignUp'],
    controllers:['Main'],
    viewport: {
        layout:{
            type:'card',
            animation:{
                type:'pop'
            }
        }
    }
});
