import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ELASTIC_CONNECTION } from '../app.providers';
import { Client } from 'elasticsearch';
import { InsertEvent } from 'typeorm';

@Injectable()
export class Synchronizer {
  constructor(@Inject(ELASTIC_CONNECTION) private client: Client) {}

  add(event: InsertEvent<any>) {
    const {
      metadata: {
        name,
      },
      entity,
    } = event

    const {
       id,
    } = entity

    return this.client.create({
      index: 'myindex',
      type: event.metadata.tableName,
      id,
      body: entity,
    });
  }
}
