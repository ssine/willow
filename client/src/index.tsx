import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import Main from './page/main'
import Universities  from './page/universities'
import University  from './component/university-card'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <ul>
        <li>
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/universities'>Universities</Link>
        </li>
      </ul>
      <Route exact path='/' component={Main} />
      <Route path='/universities' component={Universities} />
      <Route path='/university/:name' component={University} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
