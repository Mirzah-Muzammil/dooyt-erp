import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight, Star } from "lucide-react";
import Link from "next/link";



export default function Hero() {
  return (
    <section className="relative overflow-hidden" data-aos="fade-up" data-aos-duration="800">
      <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-orange-100/30 rounded-full filter blur-3xl opacity-60 translate-x-1/4 -translate-y-1/4" />
      <div className="absolute bottom-10 left-0 -z-10 w-96 h-96 bg-amber-100/20 rounded-full filter blur-3xl opacity-50 -translate-x-1/4" />

      <div className="">
        <div className="text-center max-w-4xl mx-auto space-y-6" >
          {/* Trust Badge */}
          <div className="inline-flex justify-center">
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF3EC] border border-orange-100/50 shadow-2xs">
              <span className="text-sm">🔥</span>
              <span className="text-xs font-normal text-primary tracking-tight">
                Best ERP Software
              </span>
            </div>
          </div>

          <h1 className="text-4xl sm:text-5xl font-semibold lg:text-[68px] font-black text-gray-900 tracking-tight leading-none">
            Accuracy. Productivity.
            <br />
            <span className="text-primary mt-2 inline-block">Business Wins</span>
          </h1>

          <p className="text-sm sm:text-base lg:text-[17px] text-gray-500 font-normal max-w-xl mx-auto leading-relaxed tracking-tight">
            Instead of using many tools, just choose one to control your entire business effortlessly. Dooyt, the best ERP software that makes smarter decisions and drives business growth.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3 px-4">
            <label
              htmlFor="demo-modal-toggle"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white font-bold rounded-full px-8 py-3.5 flex items-center justify-center gap-2 active:scale-[0.98] transition-all cursor-pointer shadow-md shadow-orange-500/10 text-sm select-none text-center"
            >
              <Phone className="w-4 h-4 fill-current text-white" />
              Request A Demo
            </label>
            <Link href="#pricing" className="w-full sm:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="w-full sm:w-auto bg-white border border-gray-200 hover:bg-gray-50 text-gray-800 font-bold rounded-full px-8 py-3.5 flex items-center justify-center gap-1 active:scale-[0.98] transition-all cursor-pointer"
              >
                Try Free for 30 Days
                <ChevronRight className="w-4 h-4 text-gray-500" />
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-center gap-1.5 pt-3">
            <div className="flex items-center text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <span className="text-xs font-semibold text-gray-500">
              (Rating 4.5 star)
            </span>
          </div>
        </div>

        <div className="mt-6 relative">
          <div className="relative  overflow-hidden ">
            <Image
              src="/images/banner.png"
              alt="Dooyt ERP Dashboard Screenshot Mockup"
              width={1200}
              height={780}
              className="w-full h-auto object-contain block"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}
