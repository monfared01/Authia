import { CodeDto } from "../dtos/code.dto"
import { Code } from "../models/code.model"

export async function sendCode(obj: CodeDto) {
    try {
        const code = await Code.initial(obj.userId, obj.mobile, obj.email, obj.type)
        if (!code.mobile) {
            return code.sendViaEmail()
        } else {
            return code.sendViaSMS()
        }
    } catch (e: any) {
        throw e
    }
}