import React from 'react';
import { Transaction } from '../../../protos/bchrpc_pb';


export interface TxInfoInputOutputHashesProps {
  inputsList: Array<Transaction.Input.AsObject>,
  outputsList: Array<Transaction.Output.AsObject>,
  onClickHash: (txHash: Uint8Array | string) => void,
}


export const TxInfoInputOutputHashes = ({ inputsList, outputsList, onClickHash }
  : { 
    inputsList: Array<Transaction.Input.AsObject>,
    outputsList: Array<Transaction.Output.AsObject>,
    onClickHash: (txHash: Uint8Array | string) => void,
  }) => {
  let InputsComponent;
  if (inputsList){
  InputsComponent = inputsList.map((input) => {
      const addr = input.address
       return <div key={addr} className="content">bitcoincash:{addr}</div>
     })
  }
  let OutputsComponent;
  if (outputsList){
  OutputsComponent = outputsList.map((output) => {
       const addr = output.address
       return <div key={addr} className="content">bitcoincash:{addr}</div>
     })
  }
return(
  <>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Inputs Address List ({inputsList?.length})</p>
         {InputsComponent}
       </article>
     </div>
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Outputs Address List ({outputsList?.length})</p>
         {OutputsComponent}
       </article>
     </div>
      
    </div>
  </>
  )
}