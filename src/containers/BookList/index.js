import React, { Component } from 'react'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import { Grid, Row, Col } from 'react-bootstrap'

import * as BooksActionCreators from './actions'
import * as CartActionCreators from '../Cart/actions'

import BookItem from '../../components/BookItem'
import JumbotronHeader from '../../components/JumbotronHeader'

class BookList extends Component {
  componentDidMount () {
    // Dispatch getting the books
    this.props.getBooks()
  }

  renderList () {
    return this.props.books.map(book => (
      <Col xs={12} sm={6} md={4} key={book.id}>
        <BookItem book={book} addToCart={this.props.addToCart} />
      </Col>
    ))
  }

  render () {
    return (
      <Grid>
        <Row>
          <JumbotronHeader />
        </Row>
        <Row>
          {this.renderList()}
        </Row>
      </Grid>
    )
  }
}

function mapStateToProps (state) {
  return {
    books: state.books
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators(
    {
      addToCart: CartActionCreators.addToCart,
      getBooks: BooksActionCreators.getBooks
    },
    dispatch
  )
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BookList))
