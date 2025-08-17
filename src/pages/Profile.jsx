import { api } from '../api'
import { useUser } from '../store/useUser'
import { Link } from 'react-router-dom'

export default function Profile() {
  const { user } = useUser()
  if (!user) return <div className="container"><div className="small">Sign in to view your profile.</div></div>

  const markets = api.listMarkets()
  const rows = markets.map(m => {
    const pos = api.getPosition(user.id, m.id)
    const total = pos.yes + pos.no
    return { m, pos, total }
  }).filter(r => r.total > 0)

  return (
    <div className="container">
      <h1>{user.name}</h1>
      <div className="small" style={{marginBottom:12}}>Balance: ${user.balance.toFixed(2)}</div>
      <div className="grid">
        {rows.length ? rows.map(({m,pos})=>(
          <div key={m.id} className="card">
            <div className="small">{m.title}</div>
            <div className="row" style={{marginTop:6}}>
              <div className="badge">YES {pos.yes}</div>
              <div className="badge" style={{marginLeft:6}}>NO {pos.no}</div>
            </div>
            <Link to={`/m/${m.id}`} className="btn block" style={{marginTop:10}}>Open</Link>
          </div>
        )) : <div className="small">No positions yet.</div>}
      </div>
    </div>
  )
}
