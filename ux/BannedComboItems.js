/**
 * @class    Ext.ux.BannedComboItems
 * @extends  Ext.AbstractPlugin
 * @package  Ext.ux
 * @version  1.0 - ported to Ext JS 4
 * @date     2012-01-20
 * @author   Francesco Montefoschi
 * @author   Stefano Bossi - porting to Ext JS 4
 * @license  http://www.gnu.org/licenses/gpl-3.0.html  GNU GPL 3.0
 *
 * If applied to a Ext.form.ComboBox, prevents some items to be selected.
 * Unselectable items will take a CSS class that allows you to make the text
 * gray. Keeping the mouse on an unselectable item, a ext:qtip message will
 * appear telling the user the reason for the special state.
 *
 * Configuration example:
 * <code>{
        xtype: 'combo',
        ...
        store: {
            ...
            // you must specify (bool)banned and (string)banReason fields
            fields: ['id', 'label', 'banned', 'banReason']
        },
        plugins: [
            {ptype: 'bannedcomboitems'}
        ]
    }</code>
 *
 */
Ext.define('Ext.ux.BannedComboItems', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.bannedcomboitems',
    /**
     * @cfg {String} booleanField The name of the boolean field (in the record)
     * which says if it can be selected or no. If the record has this field
     * true, the item will be unselectable. Defaults to <tt>banned</tt>.
     */
    booleanField: 'banned',

    /**
     * @cfg {String} reasonField The name of the string field (in the record)
     * which contains the message to display while the mouse is on a disabled
     * record. Defaults to <tt>reasonField</tt>.
     */
    reasonField: 'banReason',

    /**
     * Plugin init.
     * @private
     */
    constructor: function(config) {
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    init: function(combo) {
        var customTpl = 
            '<tpl for="."><div data-qtip="{' + this.reasonField +
            '}" class="x-boundlist-item x-boundlist-item-banned-{' +
            this.booleanField + '}">{' + combo.displayField + '}</div></tpl>';

        combo.tpl = customTpl;
        combo.on('beforeselect', this.beforeSelection, this);
    },

    /**
     * Returns false (stopping the selection) if the record is disabled.
     *
     * @param {Ext.form.ComboBox} combo
     * @param {Ext.data.Record} record
     * @param {Number} index
     * @return {Boolean}
     */
    beforeSelection: function(combo, record, index) {
        return record.get(this.booleanField) !== true;
    }

});
