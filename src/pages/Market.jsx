import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { api } from '../api'
import TradePanel from '../components/TradePanel'
import MiniChart from '../components/MiniChart'
import { useUser } from '../store/useUser'

export default function Market() {
  const { id } = useParams()
  const [m, setM] = useState(null)
  const { user, updateBalance } = useUser()

  useEffect(()=>{ setM(api.getMarket(id)) }, [id])

  if (!m) return <div className="container"><div className="small">Loading…</div></div>

  const resolve = (outcome) => {
    if (!confirm(`Resolve market as ${outcome}? This is final.`)) return
    const resolved = api.resolveMarket({ marketId: m.id, outcome })
    setM(resolved)

    if (user) {
      const pos = api.getPosition(user.id, m.id)
      const winShares = outcome === 'YES' ? pos.yes : pos.no
      const payout = winShares * 1
      if (payout) updateBalance(payout)
      alert(`Resolved ${outcome}. You received $${payout.toFixed(2)} for ${winShares} winning shares.`)
    }
  }

  return (
    <div className="container">
      <div className="row" style={{alignItems:'center'}}>
        <h1 style={{flex:1}}>{m.title}</h1>
        <div className="badge">{m.state.toUpperCase()}</div>
      </div>
      <div className="small">Resolve by {new Date(m.resolveBy).toLocaleString()}</div>
      <div className="row" style={{marginTop:12}}>
        <div className="col">
          <TradePanel market={m} onUpdate={setM} />
          {m.state === 'open' ? null : <div className="card" style={{marginTop:12}}>
            Outcome: <b>{m.outcome}</b>
          </div>}
          <div className="card" style={{marginTop:12}}>
            <div className="row" style={{gap:8}}>
              <button className="btn ghost" onClick={()=>resolve('YES')}>Resolve YES</button>
              <button className="btn ghost" onClick={()=>resolve('NO')}>Resolve NO</button>
            </div>
            <div className="small" style={{marginTop:8}}>
              (In a real app, only market creators/moderators can resolve.)
            </div>
          </div>
        </div>
        <div className="col" style={{maxWidth:340}}>
          <MiniChart points={m.priceHistory} />
          <div className="card" style={{marginTop:12}}>
            <div className="label">Recent Trades</div>
            <div className="small">
              {m.trades.slice(-6).reverse().map(t=>(
                <div key={t.id} style={{marginBottom:6}}>
                  <b>{t.side}</b> ×{t.qty} at ~{Math.round(t.price*100)}% · ${t.spend}
                </div>
              ))}
              {m.trades.length === 0 && <div>No trades yet.</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
