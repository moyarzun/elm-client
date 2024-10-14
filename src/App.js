import React, { useEffect, useState } from 'react'
import GetRound from './components/GetRound'
import config from './config'

const App = () => {
  const [round, setRound] = useState(null)

  useEffect(() => {
    const fetchRound = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/v1/rounds/1`)
        const data = await response.json()
        setRound(data)
      } catch (error) {
        console.error('Error fetching round:', error)
      }
    }

    fetchRound()
  }, [])

  return (
    <div>
      {round ? <GetRound roundId={round.id} /> : <p>Loading...</p>}
    </div>
  )
}

export default App