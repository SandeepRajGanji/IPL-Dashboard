// Write your code here
import './index.css'

const LatestMatch = props => {
  const {latestMatchDetails} = props

  const {
    name,
    teamLogo,
    date,
    result,
    firstInnings,
    secondInnings,
    manOfMatch,
    umpires,
    venue,
  } = latestMatchDetails
  return (
    <div>
      <h1 className="latest-match-heading">Latest Matches</h1>
      <div className="latest-match-card">
        <div className="match-details-left-container">
          <div className="match-details-left-container-card">
            <p className="latest-competing-team-name">{name}</p>
            <p>{date}</p>
            <p className="latest-match-left-text">{venue}</p>
            <p className="latest-match-left-text">{result}</p>
          </div>
          <img
            src={teamLogo}
            alt={`latest match ${name}`}
            className="latest-match-logo"
          />
        </div>

        <div className="match-details-right-container">
          <p>First Innings</p>
          <p className="latest-match-text">{firstInnings}</p>
          <p>Second Innings</p>
          <p className="latest-match-text">{secondInnings}</p>
          <p>Man of Match</p>
          <p className="latest-match-text">{manOfMatch}</p>
          <p>Umpires</p>
          <p className="latest-match-text">{umpires}</p>
        </div>
      </div>
    </div>
  )
}
export default LatestMatch
