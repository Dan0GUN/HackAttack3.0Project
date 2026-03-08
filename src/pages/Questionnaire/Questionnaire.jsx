import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { findFunding } from "../../api/api";
import { useQuestionnaire } from "../../context/QuestionnaireContext";

function Questionnaire() {
  const navigate = useNavigate();
  const { setAnswers: setContextAnswers, setRecommendedGrants } = useQuestionnaire();

  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({});

  const questions = [
    {
      id: "location",
      question: "Where is your startup currently based?",
      options: ["Canada", "United States", "Europe", "Other"],
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
    setAnswers({
      ...answers,
      [questions[currentStep].id]: value,
    });
  };

  const handleNext = async () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Save answers to context
      setContextAnswers(answers);
      
      console.log("Submitting answers:", answers);

      try {
        // Fetch recommended grants from backend
        const grants = await findFunding(answers);
        setRecommendedGrants(grants.recommendations || []);
        console.log("Recommended grants:", grants);
      } catch (err) {
        console.error("Backend error:", err);
      }

      navigate("/resources");
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate("/dashboard");
    }
  };

  async function handleSubmit() {
    const data = {
      location: "Canada",
      industry: "AI",
      stage: "MVP",
      team_size: 3,
      funding_need: 50000,
      business_model: "SaaS",
      target_market: "SMBs",
    };

    try {
      const grants = await findFunding(data);
      console.log(grants);
    } catch (error) {
      console.error(error);
    }
  }

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
            {currentQuestion.options.map((option, index) => {
              const isSelected = currentAnswer === option;

              return (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className={`w-full text-left p-5 rounded-lg border transition-all ${
                    isSelected
                      ? "border-black bg-slate-50"
                      : "border-slate-200 hover:border-slate-300"
                  }`}
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
            onClick={handleBack}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              currentStep === 0
                ? "text-slate-500 hover:bg-slate-50"
                : "hover:bg-slate-50"
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!currentAnswer}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              currentAnswer
                ? "bg-black text-white hover:bg-slate-800"
                : "bg-slate-100 text-slate-400 cursor-not-allowed"
            }`}
          >
            {currentStep < questions.length - 1 ? "Next" : "Complete"}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Questionnaire;