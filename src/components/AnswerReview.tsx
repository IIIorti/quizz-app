import { Question } from "../types";
import { CheckCircle, XCircle } from "lucide-react";

interface AnswerReviewProps {
  question: Question;
  selectedAnswers: number[];
}

export function AnswerReview({ question, selectedAnswers }: AnswerReviewProps) {
  const isCorrect = arraysEqual(
    selectedAnswers.sort(),
    question.correctAnswers.sort()
  );

  return (
    <div className="bg-white rounded-lg p-6 shadow-sm">
      <div className="flex items-start gap-3">
        {isCorrect ? (
          <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0 mt-1" />
        ) : (
          <XCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
        )}
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800 mb-3">
            {question.text}
          </h3>
          <div className="space-y-2">
            {question.options.map((option, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg ${
                  question.correctAnswers.includes(index)
                    ? "bg-green-50 border border-green-200"
                    : selectedAnswers.includes(index)
                    ? "bg-red-50 border border-red-200"
                    : "bg-gray-50 border border-gray-200"
                }`}
              >
                <span className="font-medium">
                  {String.fromCharCode(65 + index)}.
                </span>{" "}
                {option}
              </div>
            ))}
          </div>
          {question.explanation && (
            <div className="mt-3 text-sm text-gray-600">
              <span className="font-semibold">Explanation:</span>{" "}
              {question.explanation}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function arraysEqual(a: number[], b: number[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}
