Ext.define('Chihiro.controller.message.Friend', {
    extend: 'Ext.app.Controller',
    profile: Ext.os.deviceType.toLowerCase(),

    config: {
        refs: {
            deletebutton: '#deleteButton',
            msgbutton: '#msgSendButton',
            msgtextfield:'#MessageTextField',
            friendimage:'#FriendImage',
            friendcanvas:'#FriendCanvas',
            chattingcanvas:'#chattingCanvas',
            iPath:'#iPath'
        },
        control: {
            deletebutton: {
                tap: 'EndConversation'
            },
            msgbutton: {
                tap: 'Send'
            },
            friendimage:{
                tap:'ShowActions'
            },
            friendcanvas:{
                tap:'ShowCanvas'
            },
            chattingcanvas:{
                touchstart:'',
                touchend:'',
                drag:''
            },
            iPath:{
                tap:'ShowAction'
            }
        }
    },


    EndConversation: function(view, index, target, record) {
        chattingID = '0';

        var me = Ext.getCmp('ChattingContent');
        var store = me.getStore();
        store.load();

        var button = this.getDeletebutton();
        var a = button.parent.parent;
        a.hide();

        if(Ext.getCmp('ChattingFriends')){
            Ext.getCmp('ChattingFriends').deselectAll();
        }

        if(Ext.getCmp('ChattingGroups')){
            Ext.getCmp('ChattingGroups').deselectAll();
        }
    },


    Send: function(view, index, target, record) {
        var msgtextfield = this.getMsgtextfield();
        var msg = msgtextfield.getValue();
        var time = getCurrentTime();

        if(msg != '')
        {
            msgtextfield.reset();
            var ChattingRecord = Ext.getCmp('ChattingContent').getData();
            ChattingRecord.push(
                {
                    id: '',
                    image:'',
                    nickname:sname,
                    xindex:'0',
                    message:msg,
                    time:time
                });
            Ext.getCmp('ChattingContent').setData([]);
            var store = Ext.getCmp('ChattingContent').getStore();
            store.load();
            Ext.getCmp('ChattingContent').setData(ChattingRecord);

            var scroller = Ext.getCmp('ChattingContent').getScrollable();
            scroller.getScroller().scrollToEnd();
        }

        var scroller = Ext.getCmp('ChattingContent').getScrollable();
        scroller.getScroller().scrollToEnd();

        var uid = Ext.getCmp('ChattingFriends').getSelection()[0].raw._id;

        //检查好友列表，若有该人，则发送送消息；否则发送接收好友请求
        for(var i = 0; i < friendList.length;i++)
        {
            if(friendList[i]._id === uid) {
                socket.emit('send message',{uid:uid,msg:msg,time:time});
                return;
            }
        }
        socket.emit('add friend',uid, function(result) {
            if(result.err) aleart('添加好友失败了:(');
            else {
                alert('但愿添加好友成功');
                newfriend = Ext.getCmp('ChattingFriends').getSelection()[0].raw;
                friendList.push(newfriend);
            }
            //TODO: 等待乾坤的addfriend接口
        });

//        console.log(friendList);
    },

    ShowActions:function(img,obj,other){

        if(chatobject === 'friend')
        {
            if(Ext.getCmp('MyCarousel'))
            {
                var carou = Ext.getCmp('MyCarousel');
                carou.setActiveItem(0);

                Ext.getCmp('addFriendBtn').setHidden(true);
                Ext.getCmp('deleteFriendBtn').setHidden(true);
                Ext.getCmp('talktofriendBtn').setHidden(true);

                var user = Ext.getCmp('ChattingFriends').getSelection()[0];
                information = Ext.getCmp('DetailPanel').down('detailInformation');
                information.setData(user.data);

                var button = this.getDeletebutton();
                var a = button.parent.parent;
                a.hide();

                Ext.getCmp('DetailPanel').show();
                return;
            }

            if (!this.view) {
                this.view = Ext.create('Chihiro.view.userlist.Detail');
            }
            Ext.getCmp('addFriendBtn').setHidden(true);
            Ext.getCmp('deleteFriendBtn').setHidden(true);
            Ext.getCmp('talktofriendBtn').setHidden(true);

            var view = this.view;
            var user = Ext.getCmp('ChattingFriends').getSelection()[0];
            view.setUser(user);

            if (!view.getParent()) {
                Ext.Viewport.add(view);
            }

            var button = this.getDeletebutton();
            var a = button.parent.parent;
            a.hide();

            view.show();
        }
    },

    ShowCanvas:function(img,obj,other){
        if(Ext.feature.has.Canvas)
        {
            if (!this.view) {
                this.view = Ext.create('Chihiro.view.message.other.Canvas');
                var view = this.view;

                if (!view.getParent()) {
                    Ext.Viewport.add(view);
                }
                view.show();
                var draw = new Draw('RoCanvas');
            }
            else{
                Ext.getCmp('chattingCanvas').show();
            }
        } else{
            alert('don\'t support canvas!');
        }
 }

});

var roCanvas={};
var clickX = new Array();
var clickY = new Array();
roCanvas['startX'] = 0;
roCanvas['startY'] = 0;
roCanvas['clearRect']=[0,0,0,0];
roCanvas['clearCircle']=[0,0, 0];
var clickDrag = new Array();
var paint;
var defaultColor="#000";
roCanvas['color']=defaultColor;
var defaultShape="round";
var defaultWidth=5;
var drawTool="path";

function Draw(arg) {
    if (arg.nodeType) {
        this.canvas = arg;
    } else if (typeof arg == 'string') {
        this.canvas = document.getElementById(arg);
    } else {
        return;
    }
    this.init();
}

Draw.prototype = {
    init: function() {
        var that = this;
        if (!this.canvas.getContext) {
            return;
        }

        this.context = this.canvas.getContext('2d');
        var context = this.context;
        context.strokeStyle = defaultColor;
        context.lineJoin = defaultShape;
        context.lineWidth = defaultWidth;

        this.canvas.ontouchstart= function(event) {
            that.drawBegin(event);

            var canvas = document.getElementById('RoCanvas');
            var stage_info = canvas.getBoundingClientRect();
            paint = true;
            var mouseX = event.touches[0].pageX - canvas.offsetLeft;
            roCanvas['startX']=mouseX;
            var mouseY = event.touches[0].pageY - canvas.offsetTop;
            roCanvas['startY']=mouseY;
        };
        this.canvas.onmousedown = function(event) {

            that.drawBegin(event);

            var canvas = document.getElementById('RoCanvas');
            var stage_info = canvas.getBoundingClientRect();
            paint = true;
            var mouseX = event.clientX - stage_info.left;
            roCanvas['startX']=mouseX;
            var mouseY = event.clientY - stage_info.top;
            roCanvas['startY']=mouseY;
        };
    },

    drawBegin: function(e) {
        var that = this,
            stage_info = this.canvas.getBoundingClientRect();
        window.getSelection ? window.getSelection().removeAllRanges() :
            document.selection.empty();  //清除文本的选中

        this.context.moveTo(
            roCanvas['startX'],
            roCanvas['startY']
        );
        context = this.context;
        document.ontouchmove = function(e) {
            that.touchdrawing(e);
        };
        document.onmousemove = function(e) {
            that.drawing(e);
        };
        document.ontouchend = this.drawEnd;
        document.onmouseup = this.drawEnd;
    },
    touchdrawing: function(e) {
        var stage_info = this.canvas.getBoundingClientRect();

        if(paint){
            context.clearRect(roCanvas['clearRect'][0],roCanvas['clearRect'][1],
                roCanvas['clearRect'][2],roCanvas['clearRect'][3]);

            context.strokeStyle=context.fillStyle='#ffffff';
            context.beginPath();
            context.arc(roCanvas['clearCircle'][0],roCanvas['clearCircle'][1],roCanvas['clearCircle'][2],0,Math.PI*2);
            context.closePath();
            context.stroke();
            context.fill();
            setColor(roCanvas['color']);

            // draw different shapes
            switch(drawTool)
            {
                case 'rectangle':
                case 'filledrectangle':
                    w = e.touches[0].pageX - stage_info.left - roCanvas['startX'];
                    h = e.touches[0].pageY - stage_info.top - roCanvas['startY'];
                    roCanvas['clearRect']=[roCanvas['startX'], roCanvas['startY'], w, h];

                    if(drawTool=='rectangle')
                    {
                        context.strokeRect(roCanvas['startX'], roCanvas['startY'], w, h);
                    }
                    else
                    {
                        context.fillRect(roCanvas['startX'], roCanvas['startY'], w, h);
                    }
                    break;
                case 'circle':
                case 'filledcircle':
                    w = Math.abs(e.touches[0].pageX - stage_info.left - roCanvas['startX']);
                    h = Math.abs(e.touches[0].pageY - stage_info.top - roCanvas['startY']);
                    // r is the bigger of h and w
                    r = h>w?h:w;

                    roCanvas['clearCircle']=[roCanvas['startX'], roCanvas['startY'], r];

                    context.beginPath();
                    context.arc(roCanvas['startX'],roCanvas['startY'],r,0,Math.PI*2);
                    context.closePath();

                    if(drawTool=='circle') context.stroke();
                    else context.fill();
                    break;
                default:
                    addClick(e.touches[0].pageX - stage_info.left, e.touches[0].pageY -  stage_info.top, true);
                    break;
            }

            redraw();
        }
    },
    drawing: function(e) {
        var stage_info = this.canvas.getBoundingClientRect();

        if(paint){
            context.clearRect(roCanvas['clearRect'][0],roCanvas['clearRect'][1],roCanvas['clearRect'][2],roCanvas['clearRect'][3]);
            context.strokeStyle=context.fillStyle='#ffffff';
            context.beginPath();
            context.arc(roCanvas['clearCircle'][0],roCanvas['clearCircle'][1],roCanvas['clearCircle'][2],0,Math.PI*2);
            context.closePath();
            context.stroke();
            context.fill();
            setColor(roCanvas['color']);

            // draw different shapes
            switch(drawTool)
            {

                case 'rectangle':
                case 'filledrectangle':
                    w = e.clientX - stage_info.left - roCanvas['startX'];
                    h = e.clientY - stage_info.top - roCanvas['startY'];
                    roCanvas['clearRect']=[roCanvas['startX'], roCanvas['startY'], w, h];

                    if(drawTool=='rectangle')
                    {
                        context.strokeRect(roCanvas['startX'], roCanvas['startY'], w, h);
                    }
                    else
                    {
                        context.fillRect(roCanvas['startX'], roCanvas['startY'], w, h);
                    }
                    break;
                case 'circle':
                case 'filledcircle':
                    w = Math.abs(e.clientX - stage_info.left - roCanvas['startX']);
                    h = Math.abs( e.clientY - stage_info.top - roCanvas['startY']);
                    // r is the bigger of h and w
                    r = h>w?h:w;

                    roCanvas['clearCircle']=[roCanvas['startX'], roCanvas['startY'], r];

                    context.beginPath();
                    context.arc(roCanvas['startX'],roCanvas['startY'],r,0,Math.PI*2);
                    context.closePath();

                    if(drawTool=='circle') context.stroke();
                    else context.fill();
                    break;
                default:
                    addClick(e.clientX - stage_info.left, e.clientY - stage_info.top, true);
                    break;
            }
        }
        redraw();

    },
    drawEnd: function() {

        paint = false;

        clickX = new Array();
        clickY = new Array();
        clickDrag = new Array();
        roCanvas['clearRect']=[0,0,0,0];
        roCanvas['clearCircle']=[0,0,0];
    }
};

function addClick(x, y, dragging)
{
    clickX.push(x);
    clickY.push(y);
    clickDrag.push(dragging);
}

function redraw(){
    var canvas = document.getElementById('RoCanvas');
    if(canvas.getContext)
    {
        var context = canvas.getContext('2d');
    }

    for(var i=0; i < clickX.length; i++)
    {
        context.beginPath();
        if(clickDrag[i] && i){
            context.moveTo(clickX[i-1], clickY[i-1]);
        }else{
            context.moveTo(clickX[i]-1, clickY[i]);
        }
        context.lineTo(clickX[i], clickY[i]);
        context.closePath();
        context.stroke();
    }
}

function clearCanvas()
{
    var canvas = document.getElementById('RoCanvas');
    if(canvas.getContext)
    {
        var context = canvas.getContext('2d');
    }
    oldLineWidth=context.lineWidth;
    context.clearRect(0,0,canvas.width,canvas.height);
    canvas.width = canvas.width;

    clickX = new Array();
    clickY = new Array();
    clickDrag = new Array();
    setSize(oldLineWidth);
    context.lineJoin = defaultShape;
    setColor(roCanvas['color']);
}

function setColor(col)
{
    var canvas = document.getElementById('RoCanvas');
    if(canvas.getContext)
    {
        var context = canvas.getContext('2d');
    }
    context.strokeStyle = col;
    context.fillStyle = col;
    roCanvas['color']=col;
}

function setSize(px)
{
    var canvas = document.getElementById('RoCanvas');
    if(canvas.getContext)
    {
        var context = canvas.getContext('2d');
    }
    context.lineWidth=px;
}

// sets the tool to draw
function setTool(tool)
{
    drawTool=tool;
}

function RoSave(frm)
{
    var strImageData = canvas.toDataURL();

    $.ajax({
        url: "#", // place your Ajax URL here
        type: "post",
        data: "image_data="+encodeURIComponent(strImageData)+"&title="+frm.title.value
            +"&author="+frm.author.value,
        success: function(msg)
        {
            // on success output some message or redirect etc
        }
    });
}

function centerElt(eid,w,h)
{
    elt=document.getElementById(eid);
    var centerY= Math.floor(Math.round($(window).height()/2));
    var centerX= Math.floor(Math.round($(window).width()/2));

    elt.style.top=(centerY-Math.floor(Math.round(h/2))-50)+$(window).scrollTop() + "px";
    elt.style.left=(centerX-Math.floor(Math.round(w/2)))+"px";

    // elt.style.display='block';
    $("#"+eid).show('slow');
}

function quitCanvas()
{
    Ext.getCmp('chattingCanvas').hide();
//    var canvas = document.getElementById("RoCanvas");
//    var img    = canvas.toDataURL("resources/icons/jay.png");
//    document.write('<img src="'+img+'"/>');
    clearCanvas();
}
