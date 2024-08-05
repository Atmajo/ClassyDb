import mysql from "mysql";

const client = mysql.createConnection({
  host: process.env.MYSQL_HOST!,
  port: parseInt(process.env.MYSQL_PORT!),
  database: process.env.MYSQL_DATABASE!,
  user: process.env.MYSQL_USER!,
  password: "",
});

export default client;

// client.connect();

// export default async function extq({
//   query,
//   values,
// }: {
//   query: string;
//   values?: string[];
// }) {
  
//   client.query(query, values, function (error, results, fields) {
//     if (error) return error;
//     return results;
//   });
// }
