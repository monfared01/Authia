import { ChangeUserInfo } from "../dtos/change-user-info.dto";
import { UserDto } from "../dtos/user.dto";
import { Session } from "../models/session.model";

export function getUserInfo(obj: UserDto) {
    return {
        name: obj.user.name,
        email: obj.user.email,
        mobile: obj.user.mobile,
    }
}

export function change(obj: UserDto) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await obj.user.save()
            await Session.deleteMany({ userId: obj.user._id })
            resolve()
        } catch (e: any) {
            reject(e)
        }
    })
}

export function changePassword(obj: ChangeUserInfo) {
    obj.user.password = obj.newValue
    return change(obj)
}

export function changeName(obj: ChangeUserInfo) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            obj.user.name = obj.newValue
            await obj.user.save()
            resolve()
        } catch (e: any) {
            reject(e)
        }
    })
}

