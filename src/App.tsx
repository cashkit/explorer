import React, {Suspense} from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';

import {Landing} from './views';

import { store } from './redux';
import 'normalize.css';
import './App.css';

import "../node_modules/bulma/bulma.sass";
import './App.sass'

const Error = React.lazy(() => import('./views/error'));


class CashWeb extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <HelmetProvider>
          <React.StrictMode>
            <Suspense fallback={<div />}>
              <BrowserRouter>
                <Helmet
                    titleTemplate="%s - CashWeb"
                    defaultTitle="CashWeb"
                  >
                    <meta name="description" content="A CashWeb application" />
                </Helmet>
                <Switch>
                  <Route exact path={'/'} component={Landing} />;
                  <Route component={Error} />;
                </Switch>
              </BrowserRouter>
            </Suspense>
          </React.StrictMode>
        </HelmetProvider>
			</Provider>
    );
  }
}


export default hot(CashWeb);

