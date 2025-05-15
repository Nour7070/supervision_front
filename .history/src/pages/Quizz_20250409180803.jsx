import React, { useState, useEffect } from "react";

const Quizz = ({ coursId, onClose }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showScore, setShowScore] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simuler la récupération des questions après 1,5 seconde
    setTimeout(() => {
      const simulatedData = [
        {
          question: "Quel est le plus grand pays du monde ?",
          options: ["États-Unis", "Canada", "Russie", "Chine"],
          answer: "Russie"
        },
        {
          question: "Quelle est la capitale de la France ?",
          options: ["Lyon", "Marseille", "Paris", "Nice"],
          answer: "Paris"
        },
        {
          question: "Combien de continents y a-t-il sur Terre ?",
          options: ["5", "6", "7", "8"],
          answer: "7"
        }
      ];

      setQuestions(simulatedData);
      setLoading(false);
    }, 1500);
  }, [coursId]);

  const handleAnswerClick = (option) => {
    if (option === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Chargement du quizz...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button
          className="absolute top-2 right-2 text-gray-500"
          onClick={onClose}
        >
          X
        </button>
        {showScore ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold">Votre score : {score} / {questions.length}</h2>
            <button
              className="mt-4 py-2 px-4 bg-teal-500 text-white rounded-md hover:bg-teal-600"
              onClick={onClose}
            >
              Fermer
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              Question {currentQuestion + 1} / {questions.length}
            </h2>
            <p className="mb-4">{questions[currentQuestion].question}</p>
            <div className="space-y-2">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  className={`w-full py-2 px-4 rounded-md border ${selectedAnswer === option ? "bg-teal-500 text-white" : "bg-white border-gray-300"} hover:bg-teal-200`}
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
