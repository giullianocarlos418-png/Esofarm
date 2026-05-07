import { useState } from "react";
import { Award, Settings, Bell, Shield, ChevronRight, Edit3, BarChart2 } from "lucide-react";

const achievements = [
  { id: 1, name: "Minerador de Elite", desc: "Minerou 10.000 itens", emoji: "⛏️", done: true, color: "#ffd700" },
  { id: 2, name: "Alquimista Mestre", desc: "Produziu 1.000 poções", emoji: "🧪", done: true, color: "#4ade80" },
  { id: 3, name: "Rico de Tamriel", desc: "Acumulou 1M de Gold", emoji: "💰", done: true, color: "#f59e0b" },
  { id: 4, name: "Explorador", desc: "Visitou todas as zonas", emoji: "🗺️", done: false, color: "#60a5fa" },
  { id: 5, name: "Rei do Farm", desc: "10M de gold total", emoji: "👑", done: false, color: "#a78bfa" },
];

const weeklyData = [
  { day: "Seg", gold: 32000 },
  { day: "Ter", gold: 45000 },
  { day: "Qua", gold: 28000 },
  { day: "Qui", gold: 58000 },
  { day: "Sex", gold: 72000 },
  { day: "Sab", gold: 95000 },
  { day: "Dom", gold: 48000 },
];

const maxGold = Math.max(...weeklyData.map((d) => d.gold));

export function Profile() {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [respawnAlert, setRespawnAlert] = useState(true);

  return (
    <div className="flex flex-col pb-4">
      {/* Profile Card */}
      <div
        className="mx-4 mt-4 rounded-2xl p-5 relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1a0a00 0%, #2d1200 100%)", border: "1px solid rgba(255,200,50,0.2)" }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ background: "rgba(255,200,50,0.15)", border: "2px solid rgba(255,200,50,0.4)" }}
            >
              <span style={{ fontSize: "1.8rem" }}>⚔️</span>
            </div>
            <div>
              <h2 className="text-white">DragonKnight_BR</h2>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,200,50,0.7)" }}>Champion Point 1.240</p>
              <div className="flex gap-2 mt-2">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ fontSize: "0.6rem", background: "rgba(255,100,0,0.2)", color: "#f97316", border: "1px solid rgba(255,100,0,0.3)" }}
                >
                  🔥 DragonKnight
                </span>
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{ fontSize: "0.6rem", background: "rgba(139,92,246,0.2)", color: "#a78bfa", border: "1px solid rgba(139,92,246,0.3)" }}
                >
                  Ebonheart Pact
                </span>
              </div>
            </div>
          </div>
          <button
            className="w-8 h-8 rounded-xl flex items-center justify-center"
            style={{ background: "rgba(255,255,255,0.1)" }}
          >
            <Edit3 size={14} color="rgba(255,255,255,0.6)" />
          </button>
        </div>

        {/* Level Bar */}
        <div className="mt-4">
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Progresso do Capítulo</span>
            <span style={{ fontSize: "0.65rem", color: "#ffd700" }}>1.240 / 3.600 CP</span>
          </div>
          <div className="h-2 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.1)" }}>
            <div
              className="h-full rounded-full"
              style={{ width: "34%", background: "linear-gradient(90deg, #f59e0b, #ffd700)", boxShadow: "0 0 8px #ffd70066" }}
            />
          </div>
        </div>
      </div>

      {/* Weekly Chart */}
      <div className="mx-4 mt-4 rounded-2xl p-4" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div className="flex items-center gap-2 mb-4">
          <BarChart2 size={16} color="#ffd700" />
          <h4 className="text-white" style={{ fontSize: "0.85rem" }}>Gold por Dia (Semana)</h4>
        </div>
        <div className="flex items-end gap-2 h-20">
          {weeklyData.map((d) => (
            <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
              <div className="w-full rounded-t-lg relative" style={{ height: `${(d.gold / maxGold) * 72}px`, background: "linear-gradient(to top, #f59e0b, #ffd700)", boxShadow: "0 0 8px #ffd70033" }} />
              <span style={{ fontSize: "0.55rem", color: "rgba(255,255,255,0.4)" }}>{d.day}</span>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div>
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Total da Semana</p>
            <p style={{ fontSize: "0.85rem", color: "#ffd700" }}>🪙 378.000</p>
          </div>
          <div className="text-right">
            <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Média/dia</p>
            <p style={{ fontSize: "0.85rem", color: "#4ade80" }}>🪙 54.000</p>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Award size={16} color="#ffd700" />
          <h4 className="text-white" style={{ fontSize: "0.85rem" }}>Conquistas</h4>
          <span
            className="ml-auto px-2 py-0.5 rounded-full"
            style={{ fontSize: "0.6rem", background: "rgba(255,200,50,0.15)", color: "#ffd700", border: "1px solid rgba(255,200,50,0.3)" }}
          >
            {achievements.filter((a) => a.done).length}/{achievements.length}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {achievements.map((ach) => (
            <div
              key={ach.id}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: ach.done ? `${ach.color}0d` : "rgba(255,255,255,0.03)",
                border: `1px solid ${ach.done ? ach.color + "33" : "rgba(255,255,255,0.07)"}`,
                opacity: ach.done ? 1 : 0.5,
              }}
            >
              <span style={{ fontSize: "1.2rem", filter: ach.done ? "none" : "grayscale(1)" }}>{ach.emoji}</span>
              <div className="flex-1">
                <p className="text-white" style={{ fontSize: "0.78rem" }}>{ach.name}</p>
                <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>{ach.desc}</p>
              </div>
              {ach.done && (
                <span style={{ fontSize: "0.6rem", color: ach.color, background: `${ach.color}18`, border: `1px solid ${ach.color}33` }} className="px-2 py-0.5 rounded-full">
                  ✓ Desbloqueada
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Settings */}
      <div className="mx-4 mt-4">
        <div className="flex items-center gap-2 mb-3">
          <Settings size={16} color="#ffd700" />
          <h4 className="text-white" style={{ fontSize: "0.85rem" }}>Configurações</h4>
        </div>
        <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(255,255,255,0.08)" }}>
          {[
            { label: "Notificações", icon: <Bell size={14} />, value: notifications, set: setNotifications },
            { label: "Modo Escuro", icon: <Shield size={14} />, value: darkMode, set: setDarkMode },
            { label: "Alerta de Respawn", icon: <Bell size={14} />, value: respawnAlert, set: setRespawnAlert },
          ].map((setting, i, arr) => (
            <div
              key={setting.label}
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: i % 2 === 0 ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.01)",
                borderBottom: i < arr.length - 1 ? "1px solid rgba(255,255,255,0.06)" : "none",
              }}
            >
              <div className="flex items-center gap-3">
                <span style={{ color: "rgba(255,255,255,0.5)" }}>{setting.icon}</span>
                <span className="text-white" style={{ fontSize: "0.82rem" }}>{setting.label}</span>
              </div>
              <button
                onClick={() => setting.set(!setting.value)}
                className="w-11 h-6 rounded-full relative transition-all"
                style={{ background: setting.value ? "linear-gradient(135deg, #f59e0b, #ffd700)" : "rgba(255,255,255,0.15)" }}
              >
                <div
                  className="absolute top-0.5 w-5 h-5 rounded-full bg-white transition-all"
                  style={{ left: setting.value ? "calc(100% - 1.375rem)" : "0.125rem" }}
                />
              </button>
            </div>
          ))}

          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
          >
            <div className="flex items-center gap-3">
              <Settings size={14} color="rgba(255,255,255,0.5)" />
              <span className="text-white" style={{ fontSize: "0.82rem" }}>Configurações Avançadas</span>
            </div>
            <ChevronRight size={14} color="rgba(255,255,255,0.3)" />
          </div>
        </div>
      </div>

      {/* Version */}
      <div className="text-center mt-6">
        <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.2)" }}>ESO Farm App v2.1.0 • By ESO Brasil Community</p>
      </div>
    </div>
  );
}
