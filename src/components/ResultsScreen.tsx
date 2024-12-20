import { ArrowLeft } from "lucide-react";
import { ExamResults } from "../types";
import { AnswerReview } from "./AnswerReview";

interface ResultsProps {
  results: ExamResults;
  setShowReview: () => void;
}

function ResultsScreen({ results, setShowReview }: ResultsProps) {
  return (
    // <FadeInWrapper>
    <div className="w-full max-w-3xl mx-auto mt-4  shadow-lg rounded-md p-4 transition-all animate-fade-in">
      <button
        onClick={() => setShowReview()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 "
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Results
      </button>
      <div className="space-y-6">
        {results.answers.map((answers, index) => (
          <AnswerReview
            key={index}
            question={results.questions[index]}
            selectedAnswers={answers}
          />
        ))}
      </div>
    </div>
    // </FadeInWrapper>
  );
}

export default ResultsScreen;
