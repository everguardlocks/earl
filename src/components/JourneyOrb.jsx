import { useState } from 'react'
import Map from './Map'

export default function JourneyOrb() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* Overlay — map panel */}
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{
            position:'fixed', inset:0, zIndex:80
          }} />
          <div style={{
            position:'fixed', bottom:100, left:20, zIndex:90,
            width:260, height:320,
            background:'rgba(15,12,10,0.96)',
            border:'1px solid rgba(200,146,42,0.26)',
            borderRadius:10,
            backdropFilter:'blur(12px)',
            boxShadow:'0 8px 48px rgba(0,0,0,0.7)',
            padding:'16px 12px',
            display:'flex', flexDirection:'column', gap:10,
            animation:'orbPanelIn 0.3s cubic-bezier(.22,1,.36,1)'
          }}>
            <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.18em', color:'var(--t3)', textTransform:'uppercase' }}>Your Journey</div>
            <div style={{ flex:1, minHeight:0 }}>
              <Map shell={true} />
            </div>
          </div>
        </>
      )}

      {/* The orb */}
      <div onClick={() => setOpen(o => !o)} style={{
        position:'fixed', bottom:24, left:24, zIndex:70,
        display:'flex', flexDirection:'column', alignItems:'center', gap:6,
        cursor:'pointer'
      }}>
        <div style={{
          width:48, height:48, borderRadius:'50%',
          background:'rgba(200,146,42,0.12)',
          border:'1px solid rgba(200,146,42,0.35)',
          display:'flex', alignItems:'center', justifyContent:'center',
          transition:'all 0.3s',
          boxShadow: open ? '0 0 24px rgba(200,146,42,0.3)' : '0 0 8px rgba(200,146,42,0.1)'
        }}>
          <div style={{
            width:8, height:8, borderRadius:'50%',
            background:'var(--a)',
            animation:'orbPulse 2.8s ease-in-out infinite'
          }} />
        </div>
        <div style={{
          fontFamily:'var(--fd)', fontSize:11, fontStyle:'italic',
          color:'var(--t3)', letterSpacing:'0.04em', whiteSpace:'nowrap'
        }}>Your journey</div>
      </div>

      <style>{`
        @keyframes orbPulse {
          0%,100% { opacity:0.7; transform:scale(0.9); box-shadow:0 0 0 0 rgba(200,146,42,0.4); }
          50% { opacity:1; transform:scale(1.1); box-shadow:0 0 0 6px rgba(200,146,42,0); }
        }
        @keyframes orbPanelIn {
          from { opacity:0; transform:translateY(12px) scale(0.97); }
          to { opacity:1; transform:none; }
        }
      `}</style>
    </>
  )
}
