import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Panel, Col, Row, Button, ButtonGroup, Label, Modal } from 'react-bootstrap'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import * as CartActionsCreators from './actions'
import * as CartSelectors from './selectors'

class Cart extends React.Component {
  static propTypes = {
    cart: PropTypes.arrayOf(PropTypes.object).isRequired,

    getCart: PropTypes.func.isRequired,
    deleteFromCart: PropTypes.func.isRequired,
    updateBookQuantityInCart: PropTypes.func.isRequired

  }

  constructor () {
    super()

    this.state = {
      showModal: false
    }

    this.onUpdate = this.onUpdate.bind(this)
    this.onDelete = this.onDelete.bind(this)

    this.open = this.open.bind(this)
    this.close = this.close.bind(this)
  }

  componentDidMount = () => {
    // this.props.getCart()
  }

  onDelete (book) {
    this.props.deleteFromCart(book)
  }

  onUpdate (book, quantity) {
    if (book.quantity > 1 && quantity === -1) {
      this.props.updateBookQuantityInCart(book, quantity)
    } else if (quantity === 1) {
      this.props.updateBookQuantityInCart(book, quantity)
    } else {
      this.props.deleteFromCart(book)
    }
  }

  close () {
    this.setState({ showModal: false })
  }

  open () {
    this.setState({ showModal: true })
  }

  renderEmpty () {
    return <div />
  }

  renderCart () {
    const cartItemsList = this.props.cart.map(book => (
      <Panel bsStyle="primary" key={book.id}>
        <Row>
          <Col xs={12} sm={4}>
            <h6>
              {book.title}
            </h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>
                ${book.price}
            </h6>
          </Col>
          <Col xs={12} sm={2}>
            <h6>
                qty. <Label bsStyle="success">{book.quantity}</Label>
            </h6>
          </Col>
          <Col xs={6} sm={4}>
            <ButtonGroup style={{ minWidth: '300px' }}>
              <Button
                bsStyle="default"
                bsSize="small"
                onClick={() => this.onUpdate(book, -1)}
              >
                  -
              </Button>
              <Button
                bsStyle="default"
                bsSize="small"
                onClick={() => this.onUpdate(book, 1)}
              >
                  +
              </Button>
              <Button
                bsStyle="danger"
                bsSize="small"
                onClick={() => this.onDelete(book)}
              >
                  Remove
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    ))
    return (
      <Grid>
        <Panel header="Cart" bsStyle="primary">
          {cartItemsList}
          <Row>
            <Col xs={12}>
              <h6>
              Total amount: {this.props.amount}
              </h6>
              <Button
                bsStyle="success"
                bsSize="small"
                onClick={this.open}
              >
              Checkout
              </Button>
            </Col>
          </Row>
          <Modal show={this.state.showModal} onHide={this.close}>
            <Modal.Header closeButton>
              <Modal.Title>thank you for your order!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h4>Your order has been saved!</h4>
              <p>You will receive an email confirmation shortly.</p>
            </Modal.Body>
            <Modal.Footer>
              <Col xs={6}>
                <h6>
                Total Amount: {this.props.amount}
                </h6>
              </Col>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </Panel>
      </Grid>
    )
  }

  render () {
    if (this.props.cart[0]) {
      return this.renderCart()
    }
    return this.renderEmpty()
  }
}

const mapStateToProps = state => ({
  cart: state.cart,
  amount: CartSelectors.totalAmountSelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCart: CartActionsCreators.getCart,
    deleteFromCart: CartActionsCreators.deleteFromCart,
    updateBookQuantityInCart: CartActionsCreators.updateBookQuantityInCart
  },
  dispatch
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
