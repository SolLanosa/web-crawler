import express, { Request, Response } from "express";
import { CONFIG } from "./config";
import { crawlYCombinatorNews } from "./service";
import { convertValueToSortAndFilterEnum } from "./utils";
import cors from "cors";
const app = express();
const port = CONFIG.PORT || 8080;

app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const sortAndFilter = convertValueToSortAndFilterEnum(
    req.query.sortAndFilter as string | undefined
  );

  const news = await crawlYCombinatorNews(sortAndFilter);
  res.send(news);
});

const httpServer = app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
