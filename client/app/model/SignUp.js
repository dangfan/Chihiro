/**
 * Created by JetBrains WebStorm.
 * User: jacklyne
 * Date: 12-3-27
 * Time: 下午8:43
 * To change this template use File | Settings | File Templates.
 */
Ext.define('Ext.Model.Interest', {
    extend: 'Ext.data.Model',
    config: {
        fields: ['interestItem']
    }
});

var interestStore = Ext.create('Ext.data.Store', {
    model: 'Ext.Model.Interest',
    sorters: 'interestItem'
});