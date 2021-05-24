import React, {Suspense} from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import { Provider } from 'react-redux';

import { Landing } from './views';
import { store } from './redux';
import { BASE_URL } from './configs';
import { GrpcManager } from './managers';

import 'normalize.css';
import "../node_modules/bulma/bulma.sass";
import './App.sass'


const Error404 = React.lazy(() => import('./views/error404'));

// Initiate the GrpcManager Instance
GrpcManager.Init({
  url: BASE_URL,
  testnet: false,
  options: null
})

// Root
class CashWeb extends React.Component{
  render(){
    return (
      <Provider store={store}>
        <HelmetProvider>
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
        </HelmetProvider>
			</Provider>
    );
  }
}


export default hot(CashWeb);

