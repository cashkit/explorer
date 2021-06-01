import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { GrpcManager } from '../../managers';
import { updateErrorState } from '../../redux';

import { AddressTxInfo } from './components/AddressTxInfo';
import { Transaction, MempoolTransaction } from '../../protos/bchrpc_pb';


interface AddressTxInfoState {
    conf: Array<Transaction>,
    unconf: Array<MempoolTransaction>,
}

const initialAddressTxState: AddressTxInfoState = {
    conf: [],
    unconf: []
};

interface AddressTXProps {
    address: string
  }

const AddressTX = (props: AddressTXProps) => {
  const { address } = props;
  const [txList, setTransactionsListState] = useState(initialAddressTxState);
  const dispatch = useDispatch();

  /**
   * Acts as ComponentDidMount, tries to fetch blockdetails if address is valid.
   */
  useEffect(() => {
    if (address && address != "") {
        fetchAddressTxDetails({ address })
    }
  // eslint-disable-next-line
  }, [])

  /**
   * Acts as ComponentWillReceiveProps, listens to changes to addr and calls `fetchAddressTxDetails`
   * if the value is changed/updated.
   */
  useEffect(() => {
    address && fetchAddressTxDetails({ address })
  // eslint-disable-next-line
  }, [address])


  /**
   * 
   * @param params{address}: Expects a address and makes an RPC call to update the details
   * using the setState method which later updates children components.
   */
   const fetchAddressTxDetails = ({ address }) => {

    // TODO: Remove the hard coded height.
    GrpcManager.Instance.getAddressTransactions({ address, height: 655653 })
    .then((res) => {
        // Convert the address from base64 to hex.\
        console.log(res)
        const conf = res.getConfirmedTransactionsList()
        const unconf = res.getUnconfirmedTransactionsList()
        
        setTransactionsListState({
            conf: conf || initialAddressTxState.conf,
            unconf: unconf || initialAddressTxState.unconf
        })
    
    }).catch((err) => {
      console.log("[ERR] fetchAddressTxDetails: ", err)
      setTransactionsListState({ ...initialAddressTxState })
      dispatch(updateErrorState({clientError: JSON.stringify(err)}))
    })
  }


  /**
   * Gets the value from the callback functions defined in the memoized components.
   * 
   * @param address : Expects a block hash and makes an RPC call from via the client.
   * The returned data is then used to update local state to be displayed later.
   */
  const onClickMetaData = (address) => {
    fetchAddressTxDetails({ address })
  }

  return (
    <div className="">
      <div className="columns">
        <div className="column">
          <AddressTxInfo {...txList} onClickMetaData={onClickMetaData} />
        </div>
      </div>
    </div>      
  );
}


function areEqual(prevProps, nextProps) {
    /*
    return true if passing nextProps to render would return
    the same result as passing prevProps to render,
    otherwise return false
    */
   if (prevProps.address == nextProps.address){
     return true
   }
   return false
}
  
const MemoizedAddressTX = React.memo(AddressTX, areEqual);

export default MemoizedAddressTX