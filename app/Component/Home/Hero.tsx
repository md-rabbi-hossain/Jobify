import React from "react";
import Link from "next/link";
import Image from "next/image";
import { JobData } from "@/data";
import Search from "../Helper/Search";
import { ArrowIcon } from "../Helper/Icons";

const Hero = () => {
  const totalJobs = JobData.reduce((sum, c) => sum + c.jobs.length, 0);
  // One recent-looking listing from each of the first four fields
  const latest = JobData.slice(0, 4).map((category) => ({
    job: category.jobs[0],
    category: category.name,
  }));

  return (
    <section className="mx-auto grid w-[92%] max-w-6xl items-center gap-12 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:py-20">
      <div>
        <h1 className="font-display text-4xl leading-[1.1] text-ink sm:text-5xl lg:text-6xl">
          Browse {totalJobs} open jobs in {JobData.length} fields
        </h1>
        <p className="mt-5 max-w-lg text-lg text-ink/70">
          Search by job title, company or city, or start from a field you
          already work in.
        </p>
        <div className="mt-8 max-w-2xl">
          <Search />
        </div>
      </div>

      <aside
        aria-label="Latest listings"
        className="rounded-xl bg-ink p-5 text-white sm:p-6"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white/80">
            Latest listings
          </h2>
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
          >
            See all <ArrowIcon />
          </Link>
        </div>
        <ul className="mt-4 space-y-3">
          {latest.map(({ job, category }) => (
            <li key={job.id}>
              <Link
                href={`/jobs/jobdetails/${job.id}`}
                className="flex items-center gap-4 rounded-lg bg-white p-3.5 text-ink transition-colors hover:bg-brand-light"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-brand-light">
                  <Image
                    src={job.image}
                    alt=""
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain"
                  />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-[15px] font-semibold">
                    {job.title}
                  </span>
                  <span className="block truncate text-sm text-ink/65">
                    {job.company} &middot; {job.location}
                  </span>
                </span>
                <span className="hidden shrink-0 text-sm font-semibold text-brand sm:block">
                  {job.salary}
                </span>
                <span className="sr-only">{category}</span>
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </section>
  );
};

export default Hero;
