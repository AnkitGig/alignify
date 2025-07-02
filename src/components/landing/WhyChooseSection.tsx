
import { Code, Users, ChartLine } from "lucide-react";

export function WhyChooseSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="container mx-auto max-w-5xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose</h2>
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">Alignify?</h2>
        <p className="text-lg text-gray-300 mb-16 max-w-2xl mx-auto">Save time and resources by getting alignment right the first time</p>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-600 to-purple-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <ChartLine className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Interactive Wireframes</h3>
            <p className="text-gray-300 leading-relaxed">
              Create dynamic dashboard mockups that bring your data stories to life, replacing traditional whiteboards with analytics-focused tools
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl p-8 rounded-2xl border border-white/10 shadow-xl">
            <div className="w-12 h-12 bg-gradient-to-br from-pink-600 to-pink-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-2xl font-semibold mb-4">Real-time Collaboration</h3>
            <p className="text-gray-300 leading-relaxed">
              Enable analysts to focus on deep analysis while business teams easily communicate their desired outcomes
            </p>
          </div>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-xl overflow-hidden">
            <div className="p-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-400 rounded-xl flex items-center justify-center mb-6 mx-auto">
                <Code className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-semibold mb-4">Rapid Iteration</h3>
              <p className="text-gray-300 leading-relaxed mb-6">
                Eliminate endless feedback loops and reduce misunderstandings with clear visual communication
              </p>
            </div>
            
            {/* Code Block */}
            <div className="bg-gradient-to-br from-gray-800/80 to-gray-900/60 p-6 border-t border-white/10">
              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 font-mono text-sm border border-purple-500/20">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-gray-400 text-xs">DigitalToken.js</span>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="text-gray-500 mb-2">// addNumbersToToken</div>
                <div className="text-blue-400">function <span className="text-yellow-400">addNumbersToToken</span>(<span className="text-purple-400">num1, num2</span>) &#123;</div>
                <div className="text-pink-400 ml-4">let <span className="text-white">sum = num1 + num2;</span></div>
                <div className="text-pink-400 ml-4">let <span className="text-white">token = &#123;</span></div>
                <div className="text-gray-300 ml-8">value: <span className="text-green-400">sum</span>,</div>
                <div className="text-gray-300 ml-8">type: <span className="text-green-400">'number'</span></div>
                <div className="text-white ml-4">&#125;;</div>
                <div className="text-pink-400 ml-4">return token;</div>
                <div className="text-blue-400">&#125;</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
