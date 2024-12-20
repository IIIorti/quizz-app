import { useState } from "react";
import { ExamResults } from "../types";
import { Trophy } from "lucide-react";
import ResultsScreen from "./ResultsScreen";
import FadeInWrapper from "./FadeInWrapper";

interface ResultsProps {
  results: ExamResults;
  onRetry: () => void;
}

export function Results({ results, onRetry }: ResultsProps) {
  const [showReview, setShowReview] = useState(false);

  if (showReview) {
    return (
      <FadeInWrapper key={crypto.randomUUID()}>
        <ResultsScreen
          results={results}
          setShowReview={() => setShowReview(false)}
        />
      </FadeInWrapper>
    );
  }

  return (
    <FadeInWrapper>
      <div className="w-full max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-blue-50 rounded-full mb-4">
            <Trophy className="w-12 h-12 text-blue-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2 transition animate-fade-in">
            Exam Complete!
          </h2>
          <p className="text-gray-600">Here's how you performed</p>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Score</p>
            <p className="text-2xl font-bold text-gray-800">{results.score}%</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-sm text-gray-600">Correct Answers</p>
            <p className="text-2xl font-bold text-gray-800">
              {results.correctAnswers}/{results.totalQuestions}
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => setShowReview(true)}
            className="w-full py-3 px-4 bg-white text-blue-500 font-semibold rounded-lg border-2 border-blue-500 hover:bg-blue-50 transition-colors"
          >
            Review Answers
          </button>
          <button
            onClick={onRetry}
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    </FadeInWrapper>
  );
}
