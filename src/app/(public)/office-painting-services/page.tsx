import { prisma } from "@/server/db/prisma";
import {
  Shield,
  Palette,
  Clock,
  Check,
  Phone,
  Mail,
  Star,
  Home,
  Building,
  Paintbrush,
  Users,
  MessageSquare,
  ArrowRight,
  Zap,
  ImageIcon,
  Layers,
  Sparkles,
  Brush,
  Eye,
  ChevronRight,
  BadgeCheck,
  Headphones,
} from "lucide-react";
import { AdContainer } from "@/features/ads/ui/AdContainer";
import {
  buildWebPageJsonLd,
  buildFaqJsonLd,
  buildHowToJsonLd,
  serializeJsonLd,
} from "@/features/seo/server/json-ld.util";
import { siteSettingsService } from "@/server/wiring";
import type { Metadata } from "next";
import React from "react";
import { QuoteForm } from "@/components/ui/QuoteForm";
import { FaqAccordion } from "@/components/ui/FaqAccordion";

/* ============================================================================
   METADATA
   ========================================================================== */

export async function generateMetadata(): Promise<Metadata> {
  const settings = await siteSettingsService.getSettings();
  const siteName = settings.siteName || "MyBlog";
  const title = `Professional Wall Painting Services in Dubai | ${siteName}`;
  const description =
    "Transform your space with professional wall painting services. 30% off, 2-year guarantee, premium coatings for villas, apartments & offices. Get a free quote today!";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL || ""}/wallpaintingservices`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description },
  };
}

/* ============================================================================
   STATIC DATA
   ========================================================================== */

const FAQ_ITEMS = [
  {
    question: "How much does it cost to paint a wall in Dubai?",
    answer:
      "Pricing depends on wall size, paint type, number of coats, surface repairs, and finish selection. Share your room dimensions and we'll provide a fast estimate.",
  },
  {
    question: "Do you provide paint and materials?",
    answer:
      "Yes — we supply premium paints and materials from top brands. You can also provide your preferred brand or color.",
  },
  {
    question: "How long does a typical apartment painting job take?",
    answer:
      "Most 2-3 bedroom apartments complete within 3-5 days depending on scope and surface prep required.",
  },
  {
    question: "Will you cover furniture and floors?",
    answer:
      "Absolutely. We protect your space with drop cloths, masking tape, and careful prep before any painting begins.",
  },
];

const SERVICES = [
  {
    id: "interior",
    title: "Interior Wall Painting",
    desc: "Smooth finish, low-VOC, fast drying.",
    bullets: [
      "Surface prep & repair filling",
      "Wall edging & cleanup",
      "Premium paints",
    ],
    icon: Home,
  },
  {
    id: "exterior",
    title: "Exterior Wall Painting",
    desc: "Weather-resistant coatings for UAE.",
    bullets: [
      "UV & moisture protection",
      "Primer + top coats",
      "Surface safety valves",
    ],
    icon: Building,
  },
  {
    id: "textured",
    title: "Textured Wall Painting",
    desc: "Modern textures & premium decorative finishes.",
    bullets: [
      "Stucco / sand / microcement",
      "Feature wall designs",
      "Custom finishes",
    ],
    icon: Layers,
  },
  {
    id: "accent",
    title: "Accent Wall Painting",
    desc: "Highlight a wall with bold colors and custom finishes.",
    bullets: ["Color consultation", "Clean masking", "Premium pigments"],
    icon: Palette,
  },
  {
    id: "specialty",
    title: "Specialty Wall Painting",
    desc: "Custom finishes tailored to your space.",
    bullets: [
      "Metallic finishes",
      "Anti-mold coating",
      "Stain-block solutions",
    ],
    icon: Sparkles,
  },
  {
    id: "decorative",
    title: "Decorative & Faux Finish",
    desc: "Luxury looks: marble, concrete, swath, metallic.",
    bullets: ["Faux marble & stone", "Venetian plaster", "Custom patterns"],
    icon: Brush,
  },
];

const TRENDING_COLORS = [
  { name: "Royal Blue", hex: "#2563eb" },
  { name: "Beige", hex: "#d4a574" },
  { name: "Cool Gray", hex: "#9ca3af" },
  { name: "Deep Charcoal", hex: "#374151" },
  { name: "Emerald", hex: "#059669" },
  { name: "Crimson", hex: "#dc2626" },
];

const POPULAR_SERVICES = [
  { title: "Villa Painting Dubai", sub: "Luxury finishes for large spaces." },
  { title: "Apartment Painting", sub: "Fast, clean, and affordable." },
  { title: "Living Room Painting", sub: "Modern palettes and feature walls." },
  { title: "Bedroom Painting", sub: "Calm, cozy tones and clean edges." },
  { title: "Office Painting", sub: "Professional looks for productivity." },
  { title: "Texture / Feature Walls", sub: "Premium decorative finishes." },
];

/* ============================================================================
   PAGE COMPONENT
   ========================================================================== */

export default async function OfficePaintingServicesPage() {
  const settings = await siteSettingsService.getSettings();
  const siteName = settings.siteName || "MyBlog";
  const primaryColor = settings.primaryColor || "#1e3a5f";
  const secondaryColor = settings.secondaryColor || "#64748b";
  const accentColor = settings.accentColor || "#f59e0b";

  const stats = await prisma.$transaction([
    prisma.post.count({ where: { deletedAt: null, status: "PUBLISHED" } }),
    prisma.user.count(),
    prisma.comment.count({ where: { deletedAt: null, status: "APPROVED" } }),
    prisma.page.count({ where: { deletedAt: null, status: "PUBLISHED" } }),
  ]);
  const [postsCount, _usersCount, _commentsCount, pagesCount] = stats;

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "";
  const pageUrl = `${siteUrl}/office-painting-services`;

  const webPageLd = buildWebPageJsonLd({
    name: "Professional Office Painting Services in Dubai",
    description:
      "Expert office painting with 30% discount, 2-year guarantee, and premium coatings",
    url: pageUrl,
  });

  const faqLd = buildFaqJsonLd(
    FAQ_ITEMS.map((f) => ({ question: f.question, answer: f.answer })),
  );

  const howToLd = buildHowToJsonLd({
    name: "How to get professional office painting in Dubai",
    description: "Simple 4-step process from consultation to final inspection",
    steps: [
      { name: "Consultation", text: "Scope & requirements assessment" },
      { name: "Surface Prep", text: "Repair & sanding of surfaces" },
      { name: "Painting", text: "Coats & detailing application" },
      { name: "Final Inspection", text: "Clean & handover" },
    ],
  });

  return (
    <main
      className="font-sans"
      style={
        {
          "--primary-color": primaryColor,
          "--secondary-color": secondaryColor,
          "--accent-color": accentColor,
        } as React.CSSProperties
      }
    >
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(webPageLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(faqLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(howToLd) }}
      />

      {/* SECTION 1 - HERO */}
      <section
        className="text-white relative overflow-hidden"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="container mx-auto px-4 py-12 lg:py-20">
          <div className="grid lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/14 border border-white/18 font-semibold text-sm mb-4">
                <Zap className="w-4 h-4" />
                <span>Expert Wall Painting Service in Dubai</span>
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
                Professional Wall Painters in Dubai&nbsp;&mdash;{" "}
                <span style={{ color: "var(--accent-color)" }}>30% OFF</span>
              </h1>
              <p className="text-lg text-white/90 mb-6 max-w-2xl">
                Flawless finishes, durable coatings, and stress-free results.
                Book trusted painters for homes, villas, apartments, and
                commercial spaces across Dubai &amp; UAE.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 font-semibold rounded-lg px-6 py-3 hover:brightness-110 transition text-base text-white"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  <MessageSquare className="w-5 h-5" /> Get Free Quote
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 border border-white/35 hover:bg-white/12 rounded-lg px-6 py-3 font-semibold transition text-base"
                >
                  <ImageIcon className="w-5 h-5" /> View Projects
                </a>
              </div>

              <div className="mt-8 flex flex-wrap gap-5">
                {[
                  {
                    icon: Shield,
                    title: "2-Year Guarantee",
                    sub: "On all workmanship",
                  },
                  {
                    icon: Palette,
                    title: "100+ Color Options",
                    sub: "Premium finishes",
                  },
                  {
                    icon: Clock,
                    title: "Flexible Scheduling",
                    sub: "Fast turnarounds",
                  },
                ].map((g) => (
                  <div key={g.title} className="flex items-center gap-2.5">
                    <span className="w-13 h-13 rounded-2xl grid place-items-center bg-white/16 border border-white/18">
                      <g.icon className="w-5 h-5" />
                    </span>
                    <div>
                      <div className="font-bold text-sm">{g.title}</div>
                      <div className="text-white/80 text-xs">{g.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5" id="quote">
              <div className="bg-white text-gray-900 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="uppercase tracking-wider font-bold text-xs text-gray-500">
                      Limited Time Offer
                    </div>
                    <div className="text-xl font-bold">30% OFF Painting</div>
                  </div>
                  <span
                    className="text-xs font-semibold px-3 py-1.5 rounded-full text-white"
                    style={{ backgroundColor: "var(--accent-color)" }}
                  >
                    Top Rated
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-5">
                  Request a fast quote. We&apos;ll call back with pricing,
                  timeline, and paint recommendations.
                </p>
                <QuoteForm />
              </div>

              <div className="mt-3 text-center text-sm text-white/85">
                Dubai &bull; Sharjah &bull; Abu Dhabi &bull; UAE
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - FEATURE CARDS BAR */}
      <section className="bg-white py-10 border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Shield,
                title: "2-Year Guarantee",
                desc: "We stand behind our workmanship and materials.",
              },
              {
                icon: Palette,
                title: "Premium Coatings",
                desc: "Low-odor, washable paint with durable finishes.",
              },
              {
                icon: Clock,
                title: "Flexible Scheduling",
                desc: "On-time delivery with fast, organized execution.",
              },
            ].map((f) => (
              <div
                key={f.title}
                className="flex items-start gap-4 bg-gray-50 rounded-xl p-6 border border-gray-100"
              >
                <div
                  className="w-12 h-12 rounded-xl grid place-items-center shrink-0 text-white"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <f.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{f.title}</h3>
                  <p className="text-sm text-gray-500 mt-1">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdContainer position="HEADER" pageType="page" className="my-4" />

      {/* SECTION 3 - ABOUT / OVERVIEW */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p
                className="uppercase tracking-wider font-bold text-xs mb-2"
                style={{ color: "var(--primary-color)" }}
              >
                Wall Painting Service in Dubai
              </p>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                Professional painters, stress-free results
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                We deliver crisp lines, smooth walls, and premium finishes for
                residential and commercial projects. From surface prep to final
                inspection, every detail is handled professionally.
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {["Interior", "Exterior", "Villa", "Textured"].map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <a
                href="#services"
                className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-6 py-3 transition hover:brightness-110"
                style={{ backgroundColor: "var(--primary-color)" }}
              >
                Explore Services <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Our Recently Completed
                  </p>
                  <h3 className="text-lg font-bold text-gray-900">
                    Wall Painting Dubai Project
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    A quick look at modern finishes, calm palettes, and clean
                    workmanship.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-200 rounded-xl h-40 flex items-center justify-center text-gray-400">
                  <Home className="w-8 h-8" />
                </div>
                <div className="bg-gray-200 rounded-xl h-40 flex items-center justify-center text-gray-400">
                  <Building className="w-8 h-8" />
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-8 h-8 rounded-full bg-gray-300 border-2 border-white"
                    />
                  ))}
                </div>
                <a
                  href="#services"
                  className="text-sm font-semibold flex items-center gap-1"
                  style={{ color: "var(--primary-color)" }}
                >
                  Get Same Look <ChevronRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - PROCESS STEPS */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <p
            className="uppercase tracking-wider font-bold text-xs mb-2"
            style={{ color: "var(--primary-color)" }}
          >
            Our Wall Painting Process
          </p>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Simple, clean, and professional
          </h2>
          <p className="text-gray-500 mb-10">
            From consultation to final inspection.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: MessageSquare,
                title: "Consultation",
                desc: "Scope & requirements",
                step: 1,
              },
              {
                icon: Paintbrush,
                title: "Surface Prep",
                desc: "Repair & sanding",
                step: 2,
              },
              {
                icon: Brush,
                title: "Painting",
                desc: "Coats & detailing",
                step: 3,
              },
              {
                icon: Eye,
                title: "Final Inspection",
                desc: "Clean & handover",
                step: 4,
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col items-center">
                <div
                  className="w-16 h-16 rounded-2xl grid place-items-center text-white mb-4"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  <s.icon className="w-7 h-7" />
                </div>
                <h4 className="font-bold text-gray-900">{s.title}</h4>
                <p className="text-sm text-gray-500 mt-1">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 5 - COMPREHENSIVE SERVICES */}
      <section id="services" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p
              className="uppercase tracking-wider font-bold text-xs mb-2"
              style={{ color: "var(--primary-color)" }}
            >
              Complete Solutions
            </p>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Our Comprehensive Wall Painting Services
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              Choose premium finishes for every space &mdash; homes, villas,
              apartments &amp; offices.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((s) => (
              <div
                key={s.id}
                className="bg-white rounded-xl border border-gray-100 p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg grid place-items-center text-white"
                    style={{ backgroundColor: "var(--primary-color)" }}
                  >
                    <s.icon className="w-5 h-5" />
                  </div>
                  <h4 className="font-bold text-gray-900">{s.title}</h4>
                </div>
                <p className="text-sm text-gray-500 mb-4">{s.desc}</p>
                <ul className="space-y-2">
                  {s.bullets.map((b) => (
                    <li
                      key={b}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <Check className="w-4 h-4 shrink-0 text-green-500" />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <a
              href="#quote"
              className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-8 py-3 transition hover:brightness-110"
              style={{ backgroundColor: "var(--primary-color)" }}
            >
              Get Pricing <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* SECTION 6 - BENEFITS + RATING */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Benefits of investing in our wall painting
              </h2>
              <div className="space-y-4">
                {[
                  "Professional prep for longer lasting paint",
                  "Low-odor paints for comfortable living",
                  "Accurate color matching and finish options",
                  "Guaranteed consistency for peace of mind",
                ].map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <Check
                      className="w-5 h-5 mt-0.5 shrink-0"
                      style={{ color: "var(--primary-color)" }}
                    />
                    <span className="text-gray-700">{benefit}</span>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 mt-8">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-5 py-2.5 text-sm transition hover:brightness-110"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Book Now
                </a>
                <a
                  href="#faq"
                  className="inline-flex items-center gap-2 font-semibold border border-gray-300 text-gray-700 rounded-lg px-5 py-2.5 text-sm hover:bg-gray-50 transition"
                >
                  Read FAQ
                </a>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <BadgeCheck className="w-5 h-5 text-blue-500" />
                <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
                  Trusted &amp; Verified
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Premium Painting Quality
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Residential &amp; commercial projects
              </p>

              <div className="flex items-center gap-4">
                <div
                  className="text-5xl font-black text-white w-20 h-20 rounded-2xl grid place-items-center"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  4.9
                </div>
                <div>
                  <div className="flex items-center gap-1 text-yellow-400 text-lg">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} className="w-5 h-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Est. 2020</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7 - SPACE PROTECTION */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              How we protect your space before painting
            </h2>
            <p className="text-gray-500">
              Interior and exterior precautions included with every job.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Home
                  className="w-5 h-5"
                  style={{ color: "var(--primary-color)" }}
                />
                Interior Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Furniture covered
                  and moved safely
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Floors protected
                  with sheets &amp; taps
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Edges masked for
                  crisp lines
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Daily cleanup
                  &amp; dust control
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Building
                  className="w-5 h-5"
                  style={{ color: "var(--primary-color)" }}
                />
                Exterior Protection
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Windows, trims
                  and surfaces covered
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Safe access
                  planning (ladders/scaffolds)
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Weather-ready
                  paint scheduling
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-green-500" /> Post-job clean +
                  inspection
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - TRENDING COLORS */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Trending wall paint colors for Dubai homes
          </h2>
          <p className="text-gray-500 mb-8">
            Popular tones for modern interiors and warm climates.
          </p>

          <div className="flex flex-wrap justify-center gap-6">
            {TRENDING_COLORS.map((c) => (
              <div key={c.name} className="flex flex-col items-center gap-2">
                <div
                  className="w-16 h-16 rounded-full border-4 border-white shadow"
                  style={{ backgroundColor: c.hex }}
                />
                <span className="text-sm font-medium text-gray-700">
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 9 - CTA BANNER */}
      <section
        className="py-6 text-white"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="container mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold">
              Get expert wall painting service in Dubai by top-rated painters
            </h3>
            <p className="text-sm text-white/80">
              Tell us your area size and finish preference. We&apos;ll send a
              fast estimate.
            </p>
          </div>
          <a
            href="#quote"
            className="inline-flex items-center gap-2 font-semibold rounded-lg px-6 py-3 text-white shrink-0 hover:brightness-110 transition"
            style={{ backgroundColor: "var(--accent-color)" }}
          >
            Contact Us Now <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

      {/* SECTION 10 - POPULAR SERVICES */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Most demanded &amp; trending painting services in Dubai
            </h2>
            <p className="text-gray-500">
              Quick picks for popular residential projects.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_SERVICES.map((ps) => (
              <div
                key={ps.title}
                className="group rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
              >
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-gray-300 transition-colors">
                  <Paintbrush className="w-10 h-10" />
                </div>
                <div className="p-4">
                  <h4 className="font-bold text-gray-900">{ps.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{ps.sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <AdContainer position="IN_CONTENT" pageType="page" className="my-4" />

      {/* SECTION 11 - FAQ + STATS */}
      <section id="faq" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            <div>
              <p
                className="uppercase tracking-wider font-bold text-xs mb-2"
                style={{ color: "var(--primary-color)" }}
              >
                Wall Painter Dubai
              </p>
              <h2 className="text-3xl font-bold text-gray-900 mb-4 leading-tight">
                Hire the best wall painting contractor in Dubai, UAE
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                From consultation to cleanup, we keep your home protected and
                deliver reliable results. Choose from washable paints, premium
                sheens, and modern color combinations for any room.
              </p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {[
                  {
                    value: `${postsCount}+`,
                    label: "Guides Available",
                    icon: Users,
                  },
                  { value: "0+", label: "Hidden Charges", icon: MessageSquare },
                  {
                    value: `${pagesCount}+`,
                    label: "Setups Promised",
                    icon: Layers,
                  },
                  {
                    value: "24/7",
                    label: "Support WhatsApp",
                    icon: Headphones,
                  },
                ].map((stat) => (
                  <div
                    key={stat.label}
                    className="bg-white rounded-xl p-4 border border-gray-100"
                  >
                    <stat.icon
                      className="w-5 h-5 mb-2"
                      style={{ color: "var(--primary-color)" }}
                    />
                    <div className="text-2xl font-black text-gray-900">
                      {stat.value}
                    </div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <a
                  href="#quote"
                  className="inline-flex items-center gap-2 font-semibold text-white rounded-lg px-5 py-2.5 text-sm hover:brightness-110 transition"
                  style={{ backgroundColor: "var(--accent-color)" }}
                >
                  Get a Quote
                </a>
                <a
                  href="#services"
                  className="inline-flex items-center gap-2 font-semibold border border-gray-300 text-gray-700 rounded-lg px-5 py-2.5 text-sm hover:bg-gray-100 transition"
                >
                  See Work
                </a>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  About wall painting in Dubai
                </h3>
                <span
                  className="text-xs font-semibold px-3 py-1 rounded-full text-white"
                  style={{ backgroundColor: "var(--primary-color)" }}
                >
                  Updated
                </span>
              </div>
              <FaqAccordion items={FAQ_ITEMS} />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 - CUSTOMER REVIEWS */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            What our customers say
          </h2>
          <p className="text-gray-500 mb-10">
            Real feedback from recent projects.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                text: "Clean work and perfect finish. Finished earlier than expected.",
                author: "Sarah M.",
                role: "Apartment Painting",
                stars: 5,
              },
              {
                text: "Great color guidance and smooth finish. Very professional team.",
                author: "Hassan A.",
                role: "Villa Interior",
                stars: 5,
              },
              {
                text: "Excellent prep work. Walls look brand new. Highly recommend.",
                author: "Dania R.",
                role: "Full Repaint",
                stars: 5,
              },
              {
                text: "Fast scheduling and very neat cleanup. Great value.",
                author: "Fatima R.",
                role: "Office Repaint",
                stars: 5,
              },
            ].map((review) => (
              <div
                key={review.author}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100 text-left"
              >
                <div className="flex items-center gap-1 text-yellow-400 mb-3">
                  {Array.from({ length: review.stars }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  &ldquo;{review.text}&rdquo;
                </p>
                <div className="border-t border-gray-200 pt-3">
                  <p className="font-semibold text-gray-900 text-sm">
                    &mdash; {review.author}
                  </p>
                  <p className="text-xs text-gray-500">{review.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 13 - FINAL CTA */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: "var(--primary-color)" }}
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Get expert wall painting service in Dubai by top-rated painters
          </h2>
          <p className="text-lg text-white/80 mb-8 max-w-3xl mx-auto">
            Transform your space with {siteName}&apos;s professional painting
            services. Call or request a quote today.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+971501234567"
              className="hover:brightness-110 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 justify-center text-white"
              style={{ backgroundColor: "var(--accent-color)" }}
            >
              <Phone className="h-5 w-5" />
              Call: +971 50 123 4567
            </a>
            <a
              href="#quote"
              className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 rounded-lg font-semibold text-lg transition-all flex items-center gap-2 justify-center"
            >
              <Mail className="h-5 w-5" />
              Get Free Quote
            </a>
          </div>
        </div>
      </section>

      <AdContainer position="FOOTER" pageType="page" className="my-4" />
    </main>
  );
}
