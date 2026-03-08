import { createContext, useContext, useState } from "react";

const QuestionnaireContext = createContext();

export function QuestionnaireProvider({ children }) {
  const [answers, setAnswers] = useState(() => {
    const savedAnswers = localStorage.getItem("questionnaireAnswers");
    return savedAnswers ? JSON.parse(savedAnswers) : {};
  });

  const [recommendedGrants, setRecommendedGrants] = useState(() => {
    const savedGrants = localStorage.getItem("recommendedGrants");
    return savedGrants ? JSON.parse(savedGrants) : [];
  });

  return (
    <QuestionnaireContext.Provider
      value={{
        answers,
        setAnswers,
        recommendedGrants,
        setRecommendedGrants,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  return useContext(QuestionnaireContext);
}