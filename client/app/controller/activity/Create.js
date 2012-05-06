Ext.define('Chihiro.controller.activity.Create',{
    extend: 'Ext.app.Controller',

    config:{
        control:{
            'button[action=backToActivityList]': {
                tap: 'backToActivityList'
            },
            'button[action=toMapLocate]': {
                tap: 'toMapLocate'
            },
            'button[action=toDetailActivity]': {
                tap: 'toDetailActivity'
            },
            'button[action=createConfirm]': {
                tap: 'createconfirm'
            }
        }
    },

    launch: function(){

    },
    backToActivityList: function(){
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
    },
    toMapLocate:function(){
        var val = Ext.getCmp('basicactivityinfo').getValues();
        //console.log(val);
        if(val.cost.length == 0 || val.location.length == 0 || val.name.length == 0 || val.type.length == 0){
            Ext.Msg.alert('请完整填写信息！');
            return;
        }else if(val.date.getFullYear() == new Date().getFullYear()
            && (val.date.getMonth() < new Date().getMonth()
            || (val.date.getMonth() == new Date().getMonth() && val.date.getDate() <= new Date().getDate()))){
            Ext.Msg.alert('请设置未来的日期');
            return;
        }else if(!(val.starttime.match(/[0-9]{2}:[0-9]{2}/) && val.endtime.match(/[0-9]{2}:[0-9]{2}/))){
            Ext.Msg.alert('请输入有效时间');
            return;
        }
        else{
            var starttime = val.starttime.split(':');
            var endtime = val.endtime.split(':');
            if(starttime[0]>24||starttime[1]>=60||endtime[0]>24||endtime[1]>=60){
                Ext.Msg.alert('请输入有效时间');
                return;
            }
            if((endtime[0]-starttime[0])*60+(endtime[1]-starttime[1])<30){
                Ext.Msg.alert('活动时间至少30分钟');
                return;
            }
        }
        if(!Ext.getCmp('maplocate')){
            Ext.create('Chihiro.view.activity.MapLocate',{
                id: 'maplocate'
            })
        }

        createActivity.name  = val.name;
        createActivity.location = val.location;
        createActivity.cost = val.cost;
        createActivity.type = val.type;
        createActivity.date = val.date;
        createActivity.starttime = val.starttime;
        createActivity.endtime = val.endtime;
        createActivity.sponsor = sname;

        Ext.getCmp('mylocation').setMapCenter({latitude: myLocation.getLatitude(), longitude: myLocation.getLongitude()});
        Ext.getCmp('maplocate').down('detailMap');
        Ext.getCmp('createactivity').push(Ext.getCmp('maplocate'));
        //console.log(createActivity);
    },
    toDetailActivity: function(){
        if(!Ext.getCmp('detailactivity')){
            Ext.create('Chihiro.view.activity.DetailActivityInfo',{
                id: 'detailactivity'
            });
        }
        //TODO: 获取用户选择的坐标
        Ext.getCmp('createactivity').push(Ext.getCmp('detailactivity'));
    },
    createconfirm: function(){
        var val = Ext.getCmp('detailactivity').getValues();
        if(val.detail.length == 0){
            Ext.Msg.alert('详细信息不能为空');
            return;
        }
        else if(val.detail.length > 2000){
            Ext.Msg.alert('详细信息不能超过1000字');
            return;
        }
        createActivity.DetailInfo = val;
        Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
        //TODO: 向服务器发送添加活动的请求
    }
})