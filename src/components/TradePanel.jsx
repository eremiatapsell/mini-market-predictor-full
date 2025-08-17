import { useState } from 'react'
import { priceYes, tradeYes } from '../lib/lmsr'
import { api } from '../api'
import { useUser } from '../store/useUser'

export default function TradePanel({ market, onUpdate }) {
  const { user, updateBalance } = useUser()
  const [qty, setQty] = useState(1)

  if (!user) return <div className="small">Sign in to trade.</div>
  if (market.state !== 'open') return <div className="small">Market is resolved.</div>

  const q = market.q
  const p = priceYes(q, market.b)

  const buy = (side, units) => {
    const delta = side === 'YES' ? units : -units
    const { newQ, spend } = tradeYes(q, market.b, delta)
    const nextPrice = priceYes(newQ, market.b)
    const cost = +spend.toFixed(2)

    if (user.balance < cost) {
      alert('Not enough balance')
      return
    }

    updateBalance(-cost)
    const res = api.trade({
      marketId: market.id,
      userId: user.id,
      side,
      qty: units,
      price: nextPrice,
      spend: cost,
      qAfter: newQ,
      pAfter: nextPrice
    })
    onUpdate(res.market)
  }

  return (
    <div className="card">
      <div className="row" style={{alignItems:'center', marginBottom:8}}>
        <div className="kpi">YES {Math.round(p*100)}%</div>
        <div className="small" style={{marginLeft:'auto'}}>Your balance: ${user.balance.toFixed(2)}</div>
      </div>
      <label className="label">Quantity (shares)</label>
      <input className="input" type="number" min="1" step="1" value={qty}
        onChange={e=>setQty(Math.max(1, parseInt(e.target.value||'1',10)))} />
      <div className="row" style={{marginTop:8}}>
        <button className="btn" onClick={()=>buy('YES', qty)}>Buy YES</button>
        <button className="btn ghost" onClick={()=>buy('NO', qty)}>Buy NO</button>
      </div>
      <div className="small" style={{marginTop:8}}>
        Prices adjust automatically with LMSR. Each trade moves the odds.
      </div>
    </div>
  )
}
