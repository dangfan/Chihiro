Ext.define('Chihiro.controller.find.Phone', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            button: '#phonebutton',
            userlist: 'userlist',
            panel: 'findfriendspanel',
            field:'#phonefield'
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
        Ext.Viewport.setMasked({
            xtype: 'loadmask',
            message: '载入中...'
        });
        socket.emit('get info by phone',value, function(msg) {
            Ext.Viewport.setMasked(false);
            if(msg.err == 0) {
                console.log(msg);
                panel.push(Ext.create('Chihiro.view.userlist.List', {
                    title: '手机号查找结果',
                    id: 'userlist'
                }));
                Ext.getCmp('userlist').setData([msg.obj]);
            }
            else alert('This user does not exist!');
        });
    }
});
