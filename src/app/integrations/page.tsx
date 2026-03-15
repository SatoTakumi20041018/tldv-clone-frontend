"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Zap, Puzzle } from "lucide-react";
import IntegrationCard from "@/components/IntegrationCard";
import { mockIntegrations } from "@/lib/mockData";

const categories = [
  { id: "all", label: "All" },
  { id: "video_conferencing", label: "Video Conferencing" },
  { id: "crm", label: "CRM" },
  { id: "communication", label: "Communication" },
  { id: "project_management", label: "Project Management" },
  { id: "storage", label: "Storage" },
  { id: "automation", label: "Automation" },
  { id: "note_taking", label: "Note Taking" },
  { id: "calendar", label: "Calendar" },
  { id: "hr_recruitment", label: "HR & Recruitment" },
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
  const totalCount = integrations.length;

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
      <div className="flex items-start justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-brand-100 text-brand-600 flex items-center justify-center">
              <Puzzle className="w-5 h-5" />
            </div>
            <h1 className="text-2xl font-bold text-text-primary">
              Integrations
            </h1>
          </div>
          <p className="text-text-secondary text-sm mt-2">
            Connect tl;dv with your favorite tools to supercharge your meeting
            workflow.
          </p>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <div className="bg-white border border-gray-200 rounded-lg px-4 py-2 shadow-sm">
            <span className="text-text-muted">Connected:</span>{" "}
            <span className="text-brand-600 font-semibold">
              {connectedCount}
            </span>
            <span className="text-text-muted"> / {totalCount}</span>
          </div>
        </div>
      </div>

      {/* Search bar */}
      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-300 transition-all max-w-lg">
        <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search integrations by name..."
          className="bg-transparent text-sm text-text-primary placeholder-gray-400 outline-none w-full"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="text-gray-400 hover:text-gray-600 text-xs"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category tabs */}
      <div className="flex items-center gap-2 flex-wrap">
        {categories.map((cat) => {
          const count =
            cat.id === "all"
              ? integrations.length
              : integrations.filter((i) => i.category === cat.id).length;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? "bg-brand-500 text-white shadow-sm"
                  : "bg-white text-text-secondary border border-gray-200 hover:border-gray-300 hover:bg-gray-50"
              }`}
            >
              {cat.label}
              <span
                className={`text-xs ${
                  activeCategory === cat.id
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-text-muted"
                } rounded-full px-1.5 py-0.5 min-w-[20px] text-center`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Integration grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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

      {/* Zapier banner */}
      <div className="bg-gradient-to-r from-orange-50 to-amber-50 border border-orange-200 rounded-xl p-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-orange-100 text-orange-500 flex items-center justify-center flex-shrink-0">
            <Zap className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              Don&apos;t see your tool?
            </h3>
            <p className="text-sm text-text-secondary mt-0.5">
              Connect via Zapier to 5,000+ apps and automate your workflow
              without code.
            </p>
          </div>
        </div>
        <button className="px-5 py-2.5 bg-orange-500 text-white rounded-lg text-sm font-medium hover:bg-orange-600 transition-colors shadow-sm flex-shrink-0">
          Connect Zapier
        </button>
      </div>
    </div>
  );
}
