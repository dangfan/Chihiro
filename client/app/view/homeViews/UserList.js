/**
 * Created by JetBrains WebStorm.
 * User: jayxh
 * Date: 12-3-28
 * Time: 下午3:54
 * To change this template use File | Settings | File Templates.
 */

Ext.define('Chihiro.view.homeViews.UserListItem', {
    extend: 'Ext.dataview.component.DataItem',
    xtype : 'userlistitem',
    requires: ['Ext.Img'],

    config: {
	    height:100,
        dataMap: {
            getName: {
                setHtml: 'nickname'
            },

            getStatus: {
                setHtml: 'signiture'
            },

            getAvatar: {
                setSrc: 'image'
            },

            getDistance: {
                setHtml: 'dis'
            }
        },

        cls: Ext.baseCSSPrefix + 'list-item',

        name: {
            cls: 'name'
        },

        status: {
            cls: 'use'
        },

        avatar: {
            docked: 'left'
        },

        distance: {
            docked: 'right'
            // hidden: (Ext.os.deviceType === 'Phone') ? true : false
        },

        layout: {
            type: 'vbox',
            pack: 'center'
        }
    },

    applyName: function(config) {
        return Ext.factory(config, Ext.Component, this.getName());
    },

    updateName: function(newName) {
        if (newName) {
            this.add(newName);
        }
    },

    applyStatus: function(config) {
        return Ext.factory(config, Ext.Component, this.getStatus());
    },

    updateStatus: function(newStatus) {
        if (newStatus) {
            this.add(newStatus);
        }
    },

    applyAvatar: function(config) {
        console.log(this.getAvatar());
        return Ext.factory(config, Ext.Img, this.getAvatar());
    },

    updateAvatar: function(newAvatar) {
        if (newAvatar) {
            this.add(newAvatar);
        }
    },

    applyDistance: function(config) {
        return Ext.factory(config, Ext.Component, this.getDistance());
},

    updateDistance: function(newDistance) {
        if (newDistance) {
            this.add(newDistance);
        }
    }
});

Ext.define('Chihiro.view.homeViews.UserList', {
    extend: 'Ext.DataView',
    xtype : 'userlist',
    config: {
        height:1000,
        emptyText: '没有找到任何人哦',
        store: {
            fields: ['name', 'signiture','id','dis','interest','image','location','phone','email','gender'
                ,'birthday','school','nickname'],
			data: [
                {
                    interest: "男，公，雄",
                    id: "407788",
                    gender:"男",
                    birthday:"1991年的某一天",
                    school:"五道口男子技术学校",
                    image:'http://kiva.org/img/w80h80/1053365.jpg',
                    //image:"http://hdn.xnimg.cn/photos/hdn421/20100403/2025/large_fdEG_41708n019118.jpg",
                    dis: "250",
                    location: {
                        country: "China",
                        country_code: "CN",
                        geo: {
                            level: "country",
                            pairs: "40.003 116.329",
                            type: "point"},
                        town: "Haidian"},
                    name: "党凡",
                    nickename:"党凡",
                    signiture: "我想找1个人一起自习"
                },
                {
                    interest: "男，公",
                    id: "40778",
                    gender:"女",
                    birthday:"1992年的某一天",
                    school:"六道口男子技术学校",
                    image:'http://kiva.org/img/w80h80/1053361.jpg',
                    //image:"http://hdn.xnimg.cn/photos/hdn421/20100403/2025/large_fdEG_41708n019118.jpg",
                    dis: "600",
                    location: {
                        country: "China",
                        country_code: "CN",
                        geo: {
                            level: "country",
                            pairs: "39 116",
                            type: "point"},
                        town: "Haidian"},
                    name: "党主席",
                    nickname:"我叫党主席",
                    signiture: "我想找2个人一起自习"
                }
            ]
        },
        ui   : 'loans',
        useComponents: true,
        defaultType: 'userlistitem',
        deselectOnContainerClick: false
        //itemTpl: '{name} is {age} years old'
    }
});