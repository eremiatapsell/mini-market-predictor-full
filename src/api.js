import { uid } from './lib/uid'
const DB_KEY = 'mmp:db@v1'

function seed() {
  const now = Date.now()
  return {
    markets: [
      {
        id: uid('m_'),
        title: 'Will Alice run a marathon by Oct 31?',
        resolveBy: new Date(new Date().getFullYear(), 9, 31).toISOString(),
        state: 'open',
        outcome: null,
        b: 50,
        q: { yes: 0, no: 0 },
        createdBy: 'system',
        createdAt: now,
        trades: [],
        priceHistory: [{ t: now, p: 0.5 }]
      },
      {
        id: uid('m_'),
        title: 'Will BTC close the month above $70k?',
        resolveBy: new Date(new Date().getFullYear(), new Date().getMonth(), 28).toISOString(),
        state: 'open',
        outcome: null,
        b: 80,
        q: { yes: 0, no: 0 },
        createdBy: 'system',
        createdAt: now,
        trades: [],
        priceHistory: [{ t: now, p: 0.5 }]
      }
    ],
    positions: {},
  }
}

function readDB() {
  const raw = localStorage.getItem(DB_KEY)
  if (!raw) {
    const s = seed()
    localStorage.setItem(DB_KEY, JSON.stringify(s))
    return s
  }
  return JSON.parse(raw)
}
function writeDB(db) { localStorage.setItem(DB_KEY, JSON.stringify(db)) }

export const api = {
  listMarkets() {
    const db = readDB()
    return db.markets.sort((a,b)=>b.createdAt - a.createdAt)
  },

  getMarket(id) {
    const db = readDB()
    return db.markets.find(m => m.id === id)
  },

  createMarket({ title, resolveBy, b, createdBy }) {
    const db = readDB()
    const m = {
      id: uid('m_'),
      title, resolveBy, state: 'open', outcome: null,
      b: Number(b) || 50,
      q: { yes: 0, no: 0 },
      createdBy,
      createdAt: Date.now(),
      trades: [],
      priceHistory: [{ t: Date.now(), p: 0.5 }]
    }
    db.markets.push(m)
    writeDB(db)
    return m
  },

  trade({ marketId, userId, side, qty, price, spend, qAfter, pAfter }) {
    const db = readDB()
    const m = db.markets.find(m => m.id === marketId)
    if (!m) throw new Error('Market not found')

    m.q = qAfter
    m.trades.push({
      id: uid('t_'),
      userId, side, qty, price, spend, at: Date.now()
    })
    m.priceHistory.push({ t: Date.now(), p: pAfter })

    const key = userId
    db.positions[key] = db.positions[key] || {}
    const pos = db.positions[key][marketId] || { yes: 0, no: 0, cost: 0 }
    pos[side.toLowerCase()] += qty
    pos.cost += spend
    db.positions[key][marketId] = pos

    writeDB(db)
    return { market: m, position: pos }
  },

  getPosition(userId, marketId) {
    const db = readDB()
    return db.positions[userId]?.[marketId] || { yes: 0, no: 0, cost: 0 }
  },

  resolveMarket({ marketId, outcome }) {
    const db = readDB()
    const m = db.markets.find(m => m.id === marketId)
    if (!m) throw new Error('Market not found')
    if (m.state !== 'open') throw new Error('Already resolved')
    m.state = 'resolved'
    m.outcome = outcome
    writeDB(db)
    return m
  }
}
