import React from 'react';
import { UnspentOutput, SlpTokenMetadata } from '../../../protos/bchrpc_pb';


export interface AddressUTXOInfoProps {
  outputsList: Array<UnspentOutput>,
  tokenMetadataList: Array<SlpTokenMetadata>,
  onClickMetaData: (txHash: Uint8Array | string) => void,
}


export const AddressUTXOInfo = ({ outputsList, tokenMetadataList, onClickMetaData }
  : AddressUTXOInfoProps) => {
  let ConfirmedTxComponent;
  if (outputsList){
  ConfirmedTxComponent = outputsList.map((tx) => {
      const confTx = tx.toObject()
      const details = JSON.stringify(confTx)
      return <div key={details} className="content">{details}</div>
     })
  }
  let tokenMetadataComponent;
  if (tokenMetadataList){
  tokenMetadataComponent = tokenMetadataList.map((tx) => {
      const tokenMetadataListTx = tx.toObject()
      const details = JSON.stringify(tokenMetadataListTx)
      return <div key={details} className="content">{details}</div>
     })
  }
return(
  <>
    <div className="tile is-ancestor">
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Outputs List ({outputsList?.length})</p>
         {ConfirmedTxComponent}
       </article>
     </div>
      <div className="tile is-parent">
       <article className="tile is-child box has-text-left">
         <p className="is-size-4 has-text-weight-medium">Token Metadata List ({tokenMetadataList?.length})</p>
         {tokenMetadataComponent}
       </article>
     </div>
      
    </div>
  </>
  )
}