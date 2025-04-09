"use client";

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar, CalendarDays, Clock, ExternalLink, Globe, MapPin, Share2, Ticket, Users } from 'lucide-react';
import Link from 'next/link';

// Sample data - This would be replaced with a real API call
const sampleEvents = [
    {
        id: 1,
        title: "React Summit 2023",
        description: "The biggest React conference with the best speakers from around the world discussing the latest in React development. Join us for three days of workshops, talks, and networking with the React community.\n\nYou'll learn about the latest React features, best practices, and hear from the core team and community leaders. Topics include React 18, Server Components, Suspense, and more.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event1.jpg",
        date: "2023-11-15",
        endDate: "2023-11-17",
        startTime: "09:00 AM",
        endTime: "06:00 PM",
        location: "Amsterdam, Netherlands",
        address: "RAI Amsterdam, Europaplein 24, 1078 GZ Amsterdam",
        organizer: "React Conferences",
        website: "https://reactsummit.com",
        price: "$599",
        participants: 500,
        featured: true,
        tags: ["React", "Web Development", "Frontend"]
    },
    {
        id: 2,
        title: "AI & Machine Learning Expo",
        description: "Explore the latest advancements in artificial intelligence and machine learning technologies at this premier industry event. This expo brings together researchers, engineers, and business leaders to showcase cutting-edge AI applications.\n\nThe event features keynote presentations, panel discussions, hands-on workshops, and an exhibition floor with demonstrations from leading tech companies and startups working in AI and ML.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event2.jpg",
        date: "2023-12-05",
        endDate: "2023-12-07",
        startTime: "10:00 AM",
        endTime: "05:00 PM",
        location: "San Francisco, CA",
        address: "Moscone Center, 747 Howard St, San Francisco, CA 94103",
        organizer: "Tech Expo Group",
        website: "https://aimlexpo.com",
        price: "$799",
        participants: 1200,
        featured: true,
        tags: ["AI", "Machine Learning", "Data Science"]
    },
    {
        id: 3,
        title: "Startup Weekend Hackathon",
        description: "54-hour event where developers, designers, and business professionals come together to build new startups. This intense weekend brings together people with different skillsets to build applications and develop a commercial case in just one weekend.\n\nParticipants pitch ideas, form teams, validate products, and present to a panel of experienced entrepreneurs and investors. Mentors will be available throughout the weekend to provide guidance and feedback.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event3.jpg",
        date: "2023-10-20",
        endDate: "2023-10-22",
        startTime: "06:00 PM",
        endTime: "09:00 PM",
        location: "London, UK",
        address: "Campus London, 4-5 Bonhill St, London EC2A 4BX",
        organizer: "Techstars",
        website: "https://startupweekend.org",
        price: "£75",
        participants: 150,
        featured: false,
        tags: ["Hackathon", "Startup", "Innovation"]
    },
    {
        id: 4,
        title: "DevOps Days Conference",
        description: "A technical conference covering topics of software development, IT infrastructure, and DevOps practices. This community-run event features talks from industry leaders and practitioners focusing on automation, testing, security, and organizational culture.\n\nThe format includes a mix of curated talks and open spaces, allowing for both structured presentations and collaborative discussions. This is an excellent opportunity to share experiences and learn about the evolving DevOps landscape.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event4.jpg",
        date: "2023-11-28",
        endDate: "2023-11-29",
        startTime: "09:00 AM",
        endTime: "05:30 PM",
        location: "Berlin, Germany",
        address: "Kulturbrauerei, Schönhauser Allee 36, 10435 Berlin",
        organizer: "DevOps Community",
        website: "https://devopsdays.org/berlin",
        price: "€350",
        participants: 350,
        featured: true,
        tags: ["DevOps", "Cloud", "Infrastructure"]
    },
    {
        id: 5,
        title: "Mobile App Development Workshop",
        description: "Hands-on workshop on building cross-platform mobile applications with React Native. This intensive one-day workshop will take you through the fundamentals of React Native development to building your first fully-functional mobile app.\n\nTopics covered include setting up your development environment, understanding React Native components, navigation, state management, accessing device features, and deploying to app stores. Suitable for web developers looking to expand into mobile development.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event5.jpg",
        date: "2023-09-15",
        endDate: "2023-09-15",
        startTime: "10:00 AM",
        endTime: "04:00 PM",
        location: "Tokyo, Japan",
        address: "Digital Garage, 3-5-7 Ebisu Minami, Shibuya-ku, Tokyo",
        organizer: "Mobile Dev Community",
        website: "https://reactnativeworkshop.jp",
        price: "¥15,000",
        participants: 80,
        featured: false,
        tags: ["Mobile", "React Native", "Workshop"]
    },
    {
        id: 6,
        title: "Cybersecurity Summit",
        description: "Join security experts to discuss emerging threats and solutions in the cybersecurity landscape. This virtual summit brings together CISOs, security practitioners, and researchers to share insights on protecting organizations in an increasingly complex threat environment.\n\nSessions include presentations on zero-trust architectures, ransomware defense, cloud security, and compliance frameworks. The summit provides networking opportunities and access to the latest security solutions from industry vendors.",
        imageUrl: "https://ik.imagekit.io/hacktopus/demo/event6.jpg",
        date: "2023-10-10",
        endDate: "2023-10-11",
        startTime: "11:00 AM",
        endTime: "03:00 PM",
        location: "Virtual Event",
        address: "Online",
        organizer: "Cyber Defense Alliance",
        website: "https://cybersecuritysummit.com",
        price: "$299",
        participants: 600,
        featured: false,
        tags: ["Security", "Infosec", "Cybersecurity"]
    },
];

// Format date helper
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' });
};

export default function EventDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = typeof params.id === 'string' ? parseInt(params.id) : 0;

    // Find the event by ID
    const event = sampleEvents.find(e => e.id === id);

    // Handle case where event is not found
    if (!event) {
        return (
            <div className="pt-24 pb-20 flex flex-col items-center justify-center min-h-[60vh]">
                <h1 className="text-2xl font-bold text-white mb-4">Event Not Found</h1>
                <p className="text-zinc-400 mb-8">The event you're looking for doesn't exist or has been removed.</p>
                <Link href="/events">
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white">
                        Return to Events
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="pt-24 pb-20 w-full">
            {/* Back Button */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-6">
                <Button
                    variant="ghost"
                    className="text-zinc-400 hover:text-white hover:bg-zinc-800/50"
                    onClick={() => router.back()}
                >
                    <ArrowLeft className="h-4 w-4 mr-2" /> Back to Events
                </Button>
            </div>

            {/* Hero Image */}
            <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden mb-10">
                <div className="absolute inset-0 bg-black/60 z-10"></div>
                <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                />

                <div className="absolute inset-0 z-20 flex items-center justify-center">
                    <div className="max-w-6xl w-full px-4 sm:px-6">
                        <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 text-center md:text-left">{event.title}</h1>
                        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-6">
                            {event.tags.map((tag, index) => (
                                <span key={index} className="bg-purple-600/70 text-white px-3 py-1 rounded-full text-sm">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row gap-10">
                {/* Event Details */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-6">About This Event</h2>
                    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 mb-8">
                        <p className="text-zinc-300 whitespace-pre-line">{event.description}</p>
                    </div>

                    <h2 className="text-2xl font-bold text-white mb-6">Organized By</h2>
                    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 mb-8">
                        <div className="flex items-center">
                            <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center text-white font-bold text-lg mr-4">
                                {event.organizer.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-white font-semibold">{event.organizer}</h3>
                                <a
                                    href={event.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-purple-400 hover:text-purple-300 flex items-center gap-1 text-sm"
                                >
                                    <Globe className="h-3.5 w-3.5" /> {event.website.replace('https://', '')}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Event Sidebar */}
                <div className="md:w-80 lg:w-96">
                    <div className="bg-zinc-900/50 backdrop-blur-sm rounded-xl border border-zinc-800/50 p-6 mb-6 sticky top-24">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-white">Event Details</h3>
                            <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white">
                                <Share2 className="h-4 w-4" />
                            </Button>
                        </div>

                        {/* Price */}
                        <div className="mb-6">
                            <div className="text-2xl font-bold text-white">{event.price}</div>
                            <div className="text-sm text-zinc-400">per person</div>
                        </div>

                        {/* Date & Time */}
                        <div className="border-t border-zinc-800 pt-4 mb-4">
                            <div className="flex mb-4">
                                <CalendarDays className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium mb-1">Date</h4>
                                    <p className="text-zinc-400 text-sm">
                                        {formatDate(event.date)}
                                        {event.endDate && event.date !== event.endDate && (
                                            <> - {formatDate(event.endDate)}</>
                                        )}
                                    </p>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <Clock className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium mb-1">Time</h4>
                                    <p className="text-zinc-400 text-sm">{event.startTime} - {event.endTime}</p>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <MapPin className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium mb-1">Location</h4>
                                    <p className="text-zinc-400 text-sm">{event.location}</p>
                                    <p className="text-zinc-500 text-sm">{event.address}</p>
                                </div>
                            </div>

                            <div className="flex mb-4">
                                <Users className="h-5 w-5 text-purple-500 mt-0.5 mr-3 flex-shrink-0" />
                                <div>
                                    <h4 className="text-white font-medium mb-1">Attendees</h4>
                                    <p className="text-zinc-400 text-sm">{event.participants} people attending</p>
                                </div>
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="space-y-3">
                            <Button className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                                <Ticket className="h-4 w-4 mr-2" /> Register Now
                            </Button>

                            <a href={event.website} target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" className="w-full h-12 border-zinc-700 bg-transparent text-white hover:bg-zinc-800">
                                    <ExternalLink className="h-4 w-4 mr-2" /> Visit Website
                                </Button>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
} 