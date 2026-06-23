import { prisma } from "../src/lib/prisma";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Starting seeding database...");

  // Clear existing data
  await prisma.demoRequest.deleteMany({});
  await prisma.fAQ.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.plan.deleteMany({});
  await prisma.industry.deleteMany({});
  await prisma.module.deleteMany({});

  console.log("Database cleared.");

  // Read seed.json
  const seedPath = path.join(process.cwd(), "docs", "seed", "seed.json");
  const rawData = fs.readFileSync(seedPath, "utf-8");
  const data = JSON.parse(rawData);

  // Seed Modules
  console.log(`Seeding ${data.modules.length} modules...`);
  for (const item of data.modules) {
    await prisma.module.create({
      data: {
        id: item.id,
        name: item.name,
        category: item.category,
        icon: item.icon,
        description: item.description,
      },
    });
  }

  // Seed Industries
  console.log(`Seeding ${data.industries.length} industries...`);
  for (const item of data.industries) {
    await prisma.industry.create({
      data: {
        id: item.id,
        name: item.name,
        description: item.description,
        image: item.image,
      },
    });
  }

  // Seed Plans
  console.log(`Seeding ${data.plans.length} plans...`);
  for (const item of data.plans) {
    await prisma.plan.create({
      data: {
        id: item.id,
        name: item.name,
        tagline: item.tagline,
        monthlyPrice: item.monthlyPrice,
        currency: item.currency,
        isPopular: item.isPopular,
        features: JSON.stringify(item.features),
      },
    });
  }

  // Seed Testimonials
  console.log(`Seeding ${data.testimonials.length} testimonials...`);
  for (const item of data.testimonials) {
    await prisma.testimonial.create({
      data: {
        id: item.id,
        name: item.name,
        role: item.role,
        rating: item.rating,
        quote: item.quote,
      },
    });
  }

  // Seed FAQs
  console.log(`Seeding ${data.faqs.length} FAQs...`);
  for (const item of data.faqs) {
    await prisma.fAQ.create({
      data: {
        id: item.id,
        question: item.question,
        answer: item.answer,
        order: item.order,
      },
    });
  }

  console.log("Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
