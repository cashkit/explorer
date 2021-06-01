import React from 'react';
import { Transaction } from '../../../protos/bchrpc_pb';
import { truncate } from '../../../utils';

export interface TxInfoInputOutputHashesProps {
  inputsList: Array<Transaction.Input.AsObject>,
  outputsList: Array<Transaction.Output.AsObject>,
  onClickAddress: Function
}

export const TxInfoInputOutputHashes = ({ inputsList, outputsList, onClickAddress }
  : TxInfoInputOutputHashesProps) => {
  let InputsComponent;
  if (inputsList){
  InputsComponent = inputsList.map((input) => {
      const addr = input.address
       return <div key={addr} ><a onClick={() => onClickAddress(addr)} className="content">bitcoincash:{addr}</a></div>
     })
  }
  let OutputsComponent;
  if (outputsList){
  OutputsComponent = outputsList.map((output) => {
       const addr = output.address
       return <div key={addr} ><a onClick={() => onClickAddress(addr)} className="content">bitcoincash:{addr}</a></div>
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