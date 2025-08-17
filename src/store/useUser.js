import { useEffect, useState } from 'react'

const KEY = 'mmp:user'

export function useUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (raw) setUser(JSON.parse(raw))
  }, [])

  const login = (name) => {
    const u = { id: name.toLowerCase().replace(/\s+/g,'-'), name, balance: 1000 }
    localStorage.setItem(KEY, JSON.stringify(u))
    setUser(u)
  }

  const updateBalance = (delta) => {
    setUser(u => {
      const nu = { ...u, balance: +(u.balance + delta).toFixed(2) }
      localStorage.setItem(KEY, JSON.stringify(nu))
      return nu
    })
  }

  const logout = () => {
    localStorage.removeItem(KEY)
    setUser(null)
  }

  return { user, login, logout, updateBalance }
}
