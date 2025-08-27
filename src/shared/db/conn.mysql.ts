import mysql from 'mysql2/promise';

export const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'dsw',
  password: process.env.DB_PASSWORD || 'dsw',
  database: process.env.DB_NAME || 'tienda_virtual',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  maxIdle: 10, // maximum number of idle connections
  idleTimeout: 60000, // idle connections timeout in milliseconds
  enableKeepAlive: true,
  keepAliveInitialDelay: 0,

});