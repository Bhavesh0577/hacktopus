import CreateEvent from '@/components/eventComponents/create-event'
import SwitchTab from '@/components/eventComponents/switchTab'
import React from 'react'

const Page = () => {
  return (
    <div className='pt-24 pb-20 w-full'>
      {/* Animated heading */}
      <div className="relative mb-10 text-center">
        <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 animate-gradient-x py-2">
          Launch Your Next Big Thing
        </h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          Create an event or hackathon that people will remember forever
        </p>
      </div>

      {/* Glowing container */}
      <div className="max-w-5xl mx-auto relative">
        {/* Glow effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl blur-lg opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse"></div>

        {/* Main container */}
        <div className="relative bg-black/90 backdrop-blur-xl rounded-2xl p-1 border border-zinc-800">
          <SwitchTab />
        </div>
      </div>
    </div>
  )
}

export default Page
