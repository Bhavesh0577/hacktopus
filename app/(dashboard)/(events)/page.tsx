import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { CalendarDays, Filter, MapPin, Plus, Search, Sparkles, Clock, Users, ExternalLink } from 'lucide-react';

// Sample data for events
const sampleEvents = [
    {
        id: 1,
        title: "React Summit 2023",
        description: "The biggest React conference with the best speakers from around the world discussing the latest in React development.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event1.jpg",
        date: "2023-11-15",
        location: "Amsterdam, Netherlands",
        participants: 500,
        featured: true,
        tags: ["React", "Web Development", "Frontend"]
    },
    {
        id: 2,
        title: "AI & Machine Learning Expo",
        description: "Explore the latest advancements in artificial intelligence and machine learning technologies.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event2.jpg",
        date: "2023-12-05",
        location: "San Francisco, CA",
        participants: 1200,
        featured: true,
        tags: ["AI", "Machine Learning", "Data Science"]
    },
    {
        id: 3,
        title: "Startup Weekend Hackathon",
        description: "54-hour event where developers, designers, and business professionals come together to build new startups.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event3.jpg",
        date: "2023-10-20",
        location: "London, UK",
        participants: 150,
        featured: false,
        tags: ["Hackathon", "Startup", "Innovation"]
    },
];

// Helper function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export default function EventsPage() {
    // Filter featured events
    const featuredEvents = sampleEvents.filter(event => event.featured);

    return (
        <div className="pt-24 pb-20 w-full">
            {/* Header Section */}
            <div className="relative mb-10 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x py-2">
                    Discover Amazing Events
                </h1>
                <p className="text-gray-400 mt-2 max-w-xl mx-auto">
                    Find tech events and hackathons happening around you
                </p>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                {/* Top Action Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
                    {/* Search Bar */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 h-4 w-4" />
                        <input
                            type="text"
                            placeholder="Search events..."
                            className="w-full pl-10 pr-4 py-2 bg-zinc-900/50 border border-zinc-800 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        />
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <Button
                            variant="outline"
                            className="border-zinc-700 bg-zinc-800/50 text-white flex items-center gap-2 hover:bg-zinc-700/50"
                        >
                            <Filter className="h-4 w-4" /> Filter
                        </Button>
                        <Link href="/create">
                            <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 flex items-center gap-2">
                                <Plus className="h-4 w-4" /> Create Event
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Filters & Categories */}
                <div className="flex flex-wrap gap-3 mb-8">
                    <Button variant="outline" className="rounded-full border-zinc-700 bg-zinc-800/50 text-white hover:bg-zinc-700/50">
                        All Events
                    </Button>
                    <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-white">
                        Hackathons
                    </Button>
                    <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-white">
                        Workshops
                    </Button>
                    <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-white">
                        Conferences
                    </Button>
                    <Button variant="outline" className="rounded-full border-zinc-700 bg-transparent text-zinc-400 hover:bg-zinc-800/50 hover:text-white">
                        Meetups
                    </Button>
                </div>

                {/* Featured Events */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-500" /> Featured Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {featuredEvents.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                            >
                                {/* Event Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                                    {/* Event Date */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                        <CalendarDays className="h-3.5 w-3.5 text-purple-400" />
                                        {formatDate(event.date)}
                                    </div>

                                    {/* Location */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                        <MapPin className="h-3.5 w-3.5 text-pink-400" />
                                        {event.location}
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {event.tags.map((tag, index) => (
                                            <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Event Meta */}
                                    <div className="flex items-center text-zinc-500 text-sm mb-4">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            <span>{event.participants} attendees</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/events/${event.id}`}>
                                        <Button className="w-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white flex items-center justify-center gap-2">
                                            View Details <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Events */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                        <CalendarDays className="h-5 w-5 mr-2 text-pink-500" /> Upcoming Events
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sampleEvents.map((event) => (
                            <div
                                key={event.id}
                                className="group bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 overflow-hidden hover:border-purple-500/30 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.15)]"
                            >
                                {/* Event Image */}
                                <div className="h-48 overflow-hidden relative">
                                    <img
                                        src={event.imageUrl}
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

                                    {/* Event Date */}
                                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                        <CalendarDays className="h-3.5 w-3.5 text-purple-400" />
                                        {formatDate(event.date)}
                                    </div>

                                    {/* Location */}
                                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-medium text-white">
                                        <MapPin className="h-3.5 w-3.5 text-pink-400" />
                                        {event.location}
                                    </div>
                                </div>

                                {/* Event Content */}
                                <div className="p-5">
                                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors">{event.title}</h3>
                                    <p className="text-zinc-400 text-sm mb-4 line-clamp-2">{event.description}</p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {event.tags.map((tag, index) => (
                                            <span key={index} className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-full">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Event Meta */}
                                    <div className="flex items-center text-zinc-500 text-sm mb-4">
                                        <div className="flex items-center">
                                            <Users className="h-4 w-4 mr-1" />
                                            <span>{event.participants} attendees</span>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <Link href={`/events/${event.id}`}>
                                        <Button className="w-full bg-gradient-to-r from-purple-600/80 to-pink-600/80 hover:from-purple-600 hover:to-pink-600 text-white flex items-center justify-center gap-2">
                                            View Details <ExternalLink className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
} 