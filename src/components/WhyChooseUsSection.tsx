// Why Choose Us Section Component
const WhyChooseUsSection: React.FC = () => {
  return (
    <section className="bg-[#005F73] px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-6xl font-normal text-white text-center mb-12">Why Choose Us?</h2>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="bg-[#F0DCC7] rounded-2xl overflow-hidden">
            <div className="bg-[#005F73] px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">No More Long Queues</h3>
            </div>
            <div className="p-6">
              <p className="text-[#005F73] text-xl">
                Book your slot digitally and avoid waiting rooms.
              </p>
            </div>
          </div>
          
          <div className="bg-[#F0DCC7] rounded-2xl overflow-hidden">
            <div className="bg-[#005F73] px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">Real-Time Updates</h3>
            </div>
            <div className="p-6">
              <p className="text-[#005F73] text-xl">
                Stay informed with live queue status and waiting times.
              </p>
            </div>
          </div>
          
          <div className="bg-[#F0DCC7] rounded-2xl overflow-hidden">
            <div className="bg-[#005F73] px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">Digital Prescriptions</h3>
            </div>
            <div className="p-6">
              <p className="text-[#005F73] text-xl">
                Securely access and store prescriptions online.
              </p>
            </div>
          </div>
          
          <div className="bg-[#F0DCC7] rounded-2xl overflow-hidden">
            <div className="bg-[#005F73] px-6 py-4">
              <h3 className="text-2xl font-semibold text-white">Pharmacy Integration</h3>
            </div>
            <div className="p-6">
              <p className="text-[#005F73]  text-xl">
                Instantly find nearby pharmacies stocking your medicines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default WhyChooseUsSection;