"use client";

import { useEffect, useMemo, useState } from "react";
import { useSession } from "next-auth/react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

type Plan = {
  _id: string;
  type: string;
  title: string;
  coverage: string;
  premium: string;
  term: string;
  bannerUrl: string;
};

type AdminBookingsResponse = {
  total: number;
  statusCounts: Record<string, number>;
  typeCounts: Record<string, number>;
  error?: string;
};

export default function AdminHomePage() {
  const { data: session, status } = useSession();

  const [plans, setPlans] = useState<Plan[]>([]);
  const [plansLoading, setPlansLoading] = useState(true);
  const [plansError, setPlansError] = useState<string | null>(null);

  const [bookingsSummary, setBookingsSummary] = useState<AdminBookingsResponse | null>(null);
  const [bookingsLoading, setBookingsLoading] = useState(true);
  const [bookingsError, setBookingsError] = useState<string | null>(null);

  // ✅ Hooks always run
  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setPlansLoading(true);
        setPlansError(null);
        const res = await fetch("/api/insurance-plans");
        if (!res.ok) throw new Error("Failed to fetch plans");
        const data: Plan[] = await res.json();
        if (isMounted) setPlans(data);
      } catch (e: unknown) {
        if (isMounted) setPlansError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (isMounted) setPlansLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        setBookingsLoading(true);
        setBookingsError(null);
        const res = await fetch("/api/admin/bookings/summary");
        if (!res.ok) throw new Error("Failed to fetch bookings summary");
        const data: AdminBookingsResponse = await res.json();
        if (isMounted) setBookingsSummary(data);
      } catch (e: unknown) {
        if (isMounted) setBookingsError(e instanceof Error ? e.message : "Unknown error");
      } finally {
        if (isMounted) setBookingsLoading(false);
      }
    })();
    return () => {
      isMounted = false;
    };
  }, []);

  const totalPlans = plans.length;
  const totalRequests = bookingsSummary?.total ?? 0;

  const typeCountsFromPlans = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of plans) {
      counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
    }
    return Array.from(counts.entries()).map(([name, value]) => ({ name, value }));
  }, [plans]);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF6699"];

  // ✅ Do conditional rendering here AFTER hooks
  if (status === "loading") {
    return <div className="flex items-center justify-center h-64">Loading...</div>;
  }
  if (!session || session.user?.role !== "admin") {
    return (
      <div className="flex items-center justify-center h-64 text-center">
        <div>
          <h1 className="text-3xl font-bold text-red-600">403 Forbidden</h1>
          <p className="mt-2">Admin access required.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Card */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h2 className="card-title text-2xl">Profile</h2>
          <div className="mt-2">
            <p><span className="font-semibold">Name:</span> {session.user?.name ?? "-"}</p>
            <p><span className="font-semibold">Email:</span> {session.user?.email ?? "-"}</p>
            <p><span className="font-semibold">Role:</span> {session.user?.role ?? "user"}</p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Total Insurance Plans</h3>
            {plansLoading ? (
              <p>Loading...</p>
            ) : plansError ? (
              <p className="text-red-600">{plansError}</p>
            ) : (
              <p className="text-4xl font-bold">{totalPlans}</p>
            )}
          </div>
        </div>

        <div className="card bg-base-100 shadow">
          <div className="card-body">
            <h3 className="card-title">Total Requests</h3>
            {bookingsLoading ? (
              <p>Loading...</p>
            ) : bookingsError ? (
              <p className="text-red-600">{bookingsError}</p>
            ) : (
              <p className="text-4xl font-bold">{totalRequests}</p>
            )}
          </div>
        </div>
      </div>

      {/* Pie Chart */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title">Plans by Type</h3>
          {plansLoading ? (
            <p>Loading chart...</p>
          ) : typeCountsFromPlans.length === 0 ? (
            <p>No data available.</p>
          ) : (
            <div className="w-full" style={{ height: 360 }}>
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={typeCountsFromPlans} dataKey="value" nameKey="name" outerRadius={120} label>
                    {typeCountsFromPlans.map((_, idx) => (
                      <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Requests by Status */}
      <div className="card bg-base-100 shadow">
        <div className="card-body">
          <h3 className="card-title">Requests by Status</h3>
          {bookingsLoading ? (
            <p>Loading...</p>
          ) : bookingsError ? (
            <p className="text-red-600">{bookingsError}</p>
          ) : bookingsSummary?.statusCounts ? (
            <ul className="list-disc list-inside">
              {Object.entries(bookingsSummary.statusCounts).map(([status, count]) => (
                <li key={status}>
                  <span className="font-semibold capitalize">{status}</span>: {count}
                </li>
              ))}
            </ul>
          ) : (
            <p>No summary available.</p>
          )}
        </div>
      </div>
    </div>
  );
}


// "use client";
// import { useEffect, useState } from "react";

// export default function AdminHomePage() {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-6">Welcome, Admin!</h1>
//     </div>
//   )
// }
