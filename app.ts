import { Application } from "./depts.ts";

const app = new Application();

app.use((ctx) => {
  ctx.response.body = "Hello World from oak!";
});

await app.listen({ port: 8000 });
