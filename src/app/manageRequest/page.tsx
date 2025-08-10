"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { format } from "date-fns";
import LoginPage from "../login/page";

type Booking = {
  _id: string;
  fullName: string;
  email: string;
  age: number;
  income: number;
  carType?: string;
  tripDate?: string;
  notes?: string;
  planId: string;
  planTitle: string;
  planType: string;
  userEmail: string;
  createdAt: string;
  status: "pending" | "accepted" | "rejected";
};

export default function ManageRequestPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  useEffect(() => {
    if (session?.user?.role !== "admin") return;

    async function fetchBookings() {
      const res = await fetch("/api/admin/bookings");
      if (!res.ok) return;
      const data = await res.json();
      setBookings(data);
    }

    fetchBookings();
  }, [session]);

  const handleStatusChange = async (id: string, newStatus: Booking["status"]) => {
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status: newStatus }),
    });

    if (res.ok) {
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status: newStatus } : b))
      );
    }
  };

  if (status === "loading") return <p>Loading...</p>;
  if (!session || session.user?.role !== "admin") return <LoginPage></LoginPage>;

  return (
    <div className="w-full md:w-10/12 mx-auto p-6 my-20">
      <h1 className="text-5xl text-center font-bold mb-20">Manage Requests</h1>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Plan</th>
              <th>Type</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b._id}>
                <td>{b.fullName}</td>
                <td>{b.email}</td>
                <td>{b.planTitle}</td>
                <td>{b.planType}</td>
                <td>
                  <select
                    className="select select-bordered select-sm"
                    value={b.status}
                    onChange={(e) => handleStatusChange(b._id, e.target.value as Booking["status"])}
                  >
                    <option value="pending">Pending</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-outline rounded-full"
                    onClick={() => setSelectedBooking(b)}
                  >
                    View Request Application
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* DaisyUI Modal */}
      {selectedBooking && (
        <dialog id="booking_modal" className="modal modal-open">
          <form method="dialog" className="modal-box max-w-lg">
            <h3 className="font-bold text-lg mb-4">Booking Details</h3>
            <p><strong>Name:</strong> {selectedBooking.fullName}</p>
            <p><strong>Email:</strong> {selectedBooking.email}</p>
            <p><strong>Age:</strong> {selectedBooking.age}</p>
            <p><strong>Income:</strong> ${selectedBooking.income}</p>
            {selectedBooking.carType && <p><strong>Car Type:</strong> {selectedBooking.carType}</p>}
            {selectedBooking.tripDate && (
              <p><strong>Trip Date:</strong> {format(new Date(selectedBooking.tripDate), "PPP")}</p>
            )}
            {selectedBooking.notes && <p><strong>Notes:</strong> {selectedBooking.notes}</p>}
            <p><strong>Plan:</strong> {selectedBooking.planTitle} ({selectedBooking.planType})</p>
            <p><strong>Status:</strong> {selectedBooking.status}</p>

            <div className="modal-action">
              <button className="btn" onClick={() => setSelectedBooking(null)}>Close</button>
            </div>
          </form>
        </dialog>
      )}
    </div>
  );
}
