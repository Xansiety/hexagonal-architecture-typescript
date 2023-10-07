import { ForMonitoringDriven } from '../../ports/drivens';

export class LoggerStubAdapter implements ForMonitoringDriven {
  log(event: string, message: string): void {
    console.log(`Event: ${event} - Message: ${message}`);
  }
}
