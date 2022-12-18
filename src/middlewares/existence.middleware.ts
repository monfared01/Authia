import { Request, Response, NextFunction } from 'express'
import { User } from '../models/user.model'

export async function exist_email(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (!request.body.email) response.status(400).end()
    else {
      const _user = await User.findOne({ email: request.body.email })
      if (!_user) {
        response.status(404).end()
      } else {
        response.locals.user = _user
        next()
      }
    }
  } catch (e) {
    next(e)
  }
}
export async function not_exist_email(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (!request.body.email) response.status(400).end()
    else {
      if (!(await User.exists({ email: request.body.email }))) next()
      else {
        response.status(412).end()
      }
    }
  } catch (e) {
    next(e)
  }
}

export async function exist_mobile(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (!request.body.mobile) response.status(400).end()
    else {
      const _user = await User.findOne({ mobile: request.body.mobile })
      if (!_user) {
        response.status(404).end()
      } else {
        response.locals.user = _user
        next()
      }
    }
  } catch (e) {
    next(e)
  }
}
export async function not_exist_mobile(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  try {
    if (!request.body.mobile) response.status(400).end()
    else {
      if (!(await User.exists({ mobile: request.body.mobile }))) next()
      else {
        response.status(412).end()
      }
    }
  } catch (e) {
    next(e)
  }
}
