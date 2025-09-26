
// Footer Component
const Footer: React.FC = () => {
  return (
    <footer className="bg-[#005F73] px-6 py-12">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-3xl font-bold text-[#F0DCC7] mb-8">MediQueue</h3>
        </div>
        
        <div>
          <ul className="space-y-4">
            <li>
              <a href="#" className="text-[#F0DCC7] hover:text-gray-300 transition-colors">About</a>
            </li>
            <li>
              <a href="#" className="text-[#F0DCC7] hover:text-gray-300 transition-colors">Contact Us</a>
            </li>
            <li>
              <a href="#" className="text-[#F0DCC7] hover:text-gray-300 transition-colors">Search Doctor</a>
            </li>
            <li>
              <a href="#" className="text-[#F0DCC7] hover:text-gray-300 transition-colors">Explore Pharmacies</a>
            </li>
            <li>
              <a href="#" className="text-[#F0DCC7] hover:text-gray-300 transition-colors">Terms & Privacy</a>
            </li>
          </ul>
        </div>
        
        <div>
          <p className="text-[#F0DCC7] font-medium text-3xl">
            Skip the line, not your<br />
            health.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;