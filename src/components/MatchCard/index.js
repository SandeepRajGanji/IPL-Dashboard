// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {name, teamLogo, result, matchStatus} = matchDetails
  let matchResult = 'won-result'
  if (matchStatus !== 'Won') {
    matchResult = 'lost-result'
  }
  return (
    <li className="match-card">
      <img
        src={teamLogo}
        alt={`competing team ${name}`}
        className="match-card-logo"
      />
      <p className="match-card-name">{name}</p>
      <p className="match-card-result">{result}</p>
      <p className={matchResult}>{matchStatus}</p>
    </li>
  )
}
export default MatchCard
