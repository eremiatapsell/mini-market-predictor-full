import { useMemo } from 'react'

export default function MiniChart({ points }) {
  const width = 300, height = 60, pad = 6
  const ys = points.map(p=>p.p)
  const maxX = (points.length - 1) || 1
  const path = useMemo(()=>{
    if (!ys.length) return ''
    const x = i => pad + (i/maxX)*(width-2*pad)
    const y = v => height - pad - v*(height-2*pad)
    return ys.map((v,i)=> (i?'L':'M') + x(i) + ' ' + y(v)).join(' ')
  }, [points])

  const latest = points.at(-1)?.p ?? 0.5

  return (
    <div className="card" style={{padding:12}}>
      <svg width={width} height={height}>
        <path d={path} fill="none" stroke="#2b59ff" strokeWidth="2" />
      </svg>
      <div className="small">YES {Math.round(latest*100)}%</div>
    </div>
  )
}
