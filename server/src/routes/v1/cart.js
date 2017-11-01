import { Router } from 'express'

import CartController from '../../controllers/cart'

const router = Router() // eslint-disable-line new-cap

router.route('/')
/** GET /api/users - Get list of users */
  .get(CartController.get)
  .post(CartController.add)
  .put(CartController.update)
  // .put(CartController.remove)

router.route('/:bookId')
  /** GET /api/users/:userId - Get user */
  .delete(CartController.remove)

export default router
