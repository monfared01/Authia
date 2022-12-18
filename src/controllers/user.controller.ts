import * as _ from 'lodash'
import { Request, Response } from 'express'
import { change, changeName, changePassword, getUserInfo } from '../services/user.service'

export async function change_name(req: Request, res: Response) {
  try {
    await changeName({
      user: res.locals.user,
      newValue: _.pick(req.body, ['name']).name
    })
    res.status(200).end()
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function change_account_info(req: Request, res: Response) {
  try {
    await change({ user: res.locals.user })
    res.status(200).end()
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function change_password(req: Request, res: Response) {
  try {
    await changePassword({
      user: res.locals.user,
      newValue: _.pick(req.body, ['password']).password
    })
    res.status(200).end()
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function get_info(req: Request, res: Response) {
  try {
    res.status(200).send(getUserInfo({ user: res.locals.user }))
  } catch (e) {
    res.status(400).send(e)
  }
}
