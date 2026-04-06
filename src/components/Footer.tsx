"use client";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative z-10 w-full flex flex-col items-center" style={{ paddingTop: "10rem" }}>
      {/* Scroll to Top Button */}
      <div 
        className="cursor-pointer group flex items-center justify-center rounded-full transition-all duration-500"
        style={{ 
          width: "42px", 
          height: "42px", 
          border: "1px solid rgba(255,255,255,0.2)",
          marginBottom: "4rem", 
          background: "#050505" 
        }}
        onClick={scrollToTop}
      >
        <div 
          className="w-[4px] h-[4px] rounded-full bg-white transition-all duration-300 group-hover:scale-150"
          style={{ boxShadow: "0 0 10px rgba(255,255,255,0.5)" }}
        />
      </div>



      {/* Footer Content */}
      <div style={{ width: "100%", maxWidth: "1100px", margin: "0 auto", padding: "4rem 1.5rem 2rem" }}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-start" style={{ gap: "3rem" }}>
          {/* Brand */}
          <div>
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToTop(); }}
              className="inline-block"
              style={{ marginBottom: "0.75rem" }}
            >
              <img src="/logo.png" alt="Markera" style={{ height: "32px", width: "auto" }} />
            </a>
            <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.8rem", fontFamily: "DM Sans, sans-serif", marginTop: "0.5rem" }}>
              Make your Mark
            </p>
          </div>

          {/* Links columns */}
          <div className="flex" style={{ gap: "5rem" }}>
            <div>
              <h4 className="uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontFamily: "Outfit, sans-serif", marginBottom: "1.25rem" }}>Navigate</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {[{ label: "Expertise", href: "#expertise" }, { label: "Philosophy", href: "#philosophy" }, { label: "Contact", href: "#contact" }].map(l => (
                  <li key={l.label}>
                    <button onClick={() => scrollTo(l.href)} className="bg-transparent border-0 p-0 transition-colors duration-300 hover:text-white" style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontFamily: "DM Sans, sans-serif" }}>{l.label}</button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="uppercase" style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.3)", fontFamily: "Outfit, sans-serif", marginBottom: "1.25rem" }}>Contact</h4>
              <a 
                href="mailto:sully@markera-media.com" 
                className="transition-colors duration-300 hover:text-white"
                style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.8rem", fontFamily: "DM Sans, sans-serif", textDecoration: "none" }}
              >
                sully@markera-media.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ width: "100%", padding: "1.5rem 0", display: "flex", justifyContent: "center", alignItems: "center", gap: "2rem" }}>
        <a 
          href="https://www.instagram.com/markeramedia" 
          target="_blank" 
          rel="noreferrer"
          className="uppercase transition-colors duration-300 hover:text-white"
          style={{ 
            fontSize: "10px", 
            letterSpacing: "0.25em", 
            color: "rgba(255,255,255,0.3)", 
            fontFamily: "Outfit, sans-serif", 
            textDecoration: "none" 
          }}
        >
          Instagram
        </a>
        <span style={{ color: "rgba(255,255,255,0.1)" }}>·</span>
        <p 
          className="uppercase"
          style={{ 
            fontSize: "9px", 
            letterSpacing: "0.15em", 
            color: "rgba(255,255,255,0.2)", 
            fontFamily: "Outfit, sans-serif" 
          }}
        >
          © 2026 Markera Media. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
