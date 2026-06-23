import Image from "next/image";

export default function Features() {
  return (
    <section id="features" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-left mb-16 space-y-4 max-w-4xl" data-aos="fade-up">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
            How Dooyt Can Simplify Your Business Management?
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed max-w-3xl">
            Dooyt is renowned as the best ERP system for small companies and has many features that help to simplify every aspect of your business on a single, easy-to-use platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <div className="bg-gradient-to-br from-[#FF8C20] to-[#FF5E1A] p-8 sm:p-10 rounded-[32px] flex items-center justify-center shadow-xs min-h-[350px] lg:min-h-[420px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up" data-aos-delay="100">
            <div className="w-full max-w-[360px] bg-white rounded-[20px] overflow-hidden shadow-md flex items-center justify-center p-4">
              <Image
                src="/images/feature-1.png"
                alt="Lead Source Summary"
                width={360}
                height={260}
                className="w-full h-auto object-contain block rounded-[12px]"
                priority
              />
            </div>
          </div>

          <div className="bg-[#FFF5F1] p-8 sm:p-10 lg:p-12 rounded-[32px] flex flex-col justify-center text-left min-h-[350px] lg:min-h-[420px] space-y-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up" data-aos-delay="200">
            <h3 className="text-2xl sm:text-3xl font-semibold tracking-tight text-gray-900 leading-tight">
              Real-Time Dashboards for Every Department
            </h3>
            <p className="text-sm sm:text-base text-[#6B7280] leading-relaxed">
              Dooyt ERP has a dedicated dashboard for each module. This visually interactive dashboard provides instant access to data and business performance, tracks progress, and makes quick, informed decisions anytime.
            </p>
          </div>

          <div className="bg-gradient-to-br from-[#3B66FF] to-[#1E40AF] p-8 sm:p-10 rounded-[32px] flex items-center justify-center shadow-xs min-h-[350px] lg:min-h-[420px] transition-all duration-300 hover:shadow-lg hover:-translate-y-1" data-aos="fade-up" data-aos-delay="300">
            <div className="w-full max-w-[360px] bg-white rounded-[20px] overflow-hidden shadow-md flex items-center justify-center p-4">
              <Image
                src="/images/feature-2.png"
                alt="Task History Timeline"
                width={360}
                height={260}
                className="w-full h-auto object-contain block rounded-[12px]"
                priority
              />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
