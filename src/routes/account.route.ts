import { Router } from 'express'
import authentication from '../middlewares/authentication.middleware'
import { recovery, signin, signout, signup } from '../controllers/account.controller'
import {
  email_for_recovery,
  email_for_signup,
  SMS_for_recovery,
  SMS_for_signup
} from '../middlewares/verification.middleware'
import { exist_email, exist_mobile } from '../middlewares/existence.middleware'

const accountRouter = Router()

accountRouter.post('/phone/signup', SMS_for_signup, signup)
accountRouter.post('/email/signup', email_for_signup, signup)

accountRouter.post('/phone/signin', exist_mobile, signin)
accountRouter.post('/email/signin', exist_email, signin)

accountRouter.put('/phone/recovery', SMS_for_recovery, recovery)
accountRouter.put('/email/recovery', email_for_recovery, recovery)

accountRouter.delete('/signout', authentication, signout)

export default accountRouter
