import axios from "axios";
import { JSDOM } from "jsdom";
import { News } from "./types";

export const crawlYCombinatorNews = async () => {
  const { data: pageHTML } = await axios.get("https://news.ycombinator.com/");
  return parseNewsFromHTML(pageHTML);
};

const parseNewsFromHTML = (pageHTML: string): News[] => {
  const dom = new JSDOM(`${pageHTML}`);

  const tableContent = dom.window.document.querySelectorAll(
    "#hnmain tr:nth-child(3) table tbody tr"
  );

  const news: News[] = [];
  let currentNews: News | null = null;
  for (const row of tableContent) {
    const isAthingClass = row.className === "athing";
    const isSpacerClass = row.className === "spacer";
    if (isAthingClass && !currentNews) {
      const { title, number } = parseTitleRow(row);
      currentNews = getDefaultNews({
        title,
        number,
      });
    } else if (isSpacerClass && currentNews) {
      news.push(currentNews);
      currentNews = null;
    } else if (currentNews) {
      // If its not the spacer row or athing row we assume we are in the middle row that has all the news information
      const { numberOfComments, points } = parsePointsAndComments(row);
      currentNews.points = points;
      currentNews.numberOfComments = numberOfComments;
    }
  }
  console.log(news);
  return news;
};

const parseTitleRow = (row: Element) => {
  const newsNumber = row
    .querySelector(".title .rank")
    ?.textContent?.replaceAll(".", "");
  const title = row.querySelector(".titleline a")?.textContent ?? "";
  return {
    title,
    number: Number(newsNumber),
  };
};

const parsePointsAndComments = (row: Element) => {
  const numberOfCommentsText =
    row.querySelector(".subline")?.lastElementChild?.textContent;
  const numberOfComments =
    numberOfCommentsText?.replace(/comments?/g, "") ?? "0";

  return {
    numberOfComments:
      numberOfComments === "discuss" ? 0 : Number(numberOfComments),
    points: Number(
      row.querySelector(".score")?.textContent?.replaceAll("points", "") ?? 0
    ),
  };
};

const getDefaultNews = ({
  title,
  points,
  number,
  numberOfComments,
}: Partial<News>): News => ({
  title: title ?? "",
  points: points ?? 0,
  number: number ?? 0,
  numberOfComments: numberOfComments ?? 0,
});
