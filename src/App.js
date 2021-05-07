import React from 'react'
import ExcelToJson from './exceltojson'

class App extends React.Component  {
    state = []
    render(){
        return (
            <div className="App">
                <ExcelToJson 
                />
            </div>
        );
    }
}

export default App;
