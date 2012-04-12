Ext.define('Chihiro.controller.find.Email', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            button: 'button[action=emailbutton]',
            userlist: 'userlist',
            panel: 'findfriendspanel',
            field:'#emailfield'
        },
        control: {
            button: {
                tap: 'Tap'
            }
        }
    },

    Tap: function(view, index, target, record) {
        var field = this.getField();
        var value = field.getValue();
        var panel = this.getPanel();
        var controller = this;
        console.log(value);
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '载入中...'
        });
        socket.emit('get info by email',value, function(msg) {
            Ext.Viewport.setMasked(false);
            console.log(msg);
            if(msg.err == 0) {
                panel.push(Ext.create('Chihiro.view.userlist.List', {
                    title: '邮箱查找结果'
                }));
                Ext.getCmp(realuserlist).setData([msg.obj]);
            }
            else alert('This user does not exist!');
        });
    }
});
