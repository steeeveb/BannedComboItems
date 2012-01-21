Ext.Loader.setConfig({enabled: true});

Ext.require([
    'Ext.tip.*',
    'Ext.data.*',
    'Ext.window.Window',
    'Ext.ux.BannedComboItems'
]);

Ext.onReady(function(){

    Ext.QuickTips.init();

    var exampleStore = Ext.create('Ext.data.Store', {
        // you must specify (bool)banned and (string)banReason fields
        fields: ['id', 'label', 'banned', 'banReason'],
        proxy: {
            type: 'ajax',
            url : 'example.json',
            reader: {
                type: 'json',
                root: 'rows'
            }
        },
        autoLoad: true
    });

    var exampleWindow = Ext.create('Ext.window.Window', {
        title: 'BannedComboItems example',
        width: 400,

        items: [
            {
                html: 'This is a Ext.form.ComboBox with BannedComboItems plugins applied:',
                bodyStyle: 'background-color: transparent; margin-bottom: 8px;',
                border: false
            },
            {
                xtype: 'combobox',
                triggerAction: 'all',
                valueField: 'id',
                displayField: 'label',
                store: exampleStore,
                // the funny part
                plugins: [
                    {
                        ptype: 'bannedcomboitems',
                        booleanField: 'banned',
                        reasonField: 'banReason'
                    }
                ]
            }
        ]
    });

    exampleWindow.show();

});
