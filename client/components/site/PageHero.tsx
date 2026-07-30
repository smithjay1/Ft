import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-ftm-line/60">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="absolute left-1/3 top-[-14rem] h-[26rem] w-[26rem] rounded-full bg-[radial-gradient(circle,rgba(18,224,106,0.14),transparent_65%)] blur-2xl" />
      <div className="shell relative py-16 md:py-20">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {eyebrow}
        </motion.p>
        <motion.h1
          className="mt-4 max-w-3xl font-display text-3xl font-semibold leading-tight tracking-tight text-white md:text-5xl"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
        >
          {title}
        </motion.h1>
        {description && (
          <motion.p
            className="mt-5 max-w-2xl text-[15px] leading-relaxed text-muted-foreground md:text-lg"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
          >
            {description}
          </motion.p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
