import React from "react";
import Link from "next/link";
import Image from "next/image";
import { JobData } from "@/data";
import Heading from "../Helper/Heading";

const Catagory = () => {
  const categories = JobData.slice(0, 6);

  return (
    <section className="mx-auto w-[92%] max-w-6xl py-12">
      <Heading
        title="Browse by field"
        subtitle="Pick the kind of work you do and see everything open in it."
        href="/category"
        linkText="View all fields"
      />
      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/category/categorydetails/${category.id}`}
              className="flex h-full items-center gap-4 rounded-lg border border-line bg-white p-4 transition-colors hover:border-brand"
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
                <span className="block text-sm text-ink/65">
                  {category.jobs.length}{" "}
                  {category.jobs.length === 1 ? "job" : "jobs"}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Catagory;
