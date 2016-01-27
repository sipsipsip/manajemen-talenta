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

var SimpleTabs = require('react-simpletabs');


var ReactTabs = require('react-tabs');
var Tab = ReactTabs.Tab;
var Tabs = ReactTabs.Tabs;
var TabList = ReactTabs.TabList;
var TabPanel = ReactTabs.TabPanel;


// Component
var TableTalent = require('../components/TableTalent.react');

var TalentService = require('../services/TalentService');


var MainPage = React.createClass({
    getInitialState: function(){
        return {
            groups: [],
            groups_archived: []
        }
    },
    _loadData: function(){
        TalentService.loadGroupList().then(this._dataLoaded);
    },
    _loadArchivedGroups: function(){
        TalentService.loadArchivedGroupList().then(function(data){this.setState({groups_archived: data})}.bind(this));
    },
    _dataLoaded: function(data){
        console.log(data)
        this.setState({groups: []});
        this.setState({groups: data});
    },
    componentDidMount: function(){
        this._loadData();
    },
    _createGroup: function(){
       if(!this.refs.newTitle.value.length){
        return;
       }

       var properties = {};
       properties.title = this.refs.newTitle.value;
       TalentService.createGroup(properties).then(this._groupCreated);
    },
    _groupCreated: function(data){
        this._loadData();
        this.refs.newTitle.value = '';
    },

    _deleteGroup: function(id){
        var confirm = window.confirm("Semua data pada Talent Group ini akan di hapus. Yakin?");

        if(confirm){
            TalentService.deleteGroup(id).then(this._groupDeleted);
        }
    },
    _groupDeleted: function(){
        this._loadData();
    },

    _duplicateGroup: function(id){
        var confirm = window.prompt("Anda akan menduplikasi Talent Group beserta semua datanya. Beri Nama untuk group baru?");

        if(confirm.length){
            TalentService.duplicateGroup(id, confirm).then(this._loadData);
        }
    },
    _toggleArchiveGroup: function(id){
        TalentService.toggleArchiveGroup(id).then(this._loadData);
        var group = _.where(this.state.groups_archived, {id: id})[0];
        var index = this.state.groups_archived.indexOf(group);
        var nState = this.state.groups_archived.splice(0, index);
        this.setState({groups_archived: nState})
    },
    render: function(){
        component = this;
        return (
            <Row>
                <Col lg={12}>
                    {this.state.groups.map(function(group,i){
                       return (
                           <div key={i} style={{padding:'5px'}} className='panel'>
                                <div className='panel-heading'>
                                    <h4>{group.title}</h4>
                                    <Link style={{margin:'2px'}} to={`talent-group/${group.id}/view`}>
                                        <Button bsSize='small'>lihat</Button>
                                    </Link>
                                    <Button style={{margin:'2px'}} onClick={component._duplicateGroup.bind(null, group.id)} bsSize='small' bsStyle='info'>duplicate</Button>
                                    <a href={'report?group='+group.id}>
                                        <Button bsStyle='warning' bsSize='small'>Report</Button>
                                    </a>
                                    <Button style={{margin:'2px'}} onClick={component._toggleArchiveGroup.bind(null, group.id)} bsSize='small'>archive</Button>
                                    <Button style={{margin:'2px'}} onClick={component._deleteGroup.bind(null, group.id)} bsSize='small' bsStyle='danger'>hapus</Button>
                                </div>
                           </div>
                       );
                    })}
                     <form className="col-lg-6" onSubmit={this._createGroup}>
                        <input placeholder="Judul" ref="newTitle" className="form-control" />
                        <br/>
                        <input type="submit" value="Buat Baru" className="btn btn-primary"/>
                     </form>
                </Col>

                <Col lg={12}>
                <hr/>
                <div>
                    <Button onClick={this._loadArchivedGroups}>Lihat archive</Button>
                </div>
                <div>
                    {this.state.groups_archived.map(function(group,i){
                       return (
                           <div key={i} style={{padding:'5px'}} className='panel'>
                                <div className='panel-heading'>
                                    <h4>{group.title}</h4>
                                    <Link style={{margin:'2px'}} to={`talent-group/${group.id}/view`}>
                                        <Button bsSize='small'>lihat</Button>
                                    </Link>
                                    <Button style={{margin:'2px'}} onClick={component._toggleArchiveGroup.bind(null, group.id)} bsStyle="success" bsSize='small'>unarchive</Button>
                                </div>
                           </div>
                       );
                    })}
                </div>
                </Col>
            </Row>
        )
    }
});


module.exports = MainPage;