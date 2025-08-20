'use client';
import { ReactNode } from "react";
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { FaTachometerAlt, FaPlusCircle, FaCalendarAlt, FaUsers } from 'react-icons/fa';


export default function AdminLayout({ children }: { children: ReactNode }) {
      const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  const { data: session, status } = useSession();


    if (status === 'loading') {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (!session || session.user?.role !== 'admin') {
    return (
      <div className="flex items-center justify-center h-screen text-center">
        <h1 className="text-5xl font-bold text-red-600">403 Forbidden</h1>
        <p className="mt-2">You don’t have access to this page.</p>
      </div>
    );
  }


    const links = [
    { href: '/admin', label: 'Dashboard', icon: <FaTachometerAlt /> },
    { href: '/admin/createInsurencePlan', label: 'Create InsurencePlan', icon: <FaPlusCircle /> },
    { href: '/admin/managePlans', label: 'Manage Plans', icon: <FaCalendarAlt /> },
    { href: '/admin/manageRequest', label: 'Manage Request', icon: <FaUsers /> },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-base-200">
      {/* Sidebar for md+ */}
      <aside className="hidden md:flex md:flex-col md:w-64 bg-base-100 shadow">
        <div className="p-6 font-bold text-xl ">Admin Panel</div>
        <nav className="flex-1 p-4 space-y-2">
          {links.map(link => (
                <Link
                  href={link.href} key={link.href}
                  className={`flex items-center gap-3 px-2 py-2 rounded hover:bg-base-200 ${
                    pathname === link.href ? 'bg-base-200 font-semibold' : ''
                  }`}
                >
              {link.icon}
              {link.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Navbar */}
      <div className="md:hidden w-full">
        <div className="flex items-center justify-between bg-base-100 p-4 shadow">
          <div className="font-bold text-xl">Admin Panel</div>
          <button
            className="p-2 rounded bg-base-200"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            ☰
          </button>
        </div>
        {sidebarOpen && (
          <nav className="bg-base-100 p-4 space-y-2 shadow">
            {links.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-2 rounded hover:bg-gray-200 ${pathname === link.href ? 'bg-gray-200 font-semibold' : ''
                  }`}
                onClick={() => setSidebarOpen(false)}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        )}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}
