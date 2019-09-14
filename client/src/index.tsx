import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import Main from './page/main'
import UniversityPage  from './page/university-page'
import DetailsPage  from './page/detail-page'
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
      <Route path='/universities' component={UniversityPage} />
      <Route path='/university/:name' component={DetailsPage} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
