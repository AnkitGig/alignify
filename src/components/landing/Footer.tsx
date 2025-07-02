import logo from "../../assets/imgs/logo.png"

export function Footer() {
  return (
    <footer className="relative z-10  bg-[rgb(17,5,43)]">
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
           
           <img src={logo} alt="Logo" />
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-gray-400 text-sm">
          <p>&copy; 2024 Alignify. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
