import React from 'react'
import Game from './Game'

import 'papercss/src/styles.scss'
import './Utils.scss'

export default function App() {
  return (
    <div className="row vh-100">
      <div className="card h-100">
        <div className="card-body">
          <Game />
        </div>
      </div>
    </div>
  )
}

