"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import imageurl from "@/public/images/chair.jpg";
import { ROLE_COOKIE, ROLE_LABEL } from "@/lib/roles";
import type { Role } from "@/lib/roles";

interface Props {
  defaultRole: Role;
  callbackUrl?: string;
}

const OPTIONS: { value: Role; title: string; text: string }[] = [
  {
    value: "seeker",
    title: "Job seeker",
    text: "Search jobs, apply with your CV, and keep track of your applications.",
  },
  {
    value: "poster",
    title: "Job poster",
    text: "Post openings and manage the roles you have listed.",
  },
];

const SignUpPage = ({ defaultRole, callbackUrl }: Props) => {
  const { data: session, status } = useSession();
  const [role, setRole] = useState<Role>(defaultRole);

  const continueWithGoogle = () => {
    // The server reads this cookie once, right after Google sends the user back.
    document.cookie = `${ROLE_COOKIE}=${role}; path=/; max-age=600; SameSite=Lax`;
    signIn("google", {
      callbackUrl: callbackUrl ?? (role === "poster" ? "/post" : "/jobs"),
    });
  };

  return (
    <div className="mx-auto grid w-[92%] max-w-5xl overflow-hidden rounded-xl border border-line bg-white md:grid-cols-2">
      <div className="relative hidden min-h-[460px] md:block">
        <Image
          src={imageurl}
          alt=""
          fill
          sizes="(min-width: 768px) 480px, 0px"
          className="object-cover"
          priority
        />
      </div>

      <div className="flex flex-col justify-center p-8 sm:p-12">
        {status === "authenticated" && session ? (
          <>
            <h1 className="font-display text-3xl text-ink">You are signed in</h1>
            <p className="mt-3 text-ink/70">
              {session.user?.name ?? session.user?.email} &middot;{" "}
              {ROLE_LABEL[session.user.role]}
            </p>
            <p className="mt-2 text-sm text-ink/60">
              To use Jobify as a different account type, sign out and sign in
              again.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/profile"
                className="rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
              >
                Go to my profile
              </Link>
              <button
                type="button"
                onClick={() => signOut({ callbackUrl: "/signup" })}
                className="rounded-md border border-line px-5 py-2.5 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              >
                Sign out
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-display text-3xl text-ink">Sign in to Jobify</h1>
            <p className="mt-3 text-ink/70">
              Choose how you want to use Jobify. An account is created the
              first time you sign in.
            </p>

            <fieldset className="mt-6">
              <legend className="sr-only">Account type</legend>
              <div className="space-y-3">
                {OPTIONS.map((option) => {
                  const selected = role === option.value;
                  return (
                    <label
                      key={option.value}
                      className={`flex cursor-pointer items-start gap-3 rounded-lg border p-4 transition-colors ${
                        selected
                          ? "border-brand bg-brand-light"
                          : "border-line hover:border-brand/50"
                      }`}
                    >
                      <input
                        type="radio"
                        name="role"
                        value={option.value}
                        checked={selected}
                        onChange={() => setRole(option.value)}
                        className="mt-1 h-4 w-4 accent-[#0B6E6E]"
                      />
                      <span>
                        <span className="block font-semibold text-ink">
                          {option.title}
                        </span>
                        <span className="mt-0.5 block text-sm text-ink/70">
                          {option.text}
                        </span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </fieldset>

            <button
              type="button"
              onClick={continueWithGoogle}
              className="mt-6 rounded-md bg-brand px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
            >
              Continue with Google as a {ROLE_LABEL[role].toLowerCase()}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
