import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getCustomers } from "../lib/fakeApi";

type Row = {
  id: string;
  name: string;
  plan: string;
  mrr: number;
  joined: string;
};

export default function Customers() {
  const { data, isLoading, error } = useQuery({ queryKey: ["customers"], queryFn: getCustomers });
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof Row>("name");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const filtered = useMemo(() => {
    const rows = (data ?? []).filter((r) => {
      const q = query.toLowerCase();
      return r.name.toLowerCase().includes(q) || r.plan.toLowerCase().includes(q);
    });
    const sorted = rows.sort((a: Row, b: Row) => {
      const va = a[sortKey];
      const vb = b[sortKey];
      let cmp = 0;
      if (typeof va === "number" && typeof vb === "number") cmp = va - vb;
      else cmp = String(va).localeCompare(String(vb));
      return sortDir === "asc" ? cmp : -cmp;
    });
    return sorted;
  }, [data, query, sortKey, sortDir]);

  const toggleSort = (key: keyof Row) => {
    if (key === sortKey) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortKey(key);
      setSortDir("asc");
    }
  };

  if (isLoading) return <p className="text-gray-500">Loading customers…</p>;
  if (error) return <p className="text-red-500">Failed to load.</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-3xl font-bold">Customers</h1>
        <input
          placeholder="Search name or plan…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-64 max-w-full rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-3 py-2 outline-none focus:ring-2 focus:ring-brand"
        />
      </div>

      <div className="overflow-x-auto rounded-lg shadow-card bg-white dark:bg-gray-800">
        <table className="min-w-full text-sm">
          <thead className="text-left text-gray-600 dark:text-gray-300">
            <tr className="border-b border-gray-200 dark:border-gray-700">
              <Th onClick={() => toggleSort("name")} label="Name" sortKey={sortKey} me="name" dir={sortDir} />
              <Th onClick={() => toggleSort("plan")} label="Plan" sortKey={sortKey} me="plan" dir={sortDir} />
              <Th onClick={() => toggleSort("mrr")} label="MRR" sortKey={sortKey} me="mrr" dir={sortDir} />
              <Th onClick={() => toggleSort("joined")} label="Joined" sortKey={sortKey} me="joined" dir={sortDir} />
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-700">
            {filtered.map((u) => (
              <tr key={u.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                <td className="px-4 py-3 font-medium">{u.name}</td>
                <td className="px-4 py-3">{u.plan}</td>
                <td className="px-4 py-3">${u.mrr}</td>
                <td className="px-4 py-3">{u.joined}</td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td className="px-4 py-6 text-gray-500" colSpan={4}>
                  No customers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  label,
  onClick,
  sortKey,
  me,
  dir,
}: {
  label: string;
  onClick: () => void;
  sortKey: keyof Row;
  me: keyof Row;
  dir: "asc" | "desc";
}) {
  const active = sortKey === me;
  return (
    <th
      onClick={onClick}
      className="px-4 py-3 select-none cursor-pointer"
      title="Sort"
    >
      <span className={`inline-flex items-center gap-1 ${active ? "text-gray-900 dark:text-white" : ""}`}>
        {label}
        <span className="text-xs">{active ? (dir === "asc" ? "▲" : "▼") : ""}</span>
      </span>
    </th>
  );
}
