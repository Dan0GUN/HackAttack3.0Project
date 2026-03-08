import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import {
  Rocket,
  Users,
  BookOpen,
  Search,
  X,
  ArrowRight,
} from "lucide-react";

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [showTour, setShowTour] = useState(false);
  const [tourStep, setTourStep] = useState(0);

  const diagnosticRef = useRef(null);
  const feedRef = useRef(null);
  const resourcesRef = useRef(null);
  const masterclassRef = useRef(null);

  const userType = "startup";
  const diagnosticCompleted = true;

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const firstName =
    user?.displayName?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "Founder";

  const handleDashboard = () => navigate("/dashboard");
  const handleFeed = () => navigate("/feed");
  const handleDiagnostic = () => navigate("/Questionnaire");

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
    {
      title: "Academia Masterclass",
      description:
        "Learn from industry veterans through video masterclasses and unlock introductions to active investors.",
      targetRef: masterclassRef,
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
    if (!ref?.current) {
      return { top: "50%", left: "50%" };
    }

    const rect = ref.current.getBoundingClientRect();

    return {
      top: `${rect.top + window.scrollY - 120}px`,
      left: `${rect.left + rect.width / 2}px`,
    };
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded-lg"></div>
            <span className="text-lg">Ecosystem</span>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={handleDashboard}
              className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors"
            >
              Dashboard
            </button>

            <button
              onClick={handleFeed}
              className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors"
            >
              Feed
            </button>

            <button className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors">
              Resources
            </button>

            <button className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors">
              Masterclass
            </button>

            <button className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors">
              Messages
            </button>
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
            {userType === "startup"
              ? "Your personalized startup roadmap and resources"
              : "Discover promising startups and connect with founders"}
          </p>
        </div>

        {userType === "startup" && !diagnosticCompleted && (
          <div className="bg-slate-50 rounded-xl p-8 mb-10">
            <div className="flex items-start gap-4">
              <div className="flex-1">
                <h3 className="text-xl mb-2">Complete Your Diagnostic</h3>
                <p className="text-slate-600 mb-5">
                  Unlock your personalized AI-powered roadmap by completing the
                  diagnostic questionnaire.
                </p>

                <button
                  onClick={handleDiagnostic}
                  className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors inline-flex items-center gap-2"
                >
                  Start Diagnostic
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5 mb-12">
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
              <div className="mb-4">
                <Rocket className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2 group-hover:underline">Diagnostic</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
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
              <div className="mb-4">
                <Users className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2 group-hover:underline">
                Community Feed
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
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
            <button className="w-full bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left group">
              <div className="mb-4">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2 group-hover:underline">
                Answer Engine
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                AI grant search and regulatory guidance
              </p>
            </button>
          </div>

          <div
            ref={masterclassRef}
            className={`relative ${
              showTour && tourStep === 4
                ? "ring-2 ring-black ring-offset-4 rounded-xl"
                : ""
            }`}
          >
            <button className="w-full bg-white p-8 rounded-xl border border-slate-200 hover:border-slate-300 transition-all text-left group">
              <div className="mb-4">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="text-lg mb-2 group-hover:underline">
                Masterclass
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Learn from industry veterans
              </p>
            </button>
          </div>
        </div>

        {diagnosticCompleted && (
          <div className="bg-white rounded-xl border border-slate-200 p-8">
            <h2 className="text-2xl mb-6">Your AI-Powered Roadmap</h2>

            <div className="space-y-3">
              <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-lg">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg
                    className="w-4 h-4 text-white"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Market Validation</h4>
                  <p className="text-sm text-slate-500">
                    Completed: Customer interviews and market research
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-slate-200 rounded-lg">
                <div className="w-7 h-7 bg-black rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-white text-sm">
                  2
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Build MVP</h4>
                  <p className="text-sm text-slate-500 mb-3">
                    In Progress: Develop minimum viable product
                  </p>
                  <button className="text-sm hover:underline">
                    View recommended resources →
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-slate-200 rounded-lg opacity-50">
                <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-600 text-sm">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Regulatory Compliance</h4>
                  <p className="text-sm text-slate-500">
                    Upcoming: Obtain necessary licenses and certifications
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 border border-slate-200 rounded-lg opacity-50">
                <div className="w-7 h-7 bg-slate-200 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-slate-600 text-sm">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="mb-1">Investor Preparation</h4>
                  <p className="text-sm text-slate-500">
                    Upcoming: Build pitch deck and financial projections
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {!diagnosticCompleted && userType === "startup" && (
          <div className="bg-slate-50 rounded-xl p-12 text-center">
            <h2 className="text-2xl mb-3">Get Your Personalized Roadmap</h2>
            <p className="text-slate-600 mb-6 max-w-2xl mx-auto">
              Complete the diagnostic questionnaire to unlock AI-powered
              recommendations, step-by-step guidance, and access to relevant
              mentors and resources.
            </p>
            <button
              onClick={handleDiagnostic}
              className="px-8 py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
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
          ></div>

          <div
            className="fixed z-50 bg-white rounded-xl shadow-2xl max-w-md w-full mx-4 p-6"
            style={
              tourStep > 0 && tourSteps[tourStep].targetRef
                ? {
                    ...getTooltipPosition(tourSteps[tourStep].targetRef),
                    transform: "translate(-50%, -100%)",
                    marginTop: "-20px",
                  }
                : {
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }
            }
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl pr-4">{tourSteps[tourStep].title}</h3>
              <button
                onClick={() => {
                  setShowTour(false);
                  setTourStep(0);
                }}
                className="text-slate-400 hover:text-slate-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-slate-600 mb-6 leading-relaxed">
              {tourSteps[tourStep].description}
            </p>

            <div className="flex justify-between items-center">
              <div className="text-sm text-slate-400">
                {tourStep + 1} / {tourSteps.length}
              </div>

              <div className="flex gap-2">
                {tourStep > 0 && (
                  <button
                    onClick={() => setTourStep(tourStep - 1)}
                    className="px-4 py-2 text-sm hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    Back
                  </button>
                )}

                {tourStep < tourSteps.length - 1 ? (
                  <button
                    onClick={() => setTourStep(tourStep + 1)}
                    className="px-5 py-2 text-sm bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      setShowTour(false);
                      setTourStep(0);
                    }}
                    className="px-5 py-2 text-sm bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    Finish
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Dashboard;