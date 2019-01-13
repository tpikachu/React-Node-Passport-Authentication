import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect} from "react-router-dom";

import SignIn from "./views/SignIn/_SignIn.jsx";
import SignUp from "./views/SignUp/SignUp.jsx";
import "assets/css/material-dashboard-react.css?v=1.5.0";

import indexRoutes from "routes/index.jsx";
import { Provider } from 'react-redux'
import {store} from './store'

const hist = createBrowserHistory();

const token = localStorage.getItem('auth_jwt_token');

if (token) {
  store.dispatch({type: 'AUTH_USER'})
}

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => (
    store.getState().auth.authenticated === true
      ? <Component {...props} />
      : <Redirect to={{
          pathname: '/signin',
          state: { from: props.location }
        }} />
  )} />
)
/*
{
  indexRoutes.map((prop, key) => {
    return <PrivateRoute path={prop.path} component={prop.component} key={key} isauth={store.getState().auth.Authenticated}/>;
  })
}*/
ReactDOM.render(
  <Provider store={store}>
    <Router history={hist}>
        <Switch>
          <Route path="/signin" exact component={SignIn} />
          <Route path="/signup" exact component={SignUp} />
          {
              indexRoutes.map((prop, key) => {
              return <PrivateRoute path={prop.path} component={prop.component} key={key}/>;
            })
          }
          <Route path="*" exact component={SignIn} />
        </Switch>
      </Router>
  </Provider>
    ,
  document.getElementById("root")
);
