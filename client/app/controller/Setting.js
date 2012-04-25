Ext.define('Chihiro.controller.Setting', {
    extend: 'Ext.app.Controller',
    
    config: {
        refs: {
            logoutBtn: 'button[action=logout]'
        },
        control: {
            logoutBtn: {
                tap: 'doLogout'
            }
        }
    },

    doLogout: function() {
        Ext.Msg.confirm("退出登录", "确定要退出登录吗？", function(choice) {
            if(choice == 'yes') {
                window.localStorage.removeItem('sid');
                socket.emit('logout');
                Ext.Viewport.setActiveItem(Ext.getCmp('loginView'));
            }
        });
    }
});