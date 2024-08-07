import mysql from "mysql";

const client = mysql.createConnection({
  host: process.env.MYSQL_HOST!,
  port: parseInt(process.env.MYSQL_PORT!),
  database: process.env.MYSQL_DATABASE!,
  user: process.env.MYSQL_USER!,
  password: "",
});

export default client;