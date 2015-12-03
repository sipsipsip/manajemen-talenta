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

// Component
var TableTalent = require('../components/TableTalent.react');


var MainPage = React.createClass({
    render: function(){
        return (
            <Row>
                <Col lg={12}>
                    <TableTalent source="pegawai.json"/>
                    <TableTalent source="pegawai2.json"/>
                </Col>
            </Row>
        )
    }
});


module.exports = MainPage;