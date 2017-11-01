import React from 'react'
import { Route, Switch } from 'react-router-dom'

import BookList from './containers/BookList'
import BooksForm from './containers/BookForm'
import Cart from './containers/Cart'
import AboutPage from './containers/AboutPage'

const Status = ({ code, children }) => (
  <Route
    render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = code
      }
      return children
    }}
  />
)

const NotFound = () => (
  <Status code={404}>
    <div className="container-fluid">
      <h2> Sorry, cannot find this page.</h2>
    </div>
  </Status>
)

const routes = () => (
  <Switch>
    <Route exact path="/" component={BookList} />
    <Route exact path="/admin" component={BooksForm} />
    <Route exact path="/cart" component={Cart} />
    <Route exact path="/about" component={AboutPage} />
    <Route component={NotFound} />
  </Switch>
)

export default routes
