`use strict`

const url = `https://restcountries.eu/rest/v1/name/`;
const countriesList = document.querySelector(`#countries`);

document.querySelector(`#search`).addEventListener(`click`, searchCountries);

function handleErrors(resp) {
    if (!resp.ok) {
        throw Error(resp.statusText);
    }
    return resp;
}

function searchCountries() {
    const countryName = document.querySelector(`#country-name`).value;
    if (!countryName.length) countryName = `Poland`;
    fetch(url + countryName)
        .then(handleErrors)
        .then(function(resp) {
            return resp.json();
        }).then(function(resp) {
            showCountriesList(resp);
        })
        .catch(function(error) {
            console.log(error);
        });
}

/*
function showCountriesList(resp) {
    countriesList.innerText = ``;
    console.log(resp);
    resp.forEach(function(item) {
        const liEl = document.createElement(`li`);
        liEl.innerText = item.capital;
        countriesList.appendChild(liEl);
    });
}
*/
const template = document.querySelector(`#template`).innerHTML;
Mustache.parse(template);

function showCountriesList(resp) {
    const results = document.querySelector(`#results`);
    results.innerHTML = ``;
    resp.forEach(function(ele) {
        const render = Mustache.render(template, ele);
        results.insertAdjacentHTML(`beforeend`, render);
    })
}