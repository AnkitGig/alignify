
export function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/10 py-12 px-6 bg-gray-900/20 backdrop-blur-xl">
      <div className="container mx-auto max-w-5xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Contact</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="hover:text-white transition-colors">Work inquiries: work@alignify.com</p>
              <p className="hover:text-white transition-colors">PR and speaking: press@alignify.com</p>
              <p className="hover:text-white transition-colors">New business: newbusiness@alignify.com</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <span className="font-bold text-2xl">Alignify</span>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Alignify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
