-- Initialize script
CREATE TABLE IF NOT EXISTS city_visits(
    city_name VARCHAR(50),
    country_code VARCHAR(10),
    visits INT DEFAULT 0,
    PRIMARY KEY(city_name, country_code)
);