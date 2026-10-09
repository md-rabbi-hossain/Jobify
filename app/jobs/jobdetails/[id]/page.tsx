import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobData } from "@/data";
import Applybutton from "../../../Component/Helper/Applybutton";
import Jobcard from "../../../Component/Helper/Jobcard";
import { BuildingIcon, CashIcon, PinIcon } from "../../../Component/Helper/Icons";

type Props = { params: { id: string } };

function findJob(id: string) {
  for (const category of JobData) {
    const job = category.jobs.find((j) => String(j.id) === id);
    if (job) return { job, category };
  }
  return null;
}

export function generateStaticParams() {
  return JobData.flatMap((c) => c.jobs).map((job) => ({ id: String(job.id) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const found = findJob(params.id);
  return { title: found ? `${found.job.title} at ${found.job.company}` : "Job not found" };
}

export default function JobDetailsPage({ params }: Props) {
  const found = findJob(params.id);
  if (!found) notFound();

  const { job, category } = found;
  const related = category.jobs.filter((j) => j.id !== job.id).slice(0, 2);

  return (
    <div className="mx-auto w-[92%] max-w-6xl py-10">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/65">
        <Link href="/jobs" className="hover:text-brand">
          Jobs
        </Link>
        <span className="mx-2">/</span>
        <Link
          href={`/category/categorydetails/${category.id}`}
          className="hover:text-brand"
        >
          {category.name}
        </Link>
      </nav>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1fr_340px]">
        <article>
          <div className="flex items-start gap-4">
            <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-brand-light">
              <Image
                src={job.image}
                alt=""
                width={40}
                height={40}
                className="h-10 w-10 object-contain"
              />
            </span>
            <div>
              <h1 className="font-display text-3xl leading-tight text-ink sm:text-4xl">
                {job.title}
              </h1>
              <p className="mt-1 text-ink/70">{job.company}</p>
            </div>
          </div>

          <section className="mt-10">
            <h2 className="text-lg font-semibold text-ink">About the role</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/80">
              {job.description}
            </p>
          </section>

          <section className="mt-8">
            <h2 className="text-lg font-semibold text-ink">Requirements</h2>
            <p className="mt-2 max-w-prose leading-relaxed text-ink/80">
              {job.requirements}
            </p>
          </section>
        </article>

        <aside className="h-fit rounded-lg border border-line bg-white p-5 lg:sticky lg:top-24">
          <dl className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <BuildingIcon className="text-brand" />
              <div>
                <dt className="text-ink/60">Company</dt>
                <dd className="font-semibold text-ink">{job.company}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <PinIcon className="text-brand" />
              <div>
                <dt className="text-ink/60">Location</dt>
                <dd className="font-semibold text-ink">{job.location}</dd>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <CashIcon className="text-brand" />
              <div>
                <dt className="text-ink/60">Salary</dt>
                <dd className="font-semibold text-ink">{job.salary}</dd>
              </div>
            </div>
          </dl>
          <div className="mt-6">
            <Applybutton jobId={job.id} />
          </div>
        </aside>
      </div>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="font-display text-2xl text-ink">
            More in {category.name}
          </h2>
          <div className="mt-5 grid gap-4 lg:grid-cols-2">
            {related.map((item) => (
              <Jobcard key={item.id} job={item} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
