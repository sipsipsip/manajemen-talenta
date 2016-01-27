var math = require('mathjs');
var _ = require('lodash');

var KompetensiHelper = function(data){
    var helper = {};
    items_active = _.where(data, {active: "1"});
    var items = items_active.map(function(item,i){
        return parseInt(item.ku)+parseInt(item.ki)
    });

    helper.max_kompetensi = _.max(items);
    helper.min_kompetensi = _.min(items);
    helper.total_kompetensi = _.sum(items);
    helper.average_kompetensi = parseFloat((_.sum(items) / items.length));
    helper.std_kompetensi = items.length ? parseFloat(math.std(items)) : 0;
    helper.constant = 1.036;
    helper.alpha_high = parseFloat(helper.average_kompetensi + (helper.constant*helper.std_kompetensi));
    helper.alpha_low = parseFloat(helper.average_kompetensi + (-helper.constant * helper.std_kompetensi));
    helper.tale_area_kompetensi = 0.15;

    return helper;
}

module.exports = KompetensiHelper;