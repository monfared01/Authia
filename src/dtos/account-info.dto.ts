import { PasswordDto } from "./password.dto";

export interface AccountInfoDto extends PasswordDto {
    name : string,
    mobile: string,
    email: string,
}