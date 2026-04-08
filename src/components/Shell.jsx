import { useState } from 'react'
import Map from './Map'
import HowEarlWorks from './HowEarlWorks'

export default function Shell({ onReset, returning }) {
  const [howOpen, setHowOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('map')
  const tabs = ['map','library','path']

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:'var(--bg)', overflow:'hidden' }}>
      <Grain />
      <div style={{ position:'absolute', inset:0 }}><Map shell={true} /></div>
      {returning && (
        <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:60, background:'rgba(18,13,10,0.92)', borderBottom:'1px solid var(--bdr)', padding:'10px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', backdropFilter:'blur(8px)' }}>
          <div style={{ fontFamily:'var(--fb)', fontSize:13, color:'var(--t2)', fontStyle:'italic' }}>Welcome back. <span style={{ fontFamily:'var(--fd)', fontSize:15, color:'var(--al)', fontWeight:600, fontStyle:'normal' }}>Earl</span> is where you left it.</div>
          <button onClick={onReset} style={{ background:'none', border:'none', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase', cursor:'pointer' }}>Reset · Start Over</button>
        </div>
      )}
      <nav style={{ position:'absolute', top: returning ? 42 : 0, left:0, right:0, height:54, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', background:'rgba(12,9,7,0.88)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--bdr)', zIndex:60 }}>
        <div style={{ fontFamily:'var(--fd)', fontSize:18, fontWeight:700, letterSpacing:'0.12em', color:'var(--al)' }}>Earl</div>
        <div style={{ display:'flex', gap:2, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:'var(--r)', padding:3 }}>
          {tabs.map(t => (
            <button key={t} onClick={() => setActiveTab(t)} style={{ background: activeTab===t ? 'var(--bg4)' : 'none', border: activeTab===t ? '1px solid var(--bdr)' : '1px solid transparent', color: activeTab===t ? 'var(--al)' : 'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'5px 12px', cursor:'pointer', borderRadius:4, transition:'all 0.2s' }}>{t}</button>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', gap:20 }}>
          <button onClick={() => setHowOpen(o => !o)} style={{ fontFamily:'var(--fb)', fontSize:12, color:'var(--t3)', cursor:'pointer', background:'none', border:'none', letterSpacing:'0.03em' }}>How Earl Works</button>
          <div style={{ width:30, height:30, borderRadius:'50%', border:'1px solid var(--bdrS)', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:'var(--fd)', fontSize:12, color:'var(--al)' }}>E</div>
        </div>
      </nav>
      <HowEarlWorks open={howOpen} onClose={() => setHowOpen(false)} />
    </div>
  )
}

function Grain() {
  return <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:100, opacity:0.042,
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
}
