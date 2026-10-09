import React from "react";
import { JobData } from "@/data";
import Heading from "../Helper/Heading";
import Jobcard from "../Helper/Jobcard";

const FeatureJob = () => {
  // Two featured jobs from each of the first three fields
  const featured = JobData.slice(0, 3).flatMap((category) =>
    category.jobs.slice(0, 2).map((job) => ({ job, category: category.name }))
  );

  return (
    <section className="mx-auto w-[92%] max-w-6xl py-12">
      <Heading
        title="Featured jobs"
        subtitle="Hand-picked listings from across the portal."
        href="/jobs"
        linkText="View all jobs"
      />
      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {featured.map(({ job, category }) => (
          <Jobcard key={job.id} job={job} category={category} />
        ))}
      </div>
    </section>
  );
};

export default FeatureJob;
