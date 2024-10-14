import React, { useState, useEffect } from 'react'

const GetScores = ({ match, handleSubmit, handleInputChange }) => {
  const [isLocked, setIsLocked] = useState(match.locked)

  useEffect(() => {
    setIsLocked(match.locked)
  }, [match.locked])

  const toggleLockAndSubmit = (e) => {
    e.preventDefault()
    if (isLocked) {
      setIsLocked(false)
    } else {
      handleSubmit(match.id)
      setIsLocked(true)
    }
  }

  return (
    <div className="mb-8">
      <form onSubmit={toggleLockAndSubmit}>
        <table className="min-w-full bg-white border border-gray-200">
          <caption className={`py-2 px-4 text-left text-lg font-semibold text-gray-700 ${isLocked ? 'bg-red-500' : 'bg-green-500'}`}>
            Match #{match.id} {isLocked ? '(Locked)' : '(Unlocked)'}
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
                  {isLocked ? (
                    player.score !== null ? player.score : '-'
                  ) : (
                    <input
                      type="number"
                      value={player.score !== null ? player.score : ''}
                      onChange={(e) => handleInputChange(player.id, e.target.value)}
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
                  {isLocked ? 'Unlock' : 'Lock and Submit'}
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </form>
    </div>
  )
}

export default GetScores