"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";

const classes =
  "inline-flex w-full items-center justify-center rounded-md px-5 py-3 text-center text-sm font-semibold transition-colors";

const Applybutton = ({ jobId }: { jobId: number }) => {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <button
        type="button"
        disabled
        className={`${classes} cursor-wait bg-brand/60 text-white`}
      >
        Loading...
      </button>
    );
  }

  if (session?.user.role === "seeker") {
    return (
      <Link
        href={`/apply?job=${jobId}`}
        className={`${classes} bg-brand text-white hover:bg-brand-dark`}
      >
        Apply for this job
      </Link>
    );
  }

  if (session) {
    // Signed in as a job poster
    return (
      <div>
        <p className="text-sm text-ink/70">
          You are signed in as a job poster. Only job seeker accounts can apply.
        </p>
        <Link
          href="/signup"
          className={`${classes} mt-3 border border-line bg-white text-ink hover:border-brand hover:text-brand`}
        >
          Switch account type
        </Link>
      </div>
    );
  }

  return (
    <Link
      href={`/signup?role=seeker&callbackUrl=${encodeURIComponent(
        `/jobs/jobdetails/${jobId}`
      )}`}
      className={`${classes} bg-ink text-white hover:bg-black`}
    >
      Sign in to apply
    </Link>
  );
};

export default Applybutton;
