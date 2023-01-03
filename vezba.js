'use strict';

// const whereAmI = function (lat, lng) {
//   fetch(
//     `https://geocode.xyz/${lat},${lng}?geoit=json&auth=49829124970640839439x87507`
//   )
//     .then(function (response) {
//       response.json();
//       console.log(response);
//     })
//     .then(function (data) {
//       console.log(data);
//     });
// };

const renderCountry = function (data, className = '') {
  const hmtl = ` <article class="${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)}</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
    `;

  countriesContainer.insertAdjacentHTML('beforeend', hmtl);
  // countriesContainer.style.opacity = 1;
};

const whereAmI = function (lat, lng) {
  fetch(
    `https://geocode.xyz/${lat},${lng}?geoit=json&auth=49829124970640839439x87507`
  )
    .then(res => {
      // console.log(res);
      if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
      return res.json();
    })
    .then(data => {
      console.log(data);
      console.log(`You are in ${data.city}, ${data.country}.`);

      return fetch(`https://restcountries.com/v2/alpha/${data.country}`);
    })
    .then(res => {
      if (!res.ok) throw new Error(`Country not found (${res.status})`);

      return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(error => console.error(`${error.message} 💥`));
};

whereAmI(52.508, 13.381);
// whereAmI(19.037, 72.873);
// whereAmI(-33.933, 18.474);
