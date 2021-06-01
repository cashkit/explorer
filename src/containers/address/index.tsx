import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect'

import { updateAddress, RootState } from '../../redux';

import MemoizedAddressTX from './AddressTxs';
import MemoizedAddressUTXO from './AddressUTXOs';


const localAddressState = {
    address: ""
}

/**
 * Fetch the value of address from the redux store.
 */
 const addressSelector = createSelector(
  (state: RootState) => state.AddressReducer,
  AddressReducer => AddressReducer.address
)

interface AddressProps {
  hidden: boolean
}

const Address = (props: AddressProps) => {
  const [localAddress, setLocalAddress] = useState(localAddressState);
  const dispatch = useDispatch();
  const searchAddressInputRef = useRef<any>(null);
  const resAddr = useSelector(addressSelector)

  /**
  * Acts as ComponentWillReceiveProps, listens to changes to resAddr and updates the local state.
  * if the value is changed.
  */
  //  useEffect(() => {
  //   if (resAddr && resAddr != ""){
  //     setLocalAddress({ address: resAddr })
  //   }
  // // eslint-disable-next-line
  // }, [])

  /**
  * Acts as ComponentWillReceiveProps, listens to changes to resAddr and updates the local state.
  * if the value is changed.
  */
  useEffect(() => {
    if (resAddr && resAddr != ""){
      setLocalAddress({ address: resAddr })
    }
  // eslint-disable-next-line
  }, [resAddr])

  /**
   * When search button is triggered, this method is responsible for updating the address in the
   * redux store as well as fetching the details about the block.
   */
  const onSearchAddress = () => {
    const ref = searchAddressInputRef.current
    if (ref?.value){
      const address = ref.value;
      // TODO: Add other checks as welk.
      if (address != "") {
        console.log("Updating?")
        dispatch(updateAddress({ address }))
        // setLocalAddress({ address })
      }
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

  if (props.hidden) return <div/>
  console.log("Rendering Address", resAddr)

  return (
    <div className="section">
      {renderSearch()}
      <MemoizedAddressTX address={resAddr} />
      <MemoizedAddressUTXO address={resAddr} />
    </div>      
  );


}

export default Address