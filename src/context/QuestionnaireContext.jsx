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

  const [ideaDescription, setIdeaDescription] = useState(() => {
    return localStorage.getItem("ideaDescription") || "";
  });

  const [complianceResults, setComplianceResults] = useState(() => {
    const savedCompliance = localStorage.getItem("complianceResults");
    return savedCompliance ? JSON.parse(savedCompliance) : null;
  });

  return (
    <QuestionnaireContext.Provider
      value={{
        answers,
        setAnswers,
        recommendedGrants,
        setRecommendedGrants,
        ideaDescription,
        setIdeaDescription,
        complianceResults,
        setComplianceResults,
      }}
    >
      {children}
    </QuestionnaireContext.Provider>
  );
}

export function useQuestionnaire() {
  return useContext(QuestionnaireContext);
}