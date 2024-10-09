import React, { useState, useEffect } from 'react'

const GetMatch = ({ matches }) => {
  const [matchData, setMatchData] = useState([])

  useEffect(() => {
    if (matches && matches.length > 0) {
      setMatchData(matches)
    }
  }, [matches])

  const handleInputChange = (matchId, playerId, value) => {
    setMatchData(prevData =>
      prevData.map(match =>
        match.id === matchId
          ? {
              ...match,
              players: match.players.map(player =>
                player.id === playerId ? { ...player, score: value } : player
              )
            }
          : match
      )
    )
  }

  const handleSubmit = async (matchId, isLocked) => {
    const match = matchData.find(m => m.id === matchId)
    const payload = {
      match: {
        id: match.id,
        max_players: match.max_players,
        locked: !isLocked, // Cambiar el estado de bloqueo
        players: match.players.map(player => ({
          id: player.id,
          name: player.name,
          score: player.score
        }))
      }
    }
  
    await fetch(`http://localhost:3000/api/v1/matches/${matchId}/score_update`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
  
    // Actualizar el estado del partido en el cliente
    setMatchData(prevData =>
      prevData.map(m =>
        m.id === matchId ? { ...m, locked: !isLocked } : m
      )
    )
  }

  if (!matchData || matchData.length === 0) {
    return <div>No matches available</div>
  }

  return (
    <div className="container mx-auto p-4">
      {matchData.map((match) => (
  <div key={match.id} className="mb-8">
    <form onSubmit={(e) => { e.preventDefault(); handleSubmit(match.id, match.locked); }}>
      <table className="min-w-full bg-white border border-gray-200">
        <caption className={`py-2 px-4 text-left text-lg font-semibold text-gray-700 ${match.locked ? 'bg-red-500' : 'bg-green-500'}`}>
          Match #{match.id} {match.locked ? '(Locked)' : '(Unlocked)'}
        </caption>
        <thead>
          <tr>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-700">Player</th>
            <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-lg font-semibold text-gray-700">Score</th>
          </tr>
        </thead>
        <tbody>
          {match.players.map((player) => (
            <tr key={player.id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200">{player.name}</td>
              <td className="py-2 px-4 border-b border-gray-200">
                {match.locked ? (
                  player.score !== null ? player.score : '-'
                ) : (
                  <input
                    type="number"
                    value={player.score !== null ? player.score : ''}
                    onChange={(e) => handleInputChange(match.id, player.id, e.target.value)}
                    className="w-full px-2 py-1 border rounded"
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2" className="py-2 px-4 text-right">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
                {match.locked ? 'Unlock' : 'Submit and Lock'}
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </form>
  </div>
))}
    </div>
  )
}

export default GetMatch