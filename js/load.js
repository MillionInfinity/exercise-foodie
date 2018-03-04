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