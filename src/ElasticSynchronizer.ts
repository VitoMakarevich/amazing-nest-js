import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from 'typeorm';
import {Synchronizer} from './elastic/syncronizer'
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ELASTIC_CONNECTION } from './app.providers';
import { Client } from 'elasticsearch';

@EventSubscriber()
@Injectable()
export class EntitySynchronizer implements EntitySubscriberInterface {

  private elasticSynchronizer: Synchronizer;

  setSynchronizer (elasticSynchronizer: Synchronizer) {
    this.elasticSynchronizer = elasticSynchronizer;
  }

  /**
   * Called before entity insertion.
  //  */
  afterInsert(event: InsertEvent<any>) {
    this.elasticSynchronizer.add(event)
  }
}
