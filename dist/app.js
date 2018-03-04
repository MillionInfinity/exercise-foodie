(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
"use strict";


let fl = require('./foodie-list');
let sd = require('./search_food');
let db = require('./load');



},{"./foodie-list":2,"./load":3,"./search_food":5}],2:[function(require,module,exports){
"use strict";

console.log("foodieList");

let db = require("./load");
},{"./load":3}],3:[function(require,module,exports){
"use strict";

                console.log("getData.js is here!");

                var restaurants = {};
                let restaurantItems = [];
                var cities = {};
                let citiesItems = [];

                //parse restaurant data
                let parseData = (data) => {
                    data.restaurants.forEach((element) => {
                        restaurantItems.push(element);
                    });
                    return restaurantItems;
                };

                restaurants.getRestaurants = () => {
                    // /console.log("in getRestaurants", restaurantItems);
                    return restaurantItems;
                };

                restaurants.loadRestaurants = () => {
                    return new Promise((resolve, reject) => {        
                        let request = new XMLHttpRequest();
                        request.onload = function () {
                            if (request.status === 200) {              
                                let data = JSON.parse(request.responseText); 
                                // console.log("what is this data?", data);             
                                resolve(parseData(data));       
                            } else {
                                reject(new Error("XMLHttpRequest Error", request.statusText)); 
                            }
                        };
                        request.open('GET', "../js/restaurants.json");
                        request.send();
                    });

                };

                //GET CITIES DATA

                    let parseCities = (dato) => {
                        dato.cities.forEach((element) => {
                            citiesItems.push(element);
                        });
                        return citiesItems;
                    };

                cities.loadCities = () => {
                    return new Promise((resolve, reject) => {
                        let xhrRequest = new XMLHttpRequest();
                        xhrRequest.onload = function () {
                            if (xhrRequest.status === 200) {
                                let dato = JSON.parse(xhrRequest.responseText);
                                // console.log("city data:", data);
                                resolve(parseCities(dato));
                            } else {
                                reject(new Error("XMLHttpRequest Error", xhrRequest.statusText));
                            }
                        };
                        xhrRequest.open('GET', "../js/cities.json");
                        xhrRequest.send();
                    });
                };


                var city;

                function filterCities(cities, restaurants) {
                    for (var i = 0; i < restaurants.length; i++) {
                        if (cities.id === restaurants[i].city_id) {
                            return true;
                        } else
                            city++;
                        return false;
                    }
                }


module.exports = { restaurants, cities };
},{}],4:[function(require,module,exports){
"use strict";
let startup = document.getElementById("starest");
console.log("starest", startup);
console.log("hi");

            let cd = require('./card-grid');
            let fl = require('./foodie-list');
            let sd = require('./search_food');
            let db = require('./load');



let showItems = (restaurantData) => {
    let restDisplay = document.getElementById("rest-display");
    console.log("restaurantData", restaurantData);
    restaurantData.forEach((restaurant) => {
        // let restBlock = buildRestItem(restaurant);
        restDisplay.innerHTML += `<section class="block-wrapper"><h2 class="rest-name">${restaurant.restaurant}</h2><h3 class="rating-btn">My Rating<br/>${restaurant.my_rating}</h3><h5 class="visited-date">Last Visited: ${restaurant.date_visited}</h5></section>`;

    });
};

let restPromise = db.restaurants.loadRestaurants()
    .then(
        (resolve) => {
            console.log("then resolve", resolve);
            let sortedData = resolve.sort(function (a, b) {
                return b.my_rating - a.my_rating;
            });
            showItems(sortedData);
        },
        (reject) => {
            console.log("Oops Something went wrong", reject);
        });

//Cities Promise

//Dont need to show this way anymore but THIS WORKS
let showCities = (citiesData) => {
    let citiesSelector = document.getElementById("selector");
    console.log("citiesData", citiesData);
    citiesData.forEach((city) => {
        citiesSelector.innerHTML += `<option value="${city.city}><h4>${city.city}</h4></option>`;
        
    });
};
let citiesPromise = db.cities.loadCities()
    .then(
        (resolve) => {
            console.log("cities resolve", resolve);
            //possibly sort cities here
            showCities(resolve);
            console.log("I hope this works", resolve[1].id);
            return resolve;
        }
    );
},{"./card-grid":1,"./foodie-list":2,"./load":3,"./search_food":5}],5:[function(require,module,exports){
"use strict";

},{}]},{},[4]);
