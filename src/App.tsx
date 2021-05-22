import React, {Suspense} from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { Landing } from './views';

import { store } from './redux';
import 'normalize.css';
// import './App.css';

import "../node_modules/bulma/bulma.sass";
import './App.sass'

const Error404 = React.lazy(() => import('./views/error404'));

/**
 * 
 * React.StrictMode: According to the Docs, React Strict mode currently helps with:
 * - Identifying components with unsafe lifecycles
 * - Warning about legacy string ref API usage
 * - Warning about deprecated findDOMNode usage
 * - Detecting unexpected side effects
 * - Detecting legacy context API
 */

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
                  <Route component={Error404} />;
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

