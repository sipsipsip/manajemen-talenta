var React = require('react');
var ReactDOM = require('react-dom');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var Link = ReactRouter.Link;

var ReactBootstrap = require('react-bootstrap');
var Row = ReactBootstrap.Row;
var Col = ReactBootstrap.Col;


// Pages
var MainPage = require('./pages/Main.page');
var TalentGroup = require('./components/TalentGroup.react');
var Summary = require('./components/Summary.react');

var App = React.createClass({

	render: function(){
		return (
        <div className="container-fluid">
          {this.props.children}
				</div>
			)
	}
});

var NotFound = React.createClass({
  
  render: function(){
    return (
        <div>
          Route tidak ditemukan
        </div>
      )
  }
})


var routes = (
    <Route path="/" component={App}>
      <Route path="main" component={MainPage} />
      <Route path="talent-group/:talent_group_id/view" component={TalentGroup}/>
      <Route path="talent-group/:talent_group_id/summary" component={Summary} />
      <Route path="*" component={NotFound}/>
    </Route>
  );

ReactDOM.render(<Router>{routes}</Router>, document.getElementById('react-render'));