import React from 'react';
import './App.css';



export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      from:"USD",
      to:"EUR",
      rate:1,
    }
  }totalReactPackages
  componentDidMount() {
    fetch('https://api.exchangerate.host/convert?from='+this.state.from+'&to='+this.state.to)
        .then(response => response.json())
        .then(data => {
          this.setState({rate:data.result});
        });
  }
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
          <span id="result">{this.state.rate}</span>
      </div>
    );
  }
}

export default App;
