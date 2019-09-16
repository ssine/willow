import React from 'react'
import ReactDOM from 'react-dom'
import './style/index.scss'
import MainPage from './page/main-page'
import UniversityPage  from './page/university-page'
import DetailsPage  from './page/details-page'
import NavBar from './component/navbar'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

const routing = (
  <Router>
    <div>
      <NavBar links={[
        {name: 'Home', url: '/'},
        {name: 'Universities', url: '/universities'}
      ]}/>
      <Route exact path='/' component={MainPage} />
      <Route path='/universities' component={UniversityPage} />
      <Route path='/university/:name/:program?' component={DetailsPage} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))
