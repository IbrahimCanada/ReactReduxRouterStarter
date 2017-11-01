import './footer.css'
import React, { Component } from 'react'

class Footer extends Component {
  state = { }
  render () {
    return (
      <footer className="footer text-center">
        <div className="container">
          <p>© 2017 Company, Inc. All Rights Reserved.</p>
        </div>
      </footer>
    )
  }
}

export default Footer
