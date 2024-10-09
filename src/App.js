import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMatches } from './redux/actions'
import GetMatch from './components/GetMatch'

const App = () => {
  const dispatch = useDispatch()
  const matches = useSelector((state) => state.matches.matches)

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/matches', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        console.log(response)
        const data = await response.json()
        console.log(data)
        dispatch(getMatches(data))
      } catch (error) {
        console.error('Error fetching matches:', error)
      }
    }

    fetchMatches()
  }, [dispatch])

  return (
    <div className="max-w-4xl mx-auto p-4">
      <GetMatch matches={matches} />
    </div>
  );
};

export default App
