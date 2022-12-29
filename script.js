'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
/*
const getCountryData = function (country) {
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText); //  this se odnosi na request
    // rezultat koda iznad se dobija u JSON-u

    // pretvaranje JSON teksta u object
    const [data] = JSON.parse(this.responseText); // [data] destruktuiranje niza sa objektom u object
    console.log(data);

    const hmtl = ` <article class="country">
  <img class="country__img" src="${data.flag}" />
  <div class="country__data">
    <h3 class="country__name">${data.name}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👫</span>${+(
      data.population / 1000000
    ).toFixed(1)}</p>
    <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
    <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
  </div>
</article>
  `;
    countriesContainer.insertAdjacentHTML('beforeend', hmtl);
    countriesContainer.style.opacity = 1;
  });
};

getCountryData('portugal');
getCountryData('serbia');
getCountryData('russia');
*/

// CHAINING FUNCTIONS AJAX (CALLBACK HELL)
/*
const renderCountry = function (data, className = '') {
  const hmtl = ` <article class="${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', hmtl);
  countriesContainer.style.opacity = 1;
};

const getCountryAndNeighbour = function (country) {
  // AJAX call country 1
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.com/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    console.log(this.responseText); //  this se odnosi na request
    // rezultat koda iznad se dobija u JSON-u

    // pretvaranje JSON teksta u object
    const [data] = JSON.parse(this.responseText); // [data] destruktuiranje niza sa objektom u object
    console.log(data);

    // Render country 1
    renderCountry(data);

    // Get neighbour country 2
    const [neighbour] = data.borders;

    // const neighbour = data.borders?.[0]; // ovo je za slucaj da drzava nema suseda

    // AJAX call country 2
    const request2 = new XMLHttpRequest();
    request2.open('GET', `https://restcountries.com/v2/alpha/${neighbour}`);
    request2.send();

    request2.addEventListener('load', function () {
      const data2 = JSON.parse(this.responseText);

      renderCountry(data2, 'neighbour');
    });
  });
};

getCountryAndNeighbour('serbia');
*/

// PROMISES --- kontejner buduce vrednosti tj. response-a koji dolazi iz AJAX poziva

// STARI nacin AJAX poziva
// const request = new XMLHttpRequest();
//   request.open('GET', `https://restcountries.com/v2/name/serbia`);
//   request.send();

// NOVI nacin (promises)

const renderCountry = function (data, className = '') {
  const hmtl = ` <article class="${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${+(
        data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `;
  countriesContainer.insertAdjacentHTML('beforeend', hmtl);
  countriesContainer.style.opacity = 1;
};

const request = fetch('https://restcountries.com/v2/name/serbia');
console.log(request);

// const getCountryData = function (country) {
//   fetch(`https://restcountries.com/v2/name/${country}`).then(function (
//     // fetch funkcija return promise, a then metoda hendluje taj promise
//     response
//   ) {
//     console.log(response);
//     response.json().then(function (data) {
//       // da bismo zatim procitali podatak iz response-a koristimo json koji ce takodje vratiti promise
//       console.log(data); // opet na novi promise pozivamo then metodu i dobijamo pristup podatku
//       renderCountry(data[0]);
//     });
//   });
// };

const getCountryData = function (country) {
  // Country 1
  fetch(`https://restcountries.com/v2/name/${country}`)
    .then(
      response => response.json()
      // err => alert(err)
    )
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[1];

      if (!neighbour) return;

      // Country 2
      return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); // drugi AJAX call
    })
    .then(
      response => response.json()
      // err => alert(err)
    )
    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => alert(err));
};

btn.addEventListener('click', function () {
  getCountryData('serbia');
});
