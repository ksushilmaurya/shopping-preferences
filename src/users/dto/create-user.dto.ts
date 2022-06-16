import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDefined, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class CreateUserDto {
    
    @IsString()
    @IsDefined()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Name of the user'
    })
    fullName: string

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Email of the user'
    })
    email: string


    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Password of user'
    })
    password: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Date of birth of user'
    })
    dateOfBirth: string

}


export class ResetPasswordDto {
    
    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Reset password token'
    })
    token: string

    @IsDate()
    @IsNotEmpty()
    @ApiProperty({
        description : 'New password'
    })
    password: string

}