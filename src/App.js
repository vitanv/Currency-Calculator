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
      });
    }
    this.setState({from: value});
  }

  changeTo = (value) =>{
    if(value == this.state.from){
      this.setState({
        from:this.state.to,
      });
    }
    this.setState({to: value});
  }

  changeAmount = (value) =>{
    this.setState({amount:value});
  }

  createList = () =>{
    let list = ["AFA", "ALL", "DZD", "AOA", "ARS", "AMD", "AWG", "AUD", "AZN", "BSD", "BHD", "BDT", "BBD", "BYR",
              "BEF", "BZD", "BMD", "BTN", "BTC", "BOB", "BAM", "BWP", "BRL", "GBP", "BND", "BGN", "BIF", "KHR",
              "CAD", "CVE", "KYD", "XOF", "XAF", "XPF", "CLP", "CNY", "COP", "KMF", "CDF", "CRC", "HRK", "CUC",
              "CZK", "DKK", "DJF", "DOP", "XCD", "EGP", "ERN", "EEK", "ETB", "EUR", "FKP", "FJD", "GMD", "GEL",
              "DEM", "GHS", "GIP", "GRD", "GTQ", "GNF", "GYD", "HTG", "HNL", "HKD", "HUF", "ISK", "INR", "IDR",
              "IRR", "IQD", "ILS", "ITL", "JMD", "JPY", "JOD", "KZT", "KES", "KWD", "KGS", "LAK", "LVL", "LBP",
              "LSL", "LRD", "LYD", "LTL", "MOP", "MKD", "MGA", "MWK", "MYR", "MVR", "MRO", "MUR", "MXN", "MDL",
              "MNT", "MAD", "MZM", "MMK", "NAD", "NPR", "ANG", "TWD", "NZD", "NIO", "NGN", "KPW", "NOK", "OMR",
              "PKR", "PAB", "PGK", "PYG", "PEN", "PHP", "PLN", "QAR", "RON", "RUB", "RWF", "SVC", "WST", "SAR",
              "RSD", "SCR", "SLL", "SGD", "SKK", "SBD", "SOS", "ZAR", "KRW", "XDR", "LKR", "SHP", "SDG", "SRD",
              "SZL", "SEK", "CHF", "SYP", "STD", "TJS", "TZS", "THB", "TOP", "TTD", "TND", "TRY", "TMT", "UGX",
              "UAH", "AED", "UYU", "USD", "UZS", "VUV", "VEF", "VND", "YER", "ZMK"];
    let option = [];
    for(let i = 0; i < list.length;i++){
      option.push({value:list[i], label:<div> <div className={"currency-flag currency-flag-"+list[i].toLowerCase()}></div><p>{list[i]}</p></div>});
    }
    return option;
  }

  render(){
    return (
      <div className="container" id="wrapper">
          <h1>Currency Converter</h1>
          <div className='input'>
            <Select
              onChange = {(e) => this.changeFrom(e.value)}
              options = {this.createList()}
              defaultValue={{ label:<div> <div className={"currency-flag currency-flag-"+this.state.from.toLowerCase()}></div><p>{this.state.from}</p></div>, value: this.state.from }}
            />
            
            <p>to</p>
            <Select

              options = {this.createList()}
              onChange = {(e) => this.changeTo(e.value)}
              defaultValue={{ label:<div> <div className={"currency-flag currency-flag-"+this.state.to.toLowerCase()}></div><p>{this.state.to}</p></div>, value: this.state.to }}
            />
            
          </div>
          <input type="number" onChange={(e) => this.changeAmount(e.target.value)} placeholder="0"></input>
          <span id="result">{this.state.rate * this.state.amount} {this.state.to} at a rate of {this.state.rate}  to 1 {this.state.from} </span>
      </div>
    );
  }
}

export default App;
