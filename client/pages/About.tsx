import { Link } from "react-router-dom";
import { ArrowRight, Code2, LineChart, Repeat, Target } from "lucide-react";
import { Layout } from "@/components/site/Layout";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { SectionHeading } from "@/components/site/SectionHeading";

const traits = [
  {
    icon: Target,
    label: "Discipline",
    body: "The plan decides, not the last result.",
  },
  {
    icon: Repeat,
    label: "Consistency",
    body: "Same process after a win or a loss.",
  },
  {
    icon: LineChart,
    label: "Patience",
    body: "No setup means no trade. Cash is a position.",
  },
  {
    icon: Code2,
    label: "Building",
    body: "Trader by process, web developer by craft.",
  },
];

export default function About() {
  return (
    <Layout>
      <PageHero
        eyebrow="About Me"
        title="Who I Am"
        description="My name is Dayo, a Forex trader passionate about mastering the financial markets through discipline, patience, and continuous learning."
      />

      <section className="shell pb-6">
        <div className="grid gap-10 lg:grid-cols-[1.35fr_1fr]">
          <Reveal className="space-y-5 text-[15px] leading-relaxed text-muted-foreground md:text-base">
            <p>
              Trading has become more than simply finding entries and exits — it
              has taught me emotional control, consistency, and the importance
              of trusting a well-tested process instead of chasing quick
              profits.
            </p>
            <p>
              Outside of trading, I'm also a web developer. I enjoy building
              projects that combine creativity with technology, which is why
              this website exists. Rather than simply telling people about my
              journey, I wanted to build something that documents every lesson,
              every trade, and every milestone.
            </p>
            <p className="text-white">
              This site represents who I am as both a trader and a builder.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="grid gap-3 sm:grid-cols-2">
              {traits.map((trait) => (
                <div key={trait.label} className="panel p-5">
                  <trait.icon className="h-5 w-5 text-ftm-green" />
                  <p className="mt-4 font-display text-sm font-semibold text-white">
                    {trait.label}
                  </p>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                    {trait.body}
                  </p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section shell">
        <div className="grid gap-10 lg:grid-cols-2">
          <Reveal>
            <div className="panel h-full p-7">
              <p className="eyebrow">Why I Trade Forex</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                Forex offers something few professions can provide: freedom.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  Not just financial freedom, but the freedom to continually
                  improve yourself.
                </p>
                <p>
                  Every trading session challenges your patience, discipline,
                  emotional control, and decision-making. Those are qualities I
                  want to strengthen every single day.
                </p>
                <p className="text-white">
                  I don't trade for excitement. I trade to master a skill that
                  rewards preparation over emotion.
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="panel h-full p-7">
              <p className="eyebrow">My Goal</p>
              <h2 className="mt-4 font-display text-2xl font-semibold text-white">
                Not simply profitable trades — consistently profitable.
              </h2>
              <div className="mt-5 space-y-4 text-[15px] leading-relaxed text-muted-foreground">
                <p>
                  That means following my trading plan regardless of whether the
                  previous trade was a win or a loss.
                </p>
                <p className="font-display text-lg text-ftm-green">
                  Consistency comes before profits.
                </p>
                <p>Profits simply become the result of consistency.</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section shell">
        <SectionHeading
          eyebrow="Why This Website Exists"
          title="This website serves as my personal trading portfolio."
          description="It allows me to document the work behind the results — and every trade, whether it ends in profit or loss, adds another lesson to this journal."
        />
        <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[
            "My market analysis",
            "My trading strategy",
            "My trade recaps",
            "My growth over time",
            "My journey toward becoming a funded trader",
          ].map((item, i) => (
            <Reveal key={item} delay={i * 0.05}>
              <div className="panel panel-hover h-full p-5">
                <span className="font-mono text-[11px] text-ftm-green">
                  0{i + 1}
                </span>
                <p className="mt-3 text-sm leading-relaxed text-white">
                  {item}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className="panel mt-10 flex flex-col gap-5 p-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="font-display text-xl font-semibold text-white">
                This isn't just a website. It's a timeline of my evolution as a
                trader.
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                See the model behind the trades, or read the journal entries
                themselves.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/trading-edge"
                className="inline-flex items-center gap-2 rounded-xl bg-ftm-green px-5 py-3 text-sm font-semibold text-ftm-black transition-colors hover:bg-emerald-400"
              >
                My Trading Edge
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/trade-journal"
                className="inline-flex items-center gap-2 rounded-xl border border-ftm-line px-5 py-3 text-sm font-semibold text-white transition-colors hover:border-ftm-green/50"
              >
                Trade Journal
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </Layout>
  );
}
