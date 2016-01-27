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
var Button = ReactBootstrap.Button;



var HelperKompetensi = React.createClass({
    getInitialState: function(){
        return {
            show: false
        }
    },
    toggleShow: function(){
        this.setState({show: !this.state.show});
    },
    render: function(){
         toggleButton = this.state.show ? 'Sembunyikan Helper' : 'Tampilkan Helper';
         show = this.state.show ? {} : {display: 'none'}
         bsStyle = this.state.show ? 'danger' : 'primary'
        return (
            <div>
                <Button bsStyle={bsStyle} onClick={this.toggleShow} bsSize="small" style={{position: 'relative', right: '0px'}}>{toggleButton}</Button>
	            <table className="table table-stripped" style={show}>
	                <thead>
                        <tr>
                          <th>Helper Kompetensi</th>
                          <th>MAX : {this.props.data.max_kompetensi} </th>
                          <th>MIN : {this.props.data.min_kompetensi} </th>
                          <th>TOTAL : {this.props.data.total_kompetensi} </th>
                          <th>AVERAGE : {this.props.data.average_kompetensi.toFixed(2)} </th>
                          <th>TALE AREA : {this.props.data.tale_area_kompetensi * 100 + '%'} </th>
                          <th>Std : {this.props.data.std_kompetensi.toFixed(2)} </th>
                          <th>ALPHA (hi) : {this.props.data.alpha_high.toFixed(2)} </th>
                          <th>ALPHA (lo) : {this.props.data.alpha_low.toFixed(2)}</th>
                        </tr>
	                </thead>
	            </table>

            </div>
        )
    }
});


module.exports = HelperKompetensi;