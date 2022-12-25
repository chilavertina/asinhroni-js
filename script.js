'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

const request = new XMLHttpRequest();
request.open('GET', 'https://restcountries.com/v2/name/serbia');
request.send();

request.addEventListener('load', function () {
  console.log(this.responseText); //  this se odnosi na request
  // rezultat koda iznad se dobija u JSON-u

  // pretvaranje JSON teksta u object
  const [data] = JSON.parse(this.responseText); // [data] destruktuiranje niza sa objektom u object
  console.log(data);
});
