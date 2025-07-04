import app from "./app";
import { Server } from "http";

const port = 5000;

async function main() {
  const server: Server = app.listen(process.env.PORT, () => {
    console.log("port", port);
  });
}

main();