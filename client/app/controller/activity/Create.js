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
        if(val.cost.length == 0 || val.location.length == 0 || val.name.length == 0){
            Ext.Msg.alert('请完整填写信息！');
            return;
        }else if(val.date.getFullYear() == new Date().getFullYear()
            && (val.date.getMonth() < new Date().getMonth()
            || (val.date.getMonth() == new Date().getMonth() && val.date.getDate() <= new Date().getDate()))){
            Ext.Msg.alert('请设置未来的日期');
            return;
        }else if(!(val.starttime.match(/[0-9]{1,2}:[0-9]{2}/) && val.endtime.match(/[0-9]{1,2}:[0-9]{2}/))){
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
        console.log(val);
        createActivity.name  = val.name;
        createActivity.location = val.location;
        createActivity.cost = val.cost;
        createActivity.type = "resources/icons/" + val.type;
        createActivity.date = val.date.toString().substr(0, 14);
        createActivity.starttime = val.starttime;
        createActivity.endtime = val.endtime;
        createActivity.sponsor = sname;
        createActivity.typeText = Ext.getCmp('activitytype')._value._data.text;

        console.log(createActivity);
        var mark=new Object();
        var geocoder = new google.maps.Geocoder();
        geocoder.geocode( { 'address': val.location}, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                Ext.getCmp('mylocation').setMapCenter(results[0].geometry.location);
                mark.longitude = results[0].geometry.location.ab;
                mark.latitude = results[0].geometry.location.$a;
                createActivity.mark = mark;
                var mapMarker = new google.maps.Marker({
                    id: 'geoLocMarker',
                    position: results[0].geometry.location,
                    map: Ext.getCmp('mylocation').getMap(),
                    visible: true
                });
                Ext.getCmp('maplocate').down('detailMap');
                Ext.getCmp('createactivity').push(Ext.getCmp('maplocate'));
            } else {
                alert("地图中未标注此地点");
            }
        });
    },
    toDetailActivity: function(){
        if(!Ext.getCmp('detailactivity')){
            Ext.create('Chihiro.view.activity.DetailActivityInfo',{
                id: 'detailactivity'
            });
        }
        createActivity.zoom = Ext.getCmp('mylocation').getMapOptions().zoom;
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
        console.log(createActivity);
        createActivity.detail = val.detail;
        if(createOrEdit != 0){
            createActivity._id = createOrEdit;
            socket.emit('update activity', createActivity, function(msg){
                if(msg.err == 0){
                    Ext.Msg.alert('活动修改成功');
                    Ext.getCmp('createactivity').pop(2);
                    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
                    refreshActivity();
                }
                else{
                    Ext.Msg.alert('活动修改失败，请稍后再试');
                }
            });
        }else{
            socket.emit('add activity', createActivity, function(msg){
                if(msg.err == 0){
                    Ext.Msg.alert('活动添加成功');
                    Ext.getCmp('createactivity').pop(2);
                    Ext.Viewport.setActiveItem(Ext.getCmp('homeView'));
                    refreshActivity();
                }
                else{
                    Ext.Msg.alert('活动添加失败，请稍后再试');
                }
            });
        }
    }
});