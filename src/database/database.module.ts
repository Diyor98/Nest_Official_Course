import { DynamicModule, Module } from '@nestjs/common';
import { createConnection, ConnectionOptions } from 'typeorm';


// Example of a dynamic module (create database connection dynamically)
@Module({})
export class DatabaseModule {
   static register(options: ConnectionOptions): DynamicModule {
        return {
            module: DatabaseModule,
            providers: [
                {
                    provide: 'CONNECTION',
                    useValue: createConnection(options)
                }
            ]
        }
   }
}
