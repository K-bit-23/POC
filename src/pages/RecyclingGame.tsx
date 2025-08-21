// src/pages/EcoWasteGame.tsx
import React, { useState } from "react";

const quizQuestions = [
  {
    q: "Which of these is biodegradable?",
    options: ["Plastic Bottle", "Banana Peel", "Glass"],
    answer: "Banana Peel",
  },
  {
    q: "Which gas is responsible for food spoilage?",
    options: ["Oxygen", "Carbon Dioxide", "Ethylene"],
    answer: "Ethylene",
  },
  {
    q: "Best way to reduce waste?",
    options: ["Recycle", "Burn", "Dump"],
    answer: "Recycle",
  },
];

const EcoWasteGame: React.FC = () => {
  const [step, setStep] = useState<"menu" | "quiz" | "spoilage">("menu");
  const [score, setScore] = useState(0);
  const [current, setCurrent] = useState(0);

  const [foodFreshness, setFoodFreshness] = useState(100);

  const handleQuizAnswer = (option: string) => {
    if (option === quizQuestions[current].answer) {
      setScore(score + 1);
    }
    if (current < quizQuestions.length - 1) {
      setCurrent(current + 1);
    } else {
      alert(`Quiz Finished! 🎉 Your score: ${score + 1}/${quizQuestions.length}`);
      setStep("menu");
      setCurrent(0);
      setScore(0);
    }
  };

  const handleSpoilageChoice = (choice: string) => {
    if (choice === "Cool Storage") {
      setFoodFreshness(foodFreshness + 10);
    } else {
      setFoodFreshness(foodFreshness - 20);
    }
    if (foodFreshness <= 0) {
      alert("🥴 Food spoiled! Try again.");
      setStep("menu");
      setFoodFreshness(100);
    }
  };

  return (
    <div className="p-6 dark:bg-gray-900 dark:text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4">🌱 Eco & Spoilage Games</h1>

      {step === "menu" && (
        <div className="space-y-4">
          <button
            onClick={() => setStep("quiz")}
            className="px-4 py-2 bg-green-500 text-white rounded-lg"
          >
            Start Eco Quiz
          </button>
          <button
            onClick={() => setStep("spoilage")}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Play Spoilage Avoidance
          </button>
        </div>
      )}

      {step === "quiz" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            {quizQuestions[current].q}
          </h2>
          <div className="space-y-2">
            {quizQuestions[current].options.map((opt) => (
              <button
                key={opt}
                onClick={() => handleQuizAnswer(opt)}
                className="block px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-green-400 hover:text-white"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === "spoilage" && (
        <div>
          <h2 className="text-xl font-semibold mb-4">
            🍎 Keep Food Fresh! Freshness: {foodFreshness}%
          </h2>
          <div className="space-x-4">
            <button
              onClick={() => handleSpoilageChoice("Cool Storage")}
              className="px-4 py-2 bg-green-500 text-white rounded-lg"
            >
              Store in Cool Place
            </button>
            <button
              onClick={() => handleSpoilageChoice("Hot Place")}
              className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
              Leave in Hot Place
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EcoWasteGame;
