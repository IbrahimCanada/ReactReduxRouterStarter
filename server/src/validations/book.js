import Joi from 'joi'

const bookValidation = {
  // POST /api/v1/providers
  createBook: {
    body: {
      title: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().required()
    }
  }
}

export default bookValidation
