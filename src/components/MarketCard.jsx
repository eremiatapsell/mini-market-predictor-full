import { Link } from 'react-router-dom'

export default function MarketCard({ m }) {
  const d = new Date(m.resolveBy)
  return (
    <div className="card">
      <div className="row" style={{alignItems:'center'}}>
        <div className="badge">{m.state.toUpperCase()}</div>
        <div className="small" style={{marginLeft:8}}>Resolve by {d.toLocaleDateString()}</div>
      </div>
      <h3 style={{marginTop:8}}>{m.title}</h3>
      <div className="row" style={{marginTop:8}}>
        <div className="kpi">YES {Math.round(m.priceHistory.at(-1).p * 100)}%</div>
        <div className="small" style={{marginLeft:'auto'}}>Liquidity b={m.b}</div>
      </div>
      <div className="row" style={{marginTop:12}}>
        <Link to={`/m/${m.id}`} className="btn block">Open</Link>
      </div>
    </div>
  )
}
