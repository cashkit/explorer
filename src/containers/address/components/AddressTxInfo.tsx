import React from 'react';
import { Transaction, MempoolTransaction } from '../../../protos/bchrpc_pb';


export interface AddressTxInfoProps {
  conf: Array<Transaction>,
  unconf: Array<MempoolTransaction>,
  onClickMetaData: (txHash: Uint8Array | string) => void,
}


export const AddressTxInfo = ({ conf, unconf, onClickMetaData }
  : AddressTxInfoProps) => {
  let ConfirmedTxComponent;
  if (conf){
  ConfirmedTxComponent = conf.map((tx) => {
      const confTx = tx.toObject()
      const details = JSON.stringify(confTx)
      return <div key={details} className="content">{details}</div>
     })
  }
  let UnconfirmedTxComponent;
  if (unconf){
  UnconfirmedTxComponent = unconf.map((tx) => {
      const unConfTx = tx.toObject()
      const details = JSON.stringify(unConfTx)
      return <div key={details} className="content">{details}</div>
     })
  }
return(
  <>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Confirmed Tx List ({conf?.length})</p>
         {ConfirmedTxComponent}
       </article>
     </div>
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Unconfirmed Tx List ({unconf?.length})</p>
         {UnconfirmedTxComponent}
       </article>
     </div>
      
    </div>
  </>
  )
}