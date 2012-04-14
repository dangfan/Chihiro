 //<debug>
Ext.Loader.setPath({
    'Ext': 'sdk/src'
});
//</debug>

Ext.application({
    controllers: ['SignIn', 'SignUp', 'Setting', 'List', 'Home', 'find.Find','find.Email','find.Phone',
        'message.Message','message.ChatList','message.Friend','setting.Main'],

    models: ['User'],

    name: 'Chihiro',

    requires: [
        'Ext.MessageBox'
    ],

    views: ['SignIn',
        'signup.Main', 'signup.InterestInfo', 'signup.OptionalInfo', 'signup.RequiredInfo',
        'Home',
        'message.List',
        'contact.List',
        'activity.List',
        'find.Main', 'find.Email', 'find.Phone', 'find.Contact', 'find.Nearby',
        'setting.Main',
        'userlist.List', 'userlist.Detail', 'userlist.ListItem',
        'message.List','message.ChatList','message.ChatListItem','message.Friends','message.Content','message.Sentence'
    ],

    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.png',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.png',

    launch: function() {
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();

        Ext.create('Chihiro.view.Home');

        // Initialize the signin view
        Ext.Viewport.add(Ext.create('Chihiro.view.SignIn'));

        Ext.Viewport.getLayout().setAnimation({
            type: 'pop'
        });
    },

    onUpdated: function() {
        Ext.Msg.confirm(
            "Application Update",
            "This application has just successfully been updated to the latest version. Reload now?",
            function() {
                window.location.reload();
            }
        );
    }
});
