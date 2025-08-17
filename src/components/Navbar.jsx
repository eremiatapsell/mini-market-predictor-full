import { Link, NavLink } from 'react-router-dom'
import { useUser } from '../store/useUser'

export default function Navbar() {
  const { user, login, logout } = useUser()

  const onLogin = () => {
    const name = prompt('Pick a display name')
    if (name && name.trim()) login(name.trim())
  }

  return (
    <div className="nav">
      <div className="container row" style={{alignItems:'center', padding:'12px 20px'}}>
        <Link to="/" style={{fontWeight:800}}>🔮 Mini‑Market</Link>
        <div style={{flex:1}} />
        <NavLink to="/" style={{marginRight:12}}>Markets</NavLink>
        <NavLink to="/create" style={{marginRight:12}}>Create</NavLink>
        {user ? (
          <>
            <NavLink to="/me" className="badge" style={{marginRight:12}}>
              {user.name} · ${user.balance.toFixed(2)}
            </NavLink>
            <button className="btn ghost" onClick={logout}>Logout</button>
          </>
        ) : (
          <button className="btn" onClick={onLogin}>Sign in</button>
        )}
      </div>
    </div>
  )
}
