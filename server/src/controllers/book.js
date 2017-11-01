import httpStatus from 'http-status'

import Book from '../models/book'
import APIError from '../helpers/APIError'

/**
 * Load book and append to req.
 */
function load (req, res, next, id) {
  Book.getBookById(id)
    .then((book) => {
      req.book = book // eslint-disable-line no-param-reassign
      return next()
    })
    .catch((e) => {
      next(e)
    })
}

/**
 * Get book
 * @returns {Book}
 */
const get = (req, res) => res.json(req.book)

/**
 * Create new book
 * @property {string} req.body.bookname - The bookname of book.
 * @property {string} req.body.mobileNumber - The mobileNumber of book.
 * @returns {Book}
 */
const create = (req, res, next) => {
  const newBook = JSON.parse(req.body.book)
  const image = req.file

  if (image !== undefined) {
    const book = new Book({
      title: newBook.title,
      description: newBook.description,
      image: req.file.path || '',
      price: newBook.price
    })

    book.save()
      .then(savedBook => res.json(savedBook))
      .catch(e => next(e))
  } else {
    const error = new APIError('Image file is required', httpStatus.UNPROCESSABLE_ENTITY, true)
    next(error)
  }
}

/**
 * Update existing book
 * @property {string} req.body.bookname - The bookname of book.
 * @property {string} req.body.mobileNumber - The mobileNumber of book.
 * @returns {Book}
 */
const update = (req, res, next) => {
  const book = req.book
  book.title = req.body.bookname
  book.description = req.body.description
  book.image = req.body.image
  book.price = req.body.price

  book.save()
    .then(savedBook => res.json(savedBook))
    .catch(e => next(e))
}

/**
 * Get book list.
 * @property {number} req.query.skip - Number of books to be skipped.
 * @property {number} req.query.limit - Limit number of books to be returned.
 * @returns {Book[]}
 */
const list = (req, res, next) => {
  const { limit = 50, skip = 0 } = req.query
  Book.list({ limit, skip })
    .then(books => res.json(books))
    .catch(e => next(e))
}

/**
 * Delete book.
 * @returns {Book}
 */
const remove = (req, res, next) => {
  const book = req.book
  book.remove()
    .then(deletedBook => res.json(deletedBook))
    .catch(e => next(e))
}

export default { load, get, create, update, list, remove }
