import { Module } from '@nestjs/common';
import { MongoClient, Db } from 'mongodb';

@Module({
  providers: [
    {
      provide: 'DATABASE_CONNECTION',
      useFactory: async (): Promise<Db> => {
        try {

          const client = await MongoClient.connect('mongodb+srv://root:m7Abge31@cluster0.ljzy9.mongodb.net/?retryWrites=true&w=majority', {});
          const db = client.db('nest');

          return db;
        } catch (e) {
          throw e;
        }
      }
    },
  ],
  exports: ['DATABASE_CONNECTION'],
})
export class DatabaseModule {}