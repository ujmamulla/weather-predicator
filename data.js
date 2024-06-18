//event listerner to get location input//
document.getElementById("location-input").addEventListener('change' , async() => {

     //get the user entered location//
     const location= document.getElementById("location-input").value;

     //fetch the weather data//
     const weatherData  = await getWeatherData(location);

     //display weather data on page//
     displayWeatherData(weatherData);

});

const getWeatherData = async (location) => {
    if(!location){
        return{};
    }
     
    const apiKey = 'b4f41e809f6cb457e526e3c0ad2e201b';
const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    const data = await response.json();
    //(`https://home.openweathermap.org/api_keys`);//(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`);
    
    return data;
}

function getBackgroundColor(temperature) {
    if (temperature < 0) {
        return 'lightblue';
    }else if (temperature < 10) {
        return 'lightgreen';
    }else if (temperature < 20) {
        return 'lightyellow';
    }else if (temperature < 30) {
        return 'lightsalmon';
    }else {
        return 'lightcoral';
    }
}

const displayWeatherData = (data) => {
    const weatherDataElement = document.getElementById("weather-data");

    if(Object.keys(data).length == 0) {
        weatherDataElement.innerHTML = "Please enter the location to see weather:";
    }else{
        const backgroundColor = getBackgroundColor(Math.floor(data.main.temp - 273.15));
        weatherDataElement.style.backgroundColor = backgroundColor;
    
    weatherDataElement.innerHTML = `
         <h3>${data.name}</h3>
         <p>Temperature: ${Math.floor(data.main.temp - 273.15)}°C</p>
         <p>Humidity: ${data.main.humidity}%</p>
         <p>Wind Speed: ${data.wind.speed} m/s </p>
    `;
   }
}
window.onload = async () => {
    // No need to pass location here, as it will be obtained from the input field
    const location = document.getElementById("location-input").value;
    const weatherData = await getWeatherData(location);
    displayWeatherData(weatherData);
}
//window.onload = async (location) => {
    // const weatherData = await getWeatherData();
    // displayWeatherData(weatherData);
//}

