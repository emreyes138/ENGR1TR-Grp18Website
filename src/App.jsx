import { useState } from 'react'

import mercury from './assets/mercury.png'
import venus from './assets/venus.png'
import earth from './assets/earth.png'
import mars from './assets/mars.png'
import jupiter from './assets/jupiter.png'
import saturn from './assets/saturn.png'
import uranus from './assets/uranus.png'
import neptune from './assets/neptune.png'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <section id="center">

          <h1>Click on a planet for a fun fact!</h1>

        <button
          type="button"
          className="counter"
          onClick={() => setCount((count) => count + 1)}
        >
          Count is {count}
        </button>
      </section>
    </>
  )
}

export default App
