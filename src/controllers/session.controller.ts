import { Request, Response } from 'express'
import { mongoose } from '../db'
import { getUserSessionList, removeUserSession } from '../services/session.service'

export async function session_delete(req: Request, res: Response) {
  try {
    await removeUserSession({ user: res.locals.user, sessionId: mongoose.Types.ObjectId(req.params.id) })
    res.status(200).end()
  } catch (e) {
    res.status(404).end()
  }
}

export async function session_list(req: Request, res: Response) {
  try {
    res
      .status(200)
      .send(
        await getUserSessionList({ user: res.locals.user })
      )
  } catch (e) {
    res.status(400).send(e)
  }
}
