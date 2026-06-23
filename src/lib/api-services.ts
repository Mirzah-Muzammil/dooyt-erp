import "server-only";

import { apiFetch } from "@/lib/api-config";

export interface Module {
  id: string;
  name: string;
  category: string;
  icon: string;
  description: string;
}

export interface Industry {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Plan {
  id: string;
  name: string;
  tagline: string;
  monthlyPrice: number;
  currency: string;
  isPopular: boolean;
  features: string[] | string;
  billing?: "monthly" | "annual";
  price?: number;
  originalPrice?: number;
  discountPercent?: number;
  pricePerMonth?: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  rating: number;
  quote: string;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
}

interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
}

async function withFallback<T>(request: Promise<T>, fallback: T): Promise<T> {
  try {
    return await request;
  } catch (error) {
    console.error(error);
    return fallback;
  }
}

export function getModules() {
  return apiFetch<Module[]>("/api/modules");
}

export function getIndustries() {
  return apiFetch<Industry[]>("/api/industries");
}

export function getPlans(billing: "monthly" | "annual" = "monthly") {
  return apiFetch<Plan[]>(`/api/plans?billing=${billing}`);
}

export async function getTestimonials(page = 1, limit = 10) {
  const response = await apiFetch<PaginatedResponse<Testimonial>>(
    `/api/testimonials?page=${page}&limit=${limit}`
  );
  return response.data;
}

export function getFaqs() {
  return apiFetch<FAQ[]>("/api/faqs");
}

export async function getLandingPageData() {
  const [modules, industries, plans, testimonials, faqs] = await Promise.all([
    withFallback(getModules(), []),
    withFallback(getIndustries(), []),
    withFallback(getPlans("monthly"), []),
    withFallback(getTestimonials(1, 10), []),
    withFallback(getFaqs(), []),
  ]);

  return {
    modules,
    industries,
    plans,
    testimonials,
    faqs,
  };
}
