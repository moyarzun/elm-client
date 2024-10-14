import React, { useEffect, useState } from 'react'
import GetMatch from './GetMatch'
import config from '../config'

const GetRound = ({ roundId }) => {
  const [matches, setMatches] = useState([])

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/v1/matches/by_round/${roundId}`)
        const data = await response.json()
        // Asegúrate de que data es un array
        if (Array.isArray(data)) {
          setMatches(data)
        } else {
          console.error('Expected an array of matches')
        }
      } catch (error) {
        console.error('Error fetching matches:', error)
      }
    }

    fetchMatches()
  }, [roundId])

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-80 rounded-lg border-2 border-black p-4 box-border text-center">
        <h2 className="text-xl font-bold mb-4">Round #{roundId}</h2>
        {Array.isArray(matches) ? (
          matches.map(match => (
            <div key={match.id} className="mb-4">
              <GetMatch matchId={match.id} />
            </div>
          ))
        ) : (
          <p>No matches found</p>
        )}
      </div>
    </div>
  )
}

export default GetRound