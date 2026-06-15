import { Link } from 'react-router-dom';

export default function AuthFooter() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full max-w-[450px] mx-auto text-center space-y-4">
      <div className="flex justify-center gap-6 text-[12px] text-[#A0AEC0]">
        <Link to="#" className="hover:text-white transition-colors">Marketplace</Link>
        <Link to="#" className="hover:text-white transition-colors">Blog</Link>
        <Link to="#" className="hover:text-white transition-colors">License</Link>
      </div>
      <p className="text-[12px] text-[#A0AEC0]">
        © {currentYear}, Made with love for MOPTrO Team
      </p>
    </footer>
  );
}
