import { Link } from 'react-router-dom'
import { api } from '../api'
import MarketCard from '../components/MarketCard'

export default function Markets() {
  const markets = api.listMarkets()
  return (
    <div className="container">
      <div className="row" style={{alignItems:'center', margin:'12px 0 16px'}}>
        <h1>Markets</h1>
        <div style={{flex:1}} />
        <Link className="btn" to="/create">+ Create Market</Link>
      </div>
      <div className="grid">
        {markets.map(m => <MarketCard key={m.id} m={m} />)}
      </div>
    </div>
  )
}
