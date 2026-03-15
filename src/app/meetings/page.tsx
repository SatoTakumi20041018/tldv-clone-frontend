"use client";

import { useState, useMemo, useCallback } from "react";
import { LayoutGrid, List, Plus, Video, Search, CalendarOff } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import SearchBar, { SearchFilters, SortOption } from "@/components/SearchBar";
import { mockMeetings } from "@/lib/mockData";

const LOAD_MORE_COUNT = 6;

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: "all",
    platform: "all",
    status: "all",
    meetingType: "all",
  });
  const [sortBy, setSortBy] = useState<SortOption>("most_recent");
  const [visibleCount, setVisibleCount] = useState(LOAD_MORE_COUNT);

  const filteredMeetings = useMemo(() => {
    let result = [...mockMeetings];

    // Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.participants.some((p) => p.name.toLowerCase().includes(q)) ||
          m.summaryPreview?.toLowerCase().includes(q)
      );
    }

    // Platform filter
    if (filters.platform !== "all") {
      result = result.filter((m) => m.platform === filters.platform);
    }

    // Status filter
    if (filters.status !== "all") {
      result = result.filter((m) => m.status === filters.status);
    }

    // Meeting type filter
    if (filters.meetingType !== "all") {
      result = result.filter((m) => m.meetingType === filters.meetingType);
    }

    // Date range filter
    if (filters.dateRange !== "all") {
      const now = new Date();
      result = result.filter((m) => {
        const meetingDate = new Date(m.date);
        switch (filters.dateRange) {
          case "today": {
            return meetingDate.toDateString() === now.toDateString();
          }
          case "week": {
            const weekAgo = new Date(now);
            weekAgo.setDate(weekAgo.getDate() - 7);
            return meetingDate >= weekAgo;
          }
          case "month": {
            const monthAgo = new Date(now);
            monthAgo.setMonth(monthAgo.getMonth() - 1);
            return meetingDate >= monthAgo;
          }
          default:
            return true;
        }
      });
    }

    // Sort
    switch (sortBy) {
      case "most_recent":
        result.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        break;
      case "oldest":
        result.sort(
          (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
        );
        break;
      case "duration":
        result.sort((a, b) => b.duration - a.duration);
        break;
    }

    return result;
  }, [searchQuery, filters, sortBy]);

  const visibleMeetings = filteredMeetings.slice(0, visibleCount);
  const hasMore = visibleCount < filteredMeetings.length;

  const handleLoadMore = useCallback(() => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  }, []);

  const resetVisible = useCallback(() => {
    setVisibleCount(LOAD_MORE_COUNT);
  }, []);

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">My Meetings</h1>
          <p className="text-text-secondary text-sm mt-1">
            {filteredMeetings.length} meeting
            {filteredMeetings.length !== 1 ? "s" : ""} found
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* View toggle */}
          <div className="flex items-center bg-white border border-gray-200 rounded-lg p-0.5">
            <button
              onClick={() => setViewMode("list")}
              title="List view"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "list"
                  ? "bg-brand-50 text-brand-500"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              title="Grid view"
              className={`p-1.5 rounded-md transition-colors ${
                viewMode === "grid"
                  ? "bg-brand-50 text-brand-500"
                  : "text-text-muted hover:text-text-secondary"
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white rounded-xl text-sm font-medium hover:bg-brand-600 transition-colors shadow-sm">
            <Plus className="w-4 h-4" />
            Import
          </button>
        </div>
      </div>

      {/* Search & Filters */}
      <SearchBar
        value={searchQuery}
        onChange={(v) => {
          setSearchQuery(v);
          resetVisible();
        }}
        onFilterChange={(f) => {
          setFilters(f);
          resetVisible();
        }}
        sortBy={sortBy}
        onSortChange={(s) => {
          setSortBy(s);
          resetVisible();
        }}
      />

      {/* Meeting cards */}
      {visibleMeetings.length > 0 ? (
        <>
          {viewMode === "list" ? (
            <div className="space-y-3">
              {visibleMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  variant="list"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {visibleMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  variant="card"
                />
              ))}
            </div>
          )}

          {/* Load More */}
          {hasMore && (
            <div className="flex justify-center pt-4 pb-2">
              <button
                onClick={handleLoadMore}
                className="px-6 py-2.5 text-sm font-medium text-brand-600 bg-brand-50 hover:bg-brand-100 border border-brand-200 rounded-xl transition-colors"
              >
                Load more ({filteredMeetings.length - visibleCount} remaining)
              </button>
            </div>
          )}
        </>
      ) : (
        /* Empty state */
        <div className="bg-white rounded-2xl p-16 border border-gray-100 shadow-sm text-center">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-brand-50 to-brand-100 flex items-center justify-center">
                <Video className="w-10 h-10 text-brand-300" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-gray-50 border-4 border-white flex items-center justify-center">
                {searchQuery ? (
                  <Search className="w-4 h-4 text-gray-300" />
                ) : (
                  <CalendarOff className="w-4 h-4 text-gray-300" />
                )}
              </div>
            </div>
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            {searchQuery ? "No meetings match your search" : "No meetings found"}
          </h3>
          <p className="text-sm text-text-secondary max-w-sm mx-auto">
            {searchQuery
              ? "Try adjusting your search terms or filters to find what you're looking for."
              : "Your recorded meetings will appear here. Import a meeting or connect a platform to get started."}
          </p>
          {(searchQuery ||
            filters.platform !== "all" ||
            filters.status !== "all" ||
            filters.meetingType !== "all" ||
            filters.dateRange !== "all") && (
            <button
              onClick={() => {
                setSearchQuery("");
                setFilters({
                  dateRange: "all",
                  platform: "all",
                  status: "all",
                  meetingType: "all",
                });
                resetVisible();
              }}
              className="mt-4 inline-flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      )}
    </div>
  );
}
