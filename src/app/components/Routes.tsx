import { useState } from "react";
import { Play, Pause, RotateCcw, ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";

type RouteStep = {
  id: number;
  location: string;
  resource: string;
  emoji: string;
  done: boolean;
  note: string;
};

type FarmRoute = {
  id: number;
  name: string;
  zone: string;
  duration: string;
  goldPerRun: string;
  color: string;
  steps: RouteStep[];
};

const routes: FarmRoute[] = [
  {
    id: 1,
    name: "Rota Rubedita Craglorn",
    zone: "Craglorn",
    duration: "45 min",
    goldPerRun: "~35k",
    color: "#f59e0b",
    steps: [
      { id: 1, location: "Belkarth Wayshrine", resource: "Ponto de início", emoji: "📍", done: false, note: "Respawna a cada 30min" },
      { id: 2, location: "Magne-Ge Vista", resource: "Rubedo Ore (3x)", emoji: "⛏️", done: false, note: "Cuidado com Atronachs" },
      { id: 3, location: "Rahni'Za Mine", resource: "Rubedo Ore (8x)", emoji: "⛏️", done: false, note: "Melhor spawn da rota" },
      { id: 4, location: "Shada's Tear", resource: "Nirnroot (5x)", emoji: "🌿", done: false, note: "Próximo à água" },
      { id: 5, location: "Skyreach Catacombs", resource: "Cofres (2x)", emoji: "📦", done: false, note: "Farm de sets também" },
      { id: 6, location: "Belkarth Wayshrine", resource: "Retorno base", emoji: "🏠", done: false, note: "Vender / Reiniciar" },
    ],
  },
  {
    id: 2,
    name: "Rota Alquimia Wrothgar",
    zone: "Wrothgar",
    duration: "30 min",
    goldPerRun: "~22k",
    color: "#4ade80",
    steps: [
      { id: 1, location: "Orsinium Wayshrine", resource: "Ponto de início", emoji: "📍", done: false, note: "" },
      { id: 2, location: "Old Orsinium", resource: "Columbine (12x)", emoji: "🌸", done: false, note: "Área densa" },
      { id: 3, location: "Frostbreak Fortress", resource: "Mountain Flower (8x)", emoji: "🌺", done: false, note: "" },
      { id: 4, location: "Morkul Plain", resource: "Nirnroot (4x)", emoji: "🌿", done: false, note: "Perto do lago" },
      { id: 5, location: "Orsinium Wayshrine", resource: "Retorno base", emoji: "🏠", done: false, note: "" },
    ],
  },
];

export function Routes() {
  const [expandedRoute, setExpandedRoute] = useState<number | null>(1);
  const [activeRoute, setActiveRoute] = useState<number | null>(null);
  const [routeSteps, setRouteSteps] = useState<Record<number, RouteStep[]>>(
    Object.fromEntries(routes.map((r) => [r.id, r.steps]))
  );
  const [timer, setTimer] = useState(0);
  const [timerActive, setTimerActive] = useState(false);

  const toggleStep = (routeId: number, stepId: number) => {
    setRouteSteps((prev) => ({
      ...prev,
      [routeId]: prev[routeId].map((s) =>
        s.id === stepId ? { ...s, done: !s.done } : s
      ),
    }));
  };

  const resetRoute = (routeId: number) => {
    setRouteSteps((prev) => ({
      ...prev,
      [routeId]: prev[routeId].map((s) => ({ ...s, done: false })),
    }));
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60).toString().padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div className="flex flex-col pb-4">
      <div className="px-4 pt-4 mb-4">
        <h2 className="text-white mb-1">Rotas de Farm</h2>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          Siga as etapas e maximize seu gold/hora
        </p>
      </div>

      {/* Timer Widget */}
      <div className="mx-4 mb-4 rounded-2xl p-4" style={{ background: "rgba(255,200,50,0.08)", border: "1px solid rgba(255,200,50,0.2)" }}>
        <p style={{ fontSize: "0.7rem", color: "rgba(255,200,50,0.7)" }} className="mb-2">Cronômetro de Sessão</p>
        <div className="flex items-center justify-between">
          <span className="text-white" style={{ fontSize: "2rem", fontFamily: "monospace" }}>
            {formatTime(timer)}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setTimerActive(!timerActive)}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: timerActive ? "rgba(239,68,68,0.2)" : "rgba(74,222,128,0.2)", border: `1px solid ${timerActive ? "#ef444466" : "#4ade8066"}` }}
            >
              {timerActive ? <Pause size={16} color="#ef4444" /> : <Play size={16} color="#4ade80" />}
            </button>
            <button
              onClick={() => { setTimer(0); setTimerActive(false); }}
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
            >
              <RotateCcw size={16} color="rgba(255,255,255,0.6)" />
            </button>
          </div>
        </div>
        {activeRoute && (
          <p style={{ fontSize: "0.7rem", color: "#4ade80" }} className="mt-2">
            ▶ {routes.find(r => r.id === activeRoute)?.name}
          </p>
        )}
      </div>

      {/* Routes */}
      <div className="flex flex-col gap-3 px-4">
        {routes.map((route) => {
          const steps = routeSteps[route.id];
          const doneCount = steps.filter((s) => s.done).length;
          const pct = Math.round((doneCount / steps.length) * 100);
          const isExpanded = expandedRoute === route.id;

          return (
            <div
              key={route.id}
              className="rounded-2xl overflow-hidden"
              style={{ border: `1px solid ${isExpanded ? route.color + "44" : "rgba(255,255,255,0.1)"}` }}
            >
              {/* Route Header */}
              <button
                className="w-full p-4 text-left"
                onClick={() => setExpandedRoute(isExpanded ? null : route.id)}
                style={{ background: `rgba(255,255,255,0.04)` }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ background: route.color, boxShadow: `0 0 6px ${route.color}` }}
                      />
                      <h4 className="text-white" style={{ fontSize: "0.85rem" }}>{route.name}</h4>
                    </div>
                    <div className="flex gap-3 mt-1.5">
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                        ⏱ {route.duration}
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "#ffd700" }}>
                        🪙 {route.goldPerRun}/run
                      </span>
                      <span style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>
                        📍 {route.zone}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="text-right">
                      <p style={{ fontSize: "0.7rem", color: route.color }}>{doneCount}/{steps.length}</p>
                      <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.3)" }}>{pct}%</p>
                    </div>
                    {isExpanded ? <ChevronUp size={14} color="rgba(255,255,255,0.4)" /> : <ChevronDown size={14} color="rgba(255,255,255,0.4)" />}
                  </div>
                </div>
                {/* Progress bar */}
                <div className="mt-3 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${route.color}88, ${route.color})` }}
                  />
                </div>
              </button>

              {/* Steps */}
              {isExpanded && (
                <div style={{ background: "rgba(0,0,0,0.2)" }}>
                  {steps.map((step, i) => (
                    <button
                      key={step.id}
                      onClick={() => toggleStep(route.id, step.id)}
                      className="w-full flex items-start gap-3 px-4 py-3 text-left"
                      style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
                    >
                      <div className="mt-0.5">
                        {step.done
                          ? <CheckCircle size={16} color={route.color} />
                          : <Circle size={16} color="rgba(255,255,255,0.3)" />
                        }
                      </div>
                      <div className="flex items-start gap-2 flex-1">
                        <span style={{ fontSize: "1rem" }}>{step.emoji}</span>
                        <div className="flex-1">
                          <p
                            className="text-white"
                            style={{
                              fontSize: "0.78rem",
                              textDecoration: step.done ? "line-through" : "none",
                              color: step.done ? "rgba(255,255,255,0.3)" : "white",
                            }}
                          >
                            {step.location}
                          </p>
                          <p style={{ fontSize: "0.68rem", color: step.done ? "rgba(255,255,255,0.2)" : route.color }}>
                            {step.resource}
                          </p>
                          {step.note && (
                            <p style={{ fontSize: "0.62rem", color: "rgba(255,255,255,0.3)", marginTop: 2 }}>
                              💡 {step.note}
                            </p>
                          )}
                        </div>
                        <span
                          className="text-xs rounded-full w-5 h-5 flex items-center justify-center"
                          style={{
                            background: "rgba(255,255,255,0.08)",
                            color: "rgba(255,255,255,0.4)",
                            fontSize: "0.6rem",
                          }}
                        >
                          {i + 1}
                        </span>
                      </div>
                    </button>
                  ))}

                  {/* Route Actions */}
                  <div className="flex gap-2 p-4" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
                    <button
                      onClick={() => { setActiveRoute(route.id); setTimerActive(true); }}
                      className="flex-1 py-2 rounded-xl"
                      style={{
                        background: `linear-gradient(135deg, ${route.color}cc, ${route.color})`,
                        color: "#000",
                        fontSize: "0.78rem",
                      }}
                    >
                      <Play size={12} className="inline mr-1" />
                      Iniciar Rota
                    </button>
                    <button
                      onClick={() => resetRoute(route.id)}
                      className="px-4 py-2 rounded-xl"
                      style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.6)", fontSize: "0.78rem" }}
                    >
                      <RotateCcw size={12} className="inline mr-1" />
                      Reset
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
