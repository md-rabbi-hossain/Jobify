import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { JobData } from "@/data";

export const metadata: Metadata = { title: "Browse by field" };

export default function CategoriesPage() {
  return (
    <div className="mx-auto w-[92%] max-w-6xl py-12">
      <h1 className="font-display text-4xl text-ink">Browse by field</h1>
      <p className="mt-2 max-w-xl text-ink/70">
        Pick the kind of work you do and see everything open in it.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {JobData.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/categorydetails/${category.id}`}
              className="flex h-full gap-4 rounded-lg border border-line bg-white p-4 transition-colors hover:border-brand"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-brand-light">
                <Image
                  src={category.icon}
                  alt=""
                  width={28}
                  height={28}
                  className="h-7 w-7 object-contain"
                />
              </span>
              <span>
                <span className="block font-semibold text-ink">
                  {category.name}
                </span>
                <span className="mt-0.5 block text-sm text-ink/65">
                  {category.description}
                </span>
                <span className="mt-2 block text-sm font-medium text-brand">
                  {category.jobs.length}{" "}
                  {category.jobs.length === 1 ? "job" : "jobs"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
