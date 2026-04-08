import { useState, useEffect } from 'react'
import Map from '../components/Map'
import OnboardingFlow from '../components/OnboardingFlow'

export default function Landing({ onComplete }) {
  const [phase, setPhase] = useState('map') // map | tagline | begin | onboarding | reveal
  const [showTagline, setShowTagline] = useState(false)
  const [showBegin, setShowBegin] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setShowTagline(true), 2800)
    const t2 = setTimeout(() => setShowBegin(true), 5600)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div style={{ position:'relative', width:'100%', height:'100%', background:'var(--bg)', overflow:'hidden' }}>
      <Grain />
      <div style={{
        position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center',
        transition:'transform 1.4s cubic-bezier(.22,1,.36,1), opacity 1.4s ease, filter 1.4s ease',
        transform: phase === 'onboarding' ? 'scale(0.55) translateY(-40px)' : 'scale(1)',
        opacity: phase === 'onboarding' ? 0.22 : 1,
        filter: phase === 'onboarding' ? 'blur(3px)' : 'none',
      }}>
        <Map shellLabels={phase === 'reveal'} onNodeClick={phase === 'reveal' ? onComplete : undefined} />
      </div>
      {phase !== 'onboarding' && phase !== 'reveal' && (
        <>
          <div style={{ position:'absolute', bottom:'18%', left:0, right:0, textAlign:'center', zIndex:20, transition:'opacity 1.6s ease', opacity: showTagline ? 1 : 0 }}>
            <div style={{ fontFamily:'var(--fd)', fontSize:27, fontWeight:400, color:'var(--t2)', letterSpacing:'0.045em', lineHeight:1.5, fontStyle:'italic' }}>
              You were always capable.<br />You just hadn't <span style={{ fontStyle:'normal', color:'var(--al)' }}>started.</span>
            </div>
          </div>
          <div style={{ position:'absolute', bottom:'9%', left:0, right:0, textAlign:'center', zIndex:20, transition:'opacity 1.2s ease', opacity: showBegin ? 1 : 0 }}>
            <button onClick={() => setPhase('onboarding')} style={{ background:'none', border:'1px solid var(--a)', color:'var(--al)', fontFamily:'var(--fb)', fontSize:14, letterSpacing:'0.06em', padding:'13px 48px', cursor:'pointer', borderRadius:'var(--r)' }}>Begin</button>
          </div>
        </>
      )}
      {phase === 'onboarding' && (
        <OnboardingFlow onComplete={() => setPhase('reveal')} />
      )}
    </div>
  )
}

function Grain() {
  return <div style={{ position:'fixed', inset:0, pointerEvents:'none', zIndex:100, opacity:0.042,
    backgroundImage:`url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.78' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)'/%3E%3C/svg%3E")` }} />
}
