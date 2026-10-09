"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Field from "./Field";
import { appendStored, storageKeys } from "@/lib/storage";
import type { ApplicationRecord } from "@/lib/storage";
import { CheckIcon } from "../Helper/Icons";

interface Props {
  jobTitle?: string;
  company?: string;
  jobId?: number;
}

const ApplyForm = ({ jobTitle, company, jobId }: Props) => {
  const { data: session } = useSession();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // Pre-fill from the signed-in account once the session loads
  useEffect(() => {
    if (session?.user?.name) setName((current) => current || session.user!.name!);
    if (session?.user?.email) setEmail((current) => current || session.user!.email!);
  }, [session]);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send `new FormData(event.currentTarget)` to your backend or an API route.
    if (session?.user?.email) {
      appendStored<ApplicationRecord>(storageKeys.applications(session.user.email), {
        jobId,
        title: jobTitle ?? "General application",
        company: company ?? "",
        date: new Date().toISOString(),
      });
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="rounded-lg border border-line bg-white p-8 text-center">
        <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-light text-brand">
          <CheckIcon className="h-6 w-6" />
        </span>
        <h2 className="mt-4 font-display text-2xl text-ink">
          Application sent
        </h2>
        <p className="mt-2 text-ink/70">
          {jobTitle
            ? `Your application for ${jobTitle}${company ? ` at ${company}` : ""} is on its way.`
            : "Your application is on its way."}
        </p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Keep browsing jobs
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
    >
      {jobId !== undefined && <input type="hidden" name="jobId" value={jobId} />}

      <Field label="Full name" htmlFor="name">
        <input
          id="name"
          name="name"
          type="text"
          required
          autoComplete="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="field"
        />
      </Field>

      <Field label="Email address" htmlFor="email">
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="field"
          placeholder="you@example.com"
        />
      </Field>

      <Field label="Years of experience" htmlFor="experience">
        <select id="experience" name="experience" required className="field">
          <option value="">Select one</option>
          <option>Less than a year</option>
          <option>1 - 2 years</option>
          <option>2 - 4 years</option>
          <option>4 - 7 years</option>
          <option>7 - 10 years</option>
          <option>10+ years</option>
        </select>
      </Field>

      <Field
        label="Why are you a good fit?"
        htmlFor="message"
        hint="Optional. A few sentences is plenty."
      >
        <textarea id="message" name="message" rows={4} className="field" />
      </Field>

      <Field label="Your CV" htmlFor="cv" hint="PDF or Word document.">
        <input
          id="cv"
          name="cv"
          type="file"
          required
          accept=".pdf,.doc,.docx"
          className="field file:mr-4 file:rounded file:border-0 file:bg-brand-light file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-brand"
        />
      </Field>

      <fieldset>
        <legend className="text-sm font-semibold text-ink">
          Where do you want to work?
        </legend>
        <div className="mt-2 space-y-2">
          <label className="flex items-center gap-2.5 text-[15px]">
            <input
              type="radio"
              name="workMode"
              value="remote"
              defaultChecked
              className="h-4 w-4 accent-[#0B6E6E]"
            />
            Remotely
          </label>
          <label className="flex items-center gap-2.5 text-[15px]">
            <input
              type="radio"
              name="workMode"
              value="onsite"
              className="h-4 w-4 accent-[#0B6E6E]"
            />
            On site
          </label>
        </div>
      </fieldset>

      <button
        type="submit"
        className="w-full rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Send application
      </button>
    </form>
  );
};

export default ApplyForm;
