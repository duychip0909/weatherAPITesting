const xhrWeather = new XMLHttpRequest();
const xhrLocation = new XMLHttpRequest();
const place = document.getElementById('place');
const temp = document.getElementById('temperature');
const lat = document.querySelector('input[name="lat"]');
const lon = document.querySelector('input[name="lon"]');
const submitBtn = document.querySelector('button[name="submit"]');
let cities = {
    kr: "Seoul",
    vn: "Vietnam",
    hn: "Hanoi"
};


function fetchWeather(lat, lon, name) {
    xhrWeather.open("GET", "https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=4bf6ac82d5df429fe2a858101b1f36f9");
    
    xhrWeather.onreadystatechange = function () {
        if (xhrWeather.readyState === 4) {
            if (xhrWeather.status === 200) {
                console.log("Request weather API succesfully!!!");
                let listInfo = JSON.parse(xhrWeather.responseText);
                console.log(listInfo)
                let location = `${listInfo.name}`
                let celcius = `${(listInfo.main.feels_like - 273.15).toFixed(1)}`;
                place.innerHTML = `${name}`;
                temp.innerHTML = `${celcius}°C`;   
            } else {
                console.log("Error");
            }
        }
    }
    xhrWeather.send();
};

function weatherIn(city) {
        xhrLocation.open("GET", "http://api.openweathermap.org/geo/1.0/direct?q="+city+"&limit=1&appid=4bf6ac82d5df429fe2a858101b1f36f9");
        
        xhrLocation.onreadystatechange = function () {
            if (xhrLocation.readyState === 4) {
                if (xhrLocation.status === 200) {
                    console.log("Request location API succesfully!!!");
                    let listInfo = JSON.parse(xhrLocation.responseText);
                    test = listInfo.map(city => {
                        fetchWeather(city.lat, city.lon, city.local_names.vi);
                    })
                } else {
                    console.log("Error");
                }
            }
        }
        
        xhrLocation.send();
}

setInterval(weatherIn(hn = 'tam_dao'), 60000);






