"use strict";
var SingleSettingsSingleTags = (function () {
    function SingleSettingsSingleTags() {
    }
    SingleSettingsSingleTags.prototype.satisfaces = function (rulet, args) {
        this._rulet = rulet;
        var satisfaces = args && args.length === 2 && args[0] && args[1] && typeof args[0] === 'object' && args[1] instanceof Array;
        if (satisfaces) {
            this._config = args[0];
            this._tags = args[1];
        }
        return satisfaces ? true : false;
    };
    SingleSettingsSingleTags.prototype.getConfiguration = function () {
        return this._rulet.createConfiguration(this._config, this._tags);
    };
    return SingleSettingsSingleTags;
}());
exports.SingleSettingsSingleTags = SingleSettingsSingleTags;
