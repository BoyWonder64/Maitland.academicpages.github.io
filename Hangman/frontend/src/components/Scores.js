import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Scores = () => {
  const [scores, setScores] = useState([]);
  const wordLength = sessionStorage.getItem('wordLength');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch(
          `http://localhost:4000/scores?length=${wordLength}`,
          {
            method: 'GET',
            credentials: 'include'
          }
        )
        const data = await response.json();
        console.log("Fetched scores: ", data);
        setScores(data);
      } catch (err) {
        console.error('Error fetching scores:', err);
      }
    }

    fetchScores();
  }, [wordLength]);

  return (
    <div>
      <h1>High Scores</h1>
      <table>
        <thead>
          <tr>
            <th style={{backgroundColor: "lightyellow"}}>Name</th>
            <th style={{backgroundColor: "lightyellow"}}>Guesses&nbsp;</th>
            <th style={{backgroundColor: "lightyellow"}}>Word Length</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, index) => (
            <tr key={index}>
              <td>&nbsp;{score.username}</td>
              <td>&nbsp;{score.guesses}</td>
              <td>&nbsp;{score.wordLength}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate('/hangman')}>Play Again</button>
    </div>
  )
}

export default Scores
