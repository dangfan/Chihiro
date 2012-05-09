Ext.define('Chihiro.model.User', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ '_id', 'name', 'nickname', 'signiture', 'gender', 'birthday', 'school', 'job', 'portrait', 'interests', 'dis','lastmsg','lasttime']
//        proxy: {
//            type: 'localstorage'
//        }
    }
});