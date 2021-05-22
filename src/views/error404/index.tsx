import React from 'react';
import { Helmet } from 'react-helmet-async';


class Error404 extends React.Component<{}, {}>{
  render(){
    return (
      <div className="App">
        <Helmet
            titleTemplate="%s - CashWeb"
            defaultTitle="CashWeb"
          >
            <meta name="description" content="404 Page: A CashWeb application" />
        </Helmet>
        <div>
          404
        </div>
      </div>
    )
  }
}

export default Error404;