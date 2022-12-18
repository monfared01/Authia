import { Request, Response, NextFunction } from 'express'
import { Session } from '../models/session.model'
import { User } from '../models/user.model'

async function authentication (
  request: Request,
  response: Response,
  next: NextFunction
) {
  try {
    const token = request.header('xAuth')
    const _session = await Session.findOne({ token })
    if (!_session) {
      response.status(401).end()
    } else {
      const _user = await User.findById(_session.userId)
      if (!_user) {
        await Session.deleteOne({ _id: _session._id })
        response.status(400).end()
      } else {
        response.locals.user = _user
        next()
      }
    }
  } catch (e) {
    next(e)
  }
}

export default authentication
