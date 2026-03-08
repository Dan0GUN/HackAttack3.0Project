import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  Sparkles,
  FileText,
  X,
  ExternalLink,
} from "lucide-react";
import { useQuestionnaire } from "../context/QuestionnaireContext";
import { searchCompliance } from "../api/api";

function AnswerEngine() {
  const navigate = useNavigate();
  const { recommendedGrants } = useQuestionnaire();

  const [selectedCategory, setSelectedCategory] = useState("grants");
  const [selectedGrant, setSelectedGrant] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [complianceResults, setComplianceResults] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleComplianceSearch = async () => {
    if (!searchQuery.trim()) return;
    
    setLoading(true);
    try {
      const results = await searchCompliance(searchQuery);
      setComplianceResults(results);
    } catch (error) {
      console.error("Compliance search error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleComplianceSearch();
    }
  };

  const displayedGrants = recommendedGrants.slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-600 hover:text-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl">Answer Engine</h1>
        </div>
      </nav>

      {/* Category Tabs */}
      <div className="border-b border-slate-100 px-8 py-5 bg-slate-50">
        <div className="max-w-7xl mx-auto flex gap-2">
          <button
            onClick={() => setSelectedCategory("grants")}
            className={`px-4 py-2 rounded-lg transition-colors text-sm ${
              selectedCategory === "grants"
                ? "bg-black text-white [&_*]:text-white"
                : "bg-white text-black hover:bg-slate-100 border border-slate-200"
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
                ? "bg-black text-white [&_*]:text-white"
                : "bg-white text-black hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Compliance
            </div>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* AI Grants Tab */}
        {selectedCategory === "grants" && (
          <div className="space-y-6">
            <div className="bg-slate-50 rounded-xl p-5">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 flex-shrink-0" />
                <div>
                  <h2 className="text-lg font-semibold mb-1">AI-Powered Grant Matching</h2>
                  <p className="text-sm text-slate-600">
                    Based on your diagnostic profile, we've identified {displayedGrants.length} personalized funding opportunities
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {displayedGrants.length > 0 ? (
                displayedGrants.map((grant) => (
                  <div
                    key={grant.id}
                    className="border border-slate-200 rounded-xl p-6 hover:border-slate-300 transition-colors shadow-sm"
                  >
                    {/* Grant Header */}
                    <div className="mb-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-semibold mb-1">{grant.name}</h3>
                          <p className="text-slate-600">{grant.organization}</p>
                        </div>
                        {grant.url && (
                          <a
                            href={grant.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-slate-400 hover:text-black transition-colors"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Grant Details Grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6 pb-6 border-b border-slate-100">
                      <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-1">Type</h4>
                        <p className="text-slate-900">{grant.type}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-1">Amount</h4>
                        <p className="text-green-700 font-semibold">{grant.amount}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-1">Deadline</h4>
                        <p className="text-slate-900">{grant.deadline}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-slate-600 mb-1">Region</h4>
                        <p className="text-slate-900">{grant.region}</p>
                      </div>
                    </div>

                    {/* Match Reason */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-600 mb-2">Why This Grant</h4>
                      <p className="text-slate-700 leading-relaxed">{grant.match_reason}</p>
                    </div>

                    {/* Eligibility */}
                    <div className="mb-6">
                      <h4 className="text-sm font-semibold text-slate-600 mb-2">Eligibility</h4>
                      <p className="text-slate-700 leading-relaxed">{grant.eligibility}</p>
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => setSelectedGrant(grant)}
                      className="w-full px-5 py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm font-medium"
                    >
                      Do you want to know more information?
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-12">
                  <p className="text-slate-600">
                    Complete the questionnaire to see personalized grant recommendations
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Compliance Tab */}
        {selectedCategory === "compliance" && (
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="For idea description..."
                className="w-full pl-12 pr-4 py-3 border border-slate-200 rounded-lg bg-white text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <button
              onClick={handleComplianceSearch}
              disabled={loading || !searchQuery.trim()}
              className={`w-full px-5 py-3 rounded-lg transition-colors text-sm font-medium ${
                loading || !searchQuery.trim()
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-black text-white hover:bg-slate-800"
              }`}
            >
              {loading ? "Searching..." : "Search Compliance"}
            </button>

            {/* Compliance Results */}
            {complianceResults && (
              <div className="space-y-5">
                {/* Business Registration */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Business Registration</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.business_registration || "No information available"}
                  </p>
                </div>

                {/* License Permits */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">License Permits</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.license_permits || "No information available"}
                  </p>
                </div>

                {/* Compliance */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Compliance</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.compliance || "No information available"}
                  </p>
                </div>

                {/* Certificates */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Certificates</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.certificates || "No information available"}
                  </p>
                </div>

                {/* IP Advice */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">IP Advice</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.ip_advice || "No information available"}
                  </p>
                </div>

                {/* Legal Roadmap */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Legal Roadmap</h3>
                  <p className="text-slate-700 leading-relaxed">
                    {complianceResults.legal_roadmap || "No information available"}
                  </p>
                </div>

                {/* Reference Links */}
                <div className="border border-slate-200 rounded-xl p-6">
                  <h3 className="text-lg font-semibold mb-3">Reference Links</h3>
                  {complianceResults.reference_links && Array.isArray(complianceResults.reference_links) ? (
                    <ul className="space-y-2">
                      {complianceResults.reference_links.map((link, index) => (
                        <li key={index}>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2"
                          >
                            {link.title}
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-700">No reference links available</p>
                  )}
                </div>
              </div>
            )}

            {!complianceResults && (
              <div className="text-center py-12">
                <p className="text-slate-600">
                  Enter an idea description and search to get compliance information
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Detailed Grant Information Modal */}
      {selectedGrant && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-slate-200 px-8 py-6 flex items-center justify-between">
              <h3 className="text-2xl font-semibold">{selectedGrant.name}</h3>
              <button
                onClick={() => setSelectedGrant(null)}
                className="text-slate-600 hover:text-black"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="px-8 py-6 space-y-6">
              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">Organization</h4>
                <p className="text-slate-900">{selectedGrant.organization}</p>
              </div>

              {selectedGrant.url && (
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Official Website</h4>
                  <a
                    href={selectedGrant.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 underline flex items-center gap-2 w-fit"
                  >
                    {selectedGrant.url}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Type</h4>
                  <p className="text-slate-900">{selectedGrant.type}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Amount</h4>
                  <p className="text-green-700 font-semibold text-lg">{selectedGrant.amount}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Deadline</h4>
                  <p className="text-slate-900">{selectedGrant.deadline}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-slate-600 mb-2">Region</h4>
                  <p className="text-slate-900">{selectedGrant.region}</p>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">Eligibility</h4>
                <p className="text-slate-700 leading-relaxed">{selectedGrant.eligibility}</p>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-600 mb-2">Why This Grant Matches You</h4>
                <p className="text-slate-700 leading-relaxed">{selectedGrant.match_reason}</p>
              </div>

              <div className="pt-4 border-t border-slate-200">
                <a
                  href={selectedGrant.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-center font-medium"
                >
                  Apply to This Grant
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnswerEngine;