"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import AOS from "aos";
import "aos/dist/aos.css";

function AOSInitializer() {
  useEffect(() => {
    const initAOS = () => {
      const isMobile = window.innerWidth < 768;
      AOS.init({
        duration: 800, // Keep animations quick and sleek
        once: true,    // Run animations only once when scrolling down
        offset: isMobile ? 30 : 120, // Smaller offset on mobile so elements animate earlier
        easing: "ease-out-cubic",
      });
    };

    if (document.readyState === "complete") {
      initAOS();
    } else {
      window.addEventListener("load", initAOS);
      return () => window.removeEventListener("load", initAOS);
    }
  }, []);

  return null;
}

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
            retry: 1,
            staleTime: 5 * 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <AOSInitializer />
    </QueryClientProvider>
  );
}
