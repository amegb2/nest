import { Body, 
         ClassSerializerInterceptor, 
         Controller,
         Get, 
         Post, 
         Query, 
         UseInterceptors, 
         UsePipes, 
         ValidationPipe } from '@nestjs/common';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { UserDto } from './dto/user.dto';

@ApiTags('MAIN')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async getData() {
    await this.appService.createData();
    return await this.appService.getData();
  }

  @Get('find_by_field')
  @UsePipes(ValidationPipe)
  findByField(@Query() user:UserDto)
  {
    let options = {
      $or: []
    }

    if (Object.keys(user).length > 0)
    {
      for(const [filter, val] of Object.entries(user))
      {
        options.$or.push({[filter]: val})
      }
        
    }else return []
      
    return this.appService.findData(options);
  }


  @Get('search')
  @UsePipes(ValidationPipe)
  search(@Query('text') text:string)
  {
    let options = {
      $or: []
    }

    const keys = [
      'uid',
      'first_name', 
      'last_name', 
      'username',
      'email', 
      'gender', 
      'phone_number',
      'social_insurance_number', 
      'date_of_birth',
      'street_name',
      'street_address',
      'zip_code',
      'city',
      'state',
      'country'
  ]

    if (text !== '')
    {
      for(const filter of keys)
      {
        options.$or.push({[filter]: {$regex: text, $options: 'i'}})
      }
        
    }else return []
      
    return this.appService.findData(options);
  }

  @Get('find_by_keyword')
  @UsePipes(ValidationPipe)
  async find(@Query('text') text: string){
    const search = 
    [
      {
        $search: {
          index: 'default',
          text: {
            query: text,
            path: {
              'wildcard': '*'
            }
          }
        }
      }
    ]
    return await this.appService.findByData(search)
  }
}
