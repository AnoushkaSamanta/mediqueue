"use client"
import findpharmacy from "../assets/images/findpharmacy.png"

// Find a Pharmacy Section Component
const FindPharmacySection: React.FC = () => {
  return (
    <section className="bg-[#F0DCC7] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div className="h-64 rounded-2xl flex items-center justify-center">
          <img 
            src={findpharmacy.src} 
            alt="Book Doctor" 
            className="w-full h-auto max-w-md rounded-2xl object-cover"
          />
        </div>
        <div>
          <h2 className="text-6xl font-semibold text-[#005F73] mb-8 leading-tight">
            Find a<br />
            Pharmacy
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                View pharmacies close to your doctor's chamber or home.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                Instantly see which stores have your prescribed medicines in stock.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                Access phone numbers, addresses, and map links for easy pickup.
              </span>
            </li>
          </ul>
          <button className="bg-[#005F73] text-2xl text-white px-8 py-3 rounded-full hover:bg-opacity-90 transition-colors hover:bg-[#F0DCC7] hover:text-[#005F73] hover:border-[#005F73] hover:border">
            Find Now
          </button>
        </div>
      </div>
    </section>
  );
};
export default FindPharmacySection;