// connect postgresql database
const { Client } = require('pg');


const client = new Client({
    connectionString: `postgres://${process.env.USER}:${process.env.PASSWORD}@${process.env.HOST}:${process.env.PORT}/${process.env.DATABASE}`,
});

// connect to database
client.connect(); 