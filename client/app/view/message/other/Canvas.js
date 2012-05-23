Ext.define('Chihiro.view.message.other.Canvas', {
    extend: 'Ext.Panel',
    xtype:'chattingCanvas',
    id:'chattingCanvas',

    config: {
        html: '<canvas id="RoCanvas" width="410" height="500" style="border:1pt solid black;margin:auto;cursor:crosshair;clear:both;">您的浏览器不支持canvas!</canvas>' +
            '<div style="clear:both;">&nbsp;</div> ' +
            '<div style="float:left;">Colors:</div> ' +
            '<a href="#" class="colorPicker" onclick="setColor(\'#FFF\');return false;" style="background:#FFF;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#000\');return false;" style="background:#000;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#FF0000\');return false;" style="background:#FF0000;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#00FF00\');return false;" style="background:#00FF00;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#0000FF\');return false;" style="background:#0000FF;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#FFFF00\');return false;" style="background:#FFFF00;">&nbsp;</a>' +
            '<a class="colorPicker" href="#" onclick="setColor(\'#00FFFF\');return false;" style="background:#00FFFF;">&nbsp;</a>' +
            '<div style="clear:both;">&nbsp;</div>' +
            '' +
            '<div style="float:left;">Sizes:</div>' +
            '<a href="#" class="colorPicker" onclick="setSize(2);return false;" style="width:2px;height:2px;margin-left:15px;">&nbsp;</a>' +
            '<a href="#" class="colorPicker" onclick="setSize(5);return false;" style="width:5px;height:5px;margin-left:15px;">&nbsp;</a>' +
            '<a href="#" class="colorPicker" onclick="setSize(10);return false;" style="width:10px;height:10px;margin-left:15px;">&nbsp;</a>' +
            '<a href="#" class="colorPicker" onclick="setSize(25);return false;" style="width:25px;height:25px;margin-left:15px;">&nbsp;</a>' +
            '<div style="float:left;">&nbsp;&nbsp;&nbsp;&nbsp;Tools:</div>' +
            '<a href="#" onclick="setTool(\'path\');return false;" style="width:25px;height:25px;" ><img src="resources/icons/tool-path.png" width="25" height="25" id:"iPath"></a>' +
            '<a href="#" onclick="setTool(\'rectangle\');return false;"style="width:25px;height:25px;margin-left:13px;"><img src="resources/icons/tool-rectangle.png" width="25" height="25"></a>' +
            '<a href="#" onclick="setTool(\'filledrectangle\');return false;"style="width:25px;height:25px;margin-left:13px;"><img src="resources/icons/tool-filledrectangle.png" width="25" height="25"></a>' +
            '<a href="#" onclick="setTool(\'circle\');return false;"style="width:25px;height:25px;margin-left:13px;"><img src="resources/icons/tool-circle.png" width="25" height="25"></a>' +
            '<a href="#" onclick="setTool(\'filledcircle\');return false;" style="width:25px;height:25px;margin-left:13px;"><img src="resources/icons/tool-filledcircle.png" width="25" height="25"></a>' +
            '' +
            '<div style="clear:both;">&nbsp;</div>' +
            '<p style="clear:both;" align="middle"><input type="button" value="清空画板" onclick="clearCanvas();">&nbsp;&nbsp;' +
            '<input type="button" value="保存图片" onclick="centerElt(\'RoSave\',400,300);">&nbsp;&nbsp;' +
            '<input type="button" value="退出画板" onclick="quitCanvas();"></p>' +
            '' +
            '<div id="RoSave" class="ajax form" style="width:400px;">' +
            '<form method="post">' +
            '<fieldset>' +
                '<legend>Drawing information:</legend>' +
                '<div><label>Picture title:</label> <input type="text" name="title" size="30" /></div>' +
                '<div><label>Your name or nickname:</label> <input type="text" name="author" size="30" /></div>' +
            '</fieldset>' +
            '<p align="center">' +
            '<input type="button" value="Save my drawing!" align = "middle" onclick="RoSave(this.form);">' +
            '<input type="button" value="Cancel" align = "middle" onclick="$(\'#RoSave\').hide(\'slow\');">' +
            '</p>' +
            '</form>' +
            '</div>',

        left: 0,
        padding: 10
//        items: [
//            {
//                xtype:'button',
//                text: '下一步',
//                ui: 'confirm',
//                left: '10%',
//                width: '40%',
//                bottom:'1%'
//            }, {
//                xtype:'button',
//                text: '以后再说',
//                ui: 'decline',
//                right: '10%',
//                width: '40%',
//                bottom:'1%'
//            }]
    }
});