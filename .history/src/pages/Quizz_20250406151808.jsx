import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Quizz.css";

const Quizz = ({ coursId, onClose }) =>
{
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() =>
  {
    const fetchQuizz = async () =>
    {
      try
      {
        const response = await axios.get(`http://localhost:8081/api/quizz/${coursId}`);
        setQuestions(response.data);
      } catch (err)
      {
        setError("Erreur lors du chargement du quizz.");
      } finally
      {
        setLoading(false);
      }
    };

    fetchQuizz();
  }, [coursId]);

  const handleAnswerClick = (option) =>
  {
    if (option === questions[currentQuestion].answer)
    {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1)
    {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else
    {
      setShowScore(true);
    }
  };

  if (loading) return <p>Chargement du quizz...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="quizz-container">
      <div className="quizz-box">
        <button className="close-btn" onClick={onClose}>Fermer</button>
        {showScore ? (
          <div>
            <h2>Votre score : {score} / {questions.length}</h2>
            <button onClick={onClose}>Fermer</button>
          </div>
        ) : (
          <div>
            <h2>Question {currentQuestion + 1} / {questions.length}</h2>
            <p>{questions[currentQuestion].question}</p>
            <div className="options">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`option-btn ${selectedAnswer === option ? "selected" : ""}`}
                  onClick={() => handleAnswerClick(option)}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizz;