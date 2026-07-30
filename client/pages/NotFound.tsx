import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { FtmLogo } from "@/components/brand/FtmLogo";

export default function NotFound() {
  return (
    <Layout>
      <section className="shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
        <FtmLogo className="h-20 w-20 opacity-70" />
        <p className="eyebrow mt-8">404 — no liquidity here</p>
        <h1 className="mt-4 font-display text-3xl font-semibold text-white md:text-4xl">
          This page isn't part of the journey.
        </h1>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
          The route you tried doesn't exist. Head back to the landing page or
          jump straight into the trade journal.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-xl bg-ftm-green px-5 py-3 text-sm font-semibold text-ftm-black transition-colors hover:bg-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
          <Link
            to="/trade-journal"
            className="inline-flex items-center gap-2 rounded-xl border border-ftm-line px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-ftm-green/50"
          >
            Trade Journal
          </Link>
        </div>
      </section>
    </Layout>
  );
}
