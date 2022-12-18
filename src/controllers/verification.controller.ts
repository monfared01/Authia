import { Request, Response } from 'express'
import _type from '../types/code.type'
import { sendCode } from '../services/verification.service'

export async function email_verification_for_signup(
  req: Request,
  res: Response,
) {
  try {
    const code = await sendCode({
      userId: undefined,
      mobile: undefined,
      email: req.body.email,
      type: _type.signup,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}
export async function sms_verification_for_signup(req: Request, res: Response) {
  try {
    const code = await sendCode({
      userId: undefined,
      mobile: req.body.mobile,
      email: undefined,
      type: _type.signup,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function email_verification_for_recovery(
  req: Request,
  res: Response,
) {
  try {
    const code = await sendCode({
      userId: undefined,
      mobile: undefined,
      email: req.body.email,
      type: _type.recovery,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}
export async function sms_verification_for_recovery(
  req: Request,
  res: Response,
) {
  try {
    const code = await sendCode({
      userId: undefined,
      mobile: req.body.mobile,
      email: undefined,
      type: _type.recovery,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}

export async function email_verification_for_change_email(
  req: Request,
  res: Response,
) {
  try {
    const code = await sendCode({
      userId: res.locals.user._id,
      mobile: undefined,
      email: req.body.email,
      type: _type.email,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}
export async function sms_verification_for_change_mobile(
  req: Request,
  res: Response,
) {
  try {
    const code = await sendCode({
      userId: res.locals.user._id,
      mobile: req.body.mobile,
      email: undefined,
      type: _type.mobile,
    })
    res.status(200).send(code)
  } catch (e) {
    res.status(400).send(e)
  }
}
