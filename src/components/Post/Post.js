import React, { Component } from 'react'
import axios from "axios";

import './Post.css'
import {
  Link
} from "react-router-dom"


const PostDetail = (props) => {
  return (
    <Link to={`/${props.post._id}`} key={props.post._id}>
      <div className="blogPost col s12" key={props.post._id}>
        <h3>{props.post.title}</h3>
        <p> {props.post.createdAt.slice(0, 10)} </p>
        <h6 className='col s12'>
          {props.post.content}
        </h6>
      </div>
    </Link>
  )
}


export default class Post extends Component {
    constructor(props) {
    super(props)

    this.state = {
      posts: [],
      searchTag: null,
      tags: [],
      searchTag: '',
      searchedPosts: null,
      searched: false
    }
  }

  handleSearchTag(e) {
    this.setState({
      searchTag: e.target.value,
      searched: false
    })
  }

  handleSearchSubmit(e) {
    e.preventDefault()
    if (this.state.searchTag) {
      //  this should be on the backend! Preferably the tag will be sent to the frontend automatically so that
      // there doesn't need to be a duplicate API call
      axios.get(`https://ga-aha.herokuapp.com/tags/${this.state.searchTag}`)
        .then(response => {
          this.setState({
            tags: response.data
          })
          var filtered = []
  
          for (var i = 0; i < response.data.length; i++) {
            filtered.push(this.props.posts.filter((e) => e._id === response.data[i].post))
          }
        
          //  storing the results to an empty array (from an array within an array)
          let newFiltered = [].concat.apply([], filtered)
  
          this.setState({
            searchedPosts: newFiltered,
            searched: true
          })
        })
    }
  }
  
  compare(a, b) {
    if (a.createdAt > b.createdAt) 
      return -1
    if (a.createdAt < b.createdAt) 
      return 1
    return 0
  }

  render () {    
    let displayedPosts = this.state.searched ? this.state.searchedPosts : this.props.posts
    let sortedPosts = displayedPosts.sort(this.compare) // you could also do this pretty easily on the backend with
                                                        // Mongo's order attribute!
  
    return (
        <div className='clearSpace'>
          <div className='row'>
            <h2 className="postHeader col s6">Latest Aha Moments</h2>
            <div className="col s6 searchTag">
              <form onSubmit={(e) => this.handleSearchSubmit(e)}>
                <input className="col s6" onChange={(e) => this.handleSearchTag(e)} />
                <button className="col s5 red" type="submit">Filter Moments</button>
              </form>
            </div>
          </div>
          <div className='row'>
            {sortedPosts.map(post => {
              return <PostDetail post={post} />
            })}
          </div>
        </div>
      )
    }
}
