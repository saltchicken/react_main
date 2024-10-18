// server.ts
import { serve } from "https://deno.land/std/http/server.ts";
import { connectDB, closeDB, client } from "./db.ts";

async function handleRequest(request: Request) {
  await connectDB();

  if (request.method === "GET" && request.url === "/api/data") {
    try {
      const result = await client.query("SELECT * FROM trak_dev.connections"); // replace with your query
      const data = result.rows;

      return new Response(JSON.stringify(data), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Query error:", error);
      return new Response("Internal Server Error", { status: 500 });
    } finally {
      await closeDB();
    }
  }

  return new Response("Not found", { status: 404 });
}

async function startServer() {
  const server = serve({ port: 8000 });
  console.log("Server running on http://localhost:8000");

  for await (const request of server) {
    const response = await handleRequest(request);
    request.respond(response);
  }
}

startServer();
