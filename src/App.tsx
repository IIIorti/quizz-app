import { useState } from "react";
import { Card } from "./components/Card";
import { ProgressBar } from "./components/ProgressBar";
import { Results } from "./components/Results";
import { exam } from "./data/questions";
import { ExamState, ExamResults, Question } from "./types";
import { GraduationCap } from "lucide-react";
import { getRandomQuestions } from "./utils/examUtils";
import FadeInWrapper from "./components/FadeInWrapper";

function App() {
  const [currentQuestions, setCurrentQuestions] = useState<Question[]>(() =>
    getRandomQuestions(exam.questions, exam.questionsPerSession)
  );

  const [examState, setExamState] = useState<ExamState>({
    currentQuestionIndex: 0,
    selectedAnswers: [],
    answers: [],
    isComplete: false,
  });

  const currentQuestion =
    examState.currentQuestionIndex < exam.questionsPerSession
      ? currentQuestions[examState.currentQuestionIndex]
      : null;

  const handleAnswerSelect = (index: number) => {
    setExamState((prev) => {
      const newSelectedAnswers = prev.selectedAnswers.includes(index)
        ? prev.selectedAnswers.filter((i) => i !== index)
        : [...prev.selectedAnswers, index];
      return { ...prev, selectedAnswers: newSelectedAnswers };
    });
  };

  const calculateResults = (answers: number[][]): ExamResults => {
    let correct = 0;
    answers.forEach((selected, index) => {
      const question = currentQuestions[index];
      if (arraysEqual(selected.sort(), question.correctAnswers.sort())) {
        correct++;
      }
    });

    return {
      totalQuestions: exam.questionsPerSession,
      correctAnswers: correct,
      incorrectAnswers: exam.questionsPerSession - correct,
      score: Math.round((correct / exam.questionsPerSession) * 100),
      answers,
      questions: currentQuestions, // Pass the questions to show in review
    };
  };

  const handleNext = () => {
    setExamState((prev) => {
      const newAnswers = [...prev.answers, prev.selectedAnswers];
      const nextIndex = prev.currentQuestionIndex + 1;
      const isComplete = nextIndex >= exam.questionsPerSession;

      return {
        currentQuestionIndex: nextIndex,
        selectedAnswers: [],
        answers: newAnswers,
        isComplete,
      };
    });
  };

  const handleRetry = () => {
    // Get new random questions when retrying
    setCurrentQuestions(
      getRandomQuestions(exam.questions, exam.questionsPerSession)
    );
    setExamState({
      currentQuestionIndex: 0,
      selectedAnswers: [],
      answers: [],
      isComplete: false,
    });
  };

  if (examState.isComplete) {
    return (
      <Results
        results={calculateResults(examState.answers)}
        onRetry={handleRetry}
      />
    );
  }

  if (!currentQuestion) {
    return null;
  }

  return (
    <FadeInWrapper>
      <div className="min-h-screen bg-gray-100 py-8 px-4">
        <div className="max-w-2xl mx-auto mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <GraduationCap className="w-8 h-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">{exam.title}</h1>
          </div>
          <p className="text-center text-gray-600">{exam.description}</p>
        </div>

        <ProgressBar
          current={examState.currentQuestionIndex + 1}
          total={exam.questionsPerSession}
        />

        <Card
          question={currentQuestion}
          selectedAnswers={examState.selectedAnswers}
          onAnswerSelect={handleAnswerSelect}
        />

        <div className="max-w-2xl mx-auto mt-8">
          <button
            onClick={handleNext}
            disabled={examState.selectedAnswers.length === 0}
            className="w-full py-3 px-4 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {examState.currentQuestionIndex + 1 === exam.questionsPerSession
              ? "Finish"
              : "Next Question"}
          </button>
        </div>
      </div>
    </FadeInWrapper>
  );
}

function arraysEqual(a: number[], b: number[]) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export default App;
