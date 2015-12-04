var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var _ = require('lodash');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;


var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;
var Table = ReactBootstrap.Table;
var Td = ReactBootstrap.Td;
var Tr = ReactBootstrap.Tr;

var math = require('mathjs');

var RowTalent = require('../components/RowTalent.react');
var HelperKompetensi = require('../components/HelperKompetensi.react');
var TableTalentSummary = require('../components/TableTalentSummary.react');


var TalentSectionService = require('../services/TalentSection.service');



var TableTalent = React.createClass({

    getInitialState: function(){
        return {
            items: [],
            helper:{
                max_kompetensi:0,
                min_kompetensi:0,
                total_kompetensi:0,
                average_kompetensi:0,
                std_kompetensi:0,
                tale_area_kompetensi:0.15,
                alpha_high:0,
                alpha_low:0,
                constant: 1.036

            },
            summary: [
                         {
                             value : 1,
                             label : 'bla',
                             color : 'blue',
                             highlight : 'red',
                         },
                         {
                             value : 4,
                             label : 'bli',
                             color : 'red',
                             highlight : 'blue',
                         }
                     ]
        }
    },
    loadData: function(){
        // $.ajax({
        //     method: 'GET',
        //     url: 'json/'+this.props.source,
        //     cache: false,
        //     success: function(data){
        //         this.setState({items: data}, this._populateHelper);
        //     }.bind(this)
        // })

        TalentSectionService.getTalentScoreList()
        .success(function(res){
                this.setState({items: res}, this._populateHelper);
        }.bind(this))
        .error(function(xhr, status,err){

        }.bind(this));
    },
    componentDidMount: function(){
        this.loadData();
    },
    _rowValueChange: function(rowValue){
        var updated = _.where(this.state.items, {nip: rowValue.nip})[0];
        var index = this.state.items.indexOf(updated);
        var newState = this.state.items;
        newState[index] = rowValue;
        this.setState(newState, this._populateHelper)

        status = (parseInt(rowValue.nkp) < 75) ? "rendah" : (parseInt(rowValue.nkp) < 90) ? "sedang" : "tinggi";
    },
    _populateHelper: function(){
        var helper = this.state.helper;

        items = this.state.items.map(function(item,i){
            return parseInt(item.ku)+parseInt(item.ki)
        });

        helper.max_kompetensi = _.max(items);
        helper.min_kompetensi = _.min(items);
        helper.total_kompetensi = _.sum(items);
        helper.average_kompetensi = _.sum(items) / items.length;
        helper.std_kompetensi = math.std(items);
        helper.constant = 1.036;
        helper.alpha_high = helper.average_kompetensi + (helper.constant*helper.std_kompetensi);
        helper.alpha_low = helper.average_kompetensi + (-helper.constant * helper.std_kompetensi)

        this.setState({helper: helper});

        this.setState({summary: this._getSummaryData()});


    },
    _getSummaryData: function(){
        var items_with_kuadran = this.state.items.map(function(item, i){
            item.rangeKompetensi = (item.ku + item.ki) > this.state.helper.alpha_high ? "tinggi" : (item.ku + item.ki) < this.state.helper.alpha_low ? "rendah" : "sedang";
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

            item.kuadran = kuadran;

            return item;
        }.bind(this));

        var kuadran_only = items_with_kuadran.map(function(item){
            return item.kuadran;
        }) ;

        data = kuadran_only;

		var arr = [];
		data.map(function(item, i){
		    if(arr[item]){
		        arr[item].value++;
		    } else {
		        arr[item] = {};
		        arr[item].value = 1;
		        arr[item].label = item;
		        arr[item].color = 'red';
		        arr[item].highlight = 'blue';
		    }
		});
        chart_data = [];
        arr.map(function(item, i){
            chart_data.push(item)
        });

		console.log(chart_data)

        return chart_data;
    },
    render: function(){
        var component = this;

        return (
            <div>
                <HelperKompetensi data={this.state.helper}/>
                <hr/>

                <hr/>
                <table className="table-striped table">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama Pegawai</th>
                            <th>NIP</th>
                            <th>Usia</th>
                            <th>Unit</th>
                            <th>Nama Jabatan</th>
                            <th>Eselon</th>
                            <th>KU</th>
                            <th>KI</th>
                            <th>Kompetensi</th>
                            <th>Range Kompetensi</th>
                            <th>NKP</th>
                            <th>Range NKP</th>
                            <th>Kuadran</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {this.state.items.map(function(item, i){
                            return (
                                <RowTalent
                                    key={i}
                                    no={i+1}
                                    nama={item.nama}
                                    nip={item.nip}
                                    usia={34}
                                    unit={item.unit}
                                    nama_jabatan={item.nama_jabatan}
                                    eselon={item.eselon}
                                    ku={item.ku}
                                    ki={item.ki}
                                    nkp={item.nkp}

                                    rangeKompetensi={(item.ku + item.ki) > component.state.helper.alpha_high ? "tinggi" : (item.ku + item.ki) < component.state.helper.alpha_low ? "rendah" : "sedang"}
                                    zScore={((item.ku+item.ki) - component.state.helper.average_kompetensi) / component.state.helper.std_kompetensi}
                                    rangeNKP = {(parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi"}

                                    onValueChange={component._rowValueChange}
                                    />
                                )
                        })}
                    </tbody>
                </table>
            </div>
        )
    }
});

module.exports = TableTalent;