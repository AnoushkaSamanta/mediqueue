// How It Works Section Component
const HowItWorksSection: React.FC = () => {
  return (
    <section className="bg-[#005F73] px-6 py-16">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-6xl font-normal text-white mb-12">How it works?</h2>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#F0DCC7] rounded-2xl p-8 relative">
            <div className="bg-[#005F73] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 border border-[#F0DCC7] ">
              1
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 mt-4">Find Your Doctor</h3>
            <p className="text-black text-xl">
              Search by specialty/<br />
              location.
            </p>
          </div>
          
          <div className="bg-[#F0DCC7] rounded-2xl p-8 relative">
            <div className="bg-[#005F73] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 border border-[#F0DCC7]">
              2
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 mt-4">Book Your Ticket</h3>
            <p className="text-black text-xl">
              Get digital token & waiting<br />
              time.
            </p>
          </div>
          
          <div className="bg-[#F0DCC7] rounded-2xl p-8 relative">
            <div className="bg-[#005F73] text-white rounded-full w-12 h-12 flex items-center justify-center text-2xl font-bold absolute -top-6 left-1/2 transform -translate-x-1/2 border  border-[#F0DCC7]">
              3
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 mt-4">Visit on Time</h3>
            <p className="text-black text-xl">
              Show ticket at clinic, get<br />
              digital prescription.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default HowItWorksSection;