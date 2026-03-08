import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { findFunding, saveQuestionnaireAnswers } from "../../api/api";
import { useQuestionnaire } from "../../context/QuestionnaireContext";
import { useAuth } from "../../context/AuthContext";

function Questionnaire() {
  const navigate = useNavigate();
  const { user, markQuestionnaireCompleted } = useAuth();
  const { setAnswers: setContextAnswers, setRecommendedGrants } = useQuestionnaire();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const savedAnswers = localStorage.getItem("questionnaireAnswers");
    if (savedAnswers) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const questions = [
    {
      id: "location",
      question: "Which province or territory is your startup based in?",
      options: [
        "British Columbia",
        "Alberta",
        "Saskatchewan",
        "Manitoba",
        "Ontario",
        "Quebec",
        "New Brunswick",
        "Nova Scotia",
        "Prince Edward Island",
        "Newfoundland and Labrador",
        "Yukon",
        "Northwest Territories",
        "Nunavut",
      ],
    },
    {
      id: "industry",
      question: "What industry best describes your startup?",
      options: [
        "Artificial Intelligence",
        "FinTech",
        "HealthTech",
        "Climate / CleanTech",
        "SaaS / Software",
        "E-commerce",
        "Biotechnology",
        "Other",
      ],
    },
    {
      id: "stage",
      question: "What stage is your startup currently in?",
      options: [
        "Idea stage",
        "Prototype / MVP",
        "Early traction",
        "Growth stage",
        "Scaling",
      ],
    },
    {
      id: "team_size",
      question: "How many people are currently on your team?",
      options: ["Solo founder", "2–5 people", "6–10 people", "10+"],
    },
    {
      id: "funding_need",
      question: "How much funding are you looking to raise?",
      options: [
        "Under $10K",
        "$10K – $50K",
        "$50K – $250K",
        "$250K – $1M",
        "$1M+",
      ],
    },
    {
      id: "business_model",
      question: "What is your startup’s primary business model?",
      options: [
        "SaaS subscription",
        "Marketplace",
        "B2B services",
        "E-commerce",
        "Advertising",
        "Licensing / IP",
        "Other",
      ],
    },
    {
      id: "target_market",
      question: "Who is your primary target market?",
      options: [
        "Consumers (B2C)",
        "Small businesses",
        "Enterprises",
        "Government",
        "Nonprofits",
      ],
    },
  ];

  const handleAnswer = (value) => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentStep].id]: value,
    }));
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
      return;
    }

    setIsSubmitting(true);

    try {
      console.log("Submitting answers:", answers);

      // save questionnaire answers to backend if authenticated
      if (user?.uid) {
        try {
          await saveQuestionnaireAnswers(user.uid, answers);
          console.log("Answers saved to backend");
        } catch (saveError) {
          console.error("Failed to save answers to backend:", saveError);
        }
      }

      // get funding recommendations
      const result = await findFunding(answers);

      console.log("Full backend response:", result);
      console.log("Matches from backend:", result.matches);

      const matches = Array.isArray(result.matches) ? result.matches : [];

      // save to context
      setContextAnswers(answers);
      setRecommendedGrants(matches);

      // save to localStorage
      localStorage.setItem("questionnaireAnswers", JSON.stringify(answers));
      localStorage.setItem("recommendedGrants", JSON.stringify(matches));

      // mark complete
      markQuestionnaireCompleted();

      navigate("/dashboard");
    } catch (err) {
      console.error("Backend error:", err);
      alert("Failed to connect to the backend. Check that the server is running.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBack = () => {
    if (isSubmitting) return;

    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    } else {
      navigate("/dashboard");
    }
  };

  const progress = ((currentStep + 1) / questions.length) * 100;
  const currentQuestion = questions[currentStep];
  const currentAnswer = answers[currentQuestion.id];

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-xl">Diagnostic Questionnaire</h1>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-8 py-16">
        <div className="mb-12">
          <div className="flex justify-between items-center mb-3">
            <span className="text-sm text-slate-500">
              Question {currentStep + 1} of {questions.length}
            </span>
            <span className="text-sm text-slate-500">
              {Math.round(progress)}%
            </span>
          </div>

          <div className="w-full bg-slate-100 rounded-full h-1.5">
            <div
              className="bg-black h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl mb-12">{currentQuestion.question}</h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentAnswer === option;

              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleAnswer(option)}
                  disabled={isSubmitting}
                  className={`w-full text-left p-5 rounded-lg border transition-all ${
                    isSelected
                      ? "border-black bg-slate-50"
                      : "border-slate-200 hover:border-slate-300"
                  } ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span className={isSelected ? "text-black" : "text-slate-700"}>
                      {option}
                    </span>

                    {isSelected && (
                      <div className="w-5 h-5 bg-black rounded-full flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            type="button"
            onClick={handleBack}
            disabled={isSubmitting}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              currentStep === 0
                ? "text-slate-500 hover:bg-slate-50"
                : "hover:bg-slate-50"
            } ${isSubmitting ? "opacity-60 cursor-not-allowed" : ""}`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!currentAnswer || isSubmitting}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              currentAnswer && !isSubmitting
                ? "bg-black text-white hover:bg-slate-800"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {isSubmitting
              ? "Submitting..."
              : currentStep < questions.length - 1
              ? "Next"
              : "Complete"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;