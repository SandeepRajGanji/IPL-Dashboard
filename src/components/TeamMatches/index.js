// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'
import MatchCard from '../MatchCard'
import LatestMatch from '../LatestMatch'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamBannerUrl: '',
    matchData: [],
    latestMatchData: {},
    isLoading: false,
  }

  componentDidMount() {
    this.getTeamData()
  }

  getTeamData = async () => {
    this.setState({
      isLoading: true,
    })
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const formattedRecentMatches = data.recent_matches.map(eachMatch => ({
      name: eachMatch.competing_team,
      teamLogo: eachMatch.competing_team_logo,
      id: eachMatch.id,
      matchStatus: eachMatch.match_status,
      result: eachMatch.result,
    }))

    const formattedLatestMatchDetails = {
      name: data.latest_match_details.competing_team,
      teamLogo: data.latest_match_details.competing_team_logo,
      id: data.latest_match_details.id,
      date: data.latest_match_details.date,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      firstInnings: data.latest_match_details.first_innings,
      secondInnings: data.latest_match_details.second_innings,
      manOfMatch: data.latest_match_details.man_of_the_match,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }

    this.setState({
      teamBannerUrl: data.team_banner_url,
      matchData: formattedRecentMatches,
      latestMatchData: formattedLatestMatchDetails,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderMatchData = () => {
    const {teamBannerUrl, matchData, latestMatchData} = this.state
    return (
      <>
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <div className="latest-matches-container">
          <LatestMatch
            key={latestMatchData.id}
            latestMatchDetails={latestMatchData}
          />
        </div>

        <ul className="match-card-list">
          {matchData.map(eachMatch => (
            <MatchCard key={eachMatch.id} matchDetails={eachMatch} />
          ))}
        </ul>
      </>
    )
  }

  getRouteClassName = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'srh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  render() {
    const {isLoading} = this.state
    const className = `team-matches-container ${this.getRouteClassName()}`
    return (
      <div className={className}>
        {isLoading ? this.renderLoader() : this.renderMatchData()}
      </div>
    )
  }
}
export default TeamMatches
