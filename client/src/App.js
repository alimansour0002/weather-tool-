import { useState } from 'react';
import './App.css';
import Search from './components/search/search';
import WeatherN from './components/search/weather/weather';
const myKey = "fc92caa5e614e2501e05088daeeac039";

function App() {
  const [currentWeather, setCurrentWeather]= useState(null);
  const [numberOfVisits, setNumberOfVisits] = useState(0)
  const handleSearch = (searchData) => {
    const [lat, lon] = searchData.value.split(" ");
    console.log(searchData.label.split(" "),'oooo')
    const [city, countryCode] = searchData.label.split(" ")
    const weatherFetch = fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${myKey}&units=metric`)
    Promise.all([weatherFetch])
      .then(async(response) => {
        const weatherResult = await response[0].json();
      setCurrentWeather({city: searchData.label, ...weatherResult});
  })
  .catch((err) => console.log(err));
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ city,countryCode })
};
// const visitsFetch = fetch(`http://localhost:3003`)
//     Promise.all([visitsFetch])
//       .then(async(response) => {
//         const visitResult = await response[0].json();
//         console.log(visitResult,'wwwww')
//   })
//   .catch((err) => console.log(err,'eeeeeeeeeeeeee'));
  const visitsFetch = fetch(`http://localhost:3003/visit`, options)
    Promise.all([visitsFetch])
      .then(async(response) => {
        const visitResult = await response[0].json();
        setNumberOfVisits(visitResult.visits)
  })
  .catch((err) => console.log(err));
}
console.log(currentWeather);
return (
  <div className="container">

    <Search onSearch={handleSearch} />
    {currentWeather && <WeatherN data={currentWeather} numberOfVisits={numberOfVisits} />}
  </div>
);
}

export default App;
