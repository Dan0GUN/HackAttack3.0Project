import { useState } from 'react';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

export default function QQuestionnaire({ onComplete }){
    const [currentStep, setCurrentStep] = useState(0); // Question _ of 6
    const [answers, setAnswers] = useState({}); // Used to hold the specific answers they pick
    
    const questions = [
        {
            id: 'stage',
            question: "What stage is your startup currently in?",
            options: [
                "Idea Stage - Still validating the concept",
                "Pre-MVP - Building the first version",
                "MVP Complete - Testing with users",
                "Early Revenue - Generating initial sales",
                "Scaling - Ready to grow rapidly",
            ],
        },
        {
            id: 'sector',
            question: "Which sector does your startup operate in?",
            options: [
                "Technology & Software",
                "Healthcare & Biotech",
                "Finance & Fintech",
                "Education & Edtech",
                "E-commerce & Retail",
                "Clean Energy & Sustainability",
                "Other",
            ],
        },
        {
            id: 'team',
            question: "What is your current team size?",
            options: [
                "Solo founder",
                "2-3 co-founders",
                "4-10 team members",
                "11-25 team members",
                "25+ team members",
            ],
        },
        {
            id: 'funding',
            question: "What is your current funding status?",
            options: [
                "Self-funded/Bootstrapped",
                "Friends & Family round",
                "Angel investment received",
                "Seed funding received",
                "Series A or beyond",
                "Actively fundraising",
            ],
        },
        {
            id: 'barrier',
            question: "What is your biggest growth barrier right now?",
            options: [
                "Market validation - Understanding customer needs",
                "Product development - Building the right features",
                "Regulatory compliance - Licenses and certifications",
                "Funding - Accessing capital",
                "Team building - Recruiting talent",
                "Customer acquisition - Marketing and sales",
            ],
        },
        {
            id: 'licenses',
            question: "Do you have the necessary licenses and certifications for your industry?",
            options: [
                "Yes, all requirements met",
                "Partially - working on it",
                "No - not sure what I need",
                "Not applicable to my industry",
            ],
        },
    ];

    const handleAnswer = (value) => {
        setAnswers({ ...answers, [questions[currentStep].id]: value});
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1)
        {
            setCurrentStep(currentStep + 1); // Set next step to be i + 1
        }else{
            onComplete(); // It is complete
        }
    };

    const handleBack = () => { // Back
        if (currentStep > 0){
            setCurrentStep(currentStep - 1);
        }
    };

    const progress = ((currentStep + 1) / questions.length) * 100; // Percentage in the ProgressBar

    return(
        <div className="min-h-screen bg-white">
            <div className="border-b border-slate-100 px-8 py-5">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-xl text-slate-700">Diagnostic Questionnaire</h1>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-8 py-16">
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-3">
                        <span className="text-sm text-slate-500">
                            Question {currentStep + 1} of {questions.length}
                        </span>
                        <span className="text-sm text-slate-500">{Math.round(progress)}%</span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5">
                        <div className="bg-black h-1.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}/>
                    </div>
                </div>

                <div className="mb-16">
                    <h2 className="text-3xl mb-12 text-slate-700">
                        {questions[currentStep].question}
                    </h2>

                    <div className="space-y-3">
                        {questions[currentStep].options.map((option, index) => {
                            const isSelected = answers[questions[currentStep].id] === option;
                            return(
                                <button key={index} onClick={() => handleAnswer(option)} className={`w-full text-left p-5 rounded-lg border transition-all ${
                                    isSelected ? 'border-black bg-slate-50' : 'border-slate-200 hover:border-slate-300'}`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-slate-700">
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
            disabled={currentStep === 0}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              currentStep === 0
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
            }`}
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!answers[questions[currentStep].id]}
            className={`px-6 py-2.5 rounded-lg flex items-center gap-2 transition-colors ${
              answers[questions[currentStep].id]
                ? 'bg-black text-white hover:bg-slate-800'
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            }`}
          >
            {currentStep < questions.length - 1 ? 'Next' : 'Complete'}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
    </div>
    </div>
    );
}