import Image from "next/image";

export const metadata = {
  title: "PageForge – Programmatic SEO Page Generator",
  description:
    "PageForge empowers SaaS founders and marketers to build and launch thousands of SEO-optimized pages instantly. Create templates, bulk import keywords, leverage AI-powered content, and auto-generate sitemaps for unstoppable organic growth.",
  openGraph: {
    title: "PageForge – Programmatic SEO Page Generator",
    description:
      "Effortless, scalable SEO: Build thousands of unique pages with AI, templates, and keyword automation. Designed for SaaS founders to dominate search quickly.",
    url: "https://pageforge.com",
    siteName: "PageForge",
    locale: "en_US",
    type: "website",
  },
};

export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 pb-20 pt-16 sm:pt-24">
      {/* Hero Section */}
      <section className="w-full max-w-4xl mx-auto text-center space-y-6">
        <div className="flex flex-col items-center gap-4">
          <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-semibold tracking-wide text-primary/80">
            Programmatic SEO for Founders
          </span>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Instantly generate thousands of SEO pages<span className="text-primary"> with AI</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg sm:text-xl text-muted-foreground mt-2">
            PageForge is the easiest way for SaaS teams to launch limitless SEO landing pages. Build templates, import keywords, and let AI write unique, optimized content for every page—no code required.
          </p>
        </div>
        <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
          <a
            href="/sign-up"
            className="inline-block rounded-md bg-primary px-6 py-3 text-base font-semibold text-white shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            Try PageForge free
          </a>
          <a
            href="#features"
            className="inline-block rounded-md border border-primary bg-white px-6 py-3 text-base font-semibold text-primary shadow hover:bg-primary/10 focus:outline-none focus:ring-2 focus:ring-primary/40"
          >
            See features
          </a>
        </div>
      </section>

      {/* "How It Works" Visual */}
      <section className="mt-20 w-full max-w-4xl mx-auto rounded-xl bg-white/90 dark:bg-black/80 shadow-md border border-gray-200 dark:border-zinc-800 p-6 sm:p-10 flex flex-col items-center">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Scale SEO in 3 simple steps
        </h2>
        <ol className="space-y-4 mt-4 w-full max-w-xl mx-auto">
          <li className="flex items-start gap-4">
            <span className="rounded-full bg-primary/90 text-white font-bold w-8 h-8 flex items-center justify-center">
              1
            </span>
            <div>
              <span className="font-medium">Build your template:</span> Visually design once, scale everywhere. Dynamic fields, reusable sections.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="rounded-full bg-primary/90 text-white font-bold w-8 h-8 flex items-center justify-center">
              2
            </span>
            <div>
              <span className="font-medium">Bulk import keywords:</span> Paste or upload your target phrases. PageForge handles them all.
            </div>
          </li>
          <li className="flex items-start gap-4">
            <span className="rounded-full bg-primary/90 text-white font-bold w-8 h-8 flex items-center justify-center">
              3
            </span>
            <div>
              <span className="font-medium">Let AI write &amp; publish:</span> High-quality, optimized content. Instant sitemap. Pages live on your domain.
            </div>
          </li>
        </ol>
      </section>

      {/* Features Section */}
      <section id="features" className="mt-24 w-full max-w-5xl mx-auto">
        <h2 className="text-center text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Features built for scaling organic reach
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
          <div className="flex flex-col items-center px-4">
            <Image
              src="/images/template.svg"
              width={72}
              height={72}
              alt="Template Builder"
            />
            <h3 className="font-semibold text-lg mt-4">Template Builder</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Visual builder to design stunning, SEO-optimized templates—no dev required.
            </p>
          </div>
          <div className="flex flex-col items-center px-4">
            <Image
              src="/images/bulk-keyword.svg"
              width={72}
              height={72}
              alt="Bulk Keyword Import"
            />
            <h3 className="font-semibold text-lg mt-4">Bulk Keyword Import</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Import thousands of keywords via CSV or paste. One upload, unlimited pages.
            </p>
          </div>
          <div className="flex flex-col items-center px-4">
            <Image
              src="/images/ai-content.svg"
              width={72}
              height={72}
              alt="AI-Powered Content"
            />
            <h3 className="font-semibold text-lg mt-4">AI-Powered Content</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Every page gets unique, high-quality AI-generated SEO copy, customized for your keywords.
            </p>
          </div>
          <div className="flex flex-col items-center px-4">
            <Image
              src="/images/sitemap.svg"
              width={72}
              height={72}
              alt="Automatic Sitemap Generation"
            />
            <h3 className="font-semibold text-lg mt-4">Automatic Sitemap</h3>
            <p className="mt-2 text-center text-muted-foreground">
              Keep Google happy—PageForge creates and updates sitemaps instantly as you grow.
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="mt-24 w-full max-w-4xl mx-auto">
        <h2 className="text-center text-2xl font-bold mb-8 text-gray-900 dark:text-white">
          Trusted by SaaS founders &amp; growth teams
        </h2>
        <div className="flex flex-col sm:flex-row gap-8 justify-center items-stretch">
          <div className="flex-1 bg-white/90 dark:bg-black/70 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm flex flex-col">
            <p className="text-lg text-gray-700 dark:text-zinc-200 italic mb-3">
              “PageForge supercharged our organic trial signups. We launched over 900 landing pages in hours—not weeks.”
            </p>
            <div className="mt-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary text-lg">JD</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Julia Doe</span>
                <div className="text-sm text-muted-foreground">Founder, CRM Hero</div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-white/90 dark:bg-black/70 border border-zinc-200 dark:border-zinc-700 rounded-xl p-6 shadow-sm flex flex-col">
            <p className="text-lg text-gray-700 dark:text-zinc-200 italic mb-3">
              “We built a whole programmatic SEO engine for our SaaS in just a weekend. Effortless bulk page creation.”
            </p>
            <div className="mt-auto flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="font-semibold text-primary text-lg">AL</span>
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-white">Alex Lee</span>
                <div className="text-sm text-muted-foreground">Growth Lead, InvoiceIQ</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="mt-24 w-full max-w-2xl mx-auto bg-primary/95 dark:bg-primary rounded-xl py-10 px-6 flex flex-col items-center text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Ready to scale your SEO presence?
        </h2>
        <p className="text-white/90 text-lg max-w-xl">
          Start building and publishing hundreds of unique, search-optimized pages today.
        </p>
        <a
          href="/sign-up"
          className="mt-6 inline-block rounded-md bg-white text-primary font-semibold px-8 py-3 shadow hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white/70"
        >
          Get started with PageForge
        </a>
      </section>

      {/* Owner/Contact */}
      <footer className="mt-24 text-center text-zinc-400 text-xs pb-8 select-none">
        &copy; {new Date().getFullYear()} PageForge &mdash; Created by Chirag Dodiya &middot;{" "}
        <a className="underline hover:no-underline" href="mailto:hi@chirag.co">
          hi@chirag.co
        </a>
      </footer>
    </main>
  );
}