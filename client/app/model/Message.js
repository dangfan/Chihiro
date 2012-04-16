Ext.define('Chihiro.model.Message', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['uid', 'messages'],
        proxy: {
            type: 'localstorage',
            id: 'friends'
        }
    }
});