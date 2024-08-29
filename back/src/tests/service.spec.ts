import { describe, it } from "node:test";
import assert from "node:assert";
import { JSDOM } from "jsdom";
import {
  filterByWords,
  getNumberOfWords,
  parseNewsFromHTML,
  parsePointsAndComments,
  parseTitleRow,
  sortAndFilterNews,
  toSortedByNumberOfComments,
  toSortedByPoints,
} from "../service";
import { News, SortAndFilterEnum } from "../types";
import {
  HARCODED_DOM,
  HTML,
  NEWS_DATA_1,
  NEWS_DATA_2,
  parseNewsFromHTMLExpectedOutput,
} from "./constants/constants";

describe("Testing toSortedByPoints function", async () => {
  it("Should sort in ascending order news by points.", async () => {
    const expectedOutput: News[] = [
      { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
      { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
      { number: 1, title: "First News", points: 100, numberOfComments: 50 },
      { number: 4, title: "Fourth News", points: 80, numberOfComments: 30 },
    ];

    const sortedData = toSortedByPoints(NEWS_DATA_1);

    assert.deepStrictEqual(sortedData, expectedOutput);
  });
});

describe("Testing toSortedByNumberOfComments function", async () => {
  it("Should sort in ascending order news by number of comments.", async () => {
    const expectedOutput: News[] = [
      { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
      { number: 1, title: "First News", points: 100, numberOfComments: 50 },
      { number: 4, title: "Fourth News", points: 80, numberOfComments: 30 },
      { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
    ];

    const sortedData = toSortedByNumberOfComments(NEWS_DATA_1);

    assert.deepStrictEqual(sortedData, expectedOutput);
  });
});

describe("Testing filterByWords function", async () => {
  it("Should filter news with title greather than 5", async () => {
    const filteredNews = filterByWords(NEWS_DATA_2, 5, true);

    const expectedOutput: News[] = [
      {
        number: 1,
        title: "First News news news news news",
        points: 100,
        numberOfComments: 50,
      },
      {
        number: 4,
        title: "Fourth News news news news news news news",
        points: 80,
        numberOfComments: 30,
      },
      {
        number: 5,
        title: "Fifth News news news news news news news news",
        points: 20,
        numberOfComments: 55,
      },
    ];

    assert.deepStrictEqual(filteredNews, expectedOutput);
  });
  it("Should filter news with title lower or equal than 5", async () => {
    const filteredNews = filterByWords(NEWS_DATA_2, 5, false);

    const expectedOutput: News[] = [
      { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
      { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
      {
        number: 6,
        title: "Sixth News news news news",
        points: 20,
        numberOfComments: 55,
      },
    ];

    assert.deepStrictEqual(filteredNews, expectedOutput);
  });
  it("Should filter news with title lower or equal than 6", async () => {
    const filteredNews = filterByWords(NEWS_DATA_2, 6, false);

    const expectedOutput: News[] = [
      {
        number: 1,
        title: "First News news news news news",
        points: 100,
        numberOfComments: 50,
      },
      { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
      { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
      {
        number: 6,
        title: "Sixth News news news news",
        points: 20,
        numberOfComments: 55,
      },
    ];

    assert.deepStrictEqual(filteredNews, expectedOutput);
  });
  it("Should filter news with title greather than 2", async () => {
    const filteredNews = filterByWords(NEWS_DATA_2, 2, true);

    const expectedOutput: News[] = [
      {
        number: 1,
        title: "First News news news news news",
        points: 100,
        numberOfComments: 50,
      },
      {
        number: 4,
        title: "Fourth News news news news news news news",
        points: 80,
        numberOfComments: 30,
      },
      {
        number: 5,
        title: "Fifth News news news news news news news news",
        points: 20,
        numberOfComments: 55,
      },
      {
        number: 6,
        title: "Sixth News news news news",
        points: 20,
        numberOfComments: 55,
      },
    ];

    assert.deepStrictEqual(filteredNews, expectedOutput);
  });
});

describe("Testing getNumberOfWords function", async () => {
  it("Should return number of words without symbols and not counting empty spaces", async () => {
    const NUMBER_OF_WORDS = getNumberOfWords("Hello this is super-amazing.");

    assert.strictEqual(NUMBER_OF_WORDS, 4);
  });
  it("Should return number of words without symbols and not counting empty spaces", async () => {
    const NUMBER_OF_WORDS = getNumberOfWords(
      "This is - a self-explained example"
    );

    assert.strictEqual(NUMBER_OF_WORDS, 5);
  });
  it("Should return number of words without symbols and not counting empty spaces", async () => {
    const NUMBER_OF_WORDS = getNumberOfWords("Hello Hello Hello        ");

    assert.strictEqual(NUMBER_OF_WORDS, 3);
  });
  it("Should return number of words without symbols and not counting empty spaces", async () => {
    const NUMBER_OF_WORDS = getNumberOfWords("0 -");

    assert.strictEqual(NUMBER_OF_WORDS, 1);
  });
  it("Should return number of words without symbols and not counting empty spaces", async () => {
    const NUMBER_OF_WORDS = getNumberOfWords("- . ! !");

    assert.strictEqual(NUMBER_OF_WORDS, 0);
  });
});

describe("Testing sortAndFilterNews function", async () => {
  it("Should filter news with title with more than 5 words and then sort by number of comments", async () => {
    const expectedOutput: News[] = [
      {
        number: 5,
        title: "Fifth News news news news news news news news",
        points: 20,
        numberOfComments: 55,
      },
      {
        number: 1,
        title: "First News news news news news",
        points: 100,
        numberOfComments: 50,
      },
      {
        number: 4,
        title: "Fourth News news news news news news news",
        points: 80,
        numberOfComments: 30,
      },
    ];

    const sortedData = sortAndFilterNews(
      NEWS_DATA_2,
      SortAndFilterEnum.NumberCommentsAndWordsGreatherThan
    );

    assert.deepStrictEqual(sortedData, expectedOutput);
  });
  it("Should filter news with title with less or equal than 5 words and then sort by points", async () => {
    const expectedOutput: News[] = [
      { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
      { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
      {
        number: 6,
        title: "Sixth News news news news",
        points: 20,
        numberOfComments: 55,
      },
    ];
    const sortedData = sortAndFilterNews(
      NEWS_DATA_2,
      SortAndFilterEnum.PointsAndWordsLowerThan
    );
    assert.deepStrictEqual(sortedData, expectedOutput);
  });
  it("Should return all news", async () => {
    const sortedData = sortAndFilterNews(NEWS_DATA_2, SortAndFilterEnum.All);
    assert.deepStrictEqual(sortedData, NEWS_DATA_2);
  });
});

describe("Testing parsePointsAndComments function", async () => {
  it("Should return partial news with comments and points.", async (t) => {
    const dom = new JSDOM(`
     <div class="item"><tr class='athing' id='41386319'>
      <td align="right" valign="top" class="title"><span class="rank">1.</span></td>      
      <td valign="top" class="votelinks"><center><a id='up_41386319' href='vote?id=41386319&amp;how=up&amp;goto=news'>
      <div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://blog.hopefullyuseful.com/blog/advantage-air-ezone-tablet-diy-repair/">Air Con: $1697 for an on&#x2F;off switch</a><span class="sitebit comhead"> (<a href="from?site=hopefullyuseful.com"><span class="sitestr">hopefullyuseful.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
      <span class="score" id="score_41386319">1080 points</span> by <a href="user?id=ranebo" class="hnuser">ranebo</a> 
      <span class="age" title="2024-08-29T01:28:01"><a href="item?id=41386319">8 hours ago</a></span> <span id="unv_41386319"></span> | <a href="hide?id=41386319&amp;goto=news">hide</a> | <a href="item?id=41386319">274&nbsp;comments</a>        </span>
      </td></tr>
      <tr class="spacer" style="height:5px"></tr>
      </div>
    `);

    const row = dom.window.document.querySelector(".item") as Element;
    const result = parsePointsAndComments(row);

    // Expected output
    const expectedOutput = {
      numberOfComments: 274,
      points: 1080,
    };

    assert.deepStrictEqual(expectedOutput, result);
  });
  it("Should return partial news with comments and points 2", async (t) => {
    const dom = new JSDOM(`
     <div class="item"><tr class='athing' id='41389176'>
      <td align="right" valign="top" class="title"><span class="rank">4.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389176' href='vote?id=41389176&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/remipch/solar_concentrator">Show HN: Homemade Automated Solar Concentrator</a><span class="sitebit comhead"> (<a href="from?site=github.com/remipch"><span class="sitestr">github.com/remipch</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
      <span class="score" id="score_41389176">11 points</span> by <a href="user?id=remipch" class="hnuser">remipch</a> <span class="age" title="2024-08-29T10:14:00"><a href="item?id=41389176">27 minutes ago</a></span> <span id="unv_41389176"></span> | <a href="hide?id=41389176&amp;goto=news">hide</a> | <a href="item?id=41389176">discuss</a>        </span>
      </td></tr>
      <tr class="spacer" style="height:5px"></tr>
      </div>
    `);

    const row = dom.window.document.querySelector(".item") as Element;
    const result = parsePointsAndComments(row);

    // Expected output
    const expectedOutput = {
      numberOfComments: 0,
      points: 11,
    };

    assert.deepStrictEqual(expectedOutput, result);
  });
});

describe("Testing parseTitleRow function", async () => {
  it("Should return partial news with title and number.", async () => {
    const dom = new JSDOM(HARCODED_DOM);
    const row = dom.window.document.querySelector(".item") as Element;
    const result = parseTitleRow(row);
    const expectedOutput = {
      title: "Air Con: $1697 for an on/off switch",
      number: 1,
    };

    assert.deepStrictEqual(expectedOutput, result);
  });
});

describe("Testing parseNewsFromHTML function", async () => {
  it("Should return news array", async () => {
    const result = parseNewsFromHTML(HTML);
    assert.deepStrictEqual(result, parseNewsFromHTMLExpectedOutput);
  });
});
