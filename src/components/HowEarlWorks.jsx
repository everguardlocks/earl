const items = [
  { icon:'◉', label:'The amber pulse', text:"That means I noticed something. Could be a passage most people find tricky. Click it when you're ready. Ignore it if you're not." },
  { icon:'◈', label:'Highlight anything', text:"Select any text in the document. I'll break it down — plain language, real context, why it matters." },
  { icon:'⚑', label:'The flag', text:"One click marks your current page. I'll queue it for a deeper look. Use it when something doesn't sit right but you want to keep moving." },
  { icon:'◎', label:'Ask Earl', text:"One line. Ask me anything about what you're reading. Bottom of my panel." },
  { icon:'▸', label:'The terminal', text:"Real Linux. In the browser. Whatever I ask you to try — try it here first. No machine required. No consequences. Just the command line and you." },
  { icon:'⬡', label:'The map', text:"Every node you unlock is permanent. The map grows as you do. The dim nodes are real — you'll get there." },
  { icon:'✖', label:'Wrong answers', text:"Tell me what you got wrong and I'll tell you what it means. Nothing in here is a judgment. Everything is information." },
]

export default function HowEarlWorks({ open, onClose }) {
  return (
    <div style={{
      position:'absolute', top:0, right:0, width:290, height:'100%',
      background:'var(--bg2)', borderLeft:'1px solid var(--bdrS)', zIndex:55,
      padding:'72px 24px 24px', overflowY:'auto',
      transform: open ? 'translateX(0)' : 'translateX(100%)',
      transition:'transform 0.42s cubic-bezier(.22,1,.36,1)'
    }}>
      <button onClick={onClose} style={{ background:'none', border:'none', color:'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.15em', textTransform:'uppercase', cursor:'pointer', marginBottom:24 }}>← Close</button>
      <div style={{ fontFamily:'var(--fd)', fontSize:22, fontWeight:600, color:'var(--t)', marginBottom:6 }}>How Earl works.</div>
      <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--t3)', marginBottom:28 }}>No tutorial. Just what you need to know.</div>
      {items.map((item,i) => (
        <div key={i} style={{ marginBottom:20, paddingBottom:20, borderBottom: i < items.length-1 ? '1px solid var(--bdr)' : 'none' }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--a)', textTransform:'uppercase', marginBottom:6 }}>{item.icon} {item.label}</div>
          <div style={{ fontSize:13, color:'var(--t2)', lineHeight:1.74 }}>{item.text}</div>
        </div>
      ))}
    </div>
  )
}
