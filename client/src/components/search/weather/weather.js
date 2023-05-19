import "./weather.css";
const WeatherN = ({ data,numberOfVisits }) => {
    console.log(numberOfVisits,'aaaaaa')
    return (
        <div className="weather">
            <div className="top">
                <div>
                    <p className="city">{data.city}</p>
                    <p className="desc"> {data.weather[0].description}</p>
                </div>
                <img alt="weather" className="W-icon" src={`icons/${data.weather[0].icon}.png`} />
            </div>
            <div className="bottom">
                <p className="temp">{Math.round(data.main.temp)}°C</p>

            </div>
            <div>
                Number of visits : {numberOfVisits}
            </div>
        </div>
    );
};
export default WeatherN;
