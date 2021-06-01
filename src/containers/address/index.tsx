import React, { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { updateAddress } from '../../redux';

import MemoizedAddressTX from './AddressTxs';
import MemoizedAddressUTXO from './AddressUTXOs';


const localAddressState = {
    address: ""
}


const Address = () => {
  const [localAddress, setLocalAddress] = useState(localAddressState);
  const dispatch = useDispatch();
  const searchAddressInputRef = useRef<any>(null);

  /**
   * When search button is triggered, this method is responsible for updating the address in the
   * redux store as well as fetching the details about the block.
   */
  const onSearchAddress = () => {
    const ref = searchAddressInputRef.current
    if (ref?.value){
      const address = ref.value;
      // fetchAddressTxDetails({ address })
      dispatch(updateAddress({ address }))
    }
  }

  /**
  * Updates the state of address and maintains a text on the searching area.
  * The value of `<input>` is derived from the address state.
  * @param event : Default event handler.
  */
  const onChangeSearchValue = (event) => {
    const { value }  = event.target
    // @ts-ignore
    setLocalAddress({ address: value })
  }

  const renderSearch = () => {  
    return(
      <div className="mb-4">
        <h1 className="title">Address Information</h1>
        <div className="field has-addons is-12">
          <div className="control is-expanded">
            <input
              value={localAddress.address}
              onChange={onChangeSearchValue}
              ref={searchAddressInputRef}
              className="input is-large"
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="control">
            <a className="button is-link is-large" onClick={onSearchAddress}>
              Search
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="">
      {renderSearch()}
      <MemoizedAddressTX address={localAddress.address} />
      <MemoizedAddressUTXO address={localAddress.address} />
    </div>      
  );


}

export default Address