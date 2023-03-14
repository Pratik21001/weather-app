import React,{useEffect,useState} from 'react';
import '../components/style.css';
import Details from './Details';

function SearchMain() {
  const[searchTerm,SetSearchTerm]=useState('indore');
  const[tempInfo,SetTempInfo]=useState({});

const getWeatherInfo = async() =>{
try{
  let url =`https://api.openweathermap.org/data/2.5/weather?q=${searchTerm}&units=metric&appid=10c1e422ba86362520e4d1a83fe931c0`;
  let res = await fetch(url);
  let data = await res.json();
  const{temp,humidity,pressure} = data.main;
  const{main: weatherType} = data.weather[0];
  const{name}=data;
  const{speed}=data.wind;
  const{country,sunrise}=data.sys;


const myNewWeatherInfo ={
  temp,
  humidity,
  pressure,
  weatherType,
  name,
  speed,
  country,
  sunrise,
};

SetTempInfo(myNewWeatherInfo);

  // console.log(data);
}catch(error){
  console.log(error);
}
};


useEffect( () => {
getWeatherInfo();
},[])

 return (
    <>
  <div className="wrap">
  <div className="search">
    <input
     type="search" 
     placeholder="Search city..." 
     id="search"
     value={searchTerm} 
     onChange={(e)=> SetSearchTerm(e.target.value)}
     />
     <button className="searchButton" onClick={getWeatherInfo}>Seach</button>
  </div>
  </div>
  
  <Details {...tempInfo}/>
  </>
  )
}

export default SearchMain;