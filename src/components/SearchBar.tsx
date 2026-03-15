"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Calendar,
  Video,
  Users,
  ArrowUpDown,
  X,
} from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  onFilterChange?: (filters: SearchFilters) => void;
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
}

export type SortOption = "most_recent" | "oldest" | "duration";

export interface SearchFilters {
  dateRange: "all" | "today" | "week" | "month" | "custom";
  platform: "all" | "zoom" | "google_meet" | "teams";
  status: "all" | "completed" | "processing" | "scheduled";
  meetingType: "all" | "internal" | "external";
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search meetings, participants, or topics...",
  onFilterChange,
  sortBy,
  onSortChange,
}: SearchBarProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: "all",
    platform: "all",
    status: "all",
    meetingType: "all",
  });

  const updateFilter = (key: keyof SearchFilters, val: string) => {
    const newFilters = { ...filters, [key]: val } as SearchFilters;
    setFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const activeFilterCount = Object.values(filters).filter(
    (v) => v !== "all"
  ).length;

  const sortLabels: Record<SortOption, string> = {
    most_recent: "Most Recent",
    oldest: "Oldest",
    duration: "Duration",
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2">
        {/* Search input */}
        <div className="flex-1 flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 shadow-sm focus-within:ring-2 focus-within:ring-brand-500/20 focus-within:border-brand-300 transition-all">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            aria-label={placeholder}
            className="bg-transparent text-sm text-text-primary placeholder-gray-400 outline-none w-full"
          />
          {value && (
            <button
              onClick={() => onChange("")}
              aria-label="Clear search"
              className="text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative">
          <div className="flex items-center gap-1.5 px-3 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-text-secondary hover:border-gray-300 transition-all cursor-pointer">
            <ArrowUpDown className="w-3.5 h-3.5" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="bg-transparent outline-none cursor-pointer text-sm text-text-secondary appearance-none pr-1"
            >
              <option value="most_recent">{sortLabels.most_recent}</option>
              <option value="oldest">{sortLabels.oldest}</option>
              <option value="duration">{sortLabels.duration}</option>
            </select>
          </div>
        </div>

        {/* Filters button */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all
            ${
              showFilters || activeFilterCount > 0
                ? "bg-brand-50 border-brand-200 text-brand-600"
                : "bg-white border-gray-200 text-text-secondary hover:border-gray-300"
            }
          `}
        >
          <SlidersHorizontal className="w-4 h-4" />
          Filters
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-brand-500 text-white text-xs flex items-center justify-center">
              {activeFilterCount}
            </span>
          )}
        </button>
      </div>

      {showFilters && (
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm animate-in slide-in-from-top-2">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Date Range */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-2">
                <Calendar className="w-3.5 h-3.5" />
                Date Range
              </label>
              <select
                value={filters.dateRange}
                onChange={(e) => updateFilter("dateRange", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Platform */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-2">
                <Video className="w-3.5 h-3.5" />
                Platform
              </label>
              <select
                value={filters.platform}
                onChange={(e) => updateFilter("platform", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
              >
                <option value="all">All Platforms</option>
                <option value="zoom">Zoom</option>
                <option value="google_meet">Google Meet</option>
                <option value="teams">Microsoft Teams</option>
              </select>
            </div>

            {/* Meeting Type */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-medium text-text-secondary mb-2">
                <Users className="w-3.5 h-3.5" />
                Meeting Type
              </label>
              <select
                value={filters.meetingType}
                onChange={(e) => updateFilter("meetingType", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
              >
                <option value="all">All Types</option>
                <option value="internal">Internal</option>
                <option value="external">External</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="text-xs font-medium text-text-secondary mb-2 block">
                Status
              </label>
              <select
                value={filters.status}
                onChange={(e) => updateFilter("status", e.target.value)}
                className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm text-text-primary outline-none focus:ring-2 focus:ring-brand-500/20 focus:border-brand-300"
              >
                <option value="all">All Status</option>
                <option value="completed">Completed</option>
                <option value="processing">Processing</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          {activeFilterCount > 0 && (
            <button
              onClick={() => {
                const reset: SearchFilters = {
                  dateRange: "all",
                  platform: "all",
                  status: "all",
                  meetingType: "all",
                };
                setFilters(reset);
                onFilterChange?.(reset);
              }}
              className="mt-3 text-xs text-brand-500 hover:text-brand-600 font-medium"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
