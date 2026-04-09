import { useState } from 'react'
import Node from './Node'
import { DOMAINS, UNLOCK_CHAIN } from '../data/curriculum'

const FAR = [{x:578,y:210},{x:574,y:342},{x:82,y:258},{x:84,y:145},{x:82,y:370},{x:578,y:80}]

function curve(ax,ay,bx,by) {
  const mx=(ax+bx)/2, my=(ay+by)/2, dx=bx-ax, dy=by-ay, len=Math.sqrt(dx*dx+dy*dy)||1
  return `M${ax},${ay} Q${mx+(-dy/len)*16},${my+(dx/len)*16} ${bx},${by}`
}

function getNodeState(node, unlocked) {
  if (node.state === 'active') return 'active'
  if (unlocked.includes(node.id)) return 'done'
  // Check if any completed chapter unlocks this node
  const isUnlocked = unlocked.some(uid => (UNLOCK_CHAIN[uid] || []).includes(node.id))
  if (isUnlocked) return 'active'
  return 'dim'
}

export default function Map({ showLabels, shell: shellLabels, onNodeClick }) {
  const [hovered, setHovered] = useState(false)
  const domain = DOMAINS[0]
  const nodes = domain.nodes
  const edges = domain.edges
  const unlocked = JSON.parse(localStorage.getItem('earl_unlocked') || '[]')
  const activeNode = nodes[0]

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
        {/* Edges */}
        {edges.map(([fromId, toId], i) => {
          const from = nodes.find(n => n.id === fromId)
          const to = nodes.find(n => n.id === toId)
          if (!from || !to) return null
          return <path key={i} d={curve(from.x, from.y, to.x, to.y)} fill="none" stroke="rgba(200,146,42,0.22)" strokeWidth={1} style={{ animation:`ep${(i%3)+1} ${6+i}s ease-in-out infinite` }} />
        })}
        {/* Far nodes */}
        {FAR.map((f,i) => <circle key={i} cx={f.x} cy={f.y} r={3} fill="rgba(20,15,10,0.9)" stroke="rgba(200,146,42,0.08)" strokeWidth={1} />)}
        {/* All nodes except first */}
        {nodes.slice(1).map(node => {
          const state = getNodeState(node, unlocked)
          return (
            <Node
              key={node.id}
              {...node}
              state={state}
              onClick={state !== 'dim' ? () => onNodeClick(node.id) : undefined}
            />
          )
        })}
        {/* Active first node */}
        <Node
          {...activeNode}
          state="active"
          onEnter={() => setHovered(true)}
          onLeave={() => setHovered(false)}
          onClick={() => onNodeClick(activeNode.id)}
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
