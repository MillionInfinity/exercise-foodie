"use strict";
let db = require('./load')
let fl = require('./foodie-list');
//VARIABLES
var dropdown = document.getElementById("dropdown");
var cityName = `<option id ="default" value="chooseCity">Choose a City</option>`;

//FUNCTION
function showCityNames() {
    restaurantData.getCities()
        .then(function (resolve) {
            var keys;
            for (keys in resolve) {
                var cityVar = resolve[keys].city;
                var cityID = resolve[keys].id;
                cityName += `<option id=${cityID} value="${cityVar}">${cityVar}</option>`;
                // console.log("city ids: ", cityName);
            }
            cityName += `<option id="ViewAll" value="ViewAll">View All</option>`;
            dropdown.innerHTML = cityName;
        });
}
showCityNames();

//EXPORTS
module.exports = { showCityNames };