Ext.define('Chihiro.controller.message.Friend', {
    extend: 'Ext.app.Controller',

    config: {
        refs: {
            button: '#deleteButton'
        },
        control: {
            button: {
                tap: 'Tap'
            }
        }
    },

    Tap: function(view, index, target, record) {
        var button = this.getButton();
        var a = button.parent.parent;
        console.log(a);
        a.hide();
    }
});
