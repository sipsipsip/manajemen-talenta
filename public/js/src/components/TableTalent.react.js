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
var Button = ReactBootstrap.Button;

var Select = require('react-select');

var math = require('mathjs');

var RowTalent = require('../components/RowTalent.react');
var HelperKompetensi = require('../components/HelperKompetensi.react');
var TableTalentSummary = require('../components/TableTalentSummary.react');
var TalentChart = require('../components/TalentChart.react');

var TalentSectionService = require('../services/TalentSection.service');
var UserService = require('../services/User.service');
var TalentScoreService = require('../services/TalentScore.service');
var KompetensiHelper = require('../utils/kompetensi.helper');



var TableTalent = React.createClass({

    getInitialState: function(){
        return {
            items: [],
            newUser: {},
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

            }
        }
    },
    loadData: function(){


        TalentSectionService.getTalentScoreList(this.props.sectionID).then(function(data){
            this.setState({items: []});
            this.setState({items: data}, this._populateHelper);
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
        this.setState({items: newState}, this._populateHelper)

        status = (parseInt(rowValue.nkp) < 75) ? "rendah" : (parseInt(rowValue.nkp) < 90) ? "sedang" : "tinggi";
    },
    _populateHelper: function(){
        console.warn('populating', this.state.items)
        help = KompetensiHelper(this.state.items);
        this.setState({helper: help});
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

    createNewTalentScore: function(){
        var talent;
        talent = {};
        talent.section_id = this.props.sectionID;
        talent.nama = this.state.newUser.name;
        talent.nip = this.state.newUser.nip;
        talent.nama_jabatan = 'nama jabatan';
        talent.unit = 'unit';
        talent.eselon = 'eselon';
        talent.ki = 0;
        talent.ku = 0;
        talent.nkp = 0;
        talent.usia = new Date().getFullYear() - parseInt(this.state.newUser.nip.slice(0,4));


        var success = function(data){
            console.log('talent', data);
            this.loadData();
            this.setState({newUser: {}});
        };

        TalentScoreService.create(talent).then(success.bind(this));

    },

    _getListPegawai: function(input, callback){
        console.log(input);
        $.ajax({
            method: 'GET',
            url: 'api/v1/data',
            data: {model: 'pegawai', q: input, q_identifier: 'name'},
            cache: false,
            success: function(data){
                   var result;
                   result = data.map(function(item,i){
                    return {label: item.name, value: item.nip}
                   });


                   callback(null, {
                        options: result,
                   });
            }.bind(this)
        })

    },

    _selectChange: function(newValue){

        UserService.getTalentData(newValue.value).then(function(data){
           this.setState({newUser: data});
        }.bind(this));

    },


    _onChange: function(field, e){
        var newState = this.state;
        newState[field] = parseInt(e.target.value);
        this.setState(newState, this.props.onValueChange(newState));
    },

    _onDeleteTalent: function(){
        this.loadData();
    },
    _onToggleActiveStatus: function(talent){
        var data = {}
        data.nip = talent.nip;
        data.section_id = talent.section_id;
        data.active = parseInt(talent.active) ? 0 : 1;
        $.ajax({
            method: 'POST',
            cache: false,
            data: data,
            url: 'api/v1/talent-score/'+talent.nip+'/update'
        }).then(this.loadData);
    },

    render: function(){
        var component = this;
        return (
            <div>
                <HelperKompetensi data={this.state.helper}/>
                <TalentChart data={this.state.items} />

                <table className="table-striped table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>No</th>
                            <th style={{width:'300px'}}>Nama Pegawai</th>
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
                        {this.state.items.filter(function(item, index){return parseInt(item.active) == 1}).map(function(item, i){
                            return (
                                <RowTalent
                                    key={i}
                                    no={i+1}
                                    nama={item.nama}
                                    nip={item.nip}
                                    usia={new Date().getFullYear() - parseInt(item.nip.slice(0,4))}
                                    unit={item.unit}
                                    nama_jabatan={item.nama_jabatan}
                                    eselon={item.eselon}
                                    ku={item.ku}
                                    ki={item.ki}
                                    nkp={item.nkp}
                                    section_id={component.props.sectionID}
                                    active={item.active}
                                    sectionID={item.section_id}

                                    rangeKompetensi={(parseInt(item.ku) + parseInt(item.ki)) > component.state.helper.alpha_high ? "tinggi" : (parseInt(item.ku) + parseInt(item.ki)) < component.state.helper.alpha_low ? "rendah" : "sedang"}
                                    zScore={((item.ku+item.ki) - component.state.helper.average_kompetensi) / component.state.helper.std_kompetensi}
                                    rangeNKP = {(parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi"}

                                    onValueChange={component._rowValueChange}
                                    onDelete={component._onDeleteTalent}
                                    onToggleActiveStatus={component._onToggleActiveStatus}
                                    />
                                )
                        })}
                    </tbody>
                    <tfoot>
                    {/*
                        <tr>
                            <td></td>
                            <td></td>
                            <td>

                                <Select.Async
                                    value={{value: this.state.newUser.nip, label: this.state.newUser.name}}
                                    loadOptions={this._getListPegawai}
                                    name="pbaru"
                                    onChange={this._selectChange}
                                    />

                            </td>
                            <td>{this.state.newUser.nip}</td>
                            <td>{undefined != this.state.newUser.nip ? new Date().getFullYear() - parseInt( this.state.newUser.nip.slice(0,4)) : ''}</td>
                            <td>{this.state.newUser.unit}</td>
                            <td>{this.state.newUser.nama_jabatan}</td>
                            <td>{this.state.newUser.eselon}</td>
                        </tr>
                        <tr>
                            <td></td>
                            <td></td>
                            <td><Button onClick={this.createNewTalentScore}>Tambah Pegawai</Button></td>
                        </tr>
                        */}
                    </tfoot>
                </table>


                <hr/>
                 <h3>Pegawai Tidak Dipetakan</h3>
                <table className="table table-stripped">
                <thead>
                    <tr>
                        <th></th>
                        <th>No</th>
                        <th style={{width:'300px'}}>Nama Pegawai</th>
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
                    {this.state.items.filter(function(item, index){return parseInt(item.active) == 0}).map(function(item, i){
                        return (
                            <RowTalent
                                key={i}
                                no={i+1}
                                nama={item.nama}
                                nip={item.nip}
                                usia={new Date().getFullYear() - parseInt(item.nip.slice(0,4))}
                                unit={item.unit}
                                nama_jabatan={item.nama_jabatan}
                                eselon={item.eselon}
                                ku={item.ku}
                                ki={item.ki}
                                nkp={item.nkp}
                                section_id={component.props.sectionID}
                                active={item.active}
                                sectionID={item.section_id}

                                rangeKompetensi={(parseInt(item.ku) + parseInt(item.ki)) > component.state.helper.alpha_high ? "tinggi" : (parseInt(item.ku) + parseInt(item.ki)) < component.state.helper.alpha_low ? "rendah" : "sedang"}
                                zScore={((item.ku+item.ki) - component.state.helper.average_kompetensi) / component.state.helper.std_kompetensi}
                                rangeNKP = {(parseInt(item.nkp) < 75) ? "rendah" : (parseInt(item.nkp) < 90) ? "sedang" : "tinggi"}

                                onValueChange={component._rowValueChange}
                                onDelete={component._onDeleteTalent}
                                onToggleActiveStatus={component._onToggleActiveStatus}
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