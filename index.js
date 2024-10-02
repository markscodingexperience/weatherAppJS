const API_KEY = "6f19149e3faf4b3d8d7131054241207";
const timeElapsed = Date.now();
const today = new Date(timeElapsed);
document.querySelector("#datetime").innerHTML = today.toDateString();

const getData = (event) => { //prevent reloading
    event.preventDefault();
    const input = document.querySelector(".cityName"); //get city from input
    getDataFromWeatherAPI(input.value); //pass city name to function
};

async function getDataFromWeatherAPI(city) {
    const BASE_URL = `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`; //base url plus api key and city name
    const weatherIcon = document.querySelector("#weatherIcon");
    try {
        const response = await fetch(BASE_URL);
        if (!response.ok) 
            throw new Error("Network response is not ok" + response.statusText);
        
        const data = await response.json();

        if(data.current.condition.text.includes("cloudy") || data.current.condition.text.includes("Cloudy")) //change the icon based on text
            weatherIcon.src = "icons/cloud.png";
        if(data.current.condition.text.includes("Sunny"))
            weatherIcon.src = "icons/sun.png";
        if(data.current.condition.text.includes("rain"))
            weatherIcon.src = "icons/raining.png";
        if(data.current.condition.text.includes("heavy rain"))
            weatherIcon.src = "icons/storm.png";

        //change data
        document.querySelector("#temperature").innerHTML = `${data.current.temp_c} °C`;
        document.querySelector("#city").innerHTML = data.location.name;
        document.querySelector("#wind").innerHTML = `${data.current.wind_kph} km/h`;
        document.querySelector("#humidity").innerHTML = `${data.current.humidity}%`;

        document.querySelector(".cityName").value = ""; //empty the input 
    } catch (error) {
        console.log("error" + error);
    }
}
