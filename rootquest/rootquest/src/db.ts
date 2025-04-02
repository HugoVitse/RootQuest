import mysql from 'mysql2/promise';
import path from 'path';
import dotenv from 'dotenv'

const projectDir =  path.resolve(process.cwd(), '../')
dotenv.config({ path: `${projectDir}/.env` })

const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connection.connect();
  

export { connection };