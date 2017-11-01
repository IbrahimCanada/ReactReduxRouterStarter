import { Router } from 'express'
import bookRoutes from './v1/books'
import cartRoutes from './v1/cart'

const api = Router()

api.get('/', (req, res, next) => {
  res.status(200).json({ title: 'Express' })
})

api.use('/books', bookRoutes)

api.use('/cart', cartRoutes)

export default api
