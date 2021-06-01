import React from 'react';

enum Sections {
  NODE_INFO = 0,
  LIVE_TRANSACTIONS = 1,
  BLOCK_INFO = 2,
  TRANSACTION_INFO = 3,
  ADDRESS_INFO = 4
}

interface NavigationProps {
  setCurrentSection: Function
}

const Navigation = (props: NavigationProps) => {
  return (
    <aside className="menu" style={{ paddingLeft: 5, paddingTop: 10 }}>
      <p className="menu-label">
        Node
      </p>
      <ul className="menu-list">
        <li><a onClick={() => props.setCurrentSection(Sections.NODE_INFO)}>Node Info</a></li>
        <li><a onClick={() => props.setCurrentSection(Sections.LIVE_TRANSACTIONS)}>Live Transactions</a></li>
      </ul>
      <p className="menu-label">
        Search
      </p>
      <ul className="menu-list">
        <li><a onClick={() => props.setCurrentSection(Sections.ADDRESS_INFO)}>Address</a></li>
        <li><a onClick={() => props.setCurrentSection(Sections.BLOCK_INFO)}>Block</a></li>
        <li><a onClick={() => props.setCurrentSection(Sections.TRANSACTION_INFO)}>Transactions</a></li>
      </ul>

      <p className="menu-label">
        Token
      </p>
      <ul className="menu-list">
        <li><a>SLP</a></li>
      </ul>
  </aside>
  )
}

export {
  Navigation, Sections
}
