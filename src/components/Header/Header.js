import React, {Component} from 'react'
import { Route, Link, Switch } from "react-router-dom"

import LargeHeader from '../LargeHeader/LargeHeader.js'

let Header = (props) => {
  return(
    <div className='row'>
      <div className="header">
        <nav className='navbar row black center-align'>
          <div className='col s1 red center-align'>
            <Link to="/project3-front">GA Blog v8</Link>
          </div>
          <div className='col s2 red'>
            <Link to="/project3-front/postCreate">(+) New Aha</Link>
          </div>
        </nav>
        <Switch>
          {/* display large photo header on homepage */}
          <Route exact path='/project3-front' render={() => (
            <LargeHeader />
          )} />
        </Switch>
      </div>
    </div>
  )
}

export default Header