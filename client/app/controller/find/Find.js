Ext.define('Chihiro.controller.find.Find', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            list: '#findlist',
            userlist: 'userlist',
            panel: 'findfriendspanel'
        },
        control: {
            list: {
                itemtap: 'onItemTap'
            }
        }
    },

    onItemTap: function(view, index, target, record) {
        var way = record.get('way'),
            panel = this.getPanel(),
            controller = this;
        if (way == 'Nearby') {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '载入中...'
            });
            socket.emit('find closest', function(list) {
                Ext.Viewport.setMasked(false);
                panel.push(Ext.create('Chihiro.view.find.Nearby', {
                    title: '查找附近的人'
                }));
                controller.getUserlist().setData(list);
            });
        } else {
            panel.push(Ext.create('Chihiro.view.find.' + record.get('way'), {
                title: record.get('text')
            }));
        }
    }
});
