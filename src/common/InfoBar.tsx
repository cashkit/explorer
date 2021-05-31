import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { createSelector } from 'reselect'
import { RootState } from '../redux';


/**
 * Fetch the value of clientError from the redux store.
 */
 const clientErrorSelector = createSelector(
  (state: RootState) => state.AppReducer,
  AppReducer => AppReducer.clientError
)

export const InfoBar = () => {
  const [ isVisible, setVisible ] = useState(false)
  const clientError = useSelector(clientErrorSelector)

  useEffect(() => {
    if (clientError){
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [clientError])

  const toggleVisible = () => {
    if (isVisible){
      setVisible(!isVisible)
    }
  }

  const renderContent = () => {
    if (isVisible){
      return (
        <>
        <div className="column" style={{ color: 'black' }}>
          {clientError || ""}
        </div>
        <button className="button is-danger" onClick={toggleVisible}>X</button>
        </>
      )
    }
    return <div/>
  }

  return (
    <div className="notification columns" style={{
      color: 'white',
      position: "sticky",
      zIndex: 10,
      left: "50%",
      top: "0%",
      boxShadow: "2px 2px 5px -2px rgba(0,0,0,0.28)"
    }}>
      {renderContent()}
    </div>
  )
}