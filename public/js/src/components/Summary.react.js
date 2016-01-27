
var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('lodash');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;
var math = require('mathjs');


var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Table = ReactBootstrap.Table;
var Td = ReactBootstrap.Td;
var Tr = ReactBootstrap.Tr;
var Button = ReactBootstrap.Button;

var Select = require('react-select');


var Component = React.createClass({
    getInitialState: function(){
        return {
            data: null
        }
    },

    loadData: function(){
        $.ajax({
            method: 'GET',
            url: 'http://localhost:3000/kantor/talent/public/api/v1/talent-group/'+ this.props.params.talent_group_id +'/summary',
            cache: false,
            success: function(data){
                this.setState({data: null});
                this.setState({data: data}, this._makeCluster);
            }.bind(this)
        })
    },
    componentDidMount: function(){
        this.loadData();
    },
    _makeCluster: function(){
        var total_pegawai = 0;

        this.state.data.sections.map(function(item,i){
            total_pegawai+= item.scores.length;
        });


        var cluster = this.state.data.sections.map(function(item,i){
            var kelas = {};
                kelas.nama = item.title;
                kelas.jumlah = item.total_pegawai;
                kelas.presentase = (item.total_pegawai / total_pegawai * 100).toFixed();
                return kelas;
        });

        this.setState({cluster: cluster});

    },
    _makeGeneralTable: function(){
        var data = this.state.cluster;
        if(data == null){
            return;
        }

        var node = data.map(function(item, i){
            return(<tr key={i}><td>{item.nama}</td><td>{item.jumlah}</td><td>{item.presentase + '%'}</td></tr>)
        });

        return node;
    },



    _makeGeneralKuadranTable: function(){
        if(this.state.data == null){
            return;
        }
        var data = this.state.data.sections;
        var component = this;

        kelas_with_kuadran = data.map(function(kelas){
            score_with_kuadran = kelas.scores.map(function(score,i){
                score.kuadran = component._getKuadran(score, kelas.scores);
                return score;
            });

            result = {}
            result.nama = kelas.title;
            result.scores = score_with_kuadran;
            result.sembilan = _.where(score_with_kuadran, {kuadran: 9});
            return result;
        });

        total_sembilan = 0;

        kelas_with_kuadran.map(function(item,i){
            total_sembilan += item.sembilan.length;
        })

        var node = kelas_with_kuadran.map(function(kelas, i){
            return (<tr key={i}><td>{kelas.nama}</td><td>{kelas.sembilan.length}</td><td>{((parseInt(kelas.sembilan.length) / total_sembilan)*100).toFixed() + '%'}</td></tr>)
        })


        return node;

    },

    _makeKuadranMiddle: function(){
        if(this.state.data == null){
            return;
        }
        var data = this.state.data.sections;
        var component = this;

        kelas_with_kuadran = data.map(function(kelas){
            score_with_kuadran = kelas.scores.map(function(score,i){
                score.kuadran = component._getKuadran(score, kelas.scores);
                return score;
            });

            result = {}
            result.nama = kelas.title;
            result.scores = score_with_kuadran;
            result.sembilan = _.where(score_with_kuadran, {kuadran: 9});
            result.lima = _.where(score_with_kuadran, {kuadran: 5});
            result.delapan = _.where(score_with_kuadran, {kuadran: 8});
            return result;
        });

        total_sembilan = 0;
        total_lima = 0;
        total_delapan = 0;

        kelas_with_kuadran.map(function(item,i){
            total_sembilan += item.sembilan.length;
            total_lima += item.lima.length;
            total_delapan += item.delapan.length;
        });

        total_in_sembilan = [];
        total_in_delapan = [];
        total_in_lima = [];
        kelas_with_kuadran.map(function(kelas,i){
            kelas.sembilan.map(function(score,i){
                total_in_sembilan.push(score);
            });

            kelas.delapan.map(function(score,i){
                total_in_delapan.push(score);
            })

            kelas.lima.map(function(score,i){
                total_in_lima.push(score);
            });
        });

        var total = total_in_sembilan.length + total_in_delapan.length + total_in_lima.length;

        var node = (
            <tbody>
                <tr><td>{'V'}</td><td>{total_in_lima.length}</td><td>Kompetensi rendah kinerja tinggi</td><td>{(total_in_lima.length/total * 100).toFixed() + '%'}</td></tr>
                <tr><td>{'VIII'}</td><td>{total_in_delapan.length}</td><td>Kompetensi sedang kinerja tinggi</td><td>{(total_in_delapan.length/total * 100).toFixed() + '%'}</td></tr>
                <tr><td>{'IX'}</td><td>{total_in_sembilan.length}</td><td>Kompetensi tinggi kinerja tinggi</td><td>{(total_in_sembilan.length/total * 100).toFixed() + '%'}</td></tr>
            </tbody>
        );

        return node;


    },



    _getKuadran: function(talentscore, talentscores){
        helper = {};
        items = talentscores.map(function(item,i){
                    return parseInt(item.ku)+parseInt(item.ki)
                });

        helper.max_kompetensi = _.max(items);
        helper.min_kompetensi = _.min(items);
        helper.total_kompetensi = _.sum(items);
        helper.average_kompetensi = _.sum(items) / items.length;
        helper.std_kompetensi = math.std(items);
        helper.constant = 1.036;
        helper.alpha_high = helper.average_kompetensi + (helper.constant*helper.std_kompetensi);
        helper.alpha_low = helper.average_kompetensi + (-helper.constant * helper.std_kompetensi);

        var item = talentscore;

            item.rangeKompetensi = (parseInt(item.ku) + parseInt(item.ki)) > helper.alpha_high ? "tinggi" : (parseInt(item.ku) + parseInt(item.ki)) < helper.alpha_low ? "rendah" : "sedang";
            item.rangeNKP = (parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi";


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

            return kuadran;

    },
    render: function(){
        this._makeGeneralKuadranTable();
        return (
        <div>
            <div className="col-lg-3"></div>
            <div className="col-lg-6">
                <h4>Tabel Komposisi Pegawai</h4>
                <table className="table table-stripped">
                    <thead>
                        <th>Kelas</th>
                        <th>Jumlah</th>
                        <th>Presentase</th>
                    </thead>
                    <tbody>
                    {this._makeGeneralTable()}
                    </tbody>
                </table>

                <h4>Tabel Hasil Pemetaan</h4>
                <table className="table table-stripped">
                    <thead>
                        <th>Kelas</th>
                        <th>Jumlah</th>
                        <th>Keterangan</th>
                        <th>Presentase</th>
                    </thead>
                    {this._makeKuadranMiddle()}
                </table>

                <h4>Tabel Komposisi Tabel Kuadran Sembilan</h4>
                <table className="table table-stripped">
                    <thead>
                        <th>Kelas</th>
                        <th>Jumlah</th>
                        <th>Presentase</th>
                    </thead>
                    <tbody>
                    {this._makeGeneralKuadranTable()}
                    </tbody>
                </table>
            </div>
          </div>
        )

    }

});

module.exports = Component;

