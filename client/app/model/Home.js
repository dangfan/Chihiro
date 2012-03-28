/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-28
 * Time: 下午1:06
 * To change this template use File | Settings | File Templates.
 */
Ext.define('FriendList', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['firstName', 'lastName']
    }
});

var searchFriendStore = Ext.create('Ext.data.Store', {
    model: 'FriendList',
    sorters: 'lastName',

    grouper: {
        groupFn: function(record) {
            return record.get('lastName')[0];
        }
    },

    data: [
        { firstName: 'Tommy',   lastName: 'Maintz'  },
        { firstName: 'Rob',     lastName: 'Dougan'  },
        { firstName: 'Ed',      lastName: 'Spencer' },
        { firstName: 'Jamie',   lastName: 'Avins'   },
        { firstName: 'Aaron',   lastName: 'Conran'  },
        { firstName: 'Dave',    lastName: 'Kaneda'  },
        { firstName: 'Jacky',   lastName: 'Nguyen'  },
        { firstName: 'Abraham', lastName: 'Elias'   },
        { firstName: 'Jay',     lastName: 'Robinson'},
        { firstName: 'Nigel',   lastName: 'White'   },
        { firstName: 'Don',     lastName: 'Griffin' },
        { firstName: 'Nico',    lastName: 'Ferrero' },
        { firstName: 'Nicolas', lastName: 'Belmonte'},
        { firstName: 'Jason',   lastName: 'Johnston'}
    ]
});