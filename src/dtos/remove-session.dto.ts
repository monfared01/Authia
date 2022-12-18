import { mongoose } from "../db";
import { UserDto } from "./user.dto";

export interface RemoveSessionDto extends UserDto {
    sessionId: mongoose.Types.ObjectId
}