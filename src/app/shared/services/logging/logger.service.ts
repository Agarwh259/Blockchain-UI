import { Injectable } from '@angular/core';
import Loglevel from '../../models/logging/loglevel.enum';
import { ConsoleLogger } from './logger.console';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  Log(message: any, loglevel: Loglevel = Loglevel.Info) {
    ConsoleLogger.LogMessage(message, loglevel);
  }

  constructor() {
    ConsoleLogger.LogMessage('Instantiating Logger Service', Loglevel.Info);
  }
}
