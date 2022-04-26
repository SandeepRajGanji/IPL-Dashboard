// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    teamsData: [],
    isLoading: false,
  }

  componentDidMount() {
    this.getTeamsData()
  }

  getTeamsData = async () => {
    this.setState({
      isLoading: true,
    })
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()

    const formattedTeamsData = data.teams.map(eachItem => ({
      id: eachItem.id,
      name: eachItem.name,
      teamImageUrl: eachItem.team_image_url,
    }))

    this.setState({teamsData: formattedTeamsData, isLoading: false})
  }

  renderLoader = () => (
    <div testid="loader" className="loader-container">
      <div>
        <Loader type="Oval" color="#ffffff" height={50} width={50} />
      </div>
    </div>
  )

  renderTeamsData = () => {
    const {teamsData} = this.state
    return (
      <ul className="teams-list">
        {teamsData.map(eachTeam => (
          <TeamCard key={eachTeam.id} teamDetails={eachTeam} />
        ))}
      </ul>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className="ipl-app-container">
        <div className="ipl-responsive-container">
          <div className="heading-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-image"
            />
            <h1 className="dashboard-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? this.renderLoader() : this.renderTeamsData()}
        </div>
      </div>
    )
  }
}
export default Home
