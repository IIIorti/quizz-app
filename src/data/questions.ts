import { ExamConfig } from "../types";

export const exam: ExamConfig = {
  title: "JavaScript Developer Interview Prep",
  description:
    "Test your JavaScript knowledge with questions covering core concepts, ES6+ features, and common coding patterns.",
  questionsPerSession: 2,
  questions: [
    {
      id: 1,
      text: "What is the output of: console.log(typeof typeof 1)?",
      options: ["number", "string", "undefined", "NaN"],
      correctAnswers: [1],
      explanation:
        "typeof 1 returns 'number', then typeof 'number' returns 'string'",
    },
    {
      id: 2,
      text: "Which of these are truthy values in JavaScript?",
      options: ["[]", "''", "0", "null"],
      correctAnswers: [0],
      explanation:
        "Empty arrays are truthy, while empty strings, 0, and null are falsy",
    },
    {
      id: 3,
      text: "What is the correct way to check if an object has a property?",
      options: [
        "object.hasProperty('prop')",
        "object.hasOwnProperty('prop')",
        "'prop' in object",
        "object.contains('prop')",
      ],
      correctAnswers: [1, 2],
      explanation:
        "Both hasOwnProperty() and the 'in' operator can check for property existence",
    },
  ],
};
