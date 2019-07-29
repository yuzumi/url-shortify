import { Request, Response } from 'express';
import validUrl from 'valid-url';
import shortId from 'shortid';

import Url, { IUrlModel } from '../models/url';

const UrlController = {
  async getByCode(req: Request, res: Response) {
    const { code } = req.params;

    try {
      const url: IUrlModel | null = await Url.findOne({ code });
      
      if (url && url.long) {
        return res.redirect(url.long);
      } else {
        return res.status(404).json('No url found');
      }
    } catch (error) {
      console.error(error);

      res.status(500).json('Server error');
    }
  },
  async shortify(req: Request, res: Response) {
    const { long } = req.body;
  
    if (validUrl.isUri(long)) {
      try {
        const url: IUrlModel | null = await Url.findOne({ long });
  
        if (url) {
          res.json(url);
        } else {
          const code: string = shortId.generate();
          const short: string = `http://localhost:5000/${code}`;
  
          const url: IUrlModel = new Url({ code, long, short });
  
          await url.save();
  
          res.json(url);
        }
      } catch (error) {
        console.error(error);
        res.status(500).json('Server error');
      }
    } else {
      res.status(401).json('Invalid long url');
    }
  }
};

export default UrlController;