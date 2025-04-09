'use client'

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Sparkles, ChevronRight, Code, Globe, Trophy, Users, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="relative min-h-screen bg-zinc-950">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Accent gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full filter blur-[120px] opacity-30" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 rounded-full filter blur-[120px] opacity-30" />

      {/* Navbar */}
      <header className="fixed top-0 left-0 w-full z-50 py-4 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex items-center gap-2">
                <div className="relative w-10 h-10 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                  <Sparkles className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold text-xl text-white">Hacktopus</span>
              </Link>
            </div>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/hackathons" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Discover
              </Link>
              <Link href="/events" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Events
              </Link>
              <Link href="/idea" className="text-sm font-medium text-zinc-400 hover:text-white transition-colors">
                Idea Generator
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Link href="/login">
                <Button variant="outline" className="rounded-md border-zinc-800 text-zinc-300">
                  Sign In
                </Button>
              </Link>
              <Link href="/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero section */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="text-center max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.h1
              className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <span className="inline-block">Your Ultimate</span>{" "}
              <span className="inline-block bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
                Hackathon Platform
              </span>
            </motion.h1>

            <motion.p
              className="text-xl text-zinc-400 mb-10 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Discover hackathons, generate winning ideas, and create events that inspire innovation.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Link href="/register">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md h-12 px-6 text-lg font-medium transition-all duration-300 group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/hackathons">
                <Button variant="outline" className="rounded-md border-zinc-800 text-zinc-300 hover:text-white h-12 px-6 text-lg font-medium">
                  Explore Hackathons
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Features section */}
          <div className="mt-36 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="h-6 w-6 text-purple-400" />,
                title: "Discover Events",
                description: "Find the perfect hackathon to participate in, with detailed filtering and search options."
              },
              {
                icon: <Code className="h-6 w-6 text-cyan-400" />,
                title: "Generate Ideas",
                description: "Use our AI-powered idea generator to spark creativity for your next winning project."
              },
              {
                icon: <Trophy className="h-6 w-6 text-amber-400" />,
                title: "Create & Host",
                description: "Organize your own hackathon or event with our powerful and easy-to-use tools."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-6 hover:border-purple-500/50 transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 * index + 0.7 }}
              >
                <div className="p-3 bg-purple-500/10 rounded-lg w-fit mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-zinc-400">{feature.description}</p>
                <div className="pt-4">
                  <Link href="#" className="inline-flex items-center text-sm font-medium text-purple-400 hover:text-purple-300 transition-colors">
                    Learn more <ChevronRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <motion.div
            className="mt-32 grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {[
              { number: "500+", label: "Hackathons", icon: <Trophy className="h-6 w-6 text-purple-400" /> },
              { number: "10,000+", label: "Participants", icon: <Users className="h-6 w-6 text-cyan-400" /> },
              { number: "2,500+", label: "Projects", icon: <Code className="h-6 w-6 text-amber-400" /> },
              { number: "350+", label: "Partners", icon: <Sparkles className="h-6 w-6 text-green-400" /> },
            ].map((stat, index) => (
              <div key={index} className="border border-zinc-800 bg-zinc-900/50 rounded-lg p-6 text-center">
                <div className="mb-3 p-3 rounded-lg bg-zinc-800 mx-auto w-fit">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-white mb-1">{stat.number}</div>
                <div className="text-zinc-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA Section */}
          <motion.div
            className="mt-32 border border-zinc-800 bg-zinc-900/50 rounded-lg p-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.0 }}
          >
            <h2 className="text-3xl font-bold text-white mb-4">Ready to join the community?</h2>
            <p className="text-zinc-400 mb-8 max-w-2xl mx-auto">Create an account today and start exploring the world of hackathons.</p>
            <Link href="/register">
              <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-md h-12 px-6 text-lg font-medium">
                Sign Up Now
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-12 px-6 bg-zinc-950">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center mb-6 md:mb-0">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-600 to-cyan-600 flex items-center justify-center">
                <Sparkles className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-white">Hacktopus</span>
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">About</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Privacy</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Terms</a>
            <a href="#" className="text-sm text-zinc-400 hover:text-white transition-colors">Contact</a>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-4">
            <p className="text-sm text-zinc-500">© 2023 Hacktopus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
