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

var RowTalent = require('../components/RowTalent.react');




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

            }
        }
    },
    loadData: function(){
        $.ajax({
            method: 'GET',
            url: 'json/'+this.props.source,
            cache: false,
            success: function(data){
                this.setState({items: data}, this._populateHelper);
            }.bind(this)
        })
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
        helper.std_kompetensi = 0.33333333;
        helper.constant = 1.036;
        helper.alpha_high = helper.average_kompetensi + (helper.constant*helper.std_kompetensi);
        helper.alpha_low = helper.average_kompetensi + (-helper.constant * helper.std_kompetensi)

        this.setState(helper);

    },
    render: function(){
        var component = this;
        return (
            <div>
                <div>
                    <h4>Helper Kompetensi</h4>
                    MAX : {this.state.helper.max_kompetensi} |
                    MIN : {this.state.helper.min_kompetensi} |
                    TOTAL : {this.state.helper.total_kompetensi} |
                    AVERAGE : {this.state.helper.average_kompetensi} |
                    TALE AREA : {this.state.helper.tale_area_kompetensi * 100 + '%'} |
                    STD : {this.state.helper.std_kompetensi} |
                    ALPHA (hi) : {this.state.helper.alpha_high} |
                    ALPHA (lo) : {this.state.helper.alpha_low}
                </div>

                <hr/>
                <table className="table-striped table">
                   {/* <thead>
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
                    */}
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

                                    rangeKompetensi={(item.ku + item.ki) > component.state.alpha_high ? "tinggi" : (item.ku + item.ki) < component.state.alpha_low ? "rendah" : "sedang"}
                                    zScore={((item.ku+item.ki) - component.state.helper.average_kompetensi) / component.state.helper.std_kompetensi}

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