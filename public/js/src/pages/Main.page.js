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

var SimpleTabs = require('react-simpletabs');


var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


// Component
var TableTalent = require('../components/TableTalent.react');


var MainPage = React.createClass({
    render: function(){
        return (
            <Row>
                <Col lg={12}>
                    <Tabs>
                        <TabList>
                            <Tab>Eselon II</Tab>
                            <Tab>Eselon Lain</Tab>
                        </TabList>

                        <TabPanel>
                            <TableTalent source="pegawai.json"/>
                        </TabPanel>
                        <TabPanel>
                            <TableTalent source="pegawai2.json"/>
                        </TabPanel>
                    </Tabs>
                    
                </Col>
            </Row>
        )
    }
});


module.exports = MainPage;