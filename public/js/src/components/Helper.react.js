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
	            MAX : {this.props.helper.max_kompetensi} |
	            MIN : {this.props.helper.min_kompetensi} |
	            TOTAL : {this.props.helper.total_kompetensi} |
	            AVERAGE : {this.props.helper.average_kompetensi} |
	            TALE AREA : {this.props.helper.tale_area_kompetensi * 100 + '%'} |
	            STD : {this.props.helper.std_kompetensi} |
	            ALPHA (hi) : {this.props.helper.alpha_high} |
	            ALPHA (lo) : {this.props.helper.alpha_low}
            </div>
        )
    }
});


module.exports = HelperKompetensi;