import React, { useEffect, useState } from 'react'
import GetScores from './GetScores'
import config from '../config'

const GetMatch = ({ matchId }) => {
  const [match, setMatch] = useState(null)

  useEffect(() => {
    const fetchMatchData = async () => {
      try {
        const response = await fetch(`${config.apiBaseUrl}/api/v1/matches/${matchId}`)
        const data = await response.json()
        setMatch(data)
      } catch (error) {
        console.error('Error fetching match data:', error)
      }
    }

    fetchMatchData()
  }, [matchId])

  const handleInputChange = (playerId, newScore) => {
    setMatch(prevMatch => ({
      ...prevMatch,
      players: prevMatch.players.map(player =>
        player.id === playerId ? { ...player, score: newScore } : player
      )
    }))
  }

  const handleSubmit = async () => {
    try {
      setMatch(prevMatch => ({ ...prevMatch, locked: true }))
      const response = await fetch(`${config.apiBaseUrl}/api/v1/matches/${matchId}/score_update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          match: {
            id: match.id,
            locked: true,
            players: match.players.map(player => ({
              id: player.id,
              score: player.score
            }))
          }
        })
      })
      if (!response.ok) {
        throw new Error('Error updating match scores')
      }
      const updatedMatch = await response.json()
      setMatch(updatedMatch)
    } catch (error) {
      console.error('Error updating match scores:', error)
    }
  }

  if (!match) {
    return <div>Cargando datos del partido...</div>
  }

  return (
    <GetScores
      match={match}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  )
}

export default GetMatch