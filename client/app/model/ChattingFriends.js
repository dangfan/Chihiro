Ext.define('Chihiro.model.ChattingFriends', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ '_id', 'name', 'nickname', 'lastmsg', 'portrait','lasttime','signiture','birthday','gender','school','interests'],
        proxy: {
            type: 'localstorage'
        }
    }
});