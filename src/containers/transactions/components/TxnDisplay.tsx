import React from 'react';

export interface TxnDisplayInterface {
  transaction: string,
  onClickTransaction: Function
}

/**
 * @param transaction: Transaction hash
 * @param onClickTransaction: Callback function for click event on transaction hash.
 * @returns 
*/
export const TxnDisplay = ({transaction, onClickTransaction}: TxnDisplayInterface ) => {
  return (
    <p key={transaction}>
      transaction: <a onClick={() => onClickTransaction(transaction)} className="content">{transaction}</a>
    </p>
  )
}