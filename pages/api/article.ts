// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const { parse } = require('rss-to-json');
import cheerio from 'cheerio';
import Cors from 'cors';
import { NextApiRequest, NextApiResponse } from 'next';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
  origin: '*',
  optionsSuccessStatus: 200,
});

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: NextApiRequest, res: NextApiResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Run the middleware
  await runMiddleware(req, res, cors);

  const url = 'https://medium.com/feed/@prajwalprakash3722';
  const feed = await parse(url);
  if (!feed) {
    return;
  }

  const article = feed.items;

  let data = [];

  article.map((item) => {
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
      date,
    });
  });
  res.status(200).json(data);
}
