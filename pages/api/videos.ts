import { NextApiRequest, NextApiResponse } from 'next';
import { Client, RenderOutputFormat } from 'creatomate';

const client = new Client('YOUR_API_KEY_HERE');

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {

    /** @type {import('creatomate').RenderOptions} */
    const options = {
      // outputFormat: 'mp4' as RenderOutputFormat,
      maxWidth: 480,
      maxHeight: 480,
      frameRate: 25,
      source: req.body.source,
    };

    client
      .render(options)
      .then((renders) => {
        res.status(200).json(renders[0]);
      })
      .catch(() => {
        res.status(400);
      });

  } else {
    res.status(404);
  }
}
