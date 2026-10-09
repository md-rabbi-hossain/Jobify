"use client";

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import User from "../Helper/User";
import { CloseIcon, MenuIcon } from "../Helper/Icons";

const Nav = () => {
  const { data: session, status } = useSession();
  const pathname = usePathname() ?? "";
  const [menuOpen, setMenuOpen] = useState(false);

  const role = session?.user?.role;
  const links = [
    { href: "/jobs", label: "Jobs" },
    { href: "/category", label: "Fields" },
    // Posters see the posting page; visitors see a way in for employers
    ...(role === "poster"
      ? [{ href: "/post", label: "Post a job" }]
      : !session
      ? [{ href: "/signup?role=poster", label: "For employers" }]
      : []),
  ];

  const isActive = (href: string) => {
    const base = href.split("?")[0];
    return pathname === base || pathname.startsWith(`${base}/`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 w-[92%] max-w-6xl items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2"
          onClick={() => setMenuOpen(false)}
        >
          <span
            aria-hidden
            className="flex h-8 w-8 items-center justify-center rounded-md bg-brand font-display text-lg text-white"
          >
            J
          </span>
          <span className="font-display text-2xl text-ink">Jobify</span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`text-sm font-medium transition-colors hover:text-brand ${
                isActive(link.href)
                  ? "text-brand underline decoration-2 underline-offset-[22px]"
                  : "text-ink/75"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {status === "loading" ? (
            <div className="h-10 w-24 rounded-md bg-surface" aria-hidden />
          ) : session ? (
            <User session={session} />
          ) : (
            <Link
              href="/signup"
              className="rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Sign in
            </Link>
          )}
          <button
            type="button"
            className="rounded-md p-2 text-ink md:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          aria-label="Mobile"
          className="border-t border-line bg-white md:hidden"
        >
          <div className="mx-auto flex w-[92%] flex-col py-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className={`border-b border-line/60 py-3 text-base font-medium last:border-b-0 ${
                  isActive(link.href) ? "text-brand" : "text-ink"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Nav;
