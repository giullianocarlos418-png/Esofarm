import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula autenticação
    setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-8" style={{ background: "linear-gradient(180deg, #0a0a0f 0%, #0d0d12 100%)" }}>
      {/* Decorative Background Pattern */}
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "radial-gradient(circle at 20px 20px, rgba(255,215,0,0.1) 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      
      {/* Logo Section */}
      <div className="relative z-10 mb-8 flex flex-col items-center">
        <div
          className="w-20 h-20 rounded-2xl flex items-center justify-center mb-4"
          style={{ 
            background: "linear-gradient(135deg, #f59e0b, #ffd700)",
            boxShadow: "0 0 40px rgba(255,215,0,0.3), inset 0 2px 4px rgba(255,255,255,0.4)"
          }}
        >
          <span style={{ fontSize: "2.5rem" }}>⚔️</span>
        </div>
        
        <h1 className="text-center mb-2" style={{ 
          fontSize: "1.8rem", 
          color: "#ffd700",
          letterSpacing: "0.1em",
          textShadow: "0 0 20px rgba(255,215,0,0.4)",
          fontFamily: "serif"
        }}>
          ESO FARM
        </h1>
        
        <p className="text-center" style={{ 
          fontSize: "0.8rem", 
          color: "rgba(255,255,255,0.5)",
          letterSpacing: "0.15em"
        }}>
          COMPANION APP
        </p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="w-full max-w-sm relative z-10">
        {/* Decorative Border */}
        <div 
          className="rounded-3xl p-px mb-6"
          style={{ 
            background: "linear-gradient(135deg, rgba(255,215,0,0.3), rgba(245,158,11,0.1))",
          }}
        >
          <div 
            className="rounded-3xl p-6"
            style={{ 
              background: "rgba(15,15,25,0.8)",
              backdropFilter: "blur(20px)"
            }}
          >
            {/* Email Input */}
            <div className="mb-4">
              <label 
                htmlFor="email" 
                className="block mb-2" 
                style={{ fontSize: "0.75rem", color: "#ffd700", letterSpacing: "0.05em" }}
              >
                EMAIL OU USUÁRIO
              </label>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{ 
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,200,50,0.2)",
                }}
              >
                <Mail size={18} style={{ color: "rgba(255,215,0,0.5)" }} />
                <input
                  id="email"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dragonborn@tamriel.com"
                  className="flex-1 bg-transparent outline-none"
                  style={{ 
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="mb-5">
              <label 
                htmlFor="password" 
                className="block mb-2" 
                style={{ fontSize: "0.75rem", color: "#ffd700", letterSpacing: "0.05em" }}
              >
                SENHA
              </label>
              <div 
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all"
                style={{ 
                  background: "rgba(0,0,0,0.4)",
                  border: "1px solid rgba(255,200,50,0.2)",
                }}
              >
                <Lock size={18} style={{ color: "rgba(255,215,0,0.5)" }} />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="flex-1 bg-transparent outline-none"
                  style={{ 
                    color: "#fff",
                    fontSize: "0.85rem",
                  }}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="transition-all"
                  style={{ color: "rgba(255,215,0,0.5)" }}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between mb-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer"
                  style={{ 
                    accentColor: "#ffd700",
                    cursor: "pointer"
                  }}
                />
                <span style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)" }}>
                  Lembrar de mim
                </span>
              </label>
              <button
                type="button"
                style={{ fontSize: "0.75rem", color: "#ffd700" }}
              >
                Esqueceu?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl transition-all"
              style={{ 
                background: isLoading 
                  ? "rgba(100,100,100,0.3)" 
                  : "linear-gradient(135deg, #f59e0b, #ffd700)",
                color: isLoading ? "rgba(255,255,255,0.3)" : "#000",
                fontSize: "0.9rem",
                letterSpacing: "0.08em",
                boxShadow: isLoading 
                  ? "none" 
                  : "0 4px 20px rgba(255,215,0,0.4)",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.6 : 1
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <div 
                    className="w-4 h-4 rounded-full border-2 border-t-transparent animate-spin"
                    style={{ borderColor: "rgba(0,0,0,0.3)", borderTopColor: "transparent" }}
                  />
                  <span>ENTRANDO...</span>
                </div>
              ) : (
                "ENTRAR NO REINO"
              )}
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 h-px" style={{ background: "rgba(255,200,50,0.15)" }} />
          <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)" }}>OU</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,200,50,0.15)" }} />
        </div>

        {/* Create Account Button */}
        <button
          type="button"
          className="w-full py-3 rounded-xl transition-all"
          style={{ 
            background: "rgba(255,200,50,0.08)",
            border: "1px solid rgba(255,200,50,0.3)",
            color: "#ffd700",
            fontSize: "0.85rem",
            letterSpacing: "0.05em"
          }}
        >
          CRIAR NOVA CONTA
        </button>
      </form>

      {/* Footer */}
      <div className="mt-8 text-center relative z-10">
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>
          © 2026 ESO Farm App • Não afiliado à Bethesda ou ZeniMax
        </p>
      </div>
    </div>
  );
}
