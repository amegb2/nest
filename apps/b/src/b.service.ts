import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';

@Injectable()
export class BService {
  constructor(@Inject('DATABASE_CONNECTION') private db: Db){}
  insert(data) {
    return this.db.collection('events').insertOne(data);
  }

  find(fromDate: string, toDate: string){
    console.log(fromDate, toDate)
    let options = {
      datestamp: {
        $gte: fromDate,
        $lte: toDate  
      }
    }
    console.log(options)
    return this.db.collection('events').find(options).toArray();
  }
}
