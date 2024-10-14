import { useState, useEffect } from 'react'
import config from '../config'

const useRound = (roundId) => {
  const [roundData, setRoundData] = useState([])

  useEffect(() => {
    // Fetch match data from the API
    const fetchData = async () => {
      const response = await fetch(`${config.apiBaseUrl}/api/v1/rounds/${roundId}`)
      const data = await response.json()
      setRoundData(data)
    }

    fetchData()
  }, [roundId])

  return { roundData }
}

export default useRound