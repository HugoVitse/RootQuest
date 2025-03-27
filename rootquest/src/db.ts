import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';


dotenv.config({path:path.resolve(__dirname, '../../../../.env')});

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect();
  

export { connection };