import HttpException from './HttpException';

export default class UrlNotFoundException extends HttpException {
  constructor() {
    super(404, 'Url not found');
  }
}