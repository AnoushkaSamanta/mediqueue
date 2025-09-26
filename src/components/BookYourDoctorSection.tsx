import bookdoctor from "../assets/images/bookdoctor.png"

// Book Your Doctor Section Component
const BookYourDoctorSection = () => {
  return (
    <section className="bg-[#F0DCC7] px-6 py-16">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-6xl font-semibold text-[#005F73] mb-8 leading-tight">
            Book Your<br />
            Doctor
          </h2>
          <ul className="space-y-4 mb-8">
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                Find doctors by specialty and location, see real-time availability.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                Book your spot instantly and receive a ticket with estimated wait time.
              </span>
            </li>
            <li className="flex items-start">
              <span className="text-[#005F73] mr-3">•</span>
              <span className="text-black">
                Track queue progress live and get notified when it's your turn.
              </span>
            </li>
          </ul>
          <button className="bg-[#005F73] text-white px-8 py-3 text-2xl  rounded-full hover:bg-[#F0DCC7] hover:text-[#005F73] hover:border-[#005F73] hover:border  transition-colors">
            Book Now 
          </button>
        </div>
        <div className="flex items-center justify-center">
          <img 
            src={bookdoctor.src} 
            alt="Book Doctor" 
            className="w-full h-auto max-w-md rounded-2xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default BookYourDoctorSection;