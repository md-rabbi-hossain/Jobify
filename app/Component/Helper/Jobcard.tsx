import Image from "next/image";
import Link from "next/link";
import React from "react";
import type { Job } from "@/data";
import { CashIcon, PinIcon } from "./Icons";

interface JobcardProps {
  job: Job;
  category?: string;
}

const Jobcard: React.FC<JobcardProps> = ({ job, category }) => {
  return (
    <Link
      href={`/jobs/jobdetails/${job.id}`}
      className="group flex h-full gap-4 rounded-lg border border-line bg-white p-4 transition-colors hover:border-brand"
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-md bg-brand-light">
        <Image
          src={job.image}
          alt=""
          width={36}
          height={36}
          className="h-9 w-9 object-contain"
        />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-base font-semibold text-ink group-hover:text-brand">
          {job.title}
        </h3>
        <p className="truncate text-sm text-ink/70">{job.company}</p>
        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm text-ink/80">
          <span className="inline-flex items-center gap-1.5">
            <PinIcon className="text-brand" />
            {job.location}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CashIcon className="text-brand" />
            {job.salary}
          </span>
          {category && (
            <span className="rounded-full bg-surface px-2.5 py-0.5 text-xs font-medium text-ink/70">
              {category}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default Jobcard;
