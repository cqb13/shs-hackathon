export type MultipleChoiceQuestion = {
  question: string;
  type: QuestionType.MultipleChoice;
  choices: string[];
  correctChoiceIndex: number;
};

export type ShortAnswerQuestion = {
  question: string;
  type: QuestionType.ShortAnswer;
  answer: string;
};

export type TrueFalseQuestion = {
  question: string;
  type: QuestionType.TrueFalse;
  answer: boolean;
};

export type FillInTheBlankQuestion = {
  question: string[];
  type: QuestionType.FillInTheBlank;
  answers: string[];
  ending: string;
};

export type Question =
  | MultipleChoiceQuestion
  | ShortAnswerQuestion
  | TrueFalseQuestion
  | FillInTheBlankQuestion;

export enum QuestionType {
  MultipleChoice,
  ShortAnswer,
  TrueFalse,
  FillInTheBlank,
}

const questions: Question[] = [
  {
    question: "Variables are like boxes, because they store data.",
    type: QuestionType.TrueFalse,
    answer: true,
  },
  {
    question: "Why might a person use a function?",
    type: QuestionType.MultipleChoice,
    choices: [
      "To understand their code better",
      "To make their code more efficient",
      "To not code the same thing over and over again",
      "All of the above",
    ],
    correctChoiceIndex: 3,
  },
  {
    question: "What is the difference between variables and functions?",
    type: QuestionType.MultipleChoice,
    choices: [
      "Variables can only contain numbers while functions can contain letters",
      "Variables can store letters and numbers while functions only store BOOLEANS (true/false)",
      "Variables can store any of the following data type in scratch (number, string(words), boolean(true/false). Functions store blocks of code",
      "Variables can be used in scratch, while there are no functions in scratch",
    ],
    correctChoiceIndex: 2,
  },
  {
    question: "When is the best time to use a conditional?",
    type: QuestionType.MultipleChoice,
    choices: [
      "When your sprite needs to repeat a movement",
      "When you are checking whether Player 1 or 2 won in a game",
      "When your sprite needs to rotate 15º",
      "When you need to make a variable",
    ],
    correctChoiceIndex: 1,
  },
  {
    question: "Which code structure should I use when I need to repeat code?",
    type: QuestionType.MultipleChoice,
    choices: ["Boolean", "Loop", "Round", "Conditional"],
    correctChoiceIndex: 1,
  },
  {
    type: QuestionType.FillInTheBlank,
    question: ["A", "", "is", "used", "to", "repeat", "code"],
    answers: ["loop"],
    ending: ".",
  },
  {
    type: QuestionType.ShortAnswer,
    question: "Give an example of when you would use a loop.",
    answer:
      "Example answer: If I want to print a specific word multiple times.",
  },
  {
    type: QuestionType.ShortAnswer,
    question: "Give an example of when you would use a function.",
    answer: "Example answer: If I wanted to use the same code multiple times.",
  },
];

export default questions;
