// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { parse } = require('rss-to-json');
import cheerio from "cheerio";


export default async function handler(req, res) {

  const url = 'https://medium.com/feed/@prajwalprakash3722';
  const feed = await parse(url);
  if (!feed) {
    return;
  }

  const article = feed.items;

  let data = [];

  article.map(item => {
    const $ = cheerio.load(item.content);
    const image = $('img').attr('src');
    const description = $('p').text();
    const title = item.title;
    const link = item.link;
    const id = item.guid;
    const date = item.pubDate;

    data.push({
      id,
      title,
      description,
      image,
      link,
      date
    });
  });
  res.status(200).json(data);
}
