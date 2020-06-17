import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";


// Components
import Home from '../home'
import Dashboard from '../dashboard/';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
          <Route path = "/dashboard">
            <Dashboard/>
          </Route>
          <Route exact path="/staking">
            <Home />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
