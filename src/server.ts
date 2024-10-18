// Deno.serve((_req) => {
//   return new Response("Hello, world");
// });
//

async function handleRequest(request: Request): Promise<Response> {
  const { method, url } = request;
  console.log(method);
  console.log(url);

  if (method === "GET" && url === "https://eicherdev.duckdns.org:5443/data") {
    // Simulate some data, for example, querying from a database
    const data = { message: "Hello, world!" };

    return new Response(JSON.stringify(data), {
      headers: { "Content-Type": "application/json" },
    });
  } else {
    // Handle 404 Not Found
    return new Response("Not Found", { status: 404 });
  }
}

Deno.serve(
  {
    port: 5443,
    cert: Deno.readTextFileSync("/home/saltchicken/cert.pem"),
    key: Deno.readTextFileSync("/home/saltchicken/key.pem"),
  },
  handleRequest,
);
