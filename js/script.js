`use strict`

const url = `https://restcountries.eu/rest/v1/name/`;
const countriesList = document.querySelector(`#countries`);

document.querySelector(`#search`).addEventListener(`click`, searchCountries);

function searchCountries() {
    const countryName = document.querySelector(`#country-name`).value;
    if (!countryName.length) countryName = `Poland`;
    fetch(url + countryName)
        .then(function(resp) {
            return resp.json();
        })
        .then(showCountriesList);
}

function showCountriesList(resp) {
    countriesList.innerText = ``;
    resp.forEach(function(item) {
        const liEl = document.createElement(`li`);
        liEl.innerText = item.name;
        countriesList.appendChild(liEl);
    });
}