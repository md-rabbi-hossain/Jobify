"use client";

import React from "react";
import { useAppContext } from "../Context/Provider";
import { SearchIcon } from "./Icons";

interface SearchProps {
  defaultQuery?: string;
  defaultCategory?: string;
}

/**
 * A plain GET form: submitting goes to /jobs?q=...&category=...
 * The /jobs page reads those values and filters on the server.
 */
const Search: React.FC<SearchProps> = ({
  defaultQuery = "",
  defaultCategory = "",
}) => {
  const { jobData } = useAppContext();

  return (
    <form
      action="/jobs"
      method="GET"
      role="search"
      className="flex flex-col gap-2 rounded-lg border border-line bg-white p-2 sm:flex-row"
    >
      <label className="relative flex-1">
        <span className="sr-only">Job title, company or city</span>
        <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink/40" />
        <input
          type="search"
          name="q"
          defaultValue={defaultQuery}
          placeholder="Job title, company or city"
          className="w-full rounded-md bg-surface py-3 pl-10 pr-3 text-[15px] placeholder:text-ink/45 focus:outline-none focus:ring-2 focus:ring-brand/30"
        />
      </label>
      <label>
        <span className="sr-only">Field</span>
        <select
          name="category"
          defaultValue={defaultCategory}
          className="w-full rounded-md bg-surface px-3 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-brand/30 sm:w-52"
        >
          <option value="">All fields</option>
          {jobData.map((category) => (
            <option key={category.id} value={String(category.id)}>
              {category.name}
            </option>
          ))}
        </select>
      </label>
      <button
        type="submit"
        className="rounded-md bg-brand px-6 py-3 text-[15px] font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        Search jobs
      </button>
    </form>
  );
};

export default Search;
