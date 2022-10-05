import React from 'react';
import './App.css';
import '../node_modules/currency-flags/dist/currency-flags.min.css';
import Select from 'react-select';



export class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      from:"USD",
      to:"GBP",
      rate:1,
      amount:0,
    }
    this.callApi = this.callApi.bind(this);
    this.changeFrom = this.changeFrom.bind(this);
    this.changeTo = this.changeTo.bind(this);
    this.changeAmount = this.changeAmount.bind(this);
    this.createList = this.createList.bind(this);
    this.switchCurrencies = this.switchCurrencies.bind(this);
  }
  componentDidMount = () => {
    this.callApi();
  }

  callApi = () => {
    fetch('https://api.exchangerate.host/convert?from='+this.state.from+'&to='+this.state.to)
        .then(response => response.json())
        .then(data => {
          this.setState({rate:data.result});
        });
  }

  switchCurrencies = () => {
    let temp = this.state.from;
    this.setState({
      from: this.state.to,
      to: temp,
    })
    this.callApi();
  }

  changeFrom = (value) =>{  
    if(value == this.state.to){
      this.setState({
        to:this.state.from,
      });
    }
    this.setState({from: value});
    this.callApi();
  }

  changeTo = (value) =>{
    if(value == this.state.from){
      this.setState({
        from:this.state.to,
      });
    }
    this.setState({to: value});
    this.callApi();
  }

  changeAmount = (value) =>{
    this.setState({amount:value});
  }

  createList = () =>{
    let list = ["AFN", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD","BYN",
              "BZD", "BMD", "BTN", "BOB", "BAM", "BWP", "BRL", "GBP", "BND", "BGN", "BIF", "KHR", "CAD", 
              "CVE", "KYD", "XOF", "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUP","CZK", 
              "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL", 
              "GHS", "GIP", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR","IRR", 
              "IQD", "ILS", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LBP","LSL", 
              "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL","MNT", 
              "MAD", "MZN", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR","PKR", 
              "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SVC", "WST", "SAR","RSD", 
              "SCR", "SLL", "SGD", "SBD", "SOS", "ZAR", "KRW", "LKR", "SHP", "SDG", "SRD","SZL", 
              "SEK", "CHF", "SYP", "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX","UAH", 
              "AED", "UYU", "USD", "UZS", "VUV", "VEF", "VND", "YER", "ZMW"];
    let option = [];
    for(let i = 0; i < list.length;i++){
      option.push({value:list[i], label:<div> <div className={"currency-flag currency-flag-"+list[i].toLowerCase()}></div><p>{list[i]}</p></div>});
    }
    return option;
  }

  render(){
    return (
      <div className='container' id='wraper'>
        <h1 id="title">Currency Converter</h1>
        <div className="container" id="converter">
          <div className='input'>
            <p>From:</p>
            <Select
              value={{ label:<div> <div className={"currency-flag currency-flag-"+this.state.from.toLowerCase()}></div><p>{this.state.from}</p></div>, value: this.state.from }}
              onChange = {(e) => this.changeFrom(e.value)}
              options = {this.createList()}
              
            />
            <button type='button' className='btn btn-danger' onClick={() => this.switchCurrencies()}><span id="arrows">{"<>"}</span></button>
            <p>To:</p>
            <Select
              value={{ label:<div> <div className={"currency-flag currency-flag-"+this.state.to.toLowerCase()}></div><p>{this.state.to}</p></div>, value: this.state.to }}
              onChange = {(e) => this.changeTo(e.value)}
              options = {this.createList()}
            />
            <p>Amount:</p>
            <input type="number" onChange={(e) => this.changeAmount(e.target.value)} placeholder="0"></input>
          </div>
          <div className='output'>
              <p>Result: {this.state.rate * this.state.amount}</p>
              <p>The rate is {this.state.rate} {this.state.to}  to 1 {this.state.from}</p>
          </div>
          
        </div>
      </div>

      
    );
  }
}

export default App;
