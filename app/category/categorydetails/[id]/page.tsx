import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JobData } from "@/data";
import Jobcard from "../../../Component/Helper/Jobcard";

type Props = { params: { id: string } };

const findCategory = (id: string) =>
  JobData.find((category) => String(category.id) === id);

export function generateStaticParams() {
  return JobData.map((category) => ({ id: String(category.id) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = findCategory(params.id);
  return { title: category ? `${category.name} jobs` : "Field not found" };
}

export default function CategoryDetailsPage({ params }: Props) {
  const category = findCategory(params.id);
  if (!category) notFound();

  return (
    <div className="mx-auto w-[92%] max-w-6xl py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-ink/65">
        <Link href="/category" className="hover:text-brand">
          Fields
        </Link>
        <span className="mx-2">/</span>
        <span className="text-ink">{category.name}</span>
      </nav>

      <h1 className="mt-4 font-display text-4xl text-ink">
        {category.name} jobs
      </h1>
      <p className="mt-2 max-w-xl text-ink/70">{category.description}</p>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {category.jobs.map((job) => (
          <Jobcard key={job.id} job={job} />
        ))}
      </div>
    </div>
  );
}
