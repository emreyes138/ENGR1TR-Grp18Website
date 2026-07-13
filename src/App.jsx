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

  function displayFact(e){}

  const planets = {
    Mercury: {
      image: mercury,
      facts: ['Mercury is the planet closest to the Sun and the smallest planet in the solar system.',
        'Mercury fact 2', 'Mercury fact 3']
    },
    Venus: {
      image: venus,
      facts: ['Venus fact 1', 'venus fact 2', 'venus fact 3']
    },
    Earth: {
      image: earth,
      facts: ['earth fact 1', 'earth fact 2', 'earth fact 3']
    },
    Mars: {
      image: mars,
      facts: ['mars fact 1', 'mars fact 2', 'mars fact 3']
    },
    Jupiter: {
      image: jupiter,
      facts: ['jupiter fact 1', 'jupiter fact 2', 'jupiter fact 3']
    },
    Saturn: {
      image: saturn,
      facts: ['saturn fact 1', 'saturn fact 2', 'saturn fact 3']
    },
    Uranus: {
      image: uranus,
      facts: ['uranus fact 1', 'uranus fact 2', 'uranus fact 3']
    },
    Neptune: {
      image: neptune,
      facts: ['neptune fact 1', 'neptune fact 2', 'neptune fact 3']
    },
  };

  const images = [];
  for(const planet in planets){
    images.push(
      <button key={planet} onClick={displayFact} className='planet'>
        <img src={planets[planet].image} alt = {planet}/>
      </button>
      );
  }


  return (
    <>
      <section id="center">
          <h1>Click on a planet for a fun fact!</h1>
      </section>
      <div className='planetPics'>{images}</div>
    </>
  )
}

export default App
