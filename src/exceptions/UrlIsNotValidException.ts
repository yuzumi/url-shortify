import HttpException from './HttpException';

export default class UrlIsNotValidException extends HttpException {
  constructor() {
    super(401, 'Invalid long url');
  }
}