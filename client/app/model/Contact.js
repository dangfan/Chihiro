Ext.define('Chihiro.model.Contact', {
    extend: 'Ext.data.Model',
    config: {
        fields: [ '_id', 'name', 'nickname', 'signiture', 'gender', 'birthday', 'school', 'job', 'portrait', 'interests', 'dis'],
        data: [
            {nickname: '党凡',id:'1'},
            {nickname: '钱堃',id:'2'},
            {nickname: '蔡梦琳',id:'3'},
            {nickname:'丁鹏',id:'4'},
            {nickname:'丁鹏2',id:'5'},
            {nickname:'丁鹏3',id:'6'},
            {nickname:'徐涵',id:'7'}
        ]
    }
});