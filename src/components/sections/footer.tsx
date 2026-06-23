"use client";

import React from "react";
import { Apple } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-zinc-400 pt-20 pb-0 border-t border-zinc-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top half grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 pb-12">
          
          {/* Logo & Description Column (Left) */}
          <div className="md:col-span-5 space-y-6">
            <Link href="#" className="flex items-center gap-1 group">
              {/*  */}
              <span className="font-extrabold text-xl text-white tracking-tight font-sans">
                Dooyt
              </span>
            </Link>
            
            <p className="text-sm text-zinc-400 leading-relaxed max-w-sm font-normal">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry.
            </p>
            
            {/* Download Badges */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#"
                className="flex items-center gap-2.5 border border-zinc-800 bg-black hover:bg-zinc-900 text-white px-3.5 py-1.5 rounded-lg text-left transition-all"
              >
                <Apple className="w-5 h-5 text-white" />
                <div>
                  <span className="block text-[8px] text-zinc-400 leading-none">Download on the</span>
                  <span className="block text-[11px] font-bold leading-tight">App Store</span>
                </div>
              </a>
              <a
                href="#"
                className="flex items-center gap-2.5 border border-zinc-800 bg-black hover:bg-zinc-900 text-white px-3.5 py-1.5 rounded-lg text-left transition-all"
              >
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 5.27v13.46c0 .87.94 1.43 1.72.99l11.75-6.73c.77-.44.77-1.56 0-2L4.72 4.28c-.78-.44-1.72.12-1.72.99z" />
                </svg>
                <div>
                  <span className="block text-[8px] text-zinc-400 leading-none">GET IT ON</span>
                  <span className="block text-[11px] font-bold leading-tight">Google Play</span>
                </div>
              </a>
            </div>
          </div>

          {/* Spacer */}
          <div className="hidden md:block md:col-span-1"></div>

          {/* Navigation Links Columns (Right) */}
          <div className="md:col-span-6 grid grid-cols-3 gap-6 sm:gap-8">
            
            {/* Quick Links Column 1 */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="#modules" className="text-zinc-400 hover:text-white transition-colors">
                    Modules
                  </Link>
                </li>
              </ul>
            </div>

            {/* Explore Column */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white tracking-wider">Explore</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#features" className="text-zinc-400 hover:text-white transition-colors">
                    Feature
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="text-zinc-400 hover:text-white transition-colors">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Quick Links Column 2 */}
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-white tracking-wider">Quick Links</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <Link href="#pricing" className="text-zinc-400 hover:text-white transition-colors">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-zinc-400 hover:text-white transition-colors">
                    Privacy policy
                  </Link>
                </li>
                <li>
                  <Link href="#faq" className="text-zinc-400 hover:text-white transition-colors">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Divider line */}
        <div className="border-t border-zinc-800/60 my-0"></div>

        {/* Copyright & Social bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-xs text-zinc-500 tracking-wide font-normal">
            Copyright © 2025 DOOYT. All Rights Reserved
          </span>
          
          {/* Social Icons inside dark square boxes */}
          <div className="flex items-center gap-3">
            <a
              href="#"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="Facebook"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="X"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="#"
              className="w-9 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg flex items-center justify-center transition-colors"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>

      </div>

      {/* Large Bottom Background Logo Image */}
      <div className="w-full flex justify-center mt-6 select-none pointer-events-none">
        <Image
          src="/images/footer.png"
          alt="Dooyt Large Logo"
          width={1200}
          height={260}
          className="w-full max-w-7xl h-auto object-contain block opacity-95"
        />
      </div>

    </footer>
  );
}
