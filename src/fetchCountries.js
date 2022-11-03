const FETCH_URL = 'https://restcountries.com/v3.1/name/';
import Notiflix from 'notiflix';
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector('.country-info');

export function fetchCountries(name) {
  fetch(FETCH_URL + name + '?fields=name,capital,population,flags,languages')
    .then(response => response.json())
    .then(countries => {
      console.log(countries);
      let countryMarkup = [];
      countries.forEach(country => {
        console.log(country.name.common);
        countryMarkup += `<li class="country"><img class="country-svg" src="${country.flags.svg}" height="18px"></img>${country.name.common}</li>`;
      });

      if(countries.length > 10) {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
        return
    }
    if(countries.length === 1) {
        countries.forEach(country => {
            const values = Object.values(country.languages);
        countryInfo.innerHTML = `<p class="country-category">Capital: <span class="country-details"> ${country.capital}</span></p>
        <p class="country-category">Population: <span class="country-details">${numFormatter(country.population)}</span></p>
        <p class="country-category">Languages: <span class="country-details"> ${values}</span></p> `;
        countryInfo.style.transform = "translate(0%)";
        countryInfo.style.backgroundImage = `url(${country.flags.svg})`;
        countryInfo.style.backgroundSize = "90px";
        countryInfo.style.backgroundRepeat = "no-repeat";
        countryInfo.style.backgroundPosition = "right top";

    
    })
    }
    if(countries.length !== 1) {
        countryInfo.style.transform = "translate(-150%)";
        countryInfo.innerHTML = "";
    }
      countryList.innerHTML = countryMarkup;
      
    }).catch((error) => {

        Notiflix.Notify.failure("Oops, there is no country with that name");
        
    });
}

function numFormatter(num) {
    if(num > 999 && num < 1000000){
        return (num/1000).toFixed(1) + ' K'; // convert to K for number from > 1000 < 1 million 
    }else if(num > 1000000){
        return (num/1000000).toFixed(1) + ' Mln'; // convert to M for number from > 1 million 
    }else if(num < 900){
        return num; // if value < 1000, nothing to do
    }}