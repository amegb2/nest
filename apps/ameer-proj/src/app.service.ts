import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Db } from 'mongodb';
import { lastValueFrom, map } from 'rxjs';
import { UserDto, CreditCardDto, AddressDto } from './dto/user.dto';

@Injectable()
export class AppService {
  constructor(private readonly httpService: HttpService, 
    @Inject('DATABASE_CONNECTION') private db: Db) {
    }
    

    async getData() {
      return this.db.collection('default').find().toArray();
    }
    
    async createData() {
      let data: object[] = await lastValueFrom(
        this.httpService.get('https://random-data-api.com/api/v2/users?size=2', 
        { 
                headers: { "Accept-Encoding": "gzip,deflate,compress" } 
        })
        .pipe(
                map((rec) => rec ? rec?.data : [])
              )
        );

      data.map((el: UserDto) => {
        el.street_name = `${el.address.street_name}`;
        el.street_address = `${el.address.street_address}`;
        el.zip_code = `${el.address.zip_code}`;
        el.state = `${el.address.state}`;
        el.city = `${el.address.city}`;
        el.country = `${el.address.country}`;

        delete el.subscription; 
        delete el.address; 
        
        delete el.credit_card; 
        delete el.employment;
      })

      if(data.length > 0)
        await this.db.collection('default').insertMany(data);

      return;
    }

    async findData(options: object) {
      let data = await this.db.collection('default').find(options).toArray();
      return data
    }

    async findByData(search){
      return await this.db.collection('default').aggregate(search).toArray();
    }
}
