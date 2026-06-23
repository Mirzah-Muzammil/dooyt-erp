import Navbar from "@/components/layout/navbar";
import Hero from "@/components/sections/hero";
import Features from "@/components/sections/features";
import Modules from "@/components/sections/modules";
import Industries from "@/components/sections/industries";
import CtaBanner from "@/components/sections/cta-banner";
import Pricing from "@/components/sections/pricing";
import Testimonials from "@/components/sections/testimonials";
import Faqs from "@/components/sections/faqs";
import Footer from "@/components/sections/footer";
import Modal from "@/components/modal/modal";
import { getLandingPageData } from "@/lib/api-services";
import Providers from "@/components/providers";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { modules, industries, plans, testimonials, faqs } =
    await getLandingPageData();

  return (
    <div className="flex-1 flex flex-col bg-white">
      <Navbar />
      <main className="flex-1 pt-24 lg:pt-28">
        <Providers>
        <Hero />
        <Modules modules={modules} />
        <Features />
        <Industries industries={industries} />
        <CtaBanner />
        <Pricing plans={plans} />
        <Testimonials testimonials={testimonials} />
        <Faqs faqs={faqs} />
        </Providers>
      </main>
      <Footer />
      <Modal />
    </div>
  );
}

