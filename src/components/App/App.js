import React, { Component } from 'react'
import axios from "axios"

import SideNav from '../SideNav/SideNav.js'
import Header from '../Header/Header.js'
import Post from '../Post/Post.js'
import Show from '../Show/Show.js'
import Add from '../Add/Add.js'
import Edit from '../Edit/Edit.js'
import './App.css'


import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom"

// AS: Be consistent on semi-colons!

class App extends Component {
  constructor (props) {
    super (props)
    this.state = {
        posts: []
    }
  }

  componentWillMount () {
    axios.get("https://ga-aha.herokuapp.com/").then(response => {
      this.setState({
        posts: response.data
      })
    }).catch((err) => {
        console.log(err)
    })
} 

  render() {
    return (
      <Router>
        <div>
          <Header />
          <section className='col s9 mainSection'>
            <Switch>
              {/* home page */}
              <Route exact path="/" render={() => (
                <Post 
                  posts={this.state.posts}
                  handleSearchSubmit={this.handleSearchSubmit}
                  handleSearchTag={this.handleSearchTag}
                />
              )}/>

              {/* create post */}
              <Route exact path="/postCreate" render={() => (
                <Add />
              )} />

              {/* show single post */}
              <Route exact path="/:_id" render={(props) => (
                <Show
                  {...props}
                  posts={this.state.posts}
                />
              )} />

              {/* edit post */}
              <Route exact path="/:_id/updatePost" render={(props) => (
                <Edit
                  {...props}
                  posts={this.state.posts}
                />
              )} />

              {/* redirect to homepage */}
              <Route
                path="/*" render={() => (<Redirect to="/" />)}
              />
            </Switch>
          </section>
          <SideNav />
        </div>
      </Router>
    )
  }
}

export default App
