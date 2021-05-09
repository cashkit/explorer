import React from 'react';
import { hot } from 'react-hot-loader/root';

import * as grpcWeb from "grpc-web";
import * as bchrpc from './protos/BchrpcServiceClientPb';
import * as bchrpc_pb from './protos/bchrpc_pb';

import './App.css';


interface AppProps {
  
}

interface AppState {
  mempoolSize: number | undefined,
  error: string | undefined
}

class App extends React.Component<AppProps, AppState>{

  public client: bchrpc.bchrpcClient;

  constructor(props: any){
    super(props)
    this.state ={
      mempoolSize: undefined,
      error: undefined
    }
    this.client = new bchrpc.bchrpcClient('http://localhost:8080')
  }


  componentDidMount(){
    this.getMempoolInfo().then((res) => {
      this.setState({
        mempoolSize: res.getSize(),
        error: undefined
      })
    }).catch((err) => {
      this.setState({error: JSON.stringify(err) })
    })
  }
  
  public getMempoolInfo(): Promise<bchrpc_pb.GetMempoolInfoResponse> {
    return new Promise((resolve, reject) => {
        this.client.getMempoolInfo(
            new bchrpc_pb.GetMempoolInfoRequest(),
            null,
            (err: grpcWeb.Error, response: bchrpc_pb.GetMempoolInfoResponse) => {
                if (err !== null) { reject(err); } else {
                    resolve(response!);
                }
            }
        );
    });
  }

  renderError = () => {
    const { error } = this.state;
    if (error) {
      return (
        <h5 style={{ backgroundColor: 'rgb(255, 100, 100)', margin: 0}}>
          Error: {error}
        </h5>
      )
    }
    return undefined
  }
  
  render(){
    const { mempoolSize } = this.state;
    return (
      <div className="App">
        <header className="App-header" style={{display: 'flex', alignItems: 'stretch'}}>
          {this.renderError()}
          <h1>
              Cash Kit
          </h1>
        </header>
        <body>
          <p>
              Mempool Size: <code>{mempoolSize}</code>
          </p>
        </body>
      </div>
    );
  }
}

export default hot(App);
