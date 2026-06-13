"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, LogOut, Mail, Calendar, User, MessageSquare, Search, ShieldCheck } from "lucide-react";

interface Signup {
  id: string;
  created_at: string;
  name: string;
  email: string;
  message: string;
}

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [signups, setSignups] = useState<Signup[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Check auth status on mount
  useEffect(() => {
    fetchSignups();
  }, []);

  const fetchSignups = async () => {
    try {
      const res = await fetch("/api/admin/signups");
      if (res.ok) {
        const data = await res.json();
        setSignups(data.signups || []);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("Error checking auth / fetching signups:", err);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setPassword("");
        setIsAuthenticated(true);
        fetchSignups();
      } else {
        const data = await res.json();
        setLoginError(data.error || "Invalid password.");
      }
    } catch (err) {
      setLoginError("An error occurred. Please try again.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/admin/logout", { method: "POST" });
      if (res.ok) {
        setIsAuthenticated(false);
        setSignups([]);
      }
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // Filter signups based on search query
  const filteredSignups = signups.filter((signup) => {
    const query = searchQuery.toLowerCase();
    return (
      signup.name.toLowerCase().includes(query) ||
      signup.email.toLowerCase().includes(query) ||
      signup.message.toLowerCase().includes(query)
    );
  });

  const formatDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-[#07070a] text-white">
        <div className="text-center">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-t-[#c9a87c] border-r-transparent border-b-transparent border-l-transparent" />
          <p className="mt-4 font-body text-xs tracking-wider text-white/50 uppercase">Loading Dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#c9a87c]/25">
      {/* Dynamic style injection to restore standard system cursor on admin panel */}
      <style>{`
        *, a, button, input, textarea, [role="button"] {
          cursor: auto !important;
        }
      `}</style>

      {!isAuthenticated ? (
        // Login Page
        <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden">
          {/* Subtle glowing backgrounds */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-[#8b5cf6]/5 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-[#c9a87c]/5 blur-[120px] pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md"
          >
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#c9a87c] uppercase mb-3 font-utility">
                <ShieldCheck className="w-4 h-4" /> SECURE GATEWAY
              </span>
              <h1 className="text-4xl font-bold tracking-tight font-display text-white">
                Markera Admin
              </h1>
              <p className="mt-2 text-sm text-white/45 font-body">
                Enter your access credentials to view signups.
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.08] backdrop-blur-xl rounded-2xl p-8 shadow-2xl relative">
              {/* Corner accent lights */}
              <div className="absolute top-4 left-4 w-1.5 h-1.5 rounded-full bg-[#c9a87c] opacity-40 shadow-[0_0_8px_#c9a87c]" />
              <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-[#c9a87c] opacity-40 shadow-[0_0_8px_#c9a87c]" />

              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label htmlFor="pass" className="block text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase mb-2 font-utility">
                    Security Password
                  </label>
                  <div className="relative">
                    <input
                      id="pass"
                      type="password"
                      placeholder="••••••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="w-full bg-white/[0.03] border border-white/10 rounded-xl px-4 py-3 pl-11 text-white font-body placeholder-white/20 focus:outline-none focus:border-[#c9a87c] transition-colors"
                    />
                    <Lock className="w-4 h-4 text-white/30 absolute left-4 top-1/2 -translate-y-1/2" />
                  </div>
                </div>

                {loginError && (
                  <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-center">
                    {loginError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loginLoading}
                  className="w-full flex items-center justify-center py-3.5 px-4 rounded-xl bg-[#c9a87c] text-[#07070a] font-bold text-xs tracking-widest uppercase font-utility hover:bg-white transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(201,168,124,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] hover:scale-[1.02]"
                >
                  {loginLoading ? "Authorizing..." : "Access Dashboard"}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      ) : (
        // Admin Dashboard
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/5 pb-8 mb-10 gap-4">
            <div>
              <span className="text-[10px] font-semibold tracking-[0.25em] text-[#c9a87c] uppercase font-utility">
                Management Portal
              </span>
              <h1 className="text-4xl font-extrabold tracking-tight font-display text-white mt-1">
                Partner Signups
              </h1>
              <p className="text-xs text-white/45 font-body mt-1">
                Review and manage brand & creator applications.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search signups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-white/[0.03] border border-white/10 rounded-xl px-4 py-2.5 pl-10 text-xs text-white font-body placeholder-white/30 focus:outline-none focus:border-[#c9a87c] transition-colors w-64"
                />
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>

              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-white/10 hover:border-red-500/40 hover:bg-red-500/5 text-white/70 hover:text-red-400 text-xs font-semibold tracking-wider uppercase font-utility transition-all"
              >
                <LogOut className="w-3.5 h-3.5" /> Logout
              </button>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-[#c9a87c]/5 blur-3xl pointer-events-none" />
              <p className="text-[10px] font-semibold tracking-wider text-white/45 uppercase font-utility">Total submissions</p>
              <h3 className="text-3xl font-extrabold mt-2 font-utility text-[#c9a87c]">{signups.length}</h3>
              <p className="text-xs text-white/30 mt-1">All-time applications received</p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-lg relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-indigo-500/5 blur-3xl pointer-events-none" />
              <p className="text-[10px] font-semibold tracking-wider text-white/45 uppercase font-utility">Latest application</p>
              <h3 className="text-sm font-semibold mt-4 text-white font-body truncate">
                {signups.length > 0 ? signups[0].name : "No submissions"}
              </h3>
              <p className="text-xs text-white/30 mt-1">
                {signups.length > 0 ? formatDate(signups[0].created_at) : "N/A"}
              </p>
            </div>

            <div className="bg-white/[0.02] border border-white/[0.07] rounded-2xl p-6 backdrop-blur-lg sm:col-span-2 lg:col-span-1 relative overflow-hidden">
              <p className="text-[10px] font-semibold tracking-wider text-white/45 uppercase font-utility">Active database</p>
              <h3 className="text-sm font-semibold mt-4 text-emerald-400 font-body flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Connected to Supabase
              </h3>
              <p className="text-xs text-white/30 mt-1.5">Live database synchronization active</p>
            </div>
          </div>

          {/* Submissions Table / List */}
          <div className="bg-white/[0.01] border border-white/[0.07] rounded-2xl overflow-hidden shadow-2xl backdrop-blur-lg">
            {filteredSignups.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-sm text-white/45 font-body">
                  {signups.length === 0 ? "No applications have been submitted yet." : "No results match your search."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/[0.02]">
                      <th className="py-4 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Applicant</th>
                      <th className="py-4 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Contact Details</th>
                      <th className="py-4 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Submission Date</th>
                      <th className="py-4 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility w-[40%]">Message / Goals</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    <AnimatePresence initial={false}>
                      {filteredSignups.map((signup) => (
                        <motion.tr
                          key={signup.id}
                          layout
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="hover:bg-white/[0.02] transition-colors"
                        >
                          <td className="py-5 px-6 vertical-align-top">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#c9a87c]/10 flex items-center justify-center border border-[#c9a87c]/20">
                                <User className="w-4 h-4 text-[#c9a87c]" />
                              </div>
                              <span className="font-semibold text-sm text-white font-body">{signup.name}</span>
                            </div>
                          </td>

                          <td className="py-5 px-6 vertical-align-top">
                            <a
                              href={`mailto:${signup.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c9a87c] font-body transition-colors group"
                            >
                              <Mail className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c9a87c]/60" />
                              {signup.email}
                            </a>
                          </td>

                          <td className="py-5 px-6 text-xs text-white/60 font-body vertical-align-top">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/30" />
                              {formatDate(signup.created_at)}
                            </div>
                          </td>

                          <td className="py-5 px-6 text-sm text-white/75 font-body leading-relaxed whitespace-pre-wrap vertical-align-top">
                            <div className="flex items-start gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                              <MessageSquare className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                              <span>{signup.message}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
