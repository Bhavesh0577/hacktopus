'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Calendar, Ticket, User, Plus, Lightbulb, Sparkles, BookText, Code } from 'lucide-react'
import { Button } from '../ui/button'
import { useEffect, useState } from 'react'
import Profile from '../userComponents/profile'
import { motion } from 'framer-motion'

export default function Navbar() {
  const path = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Define link items
  const navItems = [
    { path: '/events', text: 'Events', icon: <Ticket className="h-4 w-4" /> },
    { path: '/idea', text: 'Idea Generator', icon: <Lightbulb className="h-4 w-4" /> },
    { path: '/hackathons', text: 'Discover', icon: <Search className="h-4 w-4" /> },
  ]

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2' : 'py-4'
        }`}
    >
      <div
        className={`
          mx-auto px-6 transition-all duration-500 
          ${isScrolled ? 'max-w-7xl backdrop-blur-md bg-black/50 rounded-full border border-white/10 shadow-[0_0_15px_rgba(120,120,120,0.2)]' : 'max-w-7xl'}`}
      >
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
                <div className="absolute -inset-1 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full opacity-30 blur-sm animate-pulse"></div>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-pink-500">Hacktopus</span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center bg-zinc-900/70 backdrop-blur-md px-4 py-2 rounded-full border border-white/5">
            {navItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className="relative px-4 py-2 group"
              >
                <div className="flex items-center gap-2 relative z-10">
                  <span>{item.icon}</span>
                  <span className={`text-sm font-medium ${path === item.path ? 'text-white' : 'text-zinc-400 group-hover:text-white transition-colors'
                    }`}>{item.text}</span>
                </div>

                {/* Highlight pill for active link */}
                {path === item.path && (
                  <motion.div
                    layoutId="navbar-active-pill"
                    className="absolute inset-0 bg-white/10 rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Link href="/create">
              <Button variant={'outline'}
                className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 text-white rounded-full px-4 h-10 hover:shadow-[0_0_15px_rgba(168,85,247,0.5)] transition-all duration-300"
              >
                <Plus className="h-4 w-4 mr-2" /> Create
              </Button>
            </Link>
            <Profile />
          </div>
        </div>
      </div>
    </header>
  )
}
