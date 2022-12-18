import { PasswordDto } from "./password.dto";
import { UserDto } from "./user.dto";

export interface UserSigninDto extends UserDto, PasswordDto {
    ip: string,
    platform: string,
    os: string
}