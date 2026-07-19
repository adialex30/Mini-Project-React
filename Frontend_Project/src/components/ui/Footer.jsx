export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Links */}
        <div className="flex flex-wrap justify-center gap-6 text-sm text-slate-500 font-semibold tracking-wide">
          <a href="#about" className="hover:text-indigo-600 transition-colors">About Us</a>
          <a href="#contact" className="hover:text-indigo-600 transition-colors">Contact</a>
          <a href="#terms" className="hover:text-indigo-600 transition-colors">Terms of Service</a>
          <a href="#privacy" className="hover:text-indigo-600 transition-colors">Privacy Policy</a>
        </div>
        
        {/* Social Icons */}
        <div className="flex gap-4">
          {["Vector - 0.png", "Depth 8, Frame 0.png", "Vector - 2.png"].map((img, i) => (
            <a 
              key={i} 
              href={`#social-${i}`} 
              className="w-10 h-10 flex items-center justify-center rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-indigo-300 transition-all"
            >
              <img src={`./image/${img}`} alt="Social" className="h-4 w-4 opacity-60 group-hover:opacity-100 grayscale hover:grayscale-0" />
            </a>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 pt-6 border-t border-slate-100 text-center text-xs text-slate-400 font-medium tracking-wider">
        &copy; 2026 DibiTech. All rights reserved.
      </div>
    </footer>
  );
}