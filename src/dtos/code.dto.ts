import { mongoose } from "../db";

export interface CodeDto {
    userId: mongoose.Types.ObjectId | undefined,
    mobile: string | undefined,
    email: string | undefined,
    type: Number,
}