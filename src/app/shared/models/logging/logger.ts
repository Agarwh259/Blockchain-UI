import Loglevel from './loglevel.enum';

export interface Logger {
  Log(message: any, loglevel: Loglevel);
}
