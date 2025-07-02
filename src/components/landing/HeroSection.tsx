
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export function HeroSection() {
  const { user } = useAuth();

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-6xl text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Bring your data<br />
          product ideas to life
        </h1>
        <p className="text-lg text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
          Create professional dashboard wireframes using advanced visualizations and customizable templates. Perfect for both freelancers working with clients and organizations aligning multiple teams.
        </p>
        
        <div className="mb-16">
          {user ? (
            <Link to="/editor">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-full shadow-lg border-0">
                Start Creating
              </Button>
            </Link>
          ) : (
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-lg px-8 py-4 rounded-full shadow-lg border-0">
                Join Beta
              </Button>
            </Link>
          )}
        </div>

        {/* Dashboard Preview */}
        <div className="relative max-w-4xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 shadow-2xl">
            {/* Sidebar */}
            <div className="flex">
              <div className="w-16 bg-gradient-to-b from-gray-800 to-gray-900 rounded-l-xl p-4 flex flex-col items-center gap-4">
                <div className="w-8 h-8 bg-purple-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
                <div className="w-8 h-8 bg-pink-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-full"></div>
                </div>
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform rotate-45"></div>
                </div>
                <div className="w-8 h-8 bg-gray-600 rounded-lg flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm"></div>
                </div>
              </div>
              
              {/* Main Dashboard Area */}
              <div className="flex-1 bg-gradient-to-br from-gray-800/90 to-gray-900/90 rounded-r-xl p-6">
                {/* Top Bar */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Dashboard</span>
                    <span className="text-sm text-gray-400">•</span>
                    <span className="text-sm text-gray-400">Analytics</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center text-xs text-white font-bold">
                      8M
                    </div>
                    <span className="text-sm text-gray-400">May 2024</span>
                  </div>
                </div>

                {/* Chart Area with Glowing Effect */}
                <div className="relative bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-xl p-6 border border-purple-500/20">
                  {/* Glowing orb effect */}
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full filter blur-3xl opacity-60"></div>
                  
                  {/* Chart lines */}
                  <div className="relative h-32 flex items-end justify-between">
                    <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 128">
                      <path
                        d="M20 100 Q100 60 180 80 T360 40"
                        stroke="url(#gradient)"
                        strokeWidth="3"
                        fill="none"
                        className="drop-shadow-lg"
                      />
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#8B5CF6" />
                          <stop offset="50%" stopColor="#EC4899" />
                          <stop offset="100%" stopColor="#3B82F6" />
                        </linearGradient>
                      </defs>
                    </svg>
                    
                    {/* Data points */}
                    <div className="absolute top-8 left-20 w-3 h-3 bg-purple-400 rounded-full shadow-lg shadow-purple-400/50"></div>
                    <div className="absolute top-12 left-40 w-3 h-3 bg-pink-400 rounded-full shadow-lg shadow-pink-400/50"></div>
                    <div className="absolute top-6 right-20 w-3 h-3 bg-blue-400 rounded-full shadow-lg shadow-blue-400/50"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
