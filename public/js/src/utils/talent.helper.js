var Helper = require('./kompetensi.helper');


module.exports = {
    parseKuadran: function(score){
        var helper = Helper(score);
        var scores_with_kuadran;
        var component = this;
        scores_with_kuadran = score.map(function(item){
            var total_kompetensi = parseInt(item.ku) + parseInt(item.ki);
            item.rangeKompetensi = total_kompetensi > parseInt(helper.alpha_high) ? "tinggi" : parseInt(item.ku + item.ki) < parseInt(helper.alpha_low) ? "rendah" : "sedang";
            item.rangeNKP = (parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi";
            item.kuadran = component.getKuadran(item);

            return item;
        });
        return scores_with_kuadran;
    },
    getKuadran: function(score){
        var item = score;
        // Kuadran
        kuadran = 0;

        if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "tinggi"){
            kuadran = 9
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "tinggi"){
            kuadran = 8
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "tinggi"){
            kuadran = 7
        } else if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "sedang"){
            kuadran = 6
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "sedang"){
            kuadran = 5
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "sedang"){
            kuadran = 4
        } else if(item.rangeKompetensi == "tinggi" && item.rangeNKP == "rendah"){
            kuadran = 3
        } else if(item.rangeKompetensi == "sedang" && item.rangeNKP == "rendah"){
            kuadran = 2
        } else if(item.rangeKompetensi == "rendah" && item.rangeNKP == "rendah"){
            kuadran = 1
        }
        console.warn('score', score);
        return kuadran;
    },
}