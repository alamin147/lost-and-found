import app from "./app";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 5000;
async function main() {
  app.listen(PORT, () => {
    console.log("port", PORT);
  });
}

main();
