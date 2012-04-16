Ext.define('Chihiro.controller.setting.Main', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            panel: '#settingpanel',
            button:'#logout'
        },
        control: {
            panel: {
                activeitemchange: 'activeItemChange'
            }
        }
    },

    activeItemChange: function( a,value, oldValue, eOpts ) {
        var panel = this.getPanel();
        var button = this.getButton();
        console.log(value);
        var title = value.title;
        if(title === '设置')
            button.show();
        else
            button.hide();
    }
});
