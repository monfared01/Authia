import { Router } from 'express'

import authentication from '../middlewares/authentication.middleware'
import {
  change_account_info,
  change_name,
  change_password,
  get_info,
} from '../controllers/user.controller'
import {
  email_for_change_email,
  SMS_for_change_mobile,
} from '../middlewares/verification.middleware'

const userRouter = Router()

userRouter.get('/', authentication, get_info)
userRouter.put('/name', authentication, change_name)
userRouter.put('/password', authentication, change_password)
userRouter.put('/email', authentication, email_for_change_email, change_account_info)
userRouter.put('/phone', authentication, SMS_for_change_mobile, change_account_info)

export default userRouter
