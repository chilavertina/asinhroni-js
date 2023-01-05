'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

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
  countriesContainer.style.opacity = 1;
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
  countriesContainer.style.opacity = 1;
};

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

// const request = fetch('https://restcountries.com/v2/name/serbia');
// console.log(request);

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

// const getJSON = function (url, errorMsg = 'Something went wrong') {
//   return fetch(url).then(response => {
//     if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

//     return response.json();
//   });
// };

// const getCountryData = function (country) {
//   // Country 1
//   fetch(`https://restcountries.com/v2/name/${country}`)
//     .then(response => {
//       if (!response.ok)
//         throw new Error(`Country not found (${response.status})`);
//       return response.json();
//       // err => alert(err)
//     })
//     .then(data => {
//       renderCountry(data[0]);
//       const neighbour = data[0].borders[1];

//       if (!neighbour) return;

//       // Country 2
//       return fetch(`https://restcountries.com/v2/alpha/${neighbour}`); // drugi AJAX call
//     })
//     .then(
//       response => response.json()
//       // err => alert(err)
//     )
//     .then(data => renderCountry(data, 'neighbour'))
//     .catch(err => {
//       console.error(`${err} 💥💥💥`);
//       renderError(`Something went wrong 💥💥💥 ${err.message}. Try again!`);
//     })
//     .finally(() => {
//       countriesContainer.style.opacity = 1;
//     });
// };
/*
const getCountryData = function (country) {
  // Country 1
  getJSON(`https://restcountries.com/v2/name/${country}`, 'Country not found')
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];

      if (!neighbour) throw new Error('No neighbour found!');

      // Country 2
      return getJSON(
        `https://restcountries.com/v2/alpha/${neighbour}`,
        'Country not found'
      );
    })

    .then(data => renderCountry(data, 'neighbour'))
    .catch(err => {
      console.error(`${err} 💥💥💥`);
      renderError(`Something went wrong 💥💥 ${err.message}. Try again!`);
    })
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};

btn.addEventListener('click', function () {
  getCountryData('portugal');
});

getCountryData('australia');
*/
/*
// EVENT LOOP

// redosled izvrsavanja koda
console.log('Test start'); // 1.
setTimeout(() => console.log('0 sec timer'), 0); // 4.
Promise.resolve('Resolve promise 1').then(res => console.log(res)); // 3.

// Resolve promise 2 ce se izvrsiti pre setTimeout timer-a
Promise.resolve('Resolve promise 2').then(res => {
  for (let i = 0; i < 1000000000; i++) {}
  console.log(res);
});
console.log('Test end'); // 2.
*/
// BUILDING PROMISE
/*
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lottery draw is happening');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(2)
  .then(() => {
    console.log('I waited for 2 seconds');
    return wait(1);
  })
  .then(() => console.log('I waited for 1 second more'));
*/
/*
setTimeout(() => {
  console.log('1 second passed');
  setTimeout(() => {
    console.log('2 seconds passed');
    setTimeout(() => {
      console.log('3 seconds passed');
      setTimeout(() => {
        console.log('4 seconds passed');
      }, 1000);
    }, 1000);
  }, 1000);
}, 1000);
*/
/*
// resenje primera iznad na laksi nacin
wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 seconds passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 seconds passed');
    return wait(1);
  })
  .then(() => console.log('4 seconds passed'));

Promise.resolve('abc').then(x => console.log(x));
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
*/
/*
// promisifying the geolocation API

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

// getPosition().then(pos => console.log(pos));

const whereAmI = function () {
  getPosition()
    .then(pos => {
      const { latitude: lat, longitude: lng } = pos.coords;

      return fetch(
        `https://geocode.xyz/${lat},${lng}?geoit=json&auth=49829124970640839439x87507`
      );
    })
    .then(res => {
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

btn.addEventListener('click', whereAmI);
*/
/*
// Promises sa async i await

const getPosition = function () {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = async function () {
  try {
    // Geolocation
    const position = await getPosition();
    const { latitude: lat, longitude: lng } = position.coords;

    // Reverse geocoding
    const responseGeo = await fetch(
      `https://geocode.xyz/${lat},${lng}?geoit=json&auth=49829124970640839439x87507`
    );
    if (!responseGeo.ok) throw new Error('Problem getting location data');

    const dataGeo = await responseGeo.json();

    // Country data
    // fetch(`https://restcountries.com/v2/name/${country}`).then(response => //ovo je stari nacin upotrebe promise u odnosu na ovaj ispod
    //   console.log(response)
    // );

    const response = await fetch(
      `https://restcountries.com/v2/name/${dataGeo.country}`
    );
    if (!response.ok) throw new Error('Problem getting country');

    const data = await response.json();
    renderCountry(data[0]);

    return `You are in ${dataGeo.city}, ${dataGeo.country}`;
  } catch (err) {
    console.error(`${err} 💥`);
    renderError(`💥 ${err.message}`);

    // Reject promise returned from async function
    throw err;
  }
};

console.log('1: Will get location');
// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

(async function () {
  try {
    const city = await whereAmI();
    console.log(`2: ${city}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})();
*/
/*
// Paralelno pokretanje Promise-a

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};

// const get3Countries = async function (c1, c2, c3) {
//   try {
//     const [data1] = await getJSON(`https://restcountries.com/v2/name/${c1}`);
//     const [data2] = await getJSON(`https://restcountries.com/v2/name/${c2}`);
//     const [data3] = await getJSON(`https://restcountries.com/v2/name/${c3}`);

//     console.log([data1.capital, data2.capital, data3.capital]);
//   } catch (err) {
//     console.error(err);
//   }
// };

// BOLJE RESENJE OVOGA IZNAD
const get3Countries = async function (c1, c2, c3) {
  try {
    const data = await Promise.all([
      getJSON(`https://restcountries.com/v2/name/${c1}`),
      getJSON(`https://restcountries.com/v2/name/${c2}`),
      getJSON(`https://restcountries.com/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};

get3Countries('serbia', 'croatia', 'bulgaria');
*/

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);

    return response.json();
  });
};
//Promise.race
(async function () {
  const response = await Promise.race([
    getJSON(`https://restcountries.com/v2/name/italy`),
    getJSON(`https://restcountries.com/v2/name/egypt`),
    getJSON(`https://restcountries.com/v2/name/mexico`),
  ]);
  console.log(response[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

Promise.race([getJSON(`https://restcountries.com/v2/name/serbia`), timeout(5)])
  .then(response => console.log(response[0]))
  .catch(err => console.error(err));

// Promise.allSettled

Promise.allSettled([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another succes'),
]).then(res => console.log(res));

//Promise.any
Promise.any([
  Promise.resolve('Succes'),
  Promise.reject('ERROR'),
  Promise.resolve('Another succes'),
]).then(res => console.log(res));
