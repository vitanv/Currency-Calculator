import React from 'react';
import './App.css';



export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      from:"USD",
      to:"GBP",
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
    if(value == this.state.to){
      this.setState({
        to:this.state.from,
      })
    }
    this.setState({from: value});
  }

  changeTo = (value) =>{
    if(value == this.state.from){
      this.setState({
        from:this.state.to,
      })
    }
    this.setState({to: value});
  }

  changeAmount = (value) =>{
    this.setState({amount:value});
  }

  createList = () =>{
    let list = ["AFA", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR", "BEF", "BZD",
              "BMD", "BTN", "BTC", "BOB", "BAM", "BWP", "BRL", "BND", "BGN", "BIF", "KHR", "CAD", "CVE", "KYD", "XOF",
              "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUC", "CZK", "DKK", "DJF", "DOP", "XCD", "EGP",
              "ERN", "EEK", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL", "DEM", "GHS", "GIP", "GRD", "GTQ", "GNF", "GYD", "HTG",
              "HNL", "HKD", "HUF", "ISK", "INR", "IDR", "IRR", "IQD", "ILS", "ITL", "JMD", "JPY", "JOD", "KZT", "KES", "KWD",
              "KGS", "LAK", "LVL", "LBP", "LSL", "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", 
              "MXN", "MDL", "MNT", "MAD", "MZM", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR",
              "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SVC", "WST", "SAR", "RSD", "SCR",
              "SLL", "SGD", "SKK", "SBD", "SOS", "ZAR", "KRW", "XDR", "LKR", "SHP", "SDG", "SRD", "SZL", "SEK", "CHF", "SYP",
              "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX", "UAH", "AED", "UYU", "UZS", "VUV",
              "VEF", "VND", "YER", "ZMK"];
    let option = [];
    for(let i = 0; i < list.length;i++){
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
              <option value = "USD">USD</option>
              <option value = "GBP">GBP</option>
              {this.createList()} 
            </select>
            <p>to</p>
            
            <select id="to-currency" onChange={(e) => this.changeTo(e.target.value)}>
              <option value = "GBP">GBP</option>
              <option value = "USD">USD</option>
              {this.createList()}
            </select>
          </div>
          <input type="number" onChange={(e) => this.changeAmount(e.target.value)} placeholder="0"></input>
          <span id="result">{this.state.rate * this.state.amount} {this.state.to} at a rate of {this.state.rate}  to 1 {this.state.from} </span>
      </div>
    );
  }
}

export default App;
