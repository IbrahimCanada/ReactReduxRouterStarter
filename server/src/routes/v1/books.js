import multer from 'multer'
import { Router } from 'express'
import validate from 'express-validation'

import BookController from '../../controllers/book'
import bookValidation from '../../validations/book'

const router = Router() // eslint-disable-line new-cap

const storage = multer.diskStorage({
  destination: './files',
  filename (req, file, cb) {
    cb(null, `${new Date()}-${file.originalname}`)
  }
})

const upload = multer({ storage })

router.route('/')
/** GET /api/users - Get list of users */
  .get(BookController.list)
  // .post(validate(bookValidation.createBook), BookController.create)
  .post(upload.single('image'), BookController.create)

router.route('/:bookId')
  /** GET /api/users/:userId - Get user */
  .get(BookController.get)
  .put(BookController.update)
  .delete(BookController.remove)

router.param('bookId', BookController.load)

export default router
