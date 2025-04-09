import { GridBackgroundDemo } from '@/components/globalComponents/grids'
import Navbar from '@/components/globalComponents/navbar'
import React from 'react'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen bg-black relative">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -inset-[10%] opacity-30">
                    {/* Purple blob */}
                    <div
                        className="absolute top-0 left-[20%] w-[600px] h-[600px] bg-purple-600 rounded-full filter blur-[120px] animate-blob animation-delay-2000"
                    />
                    {/* Pink blob */}
                    <div
                        className="absolute bottom-0 right-[20%] w-[600px] h-[600px] bg-pink-600 rounded-full filter blur-[120px] animate-blob animation-delay-4000"
                    />
                    {/* Blue blob */}
                    <div
                        className="absolute top-[40%] right-[30%] w-[500px] h-[500px] bg-blue-600 rounded-full filter blur-[120px] animate-blob animation-delay-6000"
                    />
                </div>
            </div>

            {/* Noise texture overlay */}
            <div
                className="absolute inset-0 z-10 opacity-30 pointer-events-none bg-repeat"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
                }}
            />

            {/* Main content */}
            <div className="relative z-20">
                <Navbar />
                <GridBackgroundDemo>
                    <div className="max-w-7xl mx-auto px-4 min-h-screen">
                        {children}
                    </div>
                </GridBackgroundDemo>
            </div>
        </div>
    )
}

export default DashboardLayout
