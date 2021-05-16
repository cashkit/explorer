import React, {Suspense} from 'react';
import { hot } from 'react-hot-loader/root';
import { createBrowserHistory } from 'history';
import { Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';

import {Landing} from './views';

import { store } from './redux';
import 'normalize.css';
import './App.css';

const Error = React.lazy(() => import('./views/error'));

const hist = createBrowserHistory();


class CashWeb extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <Suspense fallback={<div />}>
          <Router history={hist}>
            <Switch>
              <Route exact path={'/'} component={Landing} />;
              <Route component={Error} />;
            </Switch>
          </Router>
        </Suspense>
			</Provider>
    );
  }
}


export default hot(CashWeb);

