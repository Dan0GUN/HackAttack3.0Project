import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Sparkles,
  FileText,
  Building2,
} from "lucide-react";

function AnswerEngine() {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("grants");
  const [showQuestionBuilder, setShowQuestionBuilder] = useState(false);

  const knowledgeBase = {
    compliance: [
      {
        id: 1,
        title: "GDPR Compliance for Startups",
        category: "Data Privacy",
        summary:
          "Everything you need to know about GDPR requirements, data protection, and user consent.",
        answer:
          "GDPR (General Data Protection Regulation) requires businesses handling EU citizen data to implement strict privacy measures. Key requirements include: obtaining explicit consent, providing data access rights, implementing security measures, appointing a DPO if needed, and reporting breaches within 72 hours.",
      },
      {
        id: 2,
        title: "Healthcare Licensing Requirements",
        category: "Healthcare",
        summary:
          "Navigate HIPAA, FDA regulations, and state medical board requirements.",
        answer:
          "Healthcare startups must comply with HIPAA for patient data protection, FDA approval for medical devices, and state-specific licensing. Steps: 1) Determine your classification, 2) Submit necessary applications, 3) Implement security protocols, 4) Conduct regular audits.",
      },
      {
        id: 3,
        title: "Fintech Regulatory Guide",
        category: "Finance",
        summary:
          "Understand money transmission licenses, KYC/AML requirements, and securities regulations.",
        answer:
          "Fintech companies must obtain Money Transmitter Licenses (MTL) in applicable states, implement KYC/AML procedures, and comply with securities laws if offering investment products. Partner with compliance experts and consider state-by-state requirements.",
      },
    ],
    grants: [
      {
        id: 1,
        title: "Climate Tech Innovation Grant",
        provider: "Department of Energy",
        amount: "$50,000 - $500,000",
        sector: "Clean Energy",
        deadline: "Rolling",
        description:
          "Funding for startups developing renewable energy solutions, carbon capture technology, or sustainable materials.",
      },
      {
        id: 2,
        title: "Agricultural Innovation Fund",
        provider: "USDA",
        amount: "$100,000 - $750,000",
        sector: "Agriculture",
        deadline: "Quarterly",
        description:
          "Support for agtech startups working on sustainable farming, food security, and rural development.",
      },
      {
        id: 3,
        title: "Healthcare Access Grant",
        provider: "National Institutes of Health",
        amount: "$75,000 - $1,000,000",
        sector: "Healthcare",
        deadline: "April 15, 2026",
        description:
          "Funding for health tech solutions improving access to care in underserved communities.",
      },
      {
        id: 4,
        title: "Education Innovation Grant",
        provider: "Department of Education",
        amount: "$25,000 - $250,000",
        sector: "Education",
        deadline: "June 30, 2026",
        description:
          "Support for edtech platforms addressing learning gaps and improving educational outcomes.",
      },
    ],
    offices: [
      {
        id: 1,
        name: "TechHub Incubator",
        type: "Incubator",
        location: "San Francisco, CA",
        description:
          "Full-service incubator with mentorship, funding, and workspace for early-stage tech startups.",
        amenities: [
          "High-speed internet",
          "Conference rooms",
          "Mentorship program",
          "Demo days",
        ],
      },
      {
        id: 2,
        name: "Innovation Lab",
        type: "Accelerator",
        location: "Boston, MA",
        description:
          "3-month accelerator program focused on health tech and biotech startups.",
        amenities: [
          "Lab equipment",
          "Industry connections",
          "$150K investment",
          "Legal support",
        ],
      },
      {
        id: 3,
        name: "Maker Space Co-working",
        type: "Co-working",
        location: "Austin, TX",
        description:
          "Collaborative workspace with prototyping facilities and networking events.",
        amenities: [
          "24/7 access",
          "3D printers",
          "Workshop tools",
          "Community events",
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-6xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-600 hover:text-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl">Answer Engine</h1>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-8 py-8">
        <div className="border border-slate-200 rounded-xl p-6 mb-8">
          <div className="flex items-center gap-4 mb-5">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for grants, compliance guides, or resources..."
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              onClick={() => setShowQuestionBuilder(true)}
              className="px-5 py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm whitespace-nowrap"
            >
              Ask Expert
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setSelectedCategory("grants")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedCategory === "grants"
                  ? "bg-black text-white"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                AI Grant Search
              </div>
            </button>

            <button
              onClick={() => setSelectedCategory("compliance")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedCategory === "compliance"
                  ? "bg-black text-white"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Compliance
              </div>
            </button>

            <button
              onClick={() => setSelectedCategory("office")}
              className={`px-4 py-2 rounded-lg transition-colors text-sm ${
                selectedCategory === "office"
                  ? "bg-black text-white"
                  : "bg-slate-50 hover:bg-slate-100"
              }`}
            >
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                Office Space
              </div>
            </button>
          </div>
        </div>

        {selectedCategory === "compliance" && (
          <div className="space-y-4">
            {knowledgeBase.compliance.map((item) => (
              <div key={item.id} className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg mb-2">{item.title}</h3>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                      {item.category}
                    </span>
                  </div>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">{item.summary}</p>

                <div className="bg-slate-50 rounded-lg p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                      Verified Answer
                    </span>
                  </div>

                  <p className="text-sm text-slate-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCategory === "grants" && (
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-xl p-5 mb-4">
              <div className="flex items-start gap-3">
                <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="mb-1">AI-Powered Grant Matching</h4>
                  <p className="text-sm text-slate-600">
                    Based on your diagnostic profile, we've identified{" "}
                    {knowledgeBase.grants.length} relevant funding opportunities
                  </p>
                </div>
              </div>
            </div>

            {knowledgeBase.grants.map((grant) => (
              <div key={grant.id} className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg mb-1">{grant.title}</h3>
                    <p className="text-slate-600 text-sm">{grant.provider}</p>
                  </div>

                  <span className="px-3 py-1 bg-green-50 text-green-700 text-sm rounded-full whitespace-nowrap">
                    {grant.amount}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {grant.description}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex gap-4 text-sm text-slate-500">
                    <span>Sector: {grant.sector}</span>
                    <span>Deadline: {grant.deadline}</span>
                  </div>

                  <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {selectedCategory === "office" && (
          <div className="space-y-4">
            {knowledgeBase.offices.map((office) => (
              <div key={office.id} className="border border-slate-200 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg mb-1">{office.name}</h3>
                    <p className="text-slate-600 text-sm">{office.location}</p>
                  </div>

                  <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs rounded-full">
                    {office.type}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {office.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {office.amenities.map((amenity, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full"
                    >
                      {amenity}
                    </span>
                  ))}
                </div>

                <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                  Learn More
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {showQuestionBuilder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 p-8">
            <h3 className="text-2xl mb-3">Interactive Question Builder</h3>
            <p className="text-slate-600 mb-6">
              Craft the perfect question to get expert help from our mentor network.
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm mb-2">What's your context?</label>
                <textarea
                  placeholder="e.g., We're a healthcare startup in the MVP stage..."
                  className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
                  rows={2}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">
                  What's your specific problem?
                </label>
                <textarea
                  placeholder="e.g., We need HIPAA compliance but aren't sure where to start..."
                  className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm mb-2">What outcome do you need?</label>
                <textarea
                  placeholder="e.g., A roadmap to achieve HIPAA compliance in 90 days..."
                  className="w-full p-3 border border-slate-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black"
                  rows={2}
                />
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowQuestionBuilder(false)}
                className="px-6 py-2.5 hover:bg-slate-50 rounded-lg transition-colors"
              >
                Cancel
              </button>

              <button
                onClick={() => setShowQuestionBuilder(false)}
                className="px-6 py-2.5 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Send to Mentor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerEngine;