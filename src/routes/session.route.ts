import { Router } from 'express'
import authentication from '../middlewares/authentication.middleware'
import { session_delete, session_list } from '../controllers/session.controller'

const sessionRouter = Router()

sessionRouter.get('/', authentication, session_list)
sessionRouter.delete('/:id', authentication, session_delete)

export default sessionRouter
