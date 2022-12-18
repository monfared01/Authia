import { RemoveSessionDto } from "../dtos/remove-session.dto";
import { UserDto } from "../dtos/user.dto";
import { Session } from "../models/session.model";

export function getUserSessionList(obj: UserDto) {
    return Session.find({ userId: obj.user._id }).select(
        '_id country city platform ip os date'
    )
}

export function removeUserSession(obj: RemoveSessionDto) {
    return new Promise<void>(async (resolve, reject) => {
        const s = await Session.findById(obj.sessionId)
        if (s && s.userId.toString() === obj.user._id.toString()) {
            s.remove().then(() => {
                resolve()
            })
        } else {
            reject()
        }
    })
}