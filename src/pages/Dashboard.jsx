import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useQuestionnaire } from "../context/QuestionnaireContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Rocket,
  Users,
  Search,
  X,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { answers, recommendedGrants } = useQuestionnaire();

  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const diagnosticRef = useRef(null);
  const feedRef = useRef(null);
  const resourcesRef = useRef(null);

  const userType = "startup";
  const diagnosticCompleted = recommendedGrants.length > 0;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Founder";

  const handleFeed = () => navigate("/feed");
  const handleDiagnostic = () => navigate("/questionnaire");
  const handleResources = () => navigate("/resources");

  const tourSteps = [
    {
      title: "Welcome to Your Dashboard",
      description:
        "This is your central hub for navigating the startup ecosystem. Let me show you around the key features.",
      targetRef: null,
    },
    {
      title: "Diagnostic Questionnaire",
      description:
        "Complete the multi-step diagnostic to get your personalized AI-powered roadmap based on your stage, sector, and growth barriers.",
      targetRef: diagnosticRef,
    },
    {
      title: "Community Feed",
      description:
        "Connect with mentors, recruit talent, and collaborate with other startups and investors in real-time.",
      targetRef: feedRef,
    },
    {
      title: "Answer Engine",
      description:
        "Access AI grant search, regulatory compliance guides, and verified answers in plain English.",
      targetRef: resourcesRef,
    },
  ];

  useEffect(() => {
    if (showTour && tourStep > 0 && tourSteps[tourStep].targetRef?.current) {
      tourSteps[tourStep].targetRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [showTour, tourStep]);

  const getTooltipPosition = (ref) => {
    if (!ref?.current) return { top: "50%", left: "50%" };

    const rect = ref.current.getBoundingClientRect();

    return {
      top: `${rect.top + window.scrollY}px`,
      left: `${rect.left + rect.width / 2}px`,
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg"></div>
            <span className="text-lg">Starter</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowTour(true)}
              className="px-4 py-2 text-sm bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Guide
            </button>

            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-12">
        <div className="mb-12">
          <h1 className="text-4xl mb-3">
            Welcome, {userType === "startup" ? firstName : "Investor"}
          </h1>

          <p className="text-slate-500 text-lg">
            Your personalized startup roadmap and resources
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
          <div
            ref={diagnosticRef}
            className={`relative ${
              showTour && tourStep === 1
                ? "ring-2 ring-black ring-offset-4 rounded-xl"
                : ""
            }`}
          >
            <button
              onClick={handleDiagnostic}
              className="w-full bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left group"
            >
              <Rocket className="w-6 h-6 mb-4" />
              <h3 className="text-lg mb-2 group-hover:underline">Diagnostic</h3>
              <p className="text-sm text-slate-500">
                Analyze your stage, sector, and growth barriers
              </p>
            </button>
          </div>

          <div
            ref={feedRef}
            className={`relative ${
              showTour && tourStep === 2
                ? "ring-2 ring-black ring-offset-4 rounded-xl"
                : ""
            }`}
          >
            <button
              onClick={handleFeed}
              className="w-full bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left group"
            >
              <Users className="w-6 h-6 mb-4" />
              <h3 className="text-lg mb-2 group-hover:underline">
                Community Feed
              </h3>
              <p className="text-sm text-slate-500">
                Connect with mentors and recruit talent
              </p>
            </button>
          </div>

          <div
            ref={resourcesRef}
            className={`relative ${
              showTour && tourStep === 3
                ? "ring-2 ring-black ring-offset-4 rounded-xl"
                : ""
            }`}
          >
            <button
              onClick={handleResources}
              className="w-full bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left group"
            >
              <Search className="w-6 h-6 mb-4" />
              <h3 className="text-lg mb-2 group-hover:underline">
                Answer Engine
              </h3>
              <p className="text-sm text-slate-500">
                AI grant search and regulatory guidance
              </p>
            </button>
          </div>
        </div>

        {diagnosticCompleted ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-2xl mb-2">Your AI-Powered Funding Matches</h2>

            {answers?.industry && answers?.stage && answers?.location && (
              <p className="text-sm text-slate-500 mb-6">
                Based on your {answers.stage.toLowerCase()}{" "}
                {answers.industry.toLowerCase()} startup in {answers.location}.
              </p>
            )}

            <div className="space-y-4">
              {recommendedGrants.map((grant, index) => (
                <div
                  key={`${grant.name || "grant"}-${index}`}
                  className="flex items-start gap-4 p-5 border border-slate-200 rounded-lg"
                >
                  <div className="w-7 h-7 bg-black text-white rounded-full flex items-center justify-center text-sm">
                    {index + 1}
                  </div>

                  <div>
                    <h4>{grant.name || "Unnamed Grant"}</h4>
                    <p className="text-sm text-slate-500">
                      {grant.amount || "Amount not provided"}
                    </p>
                    <p className="text-sm text-slate-600 mt-1">
                      {grant.reason || "No explanation provided."}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-2xl mb-4">Your AI-Powered Roadmap</h2>
            <p className="text-slate-500 mb-6">
              Complete the diagnostic questionnaire to receive personalized funding matches.
            </p>

            <button
              onClick={handleDiagnostic}
              className="px-5 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              Start Diagnostic
            </button>
          </div>
        )}
      </main>

      {showTour && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setShowTour(false)}
          />

          <div
            className="fixed z-50 bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6"
            style={
              tourStep > 0 && tourSteps[tourStep].targetRef
                ? {
                    ...getTooltipPosition(tourSteps[tourStep].targetRef),
                    transform: "translate(-50%, -100%)",
                  }
                : {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }
            }
          >
            <div className="flex justify-between mb-4">
              <h3 className="text-xl">{tourSteps[tourStep].title}</h3>
              <button onClick={() => setShowTour(false)}>
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 mb-6">
              {tourSteps[tourStep].description}
            </p>

            <div className="flex justify-between">
              <span className="text-sm text-slate-400">
                {tourStep + 1} / {tourSteps.length}
              </span>

              <button
                onClick={() =>
                  tourStep < tourSteps.length - 1
                    ? setTourStep(tourStep + 1)
                    : setShowTour(false)
                }
                className="px-5 py-2 bg-black text-white rounded-lg"
              >
                {tourStep < tourSteps.length - 1 ? "Next" : "Finish"}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;