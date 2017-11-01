import mongoose from 'mongoose'
import httpStatus from 'http-status'
import APIError from '../helpers/APIError'

const schemaOptions = {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
  toJSON: {
    virtuals: true
  }
}

const booksSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
}, schemaOptions)

/**
 * Statics
 */
booksSchema.statics = {
  /**
   * Get book
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */

  getBookById (id) {
    return new Promise((resolve, reject) => {
      this.findOne({ _id: id })
        .exec()
        .then((book) => {
          if (book !== null) {
            resolve(book)
          }

          const err = new APIError('No such book exists!', httpStatus.NOT_FOUND, false)
          reject(err)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list ({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec()
  }
}

const Books = mongoose.model('Books', booksSchema)
export default Books
