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



var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;

// Component
var TableTalent = require('../components/TableTalent.react');

var TS = require('../services/TalentService')

var TalentGroup = React.createClass({

    getInitialState: function(){
        return {
            sections: []
        }
    },

    _loadDataSectionIds: function(){
        TS.loadSectionOfGroup(this.props.params.talent_group_id).then(this._sectionsLoaded);
    },

    _sectionsLoaded: function(data){
        this.setState({sections: []});
        this.setState({sections: data});
    },

    componentDidMount: function(){
        this._loadDataSectionIds();
    },

    render: function(){
        var component = this
        return (
            <Row>
                <Col lg={12}>
                    <a href={"report?group="+this.props.params.talent_group_id} className="btn btn-warning">Lihat Report</a>
                    <hr/>
                    <Tabs>
                        <TabList>
                            {this.state.sections.map(function(section,i){
                                return (<Tab key={i}>{section.title}</Tab>)
                            })}
                        </TabList>

                        {this.state.sections.map(function(section, i){
                            return (<TabPanel key={i}><TableTalent groupID={component.props.params.talent_group_id} sectionID={section.id}/></TabPanel>)
                        })}
                    </Tabs>

                </Col>
            </Row>
        )

    }

});

module.exports = TalentGroup;