import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import CreateEvent from './create-event'
import CreateHackathon from '../hackathonComponents/create-hackathon'
import { Sparkles, Calendar } from 'lucide-react'

const SwitchTab = () => {
  return (
    <div className="p-2">
      <Tabs defaultValue="event" className="w-full">
        <div className="flex justify-center mb-6">
          <TabsList className="relative p-1 bg-zinc-900/80 backdrop-blur-sm border border-zinc-800 rounded-full h-14 w-[400px] gap-1">
            <TabsTrigger
              value="event"
              className="relative h-12 px-8 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-600 data-[state=active]:to-purple-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>Event</span>
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="hackathon"
              className="relative h-12 px-8 rounded-full data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-pink-600 data-[state=active]:text-white data-[state=active]:shadow-lg transition-all duration-300"
            >
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                <span>Hackathon</span>
              </div>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="event" className="mt-0 outline-none ring-0 focus:outline-none">
          <CreateEvent />
        </TabsContent>
        <TabsContent value="hackathon" className="mt-0 outline-none ring-0 focus:outline-none">
          <CreateHackathon />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default SwitchTab
