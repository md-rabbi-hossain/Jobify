"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import Field from "../Forms/Field";
import { ROLE_LABEL } from "@/lib/roles";
import type { Role } from "@/lib/roles";
import { emptyDetails, storageKeys, useStoredState } from "@/lib/storage";
import type { ApplicationRecord, Details, PostRecord } from "@/lib/storage";

const NOTICES: Record<string, string> = {
  "poster-only":
    "Posting jobs is only available to job poster accounts. Sign out and sign in as a job poster to continue.",
  "seeker-only":
    "Applying is only available to job seeker accounts. Sign out and sign in as a job seeker to continue.",
};

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const ProfileView = ({ notice }: { notice?: string }) => {
  const { data: session, status } = useSession();

  const email = session?.user?.email ?? null;
  const role: Role = session?.user?.role ?? "seeker";

  const [details, saveDetails] = useStoredState<Details>(
    email ? storageKeys.profile(email) : null,
    emptyDetails
  );
  const [applications] = useStoredState<ApplicationRecord[]>(
    email && role === "seeker" ? storageKeys.applications(email) : null,
    []
  );
  const [posts] = useStoredState<PostRecord[]>(
    email && role === "poster" ? storageKeys.posts(email) : null,
    []
  );

  const [draft, setDraft] = useState<Details>(emptyDetails);
  const [saved, setSaved] = useState(false);

  useEffect(() => setDraft(details), [details]);

  const update =
    (field: keyof Details) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setSaved(false);
      setDraft((current) => ({ ...current, [field]: event.target.value }));
    };

  const onSave = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDetails(draft);
    setSaved(true);
  };

  if (status === "loading") {
    return (
      <div className="h-40 animate-pulse rounded-xl bg-white" aria-label="Loading profile" />
    );
  }

  if (!session) {
    return (
      <div className="rounded-lg border border-line bg-white p-8 text-center">
        <p className="font-semibold text-ink">You are not signed in</p>
        <Link
          href="/signup"
          className="mt-4 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Sign in
        </Link>
      </div>
    );
  }

  const name = session.user?.name ?? "Your account";
  const image = session.user?.image;
  const chip =
    role === "poster" ? "bg-accent/30 text-ink" : "bg-brand-light text-brand";

  return (
    <div>
      {notice && NOTICES[notice] && (
        <div
          role="status"
          className="mb-6 rounded-lg border border-accent bg-accent/15 px-4 py-3 text-sm text-ink"
        >
          {NOTICES[notice]}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-5 rounded-xl border border-line bg-white p-6">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-line bg-brand-light font-display text-3xl text-brand">
          {image ? (
            <Image
              src={image}
              alt=""
              width={80}
              height={80}
              className="h-20 w-20 object-cover"
            />
          ) : (
            name.charAt(0).toUpperCase()
          )}
        </span>
        <div className="min-w-0 flex-1">
          <h1 className="truncate font-display text-3xl text-ink">{name}</h1>
          <p className="truncate text-ink/70">{session.user?.email}</p>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${chip}`}>
              {ROLE_LABEL[role]}
            </span>
            <span className="text-xs text-ink/60">Signed in with Google</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/" })}
          className="rounded-md border border-line px-4 py-2 text-sm font-semibold text-ink hover:border-red-600 hover:text-red-700"
        >
          Sign out
        </button>
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        {/* Details form */}
        <form
          onSubmit={onSave}
          className="space-y-5 rounded-xl border border-line bg-white p-6"
        >
          <h2 className="text-lg font-semibold text-ink">
            {role === "poster" ? "Company details" : "Your details"}
          </h2>

          {role === "poster" ? (
            <>
              <Field label="Company name" htmlFor="company">
                <input id="company" value={draft.company} onChange={update("company")} className="field" />
              </Field>
              <Field label="Company website" htmlFor="website">
                <input id="website" type="url" value={draft.website} onChange={update("website")} className="field" placeholder="https://" />
              </Field>
            </>
          ) : (
            <Field label="Headline" htmlFor="headline" hint="For example: Front desk receptionist with 3 years of experience.">
              <input id="headline" value={draft.headline} onChange={update("headline")} className="field" />
            </Field>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Phone" htmlFor="phone">
              <input id="phone" type="tel" value={draft.phone} onChange={update("phone")} className="field" autoComplete="tel" />
            </Field>
            <Field label="Location" htmlFor="location">
              <input id="location" value={draft.location} onChange={update("location")} className="field" placeholder="City, State" />
            </Field>
          </div>

          <Field
            label={role === "poster" ? "About the company" : "About you"}
            htmlFor="about"
          >
            <textarea id="about" rows={4} value={draft.about} onChange={update("about")} className="field" />
          </Field>

          <div className="flex items-center gap-4">
            <button
              type="submit"
              className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Save details
            </button>
            <span role="status" className="text-sm text-brand">
              {saved ? "Saved" : ""}
            </span>
          </div>
          <p className="text-xs text-ink/55">
            Details are saved in this browser only.
          </p>
        </form>

        {/* Activity */}
        <section className="h-fit rounded-xl border border-line bg-white p-6">
          <h2 className="text-lg font-semibold text-ink">
            {role === "poster" ? "Jobs you posted" : "Your applications"}
          </h2>

          {role === "seeker" ? (
            applications.length > 0 ? (
              <ul className="mt-4 divide-y divide-line">
                {applications.map((item, index) => (
                  <li key={index} className="py-3">
                    <p className="font-semibold text-ink">{item.title}</p>
                    <p className="text-sm text-ink/65">
                      {item.company && `${item.company} \u00b7 `}
                      {formatDate(item.date)}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                text="You have not applied to any jobs yet."
                href="/jobs"
                action="Browse jobs"
              />
            )
          ) : posts.length > 0 ? (
            <ul className="mt-4 divide-y divide-line">
              {posts.map((item, index) => (
                <li key={index} className="py-3">
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="text-sm text-ink/65">
                    {[item.company, item.location, item.category]
                      .filter(Boolean)
                      .join(" \u00b7 ")}{" "}
                    &middot; {formatDate(item.date)}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <EmptyState
              text="You have not posted any jobs yet."
              href="/post"
              action="Post a job"
            />
          )}
        </section>
      </div>
    </div>
  );
};

const EmptyState = ({
  text,
  href,
  action,
}: {
  text: string;
  href: string;
  action: string;
}) => (
  <div className="mt-4 rounded-lg border border-dashed border-line p-6 text-center">
    <p className="text-sm text-ink/70">{text}</p>
    <Link
      href={href}
      className="mt-3 inline-flex rounded-md bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-dark"
    >
      {action}
    </Link>
  </div>
);

export default ProfileView;
