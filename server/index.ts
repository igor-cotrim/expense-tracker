import app from "./app";

Bun.serve({
  port: 3333,
  fetch: app.fetch,
});

console.log("Server running on port 3333");
