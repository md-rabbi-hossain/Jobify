import type { Metadata } from "next";
import { JobData } from "@/data";
import ApplyForm from "../Component/Forms/ApplyForm";

export const metadata: Metadata = { title: "Apply" };

export default function ApplyPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const jobParam = Array.isArray(searchParams.job)
    ? searchParams.job[0]
    : searchParams.job;
  const job = JobData.flatMap((c) => c.jobs).find(
    (j) => String(j.id) === jobParam
  );

  return (
    <div className="mx-auto w-[92%] max-w-xl py-12">
      <h1 className="font-display text-4xl text-ink">
        {job ? `Apply for ${job.title}` : "Apply"}
      </h1>
      {job && <p className="mt-2 text-ink/70">{job.company}</p>}
      <div className="mt-8">
        <ApplyForm jobTitle={job?.title} company={job?.company} jobId={job?.id} />
      </div>
    </div>
  );
}
