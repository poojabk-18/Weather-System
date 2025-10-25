import React, { useEffect, useRef, useState } from 'react'
import clearsky from '../assets/images/clearsky.png';
import cloudy from '../assets/images/cloudy.png';
import searchbar from '../assets/images/searchbar.png';
import clouds from '../assets/images/clouds.png';
import drizzling from '../assets/images/drizzling.png';
import heavyrain from '../assets/images/heavyrain.png';
import humidity from '../assets/images/humidity.png';
import wind from '../assets/images/wind.png';
import mist from '../assets/images/mist.png';
import snowy from '../assets/images/snowy.png';




function Weather() {
const inputRef = useRef()
    const [weatherDtaa, setWeatherData] = useState(false);

    const allIcons = {
        "01d" : clearsky,
        "01n" : clearsky,
        "02d" : cloudy,
        "02n" : cloudy,
        "04n" : clouds,
        "03n" : clouds,
        "04d" : clouds,
        "03d" : clouds,
        "09d": drizzling,
        "09n": drizzling,
        "10d": heavyrain,
        "10n": heavyrain,
        "11d": heavyrain,
        "11n": heavyrain,
        "13d": snowy,
        "13n": snowy,
        "50d": mist,
        "50n": mist,
    }

const searchApi = async(city)=>{
    if(city === ""){
        alert("Enter city name! ");
        return;
    }

    try{
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
        const response = await fetch(url);
        const data = await response.json();
        if(!response.ok){
            alert(data.message)
            return
        }
        console.log(data)
        const icon = allIcons[data.weather[0].icon] || clearsky;
        console.log("API Key:", import.meta.env.VITE_APP_ID);
        setWeatherData({
            humidity: data.main.humidity,
            windSpeed: data.wind.speed,
            temperature: Math.floor(data.main.temp),
            location: data.name,
            icon: icon,
        })

    }
    catch(error){
        setWeatherData(false);
        console.log("Error in fetching Data");
        
    }
}

useEffect(() => {
    searchApi("")
}, [])
  return (
   <div className='bg-gradient-to-br from-amber-300 via-blue-500 to-blue-950 p-4 text-center w-1/4  rounded-2xl shadow-2xl flex flex-col flex-wrap justify-center items-center gap-8'>

    <div className='flex rounded-3xl bg-white'>
    <input type="text" placeholder='Search Place' className='rounded-l-3xl bg-white border-none placeholder:text-slate-400 py-2 px-4 shadow-xl w-80' ref={inputRef}/>
    <img 
    src={searchbar} 
    width="30px" height="20px" 
    className='bg-white rounded-r-3xl m-2'
    onClick={()=> searchApi(inputRef.current.value)}
    />
    </div>

{
    weatherDtaa ? 
    <>
    <div className='flex flex-col gap-6'>
    <img src={weatherDtaa.icon} alt="{clearsky}" width="150px"/>
    <p className='text-white text-4xl font-semibold'>{weatherDtaa.temperature} ℃</p>
    <p className='text-white text-3xl'>{weatherDtaa.location}</p>
</div>

<div className='flex gap-8 px-4 items-center justify-center'>
<div className='flex flex-col items-center text-white'>
<img src={humidity} width="40px" />
    <p>{weatherDtaa.humidity}</p>
    <p>Humidity</p>
</div>
<div className='flex flex-col items-center text-white'>
<img src={wind} width="40px"  />
    <p>{weatherDtaa.windSpeed}Km/h</p>
    <p>Wind Speed</p>
</div>
</div>

    </> : <></>
}

</div>
  )
}

export default Weather
