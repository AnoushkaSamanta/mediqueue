import Link from "next/link";
import heroimage from "../assets/images/heroimage.png"

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="bg-[#F0DCC7] min-h-screen px-6 py-16">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="max-w-2xl">
            <h1 className="text-7xl font-semibold text-[#005F73] mb-8 leading-tight">
              One tap for<br />
              your doctor's<br />
              appointment.
            </h1>
            <div className="flex space-x-4">
              <button className="bg-[#005F73] text-[#F0DCC7] px-8 py-3 rounded-full  transition-colors hover:bg-[#F0DCC7] hover:text-[#005F73] hover:border-[#005F73] hover:border">
                Learn More
              </button>
              <Link href="/login">
              <button className="border-2 border-[#005F73] text-[#005F73] px-8 py-3 rounded-full hover:bg-[#005F73] hover:text-white transition-colors">
                Login
              </button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <img 
              src={heroimage.src} 
              alt="Hero Image" 
              className="w-full h-auto max-w-2xl rounded-2xl object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;