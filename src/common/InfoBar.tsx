import React from 'react';


interface InfoErrorProps {
  content: string | null | undefined
}

export const InfoBar = ({content}: InfoErrorProps) => {
  return (
    <div className="notification" style={{
      backgroundColor: "#85f1a5",
      color: 'white',
      position: "sticky",
      zIndex: 1,
      left: "50%",
      top: "0%",
      boxShadow: "2px 2px 5px -2px rgba(0,0,0,0.28)"
    }}>
      {content || ""}
    </div>
  )
}