import React, {Component} from 'react'
import Weather from '../Weather/Weather.js'
       
class SideNav extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: this.getDate()
    }
  }

  getDate() {
    // AS: Good job on this! Would abstract to method, and also be consistent on
    // formatting!
    const mNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug",
      "Sep", "Oct", "Nov", "Dec"]

    const date = new Date()
    const currDate = date.getDate()
    const currMonth = date.getMonth()
    const currYear = date.getFullYear()
    return mNames[currMonth] + ' ' + currDate
  }

  render () {
    return (
      <section className='col s3 mainSection'>
        <Weather date={this.state.date}/> {/* Upcoming Events */}
        <div className="row">
          <h5 className="eventStyle">Upcoming Events</h5>
        </div>
        <div className="row currDate">
          <h4>{this.state.date}</h4>
          <p>Tech and Advertising with Twitter</p>
          <p>Digital Marketing info Session</p>
        </div>
        <div className="row currDate">
          <p>Adobe Indesign Bootcamp</p>
          <p>SQL Bootcamp</p>
          <p>Intro to R</p>
        </div>
      </section>
    )
  }
}

export default SideNav