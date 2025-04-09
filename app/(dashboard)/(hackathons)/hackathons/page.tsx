"use client"
import React from "react";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center max-w-6xl">
      <div className="py-10 mt-10">
        <h1 className="text-2xl md:text-3xl font-bold flex items-center justify-start text-white">
          Discover Hackathons
        </h1>
        <p className="flex items-center justify-start text-zinc-400 py-2">
          Explore popular events near you, browse by category, or check out some of the great community calendars.
        </p>

        {/* Placeholder for GetEvents */}
        <div className="mt-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Popular Events</h2>
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-zinc-800 p-4 rounded-lg flex items-center space-x-4">
                <div className="bg-purple-600 w-16 h-16 rounded-lg"></div>
                <div>
                  <h3 className="text-white font-medium">Event {item}</h3>
                  <p className="text-zinc-400 text-sm">April 2023</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <Link href="/all-events" className="text-purple-500 hover:text-purple-400 text-sm">
              View all events →
            </Link>
          </div>
        </div>

        {/* Placeholder for BrowseEventsByTheme */}
        <div className="mt-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Browse by Themes</h2>
          <div className="grid grid-cols-3 gap-4">
            {['AI', 'Crypto', 'AR/VR', 'IoT', 'Security', 'Open'].map((theme) => (
              <div key={theme} className="bg-zinc-800 p-4 rounded-lg">
                <h3 className="text-white font-medium">{theme}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Placeholder for DisplayHackathons */}
        <div className="mt-8 p-6 bg-zinc-900 rounded-lg border border-zinc-800">
          <h2 className="text-xl font-bold text-white mb-4">Hackathons</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="bg-zinc-800 p-4 rounded-lg flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="bg-purple-600 w-16 h-16 rounded-lg"></div>
                  <div>
                    <h3 className="text-white font-medium">Hackathon {item}</h3>
                    <p className="text-zinc-400 text-sm">April 15 - 17, 2023</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-white font-medium">$500</p>
                  <p className="text-zinc-400 text-sm">50 participants</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
