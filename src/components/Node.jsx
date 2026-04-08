export default function Node({ x, y, state = 'dim', label, sublabel, onEnter, onLeave, onClick }) {
  const isActive = state === 'active'
  const isDone = state === 'done'
  const fill = isActive ? 'rgba(200,146,42,0.9)' : isDone ? 'rgba(156,109,50,0.7)' : 'rgba(26,20,14,0.9)'
  const stroke = isActive ? 'rgba(219,177,131,0.55)' : isDone ? 'rgba(200,146,42,0.4)' : 'rgba(200,146,42,0.22)'
  return (
    <g>
      {isActive && <>
        <circle cx={x} cy={y} r={38} fill="none" stroke="rgba(200,146,42,0.06)" strokeWidth={1} style={{ animation:'pr2 2.8s ease-in-out infinite 1.1s' }} />
        <circle cx={x} cy={y} r={24} fill="none" stroke="rgba(200,146,42,0.2)" strokeWidth={1.5} style={{ animation:'pr1 2.8s ease-in-out infinite' }} />
      </>}
      <circle cx={x} cy={y} r={isActive ? 12 : 7.5} fill={fill} stroke={stroke} strokeWidth={1.5} style={isActive ? { animation:'coreP 2.8s ease-in-out infinite' } : {}} />
      {label && <text x={x} y={y + (isActive ? 34 : 20)} textAnchor="middle" style={{ fontFamily:'var(--fb)', fontSize:isActive ? 13 : 10, fill: isActive ? '#D4C4A0' : '#604E38' }}>{label}</text>}
      {sublabel && <text x={x} y={y + (isActive ? 47 : 30)} textAnchor="middle" style={{ fontFamily:'var(--fm)', fontSize:8.5, letterSpacing:'0.08em', fill:'#9C6D32' }}>{sublabel}</text>}
      <circle cx={x} cy={y} r={isActive ? 44 : 14} fill="transparent" style={{ cursor: isActive ? 'pointer' : 'default' }}
        onMouseEnter={onEnter} onMouseLeave={onLeave} onClick={onClick} />
    </g>
  )
}
