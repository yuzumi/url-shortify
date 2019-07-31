import HttpException from './HttpException';

export default class ServerError extends HttpException {
  constructor() {
    super(500, 'Server error');
  }
}