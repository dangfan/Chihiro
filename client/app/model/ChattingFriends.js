Ext.define('Chihiro.model.ChattingFriends', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ 'id', 'name', 'nickname', 'lastmsg', 'portrait','lasttime','signiture'],
        proxy: {
            type: 'localstorage'
        }
    }
});