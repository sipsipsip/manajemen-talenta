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



var HelperKompetensi = React.createClass({


    render: function(){
        return (
            <div>
	            <h4>Helper Kompetensi</h4>
	            MAX : {this.props.data.max_kompetensi} |
	            MIN : {this.props.data.min_kompetensi} |
	            TOTAL : {this.props.data.total_kompetensi} |
	            AVERAGE : {this.props.data.average_kompetensi} |
	            TALE AREA : {this.props.data.tale_area_kompetensi * 100 + '%'} |
	            STD : {this.props.data.std_kompetensi} |
	            ALPHA (hi) : {this.props.data.alpha_high} |
	            ALPHA (lo) : {this.props.data.alpha_low}
            </div>
        )
    }
});


module.exports = HelperKompetensi;