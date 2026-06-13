"use client";

import { useEffect, useState } from "react";
import { Lock, LogOut, Mail, Calendar, User, MessageSquare, Search, ShieldCheck } from "lucide-react";
import GlassCard from "@/components/GlassCard";

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
    <div className="min-h-screen bg-[#07070a] text-white selection:bg-[#c9a87c]/25 relative overflow-hidden">
      {/* Dynamic Style Injection for Premium Aesthetics & Interaction */}
      <style>{`
        *, a, button, input, textarea, [role="button"] {
          cursor: auto !important;
        }

        .admin-title {
          font-family: var(--font-display), serif;
          font-weight: 700;
          letter-spacing: -0.02em;
        }

        /* Ambient Glow Mesh */
        .ambient-glow-1 {
          background: radial-gradient(circle, rgba(99, 102, 241, 0.025) 0%, transparent 70%);
        }
        .ambient-glow-2 {
          background: radial-gradient(circle, rgba(201, 168, 124, 0.025) 0%, transparent 70%);
        }

        /* Custom Premium Cards (Bypasses Tailwind compile & specificity issues) */
        .admin-card {
          position: relative;
          border-radius: 24px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-height: 185px;
          background: rgba(255, 255, 255, 0.015) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          padding: 2.25rem 2rem !important;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important;
          overflow: hidden;
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.2);
        }
        .admin-card:hover {
          border-color: rgba(201, 168, 124, 0.35) !important;
          background: rgba(255, 255, 255, 0.03) !important;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6), 0 0 40px rgba(201, 168, 124, 0.08) !important;
          transform: translateY(-6px);
        }

        .admin-table-card {
          position: relative;
          border-radius: 24px;
          background: rgba(255, 255, 255, 0.01) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.05) !important;
          padding: 2.5rem 2rem !important;
          transition: border-color 0.4s ease !important;
          overflow: hidden;
        }
        .admin-table-card:hover {
          border-color: rgba(201, 168, 124, 0.18) !important;
        }

        .admin-login-card {
          position: relative;
          border-radius: 24px;
          width: 100%;
          min-height: 380px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          background: rgba(255, 255, 255, 0.02) !important;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border: 1px solid rgba(255, 255, 255, 0.07) !important;
          padding: 3.5rem 3rem !important;
        }

        /* Search Input styling */
        .admin-search-input {
          background: rgba(255, 255, 255, 0.02) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 12px !important;
          padding: 0.8rem 1rem 0.8rem 2.75rem !important;
          font-size: 0.75rem !important;
          font-family: var(--font-body), sans-serif !important;
          color: white !important;
          width: 100% !important;
          outline: none !important;
          transition: all 0.3s ease !important;
        }
        .admin-search-input:focus {
          border-color: var(--gold) !important;
          background: rgba(255, 255, 255, 0.05) !important;
          box-shadow: 0 0 20px rgba(201, 168, 124, 0.15) !important;
        }

        /* Table & Cards spacing */
        .admin-table-row {
          transition: background-color 0.2s ease;
        }
        .admin-table-row:hover {
          background-color: rgba(255, 255, 255, 0.015) !important;
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: var(--gold);
        }

        @media (max-width: 640px) {
          .admin-card {
            padding: 1.75rem 1.5rem !important;
            min-height: 160px;
          }
          .admin-table-card {
            padding: 1.5rem 1.25rem !important;
          }
          .admin-login-card {
            padding: 2.25rem 1.75rem !important;
          }
        }
      `}</style>

      {/* Root Ambient Mesh Background */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full ambient-glow-1 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full ambient-glow-2 blur-[120px]" />
        <div className="absolute top-[30%] right-[10%] w-[50%] h-[50%] rounded-full bg-[#8b5cf6]/[0.012] blur-[150px]" />
      </div>

      {/* Admin Navbar */}
      {isAuthenticated && (
        <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.05] bg-[#07070a]/70 backdrop-blur-md transition-all duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <a href="/" className="inline-flex items-center gap-2 transition-opacity hover:opacity-80">
              <img 
                src="/logo.png" 
                alt="Markera" 
                style={{ height: "28px", width: "auto" }} 
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  const fallbackLabel = e.currentTarget.nextSibling as HTMLElement;
                  if (fallbackLabel) fallbackLabel.style.display = 'block';
                }}
              />
              <span 
                className="admin-title text-xl font-bold tracking-tight text-white" 
                style={{ display: 'none' }}
              >
                Markera
              </span>
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-white/10 hover:border-[#c9a87c]/40 hover:bg-[#c9a87c]/5 text-white/70 hover:text-[#c9a87c] text-xs font-semibold tracking-wider uppercase font-utility transition-all cursor-pointer animate-fade-in"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </header>
      )}

      {!isAuthenticated ? (
        // Login Page
        <div className="flex min-h-screen items-center justify-center px-4 py-12 relative overflow-hidden z-10">
          <div className="w-full max-w-[450px]">
            <div className="text-center mb-8">
              <a href="/" className="inline-flex items-center gap-2 mb-4 transition-opacity hover:opacity-80">
                <img 
                  src="/logo.png" 
                  alt="Markera" 
                  style={{ height: "32px", width: "auto" }} 
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const fallbackLabel = e.currentTarget.nextSibling as HTMLElement;
                    if (fallbackLabel) fallbackLabel.style.display = 'block';
                  }}
                />
                <span 
                  className="admin-title text-2xl font-bold tracking-tight text-white mx-auto" 
                  style={{ display: 'none' }}
                >
                  Markera
                </span>
              </a>
              <span className="flex items-center justify-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#c9a87c] uppercase mb-3 font-utility">
                <ShieldCheck className="w-4 h-4" /> SECURE GATEWAY
              </span>
              <h1 className="text-3xl font-bold tracking-tight text-white admin-title">
                Admin Access
              </h1>
              <p className="mt-2 text-sm text-white/60 font-body">
                Enter your access credentials to view signups.
              </p>
            </div>

            <GlassCard className="admin-login-card">
              {/* Corner accent lights - matching landing page form */}
              <div style={{ position: "absolute", top: "1.5rem", left: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
              <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", left: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />
              <div style={{ position: "absolute", bottom: "1.5rem", right: "1.5rem", width: "5px", height: "5px", borderRadius: "50%", background: "#8b5cf6", boxShadow: "0 0 12px 2px rgba(139,92,246,0.6)" }} />

              <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", flexGrow: 1, justifyContent: "space-between" }}>
                <div>
                  <div className="laser-wrap" style={{ marginTop: "1rem" }}>
                    <input
                      id="pass"
                      type="password"
                      placeholder=" "
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="laser-input admin-laser-input"
                    />
                    <Lock className="w-4 h-4 text-white/30 absolute left-0 top-1/2 -translate-y-1/2" />
                    <span className="laser-label" style={{ left: "2rem" }}>Security Password</span>
                  </div>
                </div>

                <div>
                  {loginError && (
                    <div style={{
                      color: "#f87171",
                      fontSize: "0.85rem",
                      fontFamily: "DM Sans, sans-serif",
                      marginBottom: "1.5rem",
                      textAlign: "center",
                      background: "rgba(248, 113, 113, 0.05)",
                      border: "1px solid rgba(248, 113, 113, 0.15)",
                      padding: "10px",
                      borderRadius: "8px"
                    }}>
                      {loginError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loginLoading}
                    style={{
                      width: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "18px 0",
                      borderRadius: "16px",
                      background: "rgba(255,255,255,0.02)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: "white",
                      fontSize: "11px",
                      fontWeight: 600,
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontFamily: "Outfit, sans-serif",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.18)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                      e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                    }}
                  >
                    {loginLoading ? "Authorizing..." : "Access Dashboard"}
                  </button>
                </div>
              </form>
            </GlassCard>
          </div>
        </div>
      ) : (
        // Admin Dashboard
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-16 relative z-10">
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-white/10 pb-8 mb-12 gap-6 relative z-10">
            <div>
              <span className="section-label uppercase tracking-[0.25em] text-[10px] mb-2 block" style={{ color: "var(--gold)", fontFamily: "Outfit, sans-serif" }}>
                Management Portal
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mt-1 admin-title">
                Partner Signups
              </h1>
              <p className="text-sm text-white/55 font-body mt-2">
                Review and manage brand & creator applications.
              </p>
            </div>

            <div className="w-full md:w-auto shrink-0">
              <div className="relative w-full md:w-80">
                <input
                  type="text"
                  placeholder="Search signups..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="admin-search-input"
                />
                <Search className="w-4 h-4 text-white/30 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          {/* Metrics Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10 relative z-10">
            <GlassCard className="admin-card">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#c9a87c] uppercase font-utility">Total Submissions</p>
                <h3 className="text-5xl font-bold mt-4 font-utility text-white">{signups.length}</h3>
              </div>
              <p className="text-xs text-white/50 mt-4 font-body">All-time applications received</p>
            </GlassCard>

            <GlassCard className="admin-card">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#c9a87c] uppercase font-utility">Latest Application</p>
                <h3 className="text-lg font-semibold mt-4 text-white font-body truncate">
                  {signups.length > 0 ? signups[0].name : "No submissions"}
                </h3>
              </div>
              <p className="text-xs text-white/50 mt-4 font-body">
                {signups.length > 0 ? formatDate(signups[0].created_at) : "No submissions yet"}
              </p>
            </GlassCard>

            <GlassCard className="admin-card sm:col-span-2 lg:col-span-1">
              <div>
                <p className="text-[10px] font-semibold tracking-[0.2em] text-[#c9a87c] uppercase font-utility">Database Status</p>
                <h3 className="text-base font-semibold mt-4 text-emerald-400 font-body flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shadow-[0_0_10px_rgba(52,211,153,0.7)]" /> Connected
                </h3>
              </div>
              <p className="text-xs text-white/50 mt-4 font-body">Live synchronization with Supabase</p>
            </GlassCard>
          </div>

          {/* Submissions Table / List */}
          <GlassCard className="admin-table-card">
            {filteredSignups.length === 0 ? (
              <div className="text-center py-20 flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-[#c9a87c]/5 flex items-center justify-center border border-[#c9a87c]/10 mb-4" style={{ boxShadow: "0 0 20px rgba(201, 168, 124, 0.05)" }}>
                  <Mail className="w-5 h-5 text-[#c9a87c]" />
                </div>
                <h3 className="text-lg font-bold text-white font-body">No Signups Found</h3>
                <p className="text-xs text-white/50 max-w-sm mt-2 font-body leading-relaxed text-center">
                  {signups.length === 0 
                    ? "We haven't received any applications yet. Submissions from the contact form will show up here in real-time."
                    : "No submissions match your search query. Try adjusting your keywords."}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop View: Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-white/5 bg-white/[0.01]">
                        <th className="py-5 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Applicant</th>
                        <th className="py-5 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Contact Details</th>
                        <th className="py-5 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility">Submission Date</th>
                        <th className="py-5 px-6 text-[10px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility w-[40%]">Message / Goals</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.04]">
                      {filteredSignups.map((signup) => (
                        <tr
                          key={signup.id}
                          className="admin-table-row"
                        >
                          <td className="py-6 px-6 align-top">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-[#c9a87c]/5 flex items-center justify-center border border-[#c9a87c]/10">
                                <User className="w-3.5 h-3.5 text-[#c9a87c]" />
                              </div>
                              <span className="font-semibold text-sm text-white font-body">{signup.name}</span>
                            </div>
                          </td>

                          <td className="py-6 px-6 align-top">
                            <a
                              href={`mailto:${signup.email}`}
                              className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c9a87c] font-body transition-colors group"
                            >
                              <Mail className="w-3.5 h-3.5 text-white/30 group-hover:text-[#c9a87c]/60" />
                              {signup.email}
                            </a>
                          </td>

                          <td className="py-6 px-6 text-xs text-white/50 font-body align-top">
                            <div className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-white/30" />
                              {formatDate(signup.created_at)}
                            </div>
                          </td>

                          <td className="py-6 px-6 text-sm text-white/70 font-body leading-relaxed whitespace-pre-wrap align-top">
                            <div className="flex items-start gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                              <MessageSquare className="w-4 h-4 text-white/20 mt-0.5 shrink-0" />
                              <span>{signup.message}</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile/Tablet View: Cards */}
                <div className="md:hidden space-y-4 divide-y divide-white/[0.04]">
                  {filteredSignups.map((signup, index) => (
                    <div key={signup.id} className={`space-y-4 ${index > 0 ? "pt-6" : ""}`}>
                      <div className="flex justify-between items-start">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#c9a87c]/5 flex items-center justify-center border border-[#c9a87c]/10">
                            <User className="w-3.5 h-3.5 text-[#c9a87c]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-sm text-white font-body">{signup.name}</h4>
                            <span className="text-[10px] text-white/40 font-body flex items-center gap-1 mt-0.5">
                              <Calendar className="w-3 h-3 text-white/30" /> {formatDate(signup.created_at)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-3 pl-11">
                        <div>
                          <span className="text-[9px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility block mb-1">Contact Details</span>
                          <a
                            href={`mailto:${signup.email}`}
                            className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-[#c9a87c] font-body transition-colors break-all"
                          >
                            <Mail className="w-3.5 h-3.5 text-white/30" />
                            {signup.email}
                          </a>
                        </div>

                        <div>
                          <span className="text-[9px] font-semibold tracking-wider text-[#c9a87c] uppercase font-utility block mb-1">Message & Goals</span>
                          <div className="bg-white/[0.01] border border-white/5 rounded-xl p-3.5 text-xs text-white/70 leading-relaxed font-body whitespace-pre-wrap flex items-start gap-2 max-h-40 overflow-y-auto custom-scrollbar">
                            <MessageSquare className="w-3.5 h-3.5 text-white/20 mt-0.5 shrink-0" />
                            <span>{signup.message}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </GlassCard>
        </div>
      )}
    </div>
  );
}
