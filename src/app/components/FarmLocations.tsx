import { useState } from "react";
import { MapPin, ChevronRight, Star, Users, Clock, Filter } from "lucide-react";

const zones = [
  {
    id: 1,
    name: "Craglorn",
    region: "Hammerfell",
    difficulty: "Veterano",
    diffColor: "#ef4444",
    rating: 4.8,
    players: 234,
    goldPerHour: "85k–120k",
    image: "https://images.unsplash.com/photo-1677295922463-147d7f2f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    resources: ["⛏️ Rubedita", "🌿 Nirnroot", "💎 Gems"],
    tags: ["Melhor Gold", "Popular"],
    tagColors: ["#ffd700", "#60a5fa"],
    bestTime: "00:00 – 06:00",
  },
  {
    id: 2,
    name: "Wrothgar",
    region: "Orsinium",
    difficulty: "Intermediário",
    diffColor: "#f59e0b",
    rating: 4.5,
    players: 156,
    goldPerHour: "55k–80k",
    image: "https://images.unsplash.com/photo-1672834885306-0524883bbed9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    resources: ["⚔️ Sets Raros", "🧪 Reagentes", "📦 Cofres"],
    tags: ["Sets Raros"],
    tagColors: ["#8b5cf6"],
    bestTime: "18:00 – 22:00",
  },
  {
    id: 3,
    name: "Grahtwood",
    region: "Aldmeri Dominion",
    difficulty: "Iniciante",
    diffColor: "#4ade80",
    rating: 4.2,
    players: 89,
    goldPerHour: "30k–50k",
    image: "https://images.unsplash.com/photo-1688031135800-6b20352a3512?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    resources: ["🌿 Ervas", "🪵 Madeira", "🧵 Fibras"],
    tags: ["Iniciante", "Crafting"],
    tagColors: ["#4ade80", "#f59e0b"],
    bestTime: "Qualquer horário",
  },
  {
    id: 4,
    name: "Clockwork City",
    region: "Sotha Sil",
    difficulty: "Veterano",
    diffColor: "#ef4444",
    rating: 4.6,
    players: 178,
    goldPerHour: "70k–100k",
    image: "https://images.unsplash.com/photo-1677295922463-147d7f2f718c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    resources: ["⚙️ Componentes", "📿 Motifs", "💫 XP Rápido"],
    tags: ["XP Rápido", "Motifs"],
    tagColors: ["#f97316", "#8b5cf6"],
    bestTime: "12:00 – 16:00",
  },
];

const filters = ["Todos", "Veterano", "Intermediário", "Iniciante"];

export function FarmLocations() {
  const [activeFilter, setActiveFilter] = useState("Todos");
  const [selectedZone, setSelectedZone] = useState<number | null>(null);

  const filtered = activeFilter === "Todos"
    ? zones
    : zones.filter((z) => z.difficulty === activeFilter);

  if (selectedZone !== null) {
    const zone = zones.find((z) => z.id === selectedZone)!;
    return (
      <div className="flex flex-col pb-4">
        {/* Zone Detail */}
        <div className="relative h-44">
          <img
            src={zone.image}
            alt={zone.name}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent 30%, #0d0d0d 100%)" }}
          />
          <button
            onClick={() => setSelectedZone(null)}
            className="absolute top-4 left-4 px-3 py-1 rounded-full text-white"
            style={{ background: "rgba(0,0,0,0.6)", fontSize: "0.75rem", border: "1px solid rgba(255,255,255,0.2)" }}
          >
            ← Voltar
          </button>
          <div className="absolute bottom-4 left-4">
            <h2 className="text-white" style={{ fontSize: "1.3rem" }}>{zone.name}</h2>
            <p style={{ fontSize: "0.75rem", color: "rgba(255,200,50,0.8)" }}>{zone.region}</p>
          </div>
        </div>

        <div className="flex flex-col gap-4 px-4 mt-4">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Gold/hora", value: zone.goldPerHour, color: "#ffd700" },
              { label: "Jogadores", value: zone.players.toString(), color: "#60a5fa" },
              { label: "Rating", value: `⭐ ${zone.rating}`, color: "#f59e0b" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-xl p-3 text-center"
                style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
              >
                <p style={{ fontSize: "0.75rem", color: s.color }}>{s.value}</p>
                <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</p>
              </div>
            ))}
          </div>

          {/* Resources */}
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <h4 className="text-white mb-3" style={{ fontSize: "0.85rem" }}>Recursos Disponíveis</h4>
            <div className="flex flex-col gap-2">
              {zone.resources.map((r) => (
                <div key={r} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#ffd700" }} />
                  <span style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.8)" }}>{r}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Best Time */}
          <div
            className="rounded-xl p-4 flex items-center gap-3"
            style={{ background: "rgba(255,200,50,0.08)", border: "1px solid rgba(255,200,50,0.2)" }}
          >
            <Clock size={20} color="#ffd700" />
            <div>
              <p className="text-white" style={{ fontSize: "0.8rem" }}>Melhor Horário</p>
              <p style={{ fontSize: "0.75rem", color: "rgba(255,200,50,0.8)" }}>{zone.bestTime}</p>
            </div>
          </div>

          {/* Difficulty */}
          <div
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <div>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)" }}>Dificuldade</p>
                <p style={{ fontSize: "0.9rem", color: zone.diffColor, marginTop: 2 }}>{zone.difficulty}</p>
              </div>
              <div className="flex gap-1">
                {zone.tags.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: "0.6rem",
                      background: `${zone.tagColors[i]}22`,
                      color: zone.tagColors[i],
                      border: `1px solid ${zone.tagColors[i]}44`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <button
            className="w-full py-3 rounded-xl text-black"
            style={{
              background: "linear-gradient(135deg, #ffd700, #f59e0b)",
              fontSize: "0.85rem",
            }}
          >
            ⚔️ Iniciar Farm Nesta Zona
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col pb-4">
      {/* Header */}
      <div className="px-4 pt-4 mb-4">
        <h2 className="text-white mb-1">Locais de Farm</h2>
        <p style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.4)" }}>
          {zones.length} zonas disponíveis
        </p>
      </div>

      {/* Filters */}
      <div className="px-4 mb-4 flex gap-2 overflow-x-auto pb-1">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className="whitespace-nowrap px-4 py-1.5 rounded-full transition-all"
            style={{
              fontSize: "0.75rem",
              background: activeFilter === f ? "linear-gradient(135deg, #ffd700, #f59e0b)" : "rgba(255,255,255,0.06)",
              color: activeFilter === f ? "#000" : "rgba(255,255,255,0.6)",
              border: activeFilter === f ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {f}
          </button>
        ))}
        <button
          className="flex items-center gap-1 px-3 py-1.5 rounded-full"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Filter size={12} color="rgba(255,255,255,0.6)" />
        </button>
      </div>

      {/* Zone Cards */}
      <div className="flex flex-col gap-3 px-4">
        {filtered.map((zone) => (
          <button
            key={zone.id}
            onClick={() => setSelectedZone(zone.id)}
            className="text-left rounded-2xl overflow-hidden"
            style={{ border: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="relative h-28">
              <img
                src={zone.image}
                alt={zone.name}
                className="w-full h-full object-cover"
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(to right, rgba(0,0,0,0.7) 0%, transparent 60%)" }}
              />
              <div className="absolute top-3 left-3">
                <h3 className="text-white" style={{ fontSize: "0.95rem" }}>{zone.name}</h3>
                <div className="flex items-center gap-1 mt-0.5">
                  <MapPin size={10} color="rgba(255,200,50,0.8)" />
                  <span style={{ fontSize: "0.65rem", color: "rgba(255,200,50,0.8)" }}>{zone.region}</span>
                </div>
              </div>
              <div className="absolute top-3 right-3 flex gap-1 flex-col items-end">
                <span
                  className="px-2 py-0.5 rounded-full"
                  style={{
                    fontSize: "0.6rem",
                    background: `${zone.diffColor}22`,
                    color: zone.diffColor,
                    border: `1px solid ${zone.diffColor}55`,
                  }}
                >
                  {zone.difficulty}
                </span>
                {zone.tags.slice(0, 1).map((tag, i) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded-full"
                    style={{
                      fontSize: "0.6rem",
                      background: `${zone.tagColors[i]}22`,
                      color: zone.tagColors[i],
                      border: `1px solid ${zone.tagColors[i]}44`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{ background: "rgba(255,255,255,0.04)" }}
            >
              <div className="flex items-center gap-4">
                <div>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Gold/hora</p>
                  <p style={{ fontSize: "0.8rem", color: "#ffd700" }}>{zone.goldPerHour}</p>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Jogadores</p>
                  <div className="flex items-center gap-1">
                    <Users size={10} color="#60a5fa" />
                    <p style={{ fontSize: "0.8rem", color: "#60a5fa" }}>{zone.players}</p>
                  </div>
                </div>
                <div>
                  <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.4)" }}>Rating</p>
                  <div className="flex items-center gap-1">
                    <Star size={10} fill="#f59e0b" stroke="#f59e0b" />
                    <p style={{ fontSize: "0.8rem", color: "#f59e0b" }}>{zone.rating}</p>
                  </div>
                </div>
              </div>
              <ChevronRight size={16} color="rgba(255,255,255,0.3)" />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
