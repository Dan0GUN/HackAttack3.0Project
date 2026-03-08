import { createContext, useContext, useState } from "react";

const QuestionnaireContext = createContext();

export function QuestionnaireProvider({ children }) {
  const [answers, setAnswers] = useState(null);
  const [recommendedGrants, setRecommendedGrants] = useState([]);

  return (
    <QuestionnaireContext.Provider value={{ answers, setAnswers, recommendedGrants, setRecommendedGrants }}>
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  return useContext(QuestionnaireContext);
}
