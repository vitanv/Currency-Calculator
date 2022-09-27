import React from 'react';
import './App.css';



export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      from:"USD",
      to:"EUR",
      rate:1,
      amount:0,
    }
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeFrom.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
  }
  componentDidMount() {
    fetch('https://api.exchangerate.host/convert?from='+this.state.from+'&to='+this.state.to)
        .then(response => response.json())
        .then(data => {
          this.setState({rate:data.result});
        });
  }

  changeFrom = (value) =>{
    this.setState({from: value});
  }

  changeTo = (value) =>{
    this.setState({to: value});
  }

  changeAmount = (value) =>{
    this.setState({amount:value});
  }

  render(){
    return (
      <div className="container" id="wrapper">
          <h1>Currency Converter</h1>
          <div className='input'>
            <select id="from-currency" onChange={(e) => this.changeFrom(e.target.value)}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
            </select>
            <p>to</p>
            
            <select id="to-currency" onChange={(e) => this.changeTo(e.target.value)}>
              <option value="EUR">EUR</option>
              <option value="USD">USD</option>
              <option value="GBP">GBP</option>
            </select>
          </div>
          <input type="number" onChange={(e) => this.changeAmount(e.target.value)}></input>
          <button className='btn-primary'>Convert</button>
          <span id="result">{this.state.rate * this.state.amount}</span>
      </div>
    );
  }
}

export default App;
