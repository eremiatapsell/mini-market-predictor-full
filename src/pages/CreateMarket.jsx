import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { api } from '../api'
import { useUser } from '../store/useUser'

export default function CreateMarket() {
  const nav = useNavigate()
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [date, setDate] = useState(() => new Date().toISOString().slice(0,10))
  const [time, setTime] = useState('23:59')
  const [b, setB] = useState(50)

  const submit = (e) => {
    e.preventDefault()
    if (!title.trim()) { alert('Title required'); return }
    const resolveBy = new Date(`${date}T${time}:00`).toISOString()
    const m = api.createMarket({ title, resolveBy, b, createdBy: user?.id || 'anon' })
    nav(`/m/${m.id}`)
  }

  return (
    <div className="container">
      <h1>Create a Market</h1>
      <form className="card" onSubmit={submit}>
        <label className="label">Question / Title</label>
        <input className="input" value={title} onChange={e=>setTitle(e.target.value)} placeholder="Will Alice run a marathon by Oct 31?" />
        <div className="row" style={{marginTop:8}}>
          <div className="col">
            <label className="label">Resolve date</label>
            <input className="input" type="date" value={date} onChange={e=>setDate(e.target.value)} />
          </div>
          <div className="col">
            <label className="label">Resolve time</label>
            <input className="input" type="time" value={time} onChange={e=>setTime(e.target.value)} />
          </div>
        </div>
        <div style={{marginTop:8}}>
          <label className="label">Liquidity parameter b (higher = less price movement)</label>
          <input className="input" type="number" min="10" step="5" value={b} onChange={e=>setB(parseInt(e.target.value||'50',10))} />
        </div>
        <div style={{marginTop:12}}>
          <button className="btn">Create</button>
        </div>
      </form>
    </div>
  )
}
