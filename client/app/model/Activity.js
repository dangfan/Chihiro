Ext.define('Chihiro.model.Activity',{
    extend: 'Ext.data.Model',

    config: {
        fields: [
            'id',
            'name',
            'time',
            'location',
            'mark',
            'cost',
            'type',
            'sponsor',
            'detail',
            'zoom'
        ],
        proxy:{
            type: 'localstorage',
            id: 'activity'
        }
    }
})