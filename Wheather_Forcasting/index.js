 console.log("okay")
 let countryCity= {

 };
 fetch('./world-cities_json.json')
     .then(function(res){
         return res.json();
     })
     .then(function(data){
        for(i=0;i<data.length;i++){
            if(data[i].country in countryCity)
           countryCity[data[i].country].push(data[i].name);
           else{
               countryCity[data[i].country]=[];
               countryCity[data[i].country].push(data[i].name);
           }
        }
     });


function showWheatherForecast(url,cityName,countryName){
    fetch(url)
        .then(function(res){
            return res.json();
        })
        .then(function(data){
            const stateName=data.location.region;
            const temperature=data.current.temperature;
            const humidity=data.current.humidity;
            const wind_speed=data.current.wind_speed;
            const precip=data.current.precip;
            const localTime=data.location.localtime;
            let card=document.querySelector(".card-body");
            let html=` <h2 class="card-text">${cityName}, ${stateName},${countryName}</h2>
            <p><b>Local Time: ${localTime}</b></p>
            <p class="card-text"> <strong>Temperature ${temperature} ° C <br>
            Precipitation ${precip}% <br> 
            Humidity ${humidity}% <br>
            Wind Speed ${wind_speed}km/hr
            <br> </strong>  </p>`;
            card.innerHTML=html;
        })
}

let btnSearch=document.getElementsByClassName('btn')[0];

btnSearch.addEventListener('click',function(e){
    e.preventDefault();
    let cityName=document.getElementsByClassName('city')[0].value;
    let countryName=document.getElementsByClassName('country')[0].value;
    console.log(countryName);
    if(cityName.length==0)
    alert('please enter the city name');
    else{
        url=`http://api.weatherstack.com/current?access_key=9ee4614e0a8216a09ff334d11b117c95&query=${cityName}`;
        showWheatherForecast(url,cityName,countryName);
    }
    console.log(cityName,countryName);
    
})