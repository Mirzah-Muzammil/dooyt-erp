import Image from "next/image";

interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface IndustriesProps {
  industries: Industry[];
}

export default function Industries({ industries }: IndustriesProps) {
  const getIndustryData = (
    id: string,
    defaultName: string,
    defaultDesc: string,
    defaultImage: string,
    textFirst = false
  ) => {
    const dbItem = industries?.find((i) => i.id === id);
    return {
      id,
      name: dbItem?.name || defaultName,
      description: dbItem?.description || defaultDesc,
      imageSrc: dbItem?.image || defaultImage,
      textFirst,
    };
  };

  const solar = getIndustryData(
    "solar",
    "Solar",
    "Dooyt is a customizable ERP software that simplifies daily solar operations with better project control, real-time insights, and faster, risk-free workflows.",
    "/images/industries/solar.png",
    true
  );

  const manufacturing = getIndustryData(
    "manufacturing",
    "Manufacturing",
    "By maintaining a single database, our customizable ERP software for manufacturing integrates all aspects of the business and ensures smooth operations.",
    "/images/industries/manufactor.png",
    false
  );

  const itSaaS = getIndustryData(
    "it-saas",
    "IT and SaaS",
    "Our scalable ERP solution is designed for the IT and SaaS industry to make the projects easy, manage resources, and optimize financial performance in real time.",
    "/images/industries/it-saas.png",
    false
  );

  const education = getIndustryData(
    "education",
    "Education",
    "Dooyt suits educational institutions, including preschools, schools, colleges, and coaching institutes. It automates various administrative processes.",
    "/images/industries/education.png",
    true
  );

  const construction = getIndustryData(
    "construction",
    "Construction",
    "As the best ERP system for small businesses, it helps to reduce costs, improve efficiency, and ensure project completion on time.",
    "/images/industries/contruction.png",
    true
  );

  const ecommerce = getIndustryData(
    "ecommerce",
    "E-commerce",
    "Our ERP software syncs inventory, orders, and customer data for smooth business management.",
    "/images/industries/ecom.png",
    false
  );

  const logistics = getIndustryData(
    "logistics",
    "Logistics",
    "This can automate the logistics process, control costs, and ensure smooth operations.",
    "/images/industries/logistics.png"
  );

  const digitalMarketing = getIndustryData(
    "digital-marketing",
    "Digital Marketing",
    "Simplify daily tasks, improve client service, and boost profitability with our customized best ERP software.",
    "/images/industries/digital-marketing.png"
  );

  if (!industries || industries.length === 0) {
    return (
      <section id="industries" className="py-20 lg:py-28 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-16 bg-white rounded-custom border border-gray-150/80 shadow-xs max-w-lg mx-auto p-8">
            <h3 className="text-lg font-bold text-gray-900 mb-1">No Industries Found</h3>
          </div>
        </div>
      </section>
    );
  }

  const columns = [
    [solar, manufacturing],
    [itSaaS, education],
    [construction, ecommerce],
  ];

  const bottomRow = [logistics, digitalMarketing];

  return (
    <section id="industries" className="py-20 lg:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3" data-aos="fade-up">
          <span className="text-sm font-semibold text-[#FF5E1A] tracking-wider uppercase block">
            Industries
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-gray-900 tracking-tight leading-tight">
            Smart Solutions for Every Industry
          </h2>
          <p className="text-base sm:text-lg text-gray-500 leading-relaxed">
            Dooyt is recognized as a reliable and customized ERP solution that adapts to the unique needs of every industry.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {columns.map((column, colIdx) => (
            <div key={colIdx} className="flex flex-col gap-6 lg:gap-8" data-aos="fade-up" data-aos-delay={colIdx * 100}>
              {column.map((item) => (
                <div
                  key={item.id}
                  className="bg-[#fffbf9] rounded-[24px] p-6 flex flex-col justify-between shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full space-y-6"
                >
                  {item.textFirst ? (
                    <>
                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden border border-gray-100">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover"
                          priority={colIdx === 0}
                        />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full aspect-[16/9] rounded-[16px] overflow-hidden bg-[#fffbf9]">
                        <Image
                          src={item.imageSrc}
                          alt={item.name}
                          fill
                          sizes="(max-w-768px) 100vw, 33vw"
                          className="object-cover"
                          priority={colIdx === 0}
                        />
                      </div>
                      <div className="space-y-3">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-500 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-6 lg:mt-8">
          {bottomRow.map((item, idx) => (
            <div
              key={item.id}
              className="bg-[#fffbf9] rounded-[24px] p-6 flex flex-col sm:flex-row items-center gap-6 shadow-xs transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full"
              data-aos="fade-up"
              data-aos-delay={idx * 100}
            >
              <div className="relative w-full sm:w-[180px] lg:w-[220px] aspect-[16/9] rounded-[16px] overflow-hidden border border-gray-100 flex-shrink-0">
                <Image
                  src={item.imageSrc}
                  alt={item.name}
                  fill
                  sizes="(max-w-768px) 100vw, 20vw"
                  className="object-cover"
                />
              </div>
              <div className="space-y-2 text-left w-full">
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
