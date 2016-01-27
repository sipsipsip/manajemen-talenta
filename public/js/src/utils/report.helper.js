
var talentHelper = require('./talent.helper');

module.exports = function(){
    this.init = function(){
        this.mapKuadran(this.items);
    }

    this.getFromClass = function(data){
        data_active = _.where(data, {active: "1"})
        this.items = talentHelper.parseKuadran(data_active);
        this.init();
        return this;
    }

    this.mapKuadran = function(items){
        var mapped = {};
        mapped.satu = _.where(items, {kuadran: 1});
        mapped.dua = _.where(items, {kuadran: 2});
        mapped.tiga = _.where(items, {kuadran: 3});
        mapped.empat = _.where(items, {kuadran: 4});
        mapped.lima = _.where(items, {kuadran: 5});
        mapped.enam = _.where(items, {kuadran: 6});
        mapped.tujuh = _.where(items, {kuadran: 7});
        mapped.delapan = _.where(items, {kuadran: 8});
        mapped.sembilan = _.where(items, {kuadran: 9});
        this.mapped = mapped;
    }

    this.getDataForBar = function(){
        console.log(this.mapped)
        var data = [];
        for(i = 0; i < 9 ; i ++){
            switch(i){
                case 0:
                    data[i] = this.mapped.satu.length;
                    break;
                case 1:
                    data[i] = this.mapped.dua.length;
                    break;
                case 2:
                    data[i] = this.mapped.tiga.length;
                    break;
                case 3:
                    data[i] = this.mapped.empat.length;
                    break;
                case 4:
                    data[i] = this.mapped.lima.length;
                    break;
                case 5:
                    data[i] = this.mapped.enam.length;
                    break;
                case 6:
                    data[i] = this.mapped.tujuh.length;
                    break;
                case 7:
                    data[i] = this.mapped.delapan.length;
                    break;
                case 8:
                    data[i] = this.mapped.sembilan.length;
                    break;
                default:
            }
         }
         return data;
    }

}

/*
module.exports = {
    init: function(){
        this.mapKuadran();
    },
    getFromClass: function(data){
        console.log('data', data)
        this.items = talentHelper.parseKuadran(data);
        this.init();
        return this;
    },
    mapKuadran: function(items){
        var mapped = {};
        mapped.satu = _.where(items, {kuadran: 1});
        mapped.dua = _.where(items, {kuadran: 2});
        mapped.tiga = _.where(items, {kuadran: 3});
        mapped.empat = _.where(items, {kuadran: 4});
        mapped.lima = _.where(items, {kuadran: 5});
        mapped.enam = _.where(items, {kuadran: 6});
        mapped.tujuh = _.where(items, {kuadran: 7});
        mapped.delapan = _.where(items, {kuadran: 8});
        mapped.sembilan = _.where(items, {kuadran: 9});
        this.mapped = mapped;
    },
    getDataForBar: function(){
        console.log(this.mapped)
        var data = [];
        for(i = 0; i < 9 ; i ++){
            switch(i){
                case 0:
                    data[i] = this.mapped.satu.length;
                    break;
                case 1:
                    data[i] = this.mapped.dua.length;
                    break;
                case 2:
                    data[i] = this.mapped.tiga.length;
                    break;
                case 3:
                    data[i] = this.mapped.empat.length;
                    break;
                case 4:
                    data[i] = this.mapped.lima.length;
                    break;
                case 5:
                    data[i] = this.mapped.enam.length;
                    break;
                case 6:
                    data[i] = this.mapped.tujuh.length;
                    break;
                case 7:
                    data[i] = this.mapped.delapan.length;
                    break;
                case 8:
                    data[i] = this.mapped.sembilan.length;
                    break;
                default:
            }
        }

        return data;
    }

};*/
