const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
const app = express();

// Connectto the PostgreSQL database
const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'test',
  password: 'postgres',
  port: 5432,
});
app.use(cors())
app.use(express.json());
app.get('/', async (req, res)=>{
  res.json({hi:"ui"})
  
})
// This API endpoint will increment the visits for a city and return the updated number of visits.
app.post('/visit', async (req, res) => {
  console.log('request')
    if(!req.body){
        console.log("No body");
        return
    }
  const { city, countryCode } = req.body;
  
  if (!city || !countryCode) {
    return res.status(400).json({ error: 'Missing city or country code' });
  }
  

  const client = await pool.connect();

  try {
    await client.query('BEGIN');

    const queryText = `
      INSERT INTO city_visits(city_name, country_code, visits)
      VALUES($1, $2, 1)
      ON CONFLICT(city_name, country_code)
      DO UPDATE SET visits = city_visits.visits + 1
      RETURNING visits;
    `;
  
    const { rows } = await client.query(queryText, [city, countryCode]);

    await client.query('COMMIT');
    res.json({ visits: rows[0].visits });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: 'Database error' });
  } finally {
    client.release();
  }
});

const port = 3003;
app.listen(port, () => console.log(`Server is running on port ${port}`));
