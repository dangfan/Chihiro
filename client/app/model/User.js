Ext.define('Chihiro.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'id', 'name', 'nickname', 'signiture', 'gender', 'birthday', 'school', 'job', 'portrait', 'interests', 'dis']
//        proxy: {
//            type: 'localstorage'
//        }
    }
});