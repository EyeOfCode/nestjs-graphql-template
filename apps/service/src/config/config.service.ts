import { Inject, Injectable } from '@nestjs/common';
import configuration from './configuration';

@Injectable()
export class ConfigService {
    // constructor(
    //     @Inject(configuration().port)
    //     private dbConfig: ConfigType<typeof databaseConfig>,
    //   ) {}
}