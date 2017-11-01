import React, { Component } from 'react'

import { Row, Col, Well, Button, Image } from 'react-bootstrap'

import './style.css'

class BookItem extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isReadMoreEnabled: false
    }

    this.handleCart = this.handleCart.bind(this)
    this.onToggleReadMore = this.onToggleReadMore.bind(this)
  }

  onToggleReadMore = () => {
    this.setState({ isReadMoreEnabled: !this.state.isReadMoreEnabled })
  }

  // Can do without this function and call addToCart directly
  handleCart () {
    this.props.addToCart({ ...this.props.book, quantity: 1 })
  }

  render () {
    return (
      <Well>
        <Row key={this.props.book.id}>
          <Col xs={12} sm={4}>
            <Image responsive src={this.props.book.image} />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>
              {
                (this.props.book.description.length > 5 && !this.state.isReadMoreEnabled)
                  ? (`${this.props.book.description.substring(0, 5)}...`) : (this.props.book.description)
              }
              <button
                className="toggleButton"
                onClick={this.onToggleReadMore}
              >
                {(!this.state.isReadMoreEnabled && this.props.book.description.length > 5) ? ('More...') : ('Less...')}
              </button>
            </p>

            <h6>{this.props.book.price}</h6>
            <Button onClick={this.handleCart} bsStyle="primary">Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

export default BookItem
