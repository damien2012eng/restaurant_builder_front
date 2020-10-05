import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import Landing from './landing/Landing'

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import Register from "./auth/Register";
import Login from "./auth/Login";
import Profile from "./auth/Profile"
import FeatureEditSection from "./builder/FeatureEditSection";
import List from "./builder/List";
import FeatureAdd from "./builder/FeatureAdd";

ReactDOM.render(
  <React.StrictMode>
      <Router>


          <Switch>
              <Route path="/register" >
                  <Register/>
              </Route>

              <Route path="/login" >
                  <Login/>
              </Route>

              <Route path="/profile/:id" >
                  <Profile/>
              </Route>

              <Route path="/landings">
                  <Landing/>
              </Route>

              <Route path="/editfeatures/:id">
                  <FeatureEditSection/>
              </Route>

              <Route path="/featurelist">
                  <List/>
              </Route>

              <Route path="/addfeatures">
                  <FeatureAdd/>
              </Route>

          </Switch>

      </Router>

  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
