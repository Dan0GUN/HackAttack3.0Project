import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Heart,
  MessageCircle,
  Briefcase,
  MapPin,
} from "lucide-react";

function CommunityFeed() {
  const navigate = useNavigate();
  const [newPost, setNewPost] = useState("");
  const [activeTab, setActiveTab] = useState("feed");

  const userType = "startup";

  const posts = [
    {
      id: 1,
      author: "Sarah Chen",
      role: "CEO at HealthTech Solutions",
      avatar: "SC",
      content:
        "Just completed our first round of user testing for our telemedicine platform. The feedback has been incredible! Looking for a senior backend developer to help us scale. DM if interested.",
      likes: 24,
      comments: 8,
      timeAgo: "2h",
    },
    {
      id: 2,
      author: "Michael Rodriguez",
      role: "Venture Partner at Innovation Fund",
      avatar: "MR",
      content:
        "Excited to announce we're opening applications for our Spring cohort. Looking for early-stage fintech and climate tech startups. Offering $150K in funding + 3 months of mentorship.",
      likes: 56,
      comments: 15,
      timeAgo: "5h",
    },
    {
      id: 3,
      author: "Emma Thompson",
      role: "Founder at EduLearn",
      avatar: "ET",
      content:
        "Quick question for the community: What's been your experience with regulatory compliance in the education sector? We're navigating FERPA requirements and would love to connect with founders who've been through this.",
      likes: 12,
      comments: 6,
      timeAgo: "1d",
    },
  ];

  const jobListings = [
    {
      id: 1,
      company: "GreenTech Innovations",
      position: "Full-Stack Developer",
      type: "Full-time",
      location: "Remote",
      equity: "0.5-1.5%",
      description:
        "Join our mission to fight climate change. Looking for an experienced developer passionate about sustainability.",
    },
    {
      id: 2,
      company: "FinanceAI",
      position: "Marketing Lead",
      type: "Contract",
      location: "San Francisco, CA",
      equity: "0.2-0.8%",
      description:
        "Help us bring AI-powered financial planning to millions. Seeking creative marketer with B2C experience.",
    },
    {
      id: 3,
      company: "MediConnect",
      position: "Product Designer",
      type: "Full-time",
      location: "Hybrid - Boston",
      equity: "0.3-1.0%",
      description:
        "Design the future of patient care. We need a designer who understands healthcare and user empathy.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <nav className="border-b border-slate-100 px-8 py-5">
        <div className="max-w-5xl mx-auto flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="text-slate-600 hover:text-black"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <h1 className="text-xl">Community Feed</h1>
        </div>
      </nav>

      <div className="max-w-5xl mx-auto px-8 py-8">
        <div className="flex gap-2 mb-8">
          <button
            onClick={() => setActiveTab("feed")}
            className={`px-5 py-2 rounded-lg transition-colors text-sm ${
              activeTab === "feed"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-slate-50"
            }`}
          >
            Feed
          </button>

          <button
            onClick={() => setActiveTab("recruit")}
            className={`px-5 py-2 rounded-lg transition-colors text-sm ${
              activeTab === "recruit"
                ? "bg-black text-white"
                : "bg-white text-black hover:bg-slate-50"
            }`}
          >
            Talent Hub
          </button>
        </div>

        {activeTab === "feed" && (
          <>
            {userType === "startup" && (
              <div className="bg-slate-50 rounded-xl p-6 mb-6">
                <textarea
                  value={newPost}
                  onChange={(e) => setNewPost(e.target.value)}
                  placeholder="Share an update, ask a question, or recruit talent..."
                  className="w-full p-4 border-0 bg-transparent text-black resize-none placeholder:text-slate-400 focus:outline-none"
                  rows={4}
                />

                <div className="flex justify-end mt-2">
                  <button className="px-5 py-2 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Post
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {posts.map((post) => (
                <div
                  key={post.id}
                  className="border border-slate-200 rounded-xl p-6"
                >
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-11 h-11 bg-black rounded-full flex items-center justify-center text-white text-sm flex-shrink-0">
                      {post.avatar}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="mb-0.5">{post.author}</h3>
                      <p className="text-sm text-slate-500">{post.role}</p>
                    </div>

                    <span className="text-xs text-slate-400">
                      {post.timeAgo}
                    </span>
                  </div>

                  <p className="text-slate-700 mb-4 leading-relaxed">
                    {post.content}
                  </p>

                  <div className="flex items-center gap-6 pt-4 border-t border-slate-100">
                    <button className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">{post.likes}</span>
                    </button>

                    <button className="flex items-center gap-2 text-slate-500 hover:text-black transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">{post.comments}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === "recruit" && (
          <div className="space-y-4">
            {userType === "startup" && (
              <div className="border border-slate-200 rounded-xl p-6 mb-6">
                <h3 className="text-lg mb-4">Post a Position</h3>

                <div className="space-y-3">
                  <input
                    type="text"
                    placeholder="Position title"
                    className="w-full p-3 border border-slate-200 rounded-lg bg-white text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                  />

                  <textarea
                    placeholder="Job description..."
                    className="w-full p-3 border border-slate-200 rounded-lg bg-white text-black resize-none placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                    rows={3}
                  />

                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      placeholder="Location"
                      className="p-3 border border-slate-200 rounded-lg bg-white text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />

                    <input
                      type="text"
                      placeholder="Equity range"
                      className="p-3 border border-slate-200 rounded-lg bg-white text-black placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-black"
                    />
                  </div>

                  <button className="w-full py-3 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                    Post Position
                  </button>
                </div>
              </div>
            )}

            {jobListings.map((job) => (
              <div
                key={job.id}
                className="border border-slate-200 rounded-xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg mb-1">{job.position}</h3>
                    <p className="text-slate-600">{job.company}</p>
                  </div>

                  <span className="px-3 py-1 bg-slate-100 text-slate-700 text-xs rounded-full">
                    {job.type}
                  </span>
                </div>

                <p className="text-slate-600 mb-4 leading-relaxed">
                  {job.description}
                </p>

                <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {job.location}
                  </div>

                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4" />
                    {job.equity} equity
                  </div>
                </div>

                <button className="w-full py-2.5 bg-black text-white rounded-lg hover:bg-slate-800 transition-colors text-sm">
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default CommunityFeed;