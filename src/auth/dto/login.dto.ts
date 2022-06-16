import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsNotEmpty, IsString } from "class-validator";

export class loginDto {

    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Email of the user'
    })
    username: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        description : 'Password of the user'
    })
    password: string


}
