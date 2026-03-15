"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import IntegrationCard from "@/components/IntegrationCard";
import { mockIntegrations } from "@/lib/mockData";

const categories = [
  { id: "all", label: "All" },
  { id: "communication", label: "Communication" },
  { id: "crm", label: "CRM" },
  { id: "project_management", label: "Project Management" },
  { id: "storage", label: "Storage" },
];

export default function IntegrationsPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [integrations, setIntegrations] = useState(mockIntegrations);

  const filtered = useMemo(() => {
    let result = [...integrations];

    if (activeCategory !== "all") {
      result = result.filter((i) => i.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (i) =>
          i.name.toLowerCase().includes(q) ||
          i.description.toLowerCase().includes(q)
      );
    }

    return result;
  }, [integrations, activeCategory, searchQuery]);

  const connectedCount = integrations.filter((i) => i.connected).length;

  const handleToggle = (id: string, connect: boolean) => {
    setIntegrations((prev) =>
      prev.map((i) =>
        i.id === id
          ? {
              ...i,
              connected: connect,
              status: connect ? "active" : undefined,
              lastSynced: connect ? new Date().toISOString() : undefined,
            }
          : i
      )
    );
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-text-primary">Integrations</h1>
        <p className="text-text-secondary text-sm mt-1">
          Connect your favorite tools to supercharge your meeting workflow.{" "}
          <span className="text-brand-500 font-medium">
            {connectedCount} connected
          </span>
        </p>
      </div>

      {/* Search + categories */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-300 transition-all max-w-md">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search integrations..."
            className="bg-transparent text-sm text-text-primary placeholder-gray-400 outline-none w-full"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-text-secondary border border-gray-200 hover:border-gray-300"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Integration grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((integration) => (
            <IntegrationCard
              key={integration.id}
              integration={integration}
              onToggle={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-100 shadow-sm text-center">
          <Filter className="w-10 h-10 text-gray-300 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            No integrations found
          </h3>
          <p className="text-sm text-text-secondary">
            Try adjusting your search or category filter.
          </p>
        </div>
      )}
    </div>
  );
}
