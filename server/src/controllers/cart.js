
const get = (req, res) => {
  if (typeof req.session.cart !== 'undefined') {
    res.status(200).json({
      cart: req.session.cart
    })
  } else {
    res.status(200).json({
      cart: []
    })
  }
}

const add = (req, res, next) => {
  const book = req.body
  if (typeof req.session.cart !== 'undefined') {
    const bookIndex = req.session.cart.findIndex(item => item.id === book.id)
    if (bookIndex === -1) {
      req.session.cart = [...req.session.cart, book]
    }
    req.session.cart = req.session.cart
      .map((item, index) => {
        if (index === bookIndex) {
          return {
            ...book,
            quantity: item.quantity + 1
          }
        }
        return item
      })
    req.session.save((err) => {
      if (err) next(err)
      res.status(200).json(book)
    })
  } else {
    req.session.cart = []
    req.session.cart.push(book)
    req.session.save((err) => {
      if (err) next(err)
      res.status(200).json(book)
    })
  }
}

const update = (req, res, next) => {
  const book = req.body.book
  const quantity = req.body.quantity

  if (typeof req.session.cart !== 'undefined') {
    const bookIndex = req.session.cart.findIndex(item => item.id === book.id)
    req.session.cart = req.session.cart
      .map((item, index) => {
        if (index === bookIndex) {
          return {
            ...item,
            quantity: book.quantity + quantity
          }
        }
        return item
      })
    req.session.save((err) => {
      if (err) next(err)
      res.status(200).json({
        book,
        quantity
      })
    })
  } else {
    req.session.cart = []
    req.session.cart.push(book)
    req.session.save((err) => {
      if (err) next(err)
      res.status(200).json(book)
    })
  }
}

const remove = (req, res, next) => {
  const bookId = req.params.bookId

  req.session.cart = req.session.cart.filter(({ id }) => id !== bookId)

  req.session.save((err) => {
    if (err) next(err)
    res.status(200).json({
      id: bookId
    })
  })
}

export default { get, add, update, remove }
