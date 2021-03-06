import React, { Component } from 'react';
import Login from "./Login"
import Content from "./VoterComponents/Content"
import organizer from "./OrganizerComponents/Organizer";
import Organizer from './OrganizerComponents/Organizer';
var ReactRouter = require('react-router-dom');
var Router = ReactRouter.BrowserRouter;
var Route = ReactRouter.Route;
var Switch = ReactRouter.Switch;


class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path = "/" exact component= {Login} />
          <Route path = "/voter/Current Elections"  component = {Content} />
          <Route path = "/voter/Past Elections"  component = {Content} />
          <Route path = "/voter/Upcoming Elections" exact component = {Content} />
          <Route path = "/organizer/Create" exact component = {Organizer}/>
          <Route path = "/organizer/MyElection"  component = {Organizer}/>
        </Switch>
      </Router>
      )
  }
}

export default App;
