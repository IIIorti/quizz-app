export interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswers: number[];
  explanation?: string;
}

export interface ExamConfig {
  title: string;
  description: string;
  questionsPerSession: number;
  questions: Question[];
}

export interface ExamState {
  currentQuestionIndex: number;
  selectedAnswers: number[];
  answers: number[][];
  isComplete: boolean;
}

export interface ExamResults {
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  score: number;
  answers: number[][];
  questions: Question[]; // Added to store the questions for review
}