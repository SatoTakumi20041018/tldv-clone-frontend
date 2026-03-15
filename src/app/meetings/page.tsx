"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, Plus } from "lucide-react";
import MeetingCard from "@/components/MeetingCard";
import SearchBar, { SearchFilters } from "@/components/SearchBar";
import { mockMeetings } from "@/lib/mockData";

export default function MeetingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [filters, setFilters] = useState<SearchFilters>({
    dateRange: "all",
    platform: "all",
    status: "all",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const perPage = 6;

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

    return result;
  }, [searchQuery, filters]);

  const totalPages = Math.ceil(filteredMeetings.length / perPage);
  const paginatedMeetings = filteredMeetings.slice(
    (currentPage - 1) * perPage,
    currentPage * perPage
  );

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-text-primary">Meetings</h1>
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
              className={`p-1.5 rounded-md transition-colors ${viewMode === "list" ? "bg-brand-50 text-brand-500" : "text-text-muted hover:text-text-secondary"}`}
            >
              <List className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`p-1.5 rounded-md transition-colors ${viewMode === "grid" ? "bg-brand-50 text-brand-500" : "text-text-muted hover:text-text-secondary"}`}
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
          setCurrentPage(1);
        }}
        onFilterChange={(f) => {
          setFilters(f);
          setCurrentPage(1);
        }}
      />

      {/* Meeting cards */}
      {paginatedMeetings.length > 0 ? (
        <>
          {viewMode === "list" ? (
            <div className="space-y-3">
              {paginatedMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  variant="list"
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {paginatedMeetings.map((meeting) => (
                <MeetingCard
                  key={meeting.id}
                  meeting={meeting}
                  variant="card"
                />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 pt-4">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`w-8 h-8 text-sm rounded-lg transition-colors ${
                      page === currentPage
                        ? "bg-brand-500 text-white shadow-sm"
                        : "text-text-secondary hover:bg-white"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 text-sm text-text-secondary hover:text-text-primary disabled:opacity-40 disabled:cursor-not-allowed rounded-lg hover:bg-white transition-colors"
              >
                Next
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-white rounded-xl p-12 border border-gray-100 shadow-sm text-center">
          <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mx-auto mb-4">
            <LayoutGrid className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-semibold text-text-primary mb-1">
            No meetings found
          </h3>
          <p className="text-sm text-text-secondary">
            Try adjusting your search or filters to find what you&apos;re
            looking for.
          </p>
        </div>
      )}
    </div>
  );
}
