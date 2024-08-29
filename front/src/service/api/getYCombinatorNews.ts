import { News } from "@/types/types";
import server from "../server";

export const getYCombinatorNews = async (
  sortAndFilter: string
): Promise<News[]> => {
  const res = await server.get(`?sortAndFilter=${sortAndFilter}`);
  return res.data;
};
