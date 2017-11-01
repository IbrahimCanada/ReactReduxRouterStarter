import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { withRouter } from 'react-router-dom'

import Header from '../../components/Header'
import Footer from '../../components/Footer'

import Routes from '../../routes'

import * as CartActionsCreators from '../Cart/actions'
import * as CartSelectors from '../Cart/selectors'

class App extends Component {
  componentWillMount = () => {
    this.props.getCart()
  }

  render () {
    return (
      <div>
        <Header totalQty={this.props.totalQty} />
        <Routes />
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  totalQty: CartSelectors.totalQuantitySelector(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    getCart: CartActionsCreators.getCart
  },
  dispatch
)

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App))
