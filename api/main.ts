import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
import "https://deno.land/std@0.215.0/dotenv/load.ts";

const router = new Router();

const client = new Client({
  user: Deno.env.get("VITE_SQL_USER"),
  password: Deno.env.get("VITE_SQL_PASSWORD"),
  database: Deno.env.get("VITE_SQL_DATABASE"),
  hostname: Deno.env.get("VITE_SQL_HOSTNAME"),
  port: 5432,
});

router.get("/api/auth", async (context) => {
  // const sub = context?.params?.sub;
  // const regex = /^\d+$/;
  // if (regex.test(sub)) {
  // TODO: FIX THIS
  const sub = "1234";
  if (sub) {
    const result = await client.queryArray(
      `SELECT sub FROM ${Deno.env.get("VITE_USERS_TABLE")} WHERE sub = ${sub}`,
    );
    context.response.body = result.rows.length > 0;
  } else {
    context.response.body = false;
  }
});

router.get("/api/connections", async (context) => {
  const result = await client.queryArray(
    `SELECT ip, latitude, longitude FROM ${Deno.env.get("VITE_CONNECTIONS_TABLE")}`,
  );
  // console.log(result.rows);
  const jsonResult = result.rows.map((row) => ({
    ip: row[0],
    latitude: row[1],
    longitude: row[2],
  }));

  context.response.body = jsonResult;
});

router.get("/api/connections/:connection", (context) => {
  if (!context?.params?.connection) {
    context.response.body = "This connection does not exist.";
  }

  // // #TODO: Implement checking if connection is in database
  // const connection = data.find(
  //   (item) => item.ip.toLowerCase() === context.params.connection.toLowerCase(),
  // );

  // context.response.body = connection ? connection : "No connection found.";
  context.response.body = "Not implemented yet";
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([`${Deno.cwd()}/dist`, `${Deno.cwd()}/public`]));

await app.listen({ port: 8000 });
