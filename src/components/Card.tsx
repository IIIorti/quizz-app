import { Question } from "../types";

interface CardProps {
  question: Question;
  selectedAnswers: number[];
  onAnswerSelect: (index: number) => void;
  showExplanation?: boolean;
}

export function Card({
  question,
  selectedAnswers,
  onAnswerSelect,
  showExplanation,
}: CardProps) {
  return (
    <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {question.text}
      </h2>

      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelect(index)}
            className={`w-full text-left p-4 rounded-lg transition-colors ${
              selectedAnswers.includes(index)
                ? "bg-blue-100 border-2 border-blue-500"
                : "bg-gray-50 hover:bg-gray-100 border-2 border-transparent"
            }`}
          >
            <span className="font-medium">
              {String.fromCharCode(65 + index)}.
            </span>{" "}
            {option}
          </button>
        ))}
      </div>

      {showExplanation && question.explanation && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-700">
            <span className="font-semibold">Explanation:</span>{" "}
            {question.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
