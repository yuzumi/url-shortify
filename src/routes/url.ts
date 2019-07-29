import { Router } from 'express';

import UrlController from '../controllers/url';

const UrlRouter: Router = Router();

UrlRouter.get('/:code', UrlController.getByCode);

UrlRouter.post('/shorten', UrlController.shortify);

export default UrlRouter;