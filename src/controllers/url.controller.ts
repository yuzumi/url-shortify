import { Request, Response, NextFunction, Router } from 'express';
import validUrl from 'valid-url';
import shortId from 'shortid';

import Url, { IUrlModel } from '../models/url.model';
import Controller from '../interfaces/controller.interface';
import HttpException from '../exceptions/HttpException';

class UrlController implements Controller {
  readonly path: string = '/';
  readonly router: Router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.get('/:code', this.getByCode);
    this.router.post('/shorten', this.shortify);
  }

  private async getByCode(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
    const { code } = req.params;

    try {
      const url: IUrlModel | null = await Url.findOne({ code });
      
      if (url && url.long) {
        return res.redirect(url.long);
      } else {
        return next(new HttpException(404, 'No url found'));
      }
    } catch (error) {
      console.error(error);

      next(new HttpException(500, 'Server error'));
    }
  }

  private async shortify(req: Request, res: Response, next: NextFunction): Promise<void> {
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

        next(new HttpException(500, 'Server error'));
      }
    } else {
      next(new HttpException(401, 'Invalid long url'));
    }
  }
}

export default UrlController;