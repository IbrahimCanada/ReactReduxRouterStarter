import path from 'path'
import fs from 'fs'

import React from 'react'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'react-router-redux'
import { renderToString } from 'react-dom/server'

import configureStore from '../../src/store'
import App from '../../src/containers/App'

module.exports = function universalLoader (req, res) {
  const filePath = path.resolve(__dirname, '..', 'build', 'index.html')

  fs.readFile(filePath, 'utf8', (err, htmlData) => {
    if (err) {
      console.error('read err', err)
      return res.status(404).end()
    }
    const context = {}
    const store = configureStore()
    const markup = renderToString(
      <Provider store={store}>
        <ConnectedRouter
          location={req.url}
          context={context}
        >
          <App />
        </ConnectedRouter>
      </Provider>
    )

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      redirect(301, context.url)
    } else {
      // we're good, send the response
      const RenderedApp = htmlData.replace('{{SSR}}', markup)
      res.send(RenderedApp)
    }
  })
}
