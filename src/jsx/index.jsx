const React = require('react')
const ReactDOM = require('react-dom')
const Page = require('./Page.jsx')
const { BrowserRouter } = require('react-router-dom')

ReactDOM.render((
  <BrowserRouter>
    <Page />
  </BrowserRouter>
), document.getElementById("alex-aasen-online-portfolio"))
