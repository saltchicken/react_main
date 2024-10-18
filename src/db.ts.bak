import { Client } from "http://deno.land/x/postgres@v0.16.1/mod.ts";

const client = new Client({
  user: import.meta.env.VITE_SQL_USER,
  database: import.meta.env.VITE_SQL_DATABASE,
  hostname: import.meta.env.VITE_SQL_HOSTNAME,
  port: 5432,
});

export async function connectDB() {
  await client.connect();
  console.log("Connect to PostgreSQL");
}

export async function closeDB() {
  await client.end();
  console.log("Disconnected from PostgreSQL");
}

export { client };
