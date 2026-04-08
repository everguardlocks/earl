export default function ConceptBlock({ concept }) {
  const { type, label, title, body } = concept

  if (type === 'analogy') return (
    <div style={{ background:'rgba(200,146,42,0.05)', border:'1px solid var(--bdr)', borderRadius:8, padding:'14px 16px', margin:'18px 0' }}>
      <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.13em', color:'var(--ad)', textTransform:'uppercase', marginBottom:6 }}>{label || 'Analogy'}</div>
      <div style={{ fontSize:14, color:'var(--t)', lineHeight:1.78, fontStyle:'italic' }}>{body}</div>
    </div>
  )

  if (type === 'marginnote') return (
    <div style={{ float:'right', clear:'right', width:150, margin:'0 0 16px 20px', padding:'10px 12px', background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:6, fontSize:11.5, lineHeight:1.6, color:'var(--t2)', fontStyle:'italic' }}>
      {body}
    </div>
  )

  return (
    <div style={{ background:'var(--bg2)', border:'1px solid var(--bdr)', borderLeft:'3px solid var(--a)', borderRadius:'0 8px 8px 0', padding:'16px 18px', marginBottom:18 }}>
      {label && <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--ad)', textTransform:'uppercase', marginBottom:7 }}>{label}</div>}
      {title && <div style={{ fontFamily:'var(--fd)', fontSize:20, fontWeight:600, color:'var(--al)', marginBottom:8 }}>{title}</div>}
      {body && <div style={{ fontSize:14, lineHeight:1.78, color:'var(--t2)' }}>{body}</div>}
    </div>
  )
}
