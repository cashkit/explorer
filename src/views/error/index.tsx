import React from 'react';


class Error extends React.Component<{}, {}>{
    render(){
        return (
            <div className="App">
                <header className="App-header" style={{display: 'flex', alignItems: 'stretch'}}>
                    <h1>
                        Cash Kit
                    </h1>
                </header>
                <div>
                    404
                </div>
            </div>
        )
    }
}

export default Error;