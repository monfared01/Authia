import { PasswordDto } from "./password.dto";
import { UserDto } from "./user.dto";

export interface AccountRecoveryDto extends UserDto, PasswordDto { }