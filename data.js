const time = document.querySelector('#date_time');
    const liveTime_Date = () => {
        //Time zones


        let options = {
            day: 'numeric',
            month: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
            //  timeZone: data.timezone
        };

        let pstDateTime = new Date().toLocaleString('en-US', options);
        time.innerHTML = `Local: ${pstDateTime}`;// Output will be in the format: MM/DD/YYYY, HH:MM:SS AM/PM

    }
    setInterval(liveTime_Date, 1000);
    



document.querySelector('#search')
    .addEventListener('click', () => {
        const apiKey = '750f30646ddc07e2adc5be7b5730b0de';
        const city = document.querySelector('#city').value;
        const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        fetch(currentWeatherUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log(data);  // Log the entire response object to the console
                displaydata(data);
            })
            .catch(error => {
                console.error('An error occurred:', error);
            });
    })
const displaydata = (data) => {
    //image
    const icon = document.querySelector('#weather-icon');
    const iconUrl = `https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`;;
    icon.src = iconUrl;
    icon.style.display = "block";


    //temp
    const temperature = document.querySelector('#temp-div');
    const temp_num = parseInt(Math.round(data.main.temp_min - 273.15));
    const temp = `Temperature: ${temp_num}°C`
    temperature.innerHTML = `${temp}`;
    if (temp_num > 30 && temp_num < 45) {
        temperature.style.color = 'orange';
    } else if (temp_num >= 45) {
        temperature.style.color = 'red';
    } else {
        temperature.style.color = 'white';
    }


    //info
    const weatherInfo = document.getElementById('weather-info');
    const weather = data.weather[0].description;
    weatherInfo.innerHTML = `${weather}`;

    //windSpeed
    const windSpeed = document.querySelector('#windSpeed');
    const speed =data.wind.speed;
    const wind = `Wind Speed: ${speed} m/s`;
    windSpeed.innerHTML = `${wind}`;

    //City Name
    const cityName = document.querySelector('#cityName');
    const myCity = data.name
    const YourCity = myCity.toUpperCase();
    cityName.innerHTML= `CITY: ${YourCity}`;

}
















