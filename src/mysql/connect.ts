import mysql from "serverless-mysql";

const db = mysql({
  config: {
    host: process.env.MYSQL_HOST,
    port: parseInt(process.env.MYSQL_PORT!),
    database: process.env.MYSQL_DATABASE,
    user: process.env.MYSQL_USER,
    password: "",
  },
});

export default async function extq({
  query,
  values,
}: {
  query: string;
  values?: string;
}) {
  try {
    const results = await db.query(query, values);
    await db.end();
    return results;
  } catch (error) {
    return { error };
  }
}
