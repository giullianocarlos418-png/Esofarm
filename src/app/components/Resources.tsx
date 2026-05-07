import { useState } from "react";
import { Plus, Minus, TrendingUp, Package, Search } from "lucide-react";

type Resource = {
  id: number;
  name: string;
  emoji: string;
  qty: number;
  price: number;
  category: string;
  color: string;
  change: number;
};

const initialResources: Resource[] = [
  { id: 1, name: "Rubedo Ore", emoji: "⛏️", qty: 482, price: 180, category: "Mineração", color: "#f59e0b", change: 12 },
  { id: 2, name: "Nirnroot", emoji: "🌿", qty: 134, price: 650, category: "Alquimia", color: "#4ade80", change: -5 },
  { id: 3, name: "Columbine", emoji: "🌸", qty: 267, price: 320, category: "Alquimia", color: "#f472b6", change: 8 },
  { id: 4, name: "Ruby Ash Wood", emoji: "🪵", qty: 93, price: 140, category: "Carpintaria", color: "#92400e", change: 3 },
  { id: 5, name: "Ancestor Silk", emoji: "🧵", qty: 55, price: 210, category: "Costura", color: "#818cf8", change: -2 },
  { id: 6, name: "Grand Soul Gem", emoji: "💎", qty: 28, price: 4500, category: "Encantamento", color: "#a78bfa", change: 21 },
  { id: 7, name: "Dreugh Wax", emoji: "🐚", qty: 14, price: 8200, category: "Forja", color: "#7dd3fc", change: -8 },
  { id: 8, name: "Hakeijo", emoji: "✨", qty: 6, price: 15000, category: "Runas", color: "#fde68a", change: 35 },
];

const categories = ["Todos", "Mineração", "Alquimia", "Carpintaria", "Costura", "Encantamento", "Forja", "Runas"];

export function Resources() {
  const [resources, setResources] = useState<Resource[]>(initialResources);
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [search, setSearch] = useState("");

  const filtered = resources.filter((r) => {
    const matchCat = activeCategory === "Todos" || r.category === activeCategory;
    const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const totalValue = resources.reduce((acc, r) => acc + r.qty * r.price, 0);

  const adjust = (id: number, delta: number) => {
    setResources((prev) =>
      prev.map((r) => r.id === id ? { ...r, qty: Math.max(0, r.qty + delta) } : r)
    );
  };

  return (
    <div className="flex flex-col pb-4">
      {/* Header */}
      <div className="px-4 pt-4 mb-4">
        <h2 className="text-white mb-1">Inventário de Recursos</h2>
        <div className="flex items-center gap-2">
          <Package size={14} color="#ffd700" />
          <span style={{ fontSize: "0.75rem", color: "rgba(255,200,50,0.8)" }}>
            Valor total: 🪙 {totalValue.toLocaleString("pt-BR")}
          </span>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 mb-3">
        <div
          className="flex items-center gap-2 px-3 py-2 rounded-xl"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}
        >
          <Search size={14} color="rgba(255,255,255,0.4)" />
          <input
            type="text"
            placeholder="Buscar recurso..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent outline-none text-white placeholder:text-white/30 flex-1"
            style={{ fontSize: "0.8rem" }}
          />
        </div>
      </div>

      {/* Category Filters */}
      <div className="px-4 mb-4 flex gap-2 overflow-x-auto pb-1">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className="whitespace-nowrap px-3 py-1 rounded-full transition-all"
            style={{
              fontSize: "0.7rem",
              background: activeCategory === cat ? "linear-gradient(135deg, #ffd700, #f59e0b)" : "rgba(255,255,255,0.06)",
              color: activeCategory === cat ? "#000" : "rgba(255,255,255,0.6)",
              border: activeCategory === cat ? "none" : "1px solid rgba(255,255,255,0.1)",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="px-4 mb-4 grid grid-cols-3 gap-2">
        {[
          { label: "Itens", value: resources.reduce((a, r) => a + r.qty, 0).toLocaleString("pt-BR"), color: "#60a5fa" },
          { label: "Tipos", value: resources.length.toString(), color: "#f59e0b" },
          { label: "Mais Valioso", value: "Hakeijo", color: "#fde68a" },
        ].map((s) => (
          <div
            key={s.label}
            className="rounded-xl p-3"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <p style={{ fontSize: "0.75rem", color: s.color }}>{s.value}</p>
            <p style={{ fontSize: "0.6rem", color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Resource List */}
      <div className="flex flex-col gap-2 px-4">
        {filtered.map((resource) => (
          <div
            key={resource.id}
            className="rounded-xl p-4"
            style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ background: `${resource.color}18`, border: `1px solid ${resource.color}33` }}
                >
                  <span style={{ fontSize: "1.2rem" }}>{resource.emoji}</span>
                </div>
                <div>
                  <p className="text-white" style={{ fontSize: "0.82rem" }}>{resource.name}</p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span
                      className="px-2 py-0.5 rounded-full"
                      style={{
                        fontSize: "0.58rem",
                        background: `${resource.color}18`,
                        color: resource.color,
                        border: `1px solid ${resource.color}33`,
                      }}
                    >
                      {resource.category}
                    </span>
                    <div className="flex items-center gap-1">
                      <TrendingUp size={9} color={resource.change > 0 ? "#4ade80" : "#ef4444"} />
                      <span style={{ fontSize: "0.6rem", color: resource.change > 0 ? "#4ade80" : "#ef4444" }}>
                        {resource.change > 0 ? "+" : ""}{resource.change}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p style={{ fontSize: "0.75rem", color: "#ffd700" }}>
                  🪙 {resource.price.toLocaleString("pt-BR")}
                </p>
                <p style={{ fontSize: "0.65rem", color: "rgba(255,255,255,0.35)" }}>por unidade</p>
              </div>
            </div>

            <div className="flex items-center justify-between mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div className="flex items-center gap-1">
                <Package size={11} color="rgba(255,255,255,0.4)" />
                <span style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.4)" }}>
                  Total: 🪙 {(resource.qty * resource.price).toLocaleString("pt-BR")}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => adjust(resource.id, -10)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(239,68,68,0.15)", border: "1px solid rgba(239,68,68,0.3)" }}
                >
                  <Minus size={12} color="#ef4444" />
                </button>
                <span className="text-white" style={{ fontSize: "0.9rem", minWidth: 40, textAlign: "center" }}>
                  {resource.qty.toLocaleString("pt-BR")}
                </span>
                <button
                  onClick={() => adjust(resource.id, 10)}
                  className="w-7 h-7 rounded-lg flex items-center justify-center"
                  style={{ background: "rgba(74,222,128,0.15)", border: "1px solid rgba(74,222,128,0.3)" }}
                >
                  <Plus size={12} color="#4ade80" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-12">
            <p style={{ fontSize: "2rem" }}>🔍</p>
            <p className="text-white mt-2" style={{ fontSize: "0.85rem" }}>Nenhum recurso encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
