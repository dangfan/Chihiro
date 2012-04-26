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

    launch: function() {
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
                    title: '查找附近的人',
                    items: [
                        {
                            xtype: 'userlist',
                            id: 'userlist'
                        }]
                }));
                Ext.getCmp('userlist').setData(list);
            });
        }
        else if (way == 'Contact') {
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: '载入中...'
            });
            var fields = ["phoneNumbers"];
            navigator.contacts.find(fields, function (contacts) {
                var numbers = new Array();
                for(i in t) {
                    if(t[i].phoneNumbers.length == 0) continue;
                    numbers.push(t[i].phoneNumbers[0]);
                }
                socket.emit('find by phones', function(users) {
                    Ext.Viewport.setMasked(false);
                    panel.push(Ext.create('Chihiro.view.find.Nearby', {
                        title: '通讯录中已注册用户',
                        items: [
                            {
                                xtype: 'userlist',
                                id: 'userlist'
                            }]
                    }));
                    Ext.getCmp('userlist').setData(list);
                });
            });
        }
        else {
            panel.push(Ext.create('Chihiro.view.find.'+record.get('way')));
        }
    }
});
