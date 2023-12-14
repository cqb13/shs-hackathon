"use client";

import questions, { QuestionType, Question } from "@/lib/testQuestions";
import QuestionDisplay from "@/components/resources/questions";
import Button from "@/components/general/Button";
import { useState, useEffect } from "react";
import shuffle from "@/utils/shuffle";

export default function Resources() {
  const [usedQuestions, setUsedQuestions] = useState<Question[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [questionResults, setQuestionResults] = useState<boolean[]>([]);
  const [absoluteResults, setAbsoluteResults] = useState<number>(0);
  const [uncertainResultsIndex, setUncertainResultsIndex] = useState<number[]>(
    []
  );
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    let tempUncertainResultsIndex: number[] = [];
    for (let i = 0; i < questions.length; i++) {
      if (
        questions[i].type === QuestionType.MultipleChoice ||
        questions[i].type === QuestionType.TrueFalse ||
        questions[i].type === QuestionType.FillInTheBlank
      ) {
        setAbsoluteResults(absoluteResults + 1);
      } else {
        tempUncertainResultsIndex.push(i);
      }
    }
    setUncertainResultsIndex(tempUncertainResultsIndex);
    setUsedQuestions(shuffle(questions));
  }, []);

  const updateQuestionResults = (index: number, result: boolean) => {
    const newQuestionResults = questionResults;
    newQuestionResults[index] = result;
    updateScore(newQuestionResults);
    setQuestionResults(newQuestionResults);
  };

  const updateScore = (results: boolean[]) => {
    let tempScore = 0;
    results.forEach((result) => {
      if (result === true) {
        tempScore++;
      }
    });
    setScore(tempScore);
  };

  const reset = () => {
    setSubmitted(false);
    setQuestionResults([]);
    setScore(0);
    setAttempts(attempts + 1);
    setUsedQuestions(shuffle(questions));
    //!!!: maybe make an id, and scroll to that id, if it does not work on smaller screens
    window.scrollTo(0, 500);
  };

  return (
    <main className='flex flex-col gap-10 px-60 py-20 max-lg:px-14 max-sm:px-5'>
      {usedQuestions.map((question, index) => (
        <QuestionDisplay
          question={question}
          submitted={submitted}
          updateQuestionResults={updateQuestionResults}
          attempts={attempts}
          index={index}
          key={index}
        />
      ))}
      <section className='w-full flex flex-col gap-2'>
        {!submitted ? (
          <Button
            onClick={() => setSubmitted(true)}
            text='Submit'
            customClass='w-full'
          />
        ) : (
          <Button onClick={reset} text='Reset' customClass='w-full' />
        )}
        {submitted ? (
          <section className='bg-onyx flex items-center justify-between rounded-md text-white font-belgrano px-6 py-3'>
            <div className='flex items-center gap-2'>
              <h2>{`${score}/${
                questions.length - uncertainResultsIndex.length
              }`}</h2>
              <h2>or</h2>
              <h2>{`${Number(
                (score / (questions.length - uncertainResultsIndex.length)) *
                  100
              ).toFixed(2)}%`}</h2>
            </div>
            <h2>{`${uncertainResultsIndex.length} incalculable questions`}</h2>
          </section>
        ) : null}
      </section>
    </main>
  );
}
