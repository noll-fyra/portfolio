import React from 'react'
import ReactDOM from 'react-dom'
// import App from './components/app/App'
// import Cara from './components/cara/Cara'
import Root from './containers/Root'
import registerServiceWorker from './registerServiceWorker'
import './index.css'

ReactDOM.render(<Root />, document.getElementById('root'))
registerServiceWorker()
