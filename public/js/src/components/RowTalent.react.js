var React = require('react');
var ReactDOM = require('react-dom');

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



var RowTalent = React.createClass({
    getInitialState: function(){
        return {
            ku: 0,
            ki: 0,
            nkp: 0
        }
    },
    _onChange: function(field, e){
        var newState = this.state;
        newState[field] = parseInt(e.target.value);
        this.setState(newState, this.props.onValueChange(newState));
    },
    componentDidMount: function(){
        this.setState({
            nama: this.props.nama,
            nip: this.props.nip,
            unit: this.props.unit,
            usia: 30,
            nama_jabatan: this.props.nama_jabatan,
            eselon: this.props.eselon,
            ku: this.props.ku,
            ki: this.props.ki,
            nkp: this.props.nkp
        });
    },
    _getKuadran: function(){
        kuadran = 0;

        if(this.props.rangeKompetensi == "tinggi" && this.props.rangeNKP == "tinggi"){
            kuadran = 9
        } else if(this.props.rangeKompetensi == "sedang" && this.props.rangeNKP == "tinggi"){
            kuadran = 8
        } else if(this.props.rangeKompetensi == "rendah" && this.props.rangeNKP == "tinggi"){
            kuadran = 7
        } else if(this.props.rangeKompetensi == "tinggi" && this.props.rangeNKP == "sedang"){
            kuadran = 6
        } else if(this.props.rangeKompetensi == "sedang" && this.props.rangeNKP == "sedang"){
            kuadran = 5
        } else if(this.props.rangeKompetensi == "rendah" && this.props.rangeNKP == "sedang"){
            kuadran = 4
        } else if(this.props.rangeKompetensi == "tinggi" && this.props.rangeNKP == "rendah"){
            kuadran = 3
        } else if(this.props.rangeKompetensi == "sedang" && this.props.rangeNKP == "rendah"){
            kuadran = 2
        } else if(this.props.rangeKompetensi == "rendah" && this.props.rangeNKP == "rendah"){
            kuadran = 1
        }
  
    },
    render: function(){
        this._getKuadran();
        return (
            <tr>
                <td>{this.props.no}</td>
                <td>{this.props.nama}</td>
                <td>{this.props.nip}</td>
                <td>{this.props.usia}</td>
                <td>{this.props.unit}</td>
                <td>{this.props.nama_jabatan}</td>
                <td>{this.props.eselon}</td>
                <td>
                    <input type="number" className="form-control" value={this.state.ku} onChange={this._onChange.bind(null, 'ku')}/>
                </td>
                <td>
                    <input type="number" className="form-control" value={this.state.ki} onChange={this._onChange.bind(null, 'ki')}/>
                </td>
                <td>
                    <input type="number" className="form-control" disabled="disabled" value={parseInt(this.state.ku)+parseInt(this.state.ki)} onChange={this._onChange.bind(null, 'kom')}/>
                </td>
                {/*<td>zscore = {this.props.zScore}</td>*/} 
                <td>{this.props.rangeKompetensi}</td>
                <td>
                    <input type="number" className="form-control" value={this.state.nkp} onChange={this._onChange.bind(null, 'nkp')}/>
                </td>
                <td>
                    {this.props.rangeNKP}
                </td>
                <td>
                    kuadran {kuadran}
                </td>
            </tr>
        )
    }
});


module.exports = RowTalent;