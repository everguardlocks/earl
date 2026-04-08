import { useState } from 'react'
import EarlMessage from './EarlMessage'

export default function CheckCard({ check, onPass }) {
  const [state, setState] = useState('idle') // idle | wrong | correct
  const [response, setResponse] = useState('')
  const [showCont, setShowCont] = useState(false)

  const handleAnswer = (opt) => {
    if (state !== 'idle') return
    if (opt.correct) {
      setState('correct')
      setResponse(check.correctResponse)
      setTimeout(() => setShowCont(true), 2000)
    } else {
      setState('wrong')
      setResponse(check.wrongResponse)
    }
  }

  const retry = () => {
    setState('idle')
    setResponse('')
    setShowCont(false)
  }

  return (
    <div style={{ border:'1px solid var(--bdrS)', borderRadius:8, padding:16, margin:'20px 0' }}>
      <div style={{ fontFamily:'var(--fd)', fontSize:16, color:'var(--t)', marginBottom:14, lineHeight:1.42 }}>
        {check.question}
      </div>
      {check.options.map((opt, i) => {
        let borderColor = 'var(--bdr)'
        let color = 'var(--t2)'
        let bg = 'var(--bg3)'
        if (state !== 'idle') {
          if (opt.correct) { borderColor = '#6BBF7A'; color = '#6BBF7A'; bg = 'rgba(107,191,122,0.07)' }
          else { borderColor = 'var(--t4)'; color = 'var(--t3)' }
        }
        return (
          <button key={i} onClick={() => handleAnswer(opt)} style={{
            display:'block', width:'100%', textAlign:'left',
            background: bg, border:`1px solid ${borderColor}`, color,
            fontFamily:'var(--fb)', fontSize:13, padding:'9px 13px',
            borderRadius:6, cursor: state === 'idle' ? 'pointer' : 'default',
            marginBottom:7, lineHeight:1.45, transition:'all 0.18s'
          }}>{opt.text}</button>
        )
      })}
      {response && (
        <div style={{ marginTop:12, padding:'12px 14px', background:'var(--bg4)', borderRadius:6 }}>
          <EarlMessage text={response} speed={18} onDone={() => state === 'wrong' && setTimeout(retry, 2000)} />
        </div>
      )}
      {showCont && (
        <button onClick={onPass} style={{
          background:'none', border:'1px solid var(--a)', color:'var(--al)',
          fontFamily:'var(--fb)', fontSize:13, padding:'10px 24px',
          borderRadius:6, cursor:'pointer', marginTop:14, letterSpacing:'0.04em'
        }}>Continue to next chapter →</button>
      )}
    </div>
  )
}
