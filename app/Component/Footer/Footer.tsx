import React from "react";
import Link from "next/link";

const columns = [
  {
    title: "Find work",
    links: [
      { href: "/jobs", label: "All jobs" },
      { href: "/category", label: "Browse by field" },
    ],
  },
  {
    title: "Employers",
    links: [{ href: "/post", label: "Post a job" }],
  },
  {
    title: "Account",
    links: [
      { href: "/signup", label: "Sign in" },
      { href: "/profile", label: "My profile" },
    ],
  },
];

const Footer = () => {
  return (
    <footer className="mt-20 bg-ink text-white">
      <div className="mx-auto grid w-[92%] max-w-6xl gap-10 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <p className="font-display text-3xl">Jobify</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Search open jobs by title, company or city, or start from the field
            you already work in.
          </p>
        </div>
        {columns.map((column) => (
          <div key={column.title}>
            <h2 className="text-sm font-semibold text-white">{column.title}</h2>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-[92%] max-w-6xl py-5 text-sm text-white/55">
          &copy; {new Date().getFullYear()} Jobify
        </p>
      </div>
    </footer>
  );
};

export default Footer;
