import React, {Component} from 'react'
import axios from "axios"

class Weather extends Component {
    constructor(props) {
        super(props)
        this.state = {
            weather:"Sunny",
            temperature: "0",
            date: this.props.date
        }
    }

    componentWillMount() {
        axios
        .get("https://api.wunderground.com/api/e99e675866a9f62a/conditions/q/DC/Washington.json")
        .then(response => {
            this.setState({
                weather: response.data.current_observation.icon_url,
                temperature: response.data.current_observation.temp_f
            })
        })
    }

    render () {
        return (
            <div className="flexcolfeed">
                {/* local weather */}
                <div className="flexrow">
                    <img className="weatherIcon" src={this.state.weather} alt="weather-icon"/>
                    <div className="flexcol">
                    <label className="weatherInfo">{this.state.temperature}&#176;F</label>
                    <label>Washington, DC</label>
                    </div>
                </div>
            </div>
        )
    }
}

export default Weather