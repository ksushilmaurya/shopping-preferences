import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEmail, IsEnum, IsNumber, IsString } from "class-validator";
import { PrefList } from "src/constants";

export class CreateShoppingPrefDto {
    @IsNumber()
    @ApiProperty({
        description : 'User id'
    })
    userId: number

    @IsString()
    @IsEnum({PrefList})
    @ApiProperty({
        description : 'Preference of user',
        example : "Furniture",
        enum: PrefList
    })
    preference: string


}

