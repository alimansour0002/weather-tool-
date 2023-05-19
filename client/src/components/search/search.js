import { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate"
import { Geo_API_url, GeoAPI } from "../../api";
const Search = ({ onSearch }) => {
    const [search, setSearch] = useState();
    const getOptions = (text) => {
        return fetch(`${Geo_API_url}&namePrefix=${text}`, GeoAPI)
            .then((response) => response.json())
            .then((response) => {
                return {
                    options: response.data.map((city) => {
                        return {
                            value: `${city.latitude} ${city.longitude}`,
                            label: `${city.name}, ${city.countryCode}`,
                        };
                    }),
                };
            })
            .catch(err => console.error.err);

    }
    const handleonechange = (searchData) => {
        setSearch(searchData);
        onSearch(searchData);
    }

    return (
        <AsyncPaginate
            placeholder="Serach for a city"
            debounceTimeout={700}
            value={search}
            onChange={handleonechange}
            loadOptions={getOptions}
        />
    )
}
export default Search;