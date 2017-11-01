import React, { Component } from 'react'
import { Jumbotron, Button } from 'react-bootstrap'

class JumbotronHeader extends Component {
  render () {
    return (<Jumbotron>
      <h1>{this.props.title || 'Hello World'}</h1>
      <p>{this.props.description || 'This is a simple hero unit.'}</p>
      <p><Button bsStyle="primary">Learn more</Button></p>
    </Jumbotron>
    )
  }
}

export default JumbotronHeader
