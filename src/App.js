import React from 'react';
import './App.css';


export class App extends React.Component{
  render(){
    return (
      <div className="container" id="wrapper">
          <h1>Currency Converter</h1>
          <div className='input'>
            <input type="number"></input>
            <p>to</p>
            <input type="number"></input>
          </div>
          <button className='btn-primary'>Convert</button>
          <span id="result">Placeholder</span>
      </div>
    );
  }
}

export default App;
