
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

var ReactChart = require('react-chartjs');
var Pie = ReactChart.Pie;


var TableTalentSummary = React.createClass({
    getInitialState: function(){
        return {
            pie: []
        }
    },

	_olahData: function(){
        console.warn(this.props.data)

	},
    render: function(){
    	this._olahData();
        return (
            <div>
                <Pie data={this.props.data}/>

            </div>
        )
    }
});


module.exports = TableTalentSummary;