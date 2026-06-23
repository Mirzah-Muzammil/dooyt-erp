import Image from "next/image";

export default function CtaBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative overflow-visible">
      <div className="bg-gradient-to-r from-[#FF5E1A] via-[#FF5E1A] to-[#FF904E] rounded-[32px] md:rounded-[40px] px-8 sm:px-12 md:px-16 py-8 flex flex-col md:flex-row items-center justify-between relative overflow-visible  shadow-lg" data-aos="fade-up">
        <div className="flex-1 space-y-6 text-left max-w-xl z-10">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight">
            Make Every Day A Win with Dooyt
          </h2>
          <p className="text-sm sm:text-base text-white/90 leading-relaxed max-w-lg">
            Are you looking to boost your business productivity? Replace all those multiple apps with a single powerful solution,Dooyt.
          </p>
          <div>
            <label
              htmlFor="demo-modal-toggle"
              className="inline-flex items-center gap-2.5 bg-white text-gray-900 px-6 py-3 rounded-xl font-bold text-sm tracking-tight hover:bg-white/95 transition-all cursor-pointer select-none text-center"
            >
              Schedule a demo
              <svg
                className="w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </label>
          </div>
        </div>
        <div className="relative md:absolute md:right-8 lg:right-16 w-full md:w-[350px] md:-bottom-1 lg:w-[420px] mt-8 md:mt-0 flex items-end justify-center z-20 overflow-visible">
          <Image
            src="/images/hand.png"
            alt="Dooyt Mobile Dashboard"
            width={600}
            height={960}
            className="object-contain h-max md:absolute md:bottom-0"
            priority
          />
        </div>

      </div>
    </section>
  );
}
