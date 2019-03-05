import { Global, Module } from '@nestjs/common';
import { ElasticConnectionProvider } from '../app.providers';
import { Synchronizer } from './syncronizer';

@Global()
@Module({
  providers: [
    ElasticConnectionProvider,
    Synchronizer,
  ],
  exports: [ElasticConnectionProvider, Synchronizer],
})
export class ElasticModule {}
