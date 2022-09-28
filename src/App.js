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
    this.createList = this.createList.bind(this);
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

  createList = () =>{
    let list = ["USD","GBP","EUR"];
    let option = [];
    for(let i = 0; i < 3;i++){
      option.push(<option value={list[i]}>{list[i]}</option>)
    }
    return option;
  }

  render(){
    return (
      <div className="container" id="wrapper">
          <h1>Currency Converter</h1>
          <div className='input'>
            <select id="from-currency" onChange={(e) => this.changeFrom(e.target.value)}>
              {this.createList()} 
            </select>
            <p>to</p>
            
            <select id="to-currency" onChange={(e) => this.changeTo(e.target.value)}>
              {this.createList()}
            </select>
          </div>
          <input type="number" onChange={(e) => this.changeAmount(e.target.value)}></input>
          <button className='btn-primary'>Convert</button>
          <span id="result">{this.state.rate * this.state.amount} at a rate of {this.state.rate} {this.state.to} to 1 {this.state.from} </span>
      </div>
    );
  }
}

export default App;
