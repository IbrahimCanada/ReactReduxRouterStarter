import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { Grid, Row } from 'react-bootstrap'
import JumbotronHeader from '../../components/JumbotronHeader'

class AboutPage extends Component {
  render () {
    return (
      <Grid>
        <Row>
          <JumbotronHeader title={'About'} description={'This is a sample about page'} />
        </Row>
        <Row />
      </Grid>
    )
  }
}

export default withRouter(connect()(AboutPage))
