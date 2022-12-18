import bcrypt from 'bcrypt'
import { AccountInfoDto } from "../dtos/account-info.dto";
import { AccountRecoveryDto } from "../dtos/account-recovery.dto";
import { TokenDto } from "../dtos/token.dto";
import { UserSigninDto } from "../dtos/user-signin.dto";
import { Code } from "../models/code.model";
import { Session } from "../models/session.model";
import { User } from "../models/user.model";
import { changePassword } from "./user.service";

export function userSignout(obj: TokenDto) {
    return Session.deleteOne({
        token: obj.token,
    })
}

export function userSignup(obj: AccountInfoDto) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            const u = new User({
                name: obj.name,
                password: obj.password,
                mobile: obj.mobile,
                email: obj.email,
            })
            await u.save()
            await Code.deleteMany().or([
                { mobile: obj.mobile },
                { email: obj.email },
            ])
            resolve()
        } catch (e: any) {
            reject()
        }
    })
}

export function userRecovery(obj: AccountRecoveryDto) {
    return new Promise<void>(async (resolve, reject) => {
        try {
            await changePassword({ user: obj.user, newValue: obj.password })
            await Code.deleteMany().or([
                { mobile: obj.user.mobile },
                { email: obj.user.email },
            ])
            resolve()
        } catch (e: any) {
            reject()
        }
    })
}

export function userSignin(obj: UserSigninDto) {
    return new Promise<any>((resolve, reject) => {
        bcrypt.compare(
            obj.password,
            obj.user.password,
            (err, res) => {
                if (err || !res) reject(err)
                else {
                    resolve(Session.initial(obj.user._id, obj.ip, obj.platform, obj.os))
                }
            },
        )
    })

}