const Navbar: React.FC = () => {
  return (
    <nav className="bg-[#F0DCC7] px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Logo - Left */}
        <div className="text-[#005F73] text-2xl font-bold">
          MediQueue
        </div>
        
        {/* Middle Navigation */}
        <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2">
          <div className="bg-[#005F73] rounded-full px-8 py-3 flex items-center space-x-6">
            <a href="#" className="text-[#F0DCC7] hover:text-gray-200 transition-colors">Home</a>
            <a href="#" className="text-[#F0DCC7] hover:text-gray-200 transition-colors">Search Doctors</a>
            <a href="#" className="text-[#F0DCC7] hover:text-gray-200 transition-colors">Explore Pharmacies</a>
          </div>
        </div>
        
        {/* Login/SignUp Button - Right */}
        <div className="hidden md:block">
          <button className="bg-[#005F73] px-6 py-2 rounded-full hover:bg-[#F0DCC7] hover:text-[#005F73] hover:border-[#005F73] hover:border transition-colors text-[#F0DCC7]">
            Login / SignUp
          </button>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;