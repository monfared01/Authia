import { Request, Response, NextFunction } from 'express'
import { Code } from '../models/code.model'
import { User } from '../models/user.model'
import _type from '../types/code.type'

function checkDate(date: Date): Promise<Boolean> {
  return new Promise((resolve, reject) => {
    try {
      if (Math.floor((Date.now() - date.getTime()) / 60000) >= 120)
        resolve(false)
      else resolve(true)
    } catch (e) {
      reject()
    }
  })
}
async function checkCode(
  request: Request,
  response: Response,
  codeType: Number,
  done: Function,
) {
  try {
    const _code = await Code.findOne({
      privateKey: request.body.privateKey,
      publicKey: request.body.publicKey,
      type: codeType,
    })
    if (!_code) response.status(404).send()
    else {
      if (!(await checkDate(_code.date))) response.status(410).send()
      else {
        done(_code)
      }
    }
  } catch (e) {
    response.status(400).send()
  }
}

export async function SMS_for_signup(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.signup, async (_code: any) => {
    if (!_code.mobile) {
      response.status(404).send()
    } else {
      if (!(await User.exists({ mobile: _code.mobile }))) {
        response.locals.mobile = _code.mobile
        next()
      } else {
        response.status(409).send()
      }
    }
  })
}
export async function email_for_signup(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.signup, async (_code: any) => {
    if (!_code.email) {
      response.status(404).send()
    } else {
      if (!(await User.exists({ email: _code.email }))) {
        response.locals.email = _code.email
        next()
      } else {
        response.status(409).send()
      }
    }
  })
}

export async function SMS_for_recovery(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.recovery, async (_code: any) => {
    if (!_code.mobile) {
      response.status(404).send()
    } else {
      const _u = await User.findOne({ mobile: _code.mobile })
      if (!_u) {
        response.status(409).send()
      } else {
        response.locals.user = _u
        next()
      }
    }
  })
}
export async function email_for_recovery(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.recovery, async (_code: any) => {
    if (!_code.email) {
      response.status(404).send()
    } else {
      const _u = await User.findOne({ email: _code.email })
      if (!_u) {
        response.status(409).send()
      } else {
        response.locals.user = _u
        next()
      }
    }
  })
}

export async function email_for_change_email(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.email, async (_code: any) => {
    if (!_code.email || !_code.userId) {
      response.status(404).send()
    } else {
      if (response.locals.user._id.toString() === _code.userId.toString()) {
        response.locals.user.email = _code.email
        next()
      }
      else response.status(406).send()
    }
  })
}

export async function SMS_for_change_mobile(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  checkCode(request, response, _type.mobile, async (_code: any) => {
    if (!_code.mobile || !_code.userId) {
      response.status(404).send()
    } else {
      if (response.locals.user._id.toString() === _code.userId.toString()) {
        response.locals.user.mobile = _code.mobile
        next()
      }
      else response.status(406).send()
    }
  })
}
