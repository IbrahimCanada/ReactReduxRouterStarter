import React from 'react'
// import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

import './style.css'

class Header extends React.PureComponent {
  render () {
    return (<Navbar inverse fixedTop collapseOnSelect>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer activeClassName="active" to="/"><a href="/">The Book Shop</a></LinkContainer>
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar.Header>
      <Navbar.Collapse>
        <Nav>
          <LinkContainer to="/about"><NavItem eventKey={1}>About</NavItem></LinkContainer>
        </Nav>
        <Nav pullRight>
          <LinkContainer activeClassName="active" to="/admin"><NavItem eventKey={3}>Admin</NavItem></LinkContainer>
          <LinkContainer activeClassName="active" to="/cart">
            <NavItem eventKey={4}>Cart<span>{'\u00A0'}</span>
              <Badge bsClass="align-text-top" className="badge">{this.props.totalQty}</Badge>
            </NavItem>
          </LinkContainer>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
    )
  }
}

// Connected to enable active menu tracking with bootstrap
export default withRouter(connect()(Header))
