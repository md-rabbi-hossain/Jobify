"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useAppContext } from "../Context/Provider";
import { useSession } from "next-auth/react";
import Field from "./Field";
import { appendStored, storageKeys } from "@/lib/storage";
import type { PostRecord } from "@/lib/storage";
import { CheckIcon } from "../Helper/Icons";

const PostForm = () => {
  const { jobData } = useAppContext();
  const { data: session } = useSession();
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // TODO: send `new FormData(event.currentTarget)` to your backend or an API route.
    const form = new FormData(event.currentTarget);
    const categoryId = String(form.get("category") ?? "");
    if (session?.user?.email) {
      appendStored<PostRecord>(storageKeys.posts(session.user.email), {
        title: String(form.get("title") ?? ""),
        company: String(form.get("company") ?? ""),
        location: String(form.get("location") ?? ""),
        category:
          jobData.find((c) => String(c.id) === categoryId)?.name ?? "",
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
        <h2 className="mt-4 font-display text-2xl text-ink">Job submitted</h2>
        <p className="mt-2 text-ink/70">Thanks. We have received your listing.</p>
        <Link
          href="/jobs"
          className="mt-6 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
        >
          Browse jobs
        </Link>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="space-y-6 rounded-lg border border-line bg-white p-6 sm:p-8"
    >
      <Field label="Job title" htmlFor="title">
        <input id="title" name="title" required className="field" placeholder="Front desk receptionist" />
      </Field>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Company" htmlFor="company">
          <input id="company" name="company" required className="field" />
        </Field>
        <Field label="Location" htmlFor="location">
          <input id="location" name="location" required className="field" placeholder="City, State" />
        </Field>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Field" htmlFor="category">
          <select id="category" name="category" required className="field">
            <option value="">Select one</option>
            {jobData.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Salary range" htmlFor="salary">
          <input id="salary" name="salary" className="field" placeholder="$40k - $60k" />
        </Field>
      </div>

      <Field label="About the role" htmlFor="description">
        <textarea id="description" name="description" rows={4} required className="field" />
      </Field>

      <Field label="Requirements" htmlFor="requirements">
        <textarea id="requirements" name="requirements" rows={3} className="field" />
      </Field>

      <button
        type="submit"
        className="w-full rounded-md bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Submit job
      </button>
    </form>
  );
};

export default PostForm;
