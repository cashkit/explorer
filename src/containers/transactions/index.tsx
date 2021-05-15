import React from 'react';
import { connect } from 'react-redux';
import { GrpcManager } from '../../managers';
import {updateErrorState} from '../../redux';
import { base64toU8, u8toHex } from '../../utils';

interface TransactionsProps {
   client: GrpcManager
   updateErrorState: Function,
   client_error: string | null
}

interface TransactionsState {
    transactions: any
}

class Transactions extends React.Component<TransactionsProps, TransactionsState>{

  constructor(props: any){
    super(props)
    this.state ={
        transactions: []
    }
  }

  componentDidMount(){
    var that = this;
    this.props.client.subscribeTransactions({ includeMempoolAcceptance: true,
        includeBlockAcceptance: true,
        // includeSerializedTxn: true,
        }).then((res) => {
            res.on('data', function(response){
              let base_tx = response.getUnconfirmedTransaction()?.getTransaction()?.getHash_asB64()
              // @ts-ignore
              let b2u = base64toU8(base_tx).reverse()
              let tx_hash = u8toHex(b2u)
              let txs = [tx_hash, ...that.state.transactions]
              if (txs.length > 10){
                txs.pop()
              }
              that.setState({ transactions: txs})
        });
        // res.cancel()
    }).catch((err) => {
        console.log(err)
        this.props.updateErrorState({client_error: JSON.stringify(err)})
    })
    
  }
  

  onClickTransactionFetcg = () => {
    if (this.state.transactions.length > 1){
        this.props.client.getTransaction({ hash: this.state.transactions[0]
          }).then((res) => {
              console.log(res)
          }).catch((err) => {
            console.log(err)
            this.props.updateErrorState({client_error: JSON.stringify(err)})
        })
      }
  }
  
  // Need to perform the check for `client_error` because once the component is rendered,
  // react tries to rerender/perform life cycles when any(the one component listens to) prop updates
  // and in the parent component we have added a statement to render undefined/some other 
  // component when the value of `client_error` changes. If you remove the check you might see
  // a warning like this:
  // Warning: Can't perform a React state update on an unmounted component.
  // This is a no-op, but it indicates a memory leak in your application.
  render(){
    const { transactions } = this.state;
    const {client_error} = this.props;
    if (client_error !== null){
      return <div></div>
    }
    return (
      <div>
        {transactions.map((transactions, idx) => {
          return  <p key={idx}>
          transactions: <code>{transactions}</code>
          </p>
        })}

      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
	return {
    updateErrorState: (args) => {
      dispatch(updateErrorState(args));
    },
  };
};

const mapStateToProps = state => {
	return {
    client: state.AppReducer.client,
		client_error: state.AppReducer.client_error,
  };
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Transactions);
