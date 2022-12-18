import * as _ from 'lodash'
import { Request, Response } from 'express'
import { userRecovery, userSignin, userSignout, userSignup } from '../services/account.service'

export async function signout(req: Request, res: Response) {
  try {
    await userSignout({ token: res.locals.token })
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function signup(req: Request, res: Response) {
  try {
    await userSignup({
      ..._.pick(req.body, ['name', 'password']),
      mobile: res.locals.mobile,
      email: res.locals.email,
    })
    res.status(201).end()
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function signin(req: Request, res: Response) {
  try {
    const token = await userSignin({
      user: res.locals.user,
      ip: (req.headers['x-forwarded-for'] || req.socket.remoteAddress) as string,
      os: req.useragent?.os as string,
      platform: req.useragent?.platform as string,
      ..._.pick(req.body, ['password'])
    })
    res.status(200).send({ 'xAuth': token })
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function recovery(req: Request, res: Response) {
  try {
    await userRecovery({
      ..._.pick(req.body, ['password']),
      user: res.locals.user,
    })
    res.status(200).send()
  } catch (e) {
    res.status(400).send(e)
  }
}
