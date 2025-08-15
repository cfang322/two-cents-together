import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Two Cents Together",
  description: "A smarter way for couples to budget, track, and plan together.",
};

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <NavBar />
      <main>
        <Hero />
        <Logos />
        <Features />
        <CTA />
      </main>
      <Footer />
    </div>
  ); 
}

/* ---------- Nav ---------- */
function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-950/70 backdrop-blur border-b border-zinc-200/70 dark:border-zinc-800/70">
      <div className="mx-auto max-w-7xl px-6 py-3 flex items-center justify-between">
        <Link href="/" className="font-semibold tracking-tight text-lg">
          Two Cents Together
        </Link>
        <nav className="hidden gap-8 md:flex text-sm">
          <a href="#features" className="hover:opacity-80">Features</a>
          <a href="#how" className="hover:opacity-80">How it Works</a>
          <a href="#reviews" className="hover:opacity-80">Reviews</a>
          <a href="#faqs" className="hover:opacity-80">FAQs</a>
        </nav>
        <Link
          href="/signup"
          className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 px-4 py-2 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
        >
          Get Started
        </Link>
      </div>
    </header>
  );
}

/* ---------- Hero / Hook ---------- */
function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto max-w-7xl px-6 py-16 md:py-24 grid gap-10 md:grid-cols-12 items-center">
        {/* Left: copy + CTAs */}
        <div className="md:col-span-7">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 dark:border-zinc-800 px-3 py-1 text-xs">
            <span className="inline-block size-2 rounded-full bg-emerald-500" />
            <span className="opacity-80">Rated #1 App of 2025</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
            Budget together without the stress.
          </h1>
          <p className="mt-4 text-zinc-600 dark:text-zinc-400 max-w-xl">
            Share a dashboard, set smart budgets, and get instant insights.
            Designed for couples who want clarity and control in minutes.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center justify-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-5 py-3 text-sm font-medium hover:opacity-90"
            >
              Create Free Account
            </Link>
            <Link
              href="/demo"
              className="inline-flex items-center justify-center rounded-full border border-zinc-300 dark:border-zinc-700 px-5 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
            >
              Watch Demo
            </Link>
          </div>

          <p className="mt-6 text-sm text-zinc-500">
            200k+ budgets created
          </p>
        </div>

        {/* Right: media slot */}
        <div className="md:col-span-5">
          {/* Replace this with your image, Lottie, or canvas animation */}
          <div className="relative aspect-[4/5] w-full rounded-3xl ring-1 ring-zinc-200 dark:ring-zinc-800 overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100 dark:from-zinc-900 dark:to-zinc-800">
            <div className="absolute inset-0 grid place-items-center text-sm text-zinc-400">
              Drop hero image / animation here
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Trusted logos ---------- */
function Logos() {
  const logos = [
    { src: "/vercel.svg", alt: "Vercel" },
    { src: "/next.svg", alt: "Next.js" },
    { src: "/globe.svg", alt: "Globe" },
    { src: "/window.svg", alt: "Window" },
    { src: "/file.svg", alt: "File" },
  ];
  return (
    <section aria-label="Trusted by" className="py-8">
      <div className="mx-auto max-w-7xl px-6">
        <p className="text-xs uppercase tracking-wide text-zinc-500">
          Trusted by 50+ teams
        </p>
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 items-center opacity-80">
          {logos.map((logo) => (
            <div key={logo.alt} className="flex justify-center">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={96}
                height={24}
                className="invert-0 dark:invert opacity-70"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */
function Features() {
  return (
    <section id="features" className="py-20 md:py-24 bg-zinc-50 dark:bg-zinc-900/30">
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-semibold tracking-tight">
            Features that make money talk easier
          </h2>
          <p className="mt-3 text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
            Build a shared plan, separate personal spend, and get tips to stay on track.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {/* Highlighted feature */}
          <FeatureCard
            title="Shared Couples Dashboard"
            desc="One place for joint bills, personal budgets, and upcoming expenses—always in sync."
            highlight
          />

          <FeatureCard
            title="Smart Allocation"
            desc="Auto-suggest how to split income and bills so goals get funded first."
          />
          <FeatureCard
            title="Spending Insights"
            desc="See trends, categories, and helpful nudges when you’re close to going over."
          />
        </div>
      </div>
    </section>
  );
}

function FeatureCard({
  title,
  desc,
  highlight = false,
}: {
  title: string;
  desc: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={[
        "rounded-3xl ring-1 ring-zinc-200 dark:ring-zinc-800 bg-white dark:bg-zinc-950 overflow-hidden",
        highlight ? "lg:col-span-2" : "",
      ].join(" ")}
    >
      <div className="p-6 md:p-8">
        <h3 className="text-xl font-semibold">{title}</h3>
        <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
      </div>
      {/* visual placeholder */}
      <div className="h-44 md:h-56 bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800 grid place-items-center text-xs text-zinc-500">
        Feature visual / chart / screenshot
      </div>
    </div>
  );
}

/* ---------- CTA ---------- */
function CTA() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-6 text-center">
        <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
          Ready to plan money together?
        </h3>
        <p className="mt-3 text-zinc-600 dark:text-zinc-400">
          Start free in seconds. No credit card required.
        </p>
        <div className="mt-6 flex justify-center gap-3">
          <Link
            href="/signup"
            className="inline-flex items-center rounded-full bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 px-6 py-3 text-sm font-medium hover:opacity-90"
          >
            Get Started
          </Link>
          <Link
            href="/learn"
            className="inline-flex items-center rounded-full border border-zinc-300 dark:border-zinc-700 px-6 py-3 text-sm font-medium hover:bg-zinc-100 dark:hover:bg-zinc-900"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800">
      <div className="mx-auto max-w-7xl px-6 py-10 text-sm text-zinc-500 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Two Cents Together</p>
        <div className="flex gap-6">
          <Link href="/privacy" className="hover:underline">Privacy</Link>
          <Link href="/terms" className="hover:underline">Terms</Link>
          <a href="#features" className="hover:underline">Features</a>
        </div>
      </div>
    </footer>
  );
}
