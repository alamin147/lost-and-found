import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes/routes";
import errorHandler from "./app/midddlewares/errorHandler";

const app: Application = express();

app.use(
  cors({
    origin: ["http://localhost:3000","https://lost-found-last.vercel.app"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send({ message: "Welcome to Lost and found services" });
});

app.use("/api", router);
app.use(errorHandler);

app.use((req: Request, res: Response) => {
  res.status(404).send({
    statusCode: 404,
    success: false,
    message: "Sorry, We can't find that!",
  });
});

export default app;
