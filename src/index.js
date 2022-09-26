import React from 'react';
import ReactDOM from 'react-dom/client';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';

var from = "EUR";
var to ="USD";
var amount = 10;
var requestURL = 'https://api.exchangerate.host/convert?from='+from+'&to='+to;
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

request.onload = function() {
  var response = request.response;
  console.log(response.result * amount);
}
