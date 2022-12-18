import { Router } from 'express'

import authentication from '../middlewares/authentication.middleware'
import {
  email_verification_for_change_email,
  email_verification_for_recovery,
  email_verification_for_signup,
  sms_verification_for_change_mobile,
  sms_verification_for_recovery,
  sms_verification_for_signup,
} from '../controllers/verification.controller'
import {
  exist_email,
  exist_mobile,
  not_exist_email,
  not_exist_mobile,
} from '../middlewares/existence.middleware'

const verificationRouter = Router()

verificationRouter.post(
  '/phone/signup',
  not_exist_mobile,
  sms_verification_for_signup,
)
verificationRouter.post(
  '/email/signup',
  not_exist_email,
  email_verification_for_signup,
)

verificationRouter.post(
  '/phone/recovery',
  exist_mobile,
  sms_verification_for_recovery,
)
verificationRouter.post(
  '/email/recovery',
  exist_email,
  email_verification_for_recovery,
)

verificationRouter.post(
  '/phone',
  authentication,
  not_exist_mobile,
  sms_verification_for_change_mobile,
)
verificationRouter.post(
  '/email',
  authentication,
  not_exist_email,
  email_verification_for_change_email,
)

export default verificationRouter
