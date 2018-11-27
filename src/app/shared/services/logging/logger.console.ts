import Loglevel from '../../models/logging/loglevel.enum';

export class ConsoleLogger {

    static LogMessage(message: any, loglevel: Loglevel): void {
        switch (loglevel) {
            case Loglevel.Info:
                // tslint:disable-next-line:no-console
                console.info(message);
                break;
            case Loglevel.Error:
                console.error(message);
                break;
            case Loglevel.Warning:
                console.warn(message);
                break;
            default: console.log(message);
                break;
        }
    }
}
