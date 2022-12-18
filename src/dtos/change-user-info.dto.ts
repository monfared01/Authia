import { UserDto } from "./user.dto";

export interface ChangeUserInfo extends UserDto {
    newValue: string
}