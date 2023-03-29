const API_KEY="3265874a2c77ae4a04bb96236a642d2f";
window.addEventListener("load",()=>{
    let city="delhi";
    searchByCity(city);
})

function searchByCity(city){
    let urlWeather= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(urlWeather)
    .then((data)=>{
        return data.json();
    })
    .then((weather)=>{
        hourForecast(city);
        dayForecast(city);
        document.getElementById('city').innerText= weather.name + ', '+weather.sys.country;
        document.getElementById('img').src=`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;
        document.getElementById('temperature').innerText= Math.round(weather.main.temp)+ ' °C';  
        document.getElementById('clouds').innerText= weather.weather[0].description;
        document.getElementById('humVal').innerText= weather.main.humidity+' %';
        document.getElementById('windVal').innerText= weather.wind.speed+ ' km/h';
    })
    .catch((err)=>{
        console.log(`The Error: ${err}`);
    });
    document.getElementById('input').value='';
}

function hourForecast(city){
    let urlForecastHr= `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(urlForecastHr)
    .then((data)=>{
        return data.json();
    })
    .then((forecast)=>{
        for (let i = 0; i < 5; i++) {
            let date= new Date(forecast.list[i].dt*1000)
            document.getElementsByClassName("time")[i].innerText= (date.toLocaleTimeString(undefined,'Asia/Kolkata')).replace(':00','');
            document.getElementsByClassName("minmaxTempHr")[i].innerText= Math.round(forecast.list[i].main.temp )+ ' °C' ;
            document.getElementsByClassName("hrDesc")[i].innerText= forecast.list[i].weather[0].description;
        } s
    })
    .catch((err)=>{
        console.log(`The Error: ${err}`);
    });
}
function dayForecast(city){
    let urlForecastDay= `https://api.openweathermap.org/data/2.5/forecast/daily?q=${city}&appid=${API_KEY}&units=metric`;
    fetch(urlForecastDay)
    .then((data)=>{
        return data.json();
    })
    .then((forecast)=>{
        for (let i = 1; i <= 4; i++) {
            document.getElementsByClassName('date')[i-1].innerText= new Date(forecast.list[i].dt*1000).toDateString(undefined,'Asia/Kolkata');
            document.getElementsByClassName('minmaxTempDay')[i-1].innerText= Math.round(forecast.list[i].temp.min )+ ' °C' + ' / ' + Math.round(forecast.list[i].temp.max)+ ' °C';
            document.getElementsByClassName('dayDesc')[i-1].innerText= forecast.list[i].weather[0].description;
        }
    })
    .catch((err)=>{
        console.log(`The Error: ${err}`);
    });
} 

document.getElementById("search").addEventListener("click",()=>{
    let city= document.getElementById('input').value;
    searchByCity(city);
});
document.getElementById("input").addEventListener("keypress",(event)=>{
    if (event.key === "Enter"){
        let city= document.getElementById('input').value;
        searchByCity(city);
    }
});