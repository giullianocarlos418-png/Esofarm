import { useState, useEffect } from "react";
import { Home, MapPin, Package, Navigation, User } from "lucide-react";
import { Dashboard } from "./components/Dashboard";
import { FarmLocations } from "./components/FarmLocations";
import { Resources } from "./components/Resources";
import { Routes } from "./components/Routes";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";

type Tab = "home" | "locations" | "resources" | "routes" | "profile";

const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Início", icon: <Home size={20} /> },
  { id: "locations", label: "Locais", icon: <MapPin size={20} /> },
  { id: "resources", label: "Recursos", icon: <Package size={20} /> },
  { id: "routes", label: "Rotas", icon: <Navigation size={20} /> },
  { id: "profile", label: "Perfil", icon: <User size={20} /> },
];

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState<Tab>("home");
  const [notification, setNotification] = useState<string | null>(null);

  useEffect(() => {
    if (isLoggedIn) {
      const timer = setTimeout(() => {
        setNotification("⏰ Rubedo Ore respawnou em Craglorn!");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (notification) {
      const t = setTimeout(() => setNotification(null), 4000);
      return () => clearTimeout(t);
    }
  }, [notification]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: "#0a0a0f" }}
    >
      {/* Mobile Frame */}
      <div
        className="relative flex flex-col overflow-hidden"
        style={{
          width: 390,
          height: 844,
          background: "#0d0d12",
          borderRadius: 40,
          boxShadow: "0 0 0 12px #1a1a2e, 0 0 0 14px #2a2a3e, 0 40px 80px rgba(0,0,0,0.8)",
        }}
      >
        {/* Status Bar */}
        <div
          className="flex items-center justify-between px-6 py-3 shrink-0"
          style={{ background: "rgba(0,0,0,0.4)" }}
        >
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.8)" }}>09:41</span>
          <div
            className="w-28 h-5 rounded-full"
            style={{ background: "#000", border: "1px solid rgba(255,255,255,0.1)" }}
          />
          <div className="flex items-center gap-1">
            {/* Signal */}
            <div className="flex items-end gap-0.5 h-3">
              {[1, 2, 3].map((b) => (
                <div
                  key={b}
                  style={{
                    width: 3,
                    height: 3 + b * 3,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            {/* Battery */}
            <div
              className="flex items-center"
              style={{ border: "1px solid rgba(255,255,255,0.5)", borderRadius: 2, padding: "1px 2px", gap: 1 }}
            >
              <div style={{ width: 16, height: 8, background: "#4ade80", borderRadius: 1 }} />
              <div style={{ width: 2, height: 4, background: "rgba(255,255,255,0.5)", borderRadius: 1 }} />
            </div>
          </div>
        </div>

        {isLoggedIn && (
          /* Top Bar */
          <div
            className="flex items-center justify-between px-5 py-3 shrink-0"
            style={{
              background: "rgba(0,0,0,0.5)",
              borderBottom: "1px solid rgba(255,200,50,0.1)",
            }}
          >
            <div className="flex items-center gap-2">
              <div
                className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #f59e0b, #ffd700)" }}
              >
                <span style={{ fontSize: "1rem" }}>⚔️</span>
              </div>
              <div>
                <span className="text-white" style={{ fontSize: "0.9rem", letterSpacing: "0.05em" }}>
                  ESO <span style={{ color: "#ffd700" }}>FARM</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="px-2.5 py-1 rounded-full flex items-center gap-1"
                style={{ background: "rgba(255,200,50,0.12)", border: "1px solid rgba(255,200,50,0.25)" }}
              >
                <span style={{ fontSize: "0.7rem" }}>🪙</span>
                <span style={{ fontSize: "0.72rem", color: "#ffd700" }}>48.350</span>
              </div>
              <div
                className="w-2 h-2 rounded-full"
                style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }}
              />
            </div>
          </div>
        )}

        {/* Notification Toast */}
        {isLoggedIn && notification && (
          <div
            className="absolute top-24 left-4 right-4 z-50 rounded-2xl px-4 py-3 flex items-center gap-3"
            style={{
              background: "rgba(15,15,25,0.95)",
              border: "1px solid rgba(255,200,50,0.3)",
              boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
              backdropFilter: "blur(12px)",
              animation: "slideDown 0.3s ease",
            }}
          >
            <span style={{ fontSize: "1.2rem" }}>🔔</span>
            <div className="flex-1">
              <p className="text-white" style={{ fontSize: "0.78rem" }}>{notification}</p>
              <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.4)" }}>ESO Farm App</p>
            </div>
            <button onClick={() => setNotification(null)} style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.7rem" }}>✕</button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto" style={{ scrollbarWidth: "none" }}>
          {!isLoggedIn ? (
            <Login onLogin={handleLogin} />
          ) : (
            <>
              {activeTab === "home" && <Dashboard />}
              {activeTab === "locations" && <FarmLocations />}
              {activeTab === "resources" && <Resources />}
              {activeTab === "routes" && <Routes />}
              {activeTab === "profile" && <Profile />}
            </>
          )}
        </div>

        {isLoggedIn && (
          /* Bottom Navigation */
          <div
            className="shrink-0 flex items-center pb-4 pt-2 px-2"
            style={{
              background: "rgba(0,0,0,0.6)",
              borderTop: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className="flex-1 flex flex-col items-center gap-1 py-1 rounded-xl transition-all"
                  style={{ color: isActive ? "#ffd700" : "rgba(255,255,255,0.35)" }}
                >
                  <div
                    className="p-1.5 rounded-xl transition-all"
                    style={{
                      background: isActive ? "rgba(255,200,50,0.15)" : "transparent",
                      boxShadow: isActive ? "0 0 12px rgba(255,200,50,0.2)" : "none",
                    }}
                  >
                    {tab.icon}
                  </div>
                  <span
                    style={{
                      fontSize: "0.58rem",
                      color: isActive ? "#ffd700" : "rgba(255,255,255,0.35)",
                    }}
                  >
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      <style>{`
        @keyframes slideDown {
          from { transform: translateY(-20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}
