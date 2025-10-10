"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { IconX } from "@tabler/icons-react";
import DataInsertModal from "@/components/ui/DataInsertModal";
import { EventFields } from "../data";

type EventT = {
  _id: string;
  title: string;
  description?: string;
  date?: string;
  location?: string;
  imageUrl?: string;
  parentEventId?: any;
  schedule?: { fields: string[]; rows: string[][] };
};

function formatDate(dateStr?: string) {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
function isFuture(dateStr?: string) {
  if (!dateStr) return false;
  return new Date(dateStr).getTime() >= new Date().setHours(0, 0, 0, 0);
}
function monthKey(dateStr?: string) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
}
function clsx(...args: (string | false | null | undefined)[]) {
  return args.filter(Boolean).join(" ");
}

// -------------------- Icons --------------------
const IconSearch = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z"
    />
  </svg>
);
const IconGrid = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <path d="M3 3h8v8H3zM13 3h8v8h-8zM3 13h8v8H3zM13 13h8v8h-8z" />
  </svg>
);
const IconTimeline = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    {...props}
  >
    <path strokeLinecap="round" d="M4 6h16M4 12h10M4 18h7" />
  </svg>
);
const IconCalendar = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    />
  </svg>
);
const IconLocation = (props: any) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    {...props}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.657 16.657L13.414 12.414a4 4 0 10-1.414 1.414l4.243 4.243a1 1 0 001.414-1.414z"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
    />
  </svg>
);

const Badge = ({ children }: { children: React.ReactNode }) => (
  <span className="inline-flex items-center gap-1 rounded-full bg-primary2/10 text-primary2 px-2.5 py-1 text-xs font-semibold">
    {children}
  </span>
);

// -------------------- Skeletons & Empty --------------------
const CardSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 bg-white/60 shadow-sm overflow-hidden animate-pulse">
    <div className="h-44 bg-gray-200" />
    <div className="p-5 space-y-3">
      <div className="h-6 w-2/3 bg-gray-200 rounded" />
      <div className="h-4 w-1/2 bg-gray-200 rounded" />
      <div className="h-16 w-full bg-gray-200 rounded" />
    </div>
  </div>
);
const EmptyState = ({ title, hint }: { title: string; hint?: string }) => (
  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-primary2/40 bg-white/60 p-10 text-center">
    <div className="mb-3 text-5xl">🕉️</div>
    <h3 className="text-lg font-semibold text-fontApp">{title}</h3>
    {hint && <p className="mt-1 text-sm text-gray-600">{hint}</p>}
  </div>
);

// -------------------- Schedule Modal --------------------
function ScheduleModal({ open, onClose, onSave, eventId }: any) {
  const [fields, setFields] = useState([
    "Time",
    "Activity",
    "Speaker",
    "Location",
  ]);
  const [rows, setRows] = useState([["", "", "", ""]]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const handleFieldChange = (idx: number, value: string) => {
    const next = [...fields];
    next[idx] = value;
    setFields(next);
  };
  const handleRowChange = (r: number, c: number, value: string) => {
    setRows((prev) =>
      prev.map((row, ri) =>
        ri === r ? row.map((cell, ci) => (ci === c ? value : cell)) : row
      )
    );
  };
  const addField = () => {
    setFields((f) => [...f, `Field ${f.length + 1}`]);
    setRows((rs) => rs.map((r) => [...r, ""]));
  };
  const addRow = () => setRows((r) => [...r, Array(fields.length).fill("")]);
  const removeField = (idx: number) => {
    setFields((f) => f.filter((_, i) => i !== idx));
    setRows((rs) => rs.map((r) => r.filter((_, i) => i !== idx)));
  };
  const removeRow = (idx: number) =>
    setRows((rs) => rs.filter((_, i) => i !== idx));

  const handleSave = async () => {
    await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/event/${eventId}/schedule`,
      { fields, rows },
      { headers: token ? { Authorization: `Bearer ${token}` } : {} }
    );
    onSave();
    onClose();
  };

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-4xl mx-4 overflow-hidden rounded-2xl border border-white/20 bg-white shadow-2xl">
        <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-primary2 to-orange-400 text-white">
          <h2 className="text-lg font-bold">Create / Edit Schedule</h2>
          <button
            className="rounded-full p-1 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/60"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          <div className="overflow-x-auto rounded-lg border border-gray-200">
            <table className="min-w-full border-collapse">
              <thead className="bg-primary2 text-white">
                <tr>
                  {fields.map((f, i) => (
                    <th key={i} className="p-2 text-left">
                      <div className="flex items-center gap-2">
                        <input
                          className="w-28 bg-transparent border-b border-white/70 text-white font-semibold focus:outline-none"
                          value={f}
                          onChange={(e) => handleFieldChange(i, e.target.value)}
                        />
                        {fields.length > 1 && (
                          <button
                            className="text-white/80 hover:text-white text-xs"
                            onClick={() => removeField(i)}
                            title="Remove field"
                          >
                            ✕
                          </button>
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="w-8" />
                </tr>
              </thead>
              <tbody>
                {rows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 ? "bg-white" : "bg-gray-50"}>
                    {row.map((cell, ci) => (
                      <td key={ci} className="p-2 border-t">
                        <input
                          className="w-full rounded-md border border-gray-200 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary2/40"
                          value={cell}
                          onChange={(e) =>
                            handleRowChange(ri, ci, e.target.value)
                          }
                        />
                      </td>
                    ))}
                    <td className="p-2 border-t text-center">
                      {rows.length > 1 && (
                        <button
                          className="text-red-500 hover:text-red-600"
                          onClick={() => removeRow(ri)}
                        >
                          ✕
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button
              className="rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-200 text-sm"
              onClick={addField}
            >
              + Add Field
            </button>
            <button
              className="rounded-lg bg-gray-100 px-3 py-1.5 hover:bg-gray-200 text-sm"
              onClick={addRow}
            >
              + Add Row
            </button>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-sm font-semibold"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              className="px-4 py-2 rounded-lg bg-primary2 text-white hover:bg-primary2/90 text-sm font-semibold"
              onClick={handleSave}
            >
              Save Schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------- Enhanced Event Detail Modal --------------------
function EventDetailModal({
  open,
  onClose,
  event,
  isAuthenticated,
  onEditSchedule,
}: any) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: any) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  if (!open || !event) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div
        ref={modalRef}
        className="relative w-full max-w-6xl max-h-[90vh] overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 z-10 bg-white/90 hover:bg-white text-gray-600 hover:text-black rounded-full p-2 shadow-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary2/50"
          onClick={onClose}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Hero Banner Section */}
        <div className="relative aspect-[21/9] w-full bg-gray-100">
          <img
            src={event.imageUrl || "/event-placeholder.jpg"}
            alt={event.title}
            className="w-full h-full object-contain"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <h1 className="text-3xl sm:text-4xl font-bold mb-2 drop-shadow-lg">
              {event.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm sm:text-base">
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                <IconCalendar className="w-4 h-4" />
                <span>{formatDate(event.date)}</span>
              </div>
              {event.location && (
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <IconLocation className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 max-h-[calc(90vh-16rem)] overflow-y-auto">
          {/* Description */}
          {event.description && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-fontApp mb-3">
                About this Event
              </h3>
              <p className="text-gray-700 leading-relaxed">
                {event.description}
              </p>
            </div>
          )}

          {/* Schedule */}
          {event.schedule?.fields?.length ? (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-fontApp mb-3">
                Schedule
              </h3>
              <div className="overflow-x-auto rounded-lg ring-1 ring-gray-200">
                <table className="min-w-full bg-white border-collapse">
                  <thead>
                    <tr className="bg-primary2 text-white">
                      {event.schedule.fields.map((f: string, i: number) => (
                        <th
                          key={i}
                          className="py-3 px-4 text-left font-semibold"
                        >
                          {f}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {event.schedule.rows.map((row: string[], ri: number) => (
                      <tr
                        key={ri}
                        className={ri % 2 ? "bg-white" : "bg-gray-50/50"}
                      >
                        {row.map((cell, ci) => (
                          <td
                            key={ci}
                            className="py-3 px-4 border-t border-gray-100"
                          >
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ) : null}

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
            {isAuthenticated && (
              <button
                className="inline-flex items-center justify-center rounded-xl bg-primary2 px-4 py-2 text-sm font-bold text-white shadow hover:bg-primary2/90 transition-colors"
                onClick={() => onEditSchedule(event)}
              >
                {event.schedule ? "Edit Schedule" : "Add Schedule"}
              </button>
            )}
            <button
              className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={onClose}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------- Main Page --------------------
export default function EventsPage() {
  const [events, setEvents] = useState<EventT[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // UI state
  const [tab, setTab] = useState<"upcoming" | "past" | "all">("all");
  const [view, setView] = useState<"grid" | "timeline">("grid");
  const [query, setQuery] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [location, setLocation] = useState<string>("");
  const [month, setMonth] = useState<string>("");
  const [refresh, setRefresh] = useState(false);

  // modals
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailEvent, setDetailEvent] = useState<EventT | null>(null);
  const [scheduleOpen, setScheduleOpen] = useState(false);
  const [scheduleEvent, setScheduleEvent] = useState<EventT | null>(null);

  const { isAuthenticated } = useSelector(
    (s: { auth: { isAuthenticated: boolean } }) => s.auth
  );

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/event`
        );
        setEvents(res.data || []);
      } catch (e: any) {
        setError(
          e?.response?.data?.message ||
            "Couldn't load events. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, [refresh]);

  // Parent events only
  const parents = useMemo(
    () =>
      events.filter(
        (e) =>
          !e.parentEventId || e.parentEventId === "" || e.parentEventId === null
      ),
    [events]
  );

  // Derived lists
  const locations = useMemo(() => {
    const set = new Set<string>();
    parents.forEach((e) => e.location && set.add(e.location));
    return Array.from(set).sort();
  }, [parents]);

  const months = useMemo(() => {
    const set = new Set<string>();
    parents.forEach((e) => e.date && set.add(monthKey(e.date)));
    return Array.from(set).sort();
  }, [parents]);

  // Combined filter
  const filtered = useMemo(() => {
    let list = parents.slice();
    if (tab === "upcoming") list = list.filter((e) => isFuture(e.date));
    if (tab === "past") list = list.filter((e) => !isFuture(e.date));

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(
        (e) =>
          e.title?.toLowerCase().includes(q) ||
          e.location?.toLowerCase().includes(q) ||
          e.description?.toLowerCase().includes(q)
      );
    }
    if (location) list = list.filter((e) => e.location === location);
    if (month) list = list.filter((e) => monthKey(e.date) === month);

    // sort: upcoming asc, past desc, all asc
    list.sort((a, b) => {
      const da = new Date(a.date || 0).getTime();
      const db = new Date(b.date || 0).getTime();
      if (tab === "past") return db - da;
      return da - db;
    });

    return list;
  }, [parents, tab, query, location, month]);

  const childEventsByParent = useMemo(() => {
    const map: Record<string, EventT[]> = {};
    events.forEach((e) => {
      if (
        e.parentEventId &&
        e.parentEventId !== "" &&
        e.parentEventId !== null
      ) {
        const key =
          typeof e.parentEventId === "object" && (e.parentEventId as any).$oid
            ? (e.parentEventId as any).$oid
            : String(e.parentEventId);
        if (!map[key]) map[key] = [];
        map[key].push(e);
      }
    });
    return map;
  }, [events]);

  const openDetail = (e: EventT) => {
    setDetailEvent(e);
    setDetailOpen(true);
  };
  const openSchedule = (e: EventT) => {
    setScheduleEvent(e);
    setScheduleOpen(true);
  };

  const clearFilters = () => {
    setQuery("");
    setLocation("");
    setMonth("");
  };

  const hasActiveFilters = query || location || month;

  return (
    <div className="mt-4 min-h-screen">
      {/* Hero */}
      <div className="relative rounded-2xl isolate w-full h-60 md:h-72 flex items-center justify-center overflow-hidden">
        <img
          src="https://ik.imagekit.io/opiwak7mf/Prabhupada_Network/PrabhupadaInspectingBhagavatam.jpg?updatedAt=1754987127116"
          alt="Events"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary2/85 to-orange-400/70 mix-blend-multiply" />
        <div className="absolute left-10 top-1/2 -translate-y-1/2 hidden md:block">
          <div className="h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        </div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg tracking-tight">
            Events
          </h1>
          <p className="text-sm md:text-base text-white/90 mt-2 max-w-2xl mx-auto">
            Discover gatherings, kirtans, and festivals. Filter by month,
            location, or search.
          </p>
        </div>
      </div>

      {/* Enhanced AppBar */}
      <div className="sticky top-0 z-40 rounded-2xl mt-2 bg-white border-b border-gray-300 shadow-lg shadow-gray-400/10">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          {/* Search and Filters Row */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Tabs */}
            <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-100 border border-gray-200">
              {(["upcoming", "past", "all"] as const).map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={clsx(
                    "px-3 py-1.5 rounded-lg text-sm font-semibold capitalize transition",
                    tab === t
                      ? "bg-white shadow border border-gray-200 text-primary2"
                      : "text-gray-600 hover:bg-white"
                  )}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <IconSearch className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events..."
                  className="w-full pl-10 pr-3 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary2/30 text-sm"
                />
              </div>
            </div>

            {/* Location Filter */}
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm min-w-[150px]"
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>

            {/* Month Filter */}
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-3 py-2 rounded-lg border border-gray-200 bg-white text-sm min-w-[150px]"
            >
              <option value="">All Months</option>
              {months.map((m) => {
                const [y, mo] = m.split("-");
                const dt = new Date(Number(y), Number(mo) - 1, 1);
                const label = dt.toLocaleDateString(undefined, {
                  month: "short",
                  year: "numeric",
                });
                return (
                  <option key={m} value={m}>
                    {label}
                  </option>
                );
              })}
            </select>

            {/* View Toggle */}
            <div className="flex items-center gap-1 rounded-xl p-1 bg-gray-100 border border-gray-200">
              <button
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition",
                  view === "grid"
                    ? "bg-white shadow border border-gray-200 text-primary2"
                    : "text-gray-600 hover:bg-white"
                )}
                onClick={() => setView("grid")}
              >
                <IconGrid className="w-4 h-4" />
                Grid
              </button>
              <button
                className={clsx(
                  "px-3 py-1.5 rounded-lg text-sm font-semibold flex items-center gap-2 transition",
                  view === "timeline"
                    ? "bg-white shadow border border-gray-200 text-primary2"
                    : "text-gray-600 hover:bg-white"
                )}
                onClick={() => setView("timeline")}
              >
                <IconTimeline className="w-4 h-4" />
                Timeline
              </button>
            </div>
            {/* Add to Gallery Button */}
            {isAuthenticated && (
              <button
                onClick={() => setOpenModal(true)}
                className="inline-flex items-center justify-center rounded-xl bg-primary2 px-4 py-2 text-sm font-bold text-white shadow hover:bg-primary2/90 ml-auto"
              >
                Add to Events
              </button>
            )}
            {/* Clear Filters */}
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100 transition"
              >
                <IconX className="h-4 w-4" />
                Clear Filters
              </button>
            )}
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="text-sm text-gray-600">
              Showing {filtered.length} of {parents.length} events
              {hasActiveFilters && " (filtered)"}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Error */}
        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <CardSkeleton key={i} />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            title="No events found"
            hint="Try changing filters or clearing the search query."
          />
        ) : view === "grid" ? (
          <GridView
            events={filtered}
            childEventsByParent={childEventsByParent}
            onOpenDetail={openDetail}
            onOpenSchedule={openSchedule}
            isAuthenticated={isAuthenticated}
          />
        ) : (
          <TimelineView
            events={filtered}
            onOpenDetail={openDetail}
            onOpenSchedule={openSchedule}
            isAuthenticated={isAuthenticated}
          />
        )}
      </div>

      {/* Modals */}
      <EventDetailModal
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        event={detailEvent}
        isAuthenticated={isAuthenticated}
        onEditSchedule={openSchedule}
      />
      <ScheduleModal
        open={scheduleOpen}
        onClose={() => setScheduleOpen(false)}
        onSave={() => setRefresh((r) => !r)}
        eventId={scheduleEvent?._id}
      />
      {isAuthenticated && (
        <DataInsertModal
          openModal={openModal}
          onCloseModal={() => setOpenModal(false)}
          title="Event"
          fields={EventFields}
        />
      )}
    </div>
  );
}

// -------------------- Grid View --------------------
function GridView({
  events,
  childEventsByParent,
  onOpenDetail,
  onOpenSchedule,
  isAuthenticated,
}: {
  events: EventT[];
  childEventsByParent: Record<string, EventT[]>;
  onOpenDetail: (e: EventT) => void;
  onOpenSchedule: (e: EventT) => void;
  isAuthenticated: boolean;
}) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {events.map((e) => (
        <article
          key={e._id}
          className="group relative flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white/60 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
        >
          <div className="relative aspect-[16/9] overflow-hidden bg-gray-100">
            <img
              src={e.imageUrl || "/event-placeholder.jpg"}
              alt={e.title}
              className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute top-3 left-3">
              <Badge>{formatDate(e.date)}</Badge>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>

          <div className="p-5 flex-1 flex flex-col">
            <h3
              className="text-xl font-bold text-fontApp group-hover:text-primary2 transition-colors cursor-pointer line-clamp-2 mb-2"
              onClick={() => onOpenDetail(e)}
            >
              {e.title}
            </h3>

            <div className="flex items-center gap-2 text-gray-600 mb-3">
              <IconLocation className="w-4 h-4 text-primary2 flex-shrink-0" />
              <span className="truncate text-sm">{e.location}</span>
            </div>

            {e.description && (
              <p className="text-gray-700 line-clamp-3 text-sm mb-4 flex-1">
                {e.description}
              </p>
            )}

            {/* Sub-events */}
            {childEventsByParent[e._id]?.length ? (
              <div className="mb-4">
                <div className="text-xs font-semibold text-gray-600 mb-2">
                  Sub Events
                </div>
                <div className="flex flex-wrap gap-1">
                  {childEventsByParent[e._id].slice(0, 3).map((c) => (
                    <button
                      key={c._id}
                      onClick={() => onOpenDetail(c)}
                      className="rounded-full bg-primary2/10 text-primary2 px-2 py-1 text-xs font-medium hover:bg-primary2/20 transition-colors"
                    >
                      {c.title}
                    </button>
                  ))}
                  {childEventsByParent[e._id].length > 3 && (
                    <span className="rounded-full bg-gray-100 text-gray-600 px-2 py-1 text-xs">
                      +{childEventsByParent[e._id].length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ) : null}

            <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
              <button
                className="text-primary2 font-semibold text-sm hover:text-primary2/80 transition-colors"
                onClick={() => onOpenDetail(e)}
              >
                View Details
              </button>
              {isAuthenticated && (
                <button
                  className="inline-flex items-center justify-center rounded-lg bg-primary2 px-3 py-2 text-xs font-bold text-white shadow hover:bg-primary2/90 transition-colors"
                  onClick={() => onOpenSchedule(e)}
                >
                  {e.schedule ? "Edit Schedule" : "Add Schedule"}
                </button>
              )}
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

// -------------------- Timeline View --------------------
function TimelineView({
  events,
  onOpenDetail,
  onOpenSchedule,
  isAuthenticated,
}: {
  events: EventT[];
  onOpenDetail: (e: EventT) => void;
  onOpenSchedule: (e: EventT) => void;
  isAuthenticated: boolean;
}) {
  // Group by month
  const groups = useMemo(() => {
    const map: Record<string, EventT[]> = {};
    events.forEach((e) => {
      const k = monthKey(e.date) || "unknown";
      if (!map[k]) map[k] = [];
      map[k].push(e);
    });
    // sort events within month
    Object.values(map).forEach((arr) =>
      arr.sort(
        (a, b) =>
          new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
      )
    );
    return Object.entries(map).sort(([a], [b]) => (a > b ? 1 : -1));
  }, [events]);

  return (
    <div className="relative">
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-primary2/30 to-transparent" />
      <div className="space-y-12">
        {groups.map(([k, arr]) => {
          const [y, mo] = k.split("-");
          const dt = new Date(Number(y), Number(mo) - 1, 1);
          const label = isFinite(dt.getTime())
            ? dt.toLocaleDateString(undefined, {
                month: "long",
                year: "numeric",
              })
            : "Undated";

          return (
            <section key={k} className="relative">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-3 w-3 rounded-full bg-primary2 border-2 border-white shadow" />
                <h2 className="text-lg font-bold text-fontApp">{label}</h2>
                <Badge>{arr.length} events</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {arr.map((e, i) => (
                  <article
                    key={e._id}
                    className="relative rounded-2xl border border-gray-200 bg-white/70 shadow-sm p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={e.imageUrl || "/event-placeholder.jpg"}
                          alt={e.title}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge>{formatDate(e.date)}</Badge>
                        </div>
                        <h3
                          className="text-lg font-bold text-fontApp cursor-pointer hover:text-primary2 transition-colors line-clamp-2"
                          onClick={() => onOpenDetail(e)}
                        >
                          {e.title}
                        </h3>
                        {e.location && (
                          <div className="flex items-center gap-2 text-gray-600 mt-1">
                            <IconLocation className="w-3 h-3 text-primary2" />
                            <span className="text-sm">{e.location}</span>
                          </div>
                        )}
                        {e.description && (
                          <p className="text-gray-700 line-clamp-2 mt-2 text-sm">
                            {e.description}
                          </p>
                        )}
                        <div className="mt-3 flex items-center gap-3">
                          <button
                            className="text-primary2 font-semibold text-sm hover:text-primary2/80 transition-colors"
                            onClick={() => onOpenDetail(e)}
                          >
                            View Details
                          </button>
                          {isAuthenticated && (
                            <button
                              className="inline-flex items-center justify-center rounded-lg bg-primary2 px-3 py-1.5 text-xs font-bold text-white shadow hover:bg-primary2/90 transition-colors"
                              onClick={() => onOpenSchedule(e)}
                            >
                              {e.schedule ? "Edit Schedule" : "Add Schedule"}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}
