import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FtmLogo } from "@/components/brand/FtmLogo";

const coreNav = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About Me" },
  { to: "/trading-edge", label: "Trading Edge" },
  { to: "/trade-journal", label: "Trade Journal" },
  { to: "/ftm-journey", label: "FTM Journey" },
];

const toolNav = [
  { to: "/propscan", label: "PROPSCAN" },
  { to: "/account-finder", label: "Account Finder" },
  { to: "/win-rate-analytics", label: "Win Rate Analytics" },
  { to: "/timeline", label: "Timeline" },
];

function navClass({ isActive }: { isActive: boolean }) {
  return cn(
    "relative py-1 text-[13px] font-medium transition-colors",
    isActive ? "text-ftm-green" : "text-muted-foreground hover:text-white",
  );
}

function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[90] transition-all duration-300",
        scrolled
          ? "border-b border-ftm-line/70 bg-ftm-black/85 backdrop-blur-xl"
          : "border-b border-transparent",
      )}
    >
      <nav className="shell flex h-[68px] items-center justify-between gap-4">
        <Link
          to="/"
          className="flex items-center gap-2.5"
          aria-label="FTM Journey home"
        >
          <span id="nav-logo" className="block h-9 w-9">
            <FtmLogo className="h-9 w-9" />
          </span>
          <span className="font-display text-[15px] font-semibold tracking-tight text-white">
            FTM<span className="text-ftm-green">Journey</span>
          </span>
        </Link>

        <div className="hidden items-center gap-6 lg:flex">
          {coreNav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={navClass}
              end={item.to === "/"}
            >
              {item.label}
            </NavLink>
          ))}
          <span className="h-4 w-px bg-ftm-line" />
          {toolNav.map((item) => (
            <NavLink key={item.to} to={item.to} className={navClass}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-ftm-line text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-ftm-line/70 bg-ftm-black/97 px-5 pb-6 pt-4 lg:hidden">
          <p className="eyebrow">Journey</p>
          <div className="mt-3 grid gap-1">
            {coreNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.to === "/"}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2.5 text-sm",
                    isActive
                      ? "bg-ftm-green/10 text-ftm-green"
                      : "text-muted-foreground hover:bg-ftm-panel hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <p className="eyebrow mt-5">Tools</p>
          <div className="mt-3 grid gap-1">
            {toolNav.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  cn(
                    "rounded-lg px-3 py-2.5 text-sm",
                    isActive
                      ? "bg-ftm-green/10 text-ftm-green"
                      : "text-muted-foreground hover:bg-ftm-panel hover:text-white",
                  )
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-ftm-line/70 bg-ftm-ink/60">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <FtmLogo className="h-9 w-9" />
            <span className="font-display text-[15px] font-semibold text-white">
              FTM<span className="text-ftm-green">Journey</span>
            </span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            A living record of one Forex trader's road to a first funded account
            — analysis, execution, journaling and the lessons in between.
          </p>
        </div>
        <div>
          <p className="eyebrow">Journey</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {coreNav.slice(1).map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-ftm-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="eyebrow">Tools</p>
          <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
            {toolNav.map((item) => (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className="transition-colors hover:text-ftm-green"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="shell pb-10">
        <div className="hairline" />
        <p className="mt-6 text-xs leading-relaxed text-muted-foreground/70">
          Built by Dayo — trader and web developer. Nothing here is financial
          advice. Trading data shown is from my own journal and demo/challenge
          accounts, and all FTM references reflect personal interest rather than
          an existing relationship.
        </p>
      </div>
    </footer>
  );
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-ftm-black">
      <SiteNav />
      <main className="flex-1 pt-[68px]">{children}</main>
      <SiteFooter />
    </div>
  );
}
