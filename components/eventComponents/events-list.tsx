"use client";

import React, { useState } from 'react';
import { CalendarDays, MapPin, Users, ExternalLink } from 'lucide-react';
import { Button } from '../ui/button';
import Link from 'next/link';

interface EventsListProps {
    featured?: boolean;
}

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
    {
        id: 4,
        title: "DevOps Days Conference",
        description: "A technical conference covering topics of software development, IT infrastructure, and DevOps practices.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event4.jpg",
        date: "2023-11-28",
        location: "Berlin, Germany",
        participants: 350,
        featured: true,
        tags: ["DevOps", "Cloud", "Infrastructure"]
    },
    {
        id: 5,
        title: "Mobile App Development Workshop",
        description: "Hands-on workshop on building cross-platform mobile applications with React Native.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event5.jpg",
        date: "2023-09-15",
        location: "Tokyo, Japan",
        participants: 80,
        featured: false,
        tags: ["Mobile", "React Native", "Workshop"]
    },
    {
        id: 6,
        title: "Cybersecurity Summit",
        description: "Join security experts to discuss emerging threats and solutions in the cybersecurity landscape.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event6.jpg",
        date: "2023-10-10",
        location: "Virtual Event",
        participants: 600,
        featured: false,
        tags: ["Security", "Infosec", "Cybersecurity"]
    },
];

// Helper function to format date
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

const EventsList: React.FC<EventsListProps> = ({ featured = false }) => {
    // Filter events based on featured flag
    const events = featured
        ? sampleEvents.filter(event => event.featured)
        : sampleEvents;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
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
    );
};

export default EventsList; 