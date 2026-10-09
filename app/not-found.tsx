import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto w-[92%] max-w-xl py-24 text-center">
      <h1 className="font-display text-4xl text-ink">Page not found</h1>
      <p className="mt-3 text-ink/70">
        The page or job you opened does not exist or has been removed.
      </p>
      <Link
        href="/jobs"
        className="mt-8 inline-flex rounded-md bg-brand px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark"
      >
        Browse all jobs
      </Link>
    </div>
  );
}
