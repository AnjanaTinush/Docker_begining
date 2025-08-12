import { useQuery } from "@tanstack/react-query";
import { getMetrics } from "../lib/fakeApi";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function Dashboard() {
  const { data, isLoading, error } = useQuery({ queryKey: ["metrics"], queryFn: getMetrics });

  if (isLoading) return <p className="text-gray-500">Loading metrics…</p>;
  if (error || !data) return <p className="text-red-500">Failed to load.</p>;

  const { kpis, revenue, topCustomers } = data;

  const Stat = ({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-5 transition hover:shadow-md">
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">{value}{suffix}</h2>
    </div>
  );

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Overview</h1>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Stat label="MRR" value={kpis.mrr} suffix="$" />
        <Stat label="Active users" value={kpis.activeUsers} />
        <Stat label="Churn rate" value={kpis.churnRate} suffix="%" />
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Revenue (12 months)</h2>
        <div className="w-full h-80">
          <ResponsiveContainer>
            <LineChart data={revenue}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" strokeWidth={2} stroke="#2563eb" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-card p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top customers</h2>
        <ul className="space-y-2">
          {topCustomers.map((c) => (
            <li key={c.id} className="flex justify-between text-gray-700 dark:text-gray-300">
              <span>{c.name}</span>
              <span className="font-medium">${c.mrr}/mo</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
