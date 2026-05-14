import { useState } from "react";
import { Sword, Coins, TrendingUp, Clock, Star, ChevronRight, Flame, Zap } from "lucide-react";

const dailyGoals = [
  { id: 1, name: "Coletar Nirnroot", current: 34, target: 50, color: "#4ade80", icon: "🌿" },
  { id: 2, name: "Minerar Rubedita", current: 12, target: 20, color: "#f59e0b", icon: "⛏️" },
  { id: 3, name: "Matar Inimigos", current: 87, target: 100, color: "#ef4444", icon: "⚔️" },
  { id: 4, name: "Fazer Poções", current: 5, target: 15, color: "#8b5cf6", icon: "🧪" },
];

const recentActivity = [
  { id: 1, item: "Rubedo Ore", qty: "+15", time: "há 2min", color: "#f59e0b" },
  { id: 2, item: "Nirnroot", qty: "+8", time: "há 5min", color: "#4ade80" },
  { id: 3, item: "Columbine", qty: "+22", time: "há 12min", color: "#60a5fa" },
  { id: 4, item: "Gold Earned", qty: "+4.200", time: "há 20min", color: "#ffd700" },
];

export function Dashboard() {
  const [goldToday] = useState(48350);
  const [goldTotal] = useState(2847200);

  return (
    <div className="flex flex-col gap-4 pb-4">
      {/* Hero Banner */}
      <div
        className="relative mx-4 mt-4 rounded-2xl overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 40%, #1a0800 100%)",
          border: "1px solid rgba(255,200,50,0.2)",
        }}
      >
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1677295922463-147d7f2f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080)`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="relative p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs" style={{ color: "rgba(255,200,50,0.7)" }}>Bem-vindo de volta,</p>
              <h2 className="text-white" style={{ fontSize: "1.1rem" }}>DragonKnight_BR</h2>
              <div className="flex items-center gap-1 mt-1">
                <Star size={10} fill="#ffd700" stroke="#ffd700" />
                <Star size={10} fill="#ffd700" stroke="#ffd700" />
                <Star size={10} fill="#ffd700" stroke="#ffd700" />
                <Star size={10} fill="#ffd700" stroke="#ffd700" />
                <Star size={10} fill="transparent" stroke="#ffd700" />
                <span className="text-xs ml-1" style={{ color: "rgba(255,200,50,0.7)" }}>CP 1.240</span>
              </div>
            </div>
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center"
              style={{ background: "rgba(255,200,50,0.15)", border: "2px solid rgba(255,200,50,0.4)" }}
            >
              <Sword size={24} color="#ffd700" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-2">
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,200,50,0.15)" }}
            >
              <p className="text-xs mb-1" style={{ color: "rgba(255,200,50,0.6)" }}>Gold Hoje</p>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: "1rem", color: "#ffd700" }}>🪙</span>
                <span className="text-white" style={{ fontSize: "0.95rem" }}>{goldToday.toLocaleString("pt-BR")}</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <TrendingUp size={10} color="#4ade80" />
                <span style={{ fontSize: "0.65rem", color: "#4ade80" }}>+12% vs ontem</span>
              </div>
            </div>
            <div
              className="rounded-xl p-3"
              style={{ background: "rgba(0,0,0,0.4)", border: "1px solid rgba(255,200,50,0.15)" }}
            >
              <p className="text-xs mb-1" style={{ color: "rgba(255,200,50,0.6)" }}>Total Acumulado</p>
              <div className="flex items-center gap-1">
                <span style={{ fontSize: "1rem", color: "#ffd700" }}>💰</span>
                <span className="text-white" style={{ fontSize: "0.95rem" }}>{(goldTotal / 1000).toFixed(1)}k</span>
              </div>
              <div className="flex items-center gap-1 mt-1">
                <Flame size={10} color="#f97316" />
                <span style={{ fontSize: "0.65rem", color: "#f97316" }}>Sequência de 7 dias</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Daily Goals */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white" style={{ fontSize: "0.9rem" }}>Metas do Dia</h3>
          <span style={{ fontSize: "0.7rem", color: "rgba(255,200,50,0.7)" }}>
            <Clock size={10} className="inline mr-1" />Reseta em 04:32:18
          </span>
        </div>
        <div className="flex flex-col gap-3">
          {dailyGoals.map((goal) => {
            const pct = Math.round((goal.current / goal.target) * 100);
            return (
              <div
                key={goal.id}
                className="rounded-xl p-3"
                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span style={{ fontSize: "1.1rem" }}>{goal.icon}</span>
                    <span className="text-white" style={{ fontSize: "0.8rem" }}>{goal.name}</span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: goal.color }}>
                    {goal.current}/{goal.target}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      background: `linear-gradient(90deg, ${goal.color}88, ${goal.color})`,
                      boxShadow: `0 0 8px ${goal.color}66`,
                    }}
                  />
                </div>
                <div className="flex justify-end mt-1">
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{pct}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mx-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-white" style={{ fontSize: "0.9rem" }}>Atividade Recente</h3>
          <button className="flex items-center gap-1" style={{ color: "rgba(255,200,50,0.7)", fontSize: "0.7rem" }}>
            Ver tudo <ChevronRight size={12} />
          </button>
        </div>
        <div
          className="rounded-xl overflow-hidden"
          style={{ border: "1px solid rgba(255,255,255,0.08)" }}
        >
          {recentActivity.map((item, i) => (
            <div
              key={item.id}
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "transparent",
                borderBottom: i < recentActivity.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ background: item.color, boxShadow: `0 0 6px ${item.color}` }}
                />
                <span className="text-white" style={{ fontSize: "0.8rem" }}>{item.item}</span>
              </div>
              <div className="text-right">
                <p style={{ fontSize: "0.8rem", color: item.color }}>{item.qty}</p>
                <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.3)" }}>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="mx-4">
        <h3 className="text-white mb-3" style={{ fontSize: "0.9rem" }}>Estatísticas Rápidas</h3>
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Sessão", value: "2h 34m", icon: <Clock size={14} color="#60a5fa" />, color: "#60a5fa" },
            { label: "Eficiência", value: "94%", icon: <Zap size={14} color="#ffd700" />, color: "#ffd700" },
            { label: "Itens/h", value: "284", icon: <TrendingUp size={14} color="#4ade80" />, color: "#4ade80" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl p-3 text-center"
              style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div className="flex justify-center mb-1">{stat.icon}</div>
              <p style={{ fontSize: "0.9rem", color: stat.color }}>{stat.value}</p>
              <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
