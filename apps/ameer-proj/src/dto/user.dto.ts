import { ApiProperty } from "@nestjs/swagger";
import { Exclude, Transform, Expose } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, IsEmail, IsMobilePhone, IsPhoneNumber, UUIDVersion } from "class-validator";
import { WithId } from "mongodb";

export class LocationCoordinatesDto {
    @ApiProperty()
    lat: string; 
    @ApiProperty()
    lng: string; 

    constructor(partial: Partial<LocationCoordinatesDto>) {
        Object.assign(this, partial);
      }
}


export class AddressDto {
    @ApiProperty({
        default:"",
    })
    street_name: string;
    @ApiProperty({
        default:"",
    })
    street_address: string; 
    @ApiProperty({
        default:"",
    })
    zip_code: string; 

    @IsNotEmpty()
    @ApiProperty({
        default:"",
    })
    city: string;

    @IsNotEmpty()
    @ApiProperty({
        default:"",
    })
    state: string;
    
    @ApiProperty({
        default:"",
    })
    @IsNotEmpty()
    country: string;


    coordinates: LocationCoordinatesDto;

    constructor(partial: Partial<AddressDto>) {
        Object.assign(this, partial);
      }
}

export class EmploymentDto {
    @ApiProperty({
        default:"",
    })
    title: string;
    @ApiProperty({
        default:"",
    })
    key_skill:string;
}

export class CreditCardDto {
    cc_number: string;
}

export class SubscriptionDto {
    @ApiProperty({
        default:"",
    })
    plan: string; 
    @ApiProperty({
        default:"",
    })
    status: string; 
    @ApiProperty({
        default:"",
    })
    payment_method: string; 
    
    @ApiProperty({
        default:"",
    })
    term: string; 
}

export class UserDto{
    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }

    id: number;
    @ApiProperty({
        default:"",
        required: false,
    })
    uid: string;
    password: string; 

    @ApiProperty({
        default:"",
        required: false
    })
    first_name: string; 

    @ApiProperty({
        default:"",
        required: false
    })
    last_name: string; 
    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional()
    username: string; 
    
    @ApiProperty({
        default:"",
        required: false
    })
    @IsEmail()
    @IsString()
    @IsOptional()
    email: string;

    avatar: string;

    @ApiProperty({
        default:"",
        required: false
    })  
    @IsString()
    @IsOptional()
    gender: string;

    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional() 
    phone_number: string; 
    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional() 
    social_insurance_number: string;
    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional() 
    date_of_birth: string; 

    address: AddressDto;
    subscription: SubscriptionDto;
    employment: EmploymentDto; 
    credit_card: CreditCardDto;

    @ApiProperty({
        default:"",
        required: false
    })
    street_name: string;
    @ApiProperty({
        default:"",
        required: false
    })
    street_address: string; 
    @ApiProperty({
        default:"",
        required: false
    })
    zip_code: string; 

    @IsNotEmpty()
    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional()
    city: string;

    @IsNotEmpty()
    @ApiProperty({
        default:"",
        required: false
    })
    @IsOptional()
    state: string;
    
    @ApiProperty({
        default:"",
        required: false
    })
    @IsNotEmpty()
    @IsOptional()
    country: string;

}
