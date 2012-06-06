Ext.define('Chihiro.view.setting.Shortcut', {
    extend:'Ext.form.Panel',

    config:{
        title:'选择头像',
        items:[
            {
                xtype:'panel',
                //layout: 'hbox',
                items: [
                    {
                        html: '<div class="demo-weather">' +
                            '<tpl for=".">' +
                            '<div class="day">' +
                            '<a href="#" class="colorPicker" onclick="ChooseShortcut(\'resources/icons/11.jpg\');return false;" style="background:#87CEFA;">&nbsp;</a>' +
                            '<div class="date" >Shortcut 1' +
                            '</div>' +
                            '<tpl for="weatherIconUrl">' +
                            '<img src="resources/icons/11.jpg" >'+
                            '</tpl>' +
                            '<span class="temp">勇敢&deg;<span class="temp_low">淘气&deg;</span></span>' +
                            '</div>' +
                            '</tpl>' +
                            '</div>'
                    },
                    {
                        html: '<div class="demo-weather">' +
                            '<tpl for=".">' +
                            '<div class="day">' +
                            '<a href="#" class="colorPicker" onclick="ChooseShortcut(\'resources/icons/22.jpg\');return false;" style="background:#FFFF00;">&nbsp;</a>' +
                            '<div class="date">Shortcut 2</div>' +
                            '<tpl for="weatherIconUrl">' +
                            '<a href="#"><img src="resources/icons/22.jpg"></a>'+
                            '</tpl>' +
                            '<span class="temp">潇洒&deg;<span class="temp_low">风流&deg;</span></span>' +
                            '</div>' +
                            '</tpl>' +
                            '</div>'
                    },
                    {
                        html: '<div class="demo-weather">' +
                            '<tpl for=".">' +
                            '<div class="day">' +
                            '<a href="#" class="colorPicker" onclick="ChooseShortcut(\'resources/icons/33.jpg\');return false;" style="background:#000000;">&nbsp;</a>' +
                            '<div class="date">Shortcut 3</div>' +
                            '<tpl for="weatherIconUrl">' +
                            '<a href="#"><img src="resources/icons/33.jpg"></a>'+
                            '</tpl>' +
                            '<span class="temp">务实&deg;<span class="temp_low">冷静&deg;</span></span>' +
                            '</div>' +
                            '</tpl>' +
                            '</div>'
                    },
                    {
                        html: '<div class="demo-weather">' +
                            '<tpl for=".">' +
                            '<div class="day">' +
                            '<a href="#" class="colorPicker" onclick="ChooseShortcut(\'resources/icons/44.jpg\');return false;" style="background:#00BFFF;">&nbsp;</a>' +
                            '<div class="date">Shortcut 4</div>' +
                            '<tpl for="weatherIconUrl">' +
                            '<a href="#"><img src="resources/icons/44.jpg"></a>'+
                            '</tpl>' +
                            '<span class="temp">美丽&deg;<span class="temp_low">大方&deg;</span></span>' +
                            '</div>' +
                            '</tpl>' +
                            '</div>'
                    },
                    {
                        html: '<div class="demo-weather">' +
                            '<tpl for=".">' +
                            '<div class="day">' +
                            '<a href="#" class="colorPicker" onclick="ChooseShortcut(\'resources/icons/55.jpg\');return false;" style="background:#FF3030;">&nbsp;</a>' +
                            '<div class="date">Shortcut 5</div>' +
                            '<tpl for="weatherIconUrl">' +
                            '<a href="#"><img src="resources/icons/55.jpg" ></a>'+
                            '</tpl>' +
                            '<span class="temp">帅气&deg;<span class="temp_low">强大&deg;</span></span>' +
                            '</div>' +
                            '</tpl>' +
                            '</div>'
                    }
                ]
            }
        ]
    }
});