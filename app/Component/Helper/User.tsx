"use client";

import React, { useEffect, useRef, useState } from "react";
import type { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { ROLE_LABEL } from "@/lib/roles";

interface Props {
  session: Session;
}

const User = ({ session }: Props) => {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const name = session.user?.name ?? "Account";
  const email = session.user?.email ?? "";
  const image = session.user?.image;
  const role = session.user.role;
  const initial = name.charAt(0).toUpperCase();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!open) return;
    const onClick = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const chip =
    role === "poster"
      ? "bg-accent/30 text-ink"
      : "bg-brand-light text-brand";

  return (
    <div className="relative flex items-center gap-3" ref={wrapperRef}>
      <span
        className={`hidden rounded-full px-2.5 py-1 text-xs font-semibold sm:inline ${chip}`}
      >
        {ROLE_LABEL[role]}
      </span>

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Account menu"
        className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-line bg-brand-light text-sm font-semibold text-brand"
      >
        {image ? (
          <Image
            src={image}
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 object-cover"
          />
        ) : (
          initial
        )}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-full z-50 mt-2 w-64 rounded-lg border border-line bg-white p-4"
        >
          <p className="truncate text-sm font-semibold text-ink">{name}</p>
          {email && <p className="truncate text-sm text-ink/60">{email}</p>}
          <span
            className={`mt-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${chip}`}
          >
            {ROLE_LABEL[role]}
          </span>

          <Link
            href="/profile"
            role="menuitem"
            onClick={() => setOpen(false)}
            className="mt-4 block w-full rounded-md bg-brand px-4 py-2 text-center text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
          >
            My profile
          </Link>
          <button
            type="button"
            role="menuitem"
            onClick={() => signOut({ callbackUrl: "/" })}
            className="mt-2 w-full rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors hover:border-red-600 hover:text-red-700"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default User;
