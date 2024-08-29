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

const NEWS_DATA_1: News[] = [
  { number: 1, title: "First News", points: 100, numberOfComments: 50 },
  { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
  { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
  { number: 4, title: "Fourth News", points: 80, numberOfComments: 30 },
];

const NEWS_DATA_2: News[] = [
  {
    number: 1,
    title: "First News news news news news",
    points: 100,
    numberOfComments: 50,
  },
  { number: 2, title: "Second News", points: 150, numberOfComments: 20 },
  { number: 3, title: "Third News", points: 120, numberOfComments: 60 },
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
    const dom = new JSDOM(`
     <div class="item">
     <tr class='athing' id='41386319'>
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
    const result = parseTitleRow(row);
    // Expected output
    const expectedOutput = {
      title: "Air Con: $1697 for an on/off switch",
      number: 1,
    };

    assert.deepStrictEqual(expectedOutput, result);
  });
});

describe("Testing parseNewsFromHTML function", async () => {
  it("Should return news array", async () => {
    const html = `
     <table id="hnmain" border="0" cellpadding="0" cellspacing="0" width="85%" bgcolor="#f6f6ef">
        <tr><td bgcolor="#ff6600"><table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding:2px"><tr><td style="width:18px;padding-right:4px"><a href="https://news.ycombinator.com"><img src="y18.svg" width="18" height="18" style="border:1px white solid; display:block"></a></td>
                  <td style="line-height:12pt; height:10px;"><span class="pagetop"><b class="hnname"><a href="news">Hacker News</a></b>
                            <a href="newest">new</a> | <a href="front">past</a> | <a href="newcomments">comments</a> | <a href="ask">ask</a> | <a href="show">show</a> | <a href="jobs">jobs</a> | <a href="submit" rel="nofollow">submit</a>            </span></td><td style="text-align:right;padding-right:4px;"><span class="pagetop">
                              <a href="login?goto=news">login</a>
                          </span></td>
              </tr></table></td></tr>
<tr id="pagespace" title="" style="height:10px"></tr><tr><td><table border="0" cellpadding="0" cellspacing="0">
            <tr class='athing' id='41389185'>
      <td align="right" valign="top" class="title"><span class="rank">1.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389185' href='vote?id=41389185&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://glama.ai/blog/2024-08-29-reverse-engineering-minified-code-using-openai">OpenAI is shockingly good at unminifying code</a><span class="sitebit comhead"> (<a href="from?site=glama.ai"><span class="sitestr">glama.ai</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389185">93 points</span> by <a href="user?id=punkpeye" class="hnuser">punkpeye</a> <span class="age" title="2024-08-29T10:14:50"><a href="item?id=41389185">1 hour ago</a></span> <span id="unv_41389185"></span> | <a href="hide?id=41389185&amp;goto=news">hide</a> | <a href="item?id=41389185">49&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41386319'>
      <td align="right" valign="top" class="title"><span class="rank">2.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41386319' href='vote?id=41386319&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://blog.hopefullyuseful.com/blog/advantage-air-ezone-tablet-diy-repair/">Air Con: $1697 for an on&#x2F;off switch</a><span class="sitebit comhead"> (<a href="from?site=hopefullyuseful.com"><span class="sitestr">hopefullyuseful.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41386319">1195 points</span> by <a href="user?id=ranebo" class="hnuser">ranebo</a> <span class="age" title="2024-08-29T01:28:01"><a href="item?id=41386319">10 hours ago</a></span> <span id="unv_41386319"></span> | <a href="hide?id=41386319&amp;goto=news">hide</a> | <a href="item?id=41386319">295&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41389176'>
      <td align="right" valign="top" class="title"><span class="rank">3.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389176' href='vote?id=41389176&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/remipch/solar_concentrator">Show HN: Homemade Automated Solar Concentrator</a><span class="sitebit comhead"> (<a href="from?site=github.com/remipch"><span class="sitestr">github.com/remipch</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389176">48 points</span> by <a href="user?id=remipch" class="hnuser">remipch</a> <span class="age" title="2024-08-29T10:14:00"><a href="item?id=41389176">1 hour ago</a></span> <span id="unv_41389176"></span> | <a href="hide?id=41389176&amp;goto=news">hide</a> | <a href="item?id=41389176">8&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41389326'>
      <td align="right" valign="top" class="title"><span class="rank">4.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389326' href='vote?id=41389326&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://collidingscopes.github.io/ascii/">Show HN: turn videos into ASCII art (open source, js+canvas)</a><span class="sitebit comhead"> (<a href="from?site=collidingscopes.github.io"><span class="sitestr">collidingscopes.github.io</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389326">22 points</span> by <a href="user?id=getToTheChopin" class="hnuser">getToTheChopin</a> <span class="age" title="2024-08-29T10:35:55"><a href="item?id=41389326">1 hour ago</a></span> <span id="unv_41389326"></span> | <a href="hide?id=41389326&amp;goto=news">hide</a> | <a href="item?id=41389326">6&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388326'>
      <td align="right" valign="top" class="title"><span class="rank">5.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41388326' href='vote?id=41388326&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.quantamagazine.org/computer-scientists-prove-that-heat-destroys-entanglement-20240828/">Computer Scientists Prove That Heat Destroys Entanglement</a><span class="sitebit comhead"> (<a href="from?site=quantamagazine.org"><span class="sitestr">quantamagazine.org</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41388326">67 points</span> by <a href="user?id=isaacfrond" class="hnuser">isaacfrond</a> <span class="age" title="2024-08-29T07:41:36"><a href="item?id=41388326">4 hours ago</a></span> <span id="unv_41388326"></span> | <a href="hide?id=41388326&amp;goto=news">hide</a> | <a href="item?id=41388326">20&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388888'>
      <td align="right" valign="top" class="title"><span class="rank">6.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41388888' href='vote?id=41388888&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.politico.eu/article/uk-rail-minister-peter-hendy-fired-gareth-dennis-engineer-safety-concerns-trains-london-euston-station/">UK rail minister got engineer sacked for raising safety concerns</a><span class="sitebit comhead"> (<a href="from?site=politico.eu"><span class="sitestr">politico.eu</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41388888">166 points</span> by <a href="user?id=scrlk" class="hnuser">scrlk</a> <span class="age" title="2024-08-29T09:19:36"><a href="item?id=41388888">2 hours ago</a></span> <span id="unv_41388888"></span> | <a href="hide?id=41388888&amp;goto=news">hide</a> | <a href="item?id=41388888">88&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41389126'>
      <td align="right" valign="top" class="title"><span class="rank">7.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389126' href='vote?id=41389126&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://languagelog.ldc.upenn.edu/nll/?p=73">Two Dots Too Many – a tragic consequence of the failure to localize cell phones (2008)</a><span class="sitebit comhead"> (<a href="from?site=upenn.edu"><span class="sitestr">upenn.edu</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389126">27 points</span> by <a href="user?id=Alifatisk" class="hnuser">Alifatisk</a> <span class="age" title="2024-08-29T10:04:43"><a href="item?id=41389126">1 hour ago</a></span> <span id="unv_41389126"></span> | <a href="hide?id=41389126&amp;goto=news">hide</a> | <a href="item?id=41389126">11&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41387922'>
      <td align="right" valign="top" class="title"><span class="rank">8.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41387922' href='vote?id=41387922&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://docusaurus.io/">Docusaurus – Build optimized websites quickly, focus on your content</a><span class="sitebit comhead"> (<a href="from?site=docusaurus.io"><span class="sitestr">docusaurus.io</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41387922">74 points</span> by <a href="user?id=yamrzou" class="hnuser">yamrzou</a> <span class="age" title="2024-08-29T06:27:36"><a href="item?id=41387922">5 hours ago</a></span> <span id="unv_41387922"></span> | <a href="hide?id=41387922&amp;goto=news">hide</a> | <a href="item?id=41387922">23&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388807'>
      <td align="right" valign="top" class="title"><span class="rank">9.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41388807' href='vote?id=41388807&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://review.firstround.com/how-superhuman-built-an-engine-to-find-product-market-fit/">Superhuman Built an Engine to Find Product Market Fit (2018)</a><span class="sitebit comhead"> (<a href="from?site=firstround.com"><span class="sitestr">firstround.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41388807">14 points</span> by <a href="user?id=tekkk" class="hnuser">tekkk</a> <span class="age" title="2024-08-29T09:06:17"><a href="item?id=41388807">2 hours ago</a></span> <span id="unv_41388807"></span> | <a href="hide?id=41388807&amp;goto=news">hide</a> | <a href="item?id=41388807">2&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388805'>
      <td align="right" valign="top" class="title"><span class="rank">10.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41388805' href='vote?id=41388805&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://paul.kinlan.me/fictitious-web/">I spent an evening on a fictitious web</a><span class="sitebit comhead"> (<a href="from?site=kinlan.me"><span class="sitestr">kinlan.me</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41388805">18 points</span> by <a href="user?id=kinlan" class="hnuser">kinlan</a> <span class="age" title="2024-08-29T09:05:47"><a href="item?id=41388805">2 hours ago</a></span> <span id="unv_41388805"></span> | <a href="hide?id=41388805&amp;goto=news">hide</a> | <a href="item?id=41388805">6&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41378317'>
      <td align="right" valign="top" class="title"><span class="rank">11.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41378317' href='vote?id=41378317&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.qemu.org/docs/master/system/replay.html">Deterministic Replay of QEMU Emulation</a><span class="sitebit comhead"> (<a href="from?site=qemu.org"><span class="sitestr">qemu.org</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41378317">86 points</span> by <a href="user?id=Intralexical" class="hnuser">Intralexical</a> <span class="age" title="2024-08-28T11:24:23"><a href="item?id=41378317">8 hours ago</a></span> <span id="unv_41378317"></span> | <a href="hide?id=41378317&amp;goto=news">hide</a> | <a href="item?id=41378317">20&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41387674'>
      <td align="right" valign="top" class="title"><span class="rank">12.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41387674' href='vote?id=41387674&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.saturdayeveningpost.com/wp-content/uploads/satevepost/what_life_means_to_einstein.pdf">What Life Means to Einstein (1929) [pdf]</a><span class="sitebit comhead"> (<a href="from?site=saturdayeveningpost.com"><span class="sitestr">saturdayeveningpost.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41387674">60 points</span> by <a href="user?id=magda_wang" class="hnuser">magda_wang</a> <span class="age" title="2024-08-29T05:32:49"><a href="item?id=41387674">6 hours ago</a></span> <span id="unv_41387674"></span> | <a href="hide?id=41387674&amp;goto=news">hide</a> | <a href="item?id=41387674">35&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41389378'>
      <td align="right" valign="top" class="title"><span class="rank">13.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389378' href='vote?id=41389378&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://web.archive.org/web/20070221033032/https://news.ycombinator.com/">The first snapshot of Hacker News on Archive.org</a><span class="sitebit comhead"> (<a href="from?site=archive.org"><span class="sitestr">archive.org</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389378">21 points</span> by <a href="user?id=snail-test" class="hnuser">snail-test</a> <span class="age" title="2024-08-29T10:42:45"><a href="item?id=41389378">1 hour ago</a></span> <span id="unv_41389378"></span> | <a href="hide?id=41389378&amp;goto=news">hide</a> | <a href="item?id=41389378">5&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41389000'>
      <td align="right" valign="top" class="title"><span class="rank">14.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41389000' href='vote?id=41389000&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.theguardian.com/society/article/2024/aug/28/type-2-diabetes-drug-associated-with-35-lower-risk-of-dementia-study-finds">Type 2 diabetes drug associated with 35% lower risk of dementia, study finds</a><span class="sitebit comhead"> (<a href="from?site=theguardian.com"><span class="sitestr">theguardian.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41389000">38 points</span> by <a href="user?id=monkey_monkey" class="hnuser">monkey_monkey</a> <span class="age" title="2024-08-29T09:44:11"><a href="item?id=41389000">1 hour ago</a></span> <span id="unv_41389000"></span> | <a href="hide?id=41389000&amp;goto=news">hide</a> | <a href="item?id=41389000">11&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388111'>
      <td align="right" valign="top" class="title"><span class="rank">15.</span></td>      <td><img src="s.gif" height="1" width="14"></td>       <td class="title"><span class="titleline"><a href="https://www.ycombinator.com/companies/windmill/jobs/REsQMZa-rust-typescript-engineer">Windmill (YC S22) Hiring Rust and TypeScript Eng #3 in Paris</a><span class="sitebit comhead"> (<a href="from?site=ycombinator.com"><span class="sitestr">ycombinator.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext">
        <span class="age" title="2024-08-29T07:01:10"><a href="item?id=41388111">4 hours ago</a></span> | <a href="hide?id=41388111&amp;goto=news">hide</a>      </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41381598'>
      <td align="right" valign="top" class="title"><span class="rank">16.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41381598' href='vote?id=41381598&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/sjpiper145/MakerSkillTree">Maker Skill Trees</a><span class="sitebit comhead"> (<a href="from?site=github.com/sjpiper145"><span class="sitestr">github.com/sjpiper145</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41381598">382 points</span> by <a href="user?id=saulpw" class="hnuser">saulpw</a> <span class="age" title="2024-08-28T17:01:15"><a href="item?id=41381598">18 hours ago</a></span> <span id="unv_41381598"></span> | <a href="hide?id=41381598&amp;goto=news">hide</a> | <a href="item?id=41381598">84&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41382335'>
      <td align="right" valign="top" class="title"><span class="rank">17.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41382335' href='vote?id=41382335&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.windowmaker.org/">Window Maker: X11 window manager with the look and feel of the NeXTSTEP UI</a><span class="sitebit comhead"> (<a href="from?site=windowmaker.org"><span class="sitestr">windowmaker.org</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41382335">239 points</span> by <a href="user?id=lnyan" class="hnuser">lnyan</a> <span class="age" title="2024-08-28T18:05:29"><a href="item?id=41382335">17 hours ago</a></span> <span id="unv_41382335"></span> | <a href="hide?id=41382335&amp;goto=news">hide</a> | <a href="item?id=41382335">119&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41347188'>
      <td align="right" valign="top" class="title"><span class="rank">18.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41347188' href='vote?id=41347188&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://simonwillison.net/2024/Aug/24/pipe-syntax-in-sql/">Google&#x27;s new pipe syntax in SQL</a><span class="sitebit comhead"> (<a href="from?site=simonwillison.net"><span class="sitestr">simonwillison.net</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41347188">285 points</span> by <a href="user?id=heydenberk" class="hnuser">heydenberk</a> <span class="age" title="2024-08-25T13:33:23"><a href="item?id=41347188">15 hours ago</a></span> <span id="unv_41347188"></span> | <a href="hide?id=41347188&amp;goto=news">hide</a> | <a href="item?id=41347188">140&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41347422'>
      <td align="right" valign="top" class="title"><span class="rank">19.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41347422' href='vote?id=41347422&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/goshops-com/clipshare">An incredibly simple, open-source alternative to Loom that only requires S3</a><span class="sitebit comhead"> (<a href="from?site=github.com/goshops-com"><span class="sitestr">github.com/goshops-com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41347422">19 points</span> by <a href="user?id=sjcotto" class="hnuser">sjcotto</a> <span class="age" title="2024-08-25T14:10:22"><a href="item?id=41347422">5 hours ago</a></span> <span id="unv_41347422"></span> | <a href="hide?id=41347422&amp;goto=news">hide</a> | <a href="item?id=41347422">6&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41338124'>
      <td align="right" valign="top" class="title"><span class="rank">20.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41338124' href='vote?id=41338124&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/Explosion-Scratch/firebuilder">Show HN: Firebuilder: A complete Firefox customization tool</a><span class="sitebit comhead"> (<a href="from?site=github.com/explosion-scratch"><span class="sitestr">github.com/explosion-scratch</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41338124">102 points</span> by <a href="user?id=explosion-s" class="hnuser">explosion-s</a> <span class="age" title="2024-08-24T13:22:00"><a href="item?id=41338124">11 hours ago</a></span> <span id="unv_41338124"></span> | <a href="hide?id=41338124&amp;goto=news">hide</a> | <a href="item?id=41338124">10&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41388335'>
      <td align="right" valign="top" class="title"><span class="rank">21.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41388335' href='vote?id=41388335&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://github.com/dh1011/llm-term">Show HN: LLM-Term – Simple Rust-based CLI assist tool</a><span class="sitebit comhead"> (<a href="from?site=github.com/dh1011"><span class="sitestr">github.com/dh1011</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41388335">9 points</span> by <a href="user?id=dh1011" class="hnuser">dh1011</a> <span class="age" title="2024-08-29T07:42:45"><a href="item?id=41388335">4 hours ago</a></span> <span id="unv_41388335"></span> | <a href="hide?id=41388335&amp;goto=news">hide</a> | <a href="item?id=41388335">3&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41382828'>
      <td align="right" valign="top" class="title"><span class="rank">22.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41382828' href='vote?id=41382828&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://lamport.azurewebsites.net/tla/future.pdf">The Future of TLA+ [pdf]</a><span class="sitebit comhead"> (<a href="from?site=lamport.azurewebsites.net"><span class="sitestr">lamport.azurewebsites.net</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41382828">176 points</span> by <a href="user?id=tkhattra" class="hnuser">tkhattra</a> <span class="age" title="2024-08-28T18:46:50"><a href="item?id=41382828">16 hours ago</a></span> <span id="unv_41382828"></span> | <a href="hide?id=41382828&amp;goto=news">hide</a> | <a href="item?id=41382828">73&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41355731'>
      <td align="right" valign="top" class="title"><span class="rank">23.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41355731' href='vote?id=41355731&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.zdnet.com/article/linus-torvalds-talks-ai-rust-adoption-and-why-the-linux-kernel-is-the-only-thing-that-matters/">Linus Torvalds talks AI, Rust, &amp; why Linux is the only thing that matters</a><span class="sitebit comhead"> (<a href="from?site=zdnet.com"><span class="sitestr">zdnet.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41355731">17 points</span> by <a href="user?id=CrankyBear" class="hnuser">CrankyBear</a> <span class="age" title="2024-08-26T10:24:35"><a href="item?id=41355731">1 hour ago</a></span> <span id="unv_41355731"></span> | <a href="hide?id=41355731&amp;goto=news">hide</a> | <a href="item?id=41355731">5&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41382687'>
      <td align="right" valign="top" class="title"><span class="rank">24.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41382687' href='vote?id=41382687&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://stepchange.work/blog/scaling-rails-postgres-to-millions-of-users-at-microsoft-lessons-takeaways">Scaling Rails and Postgres to millions of users at Microsoft</a><span class="sitebit comhead"> (<a href="from?site=stepchange.work"><span class="sitestr">stepchange.work</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41382687">171 points</span> by <a href="user?id=htormey" class="hnuser">htormey</a> <span class="age" title="2024-08-28T18:34:01"><a href="item?id=41382687">17 hours ago</a></span> <span id="unv_41382687"></span> | <a href="hide?id=41382687&amp;goto=news">hide</a> | <a href="item?id=41382687">50&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41347789'>
      <td align="right" valign="top" class="title"><span class="rank">25.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41347789' href='vote?id=41347789&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.cambridge.org/core/journals/antiquity/article/emergence-of-monumental-architecture-in-atlantic-europe-a-fortified-fifthmillennium-bc-enclosure-in-western-france/8ED741E657BCBE5522E7EC273F7D697D">Monumental architecture in Atlantic Europe: fifth-millennium BC enclosure</a><span class="sitebit comhead"> (<a href="from?site=cambridge.org"><span class="sitestr">cambridge.org</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41347789">42 points</span> by <a href="user?id=bookofjoe" class="hnuser">bookofjoe</a> <span class="age" title="2024-08-25T15:02:04"><a href="item?id=41347789">11 hours ago</a></span> <span id="unv_41347789"></span> | <a href="hide?id=41347789&amp;goto=news">hide</a> | <a href="item?id=41347789">2&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41384144'>
      <td align="right" valign="top" class="title"><span class="rank">26.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41384144' href='vote?id=41384144&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://skip.tools/">Show HN: Skip – Build native iOS and Android apps from a single Swift codebase</a><span class="sitebit comhead"> (<a href="from?site=skip.tools"><span class="sitestr">skip.tools</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41384144">247 points</span> by <a href="user?id=marcprux" class="hnuser">marcprux</a> <span class="age" title="2024-08-28T20:44:29"><a href="item?id=41384144">14 hours ago</a></span> <span id="unv_41384144"></span> | <a href="hide?id=41384144&amp;goto=news">hide</a> | <a href="item?id=41384144">82&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41386667'>
      <td align="right" valign="top" class="title"><span class="rank">27.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41386667' href='vote?id=41386667&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.tomshardware.com/pc-components/gpus/hdmi-forum-rejects-amds-hdmi-21-open-source-driver">HDMI Forum rejects AMD&#x27;s HDMI 2.1 open-source driver</a><span class="sitebit comhead"> (<a href="from?site=tomshardware.com"><span class="sitestr">tomshardware.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41386667">229 points</span> by <a href="user?id=FleetAdmiralJa" class="hnuser">FleetAdmiralJa</a> <span class="age" title="2024-08-29T02:28:54"><a href="item?id=41386667">9 hours ago</a></span> <span id="unv_41386667"></span> | <a href="hide?id=41386667&amp;goto=news">hide</a> | <a href="item?id=41386667">113&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41381569'>
      <td align="right" valign="top" class="title"><span class="rank">28.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41381569' href='vote?id=41381569&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://connect.na.panasonic.com/toughbook/rugged-computers/toughbook-40">Panasonic Toughbook 40</a><span class="sitebit comhead"> (<a href="from?site=panasonic.com"><span class="sitestr">panasonic.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41381569">175 points</span> by <a href="user?id=fidotron" class="hnuser">fidotron</a> <span class="age" title="2024-08-28T16:58:16"><a href="item?id=41381569">18 hours ago</a></span> <span id="unv_41381569"></span> | <a href="hide?id=41381569&amp;goto=news">hide</a> | <a href="item?id=41381569">161&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41356954'>
      <td align="right" valign="top" class="title"><span class="rank">29.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41356954' href='vote?id=41356954&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.adventurekid.se/2015/05/if-you-love-something-set-it-free-akwf-waveforms-are-now-in-the-public-domain/" rel="nofollow">If you love something set it free – AKWF Waveforms now in public domain (2015)</a><span class="sitebit comhead"> (<a href="from?site=adventurekid.se"><span class="sitestr">adventurekid.se</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41356954">15 points</span> by <a href="user?id=Tomte" class="hnuser">Tomte</a> <span class="age" title="2024-08-26T13:33:44"><a href="item?id=41356954">5 hours ago</a></span> <span id="unv_41356954"></span> | <a href="hide?id=41356954&amp;goto=news">hide</a> | <a href="item?id=41356954">3&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
                <tr class='athing' id='41356415'>
      <td align="right" valign="top" class="title"><span class="rank">30.</span></td>      <td valign="top" class="votelinks"><center><a id='up_41356415' href='vote?id=41356415&amp;how=up&amp;goto=news'><div class='votearrow' title='upvote'></div></a></center></td><td class="title"><span class="titleline"><a href="https://www.washingtonpost.com/sf/style/2017/08/07/chefs-say-a-dishwasher-can-make-or-break-a-restaurant-so-i-signed-up-for-a-shift/">A dishwasher can make or break a restaurant (2017)</a><span class="sitebit comhead"> (<a href="from?site=washingtonpost.com"><span class="sitestr">washingtonpost.com</span></a>)</span></span></td></tr><tr><td colspan="2"></td><td class="subtext"><span class="subline">
          <span class="score" id="score_41356415">255 points</span> by <a href="user?id=mhb" class="hnuser">mhb</a> <span class="age" title="2024-08-26T12:17:21"><a href="item?id=41356415">1 day ago</a></span> <span id="unv_41356415"></span> | <a href="hide?id=41356415&amp;goto=news">hide</a> | <a href="item?id=41356415">446&nbsp;comments</a>        </span>
              </td></tr>
      <tr class="spacer" style="height:5px"></tr>
            <tr class="morespace" style="height:10px"></tr><tr><td colspan="2"></td>
      <td class='title'><a href='?p=2' class='morelink' rel='next'>More</a></td>    </tr>
  </table>
    `;

    const result = parseNewsFromHTML(html);

    const expectedOutput = [
      {
        title: "OpenAI is shockingly good at unminifying code",
        points: 93,
        number: 1,
        numberOfComments: 49,
      },
      {
        title: "Air Con: $1697 for an on/off switch",
        points: 1195,
        number: 2,
        numberOfComments: 295,
      },
      {
        title: "Show HN: Homemade Automated Solar Concentrator",
        points: 48,
        number: 3,
        numberOfComments: 8,
      },
      {
        title: "Show HN: turn videos into ASCII art (open source, js+canvas)",
        points: 22,
        number: 4,
        numberOfComments: 6,
      },
      {
        title: "Computer Scientists Prove That Heat Destroys Entanglement",
        points: 67,
        number: 5,
        numberOfComments: 20,
      },
      {
        title:
          "UK rail minister got engineer sacked for raising safety concerns",
        points: 166,
        number: 6,
        numberOfComments: 88,
      },
      {
        title:
          "Two Dots Too Many – a tragic consequence of the failure to localize cell phones (2008)",
        points: 27,
        number: 7,
        numberOfComments: 11,
      },
      {
        title:
          "Docusaurus – Build optimized websites quickly, focus on your content",
        points: 74,
        number: 8,
        numberOfComments: 23,
      },
      {
        title: "Superhuman Built an Engine to Find Product Market Fit (2018)",
        points: 14,
        number: 9,
        numberOfComments: 2,
      },
      {
        title: "I spent an evening on a fictitious web",
        points: 18,
        number: 10,
        numberOfComments: 6,
      },
      {
        title: "Deterministic Replay of QEMU Emulation",
        points: 86,
        number: 11,
        numberOfComments: 20,
      },
      {
        title: "What Life Means to Einstein (1929) [pdf]",
        points: 60,
        number: 12,
        numberOfComments: 35,
      },
      {
        title: "The first snapshot of Hacker News on Archive.org",
        points: 21,
        number: 13,
        numberOfComments: 5,
      },
      {
        title:
          "Type 2 diabetes drug associated with 35% lower risk of dementia, study finds",
        points: 38,
        number: 14,
        numberOfComments: 11,
      },
      {
        title: "Windmill (YC S22) Hiring Rust and TypeScript Eng #3 in Paris",
        points: 0,
        number: 15,
        numberOfComments: 0,
      },
      {
        title: "Maker Skill Trees",
        points: 382,
        number: 16,
        numberOfComments: 84,
      },
      {
        title:
          "Window Maker: X11 window manager with the look and feel of the NeXTSTEP UI",
        points: 239,
        number: 17,
        numberOfComments: 119,
      },
      {
        title: "Google's new pipe syntax in SQL",
        points: 285,
        number: 18,
        numberOfComments: 140,
      },
      {
        title:
          "An incredibly simple, open-source alternative to Loom that only requires S3",
        points: 19,
        number: 19,
        numberOfComments: 6,
      },
      {
        title: "Show HN: Firebuilder: A complete Firefox customization tool",
        points: 102,
        number: 20,
        numberOfComments: 10,
      },
      {
        title: "Show HN: LLM-Term – Simple Rust-based CLI assist tool",
        points: 9,
        number: 21,
        numberOfComments: 3,
      },
      {
        title: "The Future of TLA+ [pdf]",
        points: 176,
        number: 22,
        numberOfComments: 73,
      },
      {
        title:
          "Linus Torvalds talks AI, Rust, & why Linux is the only thing that matters",
        points: 17,
        number: 23,
        numberOfComments: 5,
      },
      {
        title: "Scaling Rails and Postgres to millions of users at Microsoft",
        points: 171,
        number: 24,
        numberOfComments: 50,
      },
      {
        title:
          "Monumental architecture in Atlantic Europe: fifth-millennium BC enclosure",
        points: 42,
        number: 25,
        numberOfComments: 2,
      },
      {
        title:
          "Show HN: Skip – Build native iOS and Android apps from a single Swift codebase",
        points: 247,
        number: 26,
        numberOfComments: 82,
      },
      {
        title: "HDMI Forum rejects AMD's HDMI 2.1 open-source driver",
        points: 229,
        number: 27,
        numberOfComments: 113,
      },
      {
        title: "Panasonic Toughbook 40",
        points: 175,
        number: 28,
        numberOfComments: 161,
      },
      {
        title:
          "If you love something set it free – AKWF Waveforms now in public domain (2015)",
        points: 15,
        number: 29,
        numberOfComments: 3,
      },
      {
        title: "A dishwasher can make or break a restaurant (2017)",
        points: 255,
        number: 30,
        numberOfComments: 446,
      },
    ];

    assert.deepStrictEqual(result, expectedOutput);
  });
});
