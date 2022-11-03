import './css/styles.css';
import { fetchCountries } from './fetchCountries';
import debounce from 'lodash.debounce';

const inputSearchBox = document.querySelector('input#search-box');
const countryList = document.querySelector('.country-list');
const countryInfo = document.querySelector(".country-info")
const DEBOUNCE_DELAY = 300;


inputSearchBox.addEventListener('input', debounce(() => {
    let insertedCountryNames = inputSearchBox.value.trim();

    if(!insertedCountryNames) {
        console.log("no country name provided")
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return
    }
    fetchCountries(insertedCountryNames)

}, DEBOUNCE_DELAY));