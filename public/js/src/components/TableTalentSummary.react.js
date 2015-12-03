
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



var TableTalentSummary = React.createClass({

	_olahData: function(){
		kuadran = {};
		kuadran.sembilan = this.props.data.filter(function(item){
			return item == 9;
		});
		kuadran.delapan = this.props.data.filter(function(item){
			return item == 8;
		});

		console.log(kuadran)
	},
    render: function(){
    	this._olahData();
        return (
            <div>
        		       
            </div>
        )
    }
});


module.exports = TableTalentSummary;