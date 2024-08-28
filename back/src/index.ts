import express, { Request, Response } from "express";
import { CONFIG } from "./config";
import { crawlYCombinatorNews } from "./service";

const app = express();
const port = CONFIG.PORT || 8080;

app.get("/", async (req: Request, res: Response) => {
  await crawlYCombinatorNews();
  res.send("Hello, TypeScript Express!");
});

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
