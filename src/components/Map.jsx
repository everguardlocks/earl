import { useState } from 'react'
import Node from './Node'

const NODES = [
  { id:'intro', x:300, y:215, state:'active', label:'Introduction to Linux', sublabel:'Chapter 1 of 36' },
  { id:'term',  x:155, y:142, state:'dim',    label:'Terminal Basics' },
  { id:'fs',    x:445, y:148, state:'dim',    label:'Filesystem' },
  { id:'shell', x:172, y:308, state:'dim',    label:'Shell Scripting' },
  { id:'proc',  x:446, y:305, state:'dim',    label:'Processes' },
  { id:'vim',   x:298, y:100, state:'dim',    label:'Text Editors' },
]
const FAR = [{x:578,y:210},{x:574,y:342},{x:82,y:258},{x:84,y:145},{x:82,y:370},{x:578,y:80}]
const EDGES = [['intro','term'],['intro','fs'],['intro','shell'],['intro','proc'],['intro','vim'],
  ['fs',null,578,210],['proc',null,574,342],['term',null,82,258],['term',null,84,145],['shell',null,82,370],['fs',null,578,80]]

function getNode(id) { return NODES.find(n => n.id === id) }

function curve(ax,ay,bx,by) {
  const mx=(ax+bx)/2, my=(ay+by)/2, dx=bx-ax, dy=by-ay, len=Math.sqrt(dx*dx+dy*dy)||1
  return `M${ax},${ay} Q${mx+(-dy/len)*16},${my+(dx/len)*16} ${bx},${by}`
}

export default function Map({ showLabels, shellLabels, onNodeClick }) {
  const [hovered, setHovered] = useState(false)

  return (
    <svg viewBox="0 0 680 440" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style={{ display:'block' }}>
      <style>{`
        @keyframes breathe{0%,100%{transform:scale(0.992)}50%{transform:scale(1.008)}}
        @keyframes pr1{0%,100%{opacity:0.28}50%{opacity:0.52}}
        @keyframes pr2{0%,100%{opacity:0.11}50%{opacity:0.24}}
        @keyframes coreP{0%,100%{opacity:0.85}50%{opacity:1}}
        @keyframes ep1{0%,100%{opacity:0.18}50%{opacity:0.38}}
        @keyframes ep2{0%,100%{opacity:0.12}50%{opacity:0.32}}
        @keyframes ep3{0%,100%{opacity:0.15}50%{opacity:0.35}}
        @keyframes blink{0%,100%{opacity:1}50%{opacity:0}}
      `}</style>
      <g style={{ animation:'breathe 8s ease-in-out infinite', transformOrigin:'center' }}>
        {NODES.filter(n=>n.id!=='intro').map((n,i) => {
          const intro = getNode('intro')
          return <path key={n.id} d={curve(intro.x,intro.y,n.x,n.y)} fill="none" stroke="rgba(200,146,42,0.22)" strokeWidth={1} style={{ animation:`ep${(i%3)+1} ${6+i}s ease-in-out infinite` }} />
        })}
        {FAR.map((f,i) => <circle key={i} cx={f.x} cy={f.y} r={3} fill="rgba(20,15,10,0.9)" stroke="rgba(200,146,42,0.08)" strokeWidth={1} />)}
        {NODES.filter(n=>n.id!=='intro').map(n => (
          <Node key={n.id} {...n} />
        ))}
        <Node
          {...getNode('intro')}
          onEnter={() => setHovered(true)}
          onLeave={() => setHovered(false)}
          onClick={onNodeClick}
        />
        {hovered && <text x={300} y={167} textAnchor="middle" style={{ fontFamily:'var(--fd)', fontSize:13, fontStyle:'italic', fill:'#F5EDD8' }}>Start here.</text>}
        {shellLabels && <>
          <text x={300} y={266} textAnchor="middle" style={{ fontFamily:'var(--fd)', fontSize:15, fontStyle:'italic', fill:'#A8906A' }}>Your map.</text>
          <text x={300} y={282} textAnchor="middle" style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.18em', fill:'#9C6D32' }}>START HERE</text>
        </>}
      </g>
    </svg>
  )
}
