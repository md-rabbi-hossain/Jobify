import type { Metadata } from "next";
import { JobData } from "@/data";
import Jobcard from "../Component/Helper/Jobcard";
import Search from "../Component/Helper/Search";

export const metadata: Metadata = { title: "All jobs" };

type SearchParams = { [key: string]: string | string[] | undefined };

const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export default function JobsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const q = first(searchParams.q).trim();
  const category = first(searchParams.category);
  const needle = q.toLowerCase();

  const results = JobData.filter(
    (c) => !category || String(c.id) === category
  )
    .flatMap((c) => c.jobs.map((job) => ({ job, category: c.name })))
    .filter(
      ({ job }) =>
        !needle ||
        [job.title, job.company, job.location, job.description]
          .join(" ")
          .toLowerCase()
          .includes(needle)
    );

  return (
    <div className="mx-auto w-[92%] max-w-6xl py-12">
      <h1 className="font-display text-4xl text-ink">All jobs</h1>
      <div className="mt-6 max-w-3xl">
        <Search defaultQuery={q} defaultCategory={category} />
      </div>

      <p className="mt-8 text-sm text-ink/65" aria-live="polite">
        {results.length} {results.length === 1 ? "job" : "jobs"}
        {q ? ` matching "${q}"` : ""}
      </p>

      {results.length > 0 ? (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {results.map(({ job, category: name }) => (
            <Jobcard key={job.id} job={job} category={name} />
          ))}
        </div>
      ) : (
        <div className="mt-4 rounded-lg border border-dashed border-line bg-white p-10 text-center">
          <p className="font-semibold text-ink">No jobs match that search</p>
          <p className="mt-1 text-sm text-ink/65">
            Try a shorter keyword, check the spelling, or choose All fields.
          </p>
        </div>
      )}
    </div>
  );
}
