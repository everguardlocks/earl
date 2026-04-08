import { useState } from 'react'
import Landing from './screens/Landing'
import Shell from './components/Shell'
import { storage } from './lib/storage'

export default function App() {
  const [phase, setPhase] = useState(storage.isOnboarded() ? 'shell' : 'landing')
  return phase === 'shell'
    ? <Shell onReset={() => { storage.reset(); setPhase('landing') }} returning={true} />
    : <Landing onComplete={() => setPhase('shell')} />
}
