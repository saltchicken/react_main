import { Application, Router } from "@oak/oak";
import { oakCors } from "@tajpouria/cors";
import routeStaticFilesFrom from "./util/routeStaticFilesFrom.ts";
import { Client } from "https://deno.land/x/postgres@v0.17.0/mod.ts";
// import { Client } from "https://deno.land/x/pg@v0.6.1/mod.ts";
import "https://deno.land/std@0.215.0/dotenv/load.ts";

const router = new Router();

const client = new Client({
  user: Deno.env.get("VITE_SQL_USER"),
  password: Deno.env.get("VITE_SQL_PASSWORD"),
  database: Deno.env.get("VITE_SQL_DATABASE"),
  hostname: Deno.env.get("VITE_SQL_HOSTNAME"),
  port: 5432,
});

router.get("/api/dinosaurs", async (context) => {
  const result = await client.queryArray(
    "SELECT ip, latitude, longitude FROM trak_dev.connections",
  );
  // console.log(result.rows);
  const jsonResult = result.rows.map((row) => ({
    ip: row[0],
    latitude: row[1],
    longitude: row[2],
  }));
  // console.log(newResult);
  // const jsonResult = JSON.stringify(result.rows);
  console.log(jsonResult);

  context.response.body = jsonResult;
});

router.get("/api/dinosaurs/:dinosaur", (context) => {
  if (!context?.params?.dinosaur) {
    context.response.body = "No dinosaur name provided.";
  }

  const dinosaur = data.find(
    (item) => item.name.toLowerCase() === context.params.dinosaur.toLowerCase(),
  );

  context.response.body = dinosaur ? dinosaur : "No dinosaur found.";
});

const app = new Application();
app.use(oakCors());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(routeStaticFilesFrom([`${Deno.cwd()}/dist`, `${Deno.cwd()}/public`]));

await app.listen({ port: 8000 });
